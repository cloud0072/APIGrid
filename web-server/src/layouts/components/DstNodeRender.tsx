import React, {useContext, useEffect, useMemo, useState} from "react";
import {LayoutContext} from "@/layouts";
import {Scrollbars} from 'react-custom-scrollbars';

const DstNodeRender = () => {
  const {menuType, height, width} = useContext(LayoutContext);
  const show = useMemo(() => menuType == 'datasheet' || menuType == 'dashboard', [menuType]);
  const [nodeList, setNodeList] = useState<any>([]);
  useEffect(() => {
    const array: any[] = []
    for (let i = 0; i < 50; i++) {
      array.push({name: i})
    }
    setNodeList(() => array)
  }, [])

  return (<>
    {show &&
    <div>
      <Scrollbars style={{height: (height - 64 - 40)}}>
        {nodeList.map((item: any) => <div>{item?.name}</div>)}
      </Scrollbars>
    </div>
    }
  </>)
};

export default DstNodeRender;
