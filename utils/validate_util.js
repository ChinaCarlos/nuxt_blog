/**
 *判断邮箱是否合法
 * @param {String} email
 * @returns {Boolean}
 */
export function isEmail(email) {
  const emailRegExp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return emailRegExp.test(email);
}
