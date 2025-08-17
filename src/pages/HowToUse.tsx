import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const HowToUse = () => {
  const examples = [
    {
      title: "Basic Conversation 🗣️",
      description: "Simple daily conversation practice",
      text: "Hello, how are you today?; I'm doing great, thank you for asking; What are your plans for the weekend?; I'm planning to visit the park with my family; That sounds wonderful, enjoy your time together!"
    },
    {
      title: "Shopping Practice 🛍️",
      description: "Practice shopping conversations",
      text: "Excuse me, where can I find the dairy section?; It's in aisle 5, right next to the frozen foods; Thank you so much for your help; You're welcome, have a great day!; Could you tell me the price of this item?; That's $12.99, would you like anything else?"
    },
    {
      title: "Restaurant Ordering 🍽️",
      description: "Learn to order food confidently",
      text: "Good evening, welcome to our restaurant; Thank you, could I see the menu please?; Of course, here you are; I'll have the grilled chicken with vegetables; Excellent choice, anything to drink?; I'll have a glass of water, please; Perfect, your order will be ready in 15 minutes"
    },
    {
      title: "Job Interview Practice 💼",
      description: "Prepare for professional conversations",
      text: "Tell me about yourself; I'm a dedicated professional with 5 years of experience; What are your greatest strengths?; I'm very organized and work well under pressure; Why do you want to work here?; I admire your company's mission and values; Thank you for your time today"
    },
    {
      title: "Making Friends 👥",
      description: "Practice social conversations",
      text: "Hi, I'm new here, nice to meet you; Nice to meet you too, welcome to the neighborhood; What do you like to do for fun?; I enjoy reading and hiking, how about you?; I love cooking and trying new restaurants; We should hang out sometime; That sounds great, I'd love to!"
    },
    {
      title: "Doctor Visit 🏥",
      description: "Practice medical conversations",
      text: "Good morning, how can I help you today?; I've been having headaches for the past week; Can you describe the pain?; It's a dull ache on the left side of my head; When did this start?; It began last Monday after work; Let's do a quick examination"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-foreground">
              How to Use Conversation Practice 💕
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Learn how to effectively use our conversation practice tool to improve your speaking skills with step-by-step examples.
            </p>
            <Link to="/">
              <Button variant="lovable" size="lg">
                Start Practicing Now 🎯
              </Button>
            </Link>
          </div>

          {/* Instructions */}
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-foreground flex items-center gap-2">
                📝 Quick Start Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Prepare Your Text</h3>
                    <p className="text-muted-foreground">
                      Write or paste conversation sentences separated by semicolons (;). Each sentence will be spoken individually.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Choose Your Voice</h3>
                    <p className="text-muted-foreground">
                      Select from available female voices (marked with 👩) for the most natural conversation practice.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Start & Practice</h3>
                    <p className="text-muted-foreground">
                      Click "Start Practice", then use "Next Sentence" to hear each line and practice your responses out loud.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Format Example */}
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                ✨ Text Format Example
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-background/50 p-4 rounded-lg border border-border/50">
                  <p className="font-mono text-sm text-foreground">
                    Hello, how are you today?; I'm doing great, thank you for asking; What are your plans for the weekend?; I'm planning to visit the park; That sounds wonderful!
                  </p>
                </div>
                <div className="text-sm text-muted-foreground">
                  ⚡ <strong>Tip:</strong> Each part separated by semicolon (;) becomes a separate sentence for the voice to speak.
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Examples Grid */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-center text-foreground">
              Practice Examples 🎭
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {examples.map((example, index) => (
                <Card key={index} className="bg-gradient-card shadow-card border-border/50 hover:shadow-card-hover transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-foreground">
                      {example.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {example.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="bg-background/50 p-3 rounded-lg border border-border/50">
                        <p className="text-sm text-foreground font-mono leading-relaxed">
                          {example.text}
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => {
                          navigator.clipboard.writeText(example.text);
                        }}
                      >
                        📋 Copy Example
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Tips */}
          <Card className="bg-gradient-card shadow-card border-border/50">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-foreground">
                💡 Pro Tips for Better Practice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">🎯 Practice Effectively</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Listen carefully to pronunciation</li>
                    <li>• Repeat each sentence out loud</li>
                    <li>• Practice different emotions and tones</li>
                    <li>• Record yourself for comparison</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground">📚 Content Ideas</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Daily conversation scenarios</li>
                    <li>• Professional meeting dialogs</li>
                    <li>• Customer service interactions</li>
                    <li>• Social event conversations</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Call to Action */}
          <div className="text-center space-y-4 py-8">
            <h3 className="text-2xl font-bold text-foreground">
              Ready to Start Practicing? 🚀
            </h3>
            <p className="text-muted-foreground">
              Copy any example above and start your conversation practice journey!
            </p>
            <Link to="/">
              <Button variant="lovable" size="lg" className="animate-pulse-glow">
                Go to Practice Tool 💕
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;