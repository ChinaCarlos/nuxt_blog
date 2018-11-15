module.exports = {
  dbs: 'mongodb://127.0.0.1:27017/blog',
  redis: {
    get host() {
      return '127.0.0.1';
    },
    get port() {
      return 6379;
    }
  },
  smtp: {
    get host() {
      return 'smtp.qq.coom';
    },
    get user() {
      return '1302151931@qq.com';
    },
    get pass() {
      return 'xxxxxxx';
    },
    get code() {
      return () => {
        return Math.random()
          .toString(16)
          .slice(2, 6)
          .toUpperCase();
      };
    },
    get expire() {
      return () => {
        return new Date().getTime() + 60 * 60 * 1000;
      };
    }
  }
};
