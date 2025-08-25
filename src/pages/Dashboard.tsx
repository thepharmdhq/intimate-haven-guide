import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, MessageCircle, Eye, FileText, Sparkles, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const userName = "Beautiful Soul"; // This would come from user context

  const features = [
    {
      id: "reflection-coach",
      title: "Reflection Coach",
      subtitle: "Your private journaling companion",
      description: "Pour your heart out and receive gentle, culturally aware prompts",
      icon: MessageCircle,
      gradient: "gradient-primary",
      action: "Start Reflecting",
      path: "/reflection"
    },
    {
      id: "where-are-we",
      title: "Where Are We?",
      subtitle: "Relationship reciprocity tracker", 
      description: "Visualize the give and take in your connections",
      icon: Heart,
      gradient: "gradient-trust",
      action: "Track Relationship",
      path: "/tracker"
    },
    {
      id: "blind-spot-mirror",
      title: "Blind Spot Mirror",
      subtitle: "Pattern recognition prompts",
      description: "Discover your patterns with love and without judgment",
      icon: Eye,
      gradient: "gradient-warm",
      action: "Explore Patterns",
      path: "/patterns"
    },
    {
      id: "expression-scripts",
      title: "Expression Scripts",
      subtitle: "Boundary & clarity templates",
      description: "Find the words for difficult conversations",
      icon: FileText,
      gradient: "gradient-trust",
      action: "Browse Scripts",
      path: "/scripts"
    }
  ];

  const todaysAffirmation = "You are building the life and love you deserve, one mindful choice at a time. Trust your intuition today. 💕";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-6 py-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-primary-foreground mb-2">
                Welcome back, {userName} ✨
              </h1>
              <p className="text-primary-foreground/80">
                Your sanctuary for growth and self-discovery
              </p>
            </div>
            <Button variant="soft" size="sm" onClick={() => navigate("/settings")}>
              Settings
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Daily Affirmation */}
        <Card className="border-2 border-primary/20 shadow-soft">
          <CardContent className="p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">Today's Affirmation</h3>
                  <Badge className="bg-warmth text-accent-foreground text-xs">
                    {new Date().toLocaleDateString('en-US', { weekday: 'long' })}
                  </Badge>
                </div>
                <p className="text-muted-foreground italic leading-relaxed">
                  {todaysAffirmation}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-soft transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-primary mb-1">7</div>
              <div className="text-sm text-muted-foreground">Days on your journey</div>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-soft transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-trust mb-1">12</div>
              <div className="text-sm text-muted-foreground">Reflections written</div>
            </CardContent>
          </Card>
          
          <Card className="text-center hover:shadow-soft transition-all duration-300">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-warmth mb-1">3</div>
              <div className="text-sm text-muted-foreground">Patterns discovered</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Features */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Your Toolkit for Growth</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {features.map((feature) => {
              const IconComponent = feature.icon;
              return (
                <Card 
                  key={feature.id}
                  className="hover:shadow-soft transition-all duration-300 hover:scale-105 cursor-pointer group"
                  onClick={() => navigate(feature.path)}
                >
                  <CardHeader className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className={`w-14 h-14 bg-${feature.gradient} rounded-2xl flex items-center justify-center`}>
                        <IconComponent className="w-7 h-7 text-primary-foreground" />
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {feature.action} →
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <CardTitle className="text-xl text-foreground">
                        {feature.title}
                      </CardTitle>
                      <p className="text-sm text-primary font-medium">
                        {feature.subtitle}
                      </p>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Recent Reflections
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                <div>
                  <div className="font-medium text-foreground">Morning Self-Check</div>
                  <div className="text-sm text-muted-foreground">Explored feelings about boundaries</div>
                </div>
                <div className="text-xs text-muted-foreground">Yesterday</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                <div>
                  <div className="font-medium text-foreground">Dating Reflection</div>
                  <div className="text-sm text-muted-foreground">Noticed a pattern in communication</div>
                </div>
                <div className="text-xs text-muted-foreground">3 days ago</div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-card rounded-xl border border-border">
                <div>
                  <div className="font-medium text-foreground">Self-Love Practice</div>
                  <div className="text-sm text-muted-foreground">Worked through some healing affirmations</div>
                </div>
                <div className="text-xs text-muted-foreground">1 week ago</div>
              </div>
            </div>
            
            <Button variant="warm" className="w-full">
              Start New Reflection ✨
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;