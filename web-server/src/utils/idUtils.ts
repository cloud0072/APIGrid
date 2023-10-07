// 没有 i o w q 合计32个字符
export const GENERATE_ID_ARRAY = '1234567890abcdefghjklmnprstuvxyz'.split('');

export const getNewId = (prefix: string, length = 8) => {
  let builder: string[] = []
  for (let i = 0; i < length; i++) {
    const seq = Math.floor(Math.random() * GENERATE_ID_ARRAY.length);
    builder.push(GENERATE_ID_ARRAY[seq]);
  }
  return `${prefix}${builder.join('')}`;
}
