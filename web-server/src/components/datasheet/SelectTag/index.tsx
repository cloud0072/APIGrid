import {ApartmentOutlined, CloseOutlined} from '@ant-design/icons';
import {layoutThemeList} from "@/utils/theme";
import styles from './style.module.less';
import classNames from "classnames";

const getRgbColor = (color: number = 10) => {
  return layoutThemeList[color]?.colorPrimary
}

const SelectTag = (props: any) => {
  const {
    deletable = true,
    id,
    name,
    color,
    onClose,
    maxWidth
  } = props;

  const itemStyle = {
    backgroundColor: getRgbColor(color),
    color: 'white',
    maxWidth
  }
  return (
    <div className={classNames(styles.selectTag, props.className)}>
      <div className={classNames([styles.wrapper, styles.circle])} style={itemStyle}>
        <div className={styles.name}>{name}</div>
        {
          deletable &&
          <CloseOutlined className={styles.closeBtn} size={8} onClick={() => onClose && onClose(id)}/>
        }
      </div>
    </div>
  )
}

export default SelectTag;
