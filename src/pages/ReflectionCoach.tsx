import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Heart, Mic, Send, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ReflectionCoach = () => {
  const navigate = useNavigate();
  const [reflectionText, setReflectionText] = useState("");
  const [isVoiceRecording, setIsVoiceRecording] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([
    {
      type: "coach",
      message: "Hello beautiful soul ✨ I'm here to listen without judgment and help you explore your thoughts and feelings. What's on your heart today?",
      timestamp: new Date()
    }
  ]);

  const handleSendReflection = () => {
    if (!reflectionText.trim()) return;

    // Add user's reflection to conversation
    const userMessage = {
      type: "user",
      message: reflectionText,
      timestamp: new Date()
    };

    // Generate a warm, supportive coach response (in a real app, this would come from AI)
    const coachResponses = [
      "I hear you, and thank you for sharing something so personal with me. It takes courage to be vulnerable. What feelings are coming up for you as you reflect on this?",
      "Your awareness of this pattern shows such beautiful growth. How do you think this insight might guide you moving forward?",
      "I can feel the love you have for yourself in these words. What would you say to a dear friend who shared this same experience with you?",
      "This reflection shows how much you're evolving. What part of this feels most important for you to sit with right now?",
      "Your honesty is so refreshing. How does it feel in your body when you think about this situation?"
    ];

    const coachMessage = {
      type: "coach", 
      message: coachResponses[Math.floor(Math.random() * coachResponses.length)],
      timestamp: new Date()
    };

    setConversationHistory([...conversationHistory, userMessage, coachMessage]);
    setReflectionText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendReflection();
    }
  };

  const prompts = [
    "How am I feeling about my relationships right now?",
    "What patterns do I notice in my dating life?", 
    "What boundaries do I need to honor today?",
    "What would self-love look like for me right now?",
    "What is my intuition telling me about this situation?"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-primary">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard")}
              className="text-primary-foreground hover:bg-primary-foreground/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                Reflection Coach
              </h1>
              <p className="text-primary-foreground/80">
                Your private space for gentle self-discovery
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Conversation */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="min-h-[500px] flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Your Safe Conversation
                  </CardTitle>
                  <Badge className="bg-warmth text-accent-foreground">
                    Private & Secure
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col">
                {/* Conversation History */}
                <div className="flex-1 space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {conversationHistory.map((message, index) => (
                    <div
                      key={index}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md p-4 rounded-2xl ${
                          message.type === 'user'
                            ? 'bg-gradient-primary text-primary-foreground'
                            : 'bg-card border border-border'
                        }`}
                      >
                        <p className="text-sm leading-relaxed">{message.message}</p>
                        <p className={`text-xs mt-2 ${
                          message.type === 'user' 
                            ? 'text-primary-foreground/70' 
                            : 'text-muted-foreground'
                        }`}>
                          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input Area */}
                <div className="space-y-4">
                  <Textarea
                    value={reflectionText}
                    onChange={(e) => setReflectionText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Share what's on your heart... Press Enter to send, Shift+Enter for new line"
                    className="min-h-[100px] resize-none border-2 focus:border-primary rounded-xl"
                  />
                  
                  <div className="flex items-center justify-between">
                    <Button
                      variant={isVoiceRecording ? "destructive" : "soft"}
                      size="sm"
                      onClick={() => setIsVoiceRecording(!isVoiceRecording)}
                    >
                      <Mic className="w-4 h-4 mr-2" />
                      {isVoiceRecording ? "Stop Recording" : "Voice Note"}
                    </Button>
                    
                    <Button 
                      variant="hero" 
                      onClick={handleSendReflection}
                      disabled={!reflectionText.trim()}
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Gentle Prompts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sparkles className="w-5 h-5 text-primary" />
                  Gentle Prompts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {prompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="soft"
                    size="sm"
                    className="w-full text-left justify-start text-wrap h-auto p-3"
                    onClick={() => setReflectionText(prompt)}
                  >
                    {prompt}
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Today's Affirmation */}
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-primary-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-semibold text-foreground">
                    Your Daily Reminder
                  </h3>
                  <p className="text-sm text-muted-foreground italic">
                    "You are worthy of love that feels easy, safe, and reciprocal. Trust your heart's wisdom today."
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Reflection Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Journey</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Reflections this week</span>
                  <span className="font-semibold text-primary">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Insights discovered</span>
                  <span className="font-semibold text-trust">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Days active</span>
                  <span className="font-semibold text-warmth">12</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReflectionCoach;