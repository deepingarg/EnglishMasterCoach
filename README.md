
# English Learning Platform

A comprehensive full-stack English learning application designed specifically for Indian students, featuring AI-powered speech analysis, gamified learning experiences, and progressive skill development.

## 🌟 Features

### Core Learning System
- **5-Level Progressive Framework**: Beginner to Advanced Excellence (0-3500+ XP)
- **15 Activity Types**: From basic pronunciation to professional communication
- **4-Dimensional Assessment**: Pronunciation, Fluency, Grammar, and Vocabulary scoring
- **Real-time Speech Analysis**: Advanced speech recognition with Indian accent support
- **Gamified Experience**: XP system, streaks, badges, and achievements

### Advanced Technology Integration
- **AI-Powered Tutor**: Interactive chat with contextual conversation practice
- **Speech Technology**: Web Speech API with MediaRecorder for audio analysis
- **Personalized Learning**: Adaptive recommendations based on performance analytics
- **Cultural Context**: Indian traditions, festivals, and social scenarios integration
- **Progress Tracking**: Multi-dimensional charts and comparative analysis

### Learning Levels

#### 🟢 Beginner Foundation (0-500 XP)
- Phonetic Alphabet Guide with IPA symbols
- Visual vocabulary cards (500+ basic words)
- Mother tongue support with Hindi translations
- Slow speech practice mode

#### 🔵 Elementary Building (500-1000 XP)
- Grammar game center with interactive exercises
- Daily conversation simulator
- Pronunciation comparison with native speakers
- Progress tracking with detailed analytics

#### 🟡 Intermediate Development (1000-2000 XP)
- AI debate partner for topic discussions
- Story builder workshop
- Cultural context learning modules
- Fluency challenges with timing

#### 🟠 Upper-Intermediate Mastery (2000-3500 XP)
- Professional scenario practice
- Academic writing assistance
- Interview simulator with AI feedback
- Presentation coach with timing

#### 🔴 Advanced Excellence (3500+ XP)
- Executive communication training
- Research presentation tools
- IELTS/TOEFL exam preparation
- Global connect with international speakers

## 🏗️ Architecture

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and optimized builds
- **Tailwind CSS** with shadcn/ui components
- **Wouter** for client-side routing
- **TanStack Query** for server state management
- **Recharts** for data visualization

### Backend
- **Express.js** with TypeScript
- **PostgreSQL** with Drizzle ORM
- **RESTful API** design
- **Session management** with Express Session
- **Real-time feedback** through WebSocket support

### Development Tools
- **tsx** for TypeScript execution
- **ESBuild** for production bundling
- **Drizzle Kit** for database migrations
- **Type-safe** development with complete TypeScript coverage

## 🚀 Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database
- Modern web browser with Speech API support

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
Create a `.env` file with your database configuration:
```env
DATABASE_URL=your_postgresql_connection_string
NODE_ENV=development
```

3. **Set up the database**:
```bash
npm run db:push
```

4. **Start the development server**:
```bash
npm run dev
```

The application will be available at `http://localhost:5000`

### Available Scripts

- `npm run dev` - Start development server with hot reloading
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run check` - Run TypeScript type checking
- `npm run db:push` - Push database schema changes

## 📁 Project Structure

```
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   ├── activity-card.tsx
│   │   │   ├── ai-tutor.tsx
│   │   │   ├── speech-recorder.tsx
│   │   │   └── ...
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility libraries
│   │   └── hooks/          # Custom React hooks
├── server/                 # Backend Express application
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Database operations
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Zod validation schemas
└── migrations/             # Database migration files
```

## 🎯 Core Activities

### Speaking & Pronunciation
- **Read Aloud**: Passage reading with pronunciation scoring
- **Picture Talk**: Describe images and scenarios
- **Pronunciation Drills**: Targeted phonetic practice
- **Tongue Twisters**: Fun pronunciation challenges

### Communication Skills
- **Daily Chat**: Everyday conversation practice
- **Debate Arena**: Structured argumentation practice
- **Interview Prep**: Job and admission interview simulation
- **Role Play**: Interactive scenario-based learning

### Academic & Professional
- **News Reading**: Current events discussion
- **Academic Presentations**: Formal presentation skills
- **Business Communication**: Workplace scenarios
- **Grammar Practice**: Interactive grammar exercises

## 📊 Assessment System

### Real-time Scoring
- **Pronunciation**: Accuracy and clarity assessment
- **Fluency**: Natural speech flow and rhythm
- **Grammar**: Sentence structure and usage
- **Vocabulary**: Word choice and variety

### Progress Tracking
- Weekly performance charts
- Skill development analytics
- Weakness identification
- Strength recognition
- Predictive learning insights

## 🏆 Gamification Features

### XP & Levels
- Progressive XP system with level unlocking
- Skill-based advancement requirements
- Milestone celebrations and rewards

### Achievements & Badges
- 10+ achievement categories
- Progressive badge unlocking
- Special cultural and festival badges

### Streaks & Bonuses
- Daily practice streak tracking
- XP multipliers (1.2x to 1.5x)
- Weekly challenge goals

## 🌐 Deployment

### Production Build
```bash
npm run build
```

### Environment Configuration
- Set `NODE_ENV=production`
- Configure database connection
- Set up proper CORS settings

### Replit Deployment
The application is configured for seamless deployment on Replit with automatic scaling and optimized performance.

## 🔧 Technology Stack

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL connection
- **drizzle-orm**: Type-safe ORM
- **@radix-ui/***: Headless UI primitives
- **@tanstack/react-query**: Server state management
- **express**: Backend framework
- **react**: Frontend library

### Development Dependencies
- **typescript**: Static type checking
- **vite**: Build tool and dev server
- **tailwindcss**: Utility-first CSS
- **drizzle-kit**: Database toolkit
- **tsx**: TypeScript execution

## 📱 Browser Support

- Chrome/Chromium (recommended for Speech API)
- Firefox
- Safari
- Edge

**Note**: Speech recognition features work best in Chrome-based browsers.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run type checking: `npm run check`
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🎓 Educational Context

This platform is specifically designed for Indian students learning English, incorporating:
- Cultural context and scenarios relevant to Indian society
- Progressive curriculum aligned with Indian education standards
- Support for multiple learning styles and proficiency levels
- Integration of traditional pedagogical approaches with modern AI technology

---

**Built with ❤️ for English learners in India**
