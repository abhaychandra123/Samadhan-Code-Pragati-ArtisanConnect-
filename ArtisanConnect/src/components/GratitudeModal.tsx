import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Send, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GratitudeModalProps {
  isOpen: boolean;
  onClose: () => void;
  giftId: string;
  artisanName: string;
}

const presetMessages = [
  "Beautiful work!",
  "I love the colors!",
  "Best birthday gift!",
  "Thank you for your art!",
];

export function GratitudeModal({ isOpen, onClose, giftId, artisanName }: GratitudeModalProps) {
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handlePresetClick = (preset: string) => {
    setMessage(preset);
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSubmitting(true);
    
    const { error } = await supabase.from("feedback").insert({
      gift_id: giftId,
      sender_name: senderName.trim() || null,
      message: message.trim(),
      is_preset: presetMessages.includes(message.trim()),
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Failed to send message. Please try again.");
      return;
    }

    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onClose();
      setSenderName("");
      setMessage("");
    }, 2500);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border">
        {showSuccess ? (
          <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="animate-heart-bloom">
              <Heart className="w-24 h-24 text-primary fill-primary" />
            </div>
            <Sparkles className="w-8 h-8 text-ochre mt-4 animate-float" />
            <h3 className="text-2xl font-handwritten text-foreground mt-4">
              Thank you!
            </h3>
            <p className="text-muted-foreground text-center mt-2">
              Your gratitude will reach {artisanName}
            </p>
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-xl font-semibold text-foreground">
                Send Gratitude to {artisanName}
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Your Name (Optional)
                </label>
                <Input
                  placeholder="Enter your name"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="bg-background border-input"
                />
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Quick Messages
                </label>
                <div className="flex flex-wrap gap-2">
                  {presetMessages.map((preset) => (
                    <Button
                      key={preset}
                      variant="outline"
                      size="sm"
                      onClick={() => handlePresetClick(preset)}
                      className={`text-xs transition-all ${
                        message === preset
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background hover:bg-secondary"
                      }`}
                    >
                      {preset}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-muted-foreground mb-2 block">
                  Your Message
                </label>
                <Textarea
                  placeholder="Write your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="bg-background border-input resize-none"
                />
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isSubmitting || !message.trim()}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Send Gratitude
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}