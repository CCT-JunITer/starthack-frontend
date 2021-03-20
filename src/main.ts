import Vue from 'vue';
import { Icon } from 'leaflet';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';
import 'leaflet/dist/leaflet.css';

type D = Icon.Default & {
  _getIconUrl?: string;
};

Vue.config.productionTip = false;

/* eslint-disable-next-line */
delete (Icon.Default.prototype as D)._getIconUrl;
Icon.Default.mergeOptions({
  /* eslint-disable-next-line */
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  /* eslint-disable-next-line */
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  /* eslint-disable-next-line */
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
