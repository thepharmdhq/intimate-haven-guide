import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles, Leaf, Search, Shield, Users, Crown, Mail, Eye, EyeOff, Smile, Zap, Compass, Target } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [goal, setGoal] = useState("");
  const [emotionalResonance, setEmotionalResonance] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  const emotionalResonanceOptions = [
    {
      id: "hopeful-nervous",
      title: "Hopeful but nervous",
      description: "Ready to grow but feeling vulnerable about the journey",
      icon: Smile,
      gradient: "gradient-trust"
    },
    {
      id: "ready-change",
      title: "Ready for change",
      description: "Determined to break patterns and create new experiences",
      icon: Zap,
      gradient: "gradient-primary"
    },
    {
      id: "feeling-stuck",
      title: "Feeling stuck",
      description: "Seeking clarity and direction in relationships",
      icon: Compass,
      gradient: "gradient-warm"
    },
    {
      id: "cautiously-optimistic",
      title: "Cautiously optimistic",
      description: "Open to possibilities while protecting your heart",
      icon: Shield,
      gradient: "gradient-trust"
    },
    {
      id: "overwhelmed-determined",
      title: "Overwhelmed but determined",
      description: "Life feels intense but you're committed to growth",
      icon: Target,
      gradient: "gradient-primary"
    },
    {
      id: "excited-grow",
      title: "Excited to grow",
      description: "Enthusiastic about self-discovery and new connections",
      icon: Sparkles,
      gradient: "gradient-warm"
    }
  ];

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const handleSignUp = async () => {
    if (!validateEmail(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        title: "Weak password",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please ensure both passwords are identical.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/dashboard`,
          data: {
            name: name,
          }
        }
      });

      if (error) {
        if (error.message.includes("already registered")) {
          toast({
            title: "Account exists",
            description: "An account with this email already exists. Try signing in instead.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Signup failed",
            description: error.message,
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
        setStep(3);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartPaidTrial = () => {
    // Here we would integrate with Stripe for payment processing
    console.log(`Starting ${selectedPlan} plan for ${name} with goal: ${goal} and emotional state: ${emotionalResonance}`);
    navigate("/dashboard?plan=" + selectedPlan);
  };

  // Step 1: Name Collection
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

  // Step 2: Email Signup & Password Creation
  const renderStep2 = () => (
    <Card className="max-w-lg mx-auto shadow-warm">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center">
          <Mail className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-3xl font-bold text-foreground">
          Create Your Sacred Space, {name} 🔐
        </CardTitle>
        <p className="text-muted-foreground">
          Let's create your secure account. Your privacy and safety are our highest priorities.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-base font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              className="text-lg py-6 rounded-xl border-2 focus:border-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="text-base font-medium">
              Create Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters..."
                className="text-lg py-6 rounded-xl border-2 focus:border-primary transition-all pr-12"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-base font-medium">
              Confirm Password
            </Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password..."
              className="text-lg py-6 rounded-xl border-2 focus:border-primary transition-all"
            />
          </div>
        </div>

        <div className="bg-card p-4 rounded-xl border border-border space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-trust" />
            <p className="text-sm font-medium text-foreground">Your Privacy Promise</p>
          </div>
          <p className="text-xs text-muted-foreground">
            We protect your data with military-grade encryption. Your information is never shared or sold.
          </p>
        </div>
        
        <div className="text-center space-y-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleSignUp}
            disabled={!email.trim() || !password.trim() || !confirmPassword.trim() || isLoading}
            className="w-full"
          >
            {isLoading ? "Creating Your Account..." : "Create Sacred Space ✨"}
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setStep(1)}
            className="text-muted-foreground"
            disabled={isLoading}
          >
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Step 3: Goal Selection
  const renderStep3 = () => (
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
            onClick={() => setStep(4)}
            disabled={!goal}
            className="w-full"
          >
            This Feels Right ✨
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setStep(2)}
            className="text-muted-foreground"
          >
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Step 4: Quick Emotional Resonance
  const renderStep4 = () => (
    <Card className="max-w-2xl mx-auto shadow-warm">
      <CardHeader className="text-center space-y-4">
        <div className="mx-auto w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center">
          <Heart className="w-8 h-8 text-primary-foreground" />
        </div>
        <CardTitle className="text-3xl font-bold text-foreground">
          How Are You Feeling, {name}? 💕
        </CardTitle>
        <p className="text-muted-foreground">
          Your emotional state matters. Choose what resonates with how you're feeling about this journey right now.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <RadioGroup value={emotionalResonance} onValueChange={setEmotionalResonance} className="space-y-4">
          {emotionalResonanceOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Label
                key={option.id}
                htmlFor={option.id}
                className={`flex items-start space-x-4 p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:shadow-soft ${
                  emotionalResonance === option.id 
                    ? 'border-primary shadow-soft bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                }`}
              >
                <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 bg-${option.gradient} rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">
                      {option.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground">
                    {option.description}
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
            onClick={() => setStep(5)}
            disabled={!emotionalResonance}
            className="w-full"
          >
            Yes, This Feels Right ✨
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setStep(3)}
            className="text-muted-foreground"
          >
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  // Step 5: Welcome/Affirmation (Personalized)
  const renderStep5 = () => {
    const selectedGoal = goals.find(g => g.id === goal);
    const selectedEmotion = emotionalResonanceOptions.find(e => e.id === emotionalResonance);
    
    // Personalized affirmation based on goal and emotional state
    const getPersonalizedAffirmation = () => {
      if (emotionalResonance === "hopeful-nervous") {
        return "It's beautiful to feel both hope and nervousness. Your courage to be vulnerable is your greatest strength.";
      } else if (emotionalResonance === "ready-change") {
        return "Your readiness for change is powerful. Trust in your ability to create the love you deserve.";
      } else if (emotionalResonance === "feeling-stuck") {
        return "Being stuck is temporary. You're exactly where you need to be to begin moving forward.";
      } else if (emotionalResonance === "cautiously-optimistic") {
        return "Your caution shows wisdom, and your optimism shows hope. Both will guide you well.";
      } else if (emotionalResonance === "overwhelmed-determined") {
        return "Your determination in the midst of overwhelm shows incredible strength. You've got this.";
      } else {
        return "Your excitement for growth is contagious! This energy will carry you far.";
      }
    };

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
              <Badge className="bg-gradient-warm text-primary-foreground text-base px-6 py-2">
                Your Focus: {selectedGoal?.title}
              </Badge>
              
              <Badge className="bg-gradient-trust text-primary-foreground text-base px-6 py-2">
                You're Feeling: {selectedEmotion?.title}
              </Badge>
              
              <p className="text-muted-foreground leading-relaxed">
                You are worthy of love, growth, and all the beautiful connections your heart desires. 
                This companion is here to support you every step of the way.
              </p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-card p-6 rounded-2xl border border-border space-y-4">
            <h4 className="font-semibold text-foreground text-center">
              Your Personal Affirmation 🌟
            </h4>
            <p className="text-center text-muted-foreground italic">
              "{getPersonalizedAffirmation()}"
            </p>
          </div>
          
          <div className="text-center space-y-4">
            <Button 
              variant="hero" 
              size="lg" 
              onClick={() => setStep(6)}
              className="w-full"
            >
              Continue Your Journey ✨
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Your journey starts now, beautiful soul
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Step 6: Plan Selection
  const renderStep6 = () => (
    <Card className="max-w-4xl mx-auto shadow-warm">
      <CardHeader className="text-center space-y-6">
        <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center">
          <Crown className="w-10 h-10 text-primary-foreground" />
        </div>
        
        <div className="space-y-4">
          <CardTitle className="text-3xl font-bold text-foreground">
            Choose Your Growth Path, {name} 💕
          </CardTitle>
          
          <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
            Your journey toward deeper intimacy and connection deserves the best support. 
            Choose the plan that feels right for your heart's desires.
          </p>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Monthly Plan */}
          <Card className={`border-2 cursor-pointer transition-all duration-300 hover:shadow-soft ${
            selectedPlan === "monthly" 
              ? 'border-primary shadow-soft bg-primary/5' 
              : 'border-border hover:border-primary/50'
          }`} onClick={() => setSelectedPlan("monthly")}>
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Monthly Companion</h3>
                <p className="text-muted-foreground text-sm">Perfect for exploring our sacred space</p>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">$9.99</div>
                <div className="text-muted-foreground text-sm">per month</div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Full Reflection Coach access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span>Relationship tracking tools</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Blind spot awareness</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Expression script library</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Annual Plan */}
          <Card className={`border-2 cursor-pointer transition-all duration-300 relative overflow-hidden ${
            selectedPlan === "annual" 
              ? 'border-primary shadow-glow bg-primary/5' 
              : 'border-primary/30 hover:border-primary shadow-soft'
          }`} onClick={() => setSelectedPlan("annual")}>
            <div className="absolute top-4 right-4">
              <Badge className="bg-gradient-primary text-primary-foreground text-xs">
                Best Value + Free Trial
              </Badge>
            </div>
            
            <CardContent className="p-6 space-y-4">
              <div className="space-y-2">
                <h3 className="text-xl font-bold text-foreground">Annual Journey</h3>
                <p className="text-muted-foreground text-sm">Your year of transformation awaits</p>
              </div>
              
              <div className="space-y-1">
                <div className="text-3xl font-bold text-primary">$99.99</div>
                <div className="text-muted-foreground text-sm">per year</div>
                <div className="text-xs text-trust font-medium">Save $20 + 1 week free trial</div>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span>Everything in Monthly</span>
                </div>
                <div className="flex items-center gap-2">
                  <Crown className="w-4 h-4 text-primary" />
                  <span>1 week completely free</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-primary" />
                  <span>Priority feature updates</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  <span>Extended reflection history</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="bg-card p-6 rounded-2xl border border-border space-y-3">
          <div className="flex items-center gap-2 justify-center">
            <Shield className="w-5 h-5 text-trust" />
            <p className="text-sm font-medium text-foreground">
              Protected by our Sacred Space Promise
            </p>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Your privacy is sacred. Cancel anytime. Your growth is guaranteed or your money back.
          </p>
        </div>
        
        <div className="text-center space-y-4">
          <Button 
            variant="hero" 
            size="lg" 
            onClick={handleStartPaidTrial}
            disabled={!selectedPlan}
            className="w-full max-w-md"
          >
            {selectedPlan === "annual" ? "Start Free Trial" : "Begin Monthly Journey"} ✨
          </Button>
          
          <Button 
            variant="ghost" 
            onClick={() => setStep(5)}
            className="text-muted-foreground text-xs block mx-auto"
          >
            Back
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-6">
      <div className="w-full">
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        {step === 5 && renderStep5()}
        {step === 6 && renderStep6()}
      </div>
    </div>
  );
};

export default Onboarding;