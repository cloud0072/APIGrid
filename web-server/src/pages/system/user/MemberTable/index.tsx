import styles from "@/pages/system/user/style.module.less";
import React, {useCallback, useContext, useState} from "react";
import {Button, Space, Table} from "antd";
import {t} from "@/utils/i18n";
import EditMemberModal from "@/pages/system/user/modal/EditMemberModal";
import {TeamTreeContext} from "@/pages/system/user";
import BaseAvatar from "@/components/BaseAvatar";
import EditPasswordModal from "@/pages/system/user/modal/EditPasswordModal";
import {ColumnsType} from "antd/lib/table";

const MemberTable = () => {

  const {memberList} = useContext(TeamTreeContext);
  const [member, setMember] = useState<any>({});
  const [editMemberModalOpen, setEditMemberModalOpen] = useState<any>(false);
  const [editPasswordModalOpen, setEditPasswordModalOpen] = useState<any>(false);

  const insertUnitUser = useCallback(() => {
    setMember(() => undefined)
    setEditMemberModalOpen(true);
  }, [])

  const updateUnitUser = useCallback((member: any) => {
    setMember(member)
    setEditMemberModalOpen(true);
  }, [])

  const onResetPwd = useCallback((member: any) => {
    setMember(member)
    setEditPasswordModalOpen(true);
  }, [])

  const columns: ColumnsType<any> = [
    {
      title: '成员ID',
      dataIndex: 'userId',
      key: 'userId',
      align: 'left',
    },
    {
      title: '成员名称',
      dataIndex: 'nickName',
      key: 'nickName',
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
        return (<BaseAvatar {...record} size={40}/>)
      },
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => {
        return (
          <Space>
            <Button type={'link'} onClick={() => updateUnitUser(record)}>编辑</Button>
            <Button type={'link'} onClick={() => onResetPwd(record)}>重置</Button>
          </Space>
        )
      },
    }
  ]

  return (
    <div className={styles.memberTable}>
      <div className={styles.panelTitle}>{t.user_table_title}</div>
      <div className={styles.memberTableBtn}>
        <Button onClick={insertUnitUser}>{t.user_table_create}</Button>
      </div>
      <div className={styles.memberTableWrapper}>
        <Table
          columns={columns}
          size={'middle'}
          dataSource={memberList}
          pagination={false}
          rowKey={record => String(record.userId)}
          // scroll={{ y: scrollHeight }}
        />
      </div>
      {
        editMemberModalOpen &&
        <EditMemberModal userId={member?.userId} setOpen={setEditMemberModalOpen}/>
      }
      {
        editPasswordModalOpen &&
        <EditPasswordModal userId={member?.userId} setOpen={setEditPasswordModalOpen}/>
      }
    </div>
  )
};

export default MemberTable;
