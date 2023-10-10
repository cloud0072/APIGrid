import React, {createContext, useCallback, useEffect, useState} from "react";
import {BasePageContainer} from "@/components";
import BjhSplitPane from "@/components/BjhSplitPane";

import MemberTable from "@/pages/system/user/UserTable";
import TeamTree from "@/pages/system/user/TeamTree";
import {UnitTeamApi} from "@/services/framework/UnitTeam";
import {UnitUserApi} from "@/services/framework/UnitUser";

export const TeamTreeContext = createContext({
  teamTree: [],
  userList: [],
  setPageInfo: undefined,
  setTeamTree: undefined,
  listUnitTeam: undefined
} as any)

export interface ITreeNode {
  title: string;
  key: string;
  value: string;
  isLeaf?: boolean;
  children?: ITreeNode[];
}

export const TeamConstant = {
  ROOT_TEAM_ID: '0',
  ROOT_TEAM_TITLE: '根节点'
}

const ROOT_TREE_NODE: ITreeNode = {
  title: TeamConstant.ROOT_TEAM_TITLE,
  value: TeamConstant.ROOT_TEAM_ID,
  key: TeamConstant.ROOT_TEAM_ID,
}

const PageUserList = () => {
  const [teamId, setTeamId] = useState<string>("0");
  const [teamTree, setTeamTree] = useState<any[]>([]);
  const [userList, setUserList] = useState<any>([]);
  const [pageInfo, setPageInfo] = useState<any>({
    pageSize: 20,
    pageNum: 1
  });

  const listTeamMember = useCallback(() => {
    if (!teamId) {
      return
    }
    // const selectKey = teamTree[0]?.key === teamId ? "0" : teamId;
    UnitUserApi.getPage({teamId, ...pageInfo}).then(response => {
      const records = response.data.records;
      setUserList(() => records);
    })
  }, [teamId])

  const listUnitTeam = useCallback(() => {
    UnitTeamApi.getTeamTree().then((response: any) => {
      const {data} = response;
      const teamTree = [{...ROOT_TREE_NODE, isLeaf: data?.length > 0, children: data}]
      setTeamTree(teamTree);
      setTeamId(TeamConstant.ROOT_TEAM_ID)
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
          teamTree,
          teamId,
          setTeamId,
          userList,
          setUserList,
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
