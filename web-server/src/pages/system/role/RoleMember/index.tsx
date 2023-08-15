import styles from "@/pages/system/user/style.module.less";
import React, {useCallback, useContext, useEffect, useMemo, useState} from "react";
import {Button, Table} from "antd";
import {t} from "@/utils/i18n";
import SelectMemberModal from "@/pages/system/user/modal/SelectMemberModal";
import {RoleMemberContext, UnitType} from "@/pages/system/role";
import {UnitRoleApi} from "@/services/framework/UnitRole";
import {Constants} from "@/utils/constants";
import UnitItem from "@/pages/system/role/UnitItem";

// @ts-ignore
const tableProps = ({onDelete}) => ({
  columns: [
    {
      title: '成员',
      dataIndex: 'unitId',
      key: 'unitId',
      align: 'left',
      render: (text: any, record: any) => (
        <UnitItem {...record} />
      ),
    },
    {
      title: '小组名称',
      dataIndex: 'teamNames',
      key: 'teamNames',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => {
        return <Button type={'link'} danger={true} onClick={() => onDelete(record)}>移除该角色</Button>
      },
    }
  ] as any
});

const initPageInfo = {pageNum: 0, pageSize: 10}

const RoleMember = () => {

  const {roleId, roleList} = useContext(RoleMemberContext);
  const [pageInfo, setPageInfo] = useState({...initPageInfo});
  const [roleMemberList, setRoleMemberList] = useState<any>([]);
  const [selectedUnitIds, setSelectedUnitIds] = useState<any>([]);
  const [selectMemberModalOpen, setSelectMemberModalOpen] = useState<any>(false);

  const listRoleMember = useCallback(() => {
    if (roleId === 0) {
      return
    }
    UnitRoleApi.getRoleMemberPage({roleId, pageInfo}).then(response => {
      const {records} = response.data;
      console.log('getRoleMemberPage')
      setRoleMemberList(() => records);
      setSelectedUnitIds([]);
    })
  }, [roleId, pageInfo])

  useEffect(() => {
    listRoleMember()
  }, [roleId, pageInfo])

  const insertRoleUser = useCallback(() => {
    setSelectMemberModalOpen(true);
  }, [])

  const deleteRoleMember = useCallback((unit: any = undefined) => {
    console.log('deleteRoleMember', unit)
    const unitIds = []
    if (unit) {
      unitIds.push(getRowKey(unit))
    } else {
      unitIds.push(...selectedUnitIds)
    }
    UnitRoleApi.deleteByUnitIds({roleId, unitIds}).then(() => {
      listRoleMember()
    })
  }, [roleId, selectedUnitIds])

  const currentRole = useMemo(() => {
    return roleList.find((role: any) => role.id === roleId)
  }, [roleList, roleId])

  const rowSelection = {
    selectedRowKeys: selectedUnitIds,
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      setSelectedUnitIds(selectedRowKeys)
    }
  }

  const getRowKey = (data: any) => data.unitId;

  const onSubmit = (unitList: any[]) => {
    const roleMembers = unitList.map(unit => {
      const {teamId, userId} = unit;
      return {unitRefId: teamId ? teamId : userId, unitType: teamId ? UnitType.Team : UnitType.Member}
    })
    UnitRoleApi.insertRoleUser({roleId, roleMembers}).then(() => {
      listRoleMember()
    })
  }

  return (
    <div className={styles.memberTable}>
      <div className={styles.panelTitle}>{currentRole?.roleName}</div>
      <div className={styles.memberTableBtn}>
        <Button onClick={insertRoleUser}>{t.role_table_create}</Button>
        {selectedUnitIds.length > 0 && <Button onClick={() => deleteRoleMember()}>{t.role_table_remove}</Button>}
      </div>
      <div className={styles.memberTableWrapper}>
        <Table
          {...tableProps({onDelete: deleteRoleMember})}
          size={'middle'}
          dataSource={roleMemberList}
          pagination={false}
          rowSelection={rowSelection}
          rowKey={getRowKey}
        />
      </div>
      {
        selectMemberModalOpen &&
        <SelectMemberModal
          source={Constants.ChangeMemberTeam}
          onSelect={onSubmit}
          setModalOpen={setSelectMemberModalOpen}
        />
      }
    </div>
  )
};

export default RoleMember;
