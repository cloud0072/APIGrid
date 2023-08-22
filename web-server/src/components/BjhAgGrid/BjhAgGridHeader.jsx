import React, {useContext, useState} from 'react';
import {Checkbox, Dropdown, Input, theme, Tooltip} from 'antd';
import {CheckOutlined, SearchOutlined} from "@ant-design/icons";
import {GridContext} from './index';
import IconFont from "@/components/IconFont";

const BjhAgGridHeader = (props) => {

  const {api, column, displayName} = props;

  const {indeterminate, setIndeterminate, checkAll, setCheckAll} = useContext(GridContext);
  const {useToken} = theme;
  const {token} = useToken();

  const [active, setActive] = useState(false)
  const [open, setOpen] = useState(false)

  const onOpenChange = (open) => {
    setOpen(() => open)
  }
  const onCheckedChange = () => {
    setCheckAll(!checkAll)
    setIndeterminate(false);
    if (checkAll) {
      api.deselectAll()
    } else {
      api.selectAll()
    }
  }
  const onFilterChange = (e) => {
    console.log('onFilterChange', e.target.value)
  }
  const onMouseOver = (e) => {
    setActive(true)
    // console.log('onMouseEnter', e)
  }
  const onMouseLeave = (e) => {
    setActive(false)
    // console.log('onMouseLeave', e)
  }

  return (
    <>
      {column.colId === 'index' && (
        <div className="bjh-index-header">
          <div className="bjh-row-index" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
            <div className="bjh-row-index-checkbox">
              <Checkbox checked={checkAll} indeterminate={indeterminate} onChange={onCheckedChange}/>
            </div>
          </div>
        </div>
      )}
      {column.colId !== 'index' && (
        <div className="bjh-column-header" onMouseOver={onMouseOver} onMouseLeave={onMouseLeave}>
          <div className="bjh-column-header-title">
            {displayName}
          </div>
          <Tooltip title="快捷筛选" overlayInnerStyle={{fontSize: '13px', color: '#333'}} color="#fff">
            <Dropdown trigger="click" onOpenChange={onOpenChange} dropdownRender={() => (
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
            )}>
              <div className="bjh-column-header-filter">
                <IconFont type="adms-shaixuan" style={{
                  color: (active || open) ? token.colorTextSecondary : 'transparent',
                  margin: '4px',
                  fontSize: '16px'
                }}/>
              </div>
            </Dropdown>
          </Tooltip>
        </div>
      )}
    </>
  );
};

export default BjhAgGridHeader;
