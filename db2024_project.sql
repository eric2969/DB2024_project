-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2024-12-08 08:47:49
-- 伺服器版本： 10.4.32-MariaDB
-- PHP 版本： 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `dber`
--

-- --------------------------------------------------------

--
-- 資料表結構 `admins`
--

CREATE TABLE `admins` (
  `username` text NOT NULL,
  `password` text NOT NULL,
  `indice` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `attendance`
--

CREATE TABLE `attendance` (
  `EmpID` int(11) NOT NULL,
  `Create_date` date NOT NULL,
  `Check_in` datetime NOT NULL,
  `Check_out` datetime NOT NULL,
  `Work_type` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `complaint`
--

CREATE TABLE `complaint` (
  `compID` int(11) NOT NULL,
  `complainant` text NOT NULL,
  `email` text NOT NULL,
  `reason` text NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `complaint`
--

INSERT INTO `complaint` (`compID`, `complainant`, `email`, `reason`, `create_time`) VALUES
(1, '0', 'bruh', 'bruh', '2024-12-08 15:33:20'),
(2, '趙子佾', 'eric920425@gmail.com', 'fuck you', '2024-12-08 08:43:34'),
(3, '趙子佾', 'eric920425@gmail.com', 'fuck you', '2024-12-08 08:44:20'),
(4, '趙子佾', 'eric920425@gmail.com', 'fuck you', '2024-12-08 08:44:28'),
(5, '趙子佾', 'eric920425@gmail.com', 'fuck you', '2024-12-08 08:45:08');

-- --------------------------------------------------------

--
-- 資料表結構 `dept`
--

CREATE TABLE `dept` (
  `DeptID` int(11) NOT NULL,
  `Dept_name` text NOT NULL,
  `MgnID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `employee`
--

CREATE TABLE `employee` (
  `EmpID` int(11) NOT NULL,
  `Emp_name` text NOT NULL,
  `Emp_bth` date NOT NULL,
  `Emp_phone` varchar(11) NOT NULL,
  `Emp_dept` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `member`
--

CREATE TABLE `member` (
  `MemID` int(11) NOT NULL,
  `Mem_email` text NOT NULL,
  `Mem_name` text NOT NULL,
  `Mem_bth` date NOT NULL,
  `Mem_phone` varchar(11) NOT NULL,
  `Mem_addr` text NOT NULL,
  `Mem_pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 傾印資料表的資料 `member`
--

INSERT INTO `member` (`MemID`, `Mem_email`, `Mem_name`, `Mem_bth`, `Mem_phone`, `Mem_addr`, `Mem_pass`) VALUES
(6, 'eric920425@gmail.com', '趙子佾', '2024-12-04', '', '', '$2y$10$ahcSZXf2V3VcKt2.325DOeS4DC0jUxaln7oEdZkPAY8KaFLzVXEQa'),
(7, 'eric920425@g', 'er', '2024-12-07', '', '', '$2y$10$yK9rzYK5qZoj9WeUDJg6.OChsHgRrwN0meo4yJ3MblMRVCJ0ei9f6'),
(8, 'eric2565884', '張晏慈', '2024-12-07', '', '', '$2y$10$Rm.1evBEB0Pny/UpWFZt8OOFTdDYS2uoVQhvsVGQdyZXbQ17frjVC');

-- --------------------------------------------------------

--
-- 資料表結構 `merchandise`
--

CREATE TABLE `merchandise` (
  `merID` int(11) NOT NULL,
  `mer_name` text NOT NULL,
  `retail_price` int(11) NOT NULL,
  `start_date` date NOT NULL,
  `mer_pic` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `OrdID` int(11) NOT NULL,
  `CusID` int(11) NOT NULL,
  `EmpID` int(11) NOT NULL,
  `create_time` datetime NOT NULL DEFAULT current_timestamp(),
  `Way_to_pay` varchar(30) NOT NULL,
  `income` int(11) NOT NULL,
  `iscancel` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `order_detail`
--

CREATE TABLE `order_detail` (
  `OrdID` int(11) NOT NULL,
  `MerID` int(11) NOT NULL,
  `Quantity` int(11) NOT NULL,
  `create_time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `supplier`
--

CREATE TABLE `supplier` (
  `SuppID` int(11) NOT NULL,
  `Supp_name` text NOT NULL,
  `Supp_phone` varchar(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `supplies`
--

CREATE TABLE `supplies` (
  `SuppID` int(11) NOT NULL,
  `MerID` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `price_start_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- 資料表結構 `worktype`
--

CREATE TABLE `worktype` (
  `typeid` int(11) NOT NULL,
  `explanation` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`indice`),
  ADD UNIQUE KEY `username` (`username`) USING HASH;

--
-- 資料表索引 `attendance`
--
ALTER TABLE `attendance`
  ADD PRIMARY KEY (`EmpID`,`Create_date`,`Check_in`);

--
-- 資料表索引 `complaint`
--
ALTER TABLE `complaint`
  ADD PRIMARY KEY (`compID`);

--
-- 資料表索引 `dept`
--
ALTER TABLE `dept`
  ADD PRIMARY KEY (`DeptID`);

--
-- 資料表索引 `employee`
--
ALTER TABLE `employee`
  ADD PRIMARY KEY (`EmpID`);

--
-- 資料表索引 `member`
--
ALTER TABLE `member`
  ADD PRIMARY KEY (`MemID`);

--
-- 資料表索引 `merchandise`
--
ALTER TABLE `merchandise`
  ADD PRIMARY KEY (`merID`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`OrdID`);

--
-- 資料表索引 `order_detail`
--
ALTER TABLE `order_detail`
  ADD PRIMARY KEY (`OrdID`,`MerID`);

--
-- 資料表索引 `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`SuppID`);

--
-- 資料表索引 `supplies`
--
ALTER TABLE `supplies`
  ADD PRIMARY KEY (`SuppID`,`price_start_date`,`MerID`);

--
-- 資料表索引 `worktype`
--
ALTER TABLE `worktype`
  ADD PRIMARY KEY (`typeid`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `admins`
--
ALTER TABLE `admins`
  MODIFY `indice` int(1) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `complaint`
--
ALTER TABLE `complaint`
  MODIFY `compID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `dept`
--
ALTER TABLE `dept`
  MODIFY `DeptID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `employee`
--
ALTER TABLE `employee`
  MODIFY `EmpID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `member`
--
ALTER TABLE `member`
  MODIFY `MemID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `merchandise`
--
ALTER TABLE `merchandise`
  MODIFY `merID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `orders`
--
ALTER TABLE `orders`
  MODIFY `OrdID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `supplier`
--
ALTER TABLE `supplier`
  MODIFY `SuppID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `supplies`
--
ALTER TABLE `supplies`
  MODIFY `SuppID` int(11) NOT NULL AUTO_INCREMENT;

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `worktype`
--
ALTER TABLE `worktype`
  MODIFY `typeid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
