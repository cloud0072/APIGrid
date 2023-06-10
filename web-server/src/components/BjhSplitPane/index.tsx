import SplitPane, {SplitPaneProps} from "react-split-pane";
import './index.less';

const BjhSplitPane = (props: SplitPaneProps | { children: any }) => {
  // const { split, minSize, maxSize, defaultSize, children } = props;
  return (
    <div style={{position: 'relative', height: '100%'}}>
      <SplitPane {...props}/>
    </div>
  )
}

export default BjhSplitPane;
