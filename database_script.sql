-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `water` DEFAULT CHARACTER SET utf8 ;
USE `water` ;

-- -----------------------------------------------------
-- Table `modulo_coletor`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `modulo_coletor` ;

CREATE TABLE IF NOT EXISTS `modulo_coletor` (
  `uidpk` INT NOT NULL AUTO_INCREMENT,
  `serial` VARCHAR(32) NOT NULL,
  `ativo` BIT(1) NOT NULL,
  PRIMARY KEY (`uidpk`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `consumo`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `consumo` ;

CREATE TABLE IF NOT EXISTS `consumo` (
  `uidpk` INT NOT NULL AUTO_INCREMENT,
  `quantidade` DOUBLE NOT NULL,
  `dt_inicio` DATETIME NOT NULL,
  `dt_fim` DATETIME NOT NULL,
  `modulo_coletor_id` INT NOT NULL,
  PRIMARY KEY (`uidpk`, `modulo_coletor_id`),
  INDEX `fk_consumo_modulo_coletor_idx` (`modulo_coletor_id` ASC),
  CONSTRAINT `fk_consumo_modulo_coletor`
    FOREIGN KEY (`modulo_coletor_id`)
    REFERENCES `modulo_coletor` (`uidpk`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


INSERT INTO `water`.`modulo_coletor` (`serial`, `ativo`) VALUES ('0a9s809d8as0d9asd', 1);
INSERT INTO `water`.`consumo` (`quantidade`, `dt_inicio`, `dt_fim`, `modulo_coletor_id`) VALUES ('10.3', NOW(), NOW(), 1);
