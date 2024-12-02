import { createApp } from 'vue'; // 正确引入 Vue 3 的 createApp 方法
import App from './App.vue';
import router from './router'; // 如果使用 Vue Router

createApp(App)
  .use(router) // 挂载路由（如果使用 Vue Router）
  .mount('#app'); // 挂载到页面的根节点
