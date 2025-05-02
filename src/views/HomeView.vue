<template>
  <v-app>
    <v-main>
      <v-container fluid class="pa-4">
        <v-row justify="end" align="center">
          <v-btn variant="text" class="text-none">Gmail</v-btn>
          <v-btn variant="text" class="text-none ml-2">Images</v-btn>

          <v-btn icon variant="text" class="ml-2">
             <v-icon>mdi-apps</v-icon>
          </v-btn>
           <v-avatar class="ml-2" color="blue-lighten-2" size="32" @click="gameStore.attemptAccountAccess()">
              <span class="white--text text-h6">{{ gameStore.discoveredName ? gameStore.discoveredName.charAt(0) : '?' }}</span>
          </v-avatar>

        </v-row>
      </v-container>

      <v-container fluid class="fill-height d-flex align-center justify-center">
        <v-col cols="12" sm="10" md="8" lg="6" class="text-center">
          <div class="text-center mb-8">
               <h1 v-if="!gameStore.discoveredName" class="text-h4 text-sm-h3 text-md-h2 font-weight-light">
                 あなたは誰
               </h1>
               <h1 v-else class="text-h4 text-sm-h3 text-md-h2 font-weight-light">
                 {{ gameStore.discoveredName }} としてログイン中
               </h1>
              </div>


          <v-form @submit.prevent="gameStore.handleSearch(search)">
            <v-text-field
              v-model="search"
              label="検索"
              variant="outlined"
              hide-details
              density="comfortable"
              append-inner-icon="mdi-magnify"
              clearable
              class="google-search-field"
              @click:append-inner="gameStore.handleSearch(search)"
            />
          </v-form>

          <div class="mt-6">
            <v-btn class="mx-2 text-none" color="grey-lighten-3" elevation="0" @click="gameStore.handleSearch(search)">
              Google検索
            </v-btn>
            <v-btn class="mx-2 text-none" color="grey-lighten-3" elevation="0" @click="gameStore.handleSearch('I\'m Feeling Lucky')">
              I'm Feeling Lucky
            </v-btn>
          </div>
        </v-col>
      </v-container>

      <v-container fluid class="pa-4 text-caption text-center">
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

// コンポーネントマウント時にゲーム状態を初期化（開発中はホットリロードでリセットされない可能性あり）
onMounted(() => {
  // ゲーム開始時に一度だけ呼び出すように制御が必要かも
  // 例えば、ローカルストレージにゲーム開始フラグを持たせるなど
  if (gameStore.currentChapter === 0) { // 仮に初期状態を0としておくか、別の方法で制御
     gameStore.initGame();
  }
});

</script>

<style scoped>
.fill-height {
  min-height: 100%; /* 親要素 (v-main) の高さに対して100% */
}

.google-search-field {
  max-width: 584px;
  margin: 0 auto;
  border-radius: 24px;
  overflow: hidden;
}

.google-search-field .v-input__control {
    border-radius: 24px;
    overflow: hidden;
}

.google-search-field .v-input__outline {
    border-color: #dadce0 !important;
}

.google-search-field .v-input__control:focus-within {
    box-shadow: 0 1px 6px rgba(32,33,36,.28);
    border-color: transparent !important;
}

.google-search-field .v-icon {
    color: #9aa0a6 !important;
}
</style>