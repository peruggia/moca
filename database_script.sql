CREATE SCHEMA IF NOT EXISTS moca DEFAULT CHARACTER SET utf8;

USE moca;
SET foreign_key_checks = 0;

-- CONSUMO
DROP TABLE IF EXISTS consumo;
CREATE TABLE consumo (
	uidpk INT NOT NULL,
	quantidade DOUBLE NOT NULL,
	dt_criacao DATETIME NOT NULL,
	fk_consumo_modulo_coletor INT NOT NULL,
	fk_consumo_unidade INT NOT NULL,
	PRIMARY KEY (uidPk)
);

-- MODULO COLETOR
DROP TABLE IF EXISTS modulo_coletor;
CREATE TABLE modulo_coletor (
	uidpk INT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	serial VARCHAR(30) NOT NULL,
	situacao VARCHAR(30) NOT NULL,
	dt_criacao DATETIME NOT NULL,
	dt_modificacao DATETIME NOT NULL,
	dt_ultimo_contato DATETIME NOT NULL,
	fk_modulo_coletor_unidade INT NULL,
	PRIMARY KEY (uidPk)
);

-- CONDOMINIO
DROP TABLE IF EXISTS condominio;
CREATE TABLE condominio (
	uidpk INT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	dt_criacao DATETIME NOT NULL,
	dt_modificacao DATETIME NOT NULL,
	PRIMARY KEY (uidPk)
);

-- CONTA_AGUA
DROP TABLE IF EXISTS conta_agua;
CREATE TABLE conta_agua (
	uidpk INT NOT NULL,
	mes_referencia TINYINT(1) NOT NULL,
	dt_leitura_anterior DATETIME NOT NULL,
	dt_fim_leitura DATETIME NOT NULL,
	dt_ventimento DATETIME NOT NULL,
	valor DOUBLE NOT NULL,
	codigo VARCHAR(30) NOT NULL,
	dt_criacao DATETIME NOT NULL,
	dt_modificacao DATETIME NOT NULL,
	fk_conta_agua_condominio INT NOT NULL,
	PRIMARY KEY (uidPk)
);

-- RATEIO
DROP TABLE IF EXISTS rateio;
CREATE TABLE rateio (
	uidpk INT NOT NULL,
	valor DOUBLE NOT NULL,
	dt_criacao DATETIME NOT NULL,
	fk_rateio_conta_agua INT NOT NULL,
	fk_rateio_unidade INT NOT NULL,
	PRIMARY KEY (uidPk)
);

-- UNIDADE
DROP TABLE IF EXISTS unidade;
CREATE TABLE unidade (
	uidpk INT NOT NULL,
	nome VARCHAR(100) NOT NULL,
	tipo VARCHAR(50) NOT NULL,
	percentual_rateio DOUBLE NOT NULL,
	dt_criacao DATETIME NOT NULL,
	dt_modificacao DATETIME NOT NULL,
	fk_unidade_condominio INT NOT NULL,
	PRIMARY KEY (uidPk)
);

-- CHAVES ESTRANGEIRAS
-- consumo
ALTER TABLE consumo ADD CONSTRAINT fk_consumo_modulo_coletor
FOREIGN KEY (fk_consumo_modulo_coletor) REFERENCES modulo_coletor(uidpk);
ALTER TABLE consumo ADD CONSTRAINT fk_consumo_unidade
FOREIGN KEY (fk_consumo_unidade) REFERENCES unidade(uidpk);

ALTER TABLE modulo_coletor ADD CONSTRAINT fk_modulo_coletor_unidade
FOREIGN KEY (fk_modulo_coletor_unidade) REFERENCES unidade(uidpk);

ALTER TABLE conta_agua ADD CONSTRAINT fk_conta_agua_condominio
FOREIGN KEY (fk_conta_agua_condominio) REFERENCES condominio(uidpk);

ALTER TABLE rateio ADD CONSTRAINT fk_rateio_conta_agua
FOREIGN KEY (fk_rateio_conta_agua) REFERENCES conta_agua(uidpk);
ALTER TABLE rateio ADD CONSTRAINT fk_rateio_unidade
FOREIGN KEY (fk_rateio_unidade) REFERENCES unidade(uidpk);

ALTER TABLE unidade ADD CONSTRAINT fk_unidade_condominio
FOREIGN KEY (fk_unidade_condominio) REFERENCES condominio(uidpk);

SET foreign_key_checks = 1;