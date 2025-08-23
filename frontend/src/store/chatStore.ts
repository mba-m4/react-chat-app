import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Talk, Message, UserProfile } from '@/types';
import type { UserStatus } from '@/constants';
import { USER_STATUS, MESSAGE_ROLE } from '@/constants';
import { createError } from '@/utils';

interface ChatState {
  // 状態
  talks: Talk[];
  selectedTalkId: number | null;
  messages: Record<number, Message[]>;
  currentUser: UserProfile | null;
  isLoading: boolean;
  error: string | null;

  // アクション
  // 初期メッセージ関連
  setInitialMessages: (talkId: number, initialMessages: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>[]) => void;
  
  // トーク関連
  setTalks: (talks: Talk[]) => void;
  selectTalk: (talkId: number) => void;
  addTalk: (talk: Talk) => void;
  updateTalk: (talkId: number, updates: Partial<Talk>) => void;
  removeTalk: (talkId: number) => void;

  // メッセージ関連
  addMessage: (talkId: number, message: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateMessage: (talkId: number, messageId: number, updates: Partial<Message>) => void;
  removeMessage: (talkId: number, messageId: number) => void;
  markAsRead: (talkId: number) => void;

  // ユーザー関連
  setCurrentUser: (user: UserProfile) => void;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  updateUserStatus: (status: UserStatus) => void;

  // ユーティリティ
  getSelectedTalk: () => Talk | null;
  getSelectedTalkMessages: () => Message[];
  getTalkById: (talkId: number) => Talk | null;
  getMessagesByTalkId: (talkId: number) => Message[];

  // エラー処理
  setError: (error: string | null) => void;
  clearError: () => void;
  setLoading: (loading: boolean) => void;
}

export const useChatStore = create<ChatState>()(
  devtools(
    (set, get) => ({
      // 初期状態
      talks: [],
      selectedTalkId: null,
      messages: {},
      currentUser: null,
      isLoading: false,
      error: null,

      // 初期メッセージの設定
      setInitialMessages: (talkId: number, initialMessages: Omit<Message, 'id' | 'createdAt' | 'updatedAt'>[]) => {
        const { messages, talks } = get();
        const formattedMessages = initialMessages.map(msg => ({
          ...msg,
          id: Date.now() + Math.random(),
          createdAt: new Date(Date.now() - Math.random() * 86400000), // 過去24時間内
          updatedAt: new Date()
        }));
        
        // 最新メッセージを取得（作成日時が最も新しいもの）
        const latestMessage = formattedMessages.reduce((latest, current) => 
          current.createdAt > latest.createdAt ? current : latest
        );
        
        // メッセージを設定
        const updatedMessages = { 
          ...messages, 
          [talkId]: formattedMessages 
        };
        
        // トークの最新メッセージ情報を更新
        const updatedTalks = talks.map(talk => {
          if (talk.id === talkId) {
            return {
              ...talk,
              lastMessage: latestMessage.content,
              lastMessageTime: latestMessage.createdAt,
              updatedAt: new Date()
            };
          }
          return talk;
        });
        
        set({ 
          messages: updatedMessages,
          talks: updatedTalks
        });
      },

      // トーク関連アクション
      setTalks: (talks) => {
        set({ talks, error: null });
      },

      selectTalk: (talkId) => {
        const { talks } = get();
        const talk = talks.find(t => t.id === talkId);
        
        if (!talk) {
          set({ error: `Talk with ID ${talkId} not found` });
          return;
        }

        set({ selectedTalkId: talkId });
        
        // 選択時に未読をリセット
        const updatedTalks = talks.map(t => 
          t.id === talkId ? { ...t, unreadCount: undefined } : t
        );
        set({ talks: updatedTalks });
      },

      addTalk: (talk) => {
        const { talks } = get();
        set({ talks: [...talks, talk] });
      },

      updateTalk: (talkId, updates) => {
        const { talks } = get();
        const updatedTalks = talks.map(talk => 
          talk.id === talkId ? { ...talk, ...updates, updatedAt: new Date() } : talk
        );
        set({ talks: updatedTalks });
      },

      removeTalk: (talkId) => {
        const { talks, messages } = get();
        const updatedTalks = talks.filter(t => t.id !== talkId);
        const updatedMessages = { ...messages };
        delete updatedMessages[talkId];
        
        set({ 
          talks: updatedTalks, 
          messages: updatedMessages,
          selectedTalkId: get().selectedTalkId === talkId ? null : get().selectedTalkId
        });
      },

      // メッセージ関連アクション
      addMessage: (talkId, messageData) => {
        const { messages, talks, selectedTalkId } = get();
        const currentMessages = messages[talkId] || [];
        
        const newMessage: Message = {
          ...messageData,
          id: Date.now(),
          createdAt: new Date(),
          updatedAt: new Date()
        };

        const updatedMessages = { 
          ...messages, 
          [talkId]: [...currentMessages, newMessage] 
        };

        // トークの最後のメッセージを更新
        const updatedTalks = talks.map(talk => {
          if (talk.id === talkId) {
            return {
              ...talk,
              lastMessage: newMessage.content,
              lastMessageTime: new Date(),
              unreadCount: selectedTalkId === talkId ? undefined : (talk.unreadCount || 0) + 1,
              updatedAt: new Date()
            };
          }
          return talk;
        });

        set({ 
          messages: updatedMessages,
          talks: updatedTalks,
          error: null
        });
      },

      updateMessage: (talkId, messageId, updates) => {
        const { messages } = get();
        const talkMessages = messages[talkId];
        
        if (!talkMessages) {
          set({ error: `No messages found for talk ${talkId}` });
          return;
        }

        const updatedMessages = talkMessages.map(msg => 
          msg.id === messageId ? { ...msg, ...updates, updatedAt: new Date() } : msg
        );

        set({ 
          messages: { ...messages, [talkId]: updatedMessages },
          error: null
        });
      },

      removeMessage: (talkId, messageId) => {
        const { messages } = get();
        const talkMessages = messages[talkId];
        
        if (!talkMessages) {
          set({ error: `No messages found for talk ${talkId}` });
          return;
        }

        const updatedMessages = talkMessages.filter(msg => msg.id !== messageId);
        set({ 
          messages: { ...messages, [talkId]: updatedMessages },
          error: null
        });
      },

      markAsRead: (talkId) => {
        const { talks } = get();
        const updatedTalks = talks.map(talk => 
          talk.id === talkId ? { ...talk, unreadCount: undefined, updatedAt: new Date() } : talk
        );
        set({ talks: updatedTalks });
      },

      // ユーザー関連アクション
      setCurrentUser: (user) => {
        set({ currentUser: user, error: null });
      },

      updateCurrentUser: (updates) => {
        const { currentUser } = get();
        if (!currentUser) {
          set({ error: 'No current user to update' });
          return;
        }

        set({ 
          currentUser: { ...currentUser, ...updates, updatedAt: new Date() },
          error: null
        });
      },

      updateUserStatus: (status) => {
        const { currentUser } = get();
        if (!currentUser) {
          set({ error: 'No current user to update' });
          return;
        }

        set({ 
          currentUser: { ...currentUser, status, updatedAt: new Date() },
          error: null
        });
      },

      // ユーティリティ関数
      getSelectedTalk: () => {
        const { talks, selectedTalkId } = get();
        return talks.find(talk => talk.id === selectedTalkId) || null;
      },

      getSelectedTalkMessages: () => {
        const { messages, selectedTalkId } = get();
        return selectedTalkId ? (messages[selectedTalkId] || []) : [];
      },

      getTalkById: (talkId) => {
        const { talks } = get();
        return talks.find(talk => talk.id === talkId) || null;
      },

      getMessagesByTalkId: (talkId) => {
        const { messages } = get();
        return messages[talkId] || [];
      },

      // エラー処理
      setError: (error) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },

      setLoading: (loading) => {
        set({ isLoading: loading });
      }
    }),
    {
      name: 'chat-store',
      enabled: process.env.NODE_ENV === 'development'
    }
  )
); 