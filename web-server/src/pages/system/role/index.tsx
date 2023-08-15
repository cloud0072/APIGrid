import React, {createContext, useCallback, useEffect, useState} from "react";
import {BasePageContainer} from "@/components";
import BjhSplitPane from "@/components/BjhSplitPane";

import {UnitRoleApi} from "@/services/framework/UnitRole";
import RoleList from "@/pages/system/role/RoleList";
import RoleMember from "@/pages/system/role/RoleMember";

export const UnitType = {
  Team: 1,
  Member: 3
}

export const RoleMemberContext = createContext({
  roleId: undefined,
  roleList: [],
  setRoleId: undefined,
  setRoleList: undefined,
} as any)

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
        <RoleMemberContext.Provider value={{
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
        </RoleMemberContext.Provider>
      </div>
    </BasePageContainer>
  )
}

export default PageRoleList;
