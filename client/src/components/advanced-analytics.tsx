import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { 
  TrendingUp, 
  Clock, 
  Target, 
  Star,
  BookOpen,
  Mic,
  Brain,
  Award
} from "lucide-react";

interface AnalyticsProps {
  user: any;
  recentFeedback: any[];
}

export default function AdvancedAnalytics({ user, recentFeedback }: AnalyticsProps) {
  // Mock data for demonstrations
  const weeklyProgress = [
    { day: 'Mon', xp: 50, confidence: 75, activities: 2 },
    { day: 'Tue', xp: 80, confidence: 78, activities: 3 },
    { day: 'Wed', xp: 65, confidence: 82, activities: 2 },
    { day: 'Thu', xp: 90, confidence: 85, activities: 4 },
    { day: 'Fri', xp: 75, confidence: 88, activities: 3 },
    { day: 'Sat', xp: 120, confidence: 90, activities: 5 },
    { day: 'Sun', xp: 95, confidence: 92, activities: 3 }
  ];

  const skillsData = [
    { skill: 'Pronunciation', score: user?.skills?.pronunciation || 0 },
    { skill: 'Fluency', score: user?.skills?.fluency || 0 },
    { skill: 'Grammar', score: user?.skills?.grammar || 0 },
    { skill: 'Vocabulary', score: user?.skills?.vocabulary || 0 }
  ];

  const activityTypes = [
    { name: 'Read Aloud', value: 35, color: '#8884d8' },
    { name: 'Picture Talk', value: 25, color: '#82ca9d' },
    { name: 'Daily Chat', value: 20, color: '#ffc658' },
    { name: 'Story Creation', value: 20, color: '#ff7300' }
  ];

  const achievements = [
    { title: "7-Day Streak", description: "Consistent practice", icon: "🔥", achieved: true },
    { title: "Confidence Boost", description: "80%+ confidence score", icon: "⭐", achieved: true },
    { title: "Grammar Master", description: "Perfect grammar streak", icon: "📚", achieved: false },
    { title: "Vocabulary Expert", description: "500+ words learned", icon: "💎", achieved: false }
  ];

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <TrendingUp className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Weekly Growth</p>
                <p className="text-2xl font-bold text-gray-900">+15%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Study Time</p>
                <p className="text-2xl font-bold text-gray-900">5.2hrs</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Target className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Accuracy</p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Mic className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Activities</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Progress Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Weekly Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="confidence" 
                  stroke="#8884d8" 
                  strokeWidth={2}
                  name="Confidence %"
                />
                <Line 
                  type="monotone" 
                  dataKey="xp" 
                  stroke="#82ca9d" 
                  strokeWidth={2}
                  name="XP Gained"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              Skills Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={skillsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="skill" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="score" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Activity Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Activity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={activityTypes}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {activityTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5" />
              Achievement Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{achievement.icon}</span>
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                    </div>
                  </div>
                  <Badge variant={achievement.achieved ? "default" : "secondary"}>
                    {achievement.achieved ? "Earned" : "In Progress"}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Learning Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Strength</h4>
              <p className="text-sm text-blue-700">
                Your pronunciation has improved by 15% this week. Keep practicing with tongue twisters!
              </p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Focus Area</h4>
              <p className="text-sm text-orange-700">
                Grammar accuracy needs attention. Try more structured speaking exercises.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Next Goal</h4>
              <p className="text-sm text-green-700">
                Aim for 90% confidence score by completing 3 debate practice sessions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}