import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Download, 
  Trash2, 
  CreditCard,
  Mail,
  Moon,
  Sun
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Settings = () => {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("Beautiful Soul");
  const [email, setEmail] = useState("hello@example.com");
  const [notifications, setNotifications] = useState({
    dailyReminders: true,
    reflectionPrompts: true,
    weeklyInsights: false,
    emailUpdates: true
  });
  const [isDarkMode, setIsDarkMode] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="soft" size="sm" onClick={() => navigate("/dashboard")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-primary-foreground">Settings</h1>
            <p className="text-primary-foreground/80">
              Customize your experience and manage your account
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="displayName">Display Name</Label>
                <Input 
                  id="displayName"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="What should we call you?"
                />
                <p className="text-xs text-muted-foreground">
                  This is how you'll appear in your reflections and journey
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                />
                <p className="text-xs text-muted-foreground">
                  For account security and important updates
                </p>
              </div>
            </div>
            <Button variant="warm">Save Profile Changes</Button>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Daily Reflection Reminders</Label>
                  <p className="text-sm text-muted-foreground">
                    Gentle daily nudges to check in with yourself
                  </p>
                </div>
                <Switch 
                  checked={notifications.dailyReminders}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, dailyReminders: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Reflection Prompts</Label>
                  <p className="text-sm text-muted-foreground">
                    Thoughtful prompts when you haven't reflected in a while
                  </p>
                </div>
                <Switch 
                  checked={notifications.reflectionPrompts}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, reflectionPrompts: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Weekly Insights</Label>
                  <p className="text-sm text-muted-foreground">
                    Summary of your patterns and growth insights
                  </p>
                </div>
                <Switch 
                  checked={notifications.weeklyInsights}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, weeklyInsights: checked})
                  }
                />
              </div>
              
              <Separator />
              
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label>Email Updates</Label>
                  <p className="text-sm text-muted-foreground">
                    Important account updates and feature announcements
                  </p>
                </div>
                <Switch 
                  checked={notifications.emailUpdates}
                  onCheckedChange={(checked) => 
                    setNotifications({...notifications, emailUpdates: checked})
                  }
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Appearance & Theme
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <Label>Dark Mode</Label>
                <p className="text-sm text-muted-foreground">
                  Toggle between light and dark themes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4" />
                <Switch 
                  checked={isDarkMode}
                  onCheckedChange={setIsDarkMode}
                />
                <Moon className="w-4 h-4" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <Button variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Export My Data
              </Button>
              <Button variant="outline" className="gap-2">
                <Mail className="w-4 h-4" />
                Privacy Policy
              </Button>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
              <h4 className="font-medium text-foreground">Your Data is Safe</h4>
              <p className="text-sm text-muted-foreground">
                All your reflections and personal data are encrypted and stored securely. 
                We never share your information with third parties, and you have full control 
                over your data at all times.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary" />
              Subscription & Billing
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Label>Current Plan</Label>
                  <Badge className="bg-gradient-primary text-primary-foreground">
                    Annual Plan
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Next billing date: March 15, 2024
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">$99.99</div>
                <div className="text-sm text-muted-foreground">per year</div>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex gap-4">
              <Button variant="outline">Update Payment Method</Button>
              <Button variant="outline">View Billing History</Button>
            </div>
          </CardContent>
        </Card>

        {/* Danger Zone */}
        <Card className="border-destructive/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="w-5 h-5" />
              Account Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-destructive/5 rounded-lg p-4 space-y-4">
              <h4 className="font-medium text-destructive">Delete Account</h4>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
              <Button variant="destructive" size="sm">
                Request Account Deletion
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardContent className="p-6 text-center space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Need Help?</h3>
            <p className="text-muted-foreground">
              Our support team is here to help you with any questions or concerns.
            </p>
            <div className="flex gap-4 justify-center">
              <Button variant="warm" className="gap-2">
                <Mail className="w-4 h-4" />
                Contact Support
              </Button>
              <Button variant="outline" onClick={() => navigate("/about")}>
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;