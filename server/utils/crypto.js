const crypto = require('crypto');
function crypotPwd(password, salt) {
  const saltOriginPwd = password + salt;
  console.log('原始密码%s', saltOriginPwd);
  const md5 = crypto.createHash('md5');
  const md5s = crypto.createHash('md5');
  let orignPassword = md5s.update(password).digest('hex');
  let newPwd = md5.update(saltOriginPwd).digest('hex');
  console.log('原始md5%s', orignPassword);
  console.log('加盐密码%s', newPwd);
}
// crypotPwd('133232', 'uooooxx');
const timeStamp = new Date().getTime().toString();
const md5 = crypto.createHash('md5');
const pwd = md5.update(timeStamp).digest('hex'); // useid
crypotPwd('1212122', pwd);
console.log(pwd);
