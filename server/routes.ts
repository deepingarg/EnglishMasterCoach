import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserProgressSchema, insertAssessmentSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get current user (simplified - in production would use proper auth)
  app.get("/api/user", async (req, res) => {
    try {
      const user = await storage.getUser(1); // Demo user ID
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Update user profile
  app.patch("/api/user", async (req, res) => {
    try {
      const updates = req.body;
      const user = await storage.updateUser(1, updates);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Failed to update user" });
    }
  });

  // Get courses
  app.get("/api/courses", async (req, res) => {
    try {
      const level = req.query.level as string;
      const courses = level 
        ? await storage.getCoursesByLevel(level)
        : await storage.getCourses();
      res.json(courses);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch courses" });
    }
  });

  // Get today's lesson
  app.get("/api/lesson/today", async (req, res) => {
    try {
      const user = await storage.getUser(1);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const lesson = await storage.getLessonByDay(1, user.currentDay); // Assuming course ID 1
      if (!lesson) {
        return res.status(404).json({ message: "No lesson found for today" });
      }
      
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch today's lesson" });
    }
  });

  // Get specific lesson
  app.get("/api/lesson/:lessonId", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const lesson = await storage.getLesson(lessonId);
      
      if (!lesson) {
        return res.status(404).json({ message: "Lesson not found" });
      }
      
      res.json(lesson);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch lesson" });
    }
  });

  // Get specific activity
  app.get("/api/activity/:activityId", async (req, res) => {
    try {
      const activityId = parseInt(req.params.activityId);
      const activity = await storage.getActivity(activityId);
      
      if (!activity) {
        return res.status(404).json({ message: "Activity not found" });
      }
      
      res.json(activity);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activity" });
    }
  });

  // Get activities
  app.get("/api/activities", async (req, res) => {
    try {
      const activities = await storage.getActivities();
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch activities" });
    }
  });

  // Get user progress
  app.get("/api/user/progress", async (req, res) => {
    try {
      const progress = await storage.getUserProgress(1);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user progress" });
    }
  });

  // Submit lesson progress
  app.post("/api/lesson/:lessonId/progress", async (req, res) => {
    try {
      const lessonId = parseInt(req.params.lessonId);
      const progressData = insertUserProgressSchema.parse({
        ...req.body,
        userId: 1,
        lessonId,
      });
      
      const progress = await storage.createUserProgress(progressData);
      
      // Update user XP and skills if lesson completed
      if (progress.completed && progress.score) {
        const user = await storage.getUser(1);
        if (user) {
          const lesson = await storage.getLesson(lessonId);
          const xpIncrease = lesson?.xpReward || 50;
          
          await storage.updateUser(1, {
            xp: user.xp + xpIncrease,
            skills: {
              pronunciation: Math.max(user.skills.pronunciation, progress.score.pronunciation),
              fluency: Math.max(user.skills.fluency, progress.score.fluency),
              grammar: Math.max(user.skills.grammar, progress.score.grammar),
              vocabulary: Math.max(user.skills.vocabulary, progress.score.vocabulary),
            },
            confidenceScore: Math.round(
              (progress.score.pronunciation + progress.score.fluency + 
               progress.score.grammar + progress.score.vocabulary) / 4
            ),
          });
        }
      }
      
      res.json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to submit progress" });
    }
  });

  // Submit speech assessment
  app.post("/api/assess-speech", async (req, res) => {
    try {
      const { transcript, activityType, duration } = req.body;
      
      if (!transcript) {
        return res.status(400).json({ message: "Transcript is required" });
      }

      // Simulate speech analysis (in production, this would use actual AI/ML services)
      const scores = {
        pronunciation: Math.floor(Math.random() * 30) + 70, // 70-100
        fluency: Math.floor(Math.random() * 30) + 70,
        grammar: Math.floor(Math.random() * 30) + 70,
        vocabulary: Math.floor(Math.random() * 30) + 70,
        overall: 0,
      };
      
      scores.overall = Math.round(
        (scores.pronunciation + scores.fluency + scores.grammar + scores.vocabulary) / 4
      );

      // Generate feedback based on scores
      let feedback = "Great job! ";
      if (scores.pronunciation < 80) {
        feedback += "Try to focus on clearer pronunciation. ";
      }
      if (scores.fluency < 80) {
        feedback += "Practice speaking at a steady pace. ";
      }
      if (scores.grammar < 80) {
        feedback += "Review basic grammar rules. ";
      }
      if (scores.vocabulary < 80) {
        feedback += "Try to use more varied vocabulary. ";
      }
      
      feedback += "Keep practicing to improve further!";

      // Add Hindi support for encouragement
      if (scores.overall >= 80) {
        feedback += " बहुत अच्छा! (Very good!)";
      } else {
        feedback += " अभ्यास करते रहें! (Keep practicing!)";
      }

      const assessment = await storage.createAssessment({
        userId: 1,
        type: "progress",
        scores,
        feedback,
        recommendedLevel: scores.overall >= 85 ? "Advanced" : scores.overall >= 70 ? "Intermediate" : "Beginner",
      });

      res.json({
        assessment,
        xpEarned: Math.floor(scores.overall / 2), // XP based on performance
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to assess speech" });
    }
  });

  // Get user badges
  app.get("/api/user/badges", async (req, res) => {
    try {
      const badges = await storage.getUserBadges(1);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch user badges" });
    }
  });

  // Get recent feedback/assessments
  app.get("/api/user/feedback", async (req, res) => {
    try {
      const assessments = await storage.getUserAssessments(1);
      const recentFeedback = assessments
        .sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime())
        .slice(0, 5)
        .map(assessment => ({
          id: assessment.id,
          type: assessment.type,
          feedback: assessment.feedback,
          scores: assessment.scores,
          completedAt: assessment.completedAt,
        }));
      
      res.json(recentFeedback);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch feedback" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
