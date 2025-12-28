import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Gift, Users, BarChart3, Sparkles, Leaf } from "lucide-react";
import artisanHero from "@/assets/artisan-hero.jpg";
import { QRUpload } from "@/components/QRUpload";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={artisanHero}
            alt="Artisan at work"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background" />
        </div>

        <div className="relative z-10 text-center px-6 py-16 max-w-4xl mx-auto animate-fade-in-up">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Leaf className="w-8 h-8 text-sage" />
            <span className="text-sm font-medium text-sage uppercase tracking-wider">
              Traceability & Storytelling
            </span>
          </div>
          
          <h1 className="font-handwritten text-5xl md:text-7xl text-foreground mb-6">
            Every Gift Has a Story
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Connecting corporate employees with the rural women artisans who craft their 
            birthday gifts. Scan, discover, and send gratitude.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/admin">
              <Button size="lg" className="h-14 px-8 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-full">
                <Users className="w-5 h-5 mr-2" />
                NGO Dashboard
              </Button>
            </Link>
            <Link to="/analytics">
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-full">
                <BarChart3 className="w-5 h-5 mr-2" />
                Corporate Analytics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-foreground text-center mb-12">
            How It Works
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Gift className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Receive Your Gift</h3>
              <p className="text-sm text-muted-foreground">
                Corporate employees receive handcrafted birthday gifts with a unique QR code
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-sage" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Discover the Artisan</h3>
              <p className="text-sm text-muted-foreground">
                Scan the QR code to learn about the woman who made your gift and her story
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-ochre/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-ochre" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Send Gratitude</h3>
              <p className="text-sm text-muted-foreground">
                Send a personalized thank you message directly to the artisan
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* QR Upload Section */}
      <section className="py-16 px-6 bg-card">
        <div className="max-w-md mx-auto">
          <QRUpload />
        </div>
      </section>

      {/* Demo Link */}
      <section className="py-16 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-muted-foreground mb-4">Or try a demo gift story:</p>
          <Link to="/gift/GIFT-SUNITA-001">
            <Button variant="outline" className="rounded-full">
              View Sample Gift Story →
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-5xl mx-auto text-center text-sm text-muted-foreground">
          <p>Empowering rural artisans, one gift at a time.</p>
        </div>
      </footer>
    </div>
  );
}