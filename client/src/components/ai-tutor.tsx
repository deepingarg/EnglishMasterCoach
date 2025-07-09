import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Bot, 
  MessageCircle, 
  Send, 
  Lightbulb,
  Target,
  BookOpen,
  Mic,
  Volume2,
  Star,
  TrendingUp,
  Clock,
  Users
} from "lucide-react";

interface AITutorProps {
  user: any;
}

export default function AITutor({ user }: AITutorProps) {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    {
      type: "ai",
      message: `Hello ${user?.name}! I'm your AI English tutor. I'm here to help you improve your speaking skills. What would you like to work on today?`,
      timestamp: new Date()
    }
  ]);

  const quickSuggestions = [
    "Help me with pronunciation",
    "Practice interview questions",
    "Improve my grammar",
    "Build confidence speaking",
    "Learn new vocabulary",
    "Practice storytelling"
  ];

  const learningPath = [
    {
      stage: "Foundation",
      level: "Beginner",
      completed: true,
      skills: ["Basic Pronunciation", "Simple Conversations", "Common Vocabulary"],
      progress: 100
    },
    {
      stage: "Development",
      level: "Intermediate",
      completed: false,
      skills: ["Grammar Mastery", "Fluent Speaking", "Advanced Vocabulary"],
      progress: 68
    },
    {
      stage: "Mastery",
      level: "Advanced",
      completed: false,
      skills: ["Debate Skills", "Public Speaking", "Professional Communication"],
      progress: 15
    }
  ];

  const aiRecommendations = [
    {
      title: "Focus on Grammar",
      description: "Your recent activities show 15% improvement needed in grammar accuracy",
      action: "Practice structured speaking exercises",
      urgency: "high",
      estimatedTime: "20 minutes"
    },
    {
      title: "Pronunciation Practice",
      description: "Great progress! Continue with tongue twisters for better articulation",
      action: "Complete 3 pronunciation drills",
      urgency: "medium",
      estimatedTime: "15 minutes"
    },
    {
      title: "Vocabulary Expansion",
      description: "Add 10 new academic words to reach your weekly goal",
      action: "Study academic word list",
      urgency: "low",
      estimatedTime: "25 minutes"
    }
  ];

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      type: "user",
      message,
      timestamp: new Date()
    };

    setChatHistory(prev => [...prev, newMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = {
        type: "ai",
        message: generateAIResponse(message),
        timestamp: new Date()
      };
      setChatHistory(prev => [...prev, aiResponse]);
    }, 1000);

    setMessage("");
  };

  const generateAIResponse = (userMessage: string): string => {
    const responses = {
      pronunciation: "Great question! Let's work on pronunciation. I recommend starting with vowel sounds. Try saying 'cat', 'cut', 'cot' - notice how your mouth position changes. Would you like me to suggest some specific exercises?",
      grammar: "Grammar is the foundation of clear communication! Based on your recent activities, I notice you sometimes miss articles (a, an, the). Let's practice: 'I saw ___ elephant at ___ zoo.' Can you fill in the blanks?",
      confidence: "Building confidence is a journey! Start with topics you're passionate about - it's easier to speak confidently about things you love. What's your favorite hobby? Let's practice talking about that!",
      vocabulary: "Vocabulary building is excellent for fluency! I suggest learning 5 words daily with their context. Here's today's word: 'Eloquent' - speaking fluently and persuasively. Can you use it in a sentence?",
      default: "That's interesting! I'm here to help with your English speaking journey. Whether it's pronunciation, grammar, vocabulary, or building confidence - just let me know what you'd like to focus on!"
    };

    const lowerMessage = userMessage.toLowerCase();
    if (lowerMessage.includes('pronunciation')) return responses.pronunciation;
    if (lowerMessage.includes('grammar')) return responses.grammar;
    if (lowerMessage.includes('confidence')) return responses.confidence;
    if (lowerMessage.includes('vocabulary')) return responses.vocabulary;
    return responses.default;
  };

  const handleQuickSuggestion = (suggestion: string) => {
    setMessage(suggestion);
  };

  return (
    <div className="space-y-6">
      {/* AI Chat Interface */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-600" />
            AI English Tutor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Chat History */}
            <div className="h-96 overflow-y-auto border rounded-lg p-4 bg-gray-50">
              {chatHistory.map((chat, index) => (
                <div 
                  key={index} 
                  className={`mb-4 flex ${chat.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      chat.type === 'user' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white border'
                    }`}
                  >
                    <p className="text-sm">{chat.message}</p>
                    <p className="text-xs opacity-75 mt-1">
                      {chat.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-gray-600">Quick suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {quickSuggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handleQuickSuggestion(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="flex gap-2">
              <Input
                placeholder="Ask your AI tutor anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <Button onClick={handleSendMessage}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Learning Path */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Your Learning Path
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {learningPath.map((stage, index) => (
              <div 
                key={index}
                className={`p-4 border rounded-lg ${
                  stage.completed ? 'bg-green-50 border-green-200' : 
                  stage.progress > 0 ? 'bg-blue-50 border-blue-200' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-medium">{stage.stage}</h3>
                    <Badge variant={stage.completed ? "default" : "secondary"}>
                      {stage.level}
                    </Badge>
                  </div>
                  <span className="text-sm text-gray-600">{stage.progress}%</span>
                </div>
                
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {stage.skills.map((skill, skillIndex) => (
                      <Badge key={skillIndex} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        stage.completed ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${stage.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            Personalized Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {aiRecommendations.map((rec, index) => (
              <div 
                key={index}
                className="p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium">{rec.title}</h4>
                  <Badge 
                    variant={
                      rec.urgency === 'high' ? 'destructive' : 
                      rec.urgency === 'medium' ? 'default' : 'secondary'
                    }
                  >
                    {rec.urgency} priority
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mb-3">{rec.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {rec.estimatedTime}
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    Start Activity
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Practice Buddy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Practice with AI Buddy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg">
              <h4 className="font-medium mb-2">Today's Conversation Topic</h4>
              <p className="text-sm text-gray-600 mb-3">
                "Describe your dream vacation destination and explain why you'd like to visit there."
              </p>
              <div className="flex gap-2">
                <Button size="sm">
                  <Mic className="h-4 w-4 mr-2" />
                  Start Conversation
                </Button>
                <Button variant="outline" size="sm">
                  <Volume2 className="h-4 w-4 mr-2" />
                  Listen to Example
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm mb-1">Role Play: Job Interview</h5>
                <p className="text-xs text-gray-600 mb-2">Practice common interview questions</p>
                <Button variant="outline" size="sm" className="w-full">
                  Start Interview
                </Button>
              </div>
              <div className="p-3 border rounded-lg">
                <h5 className="font-medium text-sm mb-1">Debate: School Uniforms</h5>
                <p className="text-xs text-gray-600 mb-2">Argue for or against school uniforms</p>
                <Button variant="outline" size="sm" className="w-full">
                  Join Debate
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}