// 保存用户信息
export default {
  state() {
    return {
      userInfo: {
        id: '',
        name: '',
        email: '',
        avatar: '',
        role: ''
      },
      token: ''
    };
  },
  getters: {
    userInfo: state => {
      return state.userInfo;
    },
    token: state => {
      return state.token;
    }
  },
  mutations: {
    changeUserInfo: (state, payload) => {
      state.userInfo = payload;
    },
    changeToken: (state, payload) => {
      state.token = payload.token;
    }
  },
  actions: {
    changeUserInfo: (context, payload) => {
      context.commit('changeUserInfo', payload);
    },
    changeToken: (context, payload) => {
      context.commit('changeToken', payload);
    }
  }
};
