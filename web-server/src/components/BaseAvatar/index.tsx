import {Avatar} from "antd";
import {UserOutlined} from '@ant-design/icons';
import {layoutThemeList} from "@/utils/theme";


const getAvatarColor = (avatarColor: number) => {
  return layoutThemeList[avatarColor]?.colorPrimary
}

const BaseAvatar = (props: any) => {
  const {avatar, avatarColor, nickName, size} = props
  const avatarProps = {
    size: size || 40,
  }
  const style = {
    backgroundColor: getAvatarColor(avatarColor),
    color: 'white'
  }
  return avatar ? <Avatar {...avatarProps} src={avatar}/> :
    nickName ? <Avatar {...avatarProps} style={style}>{nickName.charAt(0)}</Avatar> :
      <Avatar {...avatarProps} icon={<UserOutlined/>}/>;
}

export default BaseAvatar;
