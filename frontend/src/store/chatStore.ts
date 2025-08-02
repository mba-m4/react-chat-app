import { create } from 'zustand';
import type { Talk } from '../types/Talk';
import type { Message } from '../types/Message';

interface ChatState {
  // トーク関連
  talks: Talk[];
  selectedTalkId: number | null;
  
  // メッセージ関連
  messages: Record<number, Message[]>; // talkId -> messages
  
  // アクション
  setTalks: (talks: Talk[]) => void;
  selectTalk: (talkId: number) => void;
  addMessage: (talkId: number, message: Message) => void;
  updateLastMessage: (talkId: number, message: string) => void;
  markAsRead: (talkId: number) => void;
  getSelectedTalk: () => Talk | null;
  getSelectedTalkMessages: () => Message[];
}

export const useChatStore = create<ChatState>((set, get) => ({
  // 初期状態
  talks: [],
  selectedTalkId: null,
  messages: {},
  
  // アクション
  setTalks: (talks) => set({ talks }),
  
  selectTalk: (talkId) => {
    set({ selectedTalkId: talkId });
    // 選択時に未読をundefinedにする
    const { talks } = get();
    const updatedTalks = talks.map(talk => 
      talk.id === talkId ? { ...talk, unreadCount: undefined } : talk
    );
    set({ talks: updatedTalks });
  },
  
  addMessage: (talkId, message) => {
    const { messages, talks } = get();
    const currentMessages = messages[talkId] || [];
    const updatedMessages = { ...messages, [talkId]: [...currentMessages, message] };
    
    // トークの最後のメッセージを更新
    const updatedTalks = talks.map(talk => {
      if (talk.id === talkId) {
        return {
          ...talk,
          lastMessage: message.content,
          lastMessageTime: new Date(),
          unreadCount: get().selectedTalkId === talkId ? undefined : (talk.unreadCount || 0) + 1
        };
      }
      return talk;
    });
    
    set({ 
      messages: updatedMessages,
      talks: updatedTalks
    });
  },
  
  updateLastMessage: (talkId, message) => {
    const { talks } = get();
    const updatedTalks = talks.map(talk => {
      if (talk.id === talkId) {
        return {
          ...talk,
          lastMessage: message,
          lastMessageTime: new Date()
        };
      }
      return talk;
    });
    set({ talks: updatedTalks });
  },
  
  markAsRead: (talkId) => {
    const { talks } = get();
    const updatedTalks = talks.map(talk => 
      talk.id === talkId ? { ...talk, unreadCount: undefined } : talk
    );
    set({ talks: updatedTalks });
  },
  
  getSelectedTalk: () => {
    const { talks, selectedTalkId } = get();
    return talks.find(talk => talk.id === selectedTalkId) || null;
  },
  
  getSelectedTalkMessages: () => {
    const { messages, selectedTalkId } = get();
    return selectedTalkId ? (messages[selectedTalkId] || []) : [];
  }
})); 