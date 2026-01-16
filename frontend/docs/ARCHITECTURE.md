# React Chat App アーキテクチャ設計書

## 概要

React Chat Appは、React + TypeScript + Tailwind CSSで構築されたモダンなチャットアプリケーションです。このドキュメントでは、アプリケーションの全体構造、データフロー、コンポーネント設計について詳しく説明します。

## 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **状態管理**: Zustand
- **アイコン**: Lucide React
- **ビルドツール**: Vite

## プロジェクト構造

```
frontend/
├── src/
│   ├── components/          # 再利用可能なUIコンポーネント
│   │   └── ui/             # shadcn/uiコンポーネント
│   ├── features/            # 機能別のコンポーネント
│   │   └── conversation/    # チャット関連のコンポーネント
│   ├── pages/               # ページコンポーネント
│   ├── store/               # 状態管理（Zustand）
│   ├── types/               # TypeScript型定義
│   ├── constants/           # 定数定義
│   ├── utils/               # ユーティリティ関数
│   └── App.tsx              # メインアプリケーション
```

## アーキテクチャ概要

### 1. コンポーネント階層

```
App
├── Header (ナビゲーションバー)
└── Main
    ├── ConversationPage (会話ページ)
    │   ├── ConversationList (チャット一覧)
    │   ├── ConversationView (チャット画面)
    │   └── ConversationProfile (プロフィール表示)
    └── ProfilePage (プロフィールページ)
```

### 2. 状態管理フロー

```
User Action → Component → Store Action → State Update → UI Re-render
```

## 詳細設計

### 1. メインアプリケーション (App.tsx)

#### 機能
- ページ切り替え（会話ページ ↔ プロフィールページ）
- 3パネルレイアウト（リサイズ可能）
- 統一されたデザインシステム

#### 状態管理
```typescript
const [currentPage, setCurrentPage] = useState<PageType>(PAGE_TYPE.CONVERSATION);
```

#### レイアウト設定
- **左パネル**: チャット一覧 (25%)
- **中央パネル**: チャット画面 (50%)
- **右パネル**: プロフィール表示 (25%)

### 2. チャット一覧 (ConversationList.tsx)

#### 機能
- チャット一覧の表示
- チャット選択
- 初期データの設定
- 初期メッセージの設定

#### データフロー
1. コンポーネントマウント時にダミーデータを設定
2. 各チャットに初期メッセージを設定
3. チャット選択時にストアの状態を更新

#### 表示内容
- チャット名
- 最新メッセージの一部
- 最新メッセージの時間
- 未読メッセージ数
- アバター画像

### 3. チャット画面 (ConversationView.tsx)

#### 機能
- 選択されたチャットの表示
- メッセージ送信
- AI応答シミュレーション
- エラー処理

#### メッセージ送信フロー
1. ユーザーがメッセージを入力
2. `handleSend`関数でメッセージを作成
3. チャットストアにメッセージを追加
4. AI応答をシミュレート（1秒後）
5. AI応答もチャットストアに追加

#### レイアウト
- **ヘッダー**: チャット名とアイコン
- **メッセージ一覧**: 過去のメッセージを表示
- **メッセージ入力**: 新しいメッセージの送信

### 4. プロフィール表示 (ConversationProfile.tsx)

#### 機能
- 選択されたチャットのプロフィール表示
- プロフィール情報がない場合の適切な表示
- スクロール可能な詳細情報

#### 表示内容
- アバター画像
- 基本情報（名前、ユーザー名、自己紹介）
- 統計情報（フォロワー数、フォロー数）
- 詳細情報（場所、参加日、ウェブサイト）
- スキル・興味
- 連絡先情報
- 最近の活動

### 5. プロフィールページ (ProfilePage.tsx)

#### 機能
- ユーザープロフィールの表示・編集
- ステータス変更
- 基本情報の編集

#### 編集モード
- 名前、メール、自己紹介、電話番号、場所の編集
- 保存・キャンセル機能

#### 表示モード
- ステータス選択
- 基本情報表示
- 統計情報表示
- アクションボタン

## 状態管理 (Zustand)

### チャットストア (chatStore.ts)

#### 状態
```typescript
interface ChatState {
  talks: Talk[];                    // チャット一覧
  selectedTalkId: number | null;    // 選択中のチャットID
  messages: Record<number, Message[]>; // チャットID別メッセージ
  currentUser: UserProfile | null;  // 現在のユーザー
  isLoading: boolean;               // ローディング状態
  error: string | null;             // エラー状態
}
```

#### 主要アクション
- **チャット関連**: `setTalks`, `selectTalk`, `addTalk`, `updateTalk`, `removeTalk`
- **メッセージ関連**: `addMessage`, `updateMessage`, `removeMessage`, `markAsRead`
- **ユーザー関連**: `setCurrentUser`, `updateCurrentUser`, `updateUserStatus`
- **初期化**: `setInitialMessages`

#### データフロー
1. コンポーネントがストアから状態を取得
2. ユーザーアクションがストアのアクションを呼び出し
3. ストアが状態を更新
4. コンポーネントが自動的に再レンダリング

## データモデル

### 1. Talk (チャット)
```typescript
interface Talk extends BaseEntity {
  name: string;           // チャット名
  avatar?: string;        // アバター画像
  lastMessage: string;    // 最新メッセージ
  lastMessageTime: Date;  // 最新メッセージの時間
  unreadCount?: number;   // 未読メッセージ数
  participants: User[];   // 参加者
  isGroup: boolean;       // グループチャットかどうか
  profile?: ProfileData;  // プロフィール情報
}
```

### 2. Message (メッセージ)
```typescript
interface Message extends BaseEntity {
  content: string;        // メッセージ内容
  role: MessageRole;      // 送信者ロール（USER/AI）
  talkId: number;         // チャットID
  senderId: number;       // 送信者ID
  isRead: boolean;        // 既読状態
  replyTo?: Message;      // 返信先メッセージ
  attachments?: Attachment[]; // 添付ファイル
}
```

### 3. UserProfile (ユーザープロフィール)
```typescript
interface UserProfile extends User {
  joinDate: Date;         // 参加日
  totalMessages: number;  // 総メッセージ数
}
```

## デザインシステム

### カラーパレット
- **プライマリ**: アンバー系 (#f59e0b → #ea580c)
- **セカンダリ**: スレート系 (#f8fafc → #e2e8f0)
- **アクセント**: オレンジ・ピンク系 (#f97316 → #ec4899)

### コンポーネントデザイン
- **カード**: 白背景、角丸（rounded-2xl）、影（shadow-sm）
- **ボタン**: グラデーション背景、統一されたホバー効果
- **アイコン**: 最小限の必要なアイコンのみ使用

### レイアウト原則
- 一貫したスペーシング（gap-4, p-6等）
- レスポンシブデザイン
- 適切なコントラストと可読性

## パフォーマンス最適化

### 1. メモ化
- 必要に応じてReact.memoを使用
- コールバック関数のメモ化

### 2. 状態管理の最適化
- Zustandの細かい状態分割
- 必要な状態のみを購読

### 3. レンダリング最適化
- 適切なキー設定
- 不要な再レンダリングの防止

## エラーハンドリング

### 1. エラー境界
- コンポーネントレベルのエラー処理
- 適切なフォールバックUI

### 2. バリデーション
- フォーム入力の検証
- 型安全性の確保

### 3. ユーザーフィードバック
- エラーメッセージの表示
- ローディング状態の表示

## 今後の拡張性

### 1. 機能追加
- リアルタイム通信（WebSocket）
- ファイルアップロード
- グループチャット機能
- 通知システム

### 2. アーキテクチャ改善
- マイクロフロントエンド化
- サーバーサイドレンダリング
- PWA対応

### 3. テスト
- ユニットテスト
- 統合テスト
- E2Eテスト

## まとめ

React Chat Appは、モダンなReact開発のベストプラクティスに従って設計されています。Zustandによる状態管理、TypeScriptによる型安全性、Tailwind CSSによる一貫したデザインにより、保守性と拡張性の高いアプリケーションとなっています。

このアーキテクチャを基盤として、さらなる機能追加や改善を進めることができます。
