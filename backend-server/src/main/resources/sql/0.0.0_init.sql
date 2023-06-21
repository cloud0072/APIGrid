CREATE TABLE apigrid_user
(
    `user_id`     BIGINT ( 20 ) NOT NULL,
    `username`    VARCHAR(32),
    `password`    VARCHAR(255),
    `mobile`      VARCHAR(32),
    `email`       VARCHAR(32),
    `avatar`      VARCHAR(255),
    `nick_name`   VARCHAR(32),
    `is_locked`   INT ( 1 ),
    `is_deleted`  INT ( 1 ),
    `create_by`   VARCHAR(32),
    `create_time` datetime ( 0 ),
    `update_by`   VARCHAR(32),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`user_id`)
);
CREATE TABLE apigrid_space
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `spc_id`      VARCHAR(32),
    `space_name`  VARCHAR(32),
    `logo`        VARCHAR(32),
    `owner`       VARCHAR(32),
    `props`       json,
    `is_deleted`  INT ( 1 ),
    `create_by`   VARCHAR(32),
    `create_time` datetime ( 0 ),
    `update_by`   VARCHAR(32),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_unit
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `spc_id`      VARCHAR(32),
    `unit_type`   INT ( 1 ),
    `unit_ref_id` BIGINT ( 20 ),
    `is_deleted`  INT ( 1 ),
    `create_by`   VARCHAR(32),
    `create_time` datetime ( 0 ),
    `update_by`   VARCHAR(32),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_unit_member
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `user_id`     BIGINT ( 20 ),
    `spc_id`      VARCHAR(32),
    `member_name` VARCHAR(32),
    `status`      INT ( 1 ),
    `is_locked`   INT ( 1 ),
    `is_admin`    INT ( 1 ),
    `is_deleted`  INT ( 1 ),
    `create_by`   VARCHAR(32),
    `create_time` datetime ( 0 ),
    `update_by`   VARCHAR(32),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_unit_role
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `spc_id`      VARCHAR(32),
    `role_name`   VARCHAR(32),
    `sort_num`    BIGINT ( 20 ),
    `is_deleted`  INT ( 1 ),
    `create_by`   VARCHAR(32),
    `create_time` datetime ( 0 ),
    `update_by`   VARCHAR(32),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_unit_team
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `spc_id`      VARCHAR(32),
    `parent_id`   BIGINT ( 20 ),
    `team_name`   VARCHAR(32),
    `sort_num`    BIGINT ( 20 ),
    `is_deleted`  INT ( 1 ),
    `create_by`   VARCHAR(32),
    `create_time` datetime ( 0 ),
    `update_by`   VARCHAR(32),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_unit_team_member
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `team_id`     BIGINT ( 20 ),
    `member_id`   BIGINT ( 20 ),
    `create_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_asset
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `bucket_name` VARCHAR(32),
    `file_url`    VARCHAR(255),
    `file_name`   VARCHAR(255),
    `mime_type`   VARCHAR(32),
    `md5`         VARCHAR(255),
    `is_deleted`  INT ( 1 ),
    `create_by`   VARCHAR(32),
    `create_time` datetime ( 0 ),
    `update_by`   VARCHAR(32),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_node
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `node_id`     VARCHAR(32),
    `parent_id`   VARCHAR(32),
    `node_name`   VARCHAR(32),
    `node_type`   INT ( 1 ),
    `cover`       VARCHAR(32),
    `icon`        VARCHAR(32),
    `is_deleted`  INT ( 1 ),
    `create_by`   VARCHAR(32),
    `create_time` datetime ( 0 ),
    `update_by`   VARCHAR(32),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_control
(
    `id`              BIGINT ( 20 ) NOT NULL,
    `spc_id`          VARCHAR(32),
    `ctr_id`          VARCHAR(32),
    `unit_id`         VARCHAR(32),
    `control_type`    INT ( 1 ),
    `permission_type` INT ( 1 ),
    `is_deleted`      INT ( 1 ),
    `create_by`       VARCHAR(32),
    `create_time`     datetime ( 0 ),
    `update_by`       VARCHAR(32),
    `update_time`     datetime ( 0 ),
    PRIMARY KEY (`id`)
);


INSERT INTO `apigrid_user`(`user_id`, `username`, `password`, `mobile`, `email`, `avatar`, `nick_name`, `is_locked`,
                           `is_deleted`, `create_by`, `create_time`, `update_by`, `update_time`)
VALUES (1, 'admin', '$2a$10$tYymtpfjyNbkh9BiYtE0r.uwh7/rAtU2Xq/p//IkYBbCj42kz/dFq', '18638731263', '352419394@qq.com',
        NULL, '管理员', 0, 0, NULL, '2023-06-10 17:17:58', NULL, '2023-06-10 17:18:05');

INSERT INTO `apigrid_unit_member`(`id`, `user_id`, `spc_id`, `member_name`, `status`, `is_locked`, `is_admin`,
                                  `is_deleted`, `create_by`, `create_time`, `update_by`, `update_time`)
VALUES (1667445960337244161, 1, NULL, '管理员', 0, 0, 1, 0, NULL, '2023-06-10 17:25:52', NULL, '2023-06-10 17:25:54');
