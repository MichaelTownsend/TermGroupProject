-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Apr 25, 2021 at 11:57 PM
-- Server version: 10.3.28-MariaDB-log
-- PHP Version: 7.3.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mtownonl_teamTermProject`
--

-- --------------------------------------------------------

--
-- Table structure for table `highScore`
--

CREATE TABLE `highScore` (
  `id` int(11) NOT NULL,
  `score` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `highScore`
--

INSERT INTO `highScore` (`id`, `score`) VALUES
(62, 4),
(65, 2),
(66, 1),
(67, 0),
(68, 4),
(69, 55);

-- --------------------------------------------------------

--
-- Table structure for table `name`
--

CREATE TABLE `name` (
  `id` int(11) NOT NULL,
  `name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `name`
--

INSERT INTO `name` (`id`, `name`) VALUES
(62, 'MichaelTownsend'),
(65, 'alex'),
(66, 'jay'),
(67, 'sam'),
(68, 'sad'),
(69, 'michael');

-- --------------------------------------------------------

--
-- Table structure for table `time`
--

CREATE TABLE `time` (
  `id` int(11) NOT NULL,
  `nameId` int(11) NOT NULL,
  `time` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `time`
--

INSERT INTO `time` (`id`, `nameId`, `time`) VALUES
(35, 62, 1),
(36, 62, 6),
(60, 65, 4),
(61, 66, 4),
(62, 67, 1),
(63, 67, 2),
(64, 68, 7),
(65, 69, 5),
(66, 69, 10);

-- --------------------------------------------------------

--
-- Table structure for table `turns`
--

CREATE TABLE `turns` (
  `id` int(11) NOT NULL,
  `nameId` int(11) NOT NULL,
  `turns` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `turns`
--

INSERT INTO `turns` (`id`, `nameId`, `turns`) VALUES
(37, 62, 1),
(38, 62, 23),
(62, 65, 8),
(63, 66, 11),
(64, 67, 0),
(65, 67, 3),
(66, 68, 15),
(67, 69, 15),
(68, 69, 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `highScore`
--
ALTER TABLE `highScore`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `name`
--
ALTER TABLE `name`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `time`
--
ALTER TABLE `time`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test2` (`nameId`);

--
-- Indexes for table `turns`
--
ALTER TABLE `turns`
  ADD PRIMARY KEY (`id`),
  ADD KEY `test` (`nameId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `highScore`
--
ALTER TABLE `highScore`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `name`
--
ALTER TABLE `name`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `time`
--
ALTER TABLE `time`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=67;

--
-- AUTO_INCREMENT for table `turns`
--
ALTER TABLE `turns`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `highScore`
--
ALTER TABLE `highScore`
  ADD CONSTRAINT `highScore_ibfk_1` FOREIGN KEY (`id`) REFERENCES `name` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `time`
--
ALTER TABLE `time`
  ADD CONSTRAINT `test2` FOREIGN KEY (`nameId`) REFERENCES `name` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `turns`
--
ALTER TABLE `turns`
  ADD CONSTRAINT `test` FOREIGN KEY (`nameId`) REFERENCES `name` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
