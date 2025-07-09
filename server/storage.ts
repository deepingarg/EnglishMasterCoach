import {
  users,
  courses,
  lessons,
  activities,
  userProgress,
  badges,
  userBadges,
  assessments,
  type User,
  type InsertUser,
  type Course,
  type InsertCourse,
  type Lesson,
  type InsertLesson,
  type Activity,
  type InsertActivity,
  type UserProgress,
  type InsertUserProgress,
  type Badge,
  type InsertBadge,
  type UserBadge,
  type InsertUserBadge,
  type Assessment,
  type InsertAssessment,
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;

  // Course operations
  getCourses(): Promise<Course[]>;
  getCoursesByLevel(level: string): Promise<Course[]>;
  createCourse(course: InsertCourse): Promise<Course>;

  // Lesson operations
  getLessonsByCourse(courseId: number): Promise<Lesson[]>;
  getLesson(id: number): Promise<Lesson | undefined>;
  getLessonByDay(courseId: number, day: number): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;

  // Activity operations
  getActivities(): Promise<Activity[]>;
  getActivity(id: number): Promise<Activity | undefined>;
  createActivity(activity: InsertActivity): Promise<Activity>;

  // User progress operations
  getUserProgress(userId: number): Promise<UserProgress[]>;
  getUserProgressByLesson(userId: number, lessonId: number): Promise<UserProgress | undefined>;
  createUserProgress(progress: InsertUserProgress): Promise<UserProgress>;
  updateUserProgress(id: number, updates: Partial<UserProgress>): Promise<UserProgress | undefined>;

  // Badge operations
  getBadges(): Promise<Badge[]>;
  getUserBadges(userId: number): Promise<(UserBadge & { badge: Badge })[]>;
  createBadge(badge: InsertBadge): Promise<Badge>;
  awardBadge(userBadge: InsertUserBadge): Promise<UserBadge>;

  // Assessment operations
  getUserAssessments(userId: number): Promise<Assessment[]>;
  createAssessment(assessment: InsertAssessment): Promise<Assessment>;
  getLatestAssessment(userId: number): Promise<Assessment | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private lessons: Map<number, Lesson>;
  private activities: Map<number, Activity>;
  private userProgress: Map<number, UserProgress>;
  private badges: Map<number, Badge>;
  private userBadges: Map<number, UserBadge>;
  private assessments: Map<number, Assessment>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.lessons = new Map();
    this.activities = new Map();
    this.userProgress = new Map();
    this.badges = new Map();
    this.userBadges = new Map();
    this.assessments = new Map();
    this.currentId = 1;
    this.initializeData();
  }

  private initializeData() {
    // Create sample user
    const sampleUser: User = {
      id: 1,
      username: "arjun_kumar",
      name: "Arjun Kumar",
      level: "Intermediate",
      xp: 1250,
      streak: 7,
      confidenceScore: 78,
      skills: {
        pronunciation: 82,
        fluency: 75,
        grammar: 68,
        vocabulary: 79,
      },
      currentDay: 12,
      createdAt: new Date(),
    };
    this.users.set(1, sampleUser);

    // Create sample course
    const sampleCourse: Course = {
      id: 1,
      title: "30-Day Speaking Course",
      description: "Structured daily lessons aligned with CBSE curriculum",
      level: "Intermediate",
      totalDays: 30,
      topics: ["Family & Friends", "School Life", "Festivals", "Daily Routine", "Hobbies"],
    };
    this.courses.set(1, sampleCourse);

    // Create sample activities with advanced features
    const sampleActivities: Activity[] = [
      {
        id: 1,
        name: "Read Aloud",
        type: "read_aloud",
        description: "Practice reading CBSE textbook passages with perfect pronunciation and fluency tracking.",
        duration: 15,
        xpReward: 50,
        icon: "fas fa-book-open",
      },
      {
        id: 2,
        name: "Picture Talk",
        type: "picture_talk",
        description: "AI-powered image analysis with vocabulary enhancement and storytelling practice.",
        duration: 10,
        xpReward: 40,
        icon: "fas fa-image",
      },
      {
        id: 3,
        name: "Daily Chat",
        type: "daily_chat",
        description: "Interactive AI conversations with real-time grammar correction and cultural context.",
        duration: 20,
        xpReward: 60,
        icon: "fas fa-comments",
      },
      {
        id: 4,
        name: "Story Creation",
        type: "story_telling",
        description: "Create imaginative stories with AI prompts to boost creativity and narrative skills.",
        duration: 25,
        xpReward: 80,
        icon: "fas fa-book",
      },
      {
        id: 5,
        name: "Pronunciation Master",
        type: "pronunciation_drill",
        description: "Advanced phonetic training with Indian accent adaptation and IPA guidance.",
        duration: 12,
        xpReward: 45,
        icon: "fas fa-volume-up",
      },
      {
        id: 6,
        name: "Debate Arena",
        type: "debate_practice",
        description: "Practice argumentative skills on current topics with structured debate format.",
        duration: 30,
        xpReward: 100,
        icon: "fas fa-gavel",
      },
      {
        id: 7,
        name: "Poetry Recital",
        type: "poetry_recitation",
        description: "Master rhythm and emotion through classical and modern poetry recitation.",
        duration: 18,
        xpReward: 70,
        icon: "fas fa-feather-alt",
      },
      {
        id: 8,
        name: "News Anchor",
        type: "news_reading",
        description: "Practice formal presentation skills with current affairs and news reading.",
        duration: 22,
        xpReward: 75,
        icon: "fas fa-newspaper",
      },
      {
        id: 9,
        name: "Interview Prep",
        type: "interview_practice",
        description: "Prepare for school interviews and competitions with mock sessions.",
        duration: 28,
        xpReward: 90,
        icon: "fas fa-user-tie",
      },
      {
        id: 10,
        name: "Tongue Twisters",
        type: "tongue_twisters",
        description: "Fun pronunciation challenges to improve articulation and speech clarity.",
        duration: 8,
        xpReward: 35,
        icon: "fas fa-brain",
      }
    ];
    sampleActivities.forEach(activity => this.activities.set(activity.id, activity));

    // Create sample lessons
    const sampleLessons: Lesson[] = [
      {
        id: 1,
        courseId: 1,
        day: 12,
        title: "Describe Your Favourite Festival",
        description: "Tell us about your favourite Indian festival in 5-7 sentences. Focus on traditions, food, and celebrations!",
        topic: "Festivals",
        content: {
          prompt: "Describe your favourite festival in detail",
          sampleText: "Diwali is my favourite festival because it brings families together and fills our homes with light and joy.",
          difficulty: "intermediate",
        },
        xpReward: 65,
      },
      {
        id: 2,
        courseId: 1,
        day: 13,
        title: "My School Life",
        description: "Talk about your daily routine at school, your favorite subjects, and your friends.",
        topic: "School Life",
        content: {
          prompt: "Tell me about your school life and what you enjoy most",
          sampleText: "I go to school every day at 8 AM. My favorite subject is English because I love reading stories.",
          difficulty: "beginner",
        },
        xpReward: 50,
      },
      {
        id: 3,
        courseId: 1,
        day: 14,
        title: "My Family",
        description: "Introduce your family members and describe what makes them special.",
        topic: "Family & Friends",
        content: {
          prompt: "Introduce your family members and tell us about them",
          sampleText: "I have a loving family. My father is a teacher and my mother is a doctor. They both help me with my studies.",
          difficulty: "beginner",
        },
        xpReward: 50,
      },
      {
        id: 4,
        courseId: 1,
        day: 15,
        title: "My Hobbies",
        description: "Talk about your favorite hobbies and activities you enjoy in your free time.",
        topic: "Hobbies",
        content: {
          prompt: "Share your hobbies and what you like to do for fun",
          sampleText: "I love reading books and playing cricket with my friends. Reading helps me learn new things.",
          difficulty: "intermediate",
        },
        xpReward: 60,
      }
    ];
    sampleLessons.forEach(lesson => this.lessons.set(lesson.id, lesson));

    // Create sample badges
    const sampleBadges: Badge[] = [
      {
        id: 1,
        name: "Fluency Master",
        description: "Completed 5 speaking tasks",
        icon: "fas fa-medal",
        requirement: "Complete 5 speaking tasks",
        xpThreshold: 250,
      },
      {
        id: 2,
        name: "Voice Champion",
        description: "Perfect pronunciation score",
        icon: "fas fa-microphone",
        requirement: "Achieve 90% or higher pronunciation score",
        xpThreshold: null,
      },
    ];
    sampleBadges.forEach(badge => this.badges.set(badge.id, badge));

    // Award sample badges to user
    const sampleUserBadges: UserBadge[] = [
      {
        id: 1,
        userId: 1,
        badgeId: 1,
        earnedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      },
      {
        id: 2,
        userId: 1,
        badgeId: 2,
        earnedAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // yesterday
      },
    ];
    sampleUserBadges.forEach(userBadge => this.userBadges.set(userBadge.id, userBadge));

    this.currentId = 10; // Start fresh IDs from here
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = {
      id,
      username: insertUser.username,
      name: insertUser.name,
      level: insertUser.level || "Beginner",
      xp: insertUser.xp || 0,
      streak: insertUser.streak || 0,
      confidenceScore: insertUser.confidenceScore || 0,
      skills: insertUser.skills || { pronunciation: 0, fluency: 0, grammar: 0, vocabulary: 0 },
      currentDay: insertUser.currentDay || 1,
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...updates };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async getCourses(): Promise<Course[]> {
    return Array.from(this.courses.values());
  }

  async getCoursesByLevel(level: string): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.level === level);
  }

  async createCourse(insertCourse: InsertCourse): Promise<Course> {
    const id = this.currentId++;
    const course: Course = { 
      id,
      title: insertCourse.title,
      description: insertCourse.description,
      level: insertCourse.level,
      totalDays: insertCourse.totalDays || 30,
      topics: insertCourse.topics as string[]
    };
    this.courses.set(id, course);
    return course;
  }

  async getLessonsByCourse(courseId: number): Promise<Lesson[]> {
    return Array.from(this.lessons.values()).filter(lesson => lesson.courseId === courseId);
  }

  async getLesson(id: number): Promise<Lesson | undefined> {
    return this.lessons.get(id);
  }

  async getLessonByDay(courseId: number, day: number): Promise<Lesson | undefined> {
    return Array.from(this.lessons.values()).find(
      lesson => lesson.courseId === courseId && lesson.day === day
    );
  }

  async createLesson(insertLesson: InsertLesson): Promise<Lesson> {
    const id = this.currentId++;
    const lesson: Lesson = { 
      id,
      courseId: insertLesson.courseId,
      day: insertLesson.day,
      title: insertLesson.title,
      description: insertLesson.description,
      topic: insertLesson.topic,
      content: {
        prompt: insertLesson.content.prompt,
        sampleText: typeof insertLesson.content.sampleText === 'string' ? insertLesson.content.sampleText : undefined,
        imageUrl: typeof insertLesson.content.imageUrl === 'string' ? insertLesson.content.imageUrl : undefined,
        difficulty: insertLesson.content.difficulty
      },
      xpReward: insertLesson.xpReward || 50
    };
    this.lessons.set(id, lesson);
    return lesson;
  }

  async getActivities(): Promise<Activity[]> {
    return Array.from(this.activities.values());
  }

  async getActivity(id: number): Promise<Activity | undefined> {
    return this.activities.get(id);
  }

  async createActivity(insertActivity: InsertActivity): Promise<Activity> {
    const id = this.currentId++;
    const activity: Activity = { ...insertActivity, id };
    this.activities.set(id, activity);
    return activity;
  }

  async getUserProgress(userId: number): Promise<UserProgress[]> {
    return Array.from(this.userProgress.values()).filter(progress => progress.userId === userId);
  }

  async getUserProgressByLesson(userId: number, lessonId: number): Promise<UserProgress | undefined> {
    return Array.from(this.userProgress.values()).find(
      progress => progress.userId === userId && progress.lessonId === lessonId
    );
  }

  async createUserProgress(insertProgress: InsertUserProgress): Promise<UserProgress> {
    const id = this.currentId++;
    const progress: UserProgress = {
      id,
      userId: insertProgress.userId,
      lessonId: insertProgress.lessonId,
      activityId: insertProgress.activityId || null,
      completed: insertProgress.completed || false,
      score: insertProgress.score || null,
      feedback: insertProgress.feedback || null,
      recordingUrl: insertProgress.recordingUrl || null,
      completedAt: insertProgress.completed ? new Date() : null,
    };
    this.userProgress.set(id, progress);
    return progress;
  }

  async updateUserProgress(id: number, updates: Partial<UserProgress>): Promise<UserProgress | undefined> {
    const progress = this.userProgress.get(id);
    if (!progress) return undefined;
    
    const updatedProgress = {
      ...progress,
      ...updates,
      completedAt: updates.completed ? new Date() : progress.completedAt,
    };
    this.userProgress.set(id, updatedProgress);
    return updatedProgress;
  }

  async getBadges(): Promise<Badge[]> {
    return Array.from(this.badges.values());
  }

  async getUserBadges(userId: number): Promise<(UserBadge & { badge: Badge })[]> {
    const userBadgesList = Array.from(this.userBadges.values()).filter(ub => ub.userId === userId);
    return userBadgesList.map(ub => ({
      ...ub,
      badge: this.badges.get(ub.badgeId)!,
    }));
  }

  async createBadge(insertBadge: InsertBadge): Promise<Badge> {
    const id = this.currentId++;
    const badge: Badge = { 
      id,
      name: insertBadge.name,
      description: insertBadge.description,
      icon: insertBadge.icon,
      requirement: insertBadge.requirement,
      xpThreshold: insertBadge.xpThreshold || null
    };
    this.badges.set(id, badge);
    return badge;
  }

  async awardBadge(insertUserBadge: InsertUserBadge): Promise<UserBadge> {
    const id = this.currentId++;
    const userBadge: UserBadge = { ...insertUserBadge, id, earnedAt: new Date() };
    this.userBadges.set(id, userBadge);
    return userBadge;
  }

  async getUserAssessments(userId: number): Promise<Assessment[]> {
    return Array.from(this.assessments.values()).filter(assessment => assessment.userId === userId);
  }

  async createAssessment(insertAssessment: InsertAssessment): Promise<Assessment> {
    const id = this.currentId++;
    const assessment: Assessment = { ...insertAssessment, id, completedAt: new Date() };
    this.assessments.set(id, assessment);
    return assessment;
  }

  async getLatestAssessment(userId: number): Promise<Assessment | undefined> {
    const userAssessments = await this.getUserAssessments(userId);
    return userAssessments.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())[0];
  }
}

export const storage = new MemStorage();
