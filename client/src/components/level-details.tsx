import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  Star, 
  Clock, 
  Target,
  BookOpen,
  Users,
  Award,
  CheckCircle,
  ArrowRight,
  Volume2,
  MessageCircle,
  Brain,
  Globe,
  Briefcase
} from "lucide-react";

interface LevelDetailsProps {
  user: any;
}

export default function LevelDetails({ user }: LevelDetailsProps) {
  const [selectedLevel, setSelectedLevel] = useState("Beginner");

  const levelDetails = {
    "Beginner": {
      name: "Beginner Foundation",
      xpRange: "0 - 500 XP",
      duration: "4-6 weeks",
      ageGroup: "Classes 6-8 (Ages 11-14)",
      color: "bg-green-500",
      description: "Building foundation with basic vocabulary, simple sentences, and pronunciation fundamentals",
      
      coreSkills: [
        "Basic pronunciation of English sounds",
        "Simple greetings and introductions",
        "Family and friend vocabulary (50+ words)",
        "Numbers, colors, and basic objects",
        "Present tense simple sentences",
        "Question formation (What, Where, Who)",
        "Basic listening comprehension"
      ],
      
      activities: [
        {
          name: "Read Aloud (Simple)",
          description: "Practice reading basic sentences with correct pronunciation",
          duration: "10 min",
          focus: "Pronunciation & Reading"
        },
        {
          name: "Picture Talk (Basic)",
          description: "Describe simple pictures using basic vocabulary",
          duration: "8 min", 
          focus: "Vocabulary & Speaking"
        },
        {
          name: "Daily Greetings",
          description: "Practice common greetings and polite expressions",
          duration: "5 min",
          focus: "Social Communication"
        },
        {
          name: "Phonetics Training",
          description: "Learn basic IPA symbols and sound patterns",
          duration: "12 min",
          focus: "Pronunciation Foundation"
        }
      ],
      
      learningOutcomes: [
        "Introduce yourself and family members confidently",
        "Ask and answer simple questions about daily life",
        "Pronounce basic English sounds correctly",
        "Use present tense in simple sentences",
        "Recognize and use 200+ common English words",
        "Understand basic instructions in English"
      ],
      
      assessmentCriteria: [
        "Pronunciation clarity (60% target)",
        "Basic vocabulary usage (50+ words)",
        "Simple sentence formation",
        "Listening comprehension (basic commands)",
        "Confidence in speaking (40% target)"
      ],
      
      supportFeatures: [
        "Hindi translations for all content",
        "Slow speech practice mode",
        "Visual vocabulary cards with pictures",
        "IPA phonetic guide with audio",
        "Mother tongue support for explanations"
      ]
    },

    "Elementary": {
      name: "Elementary Building",
      xpRange: "500 - 1,000 XP", 
      duration: "6-8 weeks",
      ageGroup: "Classes 8-9 (Ages 13-15)",
      color: "bg-blue-500",
      description: "Building confidence with everyday conversations, basic grammar, and vocabulary expansion",
      
      coreSkills: [
        "Past and future tense usage",
        "School subjects and daily routine vocabulary",
        "Question formation with auxiliary verbs",
        "Basic conversation maintenance",
        "Food, weather, and time expressions",
        "Simple storytelling abilities",
        "Improved pronunciation clarity"
      ],
      
      activities: [
        {
          name: "Story Creation (Short)",
          description: "Create and narrate 3-4 sentence stories",
          duration: "15 min",
          focus: "Creativity & Grammar"
        },
        {
          name: "Role Play (Simple)",
          description: "Practice everyday scenarios like shopping or school",
          duration: "12 min",
          focus: "Practical Communication"
        },
        {
          name: "Grammar Practice",
          description: "Interactive exercises for tense usage and sentence structure",
          duration: "10 min",
          focus: "Grammar Foundation"
        },
        {
          name: "Daily Chat",
          description: "Structured conversations about daily activities",
          duration: "15 min",
          focus: "Fluency Building"
        }
      ],
      
      learningOutcomes: [
        "Describe daily routines and school activities",
        "Tell simple stories about past events",
        "Express future plans and intentions",
        "Maintain basic conversations for 3-5 minutes",
        "Use 500+ vocabulary words accurately",
        "Understand and follow detailed instructions"
      ],
      
      assessmentCriteria: [
        "Grammar accuracy (70% target)",
        "Vocabulary range (500+ words)",
        "Conversation maintenance",
        "Storytelling ability",
        "Pronunciation improvement (70% target)"
      ],
      
      supportFeatures: [
        "Grammar game center with interactive exercises",
        "Daily conversation simulator",
        "Pronunciation comparison with native speakers",
        "Progress tracking with detailed analytics",
        "Cultural context explanations for phrases"
      ]
    },

    "Intermediate": {
      name: "Intermediate Development",
      xpRange: "1,000 - 2,000 XP",
      duration: "8-10 weeks", 
      ageGroup: "Classes 9-10 (Ages 14-16)",
      color: "bg-purple-500",
      description: "Developing fluency with complex sentences, storytelling, and cultural understanding",
      
      coreSkills: [
        "Complex sentence structures with conjunctions",
        "Opinion expression and justification",
        "Cultural topics and Indian traditions",
        "Narrative and descriptive speaking",
        "Conditional sentences (if/when)",
        "Advanced vocabulary in academic contexts",
        "Debate and discussion participation"
      ],
      
      activities: [
        {
          name: "Debate Practice",
          description: "Argue for/against topics with structured reasoning",
          duration: "25 min",
          focus: "Critical Thinking & Persuasion"
        },
        {
          name: "News Reading",
          description: "Read and discuss current affairs articles",
          duration: "20 min",
          focus: "Formal Speaking & Comprehension"
        },
        {
          name: "Cultural Exchange",
          description: "Discuss Indian festivals, traditions, and values",
          duration: "18 min",
          focus: "Cultural Communication"
        },
        {
          name: "Story Creation (Advanced)",
          description: "Create detailed narratives with character development",
          duration: "22 min",
          focus: "Creative Expression"
        }
      ],
      
      learningOutcomes: [
        "Express complex ideas and opinions clearly",
        "Participate in debates on social topics",
        "Describe Indian culture to international audiences",
        "Tell engaging stories with proper structure",
        "Use 1000+ vocabulary words contextually",
        "Understand native speaker conversations"
      ],
      
      assessmentCriteria: [
        "Fluency and natural flow (80% target)",
        "Complex grammar usage",
        "Opinion articulation skills",
        "Cultural knowledge expression",
        "Extended speaking ability (10+ minutes)"
      ],
      
      supportFeatures: [
        "AI debate partner for practice",
        "Story builder workshop tools",
        "Cultural context learning modules",
        "Fluency challenges with timing",
        "Advanced pronunciation drills"
      ]
    },

    "Upper-Intermediate": {
      name: "Upper-Intermediate Mastery",
      xpRange: "2,000 - 3,500 XP",
      duration: "10-12 weeks",
      ageGroup: "Classes 11-12 (Ages 16-18)",
      color: "bg-orange-500", 
      description: "Mastering advanced grammar, formal presentation skills, and academic communication",
      
      coreSkills: [
        "Advanced grammar structures (subjunctive, passive voice)",
        "Formal presentation and public speaking",
        "Academic writing and research discussion",
        "Professional communication basics",
        "Critical analysis and evaluation",
        "Advanced listening comprehension",
        "Persuasive and argumentative speaking"
      ],
      
      activities: [
        {
          name: "Academic Presentations",
          description: "Deliver structured presentations on academic topics",
          duration: "30 min",
          focus: "Formal Communication"
        },
        {
          name: "Interview Preparation",
          description: "Practice college admission and job interviews",
          duration: "25 min",
          focus: "Professional Skills"
        },
        {
          name: "Business Communication",
          description: "Learn workplace communication and email writing",
          duration: "20 min",
          focus: "Professional Language"
        },
        {
          name: "Poetry Recitation",
          description: "Recite and analyze English poetry with expression",
          duration: "15 min",
          focus: "Literary Expression"
        }
      ],
      
      learningOutcomes: [
        "Deliver confident presentations to audiences",
        "Handle job and college admission interviews",
        "Write and speak in formal academic style",
        "Analyze and discuss complex topics",
        "Use 1500+ vocabulary words professionally",
        "Understand academic lectures and discussions"
      ],
      
      assessmentCriteria: [
        "Presentation skills and confidence",
        "Academic language proficiency",
        "Professional communication ability",
        "Critical thinking expression",
        "Advanced grammar mastery (85% target)"
      ],
      
      supportFeatures: [
        "Professional scenario practice",
        "Academic writing assistance tools",
        "Interview simulator with AI feedback",
        "Presentation coach with timing",
        "Advanced vocabulary builder"
      ]
    },

    "Advanced": {
      name: "Advanced Excellence", 
      xpRange: "3,500+ XP",
      duration: "12-16 weeks",
      ageGroup: "College/Professional (18+ years)",
      color: "bg-red-500",
      description: "Achieving professional communication, public speaking mastery, and competitive exam readiness",
      
      coreSkills: [
        "Expert-level grammar and style",
        "Public speaking and leadership communication",
        "Research presentation and academic discourse",
        "International business communication",
        "Competitive exam strategies (IELTS/TOEFL)",
        "Cross-cultural communication skills",
        "Advanced literary and analytical expression"
      ],
      
      activities: [
        {
          name: "Conference Speaking",
          description: "Deliver professional conference-style presentations",
          duration: "40 min",
          focus: "Executive Communication"
        },
        {
          name: "Research Presentations",
          description: "Present academic research with data analysis",
          duration: "35 min",
          focus: "Academic Excellence"
        },
        {
          name: "Executive Communication",
          description: "Leadership scenarios and strategic communication",
          duration: "30 min",
          focus: "Leadership Skills"
        },
        {
          name: "Global Connect",
          description: "International discussions on global topics",
          duration: "25 min",
          focus: "Global Perspective"
        }
      ],
      
      learningOutcomes: [
        "Lead meetings and present to executives",
        "Publish and present academic research",
        "Score 7+ in IELTS or 100+ in TOEFL",
        "Communicate effectively in international settings",
        "Master 2500+ professional vocabulary",
        "Mentor others in English communication"
      ],
      
      assessmentCriteria: [
        "Professional presentation excellence",
        "Academic discourse proficiency", 
        "Leadership communication skills",
        "Competitive exam readiness",
        "Native-level fluency (95% target)"
      ],
      
      supportFeatures: [
        "Executive communication training",
        "Research presentation tools",
        "IELTS/TOEFL exam preparation",
        "Global connect with international speakers",
        "Advanced AI writing assistant"
      ]
    }
  };

  const currentLevelData = levelDetails[selectedLevel];

  return (
    <div className="space-y-6">
      {/* Level Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5" />
            Complete Level System Overview
          </CardTitle>
          <p className="text-gray-600">
            Comprehensive progression from basic to advanced English proficiency for CBSE students
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
            {Object.entries(levelDetails).map(([key, level]) => (
              <Button
                key={key}
                variant={selectedLevel === key ? "default" : "outline"}
                className={`h-auto p-4 flex flex-col items-center gap-2 ${
                  selectedLevel === key ? level.color + " text-white" : ""
                }`}
                onClick={() => setSelectedLevel(key)}
              >
                <div className="text-center">
                  <div className="font-medium text-sm">{level.name.split(" ")[0]}</div>
                  <div className="text-xs opacity-75">{level.xpRange}</div>
                </div>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Level Information */}
      <Card>
        <CardHeader className={`${currentLevelData.color} text-white`}>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-6 w-6" />
            {currentLevelData.name}
          </CardTitle>
          <div className="flex flex-wrap gap-4 text-white/90">
            <span className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              {currentLevelData.xpRange}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {currentLevelData.duration}
            </span>
            <span className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              {currentLevelData.ageGroup}
            </span>
          </div>
          <p className="text-white/90">{currentLevelData.description}</p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            
            {/* Core Skills */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                Core Skills You'll Master
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {currentLevelData.coreSkills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-sm">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activities */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                Practice Activities
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentLevelData.activities.map((activity, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{activity.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        {activity.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{activity.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">
                        {activity.focus}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Learning Outcomes */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5" />
                What You'll Achieve
              </h3>
              <div className="space-y-2">
                {currentLevelData.learningOutcomes.map((outcome, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Assessment Criteria */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Target className="h-5 w-5" />
                Assessment Criteria
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentLevelData.assessmentCriteria.map((criteria, index) => (
                  <div key={index} className="p-3 bg-blue-50 rounded-lg">
                    <span className="text-sm font-medium">{criteria}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Features */}
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                Learning Support Features
              </h3>
              <div className="space-y-2">
                {currentLevelData.supportFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-green-50 rounded">
                    <Star className="h-4 w-4 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Progression Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Complete Learning Journey
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center p-6 bg-gradient-to-r from-green-50 to-red-50 rounded-lg">
              <h4 className="font-semibold mb-2">From Zero to Professional</h4>
              <p className="text-sm text-gray-600 mb-4">
                Complete English mastery journey designed for Indian students following CBSE curriculum
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                <Badge>200+ words → 2500+ words</Badge>
                <Badge>Simple sentences → Professional communication</Badge>
                <Badge>Basic conversation → Conference speaking</Badge>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                <h5 className="font-medium mb-1">Conversation Mastery</h5>
                <p className="text-xs text-gray-600">From basic greetings to professional discussions</p>
              </div>
              
              <div className="p-4 border rounded-lg text-center">
                <Briefcase className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                <h5 className="font-medium mb-1">Career Preparation</h5>
                <p className="text-xs text-gray-600">Interview skills and workplace communication</p>
              </div>
              
              <div className="p-4 border rounded-lg text-center">
                <Globe className="h-8 w-8 mx-auto mb-2 text-green-600" />
                <h5 className="font-medium mb-1">Global Readiness</h5>
                <p className="text-xs text-gray-600">International communication and competitive exams</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}