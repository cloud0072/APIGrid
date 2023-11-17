import IconFont from "@/components/IconFont";
import React, {useState} from "react";
import './style.less';

const BjhButton = (props) => {
  return (
    <div {...props} className={`bjh-btn bjh-btn-${props.size || 'middle'}`}>
      {props.icon && <IconFont type={props.icon} className="bjh-btn-icon"/>}
      {props.text && <div className="bjh-btn-label">{props.text}</div>}
    </div>
  )
}

export default BjhButton;
