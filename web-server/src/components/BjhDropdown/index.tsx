import {Dropdown} from "antd";
import React from "react";
import styles from './style.module.less'

const BjhDropdown = ({titleRender, dropdownRender, trigger, open, onClick, width, children}: any) => {
  return (
    <Dropdown trigger={trigger || 'click'} open={open} dropdownRender={() => (
      <div className={styles.bjhDropdown} style={{width: width || '208px'}}>
        {titleRender && (
          <div className={styles.bjhDropdownHead}>
            {titleRender()}
          </div>
        )}
        <div className={styles.bjhDropdownBody}>
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
