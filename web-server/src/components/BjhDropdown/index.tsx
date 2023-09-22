import {Dropdown} from "antd";
import React from "react";

const BjhDropdown = ({titleRender, dropdownRender, trigger, open, onClick, width, children}: any) => {
  return (
    <Dropdown trigger={trigger || 'click'} open={open} dropdownRender={() => (
      <div className="bjh-dropdown bjh-dropdown-option" style={{width: width || '208px'}}>
        {titleRender && (
          <div className="bjh-dropdown-option-head">
            {titleRender()}
          </div>
        )}
        <div className="bjh-dropdown-option-body">
          {dropdownRender && dropdownRender()}
        </div>
      </div>
    )}>
      <div onClick={onClick}>
        {children}
      </div>
    </Dropdown>
  )
}

export default BjhDropdown;
