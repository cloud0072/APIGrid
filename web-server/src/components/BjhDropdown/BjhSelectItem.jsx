import {CheckOutlined} from "@ant-design/icons";
import React, {useMemo} from "react";
import {useTheme} from "@/hooks/useTheme";

const BjhSelectItem = ({label, icon, active, onClick}) => {
  const {themeMode, themeColors} = useTheme()
  const itemStyle = useMemo(() => (
    {backgroundColor: active ? themeColors.primaryActiveColor : 'transparent'}
  ), [active, themeMode])

  return (
    <div className="bjh-dropdown-select-item" onClick={onClick}>
      <div className="bjh-dropdown-select-option" style={itemStyle}>
        <div className="bjh-dropdown-select-option-content">
          <div className="bjh-dropdown-select-option-content-title">
            {icon}
            {label}
          </div>
        </div>
        <div className="bjh-dropdown-select-option-action">
          {active && <CheckOutlined style={{color: themeColors.colorPrimary}}/>}
        </div>
      </div>
    </div>
  )
}

export default BjhSelectItem;
