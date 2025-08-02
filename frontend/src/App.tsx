import { useState } from "react";
import Chat from "./components/Chat/Chat";
import Talk from "./components/Talk/Talk";
import User from "./components/User/User";
import { Button } from "./components/ui/button";
import { Home, MessageCircle, User as UserIcon } from "lucide-react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "./components/ui/resizable";

type Page = 'chat' | 'user';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('chat');

  return (
    <div className="h-screen flex flex-col">
      {/* ナビゲーションバー */}
      <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">React Chat App</h1>
        <div className="flex gap-2">
          <Button
            variant={currentPage === 'chat' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentPage('chat')}
            className="text-white hover:bg-blue-600"
          >
            <Home className="w-4 h-4 mr-1" />
            チャット
          </Button>
          <Button
            variant={currentPage === 'user' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setCurrentPage('user')}
            className="text-white hover:bg-blue-600"
          >
            <UserIcon className="w-4 h-4 mr-1" />
            プロフィール
          </Button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="flex-1 h-0">
        {currentPage === 'chat' ? (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={30}>
              <Talk />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={70}>
              <Chat />
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <User />
        )}
      </div>
    </div>
  );
}

export default App;