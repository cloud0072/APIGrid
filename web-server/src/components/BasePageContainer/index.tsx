import type {PageContainerProps} from '@ant-design/pro-components';
// import {PageContainer} from '@ant-design/pro-components';
import type {FC} from 'react';
import {cloneElement, useMemo} from 'react';
import {useResize} from "@/hooks/useResize";

export const BasePageContainer: FC<PageContainerProps> = (props) => {
  const {height} = useResize();
  const pageStyle = useMemo(() => ({
    height: `${height}px`,
    width: '100%',
    padding: '12px'
  }), [height]);
  // return cloneElement(<PageContainer header={pageHeader} style={pageStyle}/>, props);
  return cloneElement(<div style={pageStyle}/>, props);
};
