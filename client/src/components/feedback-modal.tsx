import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, RotateCcw, ArrowRight } from "lucide-react";

interface FeedbackScore {
  pronunciation: number;
  fluency: number;
  grammar: number;
  vocabulary: number;
  overall: number;
}

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTryAgain: () => void;
  onNextActivity: () => void;
  scores: FeedbackScore;
  feedback: string;
  xpEarned: number;
}

export default function FeedbackModal({
  isOpen,
  onClose,
  onTryAgain,
  onNextActivity,
  scores,
  feedback,
  xpEarned,
}: FeedbackModalProps) {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreTextColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const scoreItems = [
    { label: "Pronunciation", value: scores.pronunciation, icon: "🗣️" },
    { label: "Fluency", value: scores.fluency, icon: "⚡" },
    { label: "Grammar", value: scores.grammar, icon: "📝" },
    { label: "Vocabulary", value: scores.vocabulary, icon: "📚" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="text-center space-y-6">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Title */}
          <div>
            <h3 className="text-xl font-bold text-slate-800">Great Work!</h3>
            <p className="text-slate-600">Here's how you performed</p>
          </div>

          {/* Overall Score */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl">
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {scores.overall}%
            </div>
            <div className="text-sm text-blue-700">Overall Score</div>
          </div>

          {/* Detailed Scores */}
          <div className="space-y-4">
            {scoreItems.map((item) => (
              <div key={item.label} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium text-slate-700">{item.label}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-24 bg-slate-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${getScoreColor(item.value)}`}
                      style={{ width: `${item.value}%` }}
                    />
                  </div>
                  <span className={`text-sm font-bold min-w-[3rem] text-right ${getScoreTextColor(item.value)}`}>
                    {item.value}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* AI Feedback */}
          <div className="bg-blue-50 p-4 rounded-lg text-left">
            <h4 className="text-sm font-medium text-slate-800 mb-2 flex items-center">
              💬 AI Feedback
            </h4>
            <p className="text-sm text-slate-600 mb-2">{feedback}</p>
            {scores.overall >= 80 && (
              <p className="text-xs text-slate-500 italic">
                बहुत अच्छा! (Very good!)
              </p>
            )}
            {scores.overall < 70 && (
              <p className="text-xs text-slate-500 italic">
                अभ्यास करते रहें! (Keep practicing!)
              </p>
            )}
          </div>

          {/* XP Reward */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
            <div className="text-2xl font-bold">+{xpEarned} XP</div>
            <div className="text-sm">Mission Completed!</div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <Button
              onClick={onTryAgain}
              variant="outline"
              className="flex-1 py-3"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
            <Button
              onClick={onNextActivity}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3"
            >
              Next Activity
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
