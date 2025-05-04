import { defineStore } from 'pinia';
import router from '@/router';

export const useGameStore = defineStore('game', {
  state: () => ({
    // ゲーム全体の状態
    currentChapter: 1 as number, // 現在の章
    isGameComplete: false as boolean, // ゲームクリアしたか

    // Chapter 1 の進行状況
    chapter1Progress: 'start' as 'start' | 'searchedWho' | 'viewedResults' | 'viewedHint' | 'viewedAccountLogin' | 'viewedPasswordReset' | 'emailAvailable' | 'viewedPasswordResetEmail' | 'foundName',

    // 発見した情報
    discoveredName: null as string | null,
    discoveredGirlfriendName: null as string | null,
    // 他にも発見する情報があればここに追加

    accountEmail: 'y.tanaka@cmail.com', // 彼氏のメールアドレス
    accountPassword: 'Kanaria0902', // 彼氏のパスワード

    // シミュレートされたデータ（検索結果、メールなど）
    simulatedData: {
      searchResults: [] as { id: string; title: string; snippet: string; url: string; }[],
      emails: {
        passwordReset: {
          id: 'passwordReset',
          from: 'accounts@simulated.com',
          subject: 'パスワードリセットのご依頼',
          body: 'Yusuke Tanaka 様\n\nパスワードリセットの申請を受け付けました。以下のリンクから新しいパスワードを設定してください。\n\n...', // ここで名前が明らかになる
          isRead: false,
          isAvailable: false, // ゲームの進行で利用可能になるか
        }
        // 他のメールがあればここに追加
      }
    }
  }),

  actions: {
    // ゲーム開始時の初期化
    initGame() {
      this.currentChapter = 1;
      this.chapter1Progress = 'start';
      this.discoveredName = 'Yusuke Tanaka';
      this.isGameComplete = false;
      // 他の状態もリセット
      this.simulatedData.emails.passwordReset.isAvailable = false;
      this.generateSearchResults('initial'); // 初期検索結果を生成
    },

    // 検索処理のハンドリング
    handleSearch(query: string) {
      // 検索クエリが空の場合は何もしない
      if (!query || query.trim() === '') {
        return;
      } else {
        // 検索クエリを小文字に変換してトリム
        const lowerQuery = query.toLowerCase().trim();
        // Chapter 1 のロジック
        // if (this.currentChapter === 1) {
          if ( /* this.chapter1Progress === 'start' && */ (lowerQuery.includes('私') || lowerQuery.includes('誰') || lowerQuery.includes('わたし') || lowerQuery.includes('だれ') || lowerQuery.includes('自分'))) {
            // 「私は誰」系の検索があったら、特定の検索結果を生成して結果ページへ
            this.generateSearchResults('who_am_i');
            this.chapter1Progress = 'searchedWho';
            router.push('/results?q=' + encodeURIComponent(query));
          } else {
            // その他の検索や、既に「私は誰」を検索済みの場合はジェネリックな結果やヒントを含む結果を表示
            this.generateSearchResults('generic'); // 仮のジェネリック結果
            router.push('/results?q=' + encodeURIComponent(query)); // とりあえず結果ページへ遷移させる
            // TODO: 進行度に応じて検索結果の内容を変えるロジックをここに追加
          }
        // }
        // TODO: Chapter 2以降の検索ロジックを追加
      }
    },

    // シミュレートされた検索結果を生成する（ゲーム状態に応じて内容を変更）
    generateSearchResults(type: 'initial' | 'who_am_i' | 'generic') {
      this.simulatedData.searchResults = []; // 結果をクリア

      if (type === 'initial') {
        // 初期状態の検索結果は表示しない（検索するまで結果ページに行かないため）
      } else if (type === 'who_am_i') {
        // 「私は誰」検索時の結果
        this.simulatedData.searchResults = [
          { id: 'hint1', title: '記憶喪失になった時、まず行うべきこと', snippet: '自分が誰か分からない...そんな時は落ち着いて身の回りのものから情報を集めましょう...', url: '/hint' },
          { id: 'generic1', title: '記憶喪失の診断と治療', snippet: '記憶喪失には様々な種類があります...', url: '#' },
          // TODO: もっとらしい検索結果を追加
        ];
      } else if (type === 'generic') {
        // その他の検索時の結果（進行度によって内容を変える）
        // if (this.chapter1Progress === 'start') {
          this.simulatedData.searchResults = [
            { id: 'generic_start_1', title: '今日の天気', snippet: '現在の天気情報...', url: '#' },
            // ...
          ];
        // } else if (this.chapter1Progress === 'searchedWho' || this.chapter1Progress === 'viewedResults') {
        //   // 既に「私は誰」検索済みの場合は、アカウント確認を促すヒントを含む結果を出すなど
        //   this.simulatedData.searchResults = [
        //     { id: 'hint_account', title: '自分が誰かを確認する方法', snippet: 'Googleなどのサービスを利用している場合、アカウント情報を確認することで名前がわかることがあります...', url: '/hint?step=account' }, // アカウント確認を促すヒントページへのリンク
        //     { id: 'generic_afterwho_1', title: '日本の主要なSNS一覧', snippet: 'Twitter, Facebook, Instagramなど...', url: '#' },
        //     // ...
        //   ];
        // }
        // TODO: 他の進行度でのジェネリック結果を定義
      }
      // TODO: 検索クエリに応じて結果をフィルタリング/並び替えるロジックを追加
    },

    // ルーターナビゲーションのラッパー（必要に応じて状態チェックなどを追加するため）
    navigate(path: string) {
      // 状態に応じたナビゲーション制限などを将来的に追加可能
      router.push(path);
    },

    // ヒントページを見た時の処理
    viewedHintPage(step?: string) {
      if (this.currentChapter === 1) {
        if (step === 'account') {
          this.chapter1Progress = 'viewedHint'; // アカウントヒントを見た状態に
        } else if (this.chapter1Progress === 'searchedWho') {
          // 「私は誰」から来た最初のヒント
          this.chapter1Progress = 'viewedHint';
        }
        // TODO: 他のヒントを見たときの処理
      }
    },

    // アカウントアイコンをクリックした時の処理
    attemptAccountAccess() {
      // if (this.currentChapter === 1) {
      //   if (this.chapter1Progress === 'viewedHint' || this.chapter1Progress === 'viewedResults') {
          // ヒントを見た後、または検索結果を見た後ならアカウントログイン画面へ
          this.chapter1Progress = 'viewedAccountLogin';
          router.push('/account/login');
        // } else {
          // まだアカウントへのアクセスが許可されていない場合（例: ヒントを見ていない）
          // TODO: 何かフィードバック（例: 「今はまだ見れないようだ」といったメッセージ表示）
          //console.log('Account access not yet available.');
      //   }
      // }
      // TODO: Chapter 2以降のロジック
    },

    // パスワードリセットリンクをクリックした時の処理
    requestPasswordReset() {
      if (this.currentChapter === 1 && this.chapter1Progress === 'viewedAccountLogin') {
        this.chapter1Progress = 'viewedPasswordReset';
        this.simulatedData.emails.passwordReset.isAvailable = true; // パスワードリセットメールを利用可能にする
        router.push('/account/reset');
      }
      // TODO: 他の章のロジック
    },

    // メールクライアントを開く処理
    openEmailClient() {
      // TODO: 進行度に応じてメールクライアントを開けるかをチェック
      // パスワードリセット画面を見た後であれば開ける、など
      // if (this.currentChapter === 1 && this.chapter1Progress === 'viewedPasswordReset') {
        router.push('/email');
      // } else {
      //   // TODO: 開けない場合のフィードバック
      //   //console.log('Email client cannot be accessed yet.');
      // }
    },


    // 特定のメールを閲覧した時の処理
    viewEmail(emailId: string) {
      if (this.currentChapter === 1 && emailId === 'passwordReset' && this.simulatedData.emails.passwordReset.isAvailable && !this.simulatedData.emails.passwordReset.isRead) {
        this.simulatedData.emails.passwordReset.isRead = true;
        this.chapter1Progress = 'viewedPasswordResetEmail';
        // メール内容に名前が含まれている場合、ここで発見とする
        this.discoverName('Yusuke Tanaka'); // 名前発見！
        // TODO: メール詳細画面への遷移など
      }
      // TODO: 他のメールや章のロジック
    },

    // 名前を発見した時の処理
    discoverName(name: string) {
      if (this.currentChapter === 1 && this.chapter1Progress === 'viewedPasswordResetEmail' && !this.discoveredName) {
        this.discoveredName = name;
        this.chapter1Progress = 'foundName'; // Chapter 1 の主要目標達成
        //console.log(`名前を発見しました: ${this.discoveredName}`);
        // TODO: ゲームUIに発見した名前を表示したり、次のステップへのヒントを出すなど
        // 例えば、検索画面に戻って、検索バーの上に「Yusuke Tanakaとしてログイン中」のような表示を出す
      }
    },

    // ゲームクリア処理
    completeGame() {
      this.isGameComplete = true;
      // TODO: エンディングや第0章表示画面への遷移
      router.push('/ending'); // 仮のエンディングルート
    }

    // TODO: Chapter 1 完了後に Chapter 2 へ進むロジック

  },
});