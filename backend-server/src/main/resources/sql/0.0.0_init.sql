CREATE TABLE IF NOT EXISTS apigrid_user
(
    `user_id` bigint
(
    20
) NOT NULL,
    `username` varchar
(
    32
),
    `password` varchar
(
    255
),
    `mobile` varchar
(
    32
),
    `email` varchar
(
    32
),
    `avatar` varchar
(
    255
),
    `nick_name` varchar
(
    32
),
    `is_locked` int
(
    1
),
    `is_deleted` int
(
    1
),
    `create_by` varchar
(
    32
),
    `create_time` datetime
(
    0
),
    `update_by` varchar
(
    32
),
    `update_time` datetime
(
    0
),
    PRIMARY KEY
(
    `user_id`
)
    );

CREATE TABLE IF NOT EXISTS apigrid_space
(
    `id` bigint
(
    20
) NOT NULL,
    `spc_id` varchar
(
    32
),
    `space_name` varchar
(
    32
),
    `logo` varchar
(
    32
),
    `owner` varchar
(
    32
),
    `props` json,
    `is_deleted` int
(
    1
),
    `create_by`   varchar(32),
    `create_time` datetime(0),
    `update_by`   varchar(32),
    `update_time` datetime(0),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS apigrid_unit
(
    `id`          bigint(20) NOT NULL,
    `spc_id`      varchar(32),
    `unit_type`   int(1),
    `unit_ref_id` bigint(20),
    `is_deleted`  int(1),
    `create_by`   varchar(32),
    `create_time` datetime(0),
    `update_by`   varchar(32),
    `update_time` datetime(0),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS apigrid_unit_member
(
    `id` bigint
(
    20
) NOT NULL,
    `user_id` bigint
(
    20
),
    `spc_id` varchar
(
    32
),
    `member_name` varchar
(
    32
),
    `is_locked` varchar
(
    32
),
    `is_admin` int
(
    1
),
    `is_deleted` int
(
    1
),
    `create_by` varchar
(
    32
),
    `create_time` datetime
(
    0
),
    `update_by` varchar
(
    32
),
    `update_time` datetime(0),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS apigrid_unit_role
(
    `id`          bigint(20) NOT NULL,
    `spc_id`      varchar(32),
    `role_name`   varchar(32),
    `sort_num`    bigint(20),
    `is_deleted`  int(1),
    `create_by`   varchar(32),
    `create_time` datetime(0),
    `update_by`   varchar(32),
    `update_time` datetime(0),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS apigrid_unit_team
(
    `id`          bigint(20) NOT NULL,
    `spc_id`      varchar(32),
    `parent_id` bigint
(
    20
),
    `team_name` varchar
(
    32
),
    `sort_num` bigint
(
    20
),
    `is_deleted` int
(
    1
),
    `create_by` varchar
(
    32
),
    `create_time` datetime
(
    0
),
    `update_by` varchar
(
    32
),
    `update_time` datetime
(
    0
),
    PRIMARY KEY
(
    `id`
)
    );

CREATE TABLE IF NOT EXISTS apigrid_unit_team_member
(
    `id` bigint
(
    20
) NOT NULL,
    `team_id` bigint
(
    20
),
    `member_id` bigint
(
    20
),
    `create_time` datetime
(
    0
),
    PRIMARY KEY
(
    `id`
)
    );

CREATE TABLE IF NOT EXISTS apigrid_asset
(
    `id` bigint
(
    20
) NOT NULL,
    `bucket_name` varchar
(
    32
),
    `file_url` varchar
(
    255
),
    `file_name` varchar
(
    255
),
    `mime_type` varchar
(
    32
),
    `md5` varchar
(
    255
),
    `is_deleted` int
(
    1
),
    `create_by`   varchar(32),
    `create_time` datetime(0),
    `update_by`   varchar(32),
    `update_time` datetime(0),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS apigrid_node
(
    `id`          bigint(20) NOT NULL,
    `node_id`     varchar(32),
    `parent_id`   varchar(32),
    `node_name`   varchar(32),
    `node_type`   int(1),
    `cover`       varchar(32),
    `icon`        varchar(32),
    `is_deleted`  int(1),
    `create_by`   varchar(32),
    `create_time` datetime(0),
    `update_by`   varchar(32),
    `update_time` datetime(0),
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS apigrid_control
(
    `id`              bigint(20) NOT NULL,
    `spc_id`          varchar(32),
    `ctr_id`          varchar(32),
    `unit_id`         varchar(32),
    `control_type`    int(1),
    `permission_type` int(1),
    `is_deleted`      int(1),
    `create_by`       varchar(32),
    `create_time`     datetime(0),
    `update_by`       varchar(32),
    `update_time`     datetime(0),
    PRIMARY KEY (`id`)
);