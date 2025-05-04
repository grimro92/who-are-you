<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>ヒント</h1>
        <p>自分が誰か分からない時は、Googleなどのサービスで<br>
          **アカウント情報**を確認してみましょう。</p>
        <p>検索画面の右上にあるアカウントアイコンをクリックしてみてください。</p>
        <div class="mt-8">
          <v-btn @click="gameStore.navigate('/')">検索画面に戻る</v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { onMounted } from 'vue';

const gameStore = useGameStore();

onMounted(() => {
  // ヒントページを見た時の進行度更新
  gameStore.viewedHintPage('account'); // 'account' はアカウント確認を促すヒントであるというマーカー
});
</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>