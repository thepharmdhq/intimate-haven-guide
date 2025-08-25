import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageSquare, Heart, Shield, DoorOpen, Copy, Edit } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Script {
  id: string;
  title: string;
  category: string;
  template: string;
  customized?: string;
  tags: string[];
}

interface ScriptCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
}

const ExpressionScripts = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [editingScript, setEditingScript] = useState<string | null>(null);
  const [customTemplate, setCustomTemplate] = useState("");

  const categories: ScriptCategory[] = [
    {
      id: "boundaries",
      title: "Boundary Setting",
      description: "Clear, kind ways to communicate your limits",
      icon: <Shield className="h-5 w-5" />,
      color: "bg-gradient-trust"
    },
    {
      id: "clarity",
      title: "Clarity Conversations", 
      description: "Scripts for when you need to understand or be understood",
      icon: <MessageSquare className="h-5 w-5" />,
      color: "bg-gradient-warm"
    },
    {
      id: "exit",
      title: "Graceful Exits",
      description: "Compassionate ways to step back or say goodbye",
      icon: <DoorOpen className="h-5 w-5" />,
      color: "bg-gradient-primary"
    }
  ];

  const scripts: Script[] = [
    {
      id: "1",
      title: "When You Need Space",
      category: "boundaries",
      template: "I care about our [relationship/friendship] and I'm noticing I need some space to [recharge/process/think]. This isn't about you doing anything wrong - it's about me taking care of myself so I can show up better. Can we [specific ask, like 'check in next week' or 'text instead of call for a few days']?",
      tags: ["space", "boundaries", "self-care"]
    },
    {
      id: "2", 
      title: "Saying No to Plans",
      category: "boundaries",
      template: "Thank you for thinking of me! I won't be able to [specific event/plan] because [brief, honest reason or just 'I have other commitments']. I hope you have a wonderful time, and I'd love to [alternative way to connect, if desired].",
      tags: ["declining", "plans", "gratitude"]
    },
    {
      id: "3",
      title: "When Someone Overshares",
      category: "boundaries", 
      template: "I can hear this is really important to you. I care about you, and I'm not the right person to help with this. Have you considered [therapist/counselor/other support]? I'm better at supporting you with [what you can offer instead].",
      tags: ["oversharing", "redirection", "support"]
    },
    {
      id: "4",
      title: "Asking for Clarification",
      category: "clarity",
      template: "I want to make sure I understand you correctly. When you said [specific thing], I heard [your interpretation]. Is that what you meant, or did I miss something?",
      tags: ["clarification", "understanding", "communication"]
    },
    {
      id: "5",
      title: "When You're Confused",
      category: "clarity", 
      template: "I'm feeling a bit confused about [specific situation]. Could you help me understand [specific question]? I want to make sure we're on the same page.",
      tags: ["confusion", "help", "alignment"]
    },
    {
      id: "6",
      title: "Addressing Mixed Signals",
      category: "clarity",
      template: "I'm getting some mixed signals and I'd rather just ask directly than assume. [Specific observation about the mixed signals]. Can you help me understand where things stand?",
      tags: ["mixed-signals", "directness", "honesty"]
    },
    {
      id: "7",
      title: "Ending a Romantic Relationship",
      category: "exit",
      template: "I've been thinking a lot about us, and I need to be honest about where I'm at. I care about you, and I don't see this working long-term because [honest reason]. I think we both deserve [what you both deserve]. I'd like to [how you want to handle the transition].",
      tags: ["breakup", "honesty", "kindness"]
    },
    {
      id: "8",
      title: "Stepping Back from Friendship",
      category: "exit", 
      template: "I've been reflecting on our friendship, and I think I need to step back for a while. This isn't about anger or anything you did wrong - it's about [honest reason, like 'different life stages' or 'needing to focus my energy differently']. I wish you well.",
      tags: ["friendship", "stepping-back", "well-wishes"]
    }
  ];

  const filteredScripts = selectedCategory === "all" 
    ? scripts 
    : scripts.filter(script => script.category === selectedCategory);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "Script template copied and ready to customize!",
    });
  };

  const saveCustomization = (scriptId: string) => {
    // In a real app, this would save to database
    toast({
      title: "Customization saved",
      description: "Your personalized script has been saved.",
    });
    setEditingScript(null);
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Expression Scripts</h1>
          <p className="text-muted-foreground">
            Thoughtful templates for the conversations that matter. Adapt them to your voice and situation.
          </p>
        </div>

        {/* Category Filter */}
        <Card className="shadow-soft">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-3">
              <Button 
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
                size="sm"
              >
                All Scripts
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  size="sm"
                  className="flex items-center gap-2"
                >
                  {category.icon}
                  {category.title}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Description */}
        {selectedCategory !== "all" && (
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              {(() => {
                const category = categories.find(cat => cat.id === selectedCategory);
                return category ? (
                  <div className={`p-4 rounded-lg ${category.color}`}>
                    <div className="flex items-center gap-3 mb-2">
                      {category.icon}
                      <h3 className="font-semibold text-foreground">{category.title}</h3>
                    </div>
                    <p className="text-foreground/80">{category.description}</p>
                  </div>
                ) : null;
              })()}
            </CardContent>
          </Card>
        )}

        {/* Scripts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredScripts.map((script) => (
            <Card key={script.id} className="shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg text-foreground">{script.title}</CardTitle>
                <CardDescription>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {script.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {editingScript === script.id ? (
                  <div className="space-y-3">
                    <label className="block text-sm font-medium text-foreground">
                      Customize this script for your situation:
                    </label>
                    <Textarea
                      value={customTemplate || script.customized || script.template}
                      onChange={(e) => setCustomTemplate(e.target.value)}
                      rows={6}
                      className="w-full"
                    />
                    <div className="flex gap-2">
                      <Button 
                        size="sm"
                        onClick={() => saveCustomization(script.id)}
                        className="bg-gradient-primary text-primary-foreground"
                      >
                        Save Changes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setEditingScript(null);
                          setCustomTemplate("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-4 bg-muted rounded-lg">
                      <p className="text-sm text-foreground leading-relaxed">
                        {script.customized || script.template}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => copyToClipboard(script.customized || script.template)}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        Copy
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => setEditingScript(script.id)}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-3 w-3" />
                        Customize
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredScripts.length === 0 && (
          <Card className="shadow-soft">
            <CardContent className="pt-6">
              <div className="text-center py-8 text-muted-foreground">
                <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No scripts found for this category.</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Guidance Card */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Heart className="h-5 w-5" />
              Using These Scripts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm text-muted-foreground">
              <ul className="space-y-2">
                <li>These are starting points - adapt the language to sound like you</li>
                <li>The words in [brackets] are meant to be customized for your situation</li>
                <li>Practice saying them out loud first, so they feel natural</li>
                <li>Remember: the goal is honest, kind communication, not perfect delivery</li>
                <li>It's okay to take a pause or say "let me think about that" in real conversations</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpressionScripts;