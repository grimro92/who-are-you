<template>
  <v-app>
    <v-main>
      <v-container class="mt-4 mx-auto post-detail-container">
        <v-row>
          <v-col cols="12" md="8">
            <img v-if="post" :src="post.image" :alt="post.title" class="post-detail-image" />
            <div v-else>
              <p v-if="post === undefined">投稿データを読み込み中か、見つかりませんでした。</p>
            </div>
          </v-col>
          <v-col cols="12" md="4">
            <h2 class="text-h6 font-weight-bold">{{ post?.title }}</h2>
            <p class="text-caption">{{ post?.description }}</p>
            <div class="comments">
              <h4 class="text-h6 font-weight-bold">コメント</h4>
              <ul>
                <li v-for="(comment, index) in post?.comments || []" :key="index">
                  {{ comment }}
                </li>
              </ul>
            </div>
            <v-btn text @click="goBack">戻る</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// 投稿データの型を再定義（comments も含める）
interface Post {
  id: number;
  image: string;
  title: string;
  description: string;
  comments: string[]; // コメントは文字列の配列とする
}

// === 修正1: ref の型を明示的に指定 ===
// find の返り値が Post | undefined なので、ref は Post 型または undefined を保持できるようにする
const post = ref<Post | undefined>(undefined); // 初期値も undefined にするのが自然


// 投稿データ（仮のデータ - ※注意点後述）
// === 修正2: image パスをインポートした変数に変更 ===
// InstagramView でインポートした画像変数を使う場合
import post1Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2025年5月5日 22_08.png';
import post2Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2025年5月5日 14_25.png';
import post3Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2025年5月4日 20_24.png'; // 必要なら追加
import post4Img from '@/assets/instagram/yusuke-tanaka/YusukeTanaka_2025年4月20日 19_15.png'; // 必要なら追加

// 仮の投稿データを Post 型の配列として定義
const posts: Post[] = [
  { id: 1, image: post1Img, title: '夕焼けの写真', description: '美しい夕焼けを撮影しました。', comments: ['素敵な写真ですね！', '感動しました！'] },
  { id: 2, image: post2Img, title: '海辺の写真', description: '海辺でのんびり過ごしました。', comments: ['海が広がっていて素敵！', '癒やされますね。'] },
  { id: 3, image: post3Img, title: '山の写真', description: '山の頂上からの景色です。', comments: ['素晴らしい眺め！', '登ってみたいです。'] },
  { id: 4, image: post4Img, title: '街の写真', description: '夜の街を撮影しました。', comments: ['都会の夜景は綺麗ですね。'] },
  // 他の投稿があればここに追加
];


// ページがマウントされたときに投稿を取得
onMounted(() => {
  // === 修正3: route.params.id の型を安全に扱う ===
  const idParam = route.params.id; // idParam は string | string[] 型

  let postId: number | undefined; // パース後のIDは number または undefined

  // idParam が string 型であり、かつ数値にパースできることを確認
  if (typeof idParam === 'string') {
    const parsedId = parseInt(idParam, 10);
    // parseInt の結果が数値であり、NaN でないことを確認
    if (!isNaN(parsedId)) {
      postId = parsedId;
    } else {
      console.error(`Route param 'id' (${idParam}) is not a valid number.`);
      // TODO: 不正なIDの場合の処理（例: エラーメッセージ表示、リスト画面へのリダイレクト）
      router.replace({ name: 'Instagram' }); // 例: リスト画面へリダイレクト
      return; // 以降の処理を中断
    }
  } else {
    // idParam が string[] 型など、想定外の場合
    console.error(`Route param 'id' has unexpected type:`, idParam);
    // TODO: 想定外のID型の場合の処理（例: エラーメッセージ表示、リスト画面へのリダイレクト）
    router.replace({ name: 'Instagram' }); // 例: リスト画面へリダイレクト
    return; // 以降の処理を中断
  }


  // === 修正4: find の結果を ref に代入 ===
  // postId が undefined でないことを確認してから find を実行
  if (postId !== undefined) {
    const foundPost = posts.find((p) => p.id === postId);
    // find の結果 (Post | undefined) を post.value (Ref<Post | undefined>) に代入
    post.value = foundPost;

    // TODO: 投稿が見つからなかった場合 (foundPost が undefined の場合) の処理
    if (!foundPost) {
      console.warn(`Post with ID ${postId} not found.`);
      // 例: エラーメッセージ表示、リスト画面へのリダイレクト
      // router.replace({ name: 'Instagram' }); // 例: リダイレクト
    }
  } else {
    // postId が undefined の場合（上記チェックで不正だったケースなど）
    // 不正なIDの場合の処理は既に上記で handling 済みですが、念のため
    console.warn("Post ID is undefined after parsing, not attempting to find post.");
  }

});

// 戻るボタンの処理
const goBack = () => {
  router.push({ name: 'Instagram' }); // Instagram リスト画面のルート名に合わせる
};
</script>

<style scoped>
.post-detail-container {
  max-width: 900px;
  padding: 0 16px;
  margin-top: 16px;
  /* v-main のデフォルトパディングを考慮して上部の余白を調整 */
}

.post-detail-image {
  width: 100%;
  height: auto;
  /* アスペクト比を維持 */
  border-radius: 8px;
  object-fit: cover;
  /* 要素に合わせて画像をカバー */
}

.comments {
  margin-top: 20px;
  /* コメントリストの上部に余白を追加 */
}

.comments ul {
  list-style: none;
  padding: 0;
}

.comments li {
  margin-bottom: 8px;
  font-size: 14px;
  /* コメントの文字サイズを少し小さく */
}
</style>