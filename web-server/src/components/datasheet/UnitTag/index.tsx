import {Avatar} from "antd";
import {ApartmentOutlined, CloseOutlined} from '@ant-design/icons';
import {layoutThemeList} from "@/utils/theme";
import styles from './style.module.less';
import classNames from "classnames";

const getAvatarColor = (avatarColor: number = 10) => {
  return layoutThemeList[avatarColor]?.colorPrimary
}

export const AvatarType: any = {
  Team: 'square',
  Member: 'circle'
}

export function getFirstWordFromString(str: string) {
  const word = str.trim();
  if (!word.length) return '';
  const codePoint = word.codePointAt(0);
  if (!codePoint) return '';
  return (<div style={{height: 20, width: 20}}>{String.fromCodePoint(codePoint).toUpperCase()}</div>);
}

const UnitTag = (props: any) => {
  const {
    deletable = true,
    isTeam = false,
    avatar,
    avatarColor,
    nickName,
    onClose,
    unitId,
    isLeave,
    title,
    maxWidth
  } = props;

  const name = title || nickName;
  const avatarProps = isTeam ? {
    icon: <ApartmentOutlined/>,
    shape: AvatarType.Team
  } : avatar ? {
    src: avatar,
    shape: AvatarType.Member
  } : {
    style: {
      backgroundColor: getAvatarColor(avatarColor),
      color: 'white'
    },
    children: getFirstWordFromString(name)
  }
  return (
    <div className={classNames(styles.unitTag, props.className, {[styles.isLeave]: isLeave})}>
      <div className={classNames([styles.wrapper, isTeam ? styles.rect : styles.circle])}>
        <Avatar
          {...avatarProps}
          size={20}
        >
        </Avatar>
        <div className={styles.name} style={{maxWidth}}>{name}</div>
        {
          deletable &&
          <CloseOutlined className={styles.closeBtn} size={8} onClick={() => onClose && onClose(unitId)}/>
        }
      </div>
    </div>
  )
}

export default UnitTag;
