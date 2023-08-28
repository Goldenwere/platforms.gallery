import { createApp } from 'vue';
import { createPinia } from 'pinia';

import './styles.css';
import Main from './main.vue';
import router from './router';

createApp(Main)
.use(router)
.use(createPinia())
.directive('focus', {
  mounted (el) {
    el.focus()
  },
})
.mount('#app');
