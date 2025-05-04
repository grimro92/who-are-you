<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center">
        <v-card class="pa-8" max-width="400">
          <v-card-title class="text-h5 text-center">アカウントにログイン</v-card-title>
          <v-card-subtitle class="text-center mb-4">{{ gameStore.accountEmail }}</v-card-subtitle>
          <v-card-text>
            <v-text-field v-model="password" label="パスワード" type="password" variant="outlined" density="comfortable"
              hide-details class="mb-4" />
            <p v-if="errorMessage" class="text-caption text-red">{{ errorMessage }}</p>
          </v-card-text>
          <v-card-actions class="d-flex flex-column">
            <v-btn color="primary" block class="text-none mb-2" :disabled="!password" @click="handleLogin">
              ログイン
            </v-btn>
            <v-btn variant="text" color="blue-darken-2" class="text-none" @click="gameStore.requestPasswordReset()">
              パスワードを忘れた方はこちら
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { ref } from 'vue';

const gameStore = useGameStore();
const password = ref('');
const errorMessage = ref('');

// ログイン処理
const handleLogin = () => {
  if (password.value === gameStore.accountPassword) {
    // パスワードが正しい場合、アカウント情報画面に遷移
    errorMessage.value = '';
    gameStore.navigate('/account-info'); // アカウント情報画面に遷移
  } else {
    // パスワードが間違っている場合、エラーメッセージを表示
    errorMessage.value = 'パスワードが違います';
  }
};
</script>

<style scoped>
.fill-height {
  min-height: 100%;
}
</style>