import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import SpeechRecorder from "@/components/speech-recorder";
import FeedbackModal from "@/components/feedback-modal";
import ActivityCard from "@/components/activity-card";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Mic, 
  Star, 
  Zap, 
  Target, 
  Volume2, 
  Flame,
  Medal,
  TrendingUp,
  Lightbulb,
  ChartLine
} from "lucide-react";
import { TextToSpeech } from "@/lib/speech-api";

export default function Dashboard() {
  const { toast } = useToast();
  const [isRecordingOpen, setIsRecordingOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const tts = new TextToSpeech();

  // Fetch user data
  const { data: user, isLoading: userLoading } = useQuery({
    queryKey: ["/api/user"],
  });

  // Fetch today's lesson
  const { data: todaysLesson } = useQuery({
    queryKey: ["/api/lesson/today"],
  });

  // Fetch activities
  const { data: activities = [] } = useQuery({
    queryKey: ["/api/activities"],
  });

  // Fetch user badges
  const { data: userBadges = [] } = useQuery({
    queryKey: ["/api/user/badges"],
  });

  // Fetch recent feedback
  const { data: recentFeedback = [] } = useQuery({
    queryKey: ["/api/user/feedback"],
  });

  // Speech assessment mutation
  const assessSpeechMutation = useMutation({
    mutationFn: async (data: { transcript: string; activityType: string; duration: number }) => {
      const response = await apiRequest("POST", "/api/assess-speech", data);
      return response.json();
    },
    onSuccess: (data) => {
      setFeedbackData(data);
      setIsFeedbackOpen(true);
      queryClient.invalidateQueries({ queryKey: ["/api/user"] });
      queryClient.invalidateQueries({ queryKey: ["/api/user/feedback"] });
    },
    onError: () => {
      toast({
        title: "Assessment Failed",
        description: "Unable to assess your speech. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleRecordingComplete = (transcript: string, audioBlob: Blob) => {
    setIsRecordingOpen(false);
    assessSpeechMutation.mutate({
      transcript,
      activityType: "daily_mission",
      duration: 60, // Default duration
    });
  };

  const playExample = async () => {
    if (todaysLesson?.content?.sampleText) {
      try {
        await tts.speak(todaysLesson.content.sampleText);
      } catch (error) {
        toast({
          title: "Audio Error",
          description: "Unable to play example audio.",
          variant: "destructive",
        });
      }
    }
  };

  const handleActivityClick = (activity: any) => {
    toast({
      title: `Starting ${activity.name}`,
      description: "This feature will be available soon!",
    });
  };

  const handleTryAgain = () => {
    setIsFeedbackOpen(false);
    setIsRecordingOpen(true);
  };

  const handleNextActivity = () => {
    setIsFeedbackOpen(false);
    toast({
      title: "Great Progress!",
      description: "Choose another activity to continue learning.",
    });
  };

  if (userLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600">Unable to load user data. Please refresh the page.</p>
        </div>
      </div>
    );
  }

  const progressToNext = Math.min((user.xp % 1000) / 10, 100); // Assuming 1000 XP per level

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">SpeakSmart AI</h1>
                <p className="text-sm text-slate-500">English Speaking Coach</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Star className="w-3 h-3 mr-1" />
                {user.level}
              </Badge>
              
              <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                <Zap className="w-3 h-3 mr-1" />
                {user.xp} XP
              </Badge>
              
              <div className="flex items-center space-x-2 cursor-pointer hover:bg-slate-100 rounded-lg px-2 py-1 transition-colors">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="text-sm font-medium text-slate-700 hidden sm:block">
                  {user.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-800">Your Learning Journey</h2>
                    <p className="text-slate-600">Keep practicing to reach Advanced level!</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-blue-600">{user.confidenceScore}%</div>
                    <div className="text-sm text-slate-500">Confidence Score</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">Progress to Advanced</span>
                    <span className="text-sm text-slate-500">{user.xp}/1000 XP</span>
                  </div>
                  <Progress value={progressToNext} className="h-3" />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">{user.skills.pronunciation}%</div>
                    <div className="text-sm text-slate-600">Pronunciation</div>
                    <Progress value={user.skills.pronunciation} className="h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{user.skills.fluency}%</div>
                    <div className="text-sm text-slate-600">Fluency</div>
                    <Progress value={user.skills.fluency} className="h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{user.skills.grammar}%</div>
                    <div className="text-sm text-slate-600">Grammar</div>
                    <Progress value={user.skills.grammar} className="h-1 mt-1" />
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-600">{user.skills.vocabulary}%</div>
                    <div className="text-sm text-slate-600">Vocabulary</div>
                    <Progress value={user.skills.vocabulary} className="h-1 mt-1" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            {/* Streak Counter */}
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Flame className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-800">{user.streak}</div>
                <div className="text-sm text-slate-600">Day Streak</div>
                <p className="text-xs text-slate-500 mt-2">Amazing! Keep it up!</p>
              </CardContent>
            </Card>
            
            {/* Recent Badges */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Recent Badges</h3>
                <div className="space-y-3">
                  {userBadges.slice(-2).map((userBadge: any) => (
                    <div key={userBadge.id} className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <Medal className="w-5 h-5 text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-slate-800">{userBadge.badge.name}</div>
                        <div className="text-xs text-slate-500">{userBadge.badge.description}</div>
                      </div>
                    </div>
                  ))}
                  {userBadges.length === 0 && (
                    <p className="text-sm text-slate-500">Complete activities to earn badges!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Today's Mission */}
        {todaysLesson && (
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
              <CardContent className="p-8">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Target className="w-6 h-6" />
                      <h2 className="text-2xl font-bold">Today's Mission</h2>
                    </div>
                    <h3 className="text-xl mb-2">{todaysLesson.title}</h3>
                    <p className="text-blue-100 mb-4">{todaysLesson.description}</p>
                    
                    <div className="flex items-center space-x-4">
                      <Button 
                        onClick={() => setIsRecordingOpen(true)}
                        className="bg-white text-blue-600 hover:bg-blue-50"
                        disabled={assessSpeechMutation.isPending}
                      >
                        <Mic className="w-4 h-4 mr-2" />
                        {assessSpeechMutation.isPending ? "Processing..." : "Start Mission"}
                      </Button>
                      {todaysLesson.content.sampleText && (
                        <Button 
                          onClick={playExample}
                          variant="outline"
                          className="border-blue-300 text-white hover:bg-blue-600"
                        >
                          <Volume2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="hidden lg:block">
                    <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                      <Mic className="w-16 h-16 text-white/80" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Learning Activities */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-800 col-span-full mb-4">Practice Activities</h2>
          
          {activities.map((activity: any) => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onClick={() => handleActivityClick(activity)}
            />
          ))}
        </div>

        {/* Course Progress & Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Course Progress */}
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-800">30-Day Speaking Course</h2>
                  <p className="text-slate-600">Structured daily lessons aligned with CBSE curriculum</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-blue-600">Day {user.currentDay}</div>
                  <div className="text-sm text-slate-500">of 30</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-slate-800">Week 2: Family & Friends</h3>
                    <Badge className="bg-green-100 text-green-700">In Progress</Badge>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {Array.from({ length: 7 }, (_, i) => {
                      const dayNumber = 8 + i;
                      const isCompleted = dayNumber < user.currentDay;
                      const isCurrent = dayNumber === user.currentDay;
                      
                      return (
                        <div key={dayNumber} className="relative">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                            isCompleted 
                              ? "bg-green-500 text-white"
                              : isCurrent
                              ? "bg-blue-600 text-white ring-4 ring-blue-600/20"
                              : "bg-slate-200 text-slate-400"
                          }`}>
                            {dayNumber}
                          </div>
                          {isCurrent && (
                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-xs text-blue-600 font-medium">
                              Today
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Recent Feedback & Tips */}
          <div className="space-y-6">
            {/* Recent Feedback */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <ChartLine className="w-5 h-5 text-blue-600 mr-2" />
                  Recent Feedback
                </h3>
                <div className="space-y-4">
                  {recentFeedback.slice(0, 2).map((feedback: any) => (
                    <div key={feedback.id} className="border-l-4 border-green-500 bg-green-50 p-4 rounded-r-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-800">Speech Assessment</span>
                        <span className="text-xs text-slate-500">
                          {new Date(feedback.completedAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 mb-2">{feedback.feedback}</p>
                      <div className="flex items-center space-x-4 text-xs">
                        <span className="text-green-600">✅ Overall: {feedback.scores.overall}%</span>
                      </div>
                    </div>
                  ))}
                  {recentFeedback.length === 0 && (
                    <p className="text-sm text-slate-500">Complete activities to see feedback here!</p>
                  )}
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Tips */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4 flex items-center">
                  <Lightbulb className="w-5 h-5 text-orange-600 mr-2" />
                  Speaking Tips
                </h3>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-800 mb-2">💡 Pro Tip</h4>
                    <p className="text-sm text-slate-600">Practice tongue twisters for 5 minutes daily to improve pronunciation and fluency!</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-800 mb-2">🎯 Focus Area</h4>
                    <p className="text-sm text-slate-600">Work on speaking slowly and clearly. Speed comes naturally with practice.</p>
                  </div>
                  
                  <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg">
                    <h4 className="text-sm font-medium text-slate-800 mb-2">🌟 Motivation</h4>
                    <p className="text-sm text-slate-600">Remember: Every word you speak in English makes you more confident. Keep going!</p>
                    <p className="text-xs text-slate-500 mt-1 italic">हर English शब्द आपको और confident बनाता है!</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Speech Recording Modal */}
      {todaysLesson && (
        <SpeechRecorder
          isOpen={isRecordingOpen}
          onClose={() => setIsRecordingOpen(false)}
          onRecordingComplete={handleRecordingComplete}
          prompt={todaysLesson.description}
          title={todaysLesson.title}
        />
      )}

      {/* Feedback Modal */}
      {feedbackData && (
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          onTryAgain={handleTryAgain}
          onNextActivity={handleNextActivity}
          scores={feedbackData.assessment.scores}
          feedback={feedbackData.assessment.feedback}
          xpEarned={feedbackData.xpEarned}
        />
      )}
    </div>
  );
}
