import { pgTable, text, serial, integer, boolean, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  name: text("name").notNull(),
  level: text("level").notNull().default("Beginner"), // Beginner, Intermediate, Advanced
  xp: integer("xp").notNull().default(0),
  streak: integer("streak").notNull().default(0),
  confidenceScore: integer("confidence_score").notNull().default(0),
  skills: json("skills").$type<{
    pronunciation: number;
    fluency: number;
    grammar: number;
    vocabulary: number;
  }>().notNull().default({ pronunciation: 0, fluency: 0, grammar: 0, vocabulary: 0 }),
  currentDay: integer("current_day").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Courses table
export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  level: text("level").notNull(), // Beginner, Intermediate, Advanced
  totalDays: integer("total_days").notNull().default(30),
  topics: json("topics").$type<string[]>().notNull(),
});

// Daily lessons table
export const lessons = pgTable("lessons", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").notNull(),
  day: integer("day").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  topic: text("topic").notNull(),
  content: json("content").$type<{
    prompt: string;
    sampleText?: string;
    imageUrl?: string;
    difficulty: string;
  }>().notNull(),
  xpReward: integer("xp_reward").notNull().default(50),
});

// Activities table
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(), // read_aloud, picture_talk, daily_chat
  description: text("description").notNull(),
  duration: integer("duration").notNull(), // in minutes
  xpReward: integer("xp_reward").notNull(),
  icon: text("icon").notNull(),
});

// User progress table
export const userProgress = pgTable("user_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  lessonId: integer("lesson_id").notNull(),
  activityId: integer("activity_id"),
  completed: boolean("completed").notNull().default(false),
  score: json("score").$type<{
    pronunciation: number;
    fluency: number;
    grammar: number;
    vocabulary: number;
    overall: number;
  }>(),
  feedback: text("feedback"),
  recordingUrl: text("recording_url"),
  completedAt: timestamp("completed_at"),
});

// Badges table
export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  requirement: text("requirement").notNull(),
  xpThreshold: integer("xp_threshold"),
});

// User badges table
export const userBadges = pgTable("user_badges", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  badgeId: integer("badge_id").notNull(),
  earnedAt: timestamp("earned_at").notNull().defaultNow(),
});

// Assessment results table
export const assessments = pgTable("assessments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  type: text("type").notNull(), // initial, progress, final
  scores: json("scores").$type<{
    pronunciation: number;
    fluency: number;
    grammar: number;
    vocabulary: number;
    overall: number;
  }>().notNull(),
  feedback: text("feedback").notNull(),
  recommendedLevel: text("recommended_level").notNull(),
  completedAt: timestamp("completed_at").notNull().defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  completedAt: true,
});

export const insertBadgeSchema = createInsertSchema(badges).omit({
  id: true,
});

export const insertUserBadgeSchema = createInsertSchema(userBadges).omit({
  id: true,
  earnedAt: true,
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  completedAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Course = typeof courses.$inferSelect;
export type InsertCourse = z.infer<typeof insertCourseSchema>;

export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;

export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;

export type UserBadge = typeof userBadges.$inferSelect;
export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;

export type Assessment = typeof assessments.$inferSelect;
export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
