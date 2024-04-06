CREATE DATABASE  IF NOT EXISTS `quickmenu` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `quickmenu`;
-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: quickmenu
-- ------------------------------------------------------
-- Server version	8.0.33

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
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `restaurant_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_category_restaurant1_idx` (`restaurant_id`),
  CONSTRAINT `fk_category_restaurant1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (1,'Hamburguesas','Categoría de hamburguesas',0,1),(2,'Pizzas','Categoría de pizza',1,1),(3,'Pastas','Categoría de pastas',0,1),(4,'Cat 2','Desc 1',0,1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `country` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `country_code` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (1,'Argentina','AR');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order`
--

DROP TABLE IF EXISTS `order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `restaurant_id` int unsigned NOT NULL,
  `table_id` int unsigned NOT NULL,
  `order_status_id` int unsigned DEFAULT '1',
  `order_payment_status_id` int unsigned DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `fk_order_restaurant1_idx` (`restaurant_id`),
  KEY `fk_order_table1_idx` (`table_id`),
  KEY `fk_order_order_status1_idx` (`order_status_id`),
  KEY `fk_order_order_payment_status1_idx` (`order_payment_status_id`),
  CONSTRAINT `fk_order_order_payment_status1` FOREIGN KEY (`order_payment_status_id`) REFERENCES `order_payment_status` (`id`),
  CONSTRAINT `fk_order_order_status1` FOREIGN KEY (`order_status_id`) REFERENCES `order_status` (`id`),
  CONSTRAINT `fk_order_restaurant1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`),
  CONSTRAINT `fk_order_table1` FOREIGN KEY (`table_id`) REFERENCES `table` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order`
--

LOCK TABLES `order` WRITE;
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
INSERT INTO `order` VALUES (1,1,1,1,1),(2,1,1,1,2),(3,1,1,2,1),(4,1,1,2,1),(5,1,1,2,1),(6,1,1,3,1),(7,1,1,3,1),(8,1,1,3,1),(9,1,1,3,1),(10,1,1,4,1),(11,1,1,4,1),(12,1,1,4,1),(13,1,1,4,1),(14,1,1,4,1),(15,1,1,4,1),(16,1,1,5,1),(17,1,1,5,1),(18,1,1,5,1),(19,1,1,5,2),(27,1,1,5,1),(28,1,1,5,2),(29,1,1,5,1),(30,1,1,5,1),(32,1,1,5,1),(35,1,1,2,1),(36,1,1,3,1),(37,1,1,2,1),(38,1,1,4,1),(39,1,1,3,1),(40,1,1,2,1),(41,1,1,3,1),(42,1,1,4,1),(43,1,1,2,1),(44,1,1,1,1),(45,1,1,4,1),(46,1,1,1,1),(47,1,1,1,1),(48,1,1,1,1);
/*!40000 ALTER TABLE `order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_payment_status`
--

DROP TABLE IF EXISTS `order_payment_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_payment_status` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  `status_code` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_payment_status`
--

LOCK TABLES `order_payment_status` WRITE;
/*!40000 ALTER TABLE `order_payment_status` DISABLE KEYS */;
INSERT INTO `order_payment_status` VALUES (1,'Pendiente','pending'),(2,'Pagado','paid');
/*!40000 ALTER TABLE `order_payment_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_product`
--

DROP TABLE IF EXISTS `order_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_product` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `order_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_order_item_order1_idx` (`order_id`),
  KEY `fk_order_item_product1_idx` (`product_id`),
  CONSTRAINT `fk_order_item_order1` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `fk_order_item_product1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_product`
--

LOCK TABLES `order_product` WRITE;
/*!40000 ALTER TABLE `order_product` DISABLE KEYS */;
INSERT INTO `order_product` VALUES (22,35,1),(23,36,1),(24,36,2),(25,37,1),(26,37,2),(27,38,1),(28,38,2),(29,39,1),(30,39,2),(31,40,1),(32,40,2),(33,41,1),(34,41,2),(35,42,1),(36,43,1),(37,43,2),(38,43,11),(39,44,1),(40,44,2),(41,44,11),(42,45,1),(43,45,2),(44,45,11),(45,46,1),(46,46,2),(47,46,4),(48,47,1),(49,47,2),(50,48,1),(51,48,12),(52,48,13),(53,1,1),(54,1,2),(55,1,3),(56,1,4),(57,1,5),(58,1,6);
/*!40000 ALTER TABLE `order_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `status` varchar(45) NOT NULL,
  `status_code` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,'Recibido','received'),(2,'En proceso','in_progress'),(3,'Rechazado','rejected'),(4,'Cancelado','cancelled'),(5,'Finalizado','finished');
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `thumbnail` blob,
  `deleted` tinyint(1) DEFAULT '0',
  `category_id` int unsigned NOT NULL,
  `restaurant_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_category1_idx` (`category_id`),
  KEY `fk_product_restaurant1_idx` (`restaurant_id`),
  CONSTRAINT `fk_product_category1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`),
  CONSTRAINT `fk_product_restaurant1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'Hamburguesa Completa','Descripción de Hamburguesa Completa',1800.00,_binary 'fast-food-outline',0,1,1),(2,'Hamburguesa Americana','Descripción de Hamburguesa Americana',1950.00,_binary 'fast-food-outline',0,1,1),(3,'Pizza Clásica','Descripción de Pizza Clásica',1800.00,_binary 'fast-food-outline',0,2,1),(4,'Pizza 4 Quesos','Descripción de Pizza 4 Quesos',1900.00,_binary 'fast-food-outline',0,2,1),(5,'Pizza Roquefort','Descripción de Pizza Roquefort',2000.00,_binary 'fast-food-outline',0,2,1),(6,'Pizza Peperoni','Descripción de Pizza Peperoni',2100.00,_binary 'fast-food-outline',0,2,1),(7,'Pizza Fugazza','Descripción de Pizza Fugazza',2200.00,_binary 'fast-food-outline',0,2,1),(8,'Pizza Fugazzeta','Descripción de Pizza Fugazzeta',2300.00,_binary 'fast-food-outline',0,2,1),(9,'Pasta Noquis','Descripción de Pasta Noquis',2500.00,_binary 'fast-food-outline',0,3,1),(10,'Pasta Panzoti','Descripción de Pasta Panzoti',2600.00,_binary 'fast-food-outline',0,3,1),(11,'Pasta Sorrentinos','Descripción de Pasta Sorrentinos',2400.00,_binary 'fast-food-outline',0,3,1),(12,'Hamburguesa de pizza','Descripción de Hamburguesa Test',1.00,NULL,1,1,1),(13,'Nueva hamburguesa','Descripción de nueva hamburguesa',1111.00,NULL,0,1,1);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `province`
--

DROP TABLE IF EXISTS `province`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `province` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(60) NOT NULL,
  `code` varchar(45) NOT NULL,
  `country_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_province_country1_idx` (`country_id`),
  CONSTRAINT `fk_province_country1` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `province`
--

LOCK TABLES `province` WRITE;
/*!40000 ALTER TABLE `province` DISABLE KEYS */;
INSERT INTO `province` VALUES (1,'Mendoza','mendoza',1),(2,'Buenos Aires','buenos_aires',1),(3,'Catamarca','catamarca',1),(4,'Chaco','chaco',1),(5,'Chubut','chubut',1),(6,'Córdoba','cordoba',1),(7,'Corrientes','corrientes',1),(8,'Entre Ríos','entre_rios',1),(9,'Formosa','formosa',1),(10,'Jujuy','jujuy',1),(11,'La Pampa','la_pampa',1),(12,'La Rioja','la_rioja',1),(13,'Misiones','misiones',1),(14,'Neuquén','neuquen',1),(15,'Río Negro','rio_negro',1),(16,'Salta','salta',1),(17,'San Juan','san_juan',1),(18,'San Luis','san_luis',1),(19,'Santa Cruz','santa_cruz',1),(20,'Santa Fe','santa_fe',1),(21,'Santiago del Estero','santiago_del_estero',1),(22,'Tierra del Fuego','tierra_del_fuego',1),(23,'Tucumán','tucuman',1);
/*!40000 ALTER TABLE `province` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant`
--

DROP TABLE IF EXISTS `restaurant`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `string_id` varchar(60) NOT NULL,
  `name` varchar(60) NOT NULL,
  `address` varchar(150) DEFAULT NULL,
  `phone_number` varchar(45) DEFAULT NULL,
  `logo` blob,
  `banner` blob,
  `lat` varchar(45) DEFAULT NULL,
  `lon` varchar(45) DEFAULT NULL,
  `user_id` int unsigned NOT NULL,
  `province_id` int unsigned NOT NULL,
  `currency_symbol` varchar(8) DEFAULT '$',
  `deleted` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`,`string_id`),
  KEY `fk_restaurant_user_idx` (`user_id`),
  KEY `fk_restaurant_province1_idx` (`province_id`),
  KEY `fk_restaurant_province_id1_idx` (`province_id`) USING BTREE,
  CONSTRAINT `fk_restaurant_province1` FOREIGN KEY (`province_id`) REFERENCES `province` (`id`),
  CONSTRAINT `fk_restaurant_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant`
--

LOCK TABLES `restaurant` WRITE;
/*!40000 ALTER TABLE `restaurant` DISABLE KEYS */;
INSERT INTO `restaurant` VALUES (1,'rufino','Rufino','Av siempreviva 123','2613034926',NULL,NULL,'1111111','222222',1,1,'$',0),(2,'hipolito','Hipólito','Av San Martin 477','2614202017',NULL,NULL,'333333','44444',1,1,'$',0),(3,'rufinos_del_campo','Rufinos del campo','Av siempreviva 1234','2613034926',_binary '?',_binary '?','1111111','222222',1,1,'$',1),(4,'test','Test','Creación','261444',NULL,NULL,NULL,NULL,1,4,'USD',1),(5,'test','Test','Creación 2','2222',NULL,NULL,NULL,NULL,1,3,'R$',1);
/*!40000 ALTER TABLE `restaurant` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `restaurant_user`
--

DROP TABLE IF EXISTS `restaurant_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `restaurant_user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `restaurant_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_restaurant_user_user_id` (`user_id`),
  KEY `fk_restaurant_user_restaurant_id_id` (`restaurant_id`),
  CONSTRAINT `fk_restaurant_user_restaurant_id` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`),
  CONSTRAINT `fk_restaurant_user_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `restaurant_user`
--

LOCK TABLES `restaurant_user` WRITE;
/*!40000 ALTER TABLE `restaurant_user` DISABLE KEYS */;
INSERT INTO `restaurant_user` VALUES (25,1,1);
/*!40000 ALTER TABLE `restaurant_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol`
--

DROP TABLE IF EXISTS `rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `description` varchar(120) NOT NULL,
  `code` varchar(45) NOT NULL,
  `icon` varchar(30) NOT NULL DEFAULT 'fas fa-user-cog',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol`
--

LOCK TABLES `rol` WRITE;
/*!40000 ALTER TABLE `rol` DISABLE KEYS */;
INSERT INTO `rol` VALUES (1,'Administrador','Rol para administrar usuarios en la plataforma','admin','fas fa-user-cog'),(2,'Restaurant','Rol para administrar locales gastronómicos','restaurant','fas fa-clipboard-list');
/*!40000 ALTER TABLE `rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `table`
--

DROP TABLE IF EXISTS `table`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `table` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(60) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `restaurant_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_table_restaurant1_idx` (`restaurant_id`) USING BTREE,
  CONSTRAINT `table_ibfk_1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `table`
--

LOCK TABLES `table` WRITE;
/*!40000 ALTER TABLE `table` DISABLE KEYS */;
INSERT INTO `table` VALUES (1,'Mesa 1',0,1),(3,'Mesa 2',0,1),(4,'Mesa 3',0,1),(5,'Mesa 44',1,1);
/*!40000 ALTER TABLE `table` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `description` varchar(60) NOT NULL,
  `deleted` tinyint(1) NOT NULL,
  `restaurant_id` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tables_restaurant1_idx` (`restaurant_id`),
  CONSTRAINT `fk_tables_restaurant1` FOREIGN KEY (`restaurant_id`) REFERENCES `restaurant` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(120) NOT NULL,
  `password` varchar(120) NOT NULL,
  `deleted` tinyint(1) DEFAULT '0',
  `last_connection` datetime DEFAULT NULL,
  `date_created` datetime DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'cristianchiappone@gmail.com','$2b$10$kgs2jrAwNOyZtEWebnZgo.wjZMMu2QIO9HKtwXnyqcFJx9tooSRRe',0,'2020-01-01 10:10:01','2020-01-01 10:10:01','2020-01-01 10:10:01'),(3,'test@test.com','1E40miJ5YKsFo6Y',0,NULL,'2023-05-21 15:42:47',NULL),(4,'test2@test.com','$2b$10$odlPWhQ5.mIxqJ/tfiFduuKDFkDmkD6RqFe3DLzvhvFCOiFUBBAvy',0,NULL,'2023-05-21 15:46:02',NULL),(5,'r1@test.com','$2b$10$.ZwuAxb3TMVv7/8hXMGY7.7ylfNyh9OMjv0U3NLX0sweDBWITrqDW',0,NULL,'2023-05-21 19:10:14',NULL),(6,'rufino@quickmenu.com','$2b$10$SlppQaw9rYkOTgS0iAFjhOqYO4rdrFWio.9kGZ9X3u32wlBEA4J1G',0,NULL,'2023-05-30 00:32:39',NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_log`
--

DROP TABLE IF EXISTS `user_log`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_log` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `last_action` varchar(45) NOT NULL,
  `date_last_action` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_id_UNIQUE` (`user_id`),
  KEY `idx_user_log_user_id` (`user_id`),
  CONSTRAINT `idx_user_log_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_log`
--

LOCK TABLES `user_log` WRITE;
/*!40000 ALTER TABLE `user_log` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_log` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_rol`
--

DROP TABLE IF EXISTS `user_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_rol` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int unsigned NOT NULL,
  `rol_id` int unsigned NOT NULL,
  `date_created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_modified` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_rol_user_id` (`user_id`),
  KEY `fk_user_rol_rol_id` (`rol_id`),
  CONSTRAINT `fk_user_rol_rol_id` FOREIGN KEY (`rol_id`) REFERENCES `rol` (`id`),
  CONSTRAINT `fk_user_rol_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_rol`
--

LOCK TABLES `user_rol` WRITE;
/*!40000 ALTER TABLE `user_rol` DISABLE KEYS */;
INSERT INTO `user_rol` VALUES (12,1,1,'2020-11-26 00:29:51','2020-11-26 00:29:51'),(13,1,2,'2020-11-26 00:29:51',NULL),(21,5,1,'2023-05-22 21:32:46',NULL),(23,6,2,'2023-05-30 00:32:46',NULL),(24,5,2,'2023-05-30 02:13:01',NULL);
/*!40000 ALTER TABLE `user_rol` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-06-02 14:04:24
