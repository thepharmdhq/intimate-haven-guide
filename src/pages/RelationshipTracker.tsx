import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, TrendingUp, Heart, MessageCircle, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Interaction {
  id: string;
  person: string;
  type: "reached-out" | "they-reached" | "quality-time" | "conflict" | "support";
  description: string;
  date: string;
  energy: "high" | "medium" | "low";
}

const RelationshipTracker = () => {
  const navigate = useNavigate();
  const [interactions, setInteractions] = useState<Interaction[]>([
    {
      id: "1",
      person: "Sarah",
      type: "they-reached",
      description: "Called to check in after my presentation",
      date: "2024-01-15",
      energy: "high"
    },
    {
      id: "2", 
      person: "Mom",
      type: "reached-out",
      description: "Sent flowers for her birthday",
      date: "2024-01-12",
      energy: "high"
    }
  ]);

  const [newInteraction, setNewInteraction] = useState({
    person: "",
    type: "reached-out" as const,
    description: "",
    energy: "medium" as const
  });

  const [showForm, setShowForm] = useState(false);

  const addInteraction = () => {
    if (newInteraction.person && newInteraction.description) {
      const interaction: Interaction = {
        id: Date.now().toString(),
        ...newInteraction,
        date: new Date().toISOString().split('T')[0]
      };
      setInteractions([interaction, ...interactions]);
      setNewInteraction({ person: "", type: "reached-out", description: "", energy: "medium" });
      setShowForm(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "reached-out": return <Heart className="h-4 w-4" />;
      case "they-reached": return <MessageCircle className="h-4 w-4" />;
      case "quality-time": return <Calendar className="h-4 w-4" />;
      default: return <MessageCircle className="h-4 w-4" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "reached-out": return "You reached out";
      case "they-reached": return "They reached out"; 
      case "quality-time": return "Quality time";
      case "conflict": return "Conflict/tension";
      case "support": return "Offered support";
      default: return type;
    }
  };

  const getEnergyColor = (energy: string) => {
    switch (energy) {
      case "high": return "bg-growth text-foreground";
      case "medium": return "bg-warmth text-foreground";
      case "low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
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
          <Button 
            onClick={() => setShowForm(!showForm)}
            className="bg-gradient-primary text-primary-foreground shadow-soft"
          >
            <Plus className="h-4 w-4 mr-2" />
            Log Interaction
          </Button>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Where Are We?</h1>
          <p className="text-muted-foreground">
            Track the flow of your relationships and discover patterns of reciprocity and connection.
          </p>
        </div>

        {/* Add Interaction Form */}
        {showForm && (
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="text-foreground">Log New Interaction</CardTitle>
              <CardDescription>Record a meaningful moment in your relationships</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Person</label>
                  <Input
                    placeholder="Who was this with?"
                    value={newInteraction.person}
                    onChange={(e) => setNewInteraction({ ...newInteraction, person: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Type</label>
                  <select 
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={newInteraction.type}
                    onChange={(e) => setNewInteraction({ ...newInteraction, type: e.target.value as any })}
                  >
                    <option value="reached-out">You reached out</option>
                    <option value="they-reached">They reached out</option>
                    <option value="quality-time">Quality time together</option>
                    <option value="conflict">Conflict/tension</option>
                    <option value="support">Offered support</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                <Textarea
                  placeholder="What happened? How did it feel?"
                  value={newInteraction.description}
                  onChange={(e) => setNewInteraction({ ...newInteraction, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Energy Level</label>
                <div className="flex gap-2">
                  {["low", "medium", "high"].map((level) => (
                    <Button
                      key={level}
                      variant={newInteraction.energy === level ? "default" : "outline"}
                      size="sm"
                      onClick={() => setNewInteraction({ ...newInteraction, energy: level as any })}
                    >
                      {level.charAt(0).toUpperCase() + level.slice(1)}
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button onClick={addInteraction} className="bg-gradient-primary text-primary-foreground">
                  Add Interaction
                </Button>
                <Button variant="outline" onClick={() => setShowForm(false)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Insights Card */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <TrendingUp className="h-5 w-5" />
              This Week's Patterns
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-gradient-warm">
                <div className="text-2xl font-bold text-foreground">4</div>
                <div className="text-sm text-muted-foreground">Times you reached out</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-gradient-trust">
                <div className="text-2xl font-bold text-foreground">2</div>
                <div className="text-sm text-muted-foreground">Times others reached out</div>
              </div>
              <div className="text-center p-4 rounded-lg bg-warmth">
                <div className="text-2xl font-bold text-foreground">3</div>
                <div className="text-sm text-muted-foreground">People you connected with</div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground italic">
                "You're showing beautiful initiative in your relationships this week. Notice how your energy creates ripples of connection."
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Interactions List */}
        <Card className="shadow-soft">
          <CardHeader>
            <CardTitle className="text-foreground">Recent Interactions</CardTitle>
            <CardDescription>Your relationship moments, tracked with care</CardDescription>
          </CardHeader>
          <CardContent>
            {interactions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No interactions logged yet. Start tracking your relationship moments!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {interactions.map((interaction) => (
                  <div key={interaction.id} className="p-4 border border-border rounded-lg bg-card">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="flex items-center gap-2">
                            {getTypeIcon(interaction.type)}
                            <span className="font-medium text-foreground">{interaction.person}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(interaction.type)}
                          </Badge>
                          <Badge className={`text-xs ${getEnergyColor(interaction.energy)}`}>
                            {interaction.energy} energy
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{interaction.description}</p>
                        <div className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(interaction.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RelationshipTracker;