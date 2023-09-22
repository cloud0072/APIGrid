import {Dropdown, Input, theme, Tooltip} from "antd";
import IconFont from "@/components/IconFont";
import React, {useState} from "react";
import {CheckOutlined, SearchOutlined} from "@ant-design/icons";
import styles from './style.module.less';

const GridFieldHeader = ({api, column, displayName}: any) => {
  const {useToken} = theme;
  const {token} = useToken();
  const [open, setOpen] = useState(false)

  const onOpenChange = (open: any) => {
    console.log('onOpenChange', open)
    setOpen(open)
  }
  const onFilterChange = (e: any) => {
    console.log('onFilterChange', e.target.value)
  }

  const FilterDropDown = () => (
    // <div className="bjh-dropdown">
    <div className="bjh-dropdown bjh-dropdown-column">
      <div className="bjh-dropdown-column-head">
        <div className="bjh-dropdown-column-title">
          <div className="bjh-dropdown-column-name">快捷筛选</div>
          <div className="bjh-dropdown-column-action">
            <div className="v6-bjh-btn v6-bjh-btn-dangerous">清空</div>
          </div>
        </div>
        <div className="bjh-dropdown-column-search">
          <Input
            onChange={onFilterChange}
            placeholder="搜索"
            prefix={<SearchOutlined className="site-form-item-icon"/>}
          />
        </div>
      </div>
      <div className="bjh-dropdown-column-body">
        <div className="bjh-flex-col">
          <div className="bjh-flex-cell-auto"/>
          <div className="bjh-flex-cell">
            <div className="bjh-dropdown-divider"/>
            <div className="bjh-dropdown-select">
              <div className="bjh-dropdown-select-option bjh-selected">
                <div className="bjh-dropdown-select-option-content">
                  <div className="bjh-dropdown-select-option-content-title">
                    已填写
                  </div>
                </div>
                <div className="bjh-dropdown-select-option-action">
                  <CheckOutlined style={{color: 'rgb(62, 161, 247)'}}/>
                </div>
              </div>
              <div className="bjh-dropdown-select-option">
                <div className="bjh-dropdown-select-option-content">
                  <div className="bjh-dropdown-select-option-content-title">
                    未填写
                  </div>
                </div>
                <div className="bjh-dropdown-select-option-action">
                  {/*<CheckOutlined style={{color: 'rgb(62, 161, 247)'}} />*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  )

  return (
    <div className="bjh-column-header">
      <div className="bjh-column-header-title">
        {displayName}
      </div>
      <Tooltip title="快捷筛选" overlayInnerStyle={{fontSize: '13px', color: '#333'}} color="#fff">
        <Dropdown trigger={['click']} onOpenChange={onOpenChange} dropdownRender={FilterDropDown}>
          <div className="bjh-column-header-filter">
            <IconFont type="adms-shaixuan" className={styles.filterIcon} style={{color: token.colorTextSecondary}}/>
          </div>
        </Dropdown>
      </Tooltip>
    </div>
  )
}

export default GridFieldHeader;
