/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users`
(
  `id` int unsigned NOT NULL AUTO_INCREMENT,
   `firstname`varchar
(255) NOT NULL,
  `lastname` varchar
(255) NOT NULL,
  `email` varchar
(50) NOT NULL,
  `password` varchar
(255) NOT NULL,
  `role` int unsigned DEFAULT NULL,
  PRIMARY KEY
(`id`),
  UNIQUE KEY `email`
(`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `posts`
(
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `title` varchar
(50) NOT NULL,
  `content` text NOT NULL,
  `media_url` longtext,
  `date` datetime NOT NULL,
  `likes` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY
(`id`),
  KEY `fk_userId`
(`userId`),
  CONSTRAINT `fk_userId` FOREIGN KEY
(`userId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET
=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comments`
(
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `userId` int unsigned NOT NULL,
  `postId` int unsigned NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `comContent` varchar
(255) NOT NULL,
  PRIMARY KEY
(`id`),
  KEY `fk_comments_postId`
(`postId`),
  KEY `fk_comments_userId`
(`userId`),
  CONSTRAINT `fk_comments_postId` FOREIGN KEY
(`postId`) REFERENCES `posts`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE,
  CONSTRAINT `fk_comments_userId` FOREIGN KEY
(`userId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET
=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;


DROP TABLE IF EXISTS `likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `likes`
(
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `postId` int unsigned NOT NULL,
  `userId` int unsigned NOT NULL,
  PRIMARY KEY
(`id`),
  KEY `userId`
(`userId`),
  KEY `fk_like_postId`
(`postId`),
  CONSTRAINT `fk_like_postId` FOREIGN KEY
(`postId`) REFERENCES `posts`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE,
  CONSTRAINT `fk_like_userId` FOREIGN KEY
(`userId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE,
  CONSTRAINT `fk_likes_postId` FOREIGN KEY
(`postId`) REFERENCES `posts`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE,
  CONSTRAINT `fk_likes_userId` FOREIGN KEY
(`userId`) REFERENCES `users`
(`id`) ON
DELETE CASCADE ON
UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET
=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
