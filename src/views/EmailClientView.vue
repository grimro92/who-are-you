<template>
  <v-app>
    <v-main>
      <v-container fluid class="fill-height">
        <v-row no-gutters class="fill-height">
          <v-col cols="12" md="4" class="fill-height" style="border-right: 1px solid #eee;">
            <v-toolbar density="compact" title="受信トレイ"></v-toolbar>
            <v-list dense>
              <v-list-item
                v-for="email in availableEmails"
                :key="email.id"
                :active="selectedEmailId === email.id"
                @click="selectEmail(email.id)"
                :title="email.subject"
                :subtitle="email.from"
                lines="two"
                :base-color="email.isRead ? 'grey' : undefined"
              ></v-list-item>
              <v-list-item v-if="availableEmails.length === 0">
                 <v-list-item-title>受信トレイにメールはありません</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-col>

          <v-col cols="12" md="8" class="fill-height d-flex flex-column">
            <v-toolbar density="compact">
               <v-toolbar-title>{{ selectedEmail ? selectedEmail.subject : 'メールを選択' }}</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon @click="gameStore.navigate('/')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>
            </v-toolbar>
            <div class="pa-4 flex-grow-1" style="overflow-y: auto;">
              <div v-if="selectedEmail">
                <p><strong>From:</strong> {{ selectedEmail.from }}</p>
                <p><strong>To:</strong> me</p>
                <p><strong>Subject:</strong> {{ selectedEmail.subject }}</p>
                <v-divider class="my-4"></v-divider>
                <pre style="white-space: pre-wrap; word-wrap: break-word;">{{ selectedEmail.body }}</pre>
                 <div v-if="selectedEmail.id === 'passwordReset' && !gameStore.discoveredName">
                     <v-btn small @click="gameStore.viewEmail('passwordReset')" class="mt-4">
                          このメールを確認した
                      </v-btn>
                 </div>
              </div>
              <div v-else class="text-center text-grey">
                 <p>表示するメールを選択してください。</p>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useGameStore } from '@/stores/game';

const gameStore = useGameStore();
const selectedEmailId = ref<string | null>(null);

// ゲーム状態に基づいて表示可能なメールをフィルタリング
const availableEmails = computed(() => {
    // ここでゲームの進行度に応じて表示するメールを制御
    const emails = [];
    if (gameStore.simulatedData.emails.passwordReset.isAvailable) {
        emails.push(gameStore.simulatedData.emails.passwordReset);
    }
    // TODO: 他のメールも進行度に応じてここに追加
     return emails; // 並び替えが必要なら .sort() を追加
});

const selectedEmail = computed(() => {
  if (!selectedEmailId.value) return null;
  // 利用可能なメールの中から選択されたメールを探す
  return availableEmails.value.find(email => email.id === selectedEmailId.value) || null;
});

const selectEmail = (id: string) => {
  selectedEmailId.value = id;
  // メールを選択したらPiniaアクションを呼んで「読んだ」状態にするなどの処理を検討
  // gameStore.markEmailAsRead(id); // PiniaストアにmarkEmailAsReadアクションを追加
   // もしメールを開いた時点で名前発見のトリガーとしたいならここで呼ぶ
    if (id === 'passwordReset' && !gameStore.discoveredName) {
         gameStore.viewEmail('passwordReset'); // パスワードリセットメールを開いたことを通知
    }
};

onMounted(() => {
    // メールクライアントが開かれた時の状態処理
    // TODO: ここでメールクライアントを開いたという進行度を Pinia に記録しても良い
});

</script>

<style scoped>
.fill-height {
  min-height: 100%;
  height: 100%; /* v-row, v-col で高さを埋めるために必要 */
}
</style>