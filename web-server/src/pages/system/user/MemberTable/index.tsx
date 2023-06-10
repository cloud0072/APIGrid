import styles from "@/pages/system/user/style.module.less";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Table} from "antd";
import {UnitMemberApi} from "@/services/framework/UnitMember";

const MemberTable = (props: any) => {
  const [members, setMembers] = useState<any>([]);
  const tableProps = {
    columns: [
      {
        title: '成员ID',
        dataIndex: 'id',
        key: 'id',
        align: 'left',
      },
      {
        title: '成员名称',
        dataIndex: 'memberName',
        key: 'memberName',
        align: 'left',
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        align: 'left',
      },
    ] as any
  };

  const addUnitMember = useCallback(() => {
  }, [])
  const listUnitMember = useCallback(() => {
    UnitMemberApi.getList({teamId: props.teamId}).then(response => {
      // console.log('UnitMemberApi.getList', response);
      setMembers(() => response.data);
    })
  }, [props.teamId])

  useEffect(() => {
    listUnitMember()
  }, [])

  return (
    <div className={styles.memberTable}>
      <div className={styles.panelTitle}>成员管理</div>
      <div className={styles.memberTableBtn}>
        <Button onClick={addUnitMember}>创建成员</Button>
      </div>
      <div className={styles.memberTableWrapper}>
        <Table
          {...tableProps}
          dataSource={members}
          pagination={false}
          rowKey={record => String(record.memberId)}
          // scroll={{ y: scrollHeight }}
        />
      </div>
    </div>
  )
};

export default MemberTable;
