-- Create artisans table
CREATE TABLE public.artisans (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  bio TEXT NOT NULL,
  photo_url TEXT,
  village TEXT NOT NULL,
  state TEXT NOT NULL,
  latitude DECIMAL(10, 8),
  longitude DECIMAL(11, 8),
  craft_specialty TEXT,
  years_of_experience INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  materials TEXT,
  technique TEXT,
  category TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create gifts table (links artisan + product + unique QR code)
CREATE TABLE public.gifts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  artisan_id UUID NOT NULL REFERENCES public.artisans(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  corporate_client TEXT,
  recipient_name TEXT,
  unique_code TEXT NOT NULL UNIQUE,
  scan_count INTEGER DEFAULT 0,
  first_scanned_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create feedback table
CREATE TABLE public.feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  gift_id UUID NOT NULL REFERENCES public.gifts(id) ON DELETE CASCADE,
  sender_name TEXT,
  message TEXT NOT NULL,
  is_preset BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.artisans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gifts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.feedback ENABLE ROW LEVEL SECURITY;

-- Public read policies for gift story pages
CREATE POLICY "Anyone can view artisans" ON public.artisans FOR SELECT USING (true);
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Anyone can view gifts" ON public.gifts FOR SELECT USING (true);
CREATE POLICY "Anyone can view feedback" ON public.feedback FOR SELECT USING (true);

-- Public insert for feedback (anonymous users can send gratitude)
CREATE POLICY "Anyone can send feedback" ON public.feedback FOR INSERT WITH CHECK (true);

-- Public update for gift scan count
CREATE POLICY "Anyone can update gift scan count" ON public.gifts FOR UPDATE USING (true) WITH CHECK (true);

-- Admin policies will be added when auth is implemented
-- For now, allow inserts for seeding data
CREATE POLICY "Allow insert artisans" ON public.artisans FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update artisans" ON public.artisans FOR UPDATE USING (true);
CREATE POLICY "Allow delete artisans" ON public.artisans FOR DELETE USING (true);

CREATE POLICY "Allow insert products" ON public.products FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update products" ON public.products FOR UPDATE USING (true);
CREATE POLICY "Allow delete products" ON public.products FOR DELETE USING (true);

CREATE POLICY "Allow insert gifts" ON public.gifts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow delete gifts" ON public.gifts FOR DELETE USING (true);

-- Create indexes for performance
CREATE INDEX idx_gifts_unique_code ON public.gifts(unique_code);
CREATE INDEX idx_gifts_artisan_id ON public.gifts(artisan_id);
CREATE INDEX idx_feedback_gift_id ON public.feedback(gift_id);

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for artisans updated_at
CREATE TRIGGER update_artisans_updated_at
  BEFORE UPDATE ON public.artisans
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();