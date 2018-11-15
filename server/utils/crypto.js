const crypto = require('crypto');

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

module.exports = {
  cryptoPassword
};
