import './index.less'

type ScrollbarType = {
  children: any;
  width?: number;
  height?: number;
}
const BjhScrollbar = ({width, height, children}: ScrollbarType) => {
  return (
    <div className={'bjh-scroll-bar'} style={{width, height}}>
      <div className={`bjh-scroll-bar-inner`}>
        {children}
      </div>
    </div>
  )
}

export default BjhScrollbar;
