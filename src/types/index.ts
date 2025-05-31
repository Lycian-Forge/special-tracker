// SPECIAL System Types
export type SpecialAttribute = 
  | 'strength'
  | 'perception'
  | 'endurance'
  | 'charisma'
  | 'intelligence'
  | 'agility'
  | 'luck';

export interface SpecialStats {
  strength: number;
  perception: number;
  endurance: number;
  charisma: number;
  intelligence: number;
  agility: number;
  luck: number;
}

export interface AttributeIncrease {
  attribute: SpecialAttribute;
  points: number;
  reason?: string;
}

// User Types
export interface User {
  id: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl?: string;
  level: number;
  totalExp: number;
  expToNext: number;
  friendCode: string;
  isPremium: boolean;
  premiumExpiresAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile extends User {
  specialStats: SpecialStats;
  achievements: Achievement[];
  streaks: StreakData;
}

// Activity Types
export interface ActivityEntry {
  id: string;
  userId: string;
  description: string;
  entryType: 'completed' | 'planned_completed';
  aiClassification: Record<SpecialAttribute, number>;
  totalExpGained: number;
  createdAt: Date;
  isManualOverride: boolean;
  photoUrl?: string;
}

export interface PlannedTask {
  id: string;
  userId: string;
  title: string;
  description?: string;
  predictedAttributes: Record<SpecialAttribute, number>;
  dueDate: Date;
  priority: 1 | 2 | 3 | 4 | 5;
  isCompleted: boolean;
  completedAt?: Date;
  createdAt: Date;
}

// AI Types
export interface AIClassification {
  attributes: Record<SpecialAttribute, number>;
  confidence: number;
  reasoning: string;
}

export interface AIPromptResponse {
  classification: AIClassification;
  suggestions?: string[];
  alternativeActivities?: string[];
}

// Social Types
export interface Friendship {
  id: string;
  userId: string;
  friendId: string;
  status: 'pending' | 'accepted' | 'blocked';
  createdAt: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  unlockedAt?: Date;
  progress?: number;
  maxProgress?: number;
}

// Gamification Types
export interface StreakData {
  current: number;
  longest: number;
  lastEntryDate?: Date;
}

export interface LevelProgress {
  currentLevel: number;
  currentExp: number;
  expToNext: number;
  expForCurrentLevel: number;
  totalExp: number;
}

// Navigation Types
export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Special: undefined;
  Planner: undefined;
  History: undefined;
  Profile: undefined;
  Settings: undefined;
};

// App State Types
export interface AppState {
  user: UserProfile | null;
  isLoading: boolean;
  error: string | null;
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Settings Types
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    enabled: boolean;
    dailyReminders: boolean;
    weeklyGoals: boolean;
    achievements: boolean;
    social: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'friends' | 'private';
    shareAchievements: boolean;
    shareProgress: boolean;
  };
  preferences: {
    defaultReminderTime: string;
    weeklyFocusAttribute?: SpecialAttribute;
    autoBackup: boolean;
  };
} 