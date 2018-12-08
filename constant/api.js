/**
 * 所有请求接口
 */
const ONLINE_HOST = 'http://116.85.35.63:3000';
const LOCAL_HOST = 'http://localhost:3000';
const HOST = LOCAL_HOST;
export const USER_SIGN_UP = HOST + '/public/users/signUp'; // 注册
export const USER_SEND_VERIFY_CODE = HOST + '/public/users/sendCode'; // 发送邮箱验证码
export const USER_SIGN_IN = HOST + '/public/users/signIn'; // 用户登录

// 文章类型接口
export const CATEGORY_LIST = HOST + `/api/v8/category/list`;
export const CATEGORY_ADD = HOST + `/api/v8/category/add`;
export const CATEGORY_UPDATE = HOST + `/api/v8/category/update`;
export const CATEGORY_DELETE = HOST + `/api/v8/category/delete`;

// 文章标签
export const TAG_LIST = HOST + `/api/v8/tag/list`;
export const TAG_ADD = HOST + `/api/v8/tag/add`;
export const TAG_UPDATE = HOST + `/api/v8/tag/update`;
export const TAG_DELETE = HOST + `/api/v8/tag/delete`;

// 文章接口
export const ARTICLE_LIST = HOST + `/api/v8/article/list`;
export const ARTICLE_ADD = HOST + `/api/v8/article/add`;
export const ARTICLE_UPDATE = HOST + `/api/v8/article/update`;
export const ARTICLE_DELETE = HOST + `/api/v8/article/delete`;

// 评论接口
export const COMMENT_LIST = HOST + `/api/v8/comment/list`;
export const COMMENT_ADD = HOST + `/api/v8/comment/add`;
export const COMMENT_UPDATE = HOST + `/api/v8/comment/update`;
export const COMMENT_DELETE = HOST + `/api/v8/comment/delete`;

// 公共接口
export const GET_INDEX_CATEGORY_LIST = HOST + `/api/public/index/category`;
export const GET_INDEX_ARTICLE_LIST = HOST + `/api/public/index/articles`;
