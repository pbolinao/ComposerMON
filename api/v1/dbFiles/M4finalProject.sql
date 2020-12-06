-- phpMyAdmin SQL Dump
-- version 4.9.5
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Dec 06, 2020 at 01:40 AM
-- Server version: 5.6.49
-- PHP Version: 7.3.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jamespca_composermon`
--

-- --------------------------------------------------------

--
-- Table structure for table `attacksBuffs`
--

CREATE TABLE `attacksBuffs` (
  `ID` int(11) NOT NULL,
  `Name` varchar(34) CHARACTER SET utf8 DEFAULT NULL,
  `Damage` int(11) DEFAULT NULL,
  `Effects_Buffs` int(11) DEFAULT NULL,
  `Target_Self_Enemy` varchar(5) CHARACTER SET utf8 DEFAULT NULL,
  `Composer` varchar(24) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attacksBuffs`
--

INSERT INTO `attacksBuffs` (`ID`, `Name`, `Damage`, `Effects_Buffs`, `Target_Self_Enemy`, `Composer`) VALUES
(1, 'Piano Concerto No. 21', 15, 0, 'Enemy', 'Wolfgang Amadeus Mozart'),
(2, 'Requiem, K. 626: Lacrimosa', 10, 0, 'Enemy', 'Wolfgang Amadeus Mozart'),
(3, 'Symphony No.25', 5, 0, 'Enemy', 'Wolfgang Amadeus Mozart'),
(4, 'Piano Sonata No.16', 0, 10, 'Self', 'Wolfgang Amadeus Mozart'),
(5, 'Sonata No. 14 ‘Moonlight’', 15, 0, 'Enemy', 'Ludwig van Beethoven'),
(6, 'Bagatelle No. 25', 10, 0, 'Enemy', 'Ludwig van Beethoven'),
(7, 'Symphony No. 5', 5, 0, 'Enemy', 'Ludwig van Beethoven'),
(8, 'Für Elise', 0, 10, 'Self', 'Ludwig van Beethoven'),
(9, 'Cello Suite No.1', 15, 0, 'Enemy', 'Johann Sebastian Bach'),
(10, 'The Well-Tempered Clavier', 10, 0, 'Enemy', 'Johann Sebastian Bach'),
(11, 'Goldberg Variations', 5, 0, 'Enemy', 'Johann Sebastian Bach'),
(12, 'Unaccompanied Cello Suite No.1', 0, 10, 'Self', 'Johann Sebastian Bach'),
(13, 'Wiegenlied', 15, 0, 'Enemy', 'Johannes Brahms'),
(14, 'Sechs Klavierstücke', 10, 0, 'Enemy', 'Johannes Brahms'),
(15, 'Hungarian Dance No.5', 5, 0, 'Enemy', 'Johannes Brahms'),
(16, 'Symphony No. 3', 0, 10, 'Self', 'Johannes Brahms'),
(17, 'Nocturne en mi bémol majeur opus 9', 15, 0, 'Enemy', 'Frederic Chopin'),
(18, 'Nocturne No. 20', 10, 0, 'Enemy', 'Frederic Chopin'),
(19, 'Nocturne No. 2', 5, 0, 'Enemy', 'Frederic Chopin'),
(20, 'Nocturne, Op. posth.', 0, 10, 'Self', 'Frederic Chopin'),
(21, 'Clair de Lune', 15, 0, 'Enemy', 'Claude Debussy'),
(22, 'Suite bergamasque', 10, 0, 'Enemy', 'Claude Debussy'),
(23, 'Rêverie', 5, 0, 'Enemy', 'Claude Debussy'),
(24, 'Suite bergamasque, L. 75', 0, 10, 'Self', 'Claude Debussy'),
(25, 'Cello Concerto No. 1', 15, 0, 'Enemy', 'Franz Joseph Haydn'),
(26, 'String Quartet No. 62', 10, 0, 'Enemy', 'Franz Joseph Haydn'),
(27, 'Symphony No. 104', 5, 0, 'Enemy', 'Franz Joseph Haydn'),
(28, 'Piano Sonata (Partita)', 0, 10, 'Self', 'Franz Joseph Haydn'),
(29, 'Devil’s Trill', 15, 0, 'Enemy', 'Giuseppe Tartini'),
(30, 'Devil’s Trill III', 10, 0, 'Enemy', 'Giuseppe Tartini'),
(31, 'Sonata in G Minor', 5, 0, 'Enemy', 'Giuseppe Tartini'),
(32, 'Devil’s Trill I', 0, 10, 'Self', 'Giuseppe Tartini'),
(33, 'Swan Lake', 15, 0, 'Enemy', 'Pyotr Ilyich Tchaikovsky'),
(34, 'The Nutcracker', 10, 0, 'Enemy', 'Pyotr Ilyich Tchaikovsky'),
(35, 'Variations on a Rococo Theme', 5, 0, 'Enemy', 'Pyotr Ilyich Tchaikovsky'),
(36, 'Album for the Young', 0, 10, 'Self', 'Pyotr Ilyich Tchaikovsky'),
(37, 'Doot Doot', 15, 0, 'Enemy', 'Trumpet Boy'),
(38, 'Scales', 10, 0, 'Enemy', 'Trumpet Boy'),
(39, 'Put pa da put', 5, 0, 'Enemy', 'Trumpet Boy'),
(40, 'HONK', 0, 10, 'Self', 'Trumpet Boy'),
(41, 'Vivaldi Variation', 15, 0, 'Enemy', 'Antonio Vivaldi'),
(42, 'Violin Concerto in G Minor', 10, 0, 'Enemy', 'Antonio Vivaldi'),
(43, 'The Four Seasons', 5, 0, 'Enemy', 'Antonio Vivaldi'),
(44, 'The Four Seasons - Summer', 0, 10, 'Self', 'Antonio Vivaldi'),
(45, 'Die Walkure', 15, 0, 'Enemy', 'Richard Wagner'),
(46, 'Lohengrin', 10, 0, 'Enemy', 'Richard Wagner'),
(47, 'Tannhäuser', 5, 0, 'Enemy', 'Richard Wagner'),
(48, 'La Cabalgata De Las Valkirias', 0, 10, 'Self', 'Richard Wagner');

-- --------------------------------------------------------

--
-- Table structure for table `composers`
--

CREATE TABLE `composers` (
  `ID` int(11) NOT NULL,
  `Name` varchar(24) CHARACTER SET utf8 DEFAULT NULL,
  `Attack_IDs_Array` varchar(14) CHARACTER SET utf8 DEFAULT NULL,
  `Image` varchar(59) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `composers`
--

INSERT INTO `composers` (`ID`, `Name`, `Attack_IDs_Array`, `Image`) VALUES
(1, 'Wolfgang Amadeus Mozart', '1, 2, 3, 4', 'https://jamesp.ca/composermon/api/v1/images/mozart.png'),
(2, 'Ludwig van Beethoven', '5, 6, 7, 8', 'https://jamesp.ca/composermon/api/v1/images/beethoven.png'),
(3, 'Johann Sebastian Bach', '9, 10, 11, 12', 'https://jamesp.ca/composermon/api/v1/images/bach.png'),
(4, 'Johannes Brahms', '13, 14, 15, 16', 'https://jamesp.ca/composermon/api/v1/images/brahms.png'),
(5, 'Frederic Chopin', '17, 18, 19, 20', 'https://jamesp.ca/composermon/api/v1/images/chopin.png'),
(6, 'Claude Debussy', '21, 22, 23, 24', 'https://jamesp.ca/composermon/api/v1/images/debussy.png'),
(7, 'Franz Joseph Haydn', '25, 26, 27, 28', 'https://jamesp.ca/composermon/api/v1/images/haydn.png'),
(8, 'Giuseppe Tartini', '29, 30, 31, 32', 'https://jamesp.ca/composermon/api/v1/images/tartini.png'),
(9, 'Pyotr Ilyich Tchaikovsky', '33, 34, 35, 36', 'https://jamesp.ca/composermon/api/v1/images/tchaikovsky.png'),
(10, 'Trumpet Boy', '37, 38, 39, 40', 'https://jamesp.ca/composermon/api/v1/images/trumpetboy.png'),
(11, 'Antonio Vivaldi', '41, 42, 43, 44', 'https://jamesp.ca/composermon/api/v1/images/vivaldi.png'),
(12, 'Richard Wagner', '45, 46, 47, 48', 'https://jamesp.ca/composermon/api/v1/images/wagner.png');

-- --------------------------------------------------------

--
-- Table structure for table `gameState`
--

CREATE TABLE `gameState` (
  `gameID` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `Player1` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `P1_C1` tinyint(4) DEFAULT NULL,
  `P1_C2` tinyint(4) DEFAULT NULL,
  `P1_C3` tinyint(4) DEFAULT NULL,
  `Player2` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `P2_C1` tinyint(4) DEFAULT NULL,
  `P2_C2` tinyint(4) DEFAULT NULL,
  `P2_C3` tinyint(4) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `ID` int(11) NOT NULL,
  `Name` varchar(10) CHARACTER SET utf8 DEFAULT NULL,
  `Effect` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `Value` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`ID`, `Name`, `Effect`, `Value`) VALUES
(1, 'Potion', 'Heals 30%', 30),
(2, 'Max Potion', 'Heals full health', 100),
(3, 'Revive', 'Revives a ComposerMON to half hp', 50),
(4, 'Max-Revive', 'Revives a ComposerMON to full HP', 100);

-- --------------------------------------------------------

--
-- Table structure for table `recentMatches`
--

CREATE TABLE `recentMatches` (
  `ID` bigint(20) UNSIGNED NOT NULL,
  `Player_1` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `Player_2` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `Winner` varchar(255) CHARACTER SET utf8 DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `teams`
--

CREATE TABLE `teams` (
  `ID` varchar(255) DEFAULT NULL,
  `Creators_Team` tinyint(4) DEFAULT NULL,
  `Composer_1` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `Composer_1_ID` int(11) DEFAULT NULL,
  `Composer_2` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `Composer_2_ID` int(11) DEFAULT NULL,
  `Composer_3` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `Composer_3_ID` int(11) DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

--
-- Dumping data for table `teams`
--

INSERT INTO `teams` (`ID`, `Creators_Team`, `Composer_1`, `Composer_1_ID`, `Composer_2`, `Composer_2_ID`, `Composer_3`, `Composer_3_ID`) VALUES
('1', 1, 'Antonio Vivaldi', 11, 'Trumpet Boy', 10, 'Frederic Chopin', 5),
('2', 1, 'Ludwig van Beethoven', 2, 'Johann Sebastian Bach', 3, 'Pyotr Ilyich Tchaikovsky', 9),
('3', 1, 'Wolfgang Amadeus Mozart', 1, 'Ludwig van Beethoven', 2, 'Giuseppe Tartini', 8),
('4', 1, 'Trumpet Boy', 10, 'Trumpet Boy', 10, 'Trumpet Boy', 10);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attacksBuffs`
--
ALTER TABLE `attacksBuffs`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `composers`
--
ALTER TABLE `composers`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `recentMatches`
--
ALTER TABLE `recentMatches`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `ID` (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `recentMatches`
--
ALTER TABLE `recentMatches`
  MODIFY `ID` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
