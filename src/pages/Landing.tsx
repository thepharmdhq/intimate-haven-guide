import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Sparkles, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-confidants.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-90"></div>
        <div className="relative container mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <Badge className="bg-warmth text-accent-foreground w-fit">
                Your trusted confidant awaits ✨
              </Badge>
              
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight">
                  Intimately
                </h1>
                <p className="text-xl text-primary-foreground/90 leading-relaxed">
                  Your culturally safe space for intimacy, relationships, and personal growth. 
                  Join a trusted confidant where your journey matters.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" onClick={() => navigate("/onboarding")}>
                  Start Your Journey
                </Button>
                <Button variant="soft" size="lg" onClick={() => navigate("/about")}>
                  Learn More
                </Button>
              </div>

              <div className="text-center">
                <p className="text-sm text-primary-foreground/70">
                  Already have an account?{" "}
                  <button 
                    onClick={() => navigate("/login")}
                    className="text-primary-foreground underline underline-offset-4 hover:no-underline transition-all"
                  >
                    Sign In
                  </button>
                </p>
              </div>

              <div className="flex items-center gap-6 text-primary-foreground/80">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  <span className="text-sm">Private & Safe</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  <span className="text-sm">Culturally Aware</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Best Friend Energy</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-glow/20 to-transparent rounded-3xl"></div>
              <img 
                src={heroImage} 
                alt="Four diverse confidants - three women and one man - in a supportive, intimate conversation"
                className="w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-warm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              Invest in Your Growth
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join our exclusive confidant with pricing that honors your journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Monthly Plan */}
            <Card className="border-2 border-border hover:border-primary/50 transition-all duration-300 hover:shadow-soft">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Monthly</h3>
                  <p className="text-muted-foreground">Perfect for trying our confidant</p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">$9.99</div>
                  <div className="text-muted-foreground">per month</div>
                </div>

                <Button variant="warm" className="w-full">
                  Start Monthly Journey
                </Button>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Full access to Reflection Coach</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Relationship tracking tools</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Blind spot awareness prompts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Script library access</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Annual Plan */}
            <Card className="border-2 border-primary shadow-glow relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge className="bg-gradient-primary text-primary-foreground">
                  Best Value + Free Trial
                </Badge>
              </div>
              
              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-foreground">Annual</h3>
                  <p className="text-muted-foreground">Your year of transformation</p>
                </div>
                
                <div className="space-y-2">
                  <div className="text-4xl font-bold text-primary">$99.99</div>
                  <div className="text-muted-foreground">per year</div>
                  <div className="text-sm text-trust font-medium">Save $20 + 1 week free trial</div>
                </div>

                <Button variant="hero" className="w-full">
                  Start Free Trial
                </Button>

                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Everything in Monthly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>1 week completely free</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Priority feature updates</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Extended reflection history</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12 space-y-4">
            <p className="text-muted-foreground">
              🔒 Your privacy and growth are our priority. Cancel anytime.
            </p>
            <p className="text-sm text-muted-foreground">
              Joining means connecting with a trusted relationship companion who has your back.
            </p>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-4xl font-bold text-foreground">
              Your Best Friend Toolkit
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Support designed with women in mind, guided by cultural understanding, for anyone looking for connection and clarity.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6 hover:shadow-soft transition-all duration-300 hover:scale-105">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Reflection Coach</h3>
                <p className="text-muted-foreground text-sm">
                  Your private journaling companion with culturally aware prompts
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-soft transition-all duration-300 hover:scale-105">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-trust rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Where Are We?</h3>
                <p className="text-muted-foreground text-sm">
                  Track relationship reciprocity with gentle, friend-like insights
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-soft transition-all duration-300 hover:scale-105">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                  <Sparkles className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Blind Spot Mirror</h3>
                <p className="text-muted-foreground text-sm">
                  Discover patterns without judgment, like a caring friend would
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-soft transition-all duration-300 hover:scale-105">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Expression Scripts</h3>
                <p className="text-muted-foreground text-sm">
                  Templates for boundaries and clarity, written with love
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;