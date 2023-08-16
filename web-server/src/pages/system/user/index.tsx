import React, {createContext, useCallback, useEffect, useState} from "react";
import {BasePageContainer} from "@/components";
import BjhSplitPane from "@/components/BjhSplitPane";

import MemberTable from "@/pages/system/user/MemberTable";
import TeamTree from "@/pages/system/user/TeamTree";
import {UnitTeamApi} from "@/services/framework/UnitTeam";
import {UnitUserApi} from "@/services/framework/UnitUser";

export const TeamTreeContext = createContext({
  teamTree: [],
  memberList: [],
  setPageInfo: undefined,
  setTeamTree: undefined,
  listUnitTeam: undefined
} as any)

const PageUserList = () => {
  const [teamId, setTeamId] = useState(0);
  const [teamTree, setTeamTree] = useState<any[]>([]);
  const [memberList, setMemberList] = useState<any>([]);
  const [pageInfo, setPageInfo] = useState<any>({
    pageSize: 20,
    pageNum: 1
  });

  const listTeamMember = useCallback(() => {
    const selectKey = teamTree[0]?.key === teamId ? "0" : teamId;
    UnitUserApi.getPage({teamId: selectKey, ...pageInfo}).then(response => {
      const records = response.data.records;
      setMemberList(() => records);
    })
  }, [teamId])

  const listUnitTeam = useCallback(() => {
    UnitTeamApi.getTeamTree({id: 0}).then((response: any) => {
      const {data} = response;
      setTeamTree(data);
      setTeamId(data[0]?.key)
    })
  }, [])

  useEffect(() => {
    listUnitTeam()
  }, [])

  useEffect(() => {
    listTeamMember()
  }, [teamId])

  return (
    <BasePageContainer>
      <div className={'base-panel'}>
        <TeamTreeContext.Provider value={{
          teamId,
          teamTree,
          memberList,
          setTeamId,
          setMemberList,
          listUnitTeam,
          listTeamMember
        }}>
          <BjhSplitPane minSize={280}>
            <TeamTree/>
            <MemberTable/>
          </BjhSplitPane>
        </TeamTreeContext.Provider>
      </div>
    </BasePageContainer>
  )
}

export default PageUserList;
