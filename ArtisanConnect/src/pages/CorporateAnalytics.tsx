import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Gift, 
  QrCode, 
  Heart, 
  TrendingUp, 
  Users, 
  Home,
  Download
} from "lucide-react";
import { Link } from "react-router-dom";

interface Stats {
  totalGifts: number;
  totalScans: number;
  totalMessages: number;
  engagementRate: number;
  thankYouRate: number;
}

interface ClientStats {
  client: string;
  gifts: number;
  scans: number;
  messages: number;
}

export default function CorporateAnalytics() {
  const [stats, setStats] = useState<Stats>({
    totalGifts: 0,
    totalScans: 0,
    totalMessages: 0,
    engagementRate: 0,
    thankYouRate: 0,
  });
  const [clientStats, setClientStats] = useState<ClientStats[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  async function fetchStats() {
    // Fetch gifts
    const { data: gifts } = await supabase
      .from("gifts")
      .select("id, scan_count, corporate_client");

    // Fetch feedback
    const { data: feedback } = await supabase.from("feedback").select("gift_id");

    if (gifts) {
      const totalGifts = gifts.length;
      const totalScans = gifts.reduce((sum, g) => sum + (g.scan_count || 0), 0);
      const scannedGifts = gifts.filter(g => (g.scan_count || 0) > 0).length;
      const totalMessages = feedback?.length || 0;
      
      const engagementRate = totalGifts > 0 ? (scannedGifts / totalGifts) * 100 : 0;
      const thankYouRate = scannedGifts > 0 ? (totalMessages / scannedGifts) * 100 : 0;

      setStats({
        totalGifts,
        totalScans,
        totalMessages,
        engagementRate,
        thankYouRate,
      });

      // Calculate per-client stats
      const clientMap: Record<string, ClientStats> = {};
      gifts.forEach((g) => {
        const client = g.corporate_client || "Unknown";
        if (!clientMap[client]) {
          clientMap[client] = { client, gifts: 0, scans: 0, messages: 0 };
        }
        clientMap[client].gifts++;
        clientMap[client].scans += g.scan_count || 0;
      });

      // Count messages per client
      if (feedback) {
        const giftClientMap: Record<string, string> = {};
        gifts.forEach((g) => {
          giftClientMap[g.id] = g.corporate_client || "Unknown";
        });
        feedback.forEach((f) => {
          const client = giftClientMap[f.gift_id];
          if (client && clientMap[client]) {
            clientMap[client].messages++;
          }
        });
      }

      setClientStats(Object.values(clientMap));
    }

    setLoading(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground">Loading analytics...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Impact Analytics</h1>
            <p className="text-sm text-muted-foreground">Corporate Partnership Dashboard</p>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/admin">
              <Button variant="outline" size="sm">
                Admin Panel
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Gifts Distributed</p>
                  <p className="text-4xl font-bold text-foreground mt-2">
                    {stats.totalGifts}
                  </p>
                </div>
                <Gift className="w-12 h-12 text-primary opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-sage/20 to-sage/10 border-sage/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">QR Code Scans</p>
                  <p className="text-4xl font-bold text-foreground mt-2">
                    {stats.totalScans}
                  </p>
                </div>
                <QrCode className="w-12 h-12 text-sage opacity-80" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-ochre/20 to-ochre/10 border-ochre/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Thank You Notes</p>
                  <p className="text-4xl font-bold text-foreground mt-2">
                    {stats.totalMessages}
                  </p>
                </div>
                <Heart className="w-12 h-12 text-ochre opacity-80" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engagement Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Engagement Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Gifts Scanned</span>
                    <span className="text-sm font-medium">{stats.engagementRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={stats.engagementRate} className="h-3" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Percentage of distributed gifts that were scanned by recipients
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Gratitude Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-muted-foreground">Scanners Who Sent Thanks</span>
                    <span className="text-sm font-medium">{stats.thankYouRate.toFixed(1)}%</span>
                  </div>
                  <Progress value={stats.thankYouRate} className="h-3" />
                </div>
                <p className="text-xs text-muted-foreground">
                  Percentage of scanners who sent a thank you message to the artisan
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Per-Client Breakdown */}
        {clientStats.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Client Breakdown
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {clientStats.map((client) => (
                  <div
                    key={client.client}
                    className="p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-foreground">{client.client}</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <p className="text-2xl font-bold text-foreground">{client.gifts}</p>
                        <p className="text-xs text-muted-foreground">Gifts</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-primary">{client.scans}</p>
                        <p className="text-xs text-muted-foreground">Scans</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-sage">{client.messages}</p>
                        <p className="text-xs text-muted-foreground">Messages</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Impact Statement */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-primary/10 via-sage/10 to-ochre/10 border border-border text-center">
          <h2 className="font-handwritten text-3xl text-foreground mb-2">
            Making an Impact Together
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every gift connects your team members with the skilled hands that crafted them. 
            Each scan and thank you message creates a meaningful bridge between corporate life 
            and rural artisan communities across India.
          </p>
        </div>
      </div>
    </div>
  );
}