import React, {createContext, useCallback, useEffect, useState} from "react";
import {BasePageContainer} from "@/components";
import BjhSplitPane from "@/components/BjhSplitPane";

import {UnitRoleApi} from "@/services/framework/UnitRole";
import RoleList from "@/pages/system/role/RoleList";
import RoleMember from "@/pages/system/role/RoleMember";

export const UnitType = {
  Team: 1,
  User: 3
}

export const RoleUserContext = createContext<any>({
  roleId: undefined,
  roleList: [],
  setRoleId: undefined,
  setRoleList: undefined,
})

const PageRoleList = () => {
  const [roleId, setRoleId] = useState(0);
  const [roleList, setRoleList] = useState<any[]>([]);

  const listUnitRole = useCallback(() => {
    UnitRoleApi.getList({}).then((response: any) => {
      const {data} = response;
      setRoleList(data)
      setRoleId(data?.[0]?.id)
    })
  }, [])

  useEffect(() => {
    listUnitRole()
  }, [])

  return (
    <BasePageContainer>
      <div className={'base-panel'}>
        <RoleUserContext.Provider value={{
          roleId,
          roleList,
          setRoleId,
          setRoleList,
          listUnitRole,
        }}>
          <BjhSplitPane minSize={280}>
            <RoleList/>
            <RoleMember/>
          </BjhSplitPane>
        </RoleUserContext.Provider>
      </div>
    </BasePageContainer>
  )
}

export default PageRoleList;
