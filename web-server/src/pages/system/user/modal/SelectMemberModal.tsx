import {t} from "@/utils/i18n";
import {Avatar, Breadcrumb, Button, Checkbox, ConfigProvider, Input, Modal} from "antd";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import {UnitTeamApi} from "@/services/framework/UnitTeam";
import styles from './style.module.less'
import BjhSplitPane from "@/components/BjhSplitPane";
import {ApartmentOutlined, RightOutlined, SearchOutlined} from "@ant-design/icons";
import {debounce} from "lodash-es";
import {Constants} from "@/utils/constants";
import BaseAvatar from "@/components/BaseAvatar";
import UnitTag from "@/components/datasheet/UnitTag";

const SelectMemberModal = ({source, onSelect, setModalOpen}: any) => {

  const [loading, setLoading] = useState<boolean>(false);
  const [teamList, setTeamList] = useState<any>([])
  const [userList, setUserList] = useState<any>([])
  // const [clickedTeamId, setClickedTeamId] = useState<string>();
  const [checkedList, setCheckedList] = useState<any[]>([]);

  // Breadcrumb data source
  const [breadCrumbData, setBreadCrumbData] = useState<any[]>([{name: t.common_contacts, teamId: 0}]);

  const themeToken = useMemo(() => ({
    components: {
      Input: {
        borderRadius: 16
      }
    }
  }), [])

  const listSubUnit = useCallback((teamId: any) => {
    setLoading(true)
    UnitTeamApi.getSubUnitList({teamId}).then(response => {
      const {teams, users} = response;
      setTeamList(() => teams);
      setUserList(() => users);
    }).finally(() => {
      setLoading(false)
    })
  }, [breadCrumbData])

  useEffect(() => {
    const {teamId} = breadCrumbData[breadCrumbData.length - 1];
    listSubUnit(teamId)
  }, [breadCrumbData])

  const handleOk = () => {
    onSelect(checkedList)
    setModalOpen(false)
  }
  const handleCancel = () => {
    setModalOpen(false)
  }

  const onSearch = debounce((e) => {
    console.log(e)
  }, 200)

  const canEntrySubItem = (item: any) => {
    if (source === Constants.ChangeMemberTeam) {
      // 有子小组或子成员
      return item.hasChildren;
    } else if (source === Constants.ChangeTeam) {
      // 有子小组
      return item.hasChildrenTeam;
    }
    return false;
  };

  const onClickTeamItem = (e: MouseEvent, unit: any) => {
    e.preventDefault();
    if (loading || !canEntrySubItem(unit)) {
      return;
    }
    setBreadCrumbData([...breadCrumbData, {name: unit.teamName, teamId: unit.teamId}]);
    // setClickedTeamId(unit.teamId);
  };

  // Breadcrumb click event
  const skipUnit = (teamId: string) => {
    const index = breadCrumbData.findIndex(item => item.teamId === teamId);
    setBreadCrumbData(breadCrumbData.slice(0, index + 1));
    // setClickedTeamId(teamId);
  };

  const onChangeChecked = (unit: any) => {
    const idx = checkedList.findIndex(item => item.unitId === unit.unitId);
    if (idx !== -1) {
      setCheckedList(checkedList.filter(item => item.unitId !== unit.unitId));
      return;
    }
    setCheckedList([...checkedList, unit]);
  };

  // @ts-ignore
  return (<Modal
    title={t.unit_modal_select_title}
    width={800}
    open={true}
    onOk={handleOk}
    onCancel={handleCancel}
    cancelText={t.common_modal_cancel}
    okText={t.common_modal_confirm}
    confirmLoading={loading}
    maskClosable
    centered
  >
    <div className={styles.modalBody}>
      <BjhSplitPane minSize={480} allowResize={false}>
        <div className={styles.modalLeft}>
          <div className={styles.searchWrapper}>
            <ConfigProvider theme={themeToken}>
              <Input
                onChange={onSearch}
                placeholder={t.unit_modal_select_search}
                prefix={<SearchOutlined className="site-form-item-icon"/>}
              />
            </ConfigProvider>
          </div>
          <div className={styles.breadcrumb}>
            <div className={styles.breadcrumbWrapper}>
              <Breadcrumb items={breadCrumbData.map(breadItem => ({
                title: <div className={styles.breadItem}>{breadItem.name}</div>,
                onClick: () => skipUnit(breadItem.teamId)
              }))}/>
            </div>
          </div>
          <div className={styles.dataListWrapper}>
            <Checkbox.Group style={{width: '100%'}} value={checkedList.map((item: any) => item.unitId)}>
              {
                teamList.map((unit: any) =>
                  <div className={styles.checkItem} key={unit.unitId}>
                    <Checkbox value={unit.unitId} onClick={() => onChangeChecked(unit)}>
                      {/*<BaseUnitTeam {...unit} onClick={(e: MouseEvent) => onClickTeamItem(e, unit)}/>*/}
                      <div className={styles.teamItem} onClick={(e: any) => onClickTeamItem(e, unit)}>
                        <Avatar size={32} className={styles.teamIcon} shape={'square'} icon={<ApartmentOutlined/>}/>
                        <div className={styles.teamInfo}>
                          <div className={styles.teamTitle}>{unit.teamName}</div>
                          <div className={styles.userCount}>{unit.userCount}人</div>
                        </div>
                      </div>
                    </Checkbox>
                    {
                      unit.hasChildren &&
                      <Button
                        shape={'circle'}
                        size={'small'}
                        type={'text'}
                        icon={<RightOutlined/>}
                        onClick={(e: any) => onClickTeamItem(e, unit)}
                      />
                    }
                  </div>
                )
              }
              {
                userList.map((unit: any) =>
                  <div className={styles.checkItem} key={unit.unitId}>
                    <Checkbox value={unit.unitId} onClick={() => onChangeChecked(unit)}>
                      <div className={styles.memberItem}>
                        <BaseAvatar {...unit} size={32}/>
                        <div className={styles.nickName}>{unit.nickName || unit.unitName}</div>
                      </div>
                    </Checkbox>
                  </div>
                )
              }
            </Checkbox.Group>
          </div>
        </div>
        <div className={styles.modalRight}>
          <div className={styles.listTitle}>
            已选
          </div>
          <div className={styles.listWrapper}>
            {
              checkedList.map(unit =>
                <div className={styles.checkedUnit} key={unit.unitId}>
                  <UnitTag
                    {...unit}
                    isTeam={unit.teamId}
                    title={unit.teamName || unit.nickName}
                    onClose={() => onChangeChecked(unit)}
                  />
                </div>)
            }
          </div>
        </div>
      </BjhSplitPane>
    </div>
  </Modal>)
}

export default SelectMemberModal;
