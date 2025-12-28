import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Leaf, Gift } from "lucide-react";
import { GratitudeModal } from "@/components/GratitudeModal";
import { InteractiveMap } from "@/components/InteractiveMap";
import artisanHero from "@/assets/artisan-hero.jpg";

interface GiftData {
  id: string;
  unique_code: string;
  scan_count: number;
  corporate_client: string | null;
  artisan: {
    id: string;
    name: string;
    bio: string;
    photo_url: string | null;
    village: string;
    state: string;
    latitude: number | null;
    longitude: number | null;
    craft_specialty: string | null;
    years_of_experience: number;
  };
  product: {
    id: string;
    name: string;
    description: string | null;
    materials: string | null;
    technique: string | null;
  };
}

export default function GiftStory() {
  const { code } = useParams<{ code: string }>();
  const [gift, setGift] = useState<GiftData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isGratitudeOpen, setIsGratitudeOpen] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    async function fetchGift() {
      if (!code) return;

      const { data, error } = await supabase
        .from("gifts")
        .select(`
          id,
          unique_code,
          scan_count,
          corporate_client,
          artisan:artisans (
            id,
            name,
            bio,
            photo_url,
            village,
            state,
            latitude,
            longitude,
            craft_specialty,
            years_of_experience
          ),
          product:products (
            id,
            name,
            description,
            materials,
            technique
          )
        `)
        .eq("unique_code", code)
        .maybeSingle();

      if (error) {
        console.error("Error fetching gift:", error);
        setLoading(false);
        return;
      }

      if (data) {
        // Increment scan count
        await supabase
          .from("gifts")
          .update({ 
            scan_count: (data.scan_count || 0) + 1,
            first_scanned_at: data.scan_count === 0 ? new Date().toISOString() : undefined
          })
          .eq("id", data.id);

        setGift(data as unknown as GiftData);
      }
      
      setLoading(false);
      setTimeout(() => setHasAnimated(true), 100);
    }

    fetchGift();
  }, [code]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Leaf className="w-12 h-12 text-primary mx-auto animate-pulse" />
          <p className="mt-4 text-muted-foreground">Loading your gift story...</p>
        </div>
      </div>
    );
  }

  if (!gift) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h1 className="text-2xl font-semibold text-foreground mb-2">Gift Not Found</h1>
          <p className="text-muted-foreground">
            We couldn't find this gift story. Please check your QR code and try again.
          </p>
        </div>
      </div>
    );
  }

  const artisan = gift.artisan;
  const product = gift.product;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div 
          className={`absolute inset-0 transition-opacity duration-1000 ${
            hasAnimated ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={artisan.photo_url || artisanHero}
            alt={artisan.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-6 pb-8">
          <div className={`transition-all duration-700 delay-300 ${
            hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            <p className="text-primary font-medium text-sm uppercase tracking-wider mb-2">
              Meet the Artisan
            </p>
            <h1 className="font-handwritten text-5xl md:text-6xl text-foreground mb-2">
              {artisan.name}
            </h1>
            <p className="text-muted-foreground flex items-center gap-2">
              <span>{artisan.village}, {artisan.state}</span>
              <span className="text-primary">•</span>
              <span>{artisan.years_of_experience} years of craft</span>
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="px-6 py-8 max-w-2xl mx-auto">
        {/* Story */}
        <div className={`mb-8 transition-all duration-700 delay-500 ${
          hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-ochre" />
            <h2 className="text-lg font-semibold text-foreground">Her Story</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed text-lg">
            "{artisan.bio}"
          </p>
          {artisan.craft_specialty && (
            <p className="mt-4 text-sm text-primary font-medium">
              Specialty: {artisan.craft_specialty}
            </p>
          )}
        </div>

        {/* Product Details */}
        <div className={`mb-8 bg-card rounded-2xl p-6 shadow-soft transition-all duration-700 delay-700 ${
          hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <h2 className="text-lg font-semibold text-foreground mb-3">
            Your Gift
          </h2>
          <h3 className="font-handwritten text-2xl text-primary mb-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-muted-foreground text-sm mb-4">
              {product.description}
            </p>
          )}
          <div className="space-y-2 text-sm">
            {product.materials && (
              <div className="flex gap-2">
                <span className="text-sage font-medium">Materials:</span>
                <span className="text-muted-foreground">{product.materials}</span>
              </div>
            )}
            {product.technique && (
              <div className="flex gap-2">
                <span className="text-sage font-medium">Technique:</span>
                <span className="text-muted-foreground">{product.technique}</span>
              </div>
            )}
          </div>
        </div>

        {/* Interactive Map */}
        <div className={`mb-8 transition-all duration-700 delay-900 ${
          hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <InteractiveMap
            village={artisan.village}
            state={artisan.state}
            latitude={artisan.latitude || undefined}
            longitude={artisan.longitude || undefined}
          />
        </div>

        {/* CTA Button */}
        <div className={`sticky bottom-6 transition-all duration-700 delay-1000 ${
          hasAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <Button
            onClick={() => setIsGratitudeOpen(true)}
            size="lg"
            className="w-full h-14 text-lg font-medium bg-primary text-primary-foreground hover:bg-primary/90 shadow-warm rounded-full"
          >
            <Heart className="w-5 h-5 mr-2" />
            Send Gratitude
          </Button>
        </div>
      </section>

      <GratitudeModal
        isOpen={isGratitudeOpen}
        onClose={() => setIsGratitudeOpen(false)}
        giftId={gift.id}
        artisanName={artisan.name}
      />
    </div>
  );
}