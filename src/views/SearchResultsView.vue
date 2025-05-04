<template>
  <v-app>
    <v-main>
      <v-container>
        <h1>検索結果</h1>
        <p class="text-caption text-grey">
          「{{ $route.query.q }}」の検索結果 - 約 {{ gameStore.simulatedData.searchResults.length }} 件
        </p>

        <v-list>
          <v-list-item v-for="result in gameStore.simulatedData.searchResults" 
            :key="result.id"
            :to="result.url !== '#' ? result.url : undefined"
            @click="result.url === '#' ? handleGenericClick(result.id) : null" 
            :link="result.url !== '#'">
            <v-list-item-title class="text-h6 text-blue-darken-2">{{ result.title }}</v-list-item-title>
            <v-list-item-subtitle class="text-caption text-green-darken-2">{{ result.url }}</v-list-item-subtitle>
            <v-list-item-subtitle>{{ result.snippet }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>

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
  // 検索結果ページが表示されたら進行度を更新
  if (gameStore.currentChapter === 1 && gameStore.chapter1Progress === 'searchedWho') {
    gameStore.chapter1Progress = 'viewedResults';
    // ここで、検索結果の内容に基づいて、次のヒント（アカウント確認）への準備などをPiniaで行うことも可能
    // gameStore.generateSearchResults('generic'); // 別の検索に対する結果を準備しておくなど
  }
  // TODO: 他の進行度でこのページに来た場合の処理
});

// # へのリンクをクリックした時のダミーハンドラ
const handleGenericClick = (resultId: string) => {
  //console.log(`Clicked generic link: ${resultId}`);
  // TODO: ゲームによっては、#リンクをクリックしても何らかの反応（例: 「このページは見れないようだ」メッセージ）があっても良い
}

</script>

<style scoped>
/* 必要に応じてスタイルを追加 */
</style>