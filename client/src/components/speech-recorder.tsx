import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { Mic, Square, Pause, Play } from "lucide-react";
import { SpeechRecorder as SpeechAPI } from "@/lib/speech-api";

interface SpeechRecorderProps {
  isOpen: boolean;
  onClose: () => void;
  onRecordingComplete: (transcript: string, audioBlob: Blob) => void;
  prompt: string;
  title: string;
}

export default function SpeechRecorder({
  isOpen,
  onClose,
  onRecordingComplete,
  prompt,
  title,
}: SpeechRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recordingTime, setRecordingTime] = useState(0);
  const [error, setError] = useState<string | null>(null);
  
  const speechRecorder = useRef<SpeechAPI | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    speechRecorder.current = new SpeechAPI();
    
    speechRecorder.current.onResult((text, isFinal) => {
      setTranscript(text);
    });

    speechRecorder.current.onError((errorMessage) => {
      setError(`Recording error: ${errorMessage}`);
      setIsRecording(false);
    });

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isRecording && !isPaused) {
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRecording, isPaused]);

  const startRecording = async () => {
    try {
      setError(null);
      setTranscript("");
      setRecordingTime(0);
      
      if (!speechRecorder.current?.isSpeechRecognitionSupported()) {
        setError("Speech recognition is not supported in your browser. Please try using Chrome or Edge.");
        return;
      }

      await speechRecorder.current.startRecording();
      setIsRecording(true);
      setIsPaused(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to start recording");
    }
  };

  const stopRecording = async () => {
    try {
      if (!speechRecorder.current) return;

      const { transcript: finalTranscript, audioBlob } = await speechRecorder.current.stopRecording();
      setIsRecording(false);
      setIsPaused(false);
      
      if (finalTranscript.trim()) {
        onRecordingComplete(finalTranscript, audioBlob);
      } else {
        setError("No speech detected. Please try again.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to stop recording");
    }
  };

  const togglePause = () => {
    setIsPaused(!isPaused);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleClose = () => {
    if (isRecording) {
      stopRecording();
    }
    setTranscript("");
    setRecordingTime(0);
    setError(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <div className="text-center space-y-6">
          {/* Recording Icon */}
          <div className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center ${
            isRecording && !isPaused 
              ? "bg-gradient-to-r from-red-500 to-red-600 animate-pulse" 
              : "bg-gradient-to-r from-blue-500 to-blue-600"
          }`}>
            <Mic className="w-8 h-8 text-white" />
          </div>

          {/* Title and Prompt */}
          <div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600 text-sm">{prompt}</p>
          </div>

          {/* Recording Status */}
          {isRecording && (
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">
                {formatTime(recordingTime)}
              </div>
              <div className="text-sm text-slate-500">
                {isPaused ? "Recording paused" : "Recording in progress..."}
              </div>
            </div>
          )}

          {/* Live Transcript */}
          {transcript && (
            <div className="bg-slate-50 p-4 rounded-lg">
              <div className="text-sm text-slate-600 mb-1">Live transcript:</div>
              <div className="text-slate-800 text-left">{transcript}</div>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Recording Controls */}
          <div className="flex items-center justify-center space-x-4">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
                disabled={!!error}
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </Button>
            ) : (
              <>
                <Button
                  onClick={stopRecording}
                  className="bg-red-500 hover:bg-red-600 text-white w-12 h-12 rounded-full p-0"
                >
                  <Square className="w-5 h-5" />
                </Button>
                <Button
                  onClick={togglePause}
                  variant="outline"
                  className="w-12 h-12 rounded-full p-0"
                >
                  {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
                </Button>
              </>
            )}
          </div>

          {/* Instructions */}
          <p className="text-xs text-slate-500">
            {!isRecording 
              ? "Click 'Start Recording' and speak clearly" 
              : "Click the red square when you're done speaking"
            }
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
