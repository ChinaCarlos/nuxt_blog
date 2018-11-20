import Vue from 'vue';
import VueLazyload from 'vue-lazyload';

Vue.use(VueLazyload, {
  // 图片懒加载配置
  preLoad: 1.3,
  error:
    'http://wanzao2.b0.upaiyun.com/14758515678631475754541_400x400.gif-460.gif',
  loading:
    'http://wanzao2.b0.upaiyun.com/14758515678631475754541_400x400.gif-460.gif',
  attempt: 1
});
