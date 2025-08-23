// アプリケーション全体の定数
export const APP_CONFIG = {
  name: "React Chat App",
  version: "1.0.0",
  maxMessageLength: 1000,
  maxUnreadCount: 99,
  defaultPanelSizes: {
    conversationList: 25,
    conversationView: 50,
    conversationProfile: 25,
  }
} as const;

// ユーザーステータス
export const USER_STATUS = {
  ONLINE: 'online',
  OFFLINE: 'offline',
  AWAY: 'away',
  BUSY: 'busy'
} as const;

export type UserStatus = typeof USER_STATUS[keyof typeof USER_STATUS];

// メッセージロール
export const MESSAGE_ROLE = {
  USER: 'user',
  AI: 'ai'
} as const;

export type MessageRole = typeof MESSAGE_ROLE[keyof typeof MESSAGE_ROLE];

// ページタイプ
export const PAGE_TYPE = {
  CONVERSATION: 'conversation',
  PROFILE: 'profile'
} as const;

export type PageType = typeof PAGE_TYPE[keyof typeof PAGE_TYPE];

// 時間フォーマット設定
export const TIME_FORMAT = {
  SHORT: 'HH:mm',
  MEDIUM: 'MM/dd',
  LONG: 'yyyy/MM/dd'
} as const;

// デフォルト値
export const DEFAULTS = {
  AVATAR_SIZE: 48,
  MESSAGE_MAX_WIDTH: '60ch',
  CONVERSATION_ITEM_HEIGHT: 'auto',
  INPUT_HEIGHT: '2.25rem'
} as const; 