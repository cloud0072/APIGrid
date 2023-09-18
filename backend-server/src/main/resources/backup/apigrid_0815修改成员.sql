/*
 Navicat Premium Data Transfer

 Source Server         : uat-data
 Source Server Type    : MySQL
 Source Server Version : 80032
 Source Host           : 192.168.4.198:3306
 Source Schema         : apigrid

 Target Server Type    : MySQL
 Target Server Version : 80032
 File Encoding         : 65001

 Date: 15/08/2023 15:20:03
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for apigrid_asset
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_asset`;
CREATE TABLE `apigrid_asset`
(
    `id`          bigint(0) NOT NULL,
    `bucket_name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `token`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `file_name`   varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `mime_type`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `md5`         varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `is_deleted`  int(0)                                                 DEFAULT NULL,
    `create_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `create_time` datetime(0)                                            DEFAULT NULL,
    `update_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `update_time` datetime(0)                                            DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apigrid_asset
-- ----------------------------
INSERT INTO `apigrid_asset`
VALUES (1685126605871984641, 'assets', 'assist/2023/0729/b7c0b49e937943f4a5f86c4f90773077.png',
        'automation_empty_dark.png', 'image/png', NULL, NULL, '1', '2023-07-29 11:14:26', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685128904421879809, 'assets', 'assist/2023/0729/fba766024de140bcb935d8a378e15284.png',
        'automation_empty_dark.png', 'image/png', NULL, NULL, '1', '2023-07-29 11:23:34', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685129250598760450, 'assets', 'assist/2023/0729/518cf633c99545038ba704d68f5afee1.png',
        'automation_empty_dark.png', 'image/png', NULL, NULL, '1', '2023-07-29 11:24:56', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685130808241680386, 'assets', 'assist/2023/0729/bbb8a4cb8bee4c4d816c33daf8690656.png',
        'automation_empty_dark.png', 'image/png', NULL, NULL, '1', '2023-07-29 11:31:08', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685130884586401793, 'assets', 'assist/2023/0729/9dc92ea80944412a97be5b43e4418727.png',
        'automation_empty_dark.png', 'image/png', NULL, NULL, '1', '2023-07-29 11:31:26', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685131031747751937, 'assets', 'assist/2023/0729/2db158653ae34d12ac0cec13aa31ba11.jpg', '3.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-29 11:32:01', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685132569622867969, 'assets', 'assist/2023/0729/0dc973f2f85642c7a306b5516c02fe7a.jpg', '3.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-29 11:38:08', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685132969507811330, 'assets', 'assist/2023/0729/515a0c9d186a40fab6c3775f8f6e22e8.jpg', '4.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-29 11:39:43', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685133230603235330, 'assets', 'assist/2023/0729/3a77986f25dc4f92ad95905d54dc2507.jpg', '4.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-29 11:40:45', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685133486090797058, 'assets', 'assist/2023/0729/3dcbcdc7b109470bb5982463a5e1bc76.jpg', '4.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-29 11:41:46', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685134056377729025, 'assets', 'assist/2023/0729/3bdf6520c51b4ac6b4d9f23f8c6490d0.jpg', '4.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-29 11:44:02', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685134305955594242, 'assets', 'assist/2023/0729/e443a0a697c54fd78c93d1683e67f993.jpg', '4.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-29 11:45:01', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685833712506195969, 'assets', 'assist/2023/0731/259fedb2861d41c1a32db9ca26df433b.jpg', '3.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-31 10:04:13', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685847537934606337, 'assets', 'assist/2023/0731/fc5e1fee75174e3eac49337cd107da86.jpg', '3.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-31 10:59:09', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685847830483116034, 'assets', 'assist/2023/0731/9d7daa96afa74ae49bf4ec4439d13ee9.jpg', '3.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-31 11:00:19', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685847939832815618, 'assets', 'assist/2023/0731/d8b86059cb2b4e2da1550cd596318601.jpg', '3.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-31 11:00:45', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1685849716372217857, 'assets', 'assist/2023/0731/509bfd21579c4909a744f006bcac7eb4.jpg', '4.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-07-31 11:07:49', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1686991847203766274, 'assets', 'assist/2023/0803/465d95fc6b6646a1a4b13c66fdb78ad0.jpg', '4.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-08-03 14:46:14', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1686992315799797762, 'assets', 'assist/2023/0803/c43b513e2ba345aa97c181b0f2f40f5a.jpg', '4.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-08-03 14:48:06', NULL, NULL);
INSERT INTO `apigrid_asset`
VALUES (1686992445252796418, 'assets', 'assist/2023/0803/82ca027d2c2546ebb6b25e80e21cb55e.jpg', '3.jpg', 'image/jpeg',
        NULL, NULL, '1', '2023-08-03 14:48:36', NULL, NULL);

-- ----------------------------
-- Table structure for apigrid_control
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_control`;
CREATE TABLE `apigrid_control`
(
    `id`              bigint(0) NOT NULL,
    `spc_id`          varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `ctr_id`          varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `unit_id`         varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `control_type`    int(0)                                                DEFAULT NULL,
    `permission_type` int(0)                                                DEFAULT NULL,
    `is_deleted`      int(0)                                                DEFAULT NULL,
    `create_by`       varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `create_time`     datetime(0)                                           DEFAULT NULL,
    `update_by`       varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `update_time`     datetime(0)                                           DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for apigrid_node
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_node`;
CREATE TABLE `apigrid_node`
(
    `id`          bigint(0) NOT NULL,
    `node_id`     varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `parent_id`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `node_name`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `node_type`   int(0)                                                DEFAULT NULL,
    `cover`       varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `icon`        varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `is_deleted`  int(0)                                                DEFAULT NULL,
    `create_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `create_time` datetime(0)                                           DEFAULT NULL,
    `update_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `update_time` datetime(0)                                           DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for apigrid_space
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_space`;
CREATE TABLE `apigrid_space`
(
    `id`          bigint(0) NOT NULL,
    `spc_id`      varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `space_name`  varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `logo`        varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `owner`       varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `props`       json,
    `is_deleted`  int(0)                                                DEFAULT NULL,
    `create_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `create_time` datetime(0)                                           DEFAULT NULL,
    `update_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `update_time` datetime(0)                                           DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for apigrid_unit
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_unit`;
CREATE TABLE `apigrid_unit`
(
    `id`          bigint(0) NOT NULL,
    `spc_id`      varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `unit_type`   int(0)                                                DEFAULT NULL,
    `unit_ref_id` bigint(0)                                             DEFAULT NULL,
    `is_deleted`  int(0)                                                DEFAULT NULL,
    `create_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `create_time` datetime(0)                                           DEFAULT NULL,
    `update_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `update_time` datetime(0)                                           DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apigrid_unit
-- ----------------------------
INSERT INTO `apigrid_unit`
VALUES (1686991748402741247, NULL, 3, 1667445960337244161, 0, '', '2023-08-15 11:19:55', '', '2023-08-15 11:19:58');
INSERT INTO `apigrid_unit`
VALUES (1686991748402741248, NULL, 1, 1685215969083875329, 0, NULL, '2023-08-03 15:52:28', NULL, '2023-08-03 15:52:30');
INSERT INTO `apigrid_unit`
VALUES (1686991748402741249, NULL, 1, 1686991748352409602, 0, NULL, '2023-08-03 14:45:50', NULL, '2023-08-03 14:45:50');
INSERT INTO `apigrid_unit`
VALUES (1686992350079844353, NULL, 3, 1686992350008541185, 0, NULL, '2023-08-03 14:48:14', NULL, '2023-08-03 14:48:14');
INSERT INTO `apigrid_unit`
VALUES (1686992423270449153, NULL, 1, 1686992423241089025, 0, NULL, '2023-08-03 14:48:31', NULL, '2023-08-03 14:48:31');
INSERT INTO `apigrid_unit`
VALUES (1686992544490029058, NULL, 3, 1686992544477446146, 0, NULL, '2023-08-03 14:49:00', NULL, '2023-08-03 14:49:00');
INSERT INTO `apigrid_unit`
VALUES (1686992879845605378, NULL, 1, 1686992879812050945, 0, NULL, '2023-08-03 14:50:20', NULL, '2023-08-03 14:50:20');
INSERT INTO `apigrid_unit`
VALUES (1686992916868726786, NULL, 1, 1686992916814200834, 0, NULL, '2023-08-03 14:50:29', NULL, '2023-08-03 14:50:29');
INSERT INTO `apigrid_unit`
VALUES (1686992949831761922, NULL, 1, 1686992949806596097, 0, NULL, '2023-08-03 14:50:37', NULL, '2023-08-03 14:50:37');

-- ----------------------------
-- Table structure for apigrid_unit_member
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_unit_member`;
CREATE TABLE `apigrid_unit_member`
(
    `id`          bigint(0) NOT NULL,
    `user_id`     bigint(0)                                             DEFAULT NULL,
    `spc_id`      varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `nick_name`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `status`      int(0)                                                DEFAULT NULL,
    `is_locked`   int(0)                                                DEFAULT NULL,
    `is_admin`    int(0)                                                DEFAULT NULL,
    `is_deleted`  int(0)                                                DEFAULT NULL,
    `create_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `create_time` datetime(0)                                           DEFAULT NULL,
    `update_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `update_time` datetime(0)                                           DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apigrid_unit_member
-- ----------------------------
INSERT INTO `apigrid_unit_member`
VALUES (1667445960337244161, 1, NULL, '管理员', 1, 0, 1, 0, NULL, '2023-06-10 17:25:52', NULL, '2023-08-15 11:52:44');
INSERT INTO `apigrid_unit_member`
VALUES (1686992350008541185, 1686992349983375362, NULL, '曹磊', 0, 0, 0, 0, NULL, '2023-08-03 14:48:14', NULL,
        '2023-08-03 14:50:56');
INSERT INTO `apigrid_unit_member`
VALUES (1686992544477446146, 1686992544464863234, NULL, '王斌', 0, 0, 0, 0, NULL, '2023-08-03 14:49:00', NULL,
        '2023-08-03 14:49:00');

-- ----------------------------
-- Table structure for apigrid_unit_role
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_unit_role`;
CREATE TABLE `apigrid_unit_role`
(
    `id`          bigint(0) NOT NULL,
    `spc_id`      varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `role_name`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `sort_num`    bigint(0)                                             DEFAULT NULL,
    `is_deleted`  int(0)                                                DEFAULT NULL,
    `create_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `create_time` datetime(0)                                           DEFAULT NULL,
    `update_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `update_time` datetime(0)                                           DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apigrid_unit_role
-- ----------------------------
INSERT INTO `apigrid_unit_role`
VALUES (1686993107550175234, NULL, '开发工程师', 1, 0, NULL, NULL, NULL, NULL);
INSERT INTO `apigrid_unit_role`
VALUES (1686993666764144641, NULL, '销售顾问', 2, 0, NULL, NULL, NULL, NULL);

-- ----------------------------
-- Table structure for apigrid_unit_role_member
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_unit_role_member`;
CREATE TABLE `apigrid_unit_role_member`
(
    `id`          bigint(0) NOT NULL,
    `role_id`     bigint(0)   DEFAULT NULL,
    `unit_ref_id` bigint(0)   DEFAULT NULL,
    `unit_type`   int(0)      DEFAULT NULL,
    `create_time` datetime(0) DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apigrid_unit_role_member
-- ----------------------------
INSERT INTO `apigrid_unit_role_member`
VALUES (1691266034433126402, 1686993107550175234, 1686992350008541185, 3, '2023-08-15 09:50:19');
INSERT INTO `apigrid_unit_role_member`
VALUES (1691277440524034049, 1686993107550175234, 1686992949806596097, 1, '2023-08-15 10:35:39');
INSERT INTO `apigrid_unit_role_member`
VALUES (1691303272734871553, 1686993666764144641, 1686992544477446146, 3, '2023-08-15 12:18:18');

-- ----------------------------
-- Table structure for apigrid_unit_team
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_unit_team`;
CREATE TABLE `apigrid_unit_team`
(
    `id`          bigint(0) NOT NULL,
    `spc_id`      varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `parent_id`   bigint(0)                                             DEFAULT NULL,
    `team_name`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `sort_num`    bigint(0)                                             DEFAULT NULL,
    `is_deleted`  int(0)                                                DEFAULT NULL,
    `create_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `create_time` datetime(0)                                           DEFAULT NULL,
    `update_by`   varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `update_time` datetime(0)                                           DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apigrid_unit_team
-- ----------------------------
INSERT INTO `apigrid_unit_team`
VALUES (1685215969083875329, NULL, 0, 'BJH', 0, 0, NULL, NULL, NULL, NULL);
INSERT INTO `apigrid_unit_team`
VALUES (1686991748352409602, NULL, 1685215969083875329, '开发部', 0, 0, NULL, '2023-08-03 14:45:50', NULL,
        '2023-08-03 14:45:50');
INSERT INTO `apigrid_unit_team`
VALUES (1686992423241089025, NULL, 1685215969083875329, '销售部', 0, 0, NULL, '2023-08-03 14:48:31', NULL,
        '2023-08-03 14:48:31');
INSERT INTO `apigrid_unit_team`
VALUES (1686992879812050945, NULL, 1686991748352409602, '前端', 0, 0, NULL, '2023-08-03 14:50:20', NULL,
        '2023-08-03 14:50:20');
INSERT INTO `apigrid_unit_team`
VALUES (1686992916814200834, NULL, 1686991748352409602, '后端', 0, 0, NULL, '2023-08-03 14:50:29', NULL,
        '2023-08-03 14:50:29');
INSERT INTO `apigrid_unit_team`
VALUES (1686992949806596097, NULL, 1686991748352409602, '运维', 0, 0, NULL, '2023-08-03 14:50:37', NULL,
        '2023-08-03 14:50:37');

-- ----------------------------
-- Table structure for apigrid_unit_team_member
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_unit_team_member`;
CREATE TABLE `apigrid_unit_team_member`
(
    `id`          bigint(0) NOT NULL,
    `team_id`     bigint(0)   DEFAULT NULL,
    `member_id`   bigint(0)   DEFAULT NULL,
    `create_time` datetime(0) DEFAULT NULL,
    PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apigrid_unit_team_member
-- ----------------------------
INSERT INTO `apigrid_unit_team_member`
VALUES (1686992544515194882, 1686992423241089025, 1686992544477446146, '2023-08-03 14:49:00');
INSERT INTO `apigrid_unit_team_member`
VALUES (1686993031742324738, 1686991748352409602, 1686992350008541185, '2023-08-03 14:50:56');
INSERT INTO `apigrid_unit_team_member`
VALUES (1686993031742324739, 1686992879812050945, 1686992350008541185, '2023-08-03 14:50:56');
INSERT INTO `apigrid_unit_team_member`
VALUES (1686993031742324740, 1686992916814200834, 1686992350008541185, '2023-08-03 14:50:56');
INSERT INTO `apigrid_unit_team_member`
VALUES (1686993031742324741, 1686992949806596097, 1686992350008541185, '2023-08-03 14:50:56');
INSERT INTO `apigrid_unit_team_member`
VALUES (1691296839033245697, 1686991748352409602, 1667445960337244161, '2023-08-15 11:52:44');

-- ----------------------------
-- Table structure for apigrid_user
-- ----------------------------
DROP TABLE IF EXISTS `apigrid_user`;
CREATE TABLE `apigrid_user`
(
    `user_id`      bigint(0) NOT NULL,
    `username`     varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `password`     varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `mobile`       varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `email`        varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `avatar`       varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL,
    `avatar_color` int(0)                                                 DEFAULT NULL,
    `nick_name`    varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `is_locked`    int(0)                                                 DEFAULT NULL,
    `is_deleted`   int(0)                                                 DEFAULT NULL,
    `create_by`    varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `create_time`  datetime(0)                                            DEFAULT NULL,
    `update_by`    varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin  DEFAULT NULL,
    `update_time`  datetime(0)                                            DEFAULT NULL,
    PRIMARY KEY (`user_id`) USING BTREE
) ENGINE = InnoDB
  CHARACTER SET = utf8mb4
  COLLATE = utf8mb4_bin
  ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of apigrid_user
-- ----------------------------
INSERT INTO `apigrid_user`
VALUES (1, 'admin', '$2a$10$tYymtpfjyNbkh9BiYtE0r.uwh7/rAtU2Xq/p//IkYBbCj42kz/dFq', '18612345678', '352419394@qq.com',
        'http://192.168.4.198:9000/assets/assist/2023/0731/d8b86059cb2b4e2da1550cd596318601.jpg', 10, '管理员', 0, 0, NULL,
        '2023-06-10 17:17:58', NULL, '2023-08-15 11:52:44');
INSERT INTO `apigrid_user`
VALUES (1686992349983375362, '18638731263', '$2a$10$.iCUO61wpuRJxKZmu1BMm.c6dTNKVWSO626oI533pn8OspVjSvXja',
        '18638731263', 'caolei@bjh.com',
        'http://192.168.4.198:9000/assets/assist/2023/0803/c43b513e2ba345aa97c181b0f2f40f5a.jpg', 10, '曹磊', 0, 0, NULL,
        '2023-08-03 14:48:14', NULL, '2023-08-03 14:50:56');
INSERT INTO `apigrid_user`
VALUES (1686992544464863234, '18611111111', '$2a$10$agq5jSxzX75fOZ7NjT9VMuS/XgldzPEQhzV8HNwbZx1tLx9MmaSK6',
        '18611111111', 'wangbin@bjh.cn',
        'http://192.168.4.198:9000/assets/assist/2023/0803/82ca027d2c2546ebb6b25e80e21cb55e.jpg', 10, '王斌', 0, 0, NULL,
        '2023-08-03 14:49:00', NULL, '2023-08-03 14:49:00');

SET FOREIGN_KEY_CHECKS = 1;
