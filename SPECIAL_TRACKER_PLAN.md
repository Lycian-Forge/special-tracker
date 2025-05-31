# SPECIAL Tracker Mobile App - Development Plan

## 📋 Project Overview

**App Name:** SPECIAL Tracker  
**Platform:** iOS & Android (React Native)  
**Core Concept:** A gamified personal development tracker based on Fallout's SPECIAL attribute system using AI to categorize user activities and planned tasks.

---

## 🎯 The SPECIAL System (Real-World Applications)

### 1. Strength 💪
*Train your muscles and body's ability to exert force.*

**Example Activities:**
- Weightlifting / resistance training (squats, deadlifts)
- Bodyweight exercises (push-ups, pull-ups, planks)
- Carrying heavy items regularly (farmer's carry, manual labor)
- Martial arts or combat training – builds explosive power
- High-protein diet + progressive overload training

### 2. Perception 👁
*Sharpen your awareness, observation, and sensory input processing.*

**Example Activities:**
- Meditation & mindfulness – trains focus and sensory awareness
- Playing FPS or stealth video games – improves visual reaction times
- Practicing photography or birdwatching – encourages noticing detail
- Driving in challenging conditions – improves alertness
- Learning a new language or musical instrument – enhances auditory perception

### 3. Endurance 🏃
*Boost your stamina, cardiovascular health, and stress resistance.*

**Example Activities:**
- Long-distance running, cycling, or swimming
- Hiking with a backpack (rucking)
- Interval and circuit training (HIIT)
- Cold showers or sauna use – stress adaptation training
- Consistent sleep, hydration, and a balanced diet

### 4. Charisma 🗣
*Improve your ability to influence, lead, and connect socially.*

**Example Activities:**
- Public speaking or improv classes (e.g., Toastmasters)
- Active listening and empathy exercises (e.g., roleplaying)
- Daily social challenges (e.g., talk to 1 stranger/day)
- Mirror practice or video-recorded self-analysis
- Reading psychology or persuasion books

### 5. Intelligence 🧠
*Enhance problem-solving, learning, and memory skills.*

**Example Activities:**
- Reading nonfiction and classic literature regularly
- Learning new skills or subjects online (math, logic, philosophy)
- Playing brain-training games (chess, Sudoku, strategy games)
- Journaling or teaching what you learn to others
- Programming, coding, or solving logic puzzles

### 6. Agility 🤸
*Boost coordination, reflexes, flexibility, and control over your body.*

**Example Activities:**
- Parkour, gymnastics, or calisthenics
- Martial arts and boxing training
- Dance (ballet, hip hop, salsa)
- Jump rope or ladder drills
- Reflex games or VR rhythm games (e.g., Beat Saber)

### 7. Luck 🍀
*Position yourself for opportunity and reduce risk.*

**Example Activities:**
- Expand your social network – more connections = more opportunities
- Say "yes" to new experiences – explore randomness
- Keep a gratitude or "lucky moments" journal
- Practice risk assessment and decision-making
- Develop good habits (punctuality, preparedness)

---

## 📱 App Structure & Navigation

### Bottom Navigation (5 Tabs)
1. **📊 SPECIAL** (Home) - Main attribute bars and quick entry
2. **📝 Planner** - Create and manage future tasks
3. **📚 History** - Past entries and progress analytics
4. **👤 Profile** - User stats, achievements, friends
5. **⚙️ Settings** - App preferences and premium features

### Core User Flows

#### Quick Entry Flow (Completed Activities)
1. Tap quick entry button on SPECIAL screen
2. Type activity description
3. AI processes and suggests **base** attribute increases (e.g., Strength +3, Endurance +1)
4. **Dynamic calculation** adjusts points based on current balance and level
5. Show final adjusted points to user (e.g., Strength +1, Endurance +1)
6. User confirms or manually adjusts final points
7. EXP calculation and attribute increase with animations

#### Example of Dynamic Adjustment:
**Base AI Output**: "Rock climbing" → Strength +3, Endurance +2, Agility +1

**User Stats**: Strength 45, Average 25, Level 10 (Cap: 75)
- Strength is 80% above average (45 vs 25)
- Average is 33% of cap (25/75), below 50% threshold
- **Result**: Strength +0 (blocked), Endurance +2, Agility +1

**User Notification**: "Your Strength is too high compared to other attributes. Focus on balanced growth!"

#### Planner Flow (Future Tasks)
1. Navigate to Planner tab
2. Create new task with description
3. AI analyzes and predicts attribute benefits
4. Set due date and priority
5. When completed, get full EXP rewards

---

## 🤖 AI Integration Strategy

### Multi-Attribute Classification
- **Primary Attribute**: Main focus (gets higher increase)
- **Secondary Attributes**: Supporting benefits (smaller increases)
- **Dynamic Point Allocation**: Points reduced based on attribute imbalance
- **Cap Prevention**: Cannot max attributes if average is below 50% of cap

### Dynamic Attribute Point Calculation
```javascript
const calculateAttributePoints = (basePoints, currentStats, userLevel) => {
  const attributeCap = 30 + (userLevel - 1) * 5;
  const allAttributes = Object.values(currentStats);
  const average = allAttributes.reduce((a, b) => a + b) / allAttributes.length;
  const averagePercentage = average / attributeCap;
  
  const adjustedPoints = {};
  
  Object.entries(basePoints).forEach(([attr, points]) => {
    if (points > 0) {
      const currentValue = currentStats[attr];
      const attributePercentage = currentValue / attributeCap;
      
      // Prevent capping if average is below 50%
      if (averagePercentage < 0.5 && currentValue >= (attributeCap * 0.9)) {
        adjustedPoints[attr] = 0; // Cannot increase high attributes when average is low
        return;
      }
      
      // Calculate reduction factor based on how high the attribute is vs average
      const deviationFromAverage = currentValue - average;
      let reductionFactor = 1.0;
      
      if (deviationFromAverage > 0) {
        // Exponential reduction for attributes above average
        const deviationRatio = deviationFromAverage / average;
        reductionFactor = Math.max(0.1, Math.pow(0.6, deviationRatio));
        
        // Additional severe reduction if attribute is very high
        if (attributePercentage > 0.7) {
          reductionFactor *= 0.3; // 70% reduction for very high attributes
        } else if (attributePercentage > 0.5) {
          reductionFactor *= 0.6; // 40% reduction for moderately high attributes
        }
      }
      
      // Apply reduction and round down
      adjustedPoints[attr] = Math.floor(points * reductionFactor);
    } else {
      adjustedPoints[attr] = 0;
    }
  });
  
  return adjustedPoints;
};
```

### Local AI Model Training
- Train a custom model with SPECIAL-specific dataset
- Use the real-world examples above as training data
- Implement on-device inference for privacy and speed
- Fallback to cloud API for complex cases
- **Post-process AI output** through dynamic point calculation

### AI Prompt Strategy
```
Analyze this activity and determine base SPECIAL attribute increases:

Activity: "{user_entry}"

Consider these real-world mappings:
[Include the 7 SPECIAL categories with examples]

Return base points (before balance adjustments):
{
  "attributes": {
    "strength": 0-5,
    "perception": 0-5,
    "endurance": 0-5,
    "charisma": 0-5,
    "intelligence": 0-5,
    "agility": 0-5,
    "luck": 0-5
  },
  "confidence": 0.0-1.0,
  "reasoning": "brief_explanation"
}

Note: These are base points. Final allocation will be adjusted based on user's current attribute balance.
```

---

## 💰 Monetization Strategy (One-Time Purchase)

### Free Version
- ✅ Basic SPECIAL tracking (up to level 10)
- ✅ 3 entries per day
- ✅ Basic achievements
- ✅ Simple planner (5 active tasks)
- ✅ Basic profile customization

### Premium Version ($9.99 One-Time Purchase)
- ✅ Unlimited level progression
- ✅ Unlimited entries and planned tasks
- ✅ Advanced analytics and insights
- ✅ Friends system and leaderboards
- ✅ Premium themes and customization
- ✅ Export data functionality
- ✅ Exclusive achievements and titles
- ✅ Priority AI processing
- ✅ Detailed progress reports

### Reward-Based Premium Access
- Complete weekly challenges → 7 days premium
- Reach level milestones → 30 days premium
- Maintain streaks → 14 days premium
- Unlock achievements → Cosmetic rewards

---

## 🎮 Gamification Features

### Friends & Social Competition
- Add friends by username or code
- Compare weekly/monthly attribute gains
- Friendly challenges and competitions
- Leaderboards for different metrics
- Share achievements and milestones

### Achievement System Examples
- **"Iron Will"** - Reach Strength 25
- **"Eagle Eye"** - Reach Perception 20
- **"Marathon Runner"** - Reach Endurance 30
- **"Silver Tongue"** - Reach Charisma 25
- **"Genius"** - Reach Intelligence 35
- **"Ninja"** - Reach Agility 20
- **"Lucky Charm"** - Reach Luck 15
- **"Consistent"** - 30-day entry streak
- **"Balanced"** - All attributes within 5 points

### Reward Types
- **Temporary Premium**: 7-30 days of premium features
- **Cosmetic Unlocks**: New themes, bar colors, profile frames
- **Titles**: Display special titles on profile
- **Badges**: Visual achievement indicators

---

## 📊 EXP & Progression System

### Multi-Attribute EXP Calculation
```javascript
const calculateEXP = (attributeIncreases, currentStats) => {
  let totalEXP = 0;
  
  Object.entries(attributeIncreases).forEach(([attr, increase]) => {
    if (increase > 0) {
      const currentValue = currentStats[attr];
      const allAttributes = Object.values(currentStats);
      const average = allAttributes.reduce((a, b) => a + b) / allAttributes.length;
      const deviation = Math.abs(currentValue - average);
      const standardDev = calculateStandardDeviation(allAttributes);
      
      // Base EXP per point
      const baseEXPPerPoint = 15;
      
      // More aggressive balance penalty (0.1 to 1.0 multiplier)
      // If attribute is way above average, make it much harder to increase
      const deviationRatio = deviation / (standardDev + 1); // +1 to avoid division by zero
      const balancePenalty = Math.max(0.1, Math.pow(0.5, deviationRatio));
      
      // Additional penalty for very high attributes
      const highAttributePenalty = currentValue > (average * 1.5) ? 0.5 : 1.0;
      
      // Calculate EXP for this attribute
      const expForAttribute = Math.floor(
        baseEXPPerPoint * increase * balancePenalty * highAttributePenalty
      );
      totalEXP += expForAttribute;
    }
  });
  
  return totalEXP;
};
```

### Level Progression & Attribute Caps
- **Starting Cap**: 30 points per attribute at Level 1
- **Cap Increase**: +5 points per attribute for each level gained
- **Formula**: `attributeCap = 30 + (userLevel - 1) * 5`

**Example Progression:**
- **Level 1**: Max 30 per attribute (210 total SPECIAL points)
- **Level 10**: Max 75 per attribute (525 total SPECIAL points)
- **Level 20**: Max 125 per attribute (875 total SPECIAL points)
- **Level 50**: Max 275 per attribute (1,925 total SPECIAL points)
- **Level 100**: Max 525 per attribute (3,675 total SPECIAL points)

### EXP Requirements for Leveling
```javascript
const getEXPRequiredForLevel = (level) => {
  // Exponential growth to make higher levels more challenging
  const baseEXP = 100;
  const growthFactor = 1.15;
  return Math.floor(baseEXP * Math.pow(growthFactor, level - 1));
};
```

**Example EXP Requirements:**
- **Level 1→2**: 100 EXP
- **Level 5→6**: 175 EXP  
- **Level 10→11**: 305 EXP
- **Level 20→21**: 1,637 EXP
- **Level 50→51**: 108,366 EXP

---

## 🗄 Database Schema

### Users Table
```sql
users (
  id: uuid PRIMARY KEY,
  email: text UNIQUE,
  username: text UNIQUE,
  display_name: text,
  avatar_url: text,
  level: integer DEFAULT 1,
  total_exp: integer DEFAULT 0,
  exp_to_next: integer DEFAULT 100,
  friend_code: text UNIQUE,
  is_premium: boolean DEFAULT false,
  premium_expires_at: timestamp,
  created_at: timestamp,
  updated_at: timestamp
)
```

### SPECIAL Stats Table
```sql
special_stats (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  strength: integer DEFAULT 1,
  perception: integer DEFAULT 1,
  endurance: integer DEFAULT 1,
  charisma: integer DEFAULT 1,
  intelligence: integer DEFAULT 1,
  agility: integer DEFAULT 1,
  luck: integer DEFAULT 1,
  -- Note: Attribute caps are calculated dynamically based on user level
  -- Formula: cap = 30 + (user_level - 1) * 5
  updated_at: timestamp
)
```

### Entries Table (Completed Activities)
```sql
entries (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  description: text NOT NULL,
  entry_type: text DEFAULT 'completed', -- 'completed' or 'planned_completed'
  ai_classification: jsonb, -- {strength: 3, endurance: 1}
  total_exp_gained: integer,
  created_at: timestamp,
  is_manual_override: boolean DEFAULT false
)
```

### Planned Tasks Table
```sql
planned_tasks (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  title: text NOT NULL,
  description: text,
  predicted_attributes: jsonb, -- AI prediction before completion
  due_date: date,
  priority: integer DEFAULT 1, -- 1-5
  is_completed: boolean DEFAULT false,
  completed_at: timestamp,
  created_at: timestamp
)
```

### Friends Table
```sql
friendships (
  id: uuid PRIMARY KEY,
  user_id: uuid REFERENCES users(id),
  friend_id: uuid REFERENCES users(id),
  status: text DEFAULT 'pending', -- 'pending', 'accepted', 'blocked'
  created_at: timestamp,
  UNIQUE(user_id, friend_id)
)
```

---

## 🛠 Technical Stack

### Frontend
- **Framework**: React Native (Expo managed workflow)
- **Animation**: React Native Reanimated 3 + Lottie
- **Navigation**: React Navigation 6
- **State Management**: Zustand (simpler than Redux)
- **UI Components**: NativeBase + Custom components
- **Charts**: Victory Native for analytics

### Backend & Services
- **Database**: Supabase (PostgreSQL with real-time features)
- **Authentication**: Supabase Auth (Google, Apple, email)
- **AI Service**: Custom model + OpenAI GPT-4 fallback
- **File Storage**: Supabase Storage
- **Push Notifications**: Expo Notifications
- **In-App Purchases**: RevenueCat

### Development Tools
- **Build Platform**: Expo EAS Build
- **Code Quality**: ESLint + Prettier + TypeScript
- **Testing**: Jest + React Native Testing Library
- **Analytics**: Mixpanel or PostHog

---

## 🚀 Development Roadmap

The development is organized into 5 phases with detailed plans in separate files:

### 📁 **Phase Files:**
- **[Phase 1: Core Foundation (8-10 weeks)](Phase1_Core_Foundation.md)** - MVP with basic SPECIAL tracking and quick-win enhancements
- **[Phase 2: AI Integration (6-8 weeks)](Phase2_AI_Integration.md)** - AI classification and smart features
- **[Phase 3: Planner & Social (4-5 weeks)](Phase3_Planner_Social.md)** - Task planning and community features
- **[Phase 4: Premium & Monetization (3-4 weeks)](Phase4_Premium_Monetization.md)** - Premium features and business model
- **[Phase 5: Polish & Launch (6-8 weeks)](Phase5_Polish_Launch.md)** - Final optimization and app store launch

**Total Development Time: 27-35 weeks (~7-9 months)**

## 🎯 **Enhanced Features by Phase**

### Phase 1 Quick Wins
- ✅ **Quick Templates**: Pre-made entries for common activities
- ✅ **Progress Photos**: Photo attachments to entries
- ✅ **Smart Weekly Focus**: AI suggests attribute focus
- ✅ **Streak Rewards**: Extra EXP for consistency

### Phase 2 Smart Features  
- ✅ **Habit Detection**: AI identifies user patterns
- ✅ **Apple Health Integration**: Auto-import and classify workouts
- ✅ **Smart Reminders**: Context-aware notifications
- ✅ **Progress Prediction**: Timeline forecasting

### Phase 3 Community Features
- ✅ **User-Generated Challenges**: Community-created challenges
- ✅ **Activity Database**: Crowdsourced activity verification
- ✅ **Accountability Partners**: Matched goal-focused partnerships
- ✅ **Success Stories**: Featured user transformations
- ✅ **Anonymous Sharing**: Support without identity exposure

### Phase 4 Premium Enhancements
- ✅ **Advanced Analytics**: Detailed insights and recommendations
- ✅ **Micro-Learning**: Daily tips and tutorials
- ✅ **Voice Entry**: Speech-to-text logging
- ✅ **Multiple Languages**: Localization support
- ✅ **Accessibility Features**: Inclusive design improvements

### Phase 5 Launch Features
- ✅ **Onboarding Optimization**: Smooth new user experience
- ✅ **Performance Monitoring**: Real-time app analytics
- ✅ **Marketing Website**: Professional landing page
- ✅ **Beta Testing Program**: Comprehensive user feedback
- ✅ **Community Management**: Social media and support

---

## 🎨 UI/UX Design Principles

### Visual Design
- **Color Scheme**: Fallout-inspired (terminal green, amber, vault blue)
- **Typography**: Futura-inspired fonts for that retro-future feel
- **Animations**: Smooth, satisfying feedback (bar fills, level ups)
- **Dark Mode**: Primary theme with optional light mode

### User Experience
- **Quick Actions**: Fast entry with minimal taps
- **Visual Feedback**: Clear progress indication and celebrations
- **Intuitive Navigation**: Familiar bottom tab pattern
- **Accessibility**: Screen reader support, color contrast, larger text options

### SPECIAL Bar Design
```javascript
<SpecialBar
  attribute="strength"
  current={12}
  max={25}
  fillColor="#00ff41"
  backgroundColor="#1a1a1a"
  animationDuration={1200}
  showNumbers={true}
  glowEffect={true}
/>
```

---

## 📈 Success Metrics & Analytics

### User Engagement
- Daily/Weekly/Monthly active users
- Average entries per user per day
- Time spent in app per session
- Feature adoption rates (planner vs quick entry)

### Social Features
- Friend invitations sent/accepted
- Social interactions frequency
- Leaderboard engagement
- Achievement unlock rates

### Business Metrics
- Free to premium conversion rate
- User retention (1-day, 7-day, 30-day)
- App store ratings and reviews
- Customer acquisition cost vs lifetime value

---

## 🔮 Future Enhancements

### Advanced Features
- **Habit Tracking**: Integrate with existing habit tracker patterns
- **Calendar Integration**: Sync with Google/Apple Calendar
- **Wearable Support**: Apple Watch/WearOS companion apps
- **Voice Entry**: Speech-to-text for hands-free logging
- **Photo Recognition**: AI analysis of workout/activity photos

### Community Features
- **Guilds/Teams**: Group challenges and competitions
- **Mentorship**: Connect experienced users with beginners
- **Content Sharing**: User-generated guides and tips
- **Events**: Community challenges and seasonal content

---

## ✅ Next Immediate Steps

1. **Review and finalize this plan** with your feedback
2. **Set up development environment** (Node.js, React Native, Expo CLI)
3. **Create project repository** with initial structure
4. **Design wireframes and mockups** for key screens
5. **Set up Supabase project** and initial database schema
6. **Begin Phase 1 development** with core components

---

*This plan provides a comprehensive roadmap for building the SPECIAL Tracker app while maintaining flexibility for adjustments based on user feedback and market response.* 