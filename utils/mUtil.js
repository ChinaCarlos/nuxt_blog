// 工具函数  GET 请求参数解析
function encodeSearchParams(obj) {
  const params = [];
  Object.keys(obj).forEach(key => {
    let value = obj[key];
    if (typeof value === 'undefined') {
      value = '';
    }
    params.push([key, encodeURIComponent(value)].join('='));
  });

  return params.join('&');
}
// 小写处理 用户比对数据
function toLowerCase(string = '') {
  return string.toLocaleLowerCase();
}
// 字符串去除前后空格
function trimStr(string = '') {
  return string.replace(/^\s*|\s*$/g, '');
}
// 判断是父字符串是否包含子字符串
function isIncludeStr(mainStr = '', shortStr = '') {
  return (
    toLowerCase(trimStr(mainStr)).indexOf(toLowerCase(trimStr(shortStr))) != -1
  );
}
// 生成随机的颜色
// 定义一个函数，实现随机生成十六进制颜色值
function getRadomColor() {
  // 定义字符串变量colorValue存放可以构成十六进制颜色值的值
  const colorValue = '0,1,2,3,4,5,6,7,8,9,a,b,c,d,e,f';
  // 以","为分隔符，将colorValue字符串分割为字符数组["0","1",...,"f"]
  const colorArray = colorValue.split(',');
  let color = '#'; // 定义一个存放十六进制颜色值的字符串变量，先将#存放进去
  // 使用for循环语句生成剩余的六位十六进制值
  for (let i = 0; i < 6; i++) {
    // colorArray[Math.floor(Math.random()*16)]随机取出
    // 由16个元素组成的colorArray的某一个值，然后将其加在color中，
    // 字符串相加后，得出的仍是字符串
    color += colorArray[Math.floor(Math.random() * 16)];
  }
  return color;
}
