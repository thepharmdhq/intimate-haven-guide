import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Leaf, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const navigate = useNavigate();

  const goals = [
    {
      id: "dating-clarity",
      title: "Dating Clarity",
      description: "Navigate dating with confidence and clear intentions",
      icon: Search,
      gradient: "gradient-trust"
    },
    {
      id: "intimacy-growth", 
      title: "Intimacy Growth",
      description: "Deepen emotional and physical connections",
      icon: Heart,
      gradient: "gradient-primary"
    },
    {
      id: "healing",
      title: "Healing", 
      description: "Process past experiences and build resilience",
      icon: Leaf,
      gradient: "gradient-warm"
    },
    {
      id: "self-discovery",
      title: "Self-Discovery",
      description: "Explore your authentic self and desires",
      icon: Sparkles,
      gradient: "gradient-trust"
    }
  ];

  const handleComplete = () => {
    // Here we would save the onboarding data
    navigate("/dashboard");
  };

  const renderStep1 = () => (
    <Card className="max-w-lg mx-auto shadow-warm">
      <CardHeader className="text-center space-y-4">
        <CardTitle className="text-3xl font-bold text-foreground">
          Welcome, Beautiful Soul ✨
        </CardTitle>
        <p className="text-muted-foreground">
          What would you like us to call you? You can use your real name or create a pseudonym - whatever feels most comfortable for your journey.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-3">
          <Label htmlFor="name" className="text-base font-medium">
            How should we address you?
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name or pseudonym..."
            className="text-lg py-6 rounded-xl border-2 focus:border-primary transition-all"
          />
        </div>
        
        <div className="text-center space-y-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => setStep(2)}
            disabled={!name.trim()}
            className="w-full"
          >
            Continue Your Journey
          </Button>
          
          <p className="text-sm text-muted-foreground">
            💝 Your privacy is sacred to us
          </p>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="max-w-2xl mx-auto shadow-warm">
      <CardHeader className="text-center space-y-4">
        <CardTitle className="text-3xl font-bold text-foreground">
          Hello {name}! 🌸
        </CardTitle>
        <p className="text-muted-foreground">
          What brings you to our companion today? Choose what resonates most with your heart right now.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <RadioGroup value={goal} onValueChange={setGoal} className="space-y-4">
          {goals.map((goalOption) => {
            const IconComponent = goalOption.icon;
            return (
              <Label
                key={goalOption.id}
                htmlFor={goalOption.id}
                className={`flex items-start space-x-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-soft ${
                  goal === goalOption.id 
                    ? 'border-primary shadow-soft bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value={goalOption.id} id={goalOption.id} className="mt-1" />
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${goalOption.gradient} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {goalOption.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {goalOption.description}
                  </p>
                </div>
              </Label>
            );
          })}
        </RadioGroup>
        
        <div className="text-center space-y-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={() => setStep(3)}
            disabled={!goal}
            className="w-full"
          >
            This Feels Right ✨
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setStep(1)}
            className="text-muted-foreground"
          >
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => {
    const selectedGoal = goals.find(g => g.id === goal);
    
    return (
      <Card className="max-w-lg mx-auto shadow-warm">
        <CardHeader className="text-center space-y-6">
          <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
            <Heart className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <div className="space-y-4">
            <CardTitle className="text-3xl font-bold text-foreground">
              Welcome to Your Safe Space, {name} 💕
            </CardTitle>
            
            <div className="space-y-3">
              <Badge className="bg-warmth text-accent-foreground text-base px-6 py-2">
                Your Focus: {selectedGoal?.title}
              </Badge>
              
              <p className="text-muted-foreground leading-relaxed">
                You are worthy of love, growth, and all the beautiful connections your heart desires. 
                This sisterhood is here to support you every step of the way.
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-card p-6 rounded-2xl border border-border space-y-4">
            <h4 className="font-semibold text-foreground text-center">
              Your Daily Affirmation 🌟
            </h4>
            <p className="text-center text-muted-foreground italic">
              "I trust myself to make choices that honor my heart and my growth. 
              I am deserving of healthy, reciprocal love."
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={handleComplete}
              className="w-full"
            >
              Enter Your Sanctuary ✨
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Your journey starts now, beautiful soul
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
      </div>
    </div>
  );
};

export default Onboarding;