import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Target, 
  CheckCircle, 
  Clock, 
  Star,
  TrendingUp,
  Brain,
  Volume2,
  BookOpen,
  MessageCircle,
  Award
} from "lucide-react";

interface SkillAssessmentProps {
  user: any;
}

export default function SkillAssessment({ user }: SkillAssessmentProps) {
  const [selectedSkill, setSelectedSkill] = useState("pronunciation");

  const skills = {
    pronunciation: {
      name: "Pronunciation",
      icon: Volume2,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      score: user?.skills?.pronunciation || 0,
      target: 90,
      description: "Clarity and accuracy of speech sounds",
      subSkills: [
        { name: "Vowel Sounds", score: 85, target: 90 },
        { name: "Consonant Clarity", score: 78, target: 85 },
        { name: "Word Stress", score: 82, target: 90 },
        { name: "Sentence Rhythm", score: 75, target: 85 }
      ],
      weakAreas: ["TH sounds", "R and L distinction", "Silent letters"],
      strengths: ["Clear vowels", "Good pacing", "Natural intonation"],
      exercises: [
        { name: "Minimal Pairs Practice", duration: "10 min", xp: 25 },
        { name: "IPA Symbol Training", duration: "15 min", xp: 35 },
        { name: "Tongue Twisters", duration: "8 min", xp: 20 },
        { name: "Shadow Reading", duration: "12 min", xp: 30 }
      ]
    },
    fluency: {
      name: "Fluency",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50",
      score: user?.skills?.fluency || 0,
      target: 85,
      description: "Natural flow and speed of speech",
      subSkills: [
        { name: "Speaking Speed", score: 73, target: 80 },
        { name: "Hesitation Control", score: 68, target: 85 },
        { name: "Connector Usage", score: 82, target: 90 },
        { name: "Natural Pausing", score: 76, target: 85 }
      ],
      weakAreas: ["Filler words (um, uh)", "Long pauses", "Rushed speech"],
      strengths: ["Smooth transitions", "Good connecting words", "Consistent pace"],
      exercises: [
        { name: "Fluency Building", duration: "20 min", xp: 50 },
        { name: "Speed Reading", duration: "15 min", xp: 40 },
        { name: "Spontaneous Speaking", duration: "12 min", xp: 35 },
        { name: "Breathing Exercises", duration: "8 min", xp: 25 }
      ]
    },
    grammar: {
      name: "Grammar",
      icon: BookOpen,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      score: user?.skills?.grammar || 0,
      target: 88,
      description: "Correct sentence structure and word usage",
      subSkills: [
        { name: "Tense Usage", score: 65, target: 85 },
        { name: "Article Usage", score: 58, target: 80 },
        { name: "Question Formation", score: 78, target: 85 },
        { name: "Complex Sentences", score: 72, target: 90 }
      ],
      weakAreas: ["Articles (a, an, the)", "Present perfect tense", "Prepositions"],
      strengths: ["Simple sentences", "Question words", "Subject-verb agreement"],
      exercises: [
        { name: "Tense Practice", duration: "18 min", xp: 45 },
        { name: "Article Drills", duration: "12 min", xp: 30 },
        { name: "Sentence Building", duration: "15 min", xp: 40 },
        { name: "Error Correction", duration: "10 min", xp: 25 }
      ]
    },
    vocabulary: {
      name: "Vocabulary",
      icon: Brain,
      color: "text-orange-600", 
      bgColor: "bg-orange-50",
      score: user?.skills?.vocabulary || 0,
      target: 85,
      description: "Range and accuracy of word usage",
      subSkills: [
        { name: "Academic Words", score: 79, target: 90 },
        { name: "Daily Vocabulary", score: 88, target: 90 },
        { name: "Idiomatic Expressions", score: 65, target: 80 },
        { name: "Word Formation", score: 71, target: 85 }
      ],
      weakAreas: ["Idioms and phrases", "Formal vocabulary", "Synonyms"],
      strengths: ["Basic words", "Family vocabulary", "School terms"],
      exercises: [
        { name: "Word Association", duration: "12 min", xp: 30 },
        { name: "Synonym Practice", duration: "15 min", xp: 35 },
        { name: "Context Clues", duration: "18 min", xp: 45 },
        { name: "Vocabulary Games", duration: "10 min", xp: 25 }
      ]
    }
  };

  const selectedSkillData = skills[selectedSkill];

  const overallProgress = Object.values(skills).reduce((acc, skill) => acc + skill.score, 0) / 4;

  const assessmentTests = [
    {
      name: "Quick Pronunciation Check",
      description: "5-minute assessment of key sounds",
      duration: "5 min",
      type: "pronunciation",
      difficulty: "Easy"
    },
    {
      name: "Grammar Accuracy Test", 
      description: "Structured speaking with grammar focus",
      duration: "10 min",
      type: "grammar",
      difficulty: "Medium"
    },
    {
      name: "Fluency Challenge",
      description: "Continuous speaking on random topics",
      duration: "8 min", 
      type: "fluency",
      difficulty: "Medium"
    },
    {
      name: "Vocabulary Range Test",
      description: "Demonstrate word knowledge in context",
      duration: "12 min",
      type: "vocabulary", 
      difficulty: "Hard"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Speaking Skills Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Overall Speaking Proficiency</span>
              <span className="text-sm text-gray-500">{Math.round(overallProgress)}%</span>
            </div>
            <Progress value={overallProgress} className="h-3" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(skills).map(([key, skill]) => {
              const Icon = skill.icon;
              return (
                <div
                  key={key}
                  className={`p-4 rounded-lg cursor-pointer transition-all ${
                    selectedSkill === key ? skill.bgColor : 'bg-gray-50 hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedSkill(key)}
                >
                  <div className="text-center">
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${skill.color}`} />
                    <h3 className="font-medium text-sm">{skill.name}</h3>
                    <p className="text-2xl font-bold text-gray-900">{skill.score}%</p>
                    <p className="text-xs text-gray-500">Target: {skill.target}%</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Skill Analysis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <selectedSkillData.icon className={`h-5 w-5 ${selectedSkillData.color}`} />
            {selectedSkillData.name} Analysis
          </CardTitle>
          <p className="text-gray-600">{selectedSkillData.description}</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Sub-skills */}
            <div>
              <h4 className="font-medium mb-3">Skill Breakdown</h4>
              <div className="space-y-3">
                {selectedSkillData.subSkills.map((subSkill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>{subSkill.name}</span>
                      <span>{subSkill.score}% / {subSkill.target}%</span>
                    </div>
                    <Progress 
                      value={(subSkill.score / subSkill.target) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths and Weak Areas */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Strengths
                </h4>
                <div className="space-y-2">
                  {selectedSkillData.strengths.map((strength, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {strength}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <Target className="h-4 w-4 text-orange-500" />
                  Areas to Improve
                </h4>
                <div className="space-y-2">
                  {selectedSkillData.weakAreas.map((area, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Target className="h-4 w-4 text-orange-500" />
                      {area}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Recommended Exercises */}
            <div>
              <h4 className="font-medium mb-3">Recommended Practice</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {selectedSkillData.exercises.map((exercise, index) => (
                  <div key={index} className="p-3 border rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h5 className="font-medium text-sm">{exercise.name}</h5>
                      <Badge variant="outline" className="text-xs">
                        {exercise.xp} XP
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {exercise.duration}
                      </span>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assessment Tests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            Skill Assessment Tests
          </CardTitle>
          <p className="text-gray-600">Take these tests to get detailed feedback on your speaking abilities</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessmentTests.map((test, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{test.name}</h4>
                    <Badge variant={
                      test.difficulty === "Easy" ? "default" :
                      test.difficulty === "Medium" ? "secondary" : "destructive"
                    }>
                      {test.difficulty}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600">{test.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {test.duration}
                    </span>
                    <Button variant="outline" size="sm">
                      <MessageCircle className="h-4 w-4 mr-1" />
                      Take Test
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Progress Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Progress Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Weekly Improvement</h4>
              <p className="text-sm text-blue-700">
                Your pronunciation has improved by 8% this week. Focus on 'TH' sounds to reach your next milestone.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Achievement Ready</h4>
              <p className="text-sm text-green-700">
                You're just 5 points away from the "Grammar Master" badge. Complete 3 more grammar exercises!
              </p>
            </div>
            
            <div className="p-4 bg-orange-50 rounded-lg">
              <h4 className="font-medium text-orange-900 mb-2">Recommended Focus</h4>
              <p className="text-sm text-orange-700">
                Spend 15 minutes daily on vocabulary building to reach intermediate level faster.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}