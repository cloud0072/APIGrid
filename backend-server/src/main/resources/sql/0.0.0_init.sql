CREATE
USER 'apigrid'@'%' IDENTIFIED BY 'apigrid';

GRANT ALL PRIVILEGES ON *.* TO
'apigrid'@'%'

CREATE TABLE apigrid_unit
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `unit_type`   INT ( 1 ),
    `unit_ref_id` BIGINT ( 20 ),
    `is_deleted`  INT ( 1 ),
    `create_by`   BIGINT(20),
    `create_time` datetime ( 0 ),
    `update_by`   BIGINT(20),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);

CREATE TABLE apigrid_unit_role
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `role_name`   VARCHAR(32),
    `sort_num`    BIGINT ( 20 ),
    `is_deleted`  INT ( 1 ),
    `create_by`   BIGINT(20),
    `create_time` datetime ( 0 ),
    `update_by`   BIGINT(20),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_unit_role_user
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `role_id`     BIGINT ( 20 ),
    `unit_ref_id` BIGINT ( 20 ),
    `unit_type`   INT ( 1 ),
    `update_by`   BIGINT(20),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_unit_team
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `parent_id`   BIGINT ( 20 ),
    `team_name`   VARCHAR(32),
    `sort_num`    BIGINT ( 20 ),
    `is_deleted`  INT ( 1 ),
    `create_by`   BIGINT(20),
    `create_time` datetime ( 0 ),
    `update_by`   BIGINT(20),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_unit_team_user
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `team_id`     BIGINT ( 20 ),
    `member_id`   BIGINT ( 20 ),
    `update_by`   BIGINT(20),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_unit_user
(
    `id`           BIGINT ( 20 ) NOT NULL,
    `username`     VARCHAR(32),
    `password`     VARCHAR(255),
    `mobile`       VARCHAR(32),
    `email`        VARCHAR(32),
    `avatar`       VARCHAR(255),
    `avatar_color` INT ( 1 ),
    `nick_name`    VARCHAR(32),
    `is_admin`     INT ( 1 ),
    `is_locked`    INT ( 1 ),
    `is_deleted`   INT ( 1 ),
    `create_by`    BIGINT (20),
    `create_time`  datetime ( 0 ),
    `update_by`    BIGINT (20),
    `update_time`  datetime ( 0 ),
    PRIMARY KEY (`id`)
);

CREATE TABLE apigrid_file_asset
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `bucket_name` VARCHAR(32),
    `file_name`   VARCHAR(255),
    `token`       VARCHAR(255),
    `mime_type`   VARCHAR(32),
    `md5`         VARCHAR(255),
    `is_deleted`  INT ( 1 ),
    `create_by`   BIGINT(20),
    `create_time` datetime ( 0 ),
    `update_by`   BIGINT(20),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_menu_control
(
    `id`              BIGINT ( 20 ) NOT NULL,
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
CREATE TABLE apigrid_menu_node
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `node_id`     VARCHAR(32),
    `parent_id`   VARCHAR(32),
    `node_name`   VARCHAR(32),
    `node_type`   INT ( 1 ),
    `cover`       VARCHAR(32),
    `icon`        VARCHAR(32),
    `is_deleted`  INT ( 1 ),
    `create_by`   BIGINT(20),
    `create_time` datetime ( 0 ),
    `update_by`   BIGINT(20),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);
CREATE TABLE apigrid_menu_node_rel
(
    `id`          BIGINT ( 20 ) NOT NULL,
    `node_id`     VARCHAR(32),
    `rel_node_id` VARCHAR(32),
    `is_deleted`  INT ( 1 ),
    `create_by`   BIGINT(20),
    `create_time` datetime ( 0 ),
    `update_by`   BIGINT(20),
    `update_time` datetime ( 0 ),
    PRIMARY KEY (`id`)
);

