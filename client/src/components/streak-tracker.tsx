import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Flame, 
  Calendar, 
  Target, 
  Star,
  Trophy,
  Gift,
  Zap,
  Clock
} from "lucide-react";

interface StreakTrackerProps {
  user: any;
}

export default function StreakTracker({ user }: StreakTrackerProps) {
  const currentStreak = user?.streak || 0;
  const streakGoal = 30;
  const streakProgress = (currentStreak / streakGoal) * 100;

  // Calculate streak bonuses
  const getStreakBonus = (streak: number) => {
    if (streak >= 30) return { multiplier: 3, title: "Legend", color: "text-purple-600" };
    if (streak >= 21) return { multiplier: 2.5, title: "Master", color: "text-gold-600" };
    if (streak >= 14) return { multiplier: 2, title: "Expert", color: "text-orange-600" };
    if (streak >= 7) return { multiplier: 1.5, title: "Regular", color: "text-blue-600" };
    return { multiplier: 1, title: "Beginner", color: "text-gray-600" };
  };

  const streakBonus = getStreakBonus(currentStreak);
  
  // Mock weekly calendar data
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyActivity = [true, true, true, true, true, false, false]; // Mock data

  const milestones = [
    { days: 7, reward: "50 Bonus XP", unlocked: currentStreak >= 7 },
    { days: 14, reward: "New Badge", unlocked: currentStreak >= 14 },
    { days: 21, reward: "Premium Features", unlocked: currentStreak >= 21 },
    { days: 30, reward: "Certificate", unlocked: currentStreak >= 30 }
  ];

  const streakTips = [
    "Set a daily reminder to practice speaking",
    "Start with just 5 minutes if you're busy",
    "Practice during your favorite time of day",
    "Track your progress in a journal"
  ];

  return (
    <div className="space-y-6">
      {/* Main Streak Display */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
          <CardTitle className="flex items-center gap-2">
            <Flame className="h-6 w-6" />
            Speaking Streak
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="text-center mb-6">
            <div className="relative">
              <div className="text-6xl font-bold text-orange-600 mb-2">
                {currentStreak}
              </div>
              <div className="text-lg text-gray-600 mb-4">
                Day{currentStreak !== 1 ? 's' : ''} in a row!
              </div>
              <Badge className={`${streakBonus.color} bg-opacity-10`}>
                {streakBonus.title} ({streakBonus.multiplier}x XP)
              </Badge>
            </div>
          </div>

          {/* Progress to next milestone */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress to 30-day goal</span>
              <span className="text-sm text-gray-500">{currentStreak}/{streakGoal}</span>
            </div>
            <Progress value={streakProgress} className="h-3" />
          </div>

          {/* Weekly Calendar */}
          <div className="mb-6">
            <h4 className="font-medium mb-3">This Week</h4>
            <div className="grid grid-cols-7 gap-2">
              {weekDays.map((day, index) => (
                <div key={day} className="text-center">
                  <div className="text-xs text-gray-500 mb-1">{day}</div>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                      weeklyActivity[index] 
                        ? 'bg-green-500 text-white' 
                        : 'bg-gray-200 text-gray-400'
                    }`}
                  >
                    {weeklyActivity[index] ? <Flame className="h-4 w-4" /> : '○'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {currentStreak === 0 && (
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Calendar className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              <p className="text-blue-700 font-medium">Start Your Streak Today!</p>
              <p className="text-sm text-blue-600 mt-1">Complete any speaking activity to begin</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Streak Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Streak Rewards
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div 
                key={index} 
                className={`flex items-center justify-between p-3 rounded-lg ${
                  milestone.unlocked ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    milestone.unlocked ? 'bg-green-500' : 'bg-gray-300'
                  }`}>
                    {milestone.unlocked ? (
                      <Trophy className="h-4 w-4 text-white" />
                    ) : (
                      <span className="text-white text-sm font-bold">{milestone.days}</span>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{milestone.days} Day Streak</p>
                    <p className="text-sm text-gray-600">{milestone.reward}</p>
                  </div>
                </div>
                <Badge variant={milestone.unlocked ? "default" : "secondary"}>
                  {milestone.unlocked ? "Unlocked" : "Locked"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Streak Tips */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            Streak Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {streakTips.map((tip, index) => (
              <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                <p className="text-sm text-blue-700">{tip}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Streak Recovery */}
      {currentStreak === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5" />
              Streak Recovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center p-4">
              <p className="text-gray-600 mb-4">
                Don't worry! Everyone starts somewhere. Begin your speaking journey today and build momentum.
              </p>
              <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700">
                <Flame className="h-4 w-4 mr-2" />
                Start Your Streak
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}