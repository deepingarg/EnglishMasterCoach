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

    // Create sample activities
    const sampleActivities: Activity[] = [
      {
        id: 1,
        name: "Read Aloud",
        type: "read_aloud",
        description: "Practice reading passages from your textbook with perfect pronunciation and fluency.",
        duration: 15,
        xpReward: 50,
        icon: "fas fa-book-open",
      },
      {
        id: 2,
        name: "Picture Talk",
        type: "picture_talk",
        description: "Describe pictures and scenes to improve your vocabulary and storytelling skills.",
        duration: 10,
        xpReward: 40,
        icon: "fas fa-image",
      },
      {
        id: 3,
        name: "Daily Chat",
        type: "daily_chat",
        description: "Practice everyday conversations with AI to build confidence in real situations.",
        duration: 20,
        xpReward: 60,
        icon: "fas fa-comments",
      },
    ];
    sampleActivities.forEach(activity => this.activities.set(activity.id, activity));

    // Create sample lesson
    const sampleLesson: Lesson = {
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
    };
    this.lessons.set(1, sampleLesson);

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
      ...insertUser,
      id,
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
    const course: Course = { ...insertCourse, id };
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
    const lesson: Lesson = { ...insertLesson, id };
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
      ...insertProgress,
      id,
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
    const badge: Badge = { ...insertBadge, id };
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
