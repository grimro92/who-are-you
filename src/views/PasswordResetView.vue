<template>
  <v-app>
    <v-main>
      <v-container class="fill-height d-flex align-center justify-center text-center">
        <div>
          <v-icon size="64" color="success">mdi-email-check-outline</v-icon>
          <h1 class="text-h5 mt-4">パスワードリセットメールを送信しました</h1>
          <p class="mt-2">アカウントに登録されたメールアドレス宛に、パスワードリセットの手順を記載したメールを送信しました。</p>
          <p>メールをご確認ください。</p>

          <div class="mt-8">
            <v-btn color="primary" class="text-none" @click="gameStore.openEmailClient()">
              メールを確認する
            </v-btn>
            <v-btn variant="text" class="ml-4 text-none" @click="gameStore.navigate('/')">
              検索画面に戻る
            </v-btn>
          </div>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
// onMounted はここでは必須ではない
// import { onMounted } from 'vue';

const gameStore = useGameStore();

// onMounted(() => {
//    console.log('PasswordResetView mounted');
// });
</script>

<style scoped>
.fill-height {
  min-height: 100%;
}
</style>