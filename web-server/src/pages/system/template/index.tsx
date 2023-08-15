import {BasePageContainer} from "@/components";
import {useLocation} from "react-router-dom";

const PageSelClueList = () => {

  const {pathname} = useLocation();

  return (
    <BasePageContainer>
      {pathname}
    </BasePageContainer>
  );
};

export default PageSelClueList;
