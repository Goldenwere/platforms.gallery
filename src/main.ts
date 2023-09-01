import { createApp } from 'vue';
import { createPinia } from 'pinia';
import 'normalize.css';

import 'src/styles/themes/base.scss';
import 'src/styles/themes/light.scss';
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
