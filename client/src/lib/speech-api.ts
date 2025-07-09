interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
  message: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  maxAlternatives: number;
  serviceURI: string;
  grammars: SpeechGrammarList;
  
  start(): void;
  stop(): void;
  abort(): void;
  
  onaudiostart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onaudioend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onerror: ((this: SpeechRecognition, ev: SpeechRecognitionErrorEvent) => any) | null;
  onnomatch: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onresult: ((this: SpeechRecognition, ev: SpeechRecognitionEvent) => any) | null;
  onsoundstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onsoundend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechstart: ((this: SpeechRecognition, ev: Event) => any) | null;
  onspeechend: ((this: SpeechRecognition, ev: Event) => any) | null;
  onstart: ((this: SpeechRecognition, ev: Event) => any) | null;
}

declare global {
  interface Window {
    SpeechRecognition: {
      new (): SpeechRecognition;
    };
    webkitSpeechRecognition: {
      new (): SpeechRecognition;
    };
  }
}

export class SpeechRecorder {
  private recognition: SpeechRecognition | null = null;
  private mediaRecorder: MediaRecorder | null = null;
  private audioChunks: Blob[] = [];
  private isRecording = false;

  constructor() {
    this.initializeSpeechRecognition();
  }

  private initializeSpeechRecognition() {
    if (!this.isSpeechRecognitionSupported()) {
      console.warn("Speech recognition not supported in this browser");
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-IN'; // Indian English
    this.recognition.maxAlternatives = 1;
  }

  isSpeechRecognitionSupported(): boolean {
    return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  }

  async startRecording(): Promise<void> {
    if (this.isRecording) return;

    try {
      // Start audio recording
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.mediaRecorder = new MediaRecorder(stream);
      this.audioChunks = [];

      this.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          this.audioChunks.push(event.data);
        }
      };

      this.mediaRecorder.start();

      // Start speech recognition
      if (this.recognition) {
        this.recognition.start();
      }

      this.isRecording = true;
    } catch (error) {
      console.error("Error starting recording:", error);
      throw new Error("Failed to start recording. Please check microphone permissions.");
    }
  }

  stopRecording(): Promise<{ transcript: string; audioBlob: Blob }> {
    return new Promise((resolve, reject) => {
      if (!this.isRecording) {
        reject(new Error("Not currently recording"));
        return;
      }

      let transcript = "";
      let hasEnded = false;

      const handleEnd = () => {
        if (hasEnded) return;
        hasEnded = true;

        this.isRecording = false;
        
        // Stop media recorder
        if (this.mediaRecorder && this.mediaRecorder.state !== "inactive") {
          this.mediaRecorder.stop();
          
          this.mediaRecorder.onstop = () => {
            const audioBlob = new Blob(this.audioChunks, { type: 'audio/wav' });
            resolve({ transcript, audioBlob });
          };
        } else {
          // Fallback if mediaRecorder is not available
          const emptyBlob = new Blob([], { type: 'audio/wav' });
          resolve({ transcript, audioBlob: emptyBlob });
        }
      };

      // Handle speech recognition result
      if (this.recognition) {
        this.recognition.onresult = (event) => {
          let finalTranscript = "";
          
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            }
          }
          
          if (finalTranscript) {
            transcript = finalTranscript;
          }
        };

        this.recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          handleEnd();
        };

        this.recognition.onend = () => {
          handleEnd();
        };

        this.recognition.stop();
      } else {
        // If speech recognition is not available, just end recording
        setTimeout(handleEnd, 100);
      }
    });
  }

  onResult(callback: (transcript: string, isFinal: boolean) => void): void {
    if (!this.recognition) return;

    this.recognition.onresult = (event) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      callback(finalTranscript || interimTranscript, !!finalTranscript);
    };
  }

  onError(callback: (error: string) => void): void {
    if (!this.recognition) return;

    this.recognition.onerror = (event) => {
      callback(event.error);
    };
  }

  getRecordingState(): boolean {
    return this.isRecording;
  }
}

export class TextToSpeech {
  private synth: SpeechSynthesis;
  private voice: SpeechSynthesisVoice | null = null;

  constructor() {
    this.synth = window.speechSynthesis;
    this.initializeVoice();
  }

  private initializeVoice() {
    const setVoice = () => {
      const voices = this.synth.getVoices();
      // Prefer Indian English voice
      this.voice = voices.find(voice => 
        voice.lang.includes('en-IN') || 
        voice.name.toLowerCase().includes('indian')
      ) || voices.find(voice => voice.lang.includes('en')) || voices[0] || null;
    };

    setVoice();
    
    // Voices might not be loaded immediately
    if (this.synth.onvoiceschanged !== undefined) {
      this.synth.onvoiceschanged = setVoice;
    }
  }

  speak(text: string, options?: { rate?: number; pitch?: number; volume?: number }): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!text) {
        reject(new Error("No text provided"));
        return;
      }

      // Cancel any ongoing speech
      this.synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      
      if (this.voice) {
        utterance.voice = this.voice;
      }
      
      utterance.rate = options?.rate || 0.9;
      utterance.pitch = options?.pitch || 1;
      utterance.volume = options?.volume || 1;
      utterance.lang = 'en-IN';

      utterance.onend = () => resolve();
      utterance.onerror = (event) => reject(new Error(`Speech synthesis error: ${event.error}`));

      this.synth.speak(utterance);
    });
  }

  stop(): void {
    this.synth.cancel();
  }

  isSpeaking(): boolean {
    return this.synth.speaking;
  }
}
