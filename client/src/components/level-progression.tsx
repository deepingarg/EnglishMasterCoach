import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Star, 
  Lock, 
  CheckCircle,
  ArrowRight,
  Target,
  BookOpen,
  Trophy,
  Clock,
  Users,
  Brain,
  Zap
} from "lucide-react";

interface LevelProgressionProps {
  user: any;
}

export default function LevelProgression({ user }: LevelProgressionProps) {
  const [selectedLevel, setSelectedLevel] = useState("Beginner");

  const levels = [
    {
      name: "Beginner",
      description: "Foundation building with basic vocabulary and simple sentences",
      xpRequired: 0,
      xpToNext: 500,
      color: "bg-green-500",
      skills: ["Basic Pronunciation", "Simple Greetings", "Family Vocabulary", "Numbers & Colors"],
      activities: ["Read Aloud (Simple)", "Picture Talk (Basic)", "Daily Greetings"],
      duration: "4-6 weeks",
      unlocked: true
    },
    {
      name: "Elementary", 
      description: "Building confidence with everyday conversations and basic grammar",
      xpRequired: 500,
      xpToNext: 1000,
      color: "bg-blue-500",
      skills: ["Present Tense", "Question Formation", "School Vocabulary", "Time & Dates"],
      activities: ["Story Creation (Short)", "Role Play (Simple)", "Grammar Practice"],
      duration: "6-8 weeks",
      unlocked: user?.xp >= 500
    },
    {
      name: "Intermediate",
      description: "Developing fluency with complex sentences and storytelling",
      xpRequired: 1000,
      xpToNext: 2000,
      color: "bg-purple-500", 
      skills: ["Past/Future Tense", "Storytelling", "Opinion Expression", "Cultural Topics"],
      activities: ["Debate Practice", "News Reading", "Cultural Exchange", "Pronunciation Drills"],
      duration: "8-10 weeks",
      unlocked: user?.xp >= 1000
    },
    {
      name: "Upper-Intermediate",
      description: "Advanced grammar mastery and formal presentation skills",
      xpRequired: 2000,
      xpToNext: 3500,
      color: "bg-orange-500",
      skills: ["Complex Grammar", "Formal Writing", "Presentation Skills", "Critical Thinking"],
      activities: ["Academic Presentations", "Interview Prep", "Business Communication"],
      duration: "10-12 weeks", 
      unlocked: user?.xp >= 2000
    },
    {
      name: "Advanced",
      description: "Professional communication and competitive exam preparation", 
      xpRequired: 3500,
      xpToNext: 5000,
      color: "bg-red-500",
      skills: ["Professional Communication", "Public Speaking", "Research Skills", "Leadership"],
      activities: ["Conference Speaking", "Research Presentations", "Executive Communication"],
      duration: "12-16 weeks",
      unlocked: user?.xp >= 3500
    }
  ];

  const currentLevel = levels.find(level => 
    user?.xp >= level.xpRequired && user?.xp < level.xpRequired + level.xpToNext
  ) || levels[0];

  const progressInCurrentLevel = user?.xp >= currentLevel.xpRequired 
    ? ((user.xp - currentLevel.xpRequired) / currentLevel.xpToNext) * 100
    : 0;

  const levelSpecificFeatures = {
    "Beginner": [
      { feature: "Phonetic Alphabet Guide", icon: "🔤", description: "Learn IPA symbols for perfect pronunciation" },
      { feature: "Visual Vocabulary Cards", icon: "🖼️", description: "Picture-based learning for 500+ basic words" },
      { feature: "Slow Speech Practice", icon: "🐌", description: "Adjustable speech speed for practice" },
      { feature: "Mother Tongue Support", icon: "🏠", description: "Hindi translations and explanations" }
    ],
    "Elementary": [
      { feature: "Grammar Game Center", icon: "🎮", description: "Interactive grammar exercises and quizzes" },
      { feature: "Daily Conversation Simulator", icon: "💬", description: "Practice common daily scenarios" },
      { feature: "Pronunciation Comparison", icon: "📊", description: "Compare your speech with native speakers" },
      { feature: "Progress Tracking", icon: "📈", description: "Detailed analytics of your improvement" }
    ],
    "Intermediate": [
      { feature: "AI Debate Partner", icon: "🤖", description: "Practice arguments on various topics" },
      { feature: "Story Builder Workshop", icon: "📚", description: "Create and narrate original stories" },
      { feature: "Cultural Context Learning", icon: "🌍", description: "Understand cultural nuances in communication" },
      { feature: "Fluency Challenges", icon: "⚡", description: "Timed speaking exercises for fluency" }
    ],
    "Upper-Intermediate": [
      { feature: "Professional Scenarios", icon: "💼", description: "Workplace communication practice" },
      { feature: "Academic Writing Support", icon: "✍️", description: "Essay and report writing assistance" },
      { feature: "Interview Simulator", icon: "🎤", description: "Mock interviews for jobs and admissions" },
      { feature: "Presentation Coach", icon: "📽️", description: "Advanced presentation skills training" }
    ],
    "Advanced": [
      { feature: "Executive Communication", icon: "👔", description: "Leadership and management communication" },
      { feature: "Research Presentation Tools", icon: "🔬", description: "Academic and professional research skills" },
      { feature: "Competitive Exam Prep", icon: "🏆", description: "IELTS, TOEFL, and other exam preparation" },
      { feature: "Global Connect", icon: "🌐", description: "Practice with international speakers" }
    ]
  };

  const milestones = [
    { xp: 100, title: "First Words", description: "Completed first 10 activities", achieved: user?.xp >= 100 },
    { xp: 300, title: "Conversation Starter", description: "Had first AI conversation", achieved: user?.xp >= 300 },
    { xp: 750, title: "Storyteller", description: "Created your first story", achieved: user?.xp >= 750 },
    { xp: 1500, title: "Confident Speaker", description: "80%+ confidence score", achieved: user?.xp >= 1500 },
    { xp: 2500, title: "Grammar Master", description: "Perfect grammar in 20 activities", achieved: user?.xp >= 2500 },
    { xp: 4000, title: "Public Speaker", description: "Delivered first presentation", achieved: user?.xp >= 4000 }
  ];

  return (
    <div className="space-y-6">
      {/* Current Level Overview */}
      <Card className="overflow-hidden">
        <CardHeader className={`${currentLevel.color} text-white`}>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6" />
            {currentLevel.name} Level
          </CardTitle>
          <p className="text-white/90">{currentLevel.description}</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Progress in {currentLevel.name}</span>
                <span className="text-sm text-gray-500">
                  {user?.xp || 0} / {currentLevel.xpRequired + currentLevel.xpToNext} XP
                </span>
              </div>
              <Progress value={progressInCurrentLevel} className="h-3" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Skills You'll Master
                </h4>
                <div className="space-y-1">
                  {currentLevel.skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm">{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2 flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  Available Activities
                </h4>
                <div className="space-y-1">
                  {currentLevel.activities.map((activity, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">{activity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Level Progression Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5" />
            Your Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {levels.map((level, index) => (
              <div 
                key={level.name}
                className={`p-4 border rounded-lg transition-all cursor-pointer ${
                  selectedLevel === level.name ? 'border-blue-500 bg-blue-50' : 
                  level.unlocked ? 'border-gray-200 hover:border-gray-300' : 
                  'border-gray-100 bg-gray-50'
                }`}
                onClick={() => level.unlocked && setSelectedLevel(level.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      level.unlocked ? level.color : 'bg-gray-300'
                    } text-white`}>
                      {level.unlocked ? index + 1 : <Lock className="h-4 w-4" />}
                    </div>
                    <div>
                      <h3 className="font-medium">{level.name}</h3>
                      <p className="text-sm text-gray-600">{level.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={level.unlocked ? "default" : "secondary"}>
                      {level.unlocked ? "Unlocked" : `${level.xpRequired} XP needed`}
                    </Badge>
                    <p className="text-xs text-gray-500 mt-1">{level.duration}</p>
                  </div>
                </div>
                
                {selectedLevel === level.name && level.unlocked && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-3">Level Features</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {levelSpecificFeatures[level.name]?.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-2 p-2 bg-white rounded">
                          <span className="text-lg">{feature.icon}</span>
                          <div>
                            <p className="font-medium text-sm">{feature.feature}</p>
                            <p className="text-xs text-gray-600">{feature.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Milestones */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Achievement Milestones
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {milestones.map((milestone, index) => (
              <div 
                key={index}
                className={`flex items-center gap-4 p-3 rounded-lg ${
                  milestone.achieved ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  milestone.achieved ? 'bg-green-500' : 'bg-gray-300'
                } text-white`}>
                  {milestone.achieved ? <Trophy className="h-5 w-5" /> : milestone.xp}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{milestone.title}</h4>
                  <p className="text-sm text-gray-600">{milestone.description}</p>
                </div>
                <div className="text-right">
                  <Badge variant={milestone.achieved ? "default" : "secondary"}>
                    {milestone.xp} XP
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommended Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowRight className="h-5 w-5" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
              <h4 className="font-medium mb-2">Today's Focus</h4>
              <p className="text-sm text-gray-600 mb-3">
                Based on your current level, practice {currentLevel.activities[0]} to improve your core skills.
              </p>
              <Button size="sm">
                Start Activity
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Quick Practice (10 min)
                </h5>
                <p className="text-xs text-gray-600 mb-2">Pronunciation drill with feedback</p>
                <Button variant="outline" size="sm" className="w-full">
                  Start Quick Session
                </Button>
              </div>
              
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm mb-1 flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  AI Conversation (20 min)
                </h5>
                <p className="text-xs text-gray-600 mb-2">Practice with AI tutor</p>
                <Button variant="outline" size="sm" className="w-full">
                  Chat with AI
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}