import { MapPin } from "lucide-react";

interface InteractiveMapProps {
  village: string;
  state: string;
  latitude?: number;
  longitude?: number;
}

export function InteractiveMap({ village, state, latitude, longitude }: InteractiveMapProps) {
  // Simple stylized map of India with location marker
  return (
    <div className="relative bg-secondary/30 rounded-xl p-4 overflow-hidden">
      <div className="text-sm text-muted-foreground mb-3 flex items-center gap-2">
        <MapPin className="w-4 h-4 text-primary" />
        <span>Made with love from</span>
      </div>
      
      <div className="relative w-full h-48 flex items-center justify-center">
        {/* Simplified India outline */}
        <svg
          viewBox="0 0 200 220"
          className="w-full h-full max-w-[180px]"
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="1.5"
        >
          <path
            d="M100 10 L130 25 L150 20 L160 40 L175 50 L180 80 L170 100 L175 120 L165 140 L170 160 L155 180 L130 195 L100 210 L70 195 L50 180 L40 160 L35 140 L25 120 L30 100 L20 80 L30 60 L50 40 L70 25 Z"
            fill="hsl(var(--secondary) / 0.5)"
            strokeLinejoin="round"
          />
          {/* Location marker */}
          {latitude && longitude && (
            <g>
              <circle
                cx={100 + (longitude - 78) * 3}
                cy={110 - (latitude - 20) * 5}
                r="8"
                fill="hsl(var(--primary))"
                className="animate-pulse"
              />
              <circle
                cx={100 + (longitude - 78) * 3}
                cy={110 - (latitude - 20) * 5}
                r="4"
                fill="hsl(var(--primary-foreground))"
              />
            </g>
          )}
        </svg>
      </div>

      <div className="text-center mt-4">
        <p className="font-handwritten text-2xl text-foreground">{village}</p>
        <p className="text-sm text-muted-foreground">{state}, India</p>
      </div>
    </div>
  );
}