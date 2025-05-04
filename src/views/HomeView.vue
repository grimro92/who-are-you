<template>
  <v-app>
    <v-main class="d-flex flex-column">
      <v-container fluid class="pa-4 flex-grow-0 flex-shrink-0">
        <v-row justify="end" align="center">
          <v-btn variant="text" class="text-none" @click="gameStore.openEmailClient()">Cmail</v-btn>
          <v-btn variant="text" class="text-none">画像</v-btn>
          <v-btn icon variant="text">
            <v-icon>mdi-apps</v-icon>
          </v-btn>
          <v-avatar class="ml-2" color="blue-lighten-2" size="32" @click="gameStore.attemptAccountAccess()">
            <span class="white--text text-h6">{{ gameStore.discoveredName ? gameStore.discoveredName.charAt(0) : '?' }}</span>
          </v-avatar>
        </v-row>
      </v-container>

      <v-container fluid class="flex-grow-1 d-flex align-center justify-center">
        <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
          <div class="text-center mb-8 google-logo">
            <h1 class="text-h4 text-sm-h3 text-md-h2 font-weight-bold">
              <span class="letter-1">C</span>
              <span class="letter-2">o</span>
              <span class="letter-3">o</span>
              <span class="letter-4">c</span>
              <span class="letter-5">l</span>
              <span class="letter-6">e</span>
            </h1>
            <!-- <h1 v-else class="text-h4 text-sm-h3 text-md-h2 font-weight-bold">
              {{ gameStore.discoveredName }} としてログイン中
            </h1> -->
          </div>
          <v-form @submit.prevent="gameStore.handleSearch(search)">
            <v-text-field v-model="search" label="検索" variant="outlined" hide-details density="comfortable"
              append-inner-icon="mdi-magnify" clearable class="google-search-field"
              @click:append-inner="gameStore.handleSearch(search)" />
          </v-form>

          <!-- <div class="mt-6">
            <v-btn class="mx-2 text-none" color="grey-lighten-3" elevation="0" @click="gameStore.handleSearch(search)">
              Google検索
            </v-btn>
            <v-btn class="mx-2 text-none" color="grey-lighten-3" elevation="0"
              @click="gameStore.handleSearch('I\'m Feeling Lucky')">
              I'm Feeling Lucky
            </v-btn>
          </div> -->
        </v-col>
      </v-container>

      <v-container fluid class="pa-4 text-caption text-center flex-grow-0 flex-shrink-0">
        <span>© 2025 あなたは誰</span>
      </v-container>

    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useGameStore } from '@/stores/game';

const search = ref('');
const gameStore = useGameStore();

onMounted(() => {
  if (gameStore.currentChapter === 1 && gameStore.chapter1Progress === 'start' && !gameStore.discoveredName) {
    gameStore.initGame();
  }
});
</script>

<style scoped>
/* Ensure parent containers take full height */
html,
body,
#app {
  height: 100%;
  margin: 0;
  overflow: hidden;
}

/* Vuetify のルート要素も高さを100%にする */
.v-application {
  height: 100%;
}

/* v-main を flex コンテナにし、ビューポートの高さを占める */
.v-main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.v-avatar {
  cursor: pointer; /* 通常時もポインターに */
}

.v-avatar:hover {
  opacity: 0.8; /* ホバー時に少し透明度を下げる（視覚的なフィードバック） */
}

/* === ここに文字色のスタイルを追加します === */
/* google-logo クラス内の h1 要素内の各 span 要素に色を適用 */
.google-logo h1 {
  /* h1 自体の文字色は初期値に戻すか、任意の色にする */
  /* これがないと、span の色が h1 の色に影響される場合があります */
  color: initial;
  /* または color: black; など */
}

.google-logo h1 span.letter-1 {
  color: #4285F4;
  /* Google Blue */
}

/* C */
.google-logo h1 span.letter-2 {
  color: #DB4437;
  /* Google Red */
}

/* o */
.google-logo h1 span.letter-3 {
  color: #F4B400;
  /* Google Yellow */
}

/* o */
.google-logo h1 span.letter-4 {
  color: #4285F4;
  /* Google Blue */
}

/* c */
.google-logo h1 span.letter-5 {
  color: #0F9D58;
  /* Google Green */
}

/* l */
.google-logo h1 span.letter-6 {
  color: #DB4437;
  /* Google Red */
}

/* e */
/* ====================================== */


/* Google search bar specific styles (from previous code) */
.google-search-field {
  max-width: 584px;
  margin: 0 auto;
  border-radius: 24px;
  /* overflow: hidden; */
  /* コメントアウトを維持 */
}

.google-search-field .v-input__control {
  border-radius: 24px;
  overflow: hidden;
  /* ここは維持 */
}

.google-search-field .v-input__outline {
  border-color: #dadce0 !important;
}

.google-search-field .v-input__control:focus-within {
  box-shadow: 0 1px 6px rgba(32, 33, 36, .28);
  border-color: transparent !important;
}

.google-search-field .v-icon {
  color: #9aa0a6 !important;
}
</style>