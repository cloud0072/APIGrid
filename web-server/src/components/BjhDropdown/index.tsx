import {Dropdown} from "antd";
import React from "react";
import styles from './style.module.less'

const BjhDropdown = (props: any) => {
  const {titleRender, dropdownRender, onClick, width, children, ...rest} = props;
  return (
    <Dropdown
      dropdownRender={() => (
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
      )}
      {...rest}
    >
      <div onClick={onClick}>{children}</div>
    </Dropdown>
  )
}

export default BjhDropdown;
