import React, {useState} from "react";
import {BasePageContainer} from "@/components";
import BjhSplitPane from "@/components/BjhSplitPane";

import MemberTable from "@/pages/system/user/MemberTable";
import TeamTree from "@/pages/system/user/TeamTree";

const PageUserList = () => {
  const [teamKey, setTeamKey] = useState(null);

  return (
    <BasePageContainer>
      <div className={'base-panel'}>
        <BjhSplitPane minSize={280}>
          <TeamTree setTeamKey={setTeamKey}/>
          <MemberTable teamKey={teamKey}/>
        </BjhSplitPane>
      </div>
    </BasePageContainer>
  )
}

export default PageUserList;
