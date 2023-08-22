import type {PageContainerProps} from '@ant-design/pro-components';
// import {PageContainer} from '@ant-design/pro-components';
import type {FC} from 'react';
import {cloneElement, useContext, useMemo} from 'react';
import {LayoutContext} from "@/layouts";

export const BasePageContainer: FC<PageContainerProps> = (props) => {
  const {height} = useContext(LayoutContext)
  const pageStyle = useMemo(() => ({
    height: `${height}px`,
    width: '100%',
    padding: '12px'
  }), [height]);
  // return cloneElement(<PageContainer header={pageHeader} style={pageStyle}/>, props);
  return cloneElement(<div style={pageStyle}/>, props);
};
