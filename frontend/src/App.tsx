import { useState } from "react";
import ConversationList from "@/pages/ConversationList";
import ConversationView from "@/pages/ConversationView";
import ConversationProfile from "@/pages/ConversationProfile";

import ProfilePage from "@/pages/ProfilePage";
import { Button } from "@/components/ui/button";
import { Home, User as UserIcon } from "lucide-react";
import { APP_CONFIG, PAGE_TYPE } from "@/constants";
import type { PageType } from "@/constants";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

/**
 * メインアプリケーションコンポーネント
 * 
 * このコンポーネントは以下の機能を提供します：
 * - ナビゲーションバー（会話ページとプロフィールページの切り替え）
 * - 会話ページ：チャット一覧、チャット画面、プロフィール表示の3パネルレイアウト
 * - プロフィールページ：ユーザープロフィールの表示・編集
 * 
 * 状態管理：
 * - currentPage: 現在表示中のページ（会話ページ or プロフィールページ）
 * 
 * レイアウト：
 * - ヘッダー：グラデーション背景のナビゲーションバー
 * - メインコンテンツ：選択されたページに応じて表示内容が変わる
 */

function App() {
  // 現在表示中のページを管理（デフォルトは会話ページ）
  const [currentPage, setCurrentPage] = useState<PageType>(PAGE_TYPE.CONVERSATION);

  /**
   * ページ切り替えハンドラー
   * @param page 切り替え先のページタイプ
   */
  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* 
        ナビゲーションバー
        - グラデーション背景（アンバー → オレンジ → ピンク）
        - アプリ名とロゴアイコン
        - ページ切り替えボタン（会話・プロフィール）
      */}
      <header className="bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
            <Home className="w-5 h-5" />
          </div>
          <h1 className="text-xl font-bold">{APP_CONFIG.name}</h1>
        </div>
        <nav className="flex gap-2">
          <Button
            variant={currentPage === PAGE_TYPE.CONVERSATION ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handlePageChange(PAGE_TYPE.CONVERSATION)}
            className={`${
              currentPage === PAGE_TYPE.CONVERSATION 
                ? 'bg-white text-amber-600 hover:bg-white/90' 
                : 'text-white hover:bg-white/20'
            }`}
            aria-label="会話ページに移動"
          >
            <Home className="w-4 h-4 mr-2" />
            会話
          </Button>
          <Button
            variant={currentPage === PAGE_TYPE.PROFILE ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handlePageChange(PAGE_TYPE.PROFILE)}
            className={`${
              currentPage === PAGE_TYPE.PROFILE 
                ? 'bg-white text-amber-600 hover:bg-white/90' 
                : 'text-white hover:bg-white/20'
            }`}
            aria-label="プロフィールページに移動"
          >
            <UserIcon className="w-4 h-4 mr-2" />
            プロフィール
          </Button>
        </nav>
      </header>

      {/* 
        メインコンテンツ
        - 会話ページ：3パネルレイアウト（リサイズ可能）
        - プロフィールページ：フル画面表示
      */}
      <main className="flex-1 h-0">
        {currentPage === PAGE_TYPE.CONVERSATION ? (
          // 会話ページ：チャット一覧、チャット画面、プロフィール表示の3パネル
          <ResizablePanelGroup direction="horizontal" className="h-full">
            {/* 左パネル：チャット一覧（25%幅） */}
            <ResizablePanel defaultSize={APP_CONFIG.defaultPanelSizes.conversationList}>
              <ConversationList />
            </ResizablePanel>
            <ResizableHandle />
            {/* 中央パネル：チャット画面（50%幅） */}
            <ResizablePanel defaultSize={APP_CONFIG.defaultPanelSizes.conversationView}>
              <ConversationView />
            </ResizablePanel>
            <ResizableHandle />
            {/* 右パネル：プロフィール表示（25%幅） */}
            <ResizablePanel defaultSize={APP_CONFIG.defaultPanelSizes.conversationProfile}>
              <ConversationProfile />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          // プロフィールページ：フル画面表示
          <ProfilePage />
        )}
      </main>
    </div>
  );
}

export default App;