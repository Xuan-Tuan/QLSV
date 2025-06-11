/*
 Navicat Premium Data Transfer
 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80036
 Source Host           : localhost:3333
 Source Schema         : 2024-express-qly-sv

 Target Server Type    : MySQL
 Target Server Version : 80036
 File Encoding         : 65001
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for authentication
-- ----------------------------
DROP TABLE IF EXISTS `authentication`;
CREATE TABLE `authentication`  (
  `authId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`authId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `adminId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `authId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`adminId`) USING BTREE,
  INDEX `fk_Admin`(`authId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for parent
-- ----------------------------
DROP TABLE IF EXISTS `parent`;
CREATE TABLE `parent`  (
  `parentId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `authId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`parentId`) USING BTREE,
  INDEX `fk_Parent`(`authId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;
 

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `MSSV` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `RFID` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `parentId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `authId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MSSV`) USING BTREE,
  INDEX `fk_Student1`(`parentId` ASC) USING BTREE,
  INDEX `fk_Student2`(`authId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for lecturer
-- ----------------------------
DROP TABLE IF EXISTS `lecturer`;
CREATE TABLE `lecturer`  (
  `lecturerId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `authId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`lecturerId`) USING BTREE,
  INDEX `fk_Lecturer`(`authId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `courseId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameCourse` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `startDay` date NULL DEFAULT NULL,
  `numberWeek` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `startTime` time NULL DEFAULT NULL,
  `onlineUrl` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `endTime` time NULL DEFAULT NULL,
  `lecturerId` varchar(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `roomId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`courseId`) USING BTREE,
  INDEX `fk_Course1`(`lecturerId` ASC) USING BTREE,
  INDEX `fk_Course2`(`roomId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for coursestudent
-- ----------------------------
DROP TABLE IF EXISTS `coursestudent`;
CREATE TABLE `coursestudent`  (
  `courseId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `MSSV` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`courseId`,`MSSV`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device`  (
  `deviceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomId` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`deviceId`) USING BTREE,
  INDEX `fk_Device`(`roomId` ASC) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for info
-- ----------------------------
DROP TABLE IF EXISTS `info`;
CREATE TABLE `info`  (
  `infoId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `content` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `courseId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`infoId`) USING BTREE,
  INDEX `fk_Info`(`courseId` ASC) USING BTREE
  
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- --------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `roomId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameRoom` char(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`roomId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for schedule
-- ----------------------------
DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule`  (
  `scheduleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateSche` date NULL DEFAULT NULL,
  `courseId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`scheduleId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance`  (
  `attended` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `MSSV` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `scheduleId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`MSSV`,`scheduleId`)
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;

-- ADD CONSTRAINT:

-- ADMIN:
 ALTER TABLE `admin` 
 ADD CONSTRAINT `fk_Admin` FOREIGN KEY (`authId`) REFERENCES `authentication` (`authId`) ON DELETE RESTRICT ON UPDATE RESTRICT;
-- PARENT:
 ALTER TABLE `parent` 
 ADD CONSTRAINT `fk_Parent` FOREIGN KEY (`authId`) REFERENCES `authentication` (`authId`) ON DELETE RESTRICT ON UPDATE RESTRICT;
-- STUDENT:
ALTER TABLE `student` 
ADD CONSTRAINT `fk_Student1` FOREIGN KEY (`parentId`) REFERENCES `parent` (`parentId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `student`
ADD CONSTRAINT `fk_Student2` FOREIGN KEY (`authId`) REFERENCES `authentication` (`authId`) ON DELETE RESTRICT ON UPDATE RESTRICT;
-- LECTURER:
ALTER TABLE `lecturer` 
ADD CONSTRAINT `fk_Lecturer` FOREIGN KEY (`authId`) REFERENCES `authentication` (`authId`) ON DELETE RESTRICT ON UPDATE RESTRICT;
-- COURSE:
ALTER TABLE `course`
ADD CONSTRAINT `fk_Course1` FOREIGN KEY (`lecturerId`) REFERENCES `lecturer` (`lecturerId`) ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE `course`
ADD CONSTRAINT `fk_Course2` FOREIGN KEY (`roomId`) REFERENCES `room` (`roomId`) ON DELETE SET NULL ON UPDATE CASCADE;
-- COURSESTUDENT:
ALTER TABLE `coursestudent`
ADD CONSTRAINT `fk_coursestudent1` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `coursestudent`
ADD CONSTRAINT `fk_coursestudent2` FOREIGN KEY (`MSSV`) REFERENCES `student` (`MSSV`) ON DELETE CASCADE ON UPDATE CASCADE;
-- DEVICE:
ALTER TABLE `device`
ADD CONSTRAINT `fk_Device` FOREIGN KEY (`roomId`) REFERENCES `room` (`roomId`) ON DELETE SET NULL ON UPDATE CASCADE;
-- INFO:
ALTER TABLE `info`
ADD CONSTRAINT `fk_Info` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- SCHEDULE:
ALTER TABLE `schedule`
ADD CONSTRAINT `fk_schedule1` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE;
-- ATTENDANCE:
ALTER TABLE `attendance`
ADD CONSTRAINT `fk_attendance1` FOREIGN KEY (`MSSV`) REFERENCES student(`MSSV`) ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE `attendance`
ADD CONSTRAINT `FK_attendance2` FOREIGN KEY (`scheduleId`) REFERENCES schedule(`scheduleId`) ON DELETE CASCADE ON UPDATE CASCADE;


-- INSERT DATA:

-- ----------------------------
-- Records of authentication
-- ----------------------------
INSERT INTO `authentication` VALUES ('76425df1', 'admin@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'admin');
INSERT INTO `authentication` VALUES ('AUTH000', 'admin@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'admin');

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('A001', 'Admin01', 'admin@uit.edu.vn', '0981122334', 'Hà Tĩnh', 'AUTH000');
INSERT INTO `admin` VALUES ('bab1ec4d', 'Admin02', 'admin@gmail.com', '0363649135', 'Hà Tĩnh', '76425df1');

-- ----------------------------
-- Records of authentication
-- ----------------------------
-- INSERT INTO `authentication` VALUES ('AUTH001', 'hoangnx@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
-- INSERT INTO `authentication` VALUES ('AUTH002', 'ductm@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
-- INSERT INTO `authentication` VALUES ('AUTH003', 'caunv@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
-- INSERT INTO `authentication` VALUES ('AUTH004', 'tient@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
-- INSERT INTO `authentication` VALUES ('AUTH005', 'hungtd@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
-- INSERT INTO `authentication` VALUES ('AUTH006', 'tuannx.uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
-- INSERT INTO `authentication` VALUES ('AUTH007', 'giangtm.uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
-- INSERT INTO `authentication` VALUES ('AUTH008', 'triennd@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
-- INSERT INTO `authentication` VALUES ('AUTH009', 'vietth@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
-- INSERT INTO `authentication` VALUES ('AUTH010', 'huytd.uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
-- INSERT INTO `authentication` VALUES ('AUTH011', 'duyd@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');
-- INSERT INTO `authentication` VALUES ('AUTH012', 'sonnm@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');
-- INSERT INTO `authentication` VALUES ('AUTH013', 'khaild@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');
-- INSERT INTO `authentication` VALUES ('AUTH014', 'locth@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');



-- ----------------------------
-- Records of parent
-- ----------------------------
-- INSERT INTO `parent` VALUES ('P001', 'Nguyễn Xuân Hoàng', 'hoangnx@gmail.com', '0123456789', 'Hà Tĩnh', 'AUTH001');
-- INSERT INTO `parent` VALUES ('P002', 'Trương Minh Đức', 'ductm@gmail.com', '0123456789', 'Lâm Đồng', 'AUTH002');
-- INSERT INTO `parent` VALUES ('P003', 'Nguyễn Văn Cầu', 'caunv@gmail.com', '0123456789', 'Vĩnh Long', 'AUTH003');
-- INSERT INTO `parent` VALUES ('P004', 'Trần Tiến', 'tient@gmail.com', '0123456789', 'Huế', 'AUTH004');
-- INSERT INTO `parent` VALUES ('P005', 'Tạ Duy Hưng', 'hungtd@gmail.com', '0123456789', 'Tiền Giang', 'AUTH005');

-- ----------------------------
-- Records of student
-- ----------------------------
-- INSERT INTO `student` VALUES ('20520550', ' Tạ Duy Huy', 'huytd.uit.edu.vn', '0912345678', 'Tiền Giang', '13003F1496AE', 'P005', 'AUTH010');
-- INSERT INTO `student` VALUES ('20520940', 'Nguyễn Đức Triển', 'triennd@uit.edu.vn', '0912345678', 'Vĩnh Long', '13003BF21EC4', 'P003', 'AUTH008');
-- INSERT INTO `student` VALUES ('20520953', 'Trương Minh Giảng', 'giangtm.uit.edu.vn', '0912345678', 'Lâm Đồng', '13003C0E4362', 'P002', 'AUTH007');
-- INSERT INTO `student` VALUES ('20522123', 'Nguyễn Xuân Tuấn', 'tuannx.uit.edu.vn', '0912345678', 'Hà Tĩnh', '13003CEC8F4C', 'P001', 'AUTH006');
-- INSERT INTO `student` VALUES ('20522154', 'Trần Hoàng Việt', 'vietth@uit.edu.vn', '0912345678', 'Huế', '13003EEBAB6D', 'P004', 'AUTH009');


-- ----------------------------
-- Records of lecturer
-- ----------------------------
-- INSERT INTO `lecturer` VALUES ('L001', 'Đoàn Duy', 'duyd@uit.edu.vn', '0934567890', 'Hà Giang', 'AUTH011');
-- INSERT INTO `lecturer` VALUES ('L002', 'Nguyễn Minh Sơn', 'sonnm@uit.edu.vn', '0934567890', 'Lạng Sơn', 'AUTH012');
-- INSERT INTO `lecturer` VALUES ('L003', 'Lâm Đức Khải', 'khaild@uit.edu.vn', '0934567890', 'Cao Bằng', 'AUTH013');
-- INSERT INTO `lecturer` VALUES ('L004', 'Trần Hoàng Lộc', 'locth@uit.edu.vn', '0934567890', 'Bắc Cạn', 'AUTH014');

-- ----------------------------
-- Records of course
-- ----------------------------
-- INSERT INTO `course` VALUES ('CE118.K21', 'Thiết kế luận lý số', '2025-02-24', '10', '02:00:00', 'GG Meet/ MS Team', '04:00:00', 'L002', 'B502');
-- INSERT INTO `course` VALUES ('CE223.L12', 'Thiết kế hệ thống nhúng', '2025-02-24', '10', '13:00:00', 'GG Meet/ MS Team', '15:00:00', 'L003', 'B311');
-- INSERT INTO `course` VALUES ('CE410.O21', 'Kỹ thuật hệ thống máy tính', '2025-02-24', '10', '07:00:00', 'GG Meet/ MS Team', '08:00:00', 'L001', 'B116');

-- ----------------------------
-- Records of coursestudent
-- ----------------------------
-- INSERT INTO `coursestudent` VALUES ('CS001', 'CE410.O21', '20522123');
-- INSERT INTO `coursestudent` VALUES ('CS002', 'CE118.K21', '20522123');
-- INSERT INTO `coursestudent` VALUES ('CS003', 'CE223.L12', '20522123');


-- ----------------------------
-- Records of schedule
-- ----------------------------
-- INSERT INTO `schedule` VALUES ('SCH001', '2024-07-01', 'CE410.O21');
-- INSERT INTO `schedule` VALUES ('SCH002', '2024-07-08', 'CE410.O21');
-- INSERT INTO `schedule` VALUES ('SCH003', '2024-07-15', 'CE410.O21');
-- INSERT INTO `schedule` VALUES ('SCH004', '2024-07-22', 'CE410.O21');
-- INSERT INTO `schedule` VALUES ('SCH005', '2024-07-29', 'CE410.O21');
-- INSERT INTO `schedule` VALUES ('SCH006', '2024-08-05', 'CE410.O21');
-- INSERT INTO `schedule` VALUES ('SCH007', '2024-08-12', 'CE410.O21');
-- INSERT INTO `schedule` VALUES ('SCH008', '2024-08-19', 'CE410.O21');
-- INSERT INTO `schedule` VALUES ('SCH009', '2024-08-26', 'CE410.O21');
-- INSERT INTO `schedule` VALUES ('SCH010', '2024-09-02', 'CE410.O21');

-- INSERT INTO `schedule` VALUES ('SCH011', '2024-07-02', 'CE118.K21');
-- INSERT INTO `schedule` VALUES ('SCH012', '2024-07-09', 'CE118.K21');
-- INSERT INTO `schedule` VALUES ('SCH013', '2024-07-16', 'CE118.K21');
-- INSERT INTO `schedule` VALUES ('SCH014', '2024-07-23', 'CE118.K21');
-- INSERT INTO `schedule` VALUES ('SCH015', '2024-07-30', 'CE118.K21');
-- INSERT INTO `schedule` VALUES ('SCH016', '2024-08-06', 'CE118.K21');
-- INSERT INTO `schedule` VALUES ('SCH017', '2024-08-13', 'CE118.K21');
-- INSERT INTO `schedule` VALUES ('SCH018', '2024-08-20', 'CE118.K21');
-- INSERT INTO `schedule` VALUES ('SCH019', '2024-08-27', 'CE118.K21');
-- INSERT INTO `schedule` VALUES ('SCH020', '2024-09-03', 'CE118.K21');

-- INSERT INTO `schedule` VALUES ('SCH021', '2024-07-03', 'CE223.L12');
-- INSERT INTO `schedule` VALUES ('SCH022', '2024-07-10', 'CE223.L12');
-- INSERT INTO `schedule` VALUES ('SCH023', '2024-07-17', 'CE223.L12');
-- INSERT INTO `schedule` VALUES ('SCH024', '2024-07-24', 'CE223.L12');
-- INSERT INTO `schedule` VALUES ('SCH025', '2024-07-31', 'CE223.L12');
-- INSERT INTO `schedule` VALUES ('SCH026', '2024-08-07', 'CE223.L12');
-- INSERT INTO `schedule` VALUES ('SCH027', '2024-08-14', 'CE223.L12');
-- INSERT INTO `schedule` VALUES ('SCH028', '2024-08-21', 'CE223.L12');
-- INSERT INTO `schedule` VALUES ('SCH029', '2024-08-28', 'CE223.L12');
-- INSERT INTO `schedule` VALUES ('SCH030', '2024-09-04', 'CE223.L12');


-- ----------------------------
-- Records of attendance
-- ----------------------------
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH001');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH002');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH003');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH004');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH005');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH006');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH007');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH008');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH009');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH010');


-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH011');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH012');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH013');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH014');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH015');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH016');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH017');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH018');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH019');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH020');

-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH021');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH022');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH023');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH024');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH025');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH026');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH027');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH028');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH029');
-- INSERT INTO `attendance` VALUES ('FALSE', '20522123', 'SCH030');


-- ----------------------------
-- Records of room
-- ----------------------------
-- INSERT INTO `room` VALUES ('B116', 'B1.16');
-- INSERT INTO `room` VALUES ('B311', 'B3.11');
-- INSERT INTO `room` VALUES ('B502', 'B5.02');


-- ----------------------------
-- Records of info
-- ----------------------------
-- INSERT INTO `info` VALUES ('INFO001', 'Lịch thi cuối kỳ', 'Lịch thi dự kiến vào 20/05/2025', 'CE410.O21');
-- INSERT INTO `info` VALUES ('INFO002', 'Tài liệu học tập', 'Tài liệu tham khảo tại thư viện số', 'CE410.O21');

-- ----------------------------
-- Records of device
-- ----------------------------
-- INSERT INTO `device` VALUES ('DEV000', 'unknown', 'B116');
-- INSERT INTO `device` VALUES ('DEV001', 'unknown', 'B502');
-- INSERT INTO `device` VALUES ('DEV002', 'unknown', 'B311');
