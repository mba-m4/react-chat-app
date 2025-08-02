import { useState } from "react";
import ConversationList from "@/pages/ConversationList";
import ConversationView from "@/pages/ConversationView";
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

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>(PAGE_TYPE.CONVERSATION);

  const handlePageChange = (page: PageType) => {
    setCurrentPage(page);
  };

  return (
    <div className="h-screen flex flex-col">
      {/* ナビゲーションバー */}
      <header className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">{APP_CONFIG.name}</h1>
        <nav className="flex gap-2">
          <Button
            variant={currentPage === PAGE_TYPE.CONVERSATION ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handlePageChange(PAGE_TYPE.CONVERSATION)}
            className="text-white hover:bg-blue-600"
            aria-label="会話ページに移動"
          >
            <Home className="w-4 h-4 mr-1" />
            会話
          </Button>
          <Button
            variant={currentPage === PAGE_TYPE.PROFILE ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handlePageChange(PAGE_TYPE.PROFILE)}
            className="text-white hover:bg-blue-600"
            aria-label="プロフィールページに移動"
          >
            <UserIcon className="w-4 h-4 mr-1" />
            プロフィール
          </Button>
        </nav>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 h-0">
        {currentPage === PAGE_TYPE.CONVERSATION ? (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={APP_CONFIG.defaultPanelSizes.conversationList}>
              <ConversationList />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={APP_CONFIG.defaultPanelSizes.conversationView}>
              <ConversationView />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <ProfilePage />
        )}
      </main>
    </div>
  );
}

export default App;