import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { QrCode, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

export function QRUpload() {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Invalid file",
        description: "Please upload an image file.",
        variant: "destructive",
      });
      return;
    }

    // For demo purposes, navigate to the sample gift story
    toast({
      title: "QR Code Detected!",
      description: "Taking you to the gift story...",
    });

    setTimeout(() => {
      navigate("/gift/GIFT-SUNITA-001");
    }, 1000);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      onClick={handleClick}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`
        cursor-pointer
        border-2 border-dashed rounded-2xl p-8
        transition-all duration-200
        ${isDragging 
          ? "border-primary bg-primary/10" 
          : "border-border hover:border-primary/50 hover:bg-card/50"
        }
      `}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
      
      <div className="flex flex-col items-center text-center gap-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <QrCode className="w-8 h-8 text-primary" />
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            Upload QR Code
          </h3>
          <p className="text-sm text-muted-foreground">
            Drag & drop or click to upload a QR code photo
          </p>
        </div>

        <Button variant="outline" size="sm" className="rounded-full">
          <Upload className="w-4 h-4 mr-2" />
          Choose File
        </Button>
      </div>
    </div>
  );
}
