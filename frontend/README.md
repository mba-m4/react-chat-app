# React Chat App

## 概要

React Chat Appは、React + TypeScript + Tailwind CSSで構築されたモダンなチャットアプリケーションです。美しいUI/UXと実用的な機能を備え、初学者から中級者まで学習に最適なプロジェクトです。

## 🚀 主な機能

### チャット機能
- **チャット一覧**: 参加しているチャットの一覧表示
- **リアルタイムチャット**: メッセージの送受信とAI応答シミュレーション
- **プロフィール表示**: 選択されたチャットの詳細プロフィール
- **3パネルレイアウト**: リサイズ可能なレスポンシブデザイン

### プロフィール機能
- **プロフィール表示**: ユーザーの詳細情報表示
- **プロフィール編集**: 基本情報の編集・更新
- **ステータス管理**: オンライン/オフライン等の状態管理

### デザインシステム
- **統一されたカラーパレット**: アンバー系をベースとした美しいデザイン
- **shadcn/ui**: 高品質なUIコンポーネントライブラリ
- **レスポンシブデザイン**: 様々な画面サイズに対応

## 🛠️ 技術スタック

- **フロントエンド**: React 18 + TypeScript
- **スタイリング**: Tailwind CSS
- **UIコンポーネント**: shadcn/ui
- **状態管理**: Zustand
- **アイコン**: Lucide React
- **ビルドツール**: Vite

## 📁 プロジェクト構造

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
├── docs/                    # 詳細ドキュメント
├── package.json             # 依存関係とスクリプト
└── tsconfig.json            # TypeScript設定
```

## 🚀 クイックスタート

### 前提条件
- Node.js 18.0.0以上
- npm 8.0.0以上

### セットアップ

1. **リポジトリのクローン**
   ```bash
   git clone <repository-url>
   cd react-chat-app
   ```

2. **依存関係のインストール**
   ```bash
   cd frontend
   npm install
   ```

3. **開発サーバーの起動**
   ```bash
   npm run dev
   ```

4. **ブラウザでアクセス**
   ```
   http://localhost:5173
   ```

## 📚 ドキュメント

### 📖 アーキテクチャ設計書
[ARCHITECTURE.md](./docs/ARCHITECTURE.md) - プロジェクトの全体構造、データフロー、コンポーネント設計について詳しく説明

### 🔧 機能詳細仕様書
[FEATURES.md](./docs/FEATURES.md) - 各機能の実装詳細、動作フロー、使用方法を詳しく説明

### 👨‍💻 開発者ガイド
[DEVELOPMENT.md](./docs/DEVELOPMENT.md) - 開発環境のセットアップ、開発の流れ、コードの理解方法について説明

## 🎯 学習のポイント

### 初心者向け
1. **コンポーネントの基本**: 各コンポーネントの役割と責任分離
2. **状態管理**: Zustandによる効率的な状態管理
3. **TypeScript**: 型安全性とインターフェースの理解

### 中級者向け
1. **アーキテクチャ設計**: スケーラブルな設計パターン
2. **パフォーマンス最適化**: メモ化とレンダリング最適化
3. **テスト**: ユニットテストと統合テストの実装

## 🔍 主要コンポーネント

### App.tsx
- アプリケーションのエントリーポイント
- ページ切り替えとレイアウト管理

### ConversationList.tsx
- チャット一覧の表示
- チャット選択の処理

### ConversationView.tsx
- チャット画面の表示
- メッセージ送信とAI応答

### ConversationProfile.tsx
- プロフィール情報の表示
- 条件付きレンダリング

### ProfilePage.tsx
- ユーザープロフィールの編集
- フォーム状態管理

## 🎨 デザインシステム

### カラーパレット
- **プライマリ**: アンバー系 (#f59e0b → #ea580c)
- **セカンダリ**: スレート系 (#f8fafc → #e2e8f0)
- **アクセント**: オレンジ・ピンク系 (#f97316 → #ec4899)

### コンポーネントデザイン
- **カード**: 白背景、角丸（rounded-2xl）、影（shadow-sm）
- **ボタン**: グラデーション背景、統一されたホバー効果
- **レイアウト**: 一貫したスペーシングとレスポンシブデザイン

## 🚧 今後の拡張予定

### 機能追加
- [ ] リアルタイム通信（WebSocket）
- [ ] ファイルアップロード機能
- [ ] グループチャット機能
- [ ] 通知システム

### アーキテクチャ改善
- [ ] マイクロフロントエンド化
- [ ] サーバーサイドレンダリング
- [ ] PWA対応

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

## 📝 ライセンス

このプロジェクトはMITライセンスの下で公開されています。

## 🙏 謝辞

- [shadcn/ui](https://ui.shadcn.com/) - 高品質なUIコンポーネント
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストのCSSフレームワーク
- [Zustand](https://github.com/pmndrs/zustand) - 軽量で使いやすい状態管理
- [Lucide](https://lucide.dev/) - 美しいアイコンライブラリ

## 📞 サポート

質問や問題が発生した場合は、以下のドキュメントを確認してください：

1. [アーキテクチャ設計書](./docs/ARCHITECTURE.md)
2. [機能詳細仕様書](./docs/FEATURES.md)
3. [開発者ガイド](./docs/DEVELOPMENT.md)

それでも解決しない場合は、Issueを作成してください。

---

**Happy Coding! 🎉**
