CREATE DATABASE  IF NOT EXISTS `potluck` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `potluck`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: potluck
-- ------------------------------------------------------
-- Server version	8.0.36

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `dish`
--

DROP TABLE IF EXISTS `dish`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dish` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `eventId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `disheventid_idx` (`eventId`),
  CONSTRAINT `disheventid` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dish`
--

LOCK TABLES `dish` WRITE;
/*!40000 ALTER TABLE `dish` DISABLE KEYS */;
INSERT INTO `dish` VALUES (11,'ty',12,12),(12,'yu',123,12),(16,'fg',3,13);
/*!40000 ALTER TABLE `dish` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event`
--

DROP TABLE IF EXISTS `event`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(256) DEFAULT NULL,
  `description` varchar(256) DEFAULT NULL,
  `startTime` datetime DEFAULT NULL,
  `location` varchar(256) DEFAULT NULL,
  `type` int DEFAULT NULL,
  `theme` varchar(64) DEFAULT NULL,
  `instruction` varchar(256) DEFAULT NULL,
  `restrictions` varchar(256) DEFAULT NULL,
  `fundtype` varchar(64) DEFAULT NULL,
  `fundamount` varchar(64) DEFAULT NULL,
  `host` int DEFAULT NULL,
  `state` int NOT NULL DEFAULT '0',
  `phone` varchar(16) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `hostid_idx` (`host`),
  CONSTRAINT `hostid` FOREIGN KEY (`host`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event`
--

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;
INSERT INTO `event` VALUES (5,'My Event Updated','This is the updated event','2024-02-15 09:00:01','IN',1,'Party',NULL,NULL,NULL,NULL,NULL,0,NULL),(6,'event name1','This is the updated event','2024-02-14 22:00:01','IN, pun, we, qwesdf, sfdf',NULL,'Party',NULL,NULL,NULL,NULL,NULL,1,''),(7,'Nm of the event','This is the updated event','2024-02-14 22:00:01','IN, pun, we, asd, asd',NULL,'Party',NULL,NULL,NULL,NULL,NULL,0,'12323'),(8,'Testing','This is the updated event','2024-02-14 10:00:01','IN, pun, we, asd, qwe, asd, asd, asd, ewe, asd, qweq',NULL,'Party',NULL,NULL,NULL,NULL,NULL,1,''),(9,'newName','This is the updated event','2024-02-14 11:00:01','IN, pun, we, asd, qwe, asd, asd, asd, sxc, asdasd, aasac',NULL,'Party',NULL,NULL,NULL,NULL,NULL,0,''),(10,'yqww','yg','2024-03-03 17:45:34','g, g, g',NULL,'g',NULL,NULL,NULL,NULL,NULL,0,''),(11,'j','jj','2024-03-03 06:49:50','j, j, j',NULL,'j',NULL,NULL,NULL,NULL,NULL,0,'j'),(12,'k','k','2024-03-01 11:15:42','k, k, k',NULL,'k',NULL,NULL,NULL,NULL,NULL,0,''),(13,'ev','ef','2024-03-03 11:45:00','ev`, ev, ev',NULL,'ev',NULL,NULL,NULL,NULL,NULL,0,'');
/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventguests`
--

DROP TABLE IF EXISTS `eventguests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventguests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventid` int DEFAULT NULL,
  `guestid` int DEFAULT NULL,
  `rsvp` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `guestid_idx` (`guestid`) /*!80000 INVISIBLE */,
  KEY `combined` (`eventid`,`guestid`),
  CONSTRAINT `guesteventid` FOREIGN KEY (`eventid`) REFERENCES `event` (`id`) ON DELETE CASCADE,
  CONSTRAINT `guestid` FOREIGN KEY (`guestid`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventguests`
--

LOCK TABLES `eventguests` WRITE;
/*!40000 ALTER TABLE `eventguests` DISABLE KEYS */;
INSERT INTO `eventguests` VALUES (1,11,2,0),(2,11,3,0),(3,11,4,0),(14,12,17,0),(15,12,18,0),(21,13,23,0);
/*!40000 ALTER TABLE `eventguests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `eventitems`
--

DROP TABLE IF EXISTS `eventitems`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `eventitems` (
  `id` int NOT NULL AUTO_INCREMENT,
  `eventId` int DEFAULT NULL,
  `item` varchar(45) DEFAULT NULL,
  `quantity` int DEFAULT NULL,
  `notes` varchar(256) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `eventId_idx` (`eventId`),
  CONSTRAINT `eventId` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `eventitems`
--

LOCK TABLES `eventitems` WRITE;
/*!40000 ALTER TABLE `eventitems` DISABLE KEYS */;
/*!40000 ALTER TABLE `eventitems` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstname` varchar(45) DEFAULT NULL,
  `secondname` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `allergans` varchar(120) DEFAULT NULL,
  `dietary_restrictions` varchar(120) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'g','g','g@DF.COM',NULL,NULL),(2,'j','j','j@m',NULL,NULL),(3,'b','b','b@bm.bom',NULL,NULL),(4,'v','v','as@v.m',NULL,NULL),(13,'j','j','j',NULL,NULL),(17,'l','l','l',NULL,NULL),(18,'n','n','n',NULL,NULL),(23,'qw','qw','sdnedake@gmail.com','test','dietq');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-04 22:01:57
