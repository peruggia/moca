-- MySQL dump 10.13  Distrib 5.5.55, for debian-linux-gnu (i686)
--
-- Host: localhost    Database: moca
-- ------------------------------------------------------
-- Server version	5.5.55-0+deb7u1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `condominio`
--

DROP TABLE IF EXISTS `condominio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `condominio` (
  `uidpk` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `dt_modificacao` datetime NOT NULL,
  PRIMARY KEY (`uidpk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `condominio`
--

LOCK TABLES `condominio` WRITE;
/*!40000 ALTER TABLE `condominio` DISABLE KEYS */;
INSERT INTO `condominio` VALUES (1,'Praia Azul','2017-05-20 19:24:00','2017-05-20 19:24:00');
/*!40000 ALTER TABLE `condominio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `consumo`
--

DROP TABLE IF EXISTS `consumo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `consumo` (
  `uidpk` int(11) NOT NULL,
  `quantidade` double NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `fk_consumo_modulo_coletor` int(11) NOT NULL,
  `fk_consumo_unidade` int(11) NOT NULL,
  PRIMARY KEY (`uidpk`),
  KEY `fk_consumo_modulo_coletor` (`fk_consumo_modulo_coletor`),
  KEY `fk_consumo_unidade` (`fk_consumo_unidade`),
  CONSTRAINT `fk_consumo_unidade` FOREIGN KEY (`fk_consumo_unidade`) REFERENCES `unidade` (`uidpk`),
  CONSTRAINT `fk_consumo_modulo_coletor` FOREIGN KEY (`fk_consumo_modulo_coletor`) REFERENCES `modulo_coletor` (`uidpk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `consumo`
--

LOCK TABLES `consumo` WRITE;
/*!40000 ALTER TABLE `consumo` DISABLE KEYS */;
/*!40000 ALTER TABLE `consumo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conta_agua`
--

DROP TABLE IF EXISTS `conta_agua`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `conta_agua` (
  `uidpk` int(11) NOT NULL,
  `mes_referencia` tinyint(1) NOT NULL,
  `dt_leitura_anterior` datetime NOT NULL,
  `dt_fim_leitura` datetime NOT NULL,
  `dt_ventimento` datetime NOT NULL,
  `valor` double NOT NULL,
  `codigo` varchar(30) NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `dt_modificacao` datetime NOT NULL,
  `fk_conta_agua_condominio` int(11) NOT NULL,
  PRIMARY KEY (`uidpk`),
  KEY `fk_conta_agua_condominio` (`fk_conta_agua_condominio`),
  CONSTRAINT `fk_conta_agua_condominio` FOREIGN KEY (`fk_conta_agua_condominio`) REFERENCES `condominio` (`uidpk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conta_agua`
--

LOCK TABLES `conta_agua` WRITE;
/*!40000 ALTER TABLE `conta_agua` DISABLE KEYS */;
/*!40000 ALTER TABLE `conta_agua` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modulo_coletor`
--

DROP TABLE IF EXISTS `modulo_coletor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `modulo_coletor` (
  `uidpk` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `serial` varchar(30) NOT NULL,
  `situacao` varchar(30) NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `dt_modificacao` datetime NOT NULL,
  `dt_ultimo_contato` datetime NOT NULL,
  `fk_modulo_coletor_unidade` int(11) DEFAULT NULL,
  PRIMARY KEY (`uidpk`),
  KEY `fk_modulo_coletor_unidade` (`fk_modulo_coletor_unidade`),
  CONSTRAINT `fk_modulo_coletor_unidade` FOREIGN KEY (`fk_modulo_coletor_unidade`) REFERENCES `unidade` (`uidpk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modulo_coletor`
--

LOCK TABLES `modulo_coletor` WRITE;
/*!40000 ALTER TABLE `modulo_coletor` DISABLE KEYS */;
INSERT INTO `modulo_coletor` VALUES (1,'ap01_01','MDC00001','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',1),(2,'ap01_02','MDC00002','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',1),(3,'ap02_01','MDC00003','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',2),(4,'ap03_01','MDC00004','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',3),(5,'ap04_01','MDC00005','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',4),(6,'ap04_02','MDC00006','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',4),(7,'ap05_01','MDC00007','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',5),(8,'ap06_01','MDC00008','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',6),(9,'ap06_02','MDC00009','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',6),(10,'ap06_03','MDC00010','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',6),(11,'ap07_01','MDC00011','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',7),(12,'ap08_01','MDC00012','ativo','2017-05-20 19:33:00','2017-05-20 19:33:00','2017-05-20 19:38:00',8);
/*!40000 ALTER TABLE `modulo_coletor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rateio`
--

DROP TABLE IF EXISTS `rateio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `rateio` (
  `uidpk` int(11) NOT NULL,
  `valor` double NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `fk_rateio_conta_agua` int(11) NOT NULL,
  `fk_rateio_unidade` int(11) NOT NULL,
  PRIMARY KEY (`uidpk`),
  KEY `fk_rateio_conta_agua` (`fk_rateio_conta_agua`),
  KEY `fk_rateio_unidade` (`fk_rateio_unidade`),
  CONSTRAINT `fk_rateio_unidade` FOREIGN KEY (`fk_rateio_unidade`) REFERENCES `unidade` (`uidpk`),
  CONSTRAINT `fk_rateio_conta_agua` FOREIGN KEY (`fk_rateio_conta_agua`) REFERENCES `conta_agua` (`uidpk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rateio`
--

LOCK TABLES `rateio` WRITE;
/*!40000 ALTER TABLE `rateio` DISABLE KEYS */;
/*!40000 ALTER TABLE `rateio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `unidade`
--

DROP TABLE IF EXISTS `unidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `unidade` (
  `uidpk` int(11) NOT NULL,
  `nome` varchar(100) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `percentual_rateio` double NOT NULL,
  `dt_criacao` datetime NOT NULL,
  `dt_modificacao` datetime NOT NULL,
  `fk_unidade_condominio` int(11) NOT NULL,
  PRIMARY KEY (`uidpk`),
  KEY `fk_unidade_condominio` (`fk_unidade_condominio`),
  CONSTRAINT `fk_unidade_condominio` FOREIGN KEY (`fk_unidade_condominio`) REFERENCES `condominio` (`uidpk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `unidade`
--

LOCK TABLES `unidade` WRITE;
/*!40000 ALTER TABLE `unidade` DISABLE KEYS */;
INSERT INTO `unidade` VALUES (1,'ap01','residencia',1,'2017-05-20 19:24:00','2017-05-20 19:24:00',1),(2,'ap02','residencia',1,'2017-05-20 19:33:00','2017-05-20 19:33:00',1),(3,'ap03','residencia',1,'2017-05-20 19:33:00','2017-05-20 19:33:00',1),(4,'ap04','residencia',1,'2017-05-20 19:33:00','2017-05-20 19:33:00',1),(5,'ap05','residencia',1,'2017-05-20 19:33:00','2017-05-20 19:33:00',1),(6,'ap06','residencia',1,'2017-05-20 19:33:00','2017-05-20 19:33:00',1),(7,'ap07','residencia',1,'2017-05-20 19:33:00','2017-05-20 19:33:00',1),(8,'ap08','residencia',1,'2017-05-20 19:33:00','2017-05-20 19:33:00',1);
/*!40000 ALTER TABLE `unidade` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-05-20 19:43:37
