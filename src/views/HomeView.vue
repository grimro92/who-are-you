<template>
  <main>
    <v-container>
      <v-row>
        <v-col>
          <h1>ホームビュー (Vuetifyテスト)</h1>
          <p>Vuetify が正しく表示されるか確認してください。</p>
          <v-btn color="primary" class="mt-4">
            Vuetify ボタン
          </v-btn>
          <v-btn to="/about" class="mt-4 ml-4">
            About ページへ
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script setup lang="ts">
// デフォルトの HomeView.vue にあった不要なインポートやコードは削除してシンプルにしています
</script>