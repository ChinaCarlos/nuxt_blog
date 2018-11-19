/**
 * ================ NOTHING IS IMPOSSIBLE ==================
 * @author majian
 * 封装对游览器数据的操作
 * createdTime: 2018年11月19日 星期一 11时31分29秒 CST
 * ================《像我这样的人》-毛不易 =====================
 */

/**
 * 设置cookie
 * @param {Stirng} name
 * @param {String} value
 * @param {Date} expires
 * @param {String} domain
 * @param {String} path
 * @param {String} secure
 */
export function setCookie(name, value, expires, domain, path, secure) {
  let cookieText = '';
  cookieText += encodeURIComponent(name) + '=' + encodeURIComponent(value);
  if (expires instanceof Date) {
    cookieText += '; expires=' + expires.toGMTString();
  }
  if (path) {
    cookieText += '; path=' + path;
  }
  if (domain) {
    cookieText += '; domain=' + domain;
  }
  if (secure) {
    cookieText += '; secure';
  }
  document.cookie = cookieText;
}

/**
 * 取cookie值
 * @param {String} name
 */
export function getCookie(name) {
  let cookieName = encodeURIComponent(name) + '=',
    cookieStart = document.cookie.indexOf(cookieName),
    cookieValue = '';
  if (cookieStart > -1) {
    let cookieEnd = document.cookie.indexOf(';', cookieStart);
    if (cookieEnd == -1) {
      cookieEnd = document.cookie.length;
    }
    cookieValue = decodeURIComponent(
      document.cookie.substring(cookieStart + cookieName.length, cookieEnd)
    );
  }
  return cookieValue;
}

/**
 * 删除cookie
 * @param {String} name
 * @param {String} domain
 * @param {String} path
 * @param {String} secure
 */
export function deleteCookie(name, domain, path, secure) {
  document.set(name, '', Date(0), domain, path, secure);
}

/**
 * 设置本地存储
 * @param {Object} type 本地存储的类型 localStorage sessionStorage
 * @param {String} key key值
 * @param {String} value 设置的值
 */
export function setStorage(type, key, value) {
  try {
    type.setItem(key, value);
  } catch (error) {
    console.log('设置localStorage失败' + error);
  }
}
/**
 * 读取本地存储的值
 * @param {Object} type 本地存储的类型 localStorage sessionStorage
 * @param {String} key key值
 * @returns {String} 根据key取得值 null
 */
export function Storage(type, key) {
  return type.getItem(key);
}
