import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface Voice {
  name: string;
  lang: string;
  voiceURI: string;
}

export const ConversationPractice = () => {
  const [conversationText, setConversationText] = useState('');
  const [sentences, setSentences] = useState<string[]>([]);
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  // Get available voices on component mount
  useEffect(() => {
    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      const femaleVoices = voices.filter((voice) => {
        const name = voice.name.toLowerCase();
        const lang = voice.lang.toLowerCase();
        return (
          name.includes('female') ||
          name.includes('woman') ||
          name.includes('girl') ||
          name.includes('zira') ||
          name.includes('susan') ||
          name.includes('catherine') ||
          name.includes('samantha') ||
          name.includes('victoria') ||
          name.includes('karen') ||
          name.includes('melissa') ||
          lang.includes('en')
        );
      });
      
      const allVoices = voices.map(voice => ({
        name: voice.name,
        lang: voice.lang,
        voiceURI: voice.voiceURI
      }));

      // Prioritize female voices
      const sortedVoices = [
        ...femaleVoices.map(voice => ({
          name: `👩 ${voice.name}`,
          lang: voice.lang,
          voiceURI: voice.voiceURI
        })),
        ...allVoices.filter(voice => 
          !femaleVoices.some(fv => fv.voiceURI === voice.voiceURI)
        )
      ];

      setAvailableVoices(sortedVoices);
      if (sortedVoices.length > 0) {
        setSelectedVoice(sortedVoices[0].voiceURI);
      }
    };

    if (window.speechSynthesis.getVoices().length > 0) {
      getVoices();
    } else {
      window.speechSynthesis.addEventListener('voiceschanged', getVoices);
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', getVoices);
      };
    }
  }, []);

  const handleStartConversation = () => {
    if (!conversationText.trim()) {
      toast({
        title: "Oops! 💭",
        description: "Please enter some conversation text first",
        variant: "destructive"
      });
      return;
    }

    const parsedSentences = conversationText
      .split(';')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    if (parsedSentences.length === 0) {
      toast({
        title: "Oops! 💭",
        description: "Please separate sentences with semicolons (;)",
        variant: "destructive"
      });
      return;
    }

    setSentences(parsedSentences);
    setCurrentSentenceIndex(0);
    setIsStarted(true);
    
    toast({
      title: "Let's practice! 💕",
      description: `Ready to practice ${parsedSentences.length} sentences`,
    });
  };

  const speakSentence = useCallback(() => {
    if (currentSentenceIndex >= sentences.length) {
      toast({
        title: "Great job! 🎉",
        description: "You've completed all sentences!",
      });
      setIsStarted(false);
      setCurrentSentenceIndex(0);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(sentences[currentSentenceIndex]);
    
    // Find and set the selected voice
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(v => v.voiceURI === selectedVoice);
    if (voice) {
      utterance.voice = voice;
    }

    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 1;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      setCurrentSentenceIndex(prev => prev + 1);
    };
    utterance.onerror = () => {
      setIsSpeaking(false);
      toast({
        title: "Oops! 🤔",
        description: "There was an issue with speech synthesis",
        variant: "destructive"
      });
    };

    window.speechSynthesis.speak(utterance);
  }, [currentSentenceIndex, sentences, selectedVoice, toast]);

  const handleNextSentence = () => {
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    speakSentence();
  };

  const resetConversation = () => {
    window.speechSynthesis.cancel();
    setIsStarted(false);
    setCurrentSentenceIndex(0);
    setIsSpeaking(false);
  };

  const progress = sentences.length > 0 ? (currentSentenceIndex / sentences.length) * 100 : 0;

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6">
      <Card className="bg-gradient-card shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-foreground">
            Practice Your Conversations 💕
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {!isStarted ? (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Paste your conversation (separate sentences with semicolons ;):
                </label>
                <Textarea
                  placeholder="Hello, how are you today?; I'm doing great, thank you for asking; What are your plans for the weekend?"
                  value={conversationText}
                  onChange={(e) => setConversationText(e.target.value)}
                  rows={4}
                  className="bg-background/50 border-border/50 focus:border-primary/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">
                  Choose voice:
                </label>
                <Select value={selectedVoice} onValueChange={setSelectedVoice}>
                  <SelectTrigger className="bg-background/50 border-border/50">
                    <SelectValue placeholder="Select a voice" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border/50 shadow-card">
                    {availableVoices.map((voice) => (
                      <SelectItem key={voice.voiceURI} value={voice.voiceURI}>
                        {voice.name} ({voice.lang})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={handleStartConversation}
                variant="lovable"
                size="lg"
                className="w-full"
              >
                Start Practice 🎯
              </Button>
            </>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-muted-foreground">
                    Progress: {currentSentenceIndex} / {sentences.length}
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    {Math.round(progress)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="bg-gradient-primary h-2 rounded-full transition-all duration-300 ease-smooth"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {currentSentenceIndex < sentences.length ? (
                <div className="space-y-4">
                  <div className="p-4 bg-background/50 rounded-lg border border-border/50">
                    <p className="text-lg text-foreground font-medium">
                      "{sentences[currentSentenceIndex]}"
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleNextSentence}
                    variant="lovable"
                    size="lg"
                    className="w-full"
                    disabled={false}
                  >
                    {isSpeaking ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-pulse-glow">🎤</span>
                        Speaking...
                      </span>
                    ) : currentSentenceIndex === 0 ? (
                      'Start Speaking 🗣️'
                    ) : (
                      'Next Sentence ➡️'
                    )}
                  </Button>
                </div>
              ) : (
                <div className="text-center space-y-4">
                  <div className="text-4xl animate-bounce-gentle">🎉</div>
                  <p className="text-lg font-semibold text-foreground">
                    Great job! You've completed all sentences!
                  </p>
                </div>
              )}

              <Button
                onClick={resetConversation}
                variant="secondary"
                size="sm"
                className="w-full"
              >
                Reset Practice
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};