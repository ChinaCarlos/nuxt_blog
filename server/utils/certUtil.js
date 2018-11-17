const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const secret = 'nuxt_blog';
/**
 * @param password {String} 原始密码
 * @param salt {String} 加盐
 * @return 加密密码
 */
function cryptoPassword(password, salt) {
  const newPwdStr = password.toString() + salt.toString();
  const md5 = crypto.createHash('md5');
  return md5.update(newPwdStr).digest('hex');
}
/**
 * @param data {String} 生成token的数据
 * @returns token 生成的token (默认是有效期为1h)
 */

function getToken(data) {
  let token = '';
  if (!data) {
    console.log('生成token失败！');
    return false;
  }
  try {
    token = jwt.sign(
      {
        data: data.toString()
      },
      secret,
      { expiresIn: '1h' }
    );
  } catch (e) {
    console.log('生成token 失败！' + error);
  }
  return token;
}

function getRandomCode() {
  return Math.random()
    .toString(16)
    .slice(2, 6)
    .toUpperCase();
}

module.exports = {
  cryptoPassword,
  getToken,
  getRandomCode
};
