import {Transition} from "react-transition-group";
import env from "@/models/env";
import Logo from "../../../public/logo.svg";
import {useContext} from "react";
import {LayoutContext} from "@/layouts";

const HeaderTitle = () => {
  const {collapsed} = useContext(LayoutContext);
  return <Transition in={collapsed} timeout={300}>
    {(state: string) => (
      <div className={`bjh-header bjh-header-${state}`}>
        <a className="bjh-header-title">
          <img src={env.VITE_APP_LOGO || Logo} alt=""/>
          <Transition in={collapsed} timeout={300}>
            <h1 className={`bjh-header-title-text bjh-header-title-text-${state}`}>{env.VITE_APP_TITLE}</h1>
          </Transition>
        </a>
      </div>
    )}
  </Transition>
}

export default HeaderTitle;
