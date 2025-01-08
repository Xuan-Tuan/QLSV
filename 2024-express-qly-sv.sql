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

 Date: 05/01/2025 23:26:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin
-- ----------------------------
DROP TABLE IF EXISTS `admin`;
CREATE TABLE `admin`  (
  `adminId` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `authId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`adminId`) USING BTREE,
  INDEX `fk_Admin`(`authId` ASC) USING BTREE,
  CONSTRAINT `fk_Admin` FOREIGN KEY (`authId`) REFERENCES `authentication` (`authId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of admin
-- ----------------------------
INSERT INTO `admin` VALUES ('A001', 'Admin01', 'admin@uit.edu.vn', '0981122334', 'Đà Nẵng', 'AUTH000');
INSERT INTO `admin` VALUES ('bab1ec4d', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', 'admin@gmail.com', '76425df1');

-- ----------------------------
-- Table structure for attendance
-- ----------------------------
DROP TABLE IF EXISTS `attendance`;
CREATE TABLE `attendance`  (
  `attendId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `attended` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `courseId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `MSSV` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `scheduleId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`attendId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of attendance
-- ----------------------------
INSERT INTO `attendance` VALUES ('ATT001', 'FALSE', 'CE410.O21', '20522123', 'SCH001');
INSERT INTO `attendance` VALUES ('ATT002', 'FALSE', 'CE410.O21', '20522123', 'SCH002');
INSERT INTO `attendance` VALUES ('ATT003', 'FALSE', 'CE410.O21', '20522123', 'SCH003');
INSERT INTO `attendance` VALUES ('ATT004', 'FALSE', 'CE410.O21', '20522123', 'SCH004');
INSERT INTO `attendance` VALUES ('ATT005', 'FALSE', 'CE410.O21', '20522123', 'SCH005');
INSERT INTO `attendance` VALUES ('ATT006', 'FALSE', 'CE410.O21', '20522123', 'SCH006');
INSERT INTO `attendance` VALUES ('ATT007', 'FALSE', 'CE410.O21', '20522123', 'SCH007');
INSERT INTO `attendance` VALUES ('ATT008', 'FALSE', 'CE410.O21', '20522123', 'SCH008');
INSERT INTO `attendance` VALUES ('ATT009', 'FALSE', 'CE410.O21', '20522123', 'SCH009');
INSERT INTO `attendance` VALUES ('ATT010', 'FALSE', 'CE410.O21', '20522123', 'SCH010');
INSERT INTO `attendance` VALUES ('ATT01027', 'FALSE', 'sad22as3', '20520940', 'SCH53805');
INSERT INTO `attendance` VALUES ('ATT011', 'FALSE', 'CE118.K21', '20522123', 'SCH011');
INSERT INTO `attendance` VALUES ('ATT012', 'FALSE', 'CE118.K21', '20522123', 'SCH012');
INSERT INTO `attendance` VALUES ('ATT013', 'FALSE', 'CE118.K21', '20522123', 'SCH013');
INSERT INTO `attendance` VALUES ('ATT014', 'FALSE', 'CE118.K21', '20522123', 'SCH014');
INSERT INTO `attendance` VALUES ('ATT015', 'FALSE', 'CE118.K21', '20522123', 'SCH015');
INSERT INTO `attendance` VALUES ('ATT016', 'FALSE', 'CE118.K21', '20522123', 'SCH016');
INSERT INTO `attendance` VALUES ('ATT017', 'FALSE', 'CE118.K21', '20522123', 'SCH017');
INSERT INTO `attendance` VALUES ('ATT018', 'FALSE', 'CE118.K21', '20522123', 'SCH018');
INSERT INTO `attendance` VALUES ('ATT019', 'FALSE', 'CE118.K21', '20522123', 'SCH019');
INSERT INTO `attendance` VALUES ('ATT020', 'FALSE', 'CE118.K21', '20522123', 'SCH020');
INSERT INTO `attendance` VALUES ('ATT021', 'FALSE', 'CE223.L12', '20522123', 'SCH021');
INSERT INTO `attendance` VALUES ('ATT022', 'FALSE', 'CE223.L12', '20522123', 'SCH022');
INSERT INTO `attendance` VALUES ('ATT023', 'FALSE', 'CE223.L12', '20522123', 'SCH023');
INSERT INTO `attendance` VALUES ('ATT024', 'FALSE', 'CE223.L12', '20522123', 'SCH024');
INSERT INTO `attendance` VALUES ('ATT025', 'FALSE', 'CE223.L12', '20522123', 'SCH025');
INSERT INTO `attendance` VALUES ('ATT026', 'FALSE', 'CE223.L12', '20522123', 'SCH026');
INSERT INTO `attendance` VALUES ('ATT027', 'FALSE', 'CE223.L12', '20522123', 'SCH027');
INSERT INTO `attendance` VALUES ('ATT028', 'FALSE', 'CE223.L12', '20522123', 'SCH028');
INSERT INTO `attendance` VALUES ('ATT029', 'FALSE', 'CE223.L12', '20522123', 'SCH029');
INSERT INTO `attendance` VALUES ('ATT030', 'FALSE', 'CE223.L12', '20522123', 'SCH030');
INSERT INTO `attendance` VALUES ('ATT0716', 'FALSE', 'sad2as3', '20520940', 'SCH1996');
INSERT INTO `attendance` VALUES ('ATT0733', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT0739', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT0802', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT1109', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT1131', 'FALSE', 'sad2as3', '20520940', 'SCH7078');
INSERT INTO `attendance` VALUES ('ATT1369', 'FALSE', 'sad2as3', '20520953', 'SCH6667');
INSERT INTO `attendance` VALUES ('ATT17582', 'FALSE', 'sad22as3', '20520940', 'SCH78796');
INSERT INTO `attendance` VALUES ('ATT2017', 'FALSE', 'sad2as3', '20520940', 'SCH0448');
INSERT INTO `attendance` VALUES ('ATT22667', 'FALSE', 'sad22as3', '20520953', 'SCH60148');
INSERT INTO `attendance` VALUES ('ATT23017', 'FALSE', 'sad22as3', '20520953', 'SCH30556');
INSERT INTO `attendance` VALUES ('ATT2401', 'FALSE', 'sad2as3', '20520953', 'SCH0765');
INSERT INTO `attendance` VALUES ('ATT25124', 'FALSE', 'sad22as3', '20520940', 'SCH19808');
INSERT INTO `attendance` VALUES ('ATT25640', 'FALSE', 'CE118.K21', '20522123', 'SCH18570');
INSERT INTO `attendance` VALUES ('ATT2715', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT2907', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT29967', 'FALSE', 'sad22as3', '20520953', 'SCH38000');
INSERT INTO `attendance` VALUES ('ATT30545', 'FALSE', 'sad22as3', '20520953', 'SCH66407');
INSERT INTO `attendance` VALUES ('ATT3093', 'FALSE', 'sad2as3', '20520940', 'SCH1272');
INSERT INTO `attendance` VALUES ('ATT31970', 'FALSE', 'sad22as3', '20520940', 'SCH42139');
INSERT INTO `attendance` VALUES ('ATT32246', 'FALSE', 'CE118.K21', '20522123', 'SCH17630');
INSERT INTO `attendance` VALUES ('ATT3324', 'FALSE', 'sad2as3', '20520953', 'SCH6411');
INSERT INTO `attendance` VALUES ('ATT3347', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT3364', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT3459', 'FALSE', 'sad2as3', '20520940', 'SCH3759');
INSERT INTO `attendance` VALUES ('ATT3541', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT3773', 'FALSE', 'sad2as3', '20520940', 'SCH7061');
INSERT INTO `attendance` VALUES ('ATT3922', 'FALSE', 'sad2as3', '20520940', 'SCH6276');
INSERT INTO `attendance` VALUES ('ATT4104', 'FALSE', 'sad2as3', '20520953', 'SCH9970');
INSERT INTO `attendance` VALUES ('ATT44423', 'FALSE', 'CE118.K21', '20522123', 'SCH69031');
INSERT INTO `attendance` VALUES ('ATT4491', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT44990', 'FALSE', 'CE118.K21', '20522123', 'SCH54143');
INSERT INTO `attendance` VALUES ('ATT45107', 'FALSE', 'CE118.K21', '20522123', 'SCH78440');
INSERT INTO `attendance` VALUES ('ATT45965', 'FALSE', 'CE118.K21', '20522123', 'SCH12630');
INSERT INTO `attendance` VALUES ('ATT4602', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT4704', 'FALSE', 'sad2as3', '20520953', 'SCH7805');
INSERT INTO `attendance` VALUES ('ATT4768', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT4898', 'FALSE', 'sad2as3', '20520953', 'SCH7522');
INSERT INTO `attendance` VALUES ('ATT4922', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT50357', 'FALSE', 'sad22as3', '20520940', 'SCH04432');
INSERT INTO `attendance` VALUES ('ATT5127', 'FALSE', 'sad2as3', '20520953', 'SCH2474');
INSERT INTO `attendance` VALUES ('ATT53369', 'FALSE', 'sad22as3', '20520940', 'SCH23184');
INSERT INTO `attendance` VALUES ('ATT53612', 'FALSE', 'CE118.K21', '20522123', 'SCH33881');
INSERT INTO `attendance` VALUES ('ATT60057', 'FALSE', 'CE118.K21', '20522123', 'SCH37454');
INSERT INTO `attendance` VALUES ('ATT6059', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT62676', 'FALSE', 'sad22as3', '20520940', 'SCH29938');
INSERT INTO `attendance` VALUES ('ATT6369', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT64016', 'FALSE', 'sad22as3', '20520953', 'SCH98237');
INSERT INTO `attendance` VALUES ('ATT64842', 'FALSE', 'sad22as3', '20520940', 'SCH88019');
INSERT INTO `attendance` VALUES ('ATT6556', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT67551', 'FALSE', 'sad22as3', '20520940', 'SCH75950');
INSERT INTO `attendance` VALUES ('ATT69111', 'FALSE', 'CE118.K21', '20522123', 'SCH79419');
INSERT INTO `attendance` VALUES ('ATT72975', 'FALSE', 'sad22as3', '20520953', 'SCH20902');
INSERT INTO `attendance` VALUES ('ATT73372', 'FALSE', 'sad22as3', '20520953', 'SCH56406');
INSERT INTO `attendance` VALUES ('ATT73493', 'FALSE', 'sad22as3', '20520940', 'SCH19436');
INSERT INTO `attendance` VALUES ('ATT73655', 'FALSE', 'sad22as3', '20520953', 'SCH94688');
INSERT INTO `attendance` VALUES ('ATT7403', 'FALSE', 'sad2as3', '20520940', 'SCH5073');
INSERT INTO `attendance` VALUES ('ATT74575', 'FALSE', 'CE118.K21', '20522123', 'SCH38438');
INSERT INTO `attendance` VALUES ('ATT7461', 'FALSE', 'sad2as3', '20520953', 'SCH8768');
INSERT INTO `attendance` VALUES ('ATT7466', 'FALSE', 'sad2as3', '20520953', 'SCH9487');
INSERT INTO `attendance` VALUES ('ATT7513', 'FALSE', 'sad2as3', '20520940', 'SCH8609');
INSERT INTO `attendance` VALUES ('ATT7634', 'FALSE', 'sad2as3', '20520953', 'SCH1016');
INSERT INTO `attendance` VALUES ('ATT7729', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT8090', 'FALSE', 'sadas3', '20520940', NULL);
INSERT INTO `attendance` VALUES ('ATT81555', 'FALSE', 'sad22as3', '20520953', 'SCH37079');
INSERT INTO `attendance` VALUES ('ATT8599', 'FALSE', 'sad2as3', '20520953', 'SCH9942');
INSERT INTO `attendance` VALUES ('ATT8766', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT8922', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT92439', 'FALSE', 'sad22as3', '20520953', 'SCH56332');
INSERT INTO `attendance` VALUES ('ATT9357', 'FALSE', 'sadas3', '20520953', NULL);
INSERT INTO `attendance` VALUES ('ATT95522', 'FALSE', 'sad22as3', '20520953', 'SCH69767');
INSERT INTO `attendance` VALUES ('ATT9712', 'FALSE', 'sad2as3', '20520940', 'SCH6611');
INSERT INTO `attendance` VALUES ('ATT97356', 'FALSE', 'sad22as3', '20520940', 'SCH96054');
INSERT INTO `attendance` VALUES ('ATT9800', 'FALSE', 'sad2as3', '20520940', 'SCH7654');
INSERT INTO `attendance` VALUES ('ATT9862', 'FALSE', 'sadas3', '20520953', NULL);

-- ----------------------------
-- Table structure for authentication
-- ----------------------------
DROP TABLE IF EXISTS `authentication`;
CREATE TABLE `authentication`  (
  `authId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`authId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of authentication
-- ----------------------------
INSERT INTO `authentication` VALUES ('5a29d9b547', 'sv@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');
INSERT INTO `authentication` VALUES ('616b9ddd45', 'student@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
INSERT INTO `authentication` VALUES ('76425df1', 'admin@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'admin');
INSERT INTO `authentication` VALUES ('8e54401c25', 'student1@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
INSERT INTO `authentication` VALUES ('9f01aa2f1a', 'teacher@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');
INSERT INTO `authentication` VALUES ('AUTH000', 'admin@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'admin');
INSERT INTO `authentication` VALUES ('AUTH001', 'hoangnx@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
INSERT INTO `authentication` VALUES ('AUTH002', 'ductm@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
INSERT INTO `authentication` VALUES ('AUTH003', 'caunv@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
INSERT INTO `authentication` VALUES ('AUTH004', 'tient@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
INSERT INTO `authentication` VALUES ('AUTH005', 'hungtd@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
INSERT INTO `authentication` VALUES ('AUTH006', 'tuannx.uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
INSERT INTO `authentication` VALUES ('AUTH007', 'giangtm.uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
INSERT INTO `authentication` VALUES ('AUTH008', 'triennd@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
INSERT INTO `authentication` VALUES ('AUTH009', 'vietth@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
INSERT INTO `authentication` VALUES ('AUTH010', 'huytd.uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');
INSERT INTO `authentication` VALUES ('AUTH011', 'duyd@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');
INSERT INTO `authentication` VALUES ('AUTH012', 'sonnm@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');
INSERT INTO `authentication` VALUES ('AUTH013', 'khaild@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');
INSERT INTO `authentication` VALUES ('AUTH014', 'locth@uit.edu.vn', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'lecturer');
INSERT INTO `authentication` VALUES ('c47cc79c1a', 'parent1@gmail.com', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'parent');
INSERT INTO `authentication` VALUES ('e8d590e026', 'sv@123f.cfd', '$2a$10$8poYWwHX4v6UL3oA2ij8c..dJw3MoQcMxjN06DKPNoqiuiSFbFkGa', 'student');

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course`  (
  `courseId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameCourse` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `startDay` date NULL DEFAULT NULL,
  `numberWeek` char(2) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `startTime` time NULL DEFAULT NULL,
  `onlineUrl` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `endTime` time NULL DEFAULT NULL,
  `lecturerId` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `roomId` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`courseId`) USING BTREE,
  INDEX `fk_Course1`(`lecturerId` ASC) USING BTREE,
  INDEX `fk_Course2`(`roomId` ASC) USING BTREE,
  CONSTRAINT `fk_Course1` FOREIGN KEY (`lecturerId`) REFERENCES `lecturer` (`lecturerId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Course2` FOREIGN KEY (`roomId`) REFERENCES `room` (`roomId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of course
-- ----------------------------
INSERT INTO `course` VALUES ('CE118.K21', 'Thiết kế luận lý số', '2025-02-24', '10', '02:00:00', 'GG Meet/ MS Team', '04:00:00', 'L002', 'B502');
INSERT INTO `course` VALUES ('CE223.L12', 'Thiết kế hệ thống nhúng', '2025-02-24', '10', '13:00:00', 'GG Meet/ MS Team', '15:00:00', 'L003', 'B311');
INSERT INTO `course` VALUES ('CE410.O21', 'Kỹ thuật hệ thống máy tính', '2025-02-24', '10', '07:00:00', 'GG Meet/ MS Team', '08:00:00', 'L001', 'B116');
INSERT INTO `course` VALUES ('sad22as3', 'dsfsdfdfds', '2025-01-07', '11', '02:27:00', 'sdfsdf23', '06:32:00', '6fdccdca94', 'B311');

-- ----------------------------
-- Table structure for coursestudent
-- ----------------------------
DROP TABLE IF EXISTS `coursestudent`;
CREATE TABLE `coursestudent`  (
  `csId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `courseId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `MSSV` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`csId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coursestudent
-- ----------------------------
INSERT INTO `coursestudent` VALUES ('CS001', 'CE410.O21', '20522123');
INSERT INTO `coursestudent` VALUES ('CS002', 'CE118.K21', '20522123');
INSERT INTO `coursestudent` VALUES ('CS003', 'CE223.L12', '20522123');
INSERT INTO `coursestudent` VALUES ('CS40124', 'sad2as3', '20520953');
INSERT INTO `coursestudent` VALUES ('CS55506', 'sad2as3', '20520940');
INSERT INTO `coursestudent` VALUES ('CS79400', 'sad22as3', '20520953');
INSERT INTO `coursestudent` VALUES ('CS86507', 'sad22as3', '20520940');

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device`  (
  `deviceId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `roomId` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`deviceId`) USING BTREE,
  INDEX `fk_Device`(`roomId` ASC) USING BTREE,
  CONSTRAINT `fk_Device` FOREIGN KEY (`roomId`) REFERENCES `room` (`roomId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of device
-- ----------------------------
INSERT INTO `device` VALUES ('DEV000', 'unknown', 'B116');
INSERT INTO `device` VALUES ('DEV001', 'unknown', 'B502');
INSERT INTO `device` VALUES ('DEV002', 'unknown', 'B311');

-- ----------------------------
-- Table structure for info
-- ----------------------------
DROP TABLE IF EXISTS `info`;
CREATE TABLE `info`  (
  `infoId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `content` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `courseId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`infoId`) USING BTREE,
  INDEX `fk_Info`(`courseId` ASC) USING BTREE,
  CONSTRAINT `fk_Info` FOREIGN KEY (`courseId`) REFERENCES `course` (`courseId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of info
-- ----------------------------
INSERT INTO `info` VALUES ('INFO001', 'Lịch thi cuối kỳ', 'Lịch thi dự kiến vào 20/05/2025', 'CE410.O21');
INSERT INTO `info` VALUES ('INFO002', 'Tài liệu học tập', 'Tài liệu tham khảo tại thư viện số', 'CE410.O21');

-- ----------------------------
-- Table structure for lecturer
-- ----------------------------
DROP TABLE IF EXISTS `lecturer`;
CREATE TABLE `lecturer`  (
  `lecturerId` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `authId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`lecturerId`) USING BTREE,
  INDEX `fk_Lecturer`(`authId` ASC) USING BTREE,
  CONSTRAINT `fk_Lecturer` FOREIGN KEY (`authId`) REFERENCES `authentication` (`authId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of lecturer
-- ----------------------------
INSERT INTO `lecturer` VALUES ('46a21c8186', 'teacher@gmail.com', 'teacher@gmail.com', '1234567890', 'teacher@gmail.com', NULL);
INSERT INTO `lecturer` VALUES ('61e43aa6f0', 'teacher@gmail.com', 'teacher@gmail.com', 'teacher@gmail.com', 'teacher@gmail.com', '9f01aa2f1a');
INSERT INTO `lecturer` VALUES ('6fdccdca94', '123', 'sv@gmail.com', '0987654321', 'HN', '5a29d9b547');
INSERT INTO `lecturer` VALUES ('L001', 'Đoàn Duy', 'duyd@uit.edu.vn', '0934567890', 'Hà Giang', 'AUTH011');
INSERT INTO `lecturer` VALUES ('L002', 'Nguyễn Minh Sơn', 'sonnm@uit.edu.vn', '0934567890', 'Lạng Sơn', 'AUTH012');
INSERT INTO `lecturer` VALUES ('L003', 'Lâm Đức Khải', 'khaild@uit.edu.vn', '0934567890', 'Cao Bằng', 'AUTH013');
INSERT INTO `lecturer` VALUES ('L004', 'Trần Hoàng Lộc', 'locth@uit.edu.vn', '0934567890', 'Bắc Cạn', 'AUTH014');

-- ----------------------------
-- Table structure for parent
-- ----------------------------
DROP TABLE IF EXISTS `parent`;
CREATE TABLE `parent`  (
  `parentId` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `authId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`parentId`) USING BTREE,
  INDEX `fk_Parent`(`authId` ASC) USING BTREE,
  CONSTRAINT `fk_Parent` FOREIGN KEY (`authId`) REFERENCES `authentication` (`authId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of parent
-- ----------------------------
INSERT INTO `parent` VALUES ('d3ba21ba01', 'parent1@gmail.com', 'parent1@gmail.com', '1234567890', 'parent1@gmail.com', NULL);
INSERT INTO `parent` VALUES ('e5a4c603aa', 'parent1@gmail.com', 'parent1@gmail.com', 'parent1@gmail.com', 'parent1@gmail.com', 'c47cc79c1a');
INSERT INTO `parent` VALUES ('P001', 'Nguyễn Xuân Hoàng', 'hoangnx@gmail.com', '0123456789', 'Hà Tĩnh', 'AUTH001');
INSERT INTO `parent` VALUES ('P002', 'Trương Minh Đức', 'ductm@gmail.com', '0123456789', 'Lâm Đồng', 'AUTH002');
INSERT INTO `parent` VALUES ('P003', 'Nguyễn Văn Cầu', 'caunv@gmail.com', '0123456789', 'Vĩnh Long', 'AUTH003');
INSERT INTO `parent` VALUES ('P004', 'Trần Tiến', 'tient@gmail.com', '0123456789', 'Huế', 'AUTH004');
INSERT INTO `parent` VALUES ('P005', 'Tạ Duy Hưng', 'hungtd@gmail.com', '0123456789', 'Tiền Giang', 'AUTH005');

-- ----------------------------
-- Table structure for room
-- ----------------------------
DROP TABLE IF EXISTS `room`;
CREATE TABLE `room`  (
  `roomId` char(4) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `nameRoom` char(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`roomId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of room
-- ----------------------------
INSERT INTO `room` VALUES ('B116', 'B1.16');
INSERT INTO `room` VALUES ('B311', 'B3.11');
INSERT INTO `room` VALUES ('B502', 'B5.02');
INSERT INTO `room` VALUES ('B969', 'Invalid date');

-- ----------------------------
-- Table structure for schedule
-- ----------------------------
DROP TABLE IF EXISTS `schedule`;
CREATE TABLE `schedule`  (
  `scheduleId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `dateSche` date NULL DEFAULT NULL,
  `courseId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`scheduleId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of schedule
-- ----------------------------
INSERT INTO `schedule` VALUES ('SCH001', '2024-02-24', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH002', '2024-03-03', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH003', '2024-03-10', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH004', '2024-03-17', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH005', '2024-03-24', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH006', '2024-03-31', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH007', '2024-04-07', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH008', '2024-04-14', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH009', '2024-04-21', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH010', '2024-04-28', 'CE410.O21');
INSERT INTO `schedule` VALUES ('SCH011', '2024-02-25', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH012', '2024-03-04', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH013', '2024-03-11', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH014', '2024-03-18', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH015', '2024-03-25', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH016', '2024-04-01', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH017', '2024-04-08', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH018', '2024-04-15', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH019', '2024-04-22', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH020', '2024-04-29', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH021', '2024-02-26', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH022', '2024-03-05', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH023', '2024-03-12', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH024', '2024-03-19', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH025', '2024-03-26', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH026', '2024-04-02', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH027', '2024-04-09', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH028', '2024-04-16', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH029', '2024-04-23', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH030', '2024-04-30', 'CE223.L12');
INSERT INTO `schedule` VALUES ('SCH04432', '2025-02-18', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH0448', '2025-02-18', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH0528', '2025-02-11', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH0563', '2025-02-04', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH0765', '2025-01-07', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH0923', '2025-02-11', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH1016', '2025-03-11', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH1183', '2025-01-07', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH12630', '2025-03-31', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH1272', '2025-02-25', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH1345', '2025-03-11', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH1348', '2025-03-04', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH1494', '2025-03-04', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH1648', '2025-03-11', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH17630', '2025-02-24', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH1828', '2025-01-28', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH18570', '2025-04-07', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH19436', '2025-03-11', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH19808', '2025-01-07', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH1996', '2025-02-04', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH20902', '2025-03-11', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH23184', '2025-01-21', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH2474', '2025-03-18', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH29938', '2025-02-04', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH30556', '2025-03-04', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH3214', '2025-02-18', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH33881', '2025-04-21', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH37079', '2025-01-07', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH37454', '2025-04-14', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH3759', '2025-03-18', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH38000', '2025-02-04', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH38438', '2025-03-24', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH3988', '2025-01-21', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH42139', '2025-02-11', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH4529', '2025-01-07', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH5073', '2025-01-21', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH5346', '2025-01-21', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH53805', '2025-03-04', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH54143', '2025-03-03', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH5509', '2025-02-25', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH56332', '2025-01-14', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH56406', '2025-01-21', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH5740', '2025-01-28', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH60148', '2025-02-11', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH6272', '2025-02-04', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH6276', '2025-01-07', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH6351', '2025-01-14', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH6411', '2025-02-25', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH6611', '2025-01-14', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH66407', '2025-02-18', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH6667', '2025-03-04', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH6848', '2025-03-18', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH69031', '2025-03-17', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH69767', '2025-01-28', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH7000', '2025-02-25', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH7061', '2025-03-04', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH7078', '2025-03-11', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH7522', '2025-02-18', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH75950', '2025-03-18', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH7654', '2025-01-28', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH7797', '2025-03-18', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH7805', '2025-01-21', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH7837', '2025-02-18', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH78440', '2025-04-28', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH78796', '2025-01-28', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH79419', '2025-03-10', 'CE118.K21');
INSERT INTO `schedule` VALUES ('SCH7993', '2025-01-14', 'sadas3');
INSERT INTO `schedule` VALUES ('SCH8609', '2025-02-11', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH8768', '2025-02-04', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH88019', '2025-01-14', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH94688', '2025-02-25', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH9487', '2025-01-14', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH96054', '2025-02-25', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH98237', '2025-03-18', 'sad22as3');
INSERT INTO `schedule` VALUES ('SCH9942', '2025-01-28', 'sad2as3');
INSERT INTO `schedule` VALUES ('SCH9970', '2025-02-11', 'sad2as3');

-- ----------------------------
-- Table structure for student
-- ----------------------------
DROP TABLE IF EXISTS `student`;
CREATE TABLE `student`  (
  `MSSV` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `fullName` varchar(30) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `phoneNumber` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `address` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `RFID` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `parentId` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  `authId` char(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NULL DEFAULT NULL,
  PRIMARY KEY (`MSSV`) USING BTREE,
  INDEX `fk_Student1`(`parentId` ASC) USING BTREE,
  INDEX `fk_Student2`(`authId` ASC) USING BTREE,
  CONSTRAINT `fk_Student1` FOREIGN KEY (`parentId`) REFERENCES `parent` (`parentId`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_Student2` FOREIGN KEY (`authId`) REFERENCES `authentication` (`authId`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student
-- ----------------------------
INSERT INTO `student` VALUES ('0ed00', 'student1@gmail.com', 'student1@gmail.com', '1234567890', 'student1@gmail.com', '12sdfsdf435345', 'e5a4c603aa', '8e54401c25');
INSERT INTO `student` VALUES ('20520550', ' Tạ Duy Huy', 'huytd.uit.edu.vn', '0912345678', 'Tiền Giang', '13003F1496AE', 'P005', 'AUTH010');
INSERT INTO `student` VALUES ('20520940', 'Nguyễn Đức Triển', 'triennd@uit.edu.vn', '0912345678', 'Vĩnh Long', '13003BF21EC4', 'P003', 'AUTH008');
INSERT INTO `student` VALUES ('20520953', 'Trương Minh Giảng', 'giangtm.uit.edu.vn', '0912345678', 'Lâm Đồng', '13003C0E4362', 'P002', 'AUTH007');
INSERT INTO `student` VALUES ('20522123', 'Nguyễn Xuân Tuấn', 'tuannx.uit.edu.vn', '0912345678', 'Hà Tĩnh', '13003CEC8F4C', 'P001', 'AUTH006');
INSERT INTO `student` VALUES ('20522154', 'Trần Hoàng Việt', 'vietth@uit.edu.vn', '0912345678', 'Huế', '13003EEBAB6D', 'P004', 'AUTH009');
INSERT INTO `student` VALUES ('ee1a2', 'ádasd', 'sv@123f.cfd', '1234567899', 'sdsdf', '123123123dsfsdf', 'd3ba21ba01', 'e8d590e026');

SET FOREIGN_KEY_CHECKS = 1;
