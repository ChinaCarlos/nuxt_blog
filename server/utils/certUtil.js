const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = 'nuxt_blog';
/**
 * @params password {String} 原始密码
 * @params salt {String} 加盐
 * @return {String} 加密密码
 */
function cryptoPassword(password, salt) {
  const newPwdStr = password.toString() + salt.toString();
  const md5 = crypto.createHash('md5');
  return md5.update(newPwdStr).digest('hex');
}
/**
 * @params data {String} 生成token的数据
 * @return token 生成的token (默认是有效期为1h)
 */

function getToken(data) {
  if (!data) {
    console.log('生成token失败！');
    return false;
  }
  try {
    const token = jwt.sign(
      {
        data: data.toString()
      },
      secret,
      { expiresIn: '1h' }
    );
    return token;
  } catch (e) {
    console.log('生成token 失败！' + error);
    return false;
  }
}

module.exports = {
  cryptoPassword,
  getToken
};
