import React, { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SpeechRecorder from "@/components/speech-recorder";
import FeedbackModal from "@/components/feedback-modal";
import ActivityCard from "@/components/activity-card";
import AdvancedAnalytics from "@/components/advanced-analytics";
import StreakTracker from "@/components/streak-tracker";
import VocabularyTracker from "@/components/vocabulary-tracker";
import AITutor from "@/components/ai-tutor";
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
  ChartLine,
  Book,
  User,
  Award,
  Play,
  Calendar,
  Clock,
  BookOpen,
  Image,
  MessageCircle
} from "lucide-react";
import { TextToSpeech } from "@/lib/speech-api";

export default function Dashboard() {
  const { toast } = useToast();
  const [isRecordingOpen, setIsRecordingOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackData, setFeedbackData] = useState<any>(null);
  const [selectedActivity, setSelectedActivity] = useState<any>(null);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [currentTitle, setCurrentTitle] = useState("");
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
      activityType: selectedActivity?.type || "daily_mission",
      duration: 60,
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

  const handleStartActivity = (activity: any) => {
    setSelectedActivity(activity);
    
    // Set prompts based on activity type
    if (activity.type === "read_aloud") {
      setCurrentPrompt("Read the following text aloud with clear pronunciation and proper intonation.");
      setCurrentTitle("Read Aloud Practice");
    } else if (activity.type === "picture_talk") {
      setCurrentPrompt("Describe what you see in the picture. Talk about the colors, objects, people, and what might be happening.");
      setCurrentTitle("Picture Description");
    } else if (activity.type === "daily_conversation") {
      setCurrentPrompt("Have a conversation about your day. Tell me what you did, how you felt, and what you learned.");
      setCurrentTitle("Daily Conversation");
    } else if (todaysLesson) {
      setCurrentPrompt(todaysLesson.content.prompt);
      setCurrentTitle(todaysLesson.title);
    }
    
    setIsRecordingOpen(true);
  };

  const handleTryAgain = () => {
    setIsFeedbackOpen(false);
    setIsRecordingOpen(true);
  };

  const handleNextActivity = () => {
    setIsFeedbackOpen(false);
    setSelectedActivity(null);
  };

  if (userLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}! 🎉
          </h1>
          <p className="text-gray-600">Ready to improve your English speaking skills today?</p>
        </div>

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="grid w-full grid-cols-8 mb-8">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <ChartLine className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <Book className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="streak" className="flex items-center gap-2">
              <Flame className="h-4 w-4" />
              Streaks
            </TabsTrigger>
            <TabsTrigger value="vocabulary" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Vocabulary
            </TabsTrigger>
            <TabsTrigger value="tutor" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Tutor
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="achievements" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Achievements
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm font-medium">Total XP</p>
                      <p className="text-2xl font-bold">{user?.xp || 0}</p>
                    </div>
                    <Zap className="h-8 w-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100 text-sm font-medium">Day Streak</p>
                      <p className="text-2xl font-bold">{user?.streak || 0}</p>
                    </div>
                    <Flame className="h-8 w-8 text-orange-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm font-medium">Confidence</p>
                      <p className="text-2xl font-bold">{user?.confidenceScore || 0}%</p>
                    </div>
                    <Target className="h-8 w-8 text-green-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100 text-sm font-medium">Level</p>
                      <p className="text-2xl font-bold">{user?.level || "Beginner"}</p>
                    </div>
                    <Star className="h-8 w-8 text-purple-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Today's Mission */}
            <Card className="overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5" />
                  Today's Mission - Day {user?.currentDay || 1}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {todaysLesson ? (
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {todaysLesson.title}
                      </h3>
                      <p className="text-gray-600 mb-4">{todaysLesson.description}</p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          Day {todaysLesson.day}
                        </span>
                        <span className="flex items-center gap-1">
                          <Lightbulb className="h-4 w-4" />
                          {todaysLesson.topic}
                        </span>
                        <span className="flex items-center gap-1">
                          <Zap className="h-4 w-4" />
                          {todaysLesson.xpReward} XP
                        </span>
                      </div>
                    </div>

                    {todaysLesson.content.sampleText && (
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <p className="text-sm text-blue-600 mb-2">Sample Response:</p>
                        <p className="text-gray-700 italic">"{todaysLesson.content.sampleText}"</p>
                        <Button 
                          onClick={playExample}
                          variant="outline" 
                          size="sm" 
                          className="mt-2"
                        >
                          <Volume2 className="h-4 w-4 mr-2" />
                          Play Example
                        </Button>
                      </div>
                    )}

                    <Button 
                      onClick={() => handleStartActivity(todaysLesson)}
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    >
                      <Mic className="h-4 w-4 mr-2" />
                      Start Speaking Practice
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">No lesson available for today</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Practice Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Practice Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        {activity.type === 'read_aloud' && <BookOpen className="h-6 w-6 text-blue-500" />}
                        {activity.type === 'picture_talk' && <Image className="h-6 w-6 text-green-500" />}
                        {activity.type === 'daily_conversation' && <MessageCircle className="h-6 w-6 text-purple-500" />}
                        <h3 className="font-semibold text-gray-900">{activity.name}</h3>
                      </div>
                      <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {activity.duration}min
                          </span>
                          <span className="flex items-center gap-1">
                            <Zap className="h-4 w-4" />
                            {activity.xpReward} XP
                          </span>
                        </div>
                        <Button 
                          onClick={() => handleStartActivity(activity)}
                          variant="outline" 
                          size="sm"
                        >
                          <Play className="h-4 w-4 mr-2" />
                          Start
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ChartLine className="h-5 w-5" />
                  Skills Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {user?.skills && Object.entries(user.skills).map(([skill, score]) => (
                    <div key={skill} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium capitalize">{skill}</span>
                        <span className="text-sm text-gray-500">{score}%</span>
                      </div>
                      <Progress value={score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <AdvancedAnalytics user={user} recentFeedback={recentFeedback} />
          </TabsContent>

          {/* Streak Tracker Tab */}
          <TabsContent value="streak" className="space-y-6">
            <StreakTracker user={user} />
          </TabsContent>

          {/* Vocabulary Tracker Tab */}
          <TabsContent value="vocabulary" className="space-y-6">
            <VocabularyTracker user={user} />
          </TabsContent>

          {/* AI Tutor Tab */}
          <TabsContent value="tutor" className="space-y-6">
            <AITutor user={user} />
          </TabsContent>

          {/* Courses Tab */}
          <TabsContent value="courses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Book className="h-5 w-5" />
                  Available Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-2">30-Day Speaking Course</h3>
                    <p className="text-gray-600 mb-4">Structured daily lessons aligned with CBSE curriculum</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                      <span>Level: Intermediate</span>
                      <span>Duration: 30 days</span>
                    </div>
                    <Progress value={(user?.currentDay || 1) / 30 * 100} className="mb-4" />
                    <p className="text-sm text-gray-600 mb-4">
                      Progress: Day {user?.currentDay || 1} of 30
                    </p>
                    <Button className="w-full">Continue Course</Button>
                  </div>
                  
                  <div className="border rounded-lg p-6 opacity-75">
                    <h3 className="text-xl font-semibold mb-2">Advanced Speaking</h3>
                    <p className="text-gray-600 mb-4">Coming soon - Advanced level speaking practice</p>
                    <Button variant="outline" className="w-full" disabled>
                      Coming Soon
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Your Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                      {user?.name?.charAt(0) || "A"}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{user?.name}</h3>
                      <p className="text-gray-600">@{user?.username}</p>
                      <Badge variant="secondary" className="mt-1">
                        {user?.level} Level
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <p className="text-2xl font-bold text-blue-600">{user?.xp || 0}</p>
                      <p className="text-sm text-gray-600">Total XP</p>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <p className="text-2xl font-bold text-orange-600">{user?.streak || 0}</p>
                      <p className="text-sm text-gray-600">Day Streak</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Achievements Tab */}
          <TabsContent value="achievements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Medal className="h-5 w-5" />
                  Your Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {userBadges.map((userBadge) => (
                    <div key={userBadge.id} className="border rounded-lg p-4 text-center">
                      <Medal className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                      <h3 className="font-semibold mb-1">{userBadge.badge?.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{userBadge.badge?.description}</p>
                      <p className="text-xs text-gray-500">
                        Earned: {new Date(userBadge.earnedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                  
                  {userBadges.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <Medal className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Complete activities to earn your first badge!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Speech Recorder Modal */}
        <SpeechRecorder
          isOpen={isRecordingOpen}
          onClose={() => setIsRecordingOpen(false)}
          onRecordingComplete={handleRecordingComplete}
          prompt={currentPrompt}
          title={currentTitle}
        />

        {/* Feedback Modal */}
        <FeedbackModal
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          onTryAgain={handleTryAgain}
          onNextActivity={handleNextActivity}
          scores={feedbackData?.scores || {}}
          feedback={feedbackData?.feedback || ""}
          xpEarned={feedbackData?.xpEarned || 0}
        />
      </div>
    </div>
  );
}