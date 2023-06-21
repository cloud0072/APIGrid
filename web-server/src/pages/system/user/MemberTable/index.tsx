import styles from "@/pages/system/user/style.module.less";
import React, {useCallback, useEffect, useState} from "react";
import {Button, Table} from "antd";
import {UnitMemberApi} from "@/services/framework/UnitMember";
import {t} from "@/utils/i18n";
import EditMemberModal from "@/pages/system/user/modal/EditMemberModal";

const MemberTable = (props: any) => {
  const [members, setMembers] = useState<any>([]);
  const [editMemberModalOpen, setEditMemberModalOpen] = useState<any>(false);

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
        title: '账号',
        dataIndex: 'username',
        key: 'username',
        align: 'left',
      },
      {
        title: '头像',
        dataIndex: 'avatar',
        key: 'avatar',
        align: 'left',
      },
    ] as any
  };

  const addUnitMember = useCallback(() => {
    setEditMemberModalOpen(true);
  }, [])
  const listUnitMember = useCallback(() => {
    UnitMemberApi.getList({teamId: props.teamId}).then(response => {
      setMembers(() => response.data);
    })
  }, [props.teamId])

  useEffect(() => {
    listUnitMember()
  }, [])

  return (
    <div className={styles.memberTable}>
      <div className={styles.panelTitle}>{t.member_table_title}</div>
      <div className={styles.memberTableBtn}>
        <Button onClick={addUnitMember}>{t.member_table_create}</Button>
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
      {
        editMemberModalOpen && <EditMemberModal setEditMemberModalOpen={setEditMemberModalOpen}/>
      }
    </div>
  )
};

export default MemberTable;
