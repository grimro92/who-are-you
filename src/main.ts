import 'vuetify/styles'; // Vuetify のスタイルシート
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components'; // Vuetify コンポーネントをまとめてインポート
import * as directives from 'vuetify/directives'; // Vuetify ディレクティブをまとめてインポート
import '@mdi/font/css/materialdesignicons.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'



const vuetify = createVuetify({
  components, // インポートしたコンポーネントを登録
  directives, // インポートしたディレクティブを登録
  // ここにテーマやデフォルト設定などのオプションを追加できます
  // 例: アイコンセットの指定
  icons: {
    defaultSet: 'mdi', // デフォルトのアイコンセットを Material Design Icons に設定
  },
});

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify);

app.mount('#app')
