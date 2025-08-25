import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Shield, Users, Sparkles, ArrowLeft, Mail, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-hero">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="soft" size="sm" onClick={() => navigate("/")}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>
          <div className="text-center space-y-6">
            <Badge className="bg-warmth text-accent-foreground">
              Your trusted confidant ✨
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-primary-foreground">
              About Intimately
            </h1>
            <p className="text-xl text-primary-foreground/90 max-w-3xl mx-auto">
              We believe everyone deserves a safe space to explore intimacy, relationships, and personal growth with cultural awareness and best friend energy.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-16">
        {/* Mission */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6 border-2 border-primary/20">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto">
                  <Shield className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Safe & Private</h3>
                <p className="text-muted-foreground">
                  Your thoughts and reflections are yours alone. We prioritize your privacy and create a judgment-free zone for growth.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-trust/40">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-trust rounded-2xl flex items-center justify-center mx-auto">
                  <Users className="w-8 h-8 text-secondary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Culturally Aware</h3>
                <p className="text-muted-foreground">
                  We understand that relationships and intimacy are deeply cultural. Our approach honors diverse backgrounds and experiences.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 border-2 border-warmth/40">
              <CardContent className="space-y-4">
                <div className="w-16 h-16 bg-gradient-warm rounded-2xl flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">Best Friend Energy</h3>
                <p className="text-muted-foreground">
                  Like a caring friend, we offer support without judgment, encouragement without pressure, and wisdom without preaching.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features Deep Dive */}
        <section className="space-y-8">
          <h2 className="text-3xl font-bold text-foreground text-center">How We Support You</h2>
          <div className="space-y-8">
            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">Reflection Coach</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Your private journaling companion offers culturally aware prompts that help you explore your feelings, relationships, and growth. Like a wise friend, it asks the right questions to help you discover your own answers.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Personalized prompts based on your experiences</li>
                    <li>• Cultural sensitivity in questioning and feedback</li>
                    <li>• Private and secure - your thoughts stay yours</li>
                  </ul>
                </div>
                <div className="bg-gradient-primary/10 rounded-2xl p-6 text-center">
                  <p className="text-foreground italic">
                    "A space to pour your heart out and receive gentle guidance back"
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-gradient-trust/10 rounded-2xl p-6 text-center order-2 md:order-1">
                  <p className="text-foreground italic">
                    "See the give and take in your relationships with clarity and love"
                  </p>
                </div>
                <div className="space-y-4 order-1 md:order-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-trust rounded-xl flex items-center justify-center">
                      <Heart className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">Relationship Tracker</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    Track reciprocity in your relationships with gentle insights. Understand the natural ebb and flow of giving and receiving in your connections without judgment.
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>• Visual relationship reciprocity tracking</li>
                    <li>• Gentle insights about balance and boundaries</li>
                    <li>• Culturally sensitive relationship understanding</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Privacy & Security */}
        <section className="bg-card rounded-3xl p-8 space-y-6">
          <h2 className="text-3xl font-bold text-foreground text-center">Your Privacy Matters</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">What We Protect</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Your reflections and journal entries are encrypted and private</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>Relationship data stays completely confidential</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>No data sharing with third parties</span>
                </li>
                <li className="flex items-start gap-2">
                  <Sparkles className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span>You can export or delete your data anytime</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">How We Support</h3>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-trust mt-0.5 flex-shrink-0" />
                  <span>Culturally sensitive prompts and feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-trust mt-0.5 flex-shrink-0" />
                  <span>No judgment, only gentle guidance</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-trust mt-0.5 flex-shrink-0" />
                  <span>Respect for diverse relationship styles</span>
                </li>
                <li className="flex items-start gap-2">
                  <Heart className="w-5 h-5 text-trust mt-0.5 flex-shrink-0" />
                  <span>Best friend energy in every interaction</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="text-center space-y-8">
          <h2 className="text-3xl font-bold text-foreground">Questions or Concerns?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're here to support you on your journey. Reach out if you need help, have feedback, or just want to share your experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="warm" className="gap-2">
              <Mail className="w-4 h-4" />
              Contact Support
            </Button>
            <Button variant="soft" className="gap-2">
              <MessageCircle className="w-4 h-4" />
              FAQ & Help
            </Button>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-gradient-hero rounded-3xl p-12 text-center space-y-6">
          <h2 className="text-3xl font-bold text-primary-foreground">Ready to Begin?</h2>
          <p className="text-primary-foreground/90 max-w-2xl mx-auto">
            Your journey of growth, self-discovery, and deeper connections starts with a single step. We're here to walk alongside you.
          </p>
          <Button variant="hero" size="lg" onClick={() => navigate("/onboarding")}>
            Start Your Journey ✨
          </Button>
        </section>
      </div>
    </div>
  );
};

export default About;