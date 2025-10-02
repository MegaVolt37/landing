// @ts-nocheck
import './assets/styles/main.scss'

import { createApp } from 'vue'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import PreventWidow from './directives/v-prevent-widow';
import VueDOMPurifyHTML from 'vue-dompurify-html';
import VueTheMask from 'vue-the-mask'

import App from './App.vue'

const KEY_MAP = import.meta.env.VITE_BASE_URL;

const app = createApp(App)

app.use(VueGoogleMaps, {
  load: {
    v: "weekly",
    key: 'AIzaSyDmwm9ooYjzU7LZpg0PDBRPst82KOR0NCQ',
  },
})
app.use(VueDOMPurifyHTML);
app.use(VueTheMask)

app.directive('prevent-widow', PreventWidow);

app.mount('#app')