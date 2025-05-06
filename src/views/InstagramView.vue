<template>
  <v-app>
    <!-- ヘッダー -->
    <v-app-bar app color="white" flat>
      <v-toolbar-title class="text-h5 font-weight-bold">
        <!-- Instagram風のロゴ -->
        <span class="instagram-logo-text"> <!-- クラス名を instagram-logo-text に変更 -->
          <span class="ig-letter-1">I</span> <!-- クラス名 Ig-letter-X に変更 -->
          <span class="ig-letter-2">n</span>
          <span class="ig-letter-3">s</span>
          <span class="ig-letter-4">t</span>
          <span class="ig-letter-5">a</span>
          <span class="ig-letter-6">g</span>
          <span class="ig-letter-7">r</span>
          <span class="ig-letter-8">a</span>
          <span class="ig-letter-9">m</span>
        </span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- アカウントアイコン -->
      <v-avatar color="blue-lighten-2" size="32">
        <span class="white--text text-h6">{{ gameStore.discoveredName?.charAt(0) || '?' }}</span>
      </v-avatar>
    </v-app-bar>

    <!-- メインコンテンツ -->
    <v-container class="mt-4 mx-auto instagram-container">
      <!-- プロフィール情報 -->
      <div class="d-flex align-center mb-4">
        <!-- アバター画像 -->
        <v-avatar size="96" class="mr-4">
          <img :src="logo" alt="User Avatar" class="logo-image" />
        </v-avatar>
        <div>
          <!-- アカウント名 -->
          <h2 class="text-h6 font-weight-bold">{{ gameStore.discoveredName }}</h2>
          <!-- 投稿数 -->
          <p class="text-caption text-grey">投稿 {{ posts.length }}件</p>
          <!-- 自己紹介文 -->
          <p class="text-caption">「人生は冒険だ」</p>
        </div>
      </div>

      <!-- 投稿写真グリッド -->
      <v-row>
        <!-- 各投稿をループ -->
        <v-col cols="12" sm="6" md="4" v-for="post in posts" :key="post.id">
          <!-- 写真をクリック可能にし、ダイアログを開くメソッドを呼び出す -->
          <div class="post-image-wrapper" @click="openPostDialog(post.id)">
            <img :src="post.image" :alt="'Post Image ' + post.id" class="post-image" />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <!-- === 投稿詳細を表示するモーダルダイアログ === -->
    <!-- v-model でダイアログの表示/非表示を制御 -->
    <!-- max-width でダイアログの最大幅を設定 -->
    <v-dialog v-model="isDialogVisible" max-width="900">
      <v-card>
        <!-- ダイアログの内容 -->
        <v-card-text class="pa-0"> <!-- パディングを0にして画像と説明を端に寄せる -->
          <v-row no-gutters> <!-- 行の左右の余白をなくす -->
            <!-- 左側: 写真 (大きい領域) -->
            <v-col cols="12" md="8">
              <!-- selectedPost が存在する場合のみ画像を表示 -->
              <img v-if="selectedPost" :src="selectedPost.image" :alt="'拡大された写真 ' + selectedPost.id"
                class="dialog-post-image" />
            </v-col>

            <!-- 右側: 説明、情報、コメント (小さい領域) -->
            <v-col cols="12" md="4" class="dialog-details-col pa-4 d-flex flex-column">
              <!-- アカウント情報（ヘッダーの模倣） -->
              <div class="d-flex align-center mb-4">
                <v-avatar color="blue-lighten-2" size="28" class="mr-2">
                  <span class="white--text text-caption">{{ gameStore.discoveredName?.charAt(0) || '?' }}</span>
                </v-avatar>
                <span class="font-weight-bold">{{ gameStore.discoveredName }}</span>
              </div>
              <v-divider></v-divider>

              <!-- 投稿の説明 -->
              <!-- selectedPost が存在する場合のみ表示 -->
              <div v-if="selectedPost" class="my-4">
                <p class="text-caption font-weight-bold mb-1">{{ gameStore.discoveredName }}</p> <!-- 投稿者名 (仮) -->
                <p class="text-caption">{{ selectedPost.description }}</p>
                <!-- TODO: 投稿日時などもここに追加 -->
              </div>
              <v-divider></v-divider>


              <!-- コメントリスト -->
              <div class="comments dialog-comments-section flex-grow-1 overflow-y-auto">
                <!-- 高さを自動調整し、コメントが多い場合はスクロール -->
                <!-- selectedPost?.comments が undefined/null の場合に備え、空配列 [] をデフォルトにする -->
                <div v-for="(comment, index) in selectedPost?.comments || []" :key="index" class="mb-2 text-caption">
                  <span class="font-weight-bold mr-1">{{ comment.user }}</span> <!-- コメントユーザー名 -->
                  <span>{{ comment.text }}</span> <!-- コメント本文 -->
                </div>
                <div v-if="selectedPost?.comments.length === 0" class="text-caption text-grey">コメントはありません。</div>

              </div>
              <v-divider></v-divider>

              <!-- TODO: 「いいね」ボタンやコメント入力欄 -->
              <div class="mt-2">
                <!-- 例: コメント入力フィールド -->
                <!-- <v-text-field density="compact" label="コメントを追加..." variant="underlined"></v-text-field> -->
              </div>

            </v-col>
          </v-row>
        </v-card-text>

        <!-- 閉じるボタン -->
        <!-- ダイアログの外側や、右上などに配置 -->
        <v-btn icon fab small @click="closePostDialog" class="close-dialog-button">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>
    </v-dialog>
    <!-- =============================== -->

  </v-app>
</template>

<script setup lang="ts">
import { useGameStore } from '@/stores/game';
import { ref, onMounted } from 'vue';
// useRouter はこの画面からの遷移は不要になるため、コメントアウトまたは削除
// import { useRouter } from 'vue-router';

// === 注意 ===
// 投稿データ (posts 配列) は、本来 Pinia ストアで一元管理する方が望ましいです。
// 今回は v-dialog 化のために、元のコードに合わせて InstagramView 内に保持しています。
// 今後、他の画面やストアから投稿データを参照する場合は、Pinia への移動を検討してください。

// 画像アセットのインポート
import logo from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_logo.jpg';
import post1Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2025年5月5日 22_08.png';
import post2Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2025年5月5日 14_25.png';
import post3Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2025年5月4日 20_24.png';
import post4Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2025年4月20日 19_15.png';
import post5Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2024年8月1日 12_47.png';
import post6Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2024年7月21日 19_53.png';
import post7Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2024年6月12日 14_43.png';
import post8Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2024年10月9日 19_34.png';
import post9Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2024年12月25日 21_00.png';
import post10Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2024年12月25日 23_32.png';


const gameStore = useGameStore();
// useRouter はこの画面からの遷移は不要になるため、コメントアウトまたは削除
// const router = useRouter();


// 投稿データの型
// === 修正: 投稿データに詳細情報とコメントを追加 ===
interface Post {
  id: number;
  image: string;
  // === 追加 ===
  date: string; // 投稿日時など
  description: string; // 説明文
  location?: string; // 位置情報 (オプション)
  tags?: string[]; // ハッシュタグ (オプション)
  comments: { user: string; text: string; date?: string; }[]; // コメントリスト (ユーザー名と本文)
}

// 投稿データ (ローカルの状態)
// === 修正: 各投稿データに詳細情報を追加 ===
const posts = ref<Post[]>([ // 配列の型を指定
  {
    id: 1, image: post1Img,
    date: '2025年5月5日 22:08',
    description: '今日の夕焼け、最高だった！感動したなー。',
    tags: ['夕焼け', '空', '感動'],
    comments: [
      { user: 'Rika', text: 'わー、ほんときれい！😊', date: '2025年5月5日 22:15' }, // Rika のコメント例
      { user: '友達A', text: 'ナイスショット！', date: '2025年5月5日 22:30' },
    ]
  },
  {
    id: 2, image: post2Img,
    date: '2025年5月5日 14:25',
    description: 'ちょっと海までリラックスしに来た。波の音聞いてると落ち着く。',
    tags: ['海', 'リラックス', '現実逃避'],
    comments: [
      { user: '友達B', text: 'いいなぁ！楽しんで！', date: '2025年5月5日 15:00' },
    ]
  },
  {
    id: 3, image: post3Img,
    date: '2025年5月4日 20:24',
    description: '久々の登山。頂上からの景色は何度見ても最高！',
    tags: ['登山', '絶景', '達成感'],
    comments: []
  },
  {
    id: 4, image: post4Img,
    date: '2025年4月20日 19:15',
    description: 'たまには街の夜景も良いね。人も多いけど活気がある感じ。',
    tags: ['夜景', '都市', '散歩'],
    comments: [
      { user: '友達C', text: '都会の夜景も魅力的だよね。', date: '2025年4月20日 20:00' },
    ]
  },
  {
    id: 5, image: post5Img,
    date: '2024年8月1日 12:47',
    description: 'ちょっと一息☕️ 雰囲気良いカフェ見つけた。',
    tags: ['カフェ', 'コーヒーブレイク'],
    comments: []
  },
  {
    id: 6, image: post6Img,
    date: '2024年7月21日 19:53',
    description: '週末はBBQ！🍖 友達とワイワイ楽しかった！',
    tags: ['BBQ', '週末', '楽しい'],
    comments: []
  },
  {
    id: 7, image: post7Img,
    date: '2024年6月12日 14:43',
    description: '新しいスニーカーお気に入り！👟',
    tags: ['スニーカー', 'ファッション'],
    comments: []
  },
  {
    id: 8, image: post8Img,
    date: '2024年10月9日 19:34',
    description: '家の近くの公園も、夜は雰囲気が変わるな。#散歩',
    tags: ['散歩', '公園', '夜'],
    comments: [
      { user: 'Rika', text: '〇〇公園かな？前一緒に行ったね！', date: '2024年10月9日 20:00' }, // Rika のコメント例
    ]
  },
  {
    id: 9, image: post9Img,
    date: '2024年12月25日 21:00',
    description: 'メリークリスマス🎄✨ 素敵な夜を過ごしてます。',
    tags: ['クリスマス', '冬'],
    comments: [
      { user: 'Rika', text: 'メリークリスマス！一緒にいれて幸せ💕', date: '2024年12月25日 21:05' }, // Rika のコメント例 (ゲームネタバレにつながる重要情報)
    ]
  },
  {
    id: 10, image: post10Img,
    date: '2024年12月25日 23:32',
    description: 'クリスマスの飾り付け、頑張った甲斐あったな。暖かみのある雰囲気がお気に入り。#クリスマスインテリア',
    tags: ['クリスマスインテリア', '部屋'],
    comments: []
  },
]);


// === ダイアログ関連の状態とメソッド ===
const isDialogVisible = ref(false); // ダイアログの表示状態
const selectedPost = ref<Post | null>(null); // ダイアログに表示する投稿データ

// 投稿サムネイルをクリックした時の処理 (ダイアログを開く)
const openPostDialog = (postId: number): void => {
  // クリックされた投稿のデータを posts 配列から検索
  const postToDisplay = posts.value.find(p => p.id === postId);

  if (postToDisplay) {
    selectedPost.value = postToDisplay; // 見つかった投稿データを selectedPost にセット
    isDialogVisible.value = true; // ダイアログを表示状態にする
    console.log(`Opened dialog for post ID: ${postId}`, selectedPost.value); // デバッグ用
  } else {
    console.warn(`Post with ID ${postId} not found.`);
    // 投稿が見つからなかった場合のエラーハンドリング (例: メッセージ表示)
  }
};

// ダイアログを閉じる処理
const closePostDialog = (): void => {
  isDialogVisible.value = false; // ダイアログを非表示状態にする
  // ダイアログが完全に閉じた後にデータをクリアする
  // v-dialog の @update:model-value イベントを使うとより確実だが、簡単のためここで。
  // selectedPost.value = null; // ここでクリアしても良いが、閉じるアニメーション中はデータがあった方が自然な場合も
};
// ダイアログが閉じ終わった後に selectedPost をクリアするためのウォッチャー
// v-dialog の @after-leave イベントなどでも可能ですが、Watcher も一般的です
// watch(isDialogVisible, (newValue) => {
//     if (!newValue) {
//         // ダイアログが非表示になったらデータをクリア
//         selectedPost.value = null;
//     }
// });
// ====================================


onMounted((): void => {
  // ページ遷移時に田中祐輔のアカウントでログインしていることを設定 (ゲームロジックによる)
  // これは Pinia ストアのログイン機能で設定されるべきデータです。
  // 現在のゲームフローに合わせて、まだ Pinia で設定されていない場合にここで設定しておきますが、
  // 最終的には AccountLoginView や Pinia ストアのログイン成功時に設定されるようにしてください。
  if (!gameStore.discoveredName) {
    // Piniaストアにご自身の名前を設定するアクションを呼ぶ方が望ましい
    // gameStore.discoverName('田中祐輔'); // Piniaアクションを呼ぶ例
    gameStore.discoveredName = '田中祐輔'; // ストレートに設定（簡易版）
  }
  console.log('InstagramView mounted. Discovered Name:', gameStore.discoveredName); // デバッグ用
});

// InstagramDetail.vue で使っていた useRouter や navigateToPost メソッドは不要になります

</script>

<style scoped>
/* v-app-bar のタイトルに flexbox を適用して文字を横並びに */
.v-toolbar-title.text-h5 {
  display: flex;
  align-items: center;
  /* Google風の文字色スタイル (HomeViewから流用) */
  font-weight: bold;
  /* 強調 */
  font-size: 24px !important;
  /* サイズ調整 */
  padding-left: 0 !important;
  /* v-toolbar-title のデフォルトパディングをリセット */
}

/* Instagram風のロゴ文字色のスタイル */
/* Instagram のグラデーションカラーはCSSでは複雑なので、単色でそれっぽく */
/* 色はGoogle風のままでも良いですが、Instagramらしい色に近づけてみます */
.instagram-logo-text span {
  /* 各文字に色を指定 */
}

.instagram-logo-text span.ig-letter-1 {
  color: #833AB4;
  /* 紫 */
}

/* I */
.instagram-logo-text span.ig-letter-2 {
  color: #E1306C;
  /* 赤紫 */
}

/* n */
.instagram-logo-text span.ig-letter-3 {
  color: #F77737;
  /* オレンジ */
}

/* s */
.instagram-logo-text span.ig-letter-4 {
  color: #FCAF45;
  /* 黄オレンジ */
}

/* t */
.instagram-logo-text span.ig-letter-5 {
  color: #FFDC80;
  /* 薄黄 */
}

/* a */
.instagram-logo-text span.ig-letter-6 {
  color: #833AB4;
  /* 紫 */
}

/* g */
.instagram-logo-text span.ig-letter-7 {
  color: #E1306C;
  /* 赤紫 */
}

/* r */
.instagram-logo-text span.ig-letter-8 {
  color: #F77737;
  /* オレンジ */
}

/* a */
.instagram-logo-text span.ig-letter-9 {
  color: #833AB4;
  /* 紫 */
}

/* m */


.instagram-container {
  max-width: 900px;
  /* コンテンツの最大幅を制限 */
  padding: 0 16px;
  /* 両端に余白を追加 */
  /* v-app-bar の高さによって上部のマージンを調整 */
}

.logo-image {
  width: 96px;
  height: 96px;
  object-fit: cover;
  border-radius: 50%;
}

.post-image-wrapper {
  position: relative;
  width: 100%;
  padding-top: 100%;
  /* 正方形 */
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  background-color: #eee;
  transition: transform 0.2s ease-in-out;
  /* ホバーアニメーション */
}

.post-image-wrapper:hover {
  transform: scale(1.05);
  /* ホバーで少し拡大 */
}

.post-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


/* === ダイアログ内のスタイル === */
/* ダイアログ全体のカードにスタイルを適用 */
.v-card {
  border-radius: 12px;
  /* ダイアログの角丸 */
  overflow: hidden;
  /* 角丸に合わせて内容をクリップ */
}

.dialog-post-image {
  width: 100%;
  /* 親要素 (v-col) の幅に合わせる */
  height: auto;
  /* アスペクト比を維持 */
  max-height: 80vh;
  /* ビューポートの高さに対する最大高さを設定 */
  object-fit: contain;
  /* 要素内に収まるように画像を拡大縮小 */
  /* 必要であれば border-radius は v-card で設定済み */
}

.dialog-details-col {
  /* 右側の詳細カラムのスタイル */
  /* padding は v-card-text で設定済み (pa-4) */
  display: flex;
  flex-direction: column;
  max-height: 80vh;
  /* 画像の最大高さに合わせる */
  /* コメントリストエリアに overflow-y: auto を適用 */
}

/* アカウント情報（ダイアログヘッダー部分） */
.dialog-details-col .d-flex.align-center.mb-4 {
  flex-shrink: 0;
  /* ヘッダー部分は縮小しない */
}

/* 投稿の説明エリア */
.dialog-details-col .my-4 {
  flex-shrink: 0;
  /* 縮小しない */
}


/* コメントリストエリア */
.dialog-comments-section {
  flex-grow: 1;
  /* 親 (.dialog-details-col) の残りの高さを埋める */
  overflow-y: auto;
  /* コメントが多い場合にスクロールを有効にする */
  /* padding-right: 16px; */
  /* スクロールバーとテキストが重ならないように右側にパディング */
  margin-bottom: 8px;
  /* コメントエリアと下部要素の間隔 */
}

/* 閉じるボタン */
.close-dialog-button {
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
  background-color: rgba(255, 255, 255, 0.8);
  /* 必要であれば色など調整 */
}

/* コメントリストのスタイルは既存の .comments ul/li を流用または調整 */
.comments ul {
  list-style: none;
  padding: 0;
}

.comments li {
  margin-bottom: 8px;
  font-size: 14px;
  word-break: break-word;
}

/* コメントのユーザー名と本文のスタイル */
.comments li span {
  /* font-weight: bold; */
  /* ユーザー名は太字に */
}
</style>