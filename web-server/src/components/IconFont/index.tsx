import {createFromIconfontCN} from '@ant-design/icons';

const scriptUrl = [
  // icon图标
  '//at.alicdn.com/t/c/font_4191363_wm9dt2ymet.js',
  // adms图标
  '//at.alicdn.com/t/c/font_2520675_v56kpikcmzo.js',
  // 阿里云
  '//at.alicdn.com/t/font_2520623_kwsjnuuvwxb.js',
  // 阿里巴巴国际
  '//at.alicdn.com/t/font_2520590_6bo7guarcv8.js',
  // ant-design官方
  '//at.alicdn.com/t/font_2520583_8orlhu9pbp.js',
];

const IconFont = createFromIconfontCN({
  scriptUrl,
});

export default IconFont;
