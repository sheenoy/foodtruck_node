-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Sep 10, 2018 at 05:33 AM
-- Server version: 5.7.21
-- PHP Version: 7.1.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `truckfood`
--

-- --------------------------------------------------------

--
-- Table structure for table `otp_verification`
--

DROP TABLE IF EXISTS `otp_verification`;
CREATE TABLE IF NOT EXISTS `otp_verification` (
  `user_id` int(11) NOT NULL,
  `otp_type` enum('email','sms') NOT NULL DEFAULT 'sms',
  `otp_text` varchar(15) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `otp_verification`
--

INSERT INTO `otp_verification` (`user_id`, `otp_type`, `otp_text`, `created_at`, `updated_at`) VALUES
(1, 'sms', '12ABC2', '2018-09-10 10:51:59', '2018-09-10 05:21:59');

-- --------------------------------------------------------

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
CREATE TABLE IF NOT EXISTS `status` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `status_txt` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `mobile` varchar(15) NOT NULL,
  `email` varchar(255) NOT NULL,
  `first_name` varchar(200) NOT NULL,
  `last_name` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `user_type` smallint(4) NOT NULL DEFAULT '4',
  `country` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  `city` varchar(150) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` varchar(10) DEFAULT '',
  `longitude` varchar(10) DEFAULT '',
  `status` smallint(4) NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `mobile`, `email`, `first_name`, `last_name`, `password`, `user_type`, `country`, `state`, `city`, `address`, `latitude`, `longitude`, `status`, `created_at`, `updated_at`) VALUES
(1, '9670677765', '', '', '', '', 4, 0, 0, '', '', '', '', 1, NULL, '2018-09-09 13:33:08'),
(4, '9670677761', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', NULL, NULL, 1, '2018-09-09 19:23:26', '2018-09-09 13:53:26'),
(5, '9670677762', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', NULL, NULL, 1, '2018-09-09 19:24:32', '2018-09-09 13:54:32'),
(6, '9670677763', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', NULL, NULL, 1, '2018-09-09 19:24:53', '2018-09-09 13:54:53'),
(7, '9670677764', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', NULL, NULL, 1, '2018-09-09 19:25:27', '2018-09-09 13:55:27'),
(8, '9670677766', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', NULL, NULL, 1, '2018-09-09 19:28:25', '2018-09-09 13:58:25'),
(9, '9670677767', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', NULL, NULL, 1, '2018-09-09 19:30:48', '2018-09-09 14:00:48'),
(10, '9670677768', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', NULL, NULL, 1, '2018-09-09 19:32:28', '2018-09-09 14:02:28'),
(11, '9670677769', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', NULL, NULL, 1, '2018-09-09 19:35:04', '2018-09-09 14:05:04'),
(12, '9670677770', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', NULL, NULL, 1, '2018-09-09 19:37:20', '2018-09-09 14:07:20'),
(13, '9670677771', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', '', '', 1, '2018-09-09 19:38:26', '2018-09-09 14:08:26'),
(14, '9670677772', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', '', '', 1, '2018-09-09 19:41:21', '2018-09-09 14:11:21'),
(15, '9670677773', '', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', '', '', 1, '2018-09-09 19:42:17', '2018-09-09 14:12:17'),
(16, '9670677774', 'acc.00amit@gmail.com', 'Amit', 'Kumar', '', 4, 1, 1, 'Lucknow', 'omaxe Avenue', '', '', 1, '2018-09-09 19:42:47', '2018-09-09 14:12:47');

-- --------------------------------------------------------

--
-- Table structure for table `users_address`
--

DROP TABLE IF EXISTS `users_address`;
CREATE TABLE IF NOT EXISTS `users_address` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `country_id` int(10) NOT NULL,
  `state_id` int(10) NOT NULL,
  `city_name` int(100) NOT NULL,
  `address` int(100) NOT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL,
  `address_type` enum('primary','secondary') NOT NULL DEFAULT 'secondary',
  `status` smallint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `users_bank_details`
--

DROP TABLE IF EXISTS `users_bank_details`;
CREATE TABLE IF NOT EXISTS `users_bank_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(10) NOT NULL,
  `bank_id` int(10) NOT NULL,
  `bank_account` varchar(50) NOT NULL,
  `ifsc_code` varchar(10) NOT NULL,
  `bank_address` varchar(200) NOT NULL,
  `acc_holdername` varchar(100) NOT NULL,
  `account_type` enum('primary','secondary') NOT NULL DEFAULT 'secondary',
  `status` smallint(2) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `user_type`
--

DROP TABLE IF EXISTS `user_type`;
CREATE TABLE IF NOT EXISTS `user_type` (
  `id` smallint(4) NOT NULL AUTO_INCREMENT,
  `user_type` varchar(100) NOT NULL,
  `description` varchar(255) NOT NULL,
  `status` enum('1','2','3') NOT NULL DEFAULT '1',
  `created_at` datetime DEFAULT NULL,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user_type`
--

INSERT INTO `user_type` (`id`, `user_type`, `description`, `status`, `created_at`, `updated_at`) VALUES
(1, 'admin', 'administrator', '1', '2018-09-08 11:26:26', '2018-09-09 15:29:08'),
(2, 'vender', 'vender', '1', '2018-09-08 11:26:26', '2018-09-09 15:28:50'),
(3, 'Sub Admin', 'Sub Admin', '1', '2018-09-08 11:26:26', '2018-09-08 10:54:14'),
(4, 'customer', 'Customer', '1', '2018-09-08 11:26:26', '2018-09-09 15:28:57');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
