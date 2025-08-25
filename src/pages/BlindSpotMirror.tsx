import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Eye, Lightbulb, Heart, MessageCircle, Zap, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PatternCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  prompts: string[];
  color: string;
}

interface Discovery {
  id: string;
  category: string;
  insight: string;
  date: string;
}

const BlindSpotMirror = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [response, setResponse] = useState("");
  const [discoveries, setDiscoveries] = useState<Discovery[]>([
    {
      id: "1",
      category: "Communication Patterns",
      insight: "I tend to over-explain when I'm feeling insecure about being understood",
      date: "2024-01-10"
    }
  ]);

  const categories: PatternCategory[] = [
    {
      id: "communication",
      title: "Communication Patterns", 
      description: "How you express yourself and connect with others",
      icon: <MessageCircle className="h-6 w-6" />,
      prompts: [
        "When do you find yourself explaining things more than necessary?",
        "What topics make you speak faster or slower than usual?",
        "How do you respond when someone doesn't understand you the first time?",
        "What patterns do you notice in how you start difficult conversations?"
      ],
      color: "bg-gradient-trust"
    },
    {
      id: "intimacy",
      title: "Intimacy Boundaries",
      description: "Your comfort zones in emotional and physical closeness", 
      icon: <Heart className="h-6 w-6" />,
      prompts: [
        "What makes you feel most emotionally safe with someone?",
        "When do you notice yourself pulling back from connection?",
        "How do you express affection when words feel too vulnerable?",
        "What signals tell you someone wants more or less closeness than you do?"
      ],
      color: "bg-gradient-warm"
    },
    {
      id: "emotional",
      title: "Emotional Patterns",
      description: "Your unique ways of feeling and processing emotions",
      icon: <Zap className="h-6 w-6" />,
      prompts: [
        "What emotions do you feel most comfortable expressing?",
        "How does your body tell you when you're overwhelmed?",
        "What triggers make you feel like you're 'too much' for others?",
        "When do you find yourself minimizing your own feelings?"
      ],
      color: "bg-gradient-primary"
    }
  ];

  const getCurrentCategory = () => categories.find(cat => cat.id === selectedCategory);
  const getCurrentPrompt = () => {
    const category = getCurrentCategory();
    return category?.prompts[currentPromptIndex] || "";
  };

  const saveDiscovery = () => {
    if (response.trim() && selectedCategory) {
      const category = getCurrentCategory();
      const discovery: Discovery = {
        id: Date.now().toString(),
        category: category?.title || "",
        insight: response.trim(),
        date: new Date().toISOString().split('T')[0]
      };
      setDiscoveries([discovery, ...discoveries]);
      setResponse("");
      
      // Move to next prompt or finish
      const category_obj = getCurrentCategory();
      if (category_obj && currentPromptIndex < category_obj.prompts.length - 1) {
        setCurrentPromptIndex(currentPromptIndex + 1);
      } else {
        setSelectedCategory(null);
        setCurrentPromptIndex(0);
      }
    }
  };

  const skipPrompt = () => {
    const category = getCurrentCategory();
    if (category && currentPromptIndex < category.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1);
    } else {
      setSelectedCategory(null);
      setCurrentPromptIndex(0);
    }
    setResponse("");
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/dashboard")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Blind Spot Mirror</h1>
          <p className="text-muted-foreground">
            Gentle guided prompts to help you discover your unique patterns with kindness and curiosity.
          </p>
        </div>

        {!selectedCategory ? (
          <>
            {/* Category Selection */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((category) => (
                <Card 
                  key={category.id}
                  className="cursor-pointer transition-all hover:shadow-warm hover:scale-105 shadow-soft"
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <CardHeader className={`${category.color} text-foreground rounded-t-lg`}>
                    <div className="flex items-center gap-3">
                      {category.icon}
                      <CardTitle className="text-lg">{category.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-4">
                    <CardDescription className="text-muted-foreground">
                      {category.description}
                    </CardDescription>
                    <div className="mt-4">
                      <Badge variant="outline" className="text-xs">
                        {category.prompts.length} prompts
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Recent Discoveries */}
            {discoveries.length > 0 && (
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-foreground">
                    <Lightbulb className="h-5 w-5" />
                    Your Recent Discoveries
                  </CardTitle>
                  <CardDescription>Insights you've uncovered about yourself</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {discoveries.slice(0, 3).map((discovery) => (
                      <div key={discovery.id} className="p-4 border border-border rounded-lg bg-card">
                        <div className="flex items-start justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {discovery.category}
                          </Badge>
                          <span className="text-xs text-muted-foreground">
                            {new Date(discovery.date).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-foreground italic">"{discovery.insight}"</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          /* Active Reflection Session */
          <div className="space-y-6">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${getCurrentCategory()?.color}`}>
                      {getCurrentCategory()?.icon}
                    </div>
                    <div>
                      <CardTitle className="text-foreground">{getCurrentCategory()?.title}</CardTitle>
                      <CardDescription>
                        Prompt {currentPromptIndex + 1} of {getCurrentCategory()?.prompts.length}
                      </CardDescription>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => {
                      setSelectedCategory(null);
                      setCurrentPromptIndex(0);
                      setResponse("");
                    }}
                  >
                    Exit Session
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="p-6 bg-muted rounded-lg">
                  <div className="flex items-start gap-3">
                    <Eye className="h-5 w-5 text-primary mt-1" />
                    <p className="text-lg text-foreground leading-relaxed">
                      {getCurrentPrompt()}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Take your time... what comes up for you?
                  </label>
                  <Textarea
                    placeholder="There's no wrong answer. Just notice what you notice..."
                    value={response}
                    onChange={(e) => setResponse(e.target.value)}
                    rows={6}
                    className="w-full"
                  />
                </div>

                <div className="flex gap-3">
                  <Button 
                    onClick={saveDiscovery}
                    disabled={!response.trim()}
                    className="bg-gradient-primary text-primary-foreground shadow-soft"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Save & Continue
                  </Button>
                  <Button variant="outline" onClick={skipPrompt}>
                    Skip This One
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-xs text-muted-foreground">
                    Remember: This is about gentle curiosity, not judgment. You're exploring, not fixing.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlindSpotMirror;