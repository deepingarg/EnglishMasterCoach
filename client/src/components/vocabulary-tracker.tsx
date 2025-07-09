import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  BookOpen, 
  Plus, 
  Star, 
  Search,
  Volume2,
  CheckCircle,
  Brain,
  TrendingUp,
  Calendar,
  Award
} from "lucide-react";

interface VocabularyTrackerProps {
  user: any;
}

export default function VocabularyTracker({ user }: VocabularyTrackerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Mock vocabulary data
  const vocabularyStats = {
    totalWords: 342,
    weeklyGoal: 50,
    weeklyProgress: 23,
    masteredWords: 287,
    learningWords: 55
  };

  const categories = [
    { id: "all", name: "All Words", count: 342 },
    { id: "academic", name: "Academic", count: 89 },
    { id: "daily", name: "Daily Life", count: 134 },
    { id: "technical", name: "Technical", count: 67 },
    { id: "cultural", name: "Cultural", count: 52 }
  ];

  const recentWords = [
    { 
      word: "Perseverance", 
      meaning: "Persistence in doing something despite difficulty", 
      category: "academic",
      level: "advanced",
      mastered: true,
      dateAdded: "2024-01-15"
    },
    { 
      word: "Serendipity", 
      meaning: "A pleasant surprise; good luck in discovering something", 
      category: "daily",
      level: "intermediate",
      mastered: false,
      dateAdded: "2024-01-14"
    },
    { 
      word: "Quintessential", 
      meaning: "Representing the most perfect example of a quality", 
      category: "academic",
      level: "advanced",
      mastered: true,
      dateAdded: "2024-01-13"
    },
    { 
      word: "Empathy", 
      meaning: "The ability to understand and share feelings of others", 
      category: "daily",
      level: "intermediate",
      mastered: true,
      dateAdded: "2024-01-12"
    }
  ];

  const weeklyGoals = [
    { day: "Mon", target: 7, achieved: 8 },
    { day: "Tue", target: 7, achieved: 5 },
    { day: "Wed", target: 7, achieved: 7 },
    { day: "Thu", target: 7, achieved: 3 },
    { day: "Fri", target: 7, achieved: 0 },
    { day: "Sat", target: 7, achieved: 0 },
    { day: "Sun", target: 7, achieved: 0 }
  ];

  const achievements = [
    { title: "Word Collector", description: "Learn 100 words", progress: 100, target: 100, unlocked: true },
    { title: "Academic Scholar", description: "Master 50 academic words", progress: 42, target: 50, unlocked: false },
    { title: "Daily Speaker", description: "Use 30 daily words", progress: 30, target: 30, unlocked: true },
    { title: "Vocabulary Master", description: "Learn 500 words", progress: 342, target: 500, unlocked: false }
  ];

  const filteredWords = recentWords.filter(word => 
    (selectedCategory === "all" || word.category === selectedCategory) &&
    (searchTerm === "" || word.word.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Vocabulary Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Words</p>
                <p className="text-2xl font-bold text-gray-900">{vocabularyStats.totalWords}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Mastered</p>
                <p className="text-2xl font-bold text-gray-900">{vocabularyStats.masteredWords}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Learning</p>
                <p className="text-2xl font-bold text-gray-900">{vocabularyStats.learningWords}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Weekly Goal Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">This Week's Goal</span>
              <span className="text-sm text-gray-500">
                {vocabularyStats.weeklyProgress}/{vocabularyStats.weeklyGoal} words
              </span>
            </div>
            <Progress 
              value={(vocabularyStats.weeklyProgress / vocabularyStats.weeklyGoal) * 100} 
              className="h-3"
            />
          </div>

          <div className="grid grid-cols-7 gap-2">
            {weeklyGoals.map((day, index) => (
              <div key={day.day} className="text-center">
                <div className="text-xs text-gray-500 mb-1">{day.day}</div>
                <div 
                  className={`h-12 rounded flex items-center justify-center text-xs font-medium ${
                    day.achieved >= day.target 
                      ? 'bg-green-500 text-white' 
                      : day.achieved > 0
                      ? 'bg-yellow-400 text-white'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                >
                  {day.achieved}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Categories and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Vocabulary Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search words..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>

            {/* Word List */}
            <div className="space-y-3">
              {filteredWords.map((word, index) => (
                <div 
                  key={index} 
                  className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-semibold text-lg">{word.word}</h3>
                        <Badge variant="outline" className="text-xs">
                          {word.level}
                        </Badge>
                        <Badge variant="secondary" className="text-xs">
                          {word.category}
                        </Badge>
                        {word.mastered && (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        )}
                      </div>
                      <p className="text-gray-600 mb-2">{word.meaning}</p>
                      <p className="text-xs text-gray-500">
                        Added: {new Date(word.dateAdded).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Volume2 className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Star className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Vocabulary Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked ? 'bg-green-50 border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{achievement.title}</h4>
                  <Badge variant={achievement.unlocked ? "default" : "secondary"}>
                    {achievement.unlocked ? "Unlocked" : "In Progress"}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{achievement.description}</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{achievement.progress}/{achievement.target}</span>
                  </div>
                  <Progress 
                    value={(achievement.progress / achievement.target) * 100} 
                    className="h-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}