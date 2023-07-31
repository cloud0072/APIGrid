import styles from "@/pages/system/user/style.module.less";
import React, {useCallback, useContext, useState} from "react";
import {Button, Table} from "antd";
import {t} from "@/utils/i18n";
import EditMemberModal from "@/pages/system/user/modal/EditMemberModal";
import {TeamTreeContext} from "@/pages/system/user";
import BaseAvatar from "@/components/BaseAvatar";

// @ts-ignore
const tableProps = ({onUpdate}) => ({
  columns: [
    {
      title: '成员ID',
      dataIndex: 'memberId',
      key: 'memberId',
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
      dataIndex: 'mobile',
      key: 'mobile',
      align: 'left',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      align: 'left',
      render: (text: any, record: any) => {
        return (<BaseAvatar {...record} size={40}>编辑</BaseAvatar>)
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => {
        return <Button type={'link'} onClick={() => onUpdate(record)}>编辑</Button>
      },
    }
  ] as any
});

const MemberTable = () => {

  const {memberList} = useContext(TeamTreeContext);
  const [member, setMember] = useState<any>({});
  const [editMemberModalOpen, setEditMemberModalOpen] = useState<any>(false);

  const insertUnitMember = useCallback(() => {
    setMember(() => undefined)
    setEditMemberModalOpen(true);
  }, [])

  const updateUnitMember = useCallback((member: any) => {
    setMember(member)
    setEditMemberModalOpen(true);
  }, [])

  return (
    <div className={styles.memberTable}>
      <div className={styles.panelTitle}>{t.member_table_title}</div>
      <div className={styles.memberTableBtn}>
        <Button onClick={insertUnitMember}>{t.member_table_create}</Button>
      </div>
      <div className={styles.memberTableWrapper}>
        <Table
          {...tableProps({onUpdate: updateUnitMember})}
          size={'middle'}
          dataSource={memberList}
          pagination={false}
          rowKey={record => String(record.memberId)}
          // scroll={{ y: scrollHeight }}
        />
      </div>
      {
        editMemberModalOpen &&
        <EditMemberModal memberId={member?.memberId} setEditMemberModalOpen={setEditMemberModalOpen}/>
      }
    </div>
  )
};

export default MemberTable;
