import SparkMD5 from 'spark-md5';

export const getFileMd5 = (file: any) => {
  const fileReader = new FileReader();
  const spark = new SparkMD5.ArrayBuffer();
  return new Promise(resolve => {
    fileReader.onload = (event) => {
      spark.append(event.target?.result as any);
      const md5 = spark.end();
      resolve(md5)
    }
    fileReader.readAsArrayBuffer(file);
  })

}

export const isImage = (mimeType: string) => {
  return true
}

export const toUrl = (token: string | undefined) => {
  return token ? 'http://192.168.4.198:9000/assets/' + token : '';
}

export const DefaultImage = ''
