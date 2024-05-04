-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: proyecto
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.22.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `estadisticasjuego`
--

DROP TABLE IF EXISTS `estadisticasjuego`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estadisticasjuego` (
  `idUsuario` int NOT NULL,
  `TotalGanado` int DEFAULT NULL,
  `Prestador` varchar(45) DEFAULT NULL,
  `Adeudo` int DEFAULT NULL,
  `Desastres` int DEFAULT NULL,
  `Fortuna` int DEFAULT NULL,
  PRIMARY KEY (`idUsuario`),
  KEY `idUsuario_idx` (`idUsuario`),
  CONSTRAINT `idUsuario` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estadisticasjuego`
--

LOCK TABLES `estadisticasjuego` WRITE;
/*!40000 ALTER TABLE `estadisticasjuego` DISABLE KEYS */;
-- INSERT INTO `estadisticasjuego` VALUES (5,0,'',0,0,0),(6,1388,'Verqor',8130,1,1),(7,9944,'Verqor',8130,1,4);
/*!40000 ALTER TABLE `estadisticasjuego` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `juegoguardado`
--

DROP TABLE IF EXISTS `juegoguardado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `juegoguardado` (
  `IdUsuario` int NOT NULL AUTO_INCREMENT,
  `time` float DEFAULT NULL,
  `finan` varchar(100) DEFAULT NULL,
  `seg1` varchar(45) DEFAULT NULL,
  `seg2` varchar(45) DEFAULT NULL,
  `deuda` int DEFAULT NULL,
  `dinero` int DEFAULT NULL,
  `cult` text,
  `aditivos` text,
  `ciclo` int DEFAULT NULL,
  `inventario` text,
  PRIMARY KEY (`IdUsuario`),
  CONSTRAINT `juegoguardado_ibfk_1` FOREIGN KEY (`IdUsuario`) REFERENCES `usuario` (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `juegoguardado`
--

LOCK TABLES `juegoguardado` WRITE;
/*!40000 ALTER TABLE `juegoguardado` DISABLE KEYS */;
-- INSERT INTO `juegoguardado` VALUES (5,28.3593,'Verqor','Verqor','',16260,8914,'{\"C\":3,\"M\":-1,\"J\":-1,\"Cb\":-1,\"L\":-1,\"Z\":-1}','{\"C\":\"A\",\"M\":\"\",\"J\":\"\",\"Cb\":\"\",\"L\":\"\",\"Z\":\"\"}',2,'{\"uno\":\"VJitomate\",\"dos\":\"Chile\",\"tres\":\"VAbono\",\"cuatro\":\"Cebada\",\"cinco\":\"\",\"seis\":\"\",\"siete\":\"\",\"ocho\":\"\",\"nueve\":\"\"}'),(6,718.699,'','','',0,0,'{\"C\":-1,\"M\":-1,\"J\":-1,\"Cb\":-1,\"L\":-1,\"Z\":-1}','{\"C\":\"\",\"M\":\"\",\"J\":\"\",\"Cb\":\"\",\"L\":\"\",\"Z\":\"\"}',1,'{\"uno\":\"\",\"dos\":\"\",\"tres\":\"\",\"cuatro\":\"\",\"cinco\":\"\",\"seis\":\"\",\"siete\":\"\",\"ocho\":\"\",\"nueve\":\"\"}'),(11,572.676,'Verqor','','',8130,7474,'{\"C\":2,\"M\":0,\"J\":1,\"Cb\":0,\"L\":2,\"Z\":2}','{\"C\":\"R\",\"M\":\"FART\",\"J\":\"FART\",\"Cb\":\"FART\",\"L\":\"FART\",\"Z\":\"FART\"}',3,'{\"uno\":\"\",\"dos\":\"\",\"tres\":\"\",\"cuatro\":\"\",\"cinco\":\"\",\"seis\":\"\",\"siete\":\"\",\"ocho\":\"\",\"nueve\":\"\"}'),(13,559.824,'Verqor','Verqor','Coyote',11130,4536,'{\"C\":3,\"M\":-1,\"J\":-1,\"Cb\":-1,\"L\":-1,\"Z\":-1}','{\"C\":\"FAIRT\",\"M\":\"\",\"J\":\"\",\"Cb\":\"\",\"L\":\"\",\"Z\":\"\"}',2,'{\"uno\":\"\",\"dos\":\"\",\"tres\":\"\",\"cuatro\":\"\",\"cinco\":\"\",\"seis\":\"Cebada\",\"siete\":\"Lechuga\",\"ocho\":\"Zanahoria\",\"nueve\":\"\"}');
/*!40000 ALTER TABLE `juegoguardado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `idusuario` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(60) DEFAULT NULL,
  `Genero` varchar(60) DEFAULT NULL,
  `Nacimiento` varchar(255) DEFAULT NULL,
  `Edad` int DEFAULT NULL,
  `Ubicacion` varchar(80) DEFAULT NULL,
  `relacion` varchar(255) DEFAULT NULL,
  `Numero` varchar(255) DEFAULT NULL,
  `Contrasena` varchar(255) DEFAULT NULL,
  `Admin` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`idusuario`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
-- INSERT INTO `usuario` VALUES (5,'Miguel Galicia','H','2024-04-03',NULL,'Jalisco','acopiador','5522444106','5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8',1),(6,'Mujer','M','2024-04-01',NULL,'Oaxaca','inversionista','123456','0b14d501a594442a01c6859541bcb3e8164d183d32937b851835442f69d5c94e',1),(7,'Aislinn Ruiz','M','2004-08-12',NULL,'Tlaxcala','publicoGeneral','2461324146','6ad204e03e309d618ea67942e3345058441a2c4744de532b00a7dbdcdc7eb0e7',0),(8,'Hola1','H','2024-05-02',NULL,'CDMX','financiera','5523806935','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92',0),(9,'David Sanchez Baez','H','2003-05-24',NULL,'Estado de México','inversionista','5572160181','cd9cef07762306812834e8fbe71fc69f68b20ab0922d2911e521178d7fe6f989',0),(10,'David','H','2003-05-24',NULL,'Estado de México','cliente','55721601','3b3927e40c6e2d6dcd4ae074e706611c76b920cd6cfbd0031e70c13029a0c7d1',0),(11,'Miguel NoGalicia','H','2014-02-03',NULL,'Michoacán','acopiador','888','6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4',0),(12,'Miguel NoGalicia','H','2014-02-03',NULL,'Michoacán','acopiador','888','6cf615d5bcaac778352a8f1f3360d23f02f34ec182e259897fd6ce485d7870d4',0),(13,'Jessica Rubi Olmos Pineda','M','2004-07-22',NULL,'CDMX','publicoGeneral','5564356547','92f6b0b121234831e9a87766679ef82c052ee6d737c66c8aa7fe7c96e175a373',0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-04  0:17:47
