import type { UserStatus, MessageRole } from '../constants';

// 基本型定義
export interface BaseEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// ユーザー関連
export interface User extends BaseEntity {
  name: string;
  email: string;
  avatar?: string;
  status: UserStatus;
  lastSeen?: Date;
  bio?: string;
  phoneNumber?: string;
  location?: string;
  isCurrentUser: boolean;
}

export interface UserProfile extends User {
  joinDate: Date;
  totalMessages: number;
}

// トーク関連
export interface Talk extends BaseEntity {
  name: string;
  avatar?: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount?: number;
  participants: User[];
  isGroup: boolean;
}

// メッセージ関連
export interface Message extends BaseEntity {
  content: string;
  role: MessageRole;
  talkId: number;
  senderId: number;
  isRead: boolean;
  replyTo?: Message;
  attachments?: Attachment[];
}

// 添付ファイル関連
export interface Attachment extends BaseEntity {
  name: string;
  url: string;
  type: 'image' | 'file' | 'audio' | 'video';
  size: number;
  mimeType: string;
}

// アプリケーション状態
export interface AppState {
  currentPage: 'chat' | 'user';
  isLoading: boolean;
  error: string | null;
}

// チャット状態
export interface ChatState {
  talks: Talk[];
  selectedTalkId: number | null;
  messages: Record<number, Message[]>;
  currentUser: UserProfile | null;
}

// フォーム関連
export interface EditProfileForm {
  name: string;
  email: string;
  bio: string;
  phoneNumber: string;
  location: string;
}

// API レスポンス型
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// エラー型
export interface AppError {
  code: string;
  message: string;
  details?: any;
}

// イベント型
export interface ChatEvent {
  type: 'message' | 'typing' | 'read' | 'status';
  data: any;
  timestamp: Date;
}

// 設定型
export interface AppSettings {
  theme: 'light' | 'dark' | 'system';
  language: 'ja' | 'en';
  notifications: boolean;
  sound: boolean;
  autoScroll: boolean;
} 