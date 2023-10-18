import {Dropdown} from "antd";
import React from "react";
import styles from './style.module.less'

const BjhDropdown = (props: any) => {
  const {titleRender, dropdownRender, onClick, width, children, ...rest} = props;
  return (
    <Dropdown
      dropdownRender={(menu) => (
        <div className={styles.bjhDropdown} style={{width: width || '208px'}}>
          {titleRender && (
            <div className={styles.bjhDropdownHead}>
              {titleRender()}
            </div>
          )}
          <div className={styles.bjhDropdownBody}>
            {dropdownRender && dropdownRender(menu)}
          </div>
        </div>
      )}
      {...rest}
    >
      <div style={{height: '100%', width: '100%'}} onClick={onClick}>{children}</div>
    </Dropdown>
  )
}

export default BjhDropdown;
