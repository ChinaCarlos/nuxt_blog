module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/blog',
  smtp: {
    host: 'smtp.qq.com', // 主机
    secure: true, // 使用 SSL
    port: 465, // SMTP 端口
    auth: {
      user: '1302151931@qq.com', // 账号
      pass: '' // 密码
    }
  },
  redis: {
    host: '127.0.0.1',
    port: 6379
  }
};
