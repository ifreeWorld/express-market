/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 50717
 Source Host           : localhost:3306
 Source Schema         : market

 Target Server Type    : MySQL
 Target Server Version : 50717
 File Encoding         : 65001

 Date: 24/02/2019 21:31:19
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tbl_sale_table_info
-- ----------------------------
DROP TABLE IF EXISTS `tbl_sale_table_info`;
CREATE TABLE `tbl_sale_table_info`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `date` date NOT NULL COMMENT '日期',
  `total` double(16, 2) DEFAULT 0.00 COMMENT '总额(元)',
  `collector` double(16, 2) DEFAULT 0.00 COMMENT '收钱吧(元)',
  `cash` double(16, 2) DEFAULT 0.00 COMMENT '现金(元)',
  `wechat` double(16, 2) DEFAULT 0.00 COMMENT '微信(元)',
  `alipay` double(16, 2) DEFAULT 0.00 COMMENT '支付宝(元)',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tbl_sale_table_info
-- ----------------------------
INSERT INTO `tbl_sale_table_info` VALUES (1, '2019-02-23', 2300.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (2, '2019-02-24', 2400.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (3, '2019-02-25', 2500.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (4, '2019-02-26', 1000.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (5, '2019-02-27', 4500.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (6, '2019-02-28', 4499.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (7, '2019-03-01', 5000.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (8, '2019-03-02', 7000.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (9, '2019-03-26', 8000.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (10, '2019-04-01', 10000.00, 12.00, 12.00, 12.00, 12.00);
INSERT INTO `tbl_sale_table_info` VALUES (11, '2019-05-26', 1400.00, 12.00, 12.00, 12.00, 12.00);

SELECT
	CONVERT(DATE_FORMAT(date, '%Y'),SIGNED) AS year,
	CONVERT(DATE_FORMAT(date, '%c'),SIGNED) AS month,
	sum(total) AS money
FROM
	tbl_sale_table_info
WHERE
	DATE_FORMAT(date, '%Y-%m') BETWEEN '2018-12%' AND '2100-01%'
GROUP BY
	year, month
ORDER BY
	year asc, month asc;
	
SELECT
	DATE_FORMAT(date, '%Y-%m') AS month,
	sum(total) AS money
FROM
	tbl_sale_table_info
WHERE
	DATE_FORMAT(date, '%Y-%m') BETWEEN '2018-12%' AND '2100-01%'
GROUP BY
	month
ORDER BY
	month asc;
	
SELECT
	CONVERT(DATE_FORMAT(date, '%Y'), SIGNED) AS year,
	sum(total) AS total,
	sum(collector) AS collector,
	sum(cash) AS cash,
	sum(wechat) AS wechat,
	sum(alipay) AS alipay
FROM
	tbl_sale_table_info
WHERE
	DATE_FORMAT(date, '%Y') = '2019'
GROUP BY
	year;

SET FOREIGN_KEY_CHECKS = 1;
