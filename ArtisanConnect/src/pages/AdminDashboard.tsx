import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { 
  Users, 
  Gift, 
  QrCode, 
  MessageSquare, 
  Plus, 
  Edit2, 
  Trash2,
  Copy,
  Download,
  BarChart3,
  Home
} from "lucide-react";
import { Link } from "react-router-dom";

interface Artisan {
  id: string;
  name: string;
  bio: string;
  photo_url: string | null;
  village: string;
  state: string;
  craft_specialty: string | null;
  years_of_experience: number;
}

interface Product {
  id: string;
  name: string;
  description: string | null;
  materials: string | null;
  technique: string | null;
}

interface GiftItem {
  id: string;
  unique_code: string;
  scan_count: number;
  corporate_client: string | null;
  artisan: { name: string };
  product: { name: string };
  created_at: string;
}

interface FeedbackItem {
  id: string;
  sender_name: string | null;
  message: string;
  created_at: string;
  gift: {
    artisan: { name: string };
    corporate_client: string | null;
  };
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "artisans" | "qr" | "feedback">("overview");
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [gifts, setGifts] = useState<GiftItem[]>([]);
  const [feedback, setFeedback] = useState<FeedbackItem[]>([]);
  const [stats, setStats] = useState({ totalGifts: 0, totalScans: 0, totalMessages: 0 });
  const [isAddArtisanOpen, setIsAddArtisanOpen] = useState(false);
  const [isQrOpen, setIsQrOpen] = useState(false);
  const [editingArtisan, setEditingArtisan] = useState<Artisan | null>(null);

  // Form states
  const [artisanForm, setArtisanForm] = useState({
    name: "",
    bio: "",
    photo_url: "",
    village: "",
    state: "",
    craft_specialty: "",
    years_of_experience: 0,
  });
  const [qrForm, setQrForm] = useState({
    artisan_id: "",
    product_id: "",
    corporate_client: "",
    recipient_name: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    // Fetch artisans
    const { data: artisansData } = await supabase
      .from("artisans")
      .select("*")
      .order("name");
    if (artisansData) setArtisans(artisansData);

    // Fetch products
    const { data: productsData } = await supabase
      .from("products")
      .select("*")
      .order("name");
    if (productsData) setProducts(productsData);

    // Fetch gifts with relations
    const { data: giftsData } = await supabase
      .from("gifts")
      .select(`
        id, unique_code, scan_count, corporate_client, created_at,
        artisan:artisans(name),
        product:products(name)
      `)
      .order("created_at", { ascending: false });
    if (giftsData) setGifts(giftsData as unknown as GiftItem[]);

    // Fetch feedback
    const { data: feedbackData } = await supabase
      .from("feedback")
      .select(`
        id, sender_name, message, created_at,
        gift:gifts(
          artisan:artisans(name),
          corporate_client
        )
      `)
      .order("created_at", { ascending: false });
    if (feedbackData) setFeedback(feedbackData as unknown as FeedbackItem[]);

    // Calculate stats
    const totalGifts = giftsData?.length || 0;
    const totalScans = giftsData?.reduce((sum, g) => sum + (g.scan_count || 0), 0) || 0;
    const totalMessages = feedbackData?.length || 0;
    setStats({ totalGifts, totalScans, totalMessages });
  }

  async function handleAddArtisan() {
    const { error } = await supabase.from("artisans").insert({
      name: artisanForm.name,
      bio: artisanForm.bio,
      photo_url: artisanForm.photo_url || null,
      village: artisanForm.village,
      state: artisanForm.state,
      craft_specialty: artisanForm.craft_specialty || null,
      years_of_experience: artisanForm.years_of_experience,
    });

    if (error) {
      toast.error("Failed to add artisan");
      return;
    }

    toast.success("Artisan added successfully!");
    setIsAddArtisanOpen(false);
    resetArtisanForm();
    fetchData();
  }

  async function handleUpdateArtisan() {
    if (!editingArtisan) return;

    const { error } = await supabase
      .from("artisans")
      .update({
        name: artisanForm.name,
        bio: artisanForm.bio,
        photo_url: artisanForm.photo_url || null,
        village: artisanForm.village,
        state: artisanForm.state,
        craft_specialty: artisanForm.craft_specialty || null,
        years_of_experience: artisanForm.years_of_experience,
      })
      .eq("id", editingArtisan.id);

    if (error) {
      toast.error("Failed to update artisan");
      return;
    }

    toast.success("Artisan updated successfully!");
    setEditingArtisan(null);
    resetArtisanForm();
    fetchData();
  }

  async function handleDeleteArtisan(id: string) {
    const { error } = await supabase.from("artisans").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete artisan. They may have associated gifts.");
      return;
    }
    toast.success("Artisan deleted");
    fetchData();
  }

  function resetArtisanForm() {
    setArtisanForm({
      name: "",
      bio: "",
      photo_url: "",
      village: "",
      state: "",
      craft_specialty: "",
      years_of_experience: 0,
    });
  }

  async function handleGenerateQR() {
    if (!qrForm.artisan_id || !qrForm.product_id) {
      toast.error("Please select an artisan and product");
      return;
    }

    const uniqueCode = `GIFT-${Date.now().toString(36).toUpperCase()}`;
    
    const { error } = await supabase.from("gifts").insert({
      artisan_id: qrForm.artisan_id,
      product_id: qrForm.product_id,
      corporate_client: qrForm.corporate_client || null,
      recipient_name: qrForm.recipient_name || null,
      unique_code: uniqueCode,
    });

    if (error) {
      toast.error("Failed to generate gift");
      return;
    }

    toast.success("Gift created! Code: " + uniqueCode);
    setIsQrOpen(false);
    setQrForm({ artisan_id: "", product_id: "", corporate_client: "", recipient_name: "" });
    fetchData();
  }

  function copyGiftLink(code: string) {
    const link = `${window.location.origin}/gift/${code}`;
    navigator.clipboard.writeText(link);
    toast.success("Link copied to clipboard!");
  }

  const tabs = [
    { id: "overview", label: "Overview", icon: BarChart3 },
    { id: "artisans", label: "Artisans", icon: Users },
    { id: "qr", label: "QR Generator", icon: QrCode },
    { id: "feedback", label: "Feedback", icon: MessageSquare },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
          </div>
          <div className="flex items-center gap-2">
            <Link to="/">
              <Button variant="ghost" size="sm">
                <Home className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
            <Link to="/analytics">
              <Button variant="outline" size="sm">
                <BarChart3 className="w-4 h-4 mr-2" />
                Corporate View
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              className="flex items-center gap-2"
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Gifts Distributed
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-foreground">{stats.totalGifts}</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total QR Scans
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-primary">{stats.totalScans}</p>
                </CardContent>
              </Card>
              <Card className="bg-card">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Messages Received
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-sage">{stats.totalMessages}</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Gifts */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Gifts</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Artisan</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Scans</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gifts.slice(0, 5).map((gift) => (
                      <TableRow key={gift.id}>
                        <TableCell className="font-mono text-sm">{gift.unique_code}</TableCell>
                        <TableCell>{gift.artisan?.name}</TableCell>
                        <TableCell>{gift.product?.name}</TableCell>
                        <TableCell>{gift.corporate_client || "-"}</TableCell>
                        <TableCell>{gift.scan_count}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyGiftLink(gift.unique_code)}
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Artisans Tab */}
        {activeTab === "artisans" && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <Dialog open={isAddArtisanOpen} onOpenChange={setIsAddArtisanOpen}>
                <DialogTrigger asChild>
                  <Button onClick={() => { resetArtisanForm(); setEditingArtisan(null); }}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Artisan
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>Add New Artisan</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 mt-4">
                    <Input
                      placeholder="Name"
                      value={artisanForm.name}
                      onChange={(e) => setArtisanForm({ ...artisanForm, name: e.target.value })}
                    />
                    <Textarea
                      placeholder="Bio / Story"
                      value={artisanForm.bio}
                      onChange={(e) => setArtisanForm({ ...artisanForm, bio: e.target.value })}
                      rows={4}
                    />
                    <Input
                      placeholder="Photo URL"
                      value={artisanForm.photo_url}
                      onChange={(e) => setArtisanForm({ ...artisanForm, photo_url: e.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Village"
                        value={artisanForm.village}
                        onChange={(e) => setArtisanForm({ ...artisanForm, village: e.target.value })}
                      />
                      <Input
                        placeholder="State"
                        value={artisanForm.state}
                        onChange={(e) => setArtisanForm({ ...artisanForm, state: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        placeholder="Craft Specialty"
                        value={artisanForm.craft_specialty}
                        onChange={(e) => setArtisanForm({ ...artisanForm, craft_specialty: e.target.value })}
                      />
                      <Input
                        type="number"
                        placeholder="Years of Experience"
                        value={artisanForm.years_of_experience}
                        onChange={(e) => setArtisanForm({ ...artisanForm, years_of_experience: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <Button onClick={handleAddArtisan} className="w-full">
                      Add Artisan
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            <Card>
              <CardContent className="pt-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Village</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Specialty</TableHead>
                      <TableHead>Experience</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {artisans.map((artisan) => (
                      <TableRow key={artisan.id}>
                        <TableCell className="font-medium">{artisan.name}</TableCell>
                        <TableCell>{artisan.village}</TableCell>
                        <TableCell>{artisan.state}</TableCell>
                        <TableCell>{artisan.craft_specialty || "-"}</TableCell>
                        <TableCell>{artisan.years_of_experience} years</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Dialog
                              open={editingArtisan?.id === artisan.id}
                              onOpenChange={(open) => {
                                if (!open) setEditingArtisan(null);
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setEditingArtisan(artisan);
                                    setArtisanForm({
                                      name: artisan.name,
                                      bio: artisan.bio,
                                      photo_url: artisan.photo_url || "",
                                      village: artisan.village,
                                      state: artisan.state,
                                      craft_specialty: artisan.craft_specialty || "",
                                      years_of_experience: artisan.years_of_experience,
                                    });
                                  }}
                                >
                                  <Edit2 className="w-4 h-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-lg">
                                <DialogHeader>
                                  <DialogTitle>Edit Artisan</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4 mt-4">
                                  <Input
                                    placeholder="Name"
                                    value={artisanForm.name}
                                    onChange={(e) => setArtisanForm({ ...artisanForm, name: e.target.value })}
                                  />
                                  <Textarea
                                    placeholder="Bio / Story"
                                    value={artisanForm.bio}
                                    onChange={(e) => setArtisanForm({ ...artisanForm, bio: e.target.value })}
                                    rows={4}
                                  />
                                  <Input
                                    placeholder="Photo URL"
                                    value={artisanForm.photo_url}
                                    onChange={(e) => setArtisanForm({ ...artisanForm, photo_url: e.target.value })}
                                  />
                                  <div className="grid grid-cols-2 gap-4">
                                    <Input
                                      placeholder="Village"
                                      value={artisanForm.village}
                                      onChange={(e) => setArtisanForm({ ...artisanForm, village: e.target.value })}
                                    />
                                    <Input
                                      placeholder="State"
                                      value={artisanForm.state}
                                      onChange={(e) => setArtisanForm({ ...artisanForm, state: e.target.value })}
                                    />
                                  </div>
                                  <div className="grid grid-cols-2 gap-4">
                                    <Input
                                      placeholder="Craft Specialty"
                                      value={artisanForm.craft_specialty}
                                      onChange={(e) => setArtisanForm({ ...artisanForm, craft_specialty: e.target.value })}
                                    />
                                    <Input
                                      type="number"
                                      placeholder="Years of Experience"
                                      value={artisanForm.years_of_experience}
                                      onChange={(e) => setArtisanForm({ ...artisanForm, years_of_experience: parseInt(e.target.value) || 0 })}
                                    />
                                  </div>
                                  <Button onClick={handleUpdateArtisan} className="w-full">
                                    Save Changes
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteArtisan(artisan.id)}
                            >
                              <Trash2 className="w-4 h-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* QR Generator Tab */}
        {activeTab === "qr" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate Gift Link</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Select Artisan</label>
                    <Select
                      value={qrForm.artisan_id}
                      onValueChange={(v) => setQrForm({ ...qrForm, artisan_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose artisan..." />
                      </SelectTrigger>
                      <SelectContent>
                        {artisans.map((a) => (
                          <SelectItem key={a.id} value={a.id}>
                            {a.name} - {a.village}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">Select Product</label>
                    <Select
                      value={qrForm.product_id}
                      onValueChange={(v) => setQrForm({ ...qrForm, product_id: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Choose product..." />
                      </SelectTrigger>
                      <SelectContent>
                        {products.map((p) => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Corporate Client (e.g., Paytm)"
                    value={qrForm.corporate_client}
                    onChange={(e) => setQrForm({ ...qrForm, corporate_client: e.target.value })}
                  />
                  <Input
                    placeholder="Recipient Name (Optional)"
                    value={qrForm.recipient_name}
                    onChange={(e) => setQrForm({ ...qrForm, recipient_name: e.target.value })}
                  />
                </div>
                <Button onClick={handleGenerateQR} className="w-full">
                  <QrCode className="w-4 h-4 mr-2" />
                  Generate Gift Link
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>All Gift Links</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Code</TableHead>
                      <TableHead>Artisan</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Client</TableHead>
                      <TableHead>Scans</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {gifts.map((gift) => (
                      <TableRow key={gift.id}>
                        <TableCell className="font-mono text-sm">{gift.unique_code}</TableCell>
                        <TableCell>{gift.artisan?.name}</TableCell>
                        <TableCell>{gift.product?.name}</TableCell>
                        <TableCell>{gift.corporate_client || "-"}</TableCell>
                        <TableCell>{gift.scan_count}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyGiftLink(gift.unique_code)}
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => window.open(`/gift/${gift.unique_code}`, "_blank")}
                            >
                              <Gift className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Feedback Tab */}
        {activeTab === "feedback" && (
          <Card>
            <CardHeader>
              <CardTitle>Feedback Inbox</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {feedback.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">
                    No feedback messages yet
                  </p>
                ) : (
                  feedback.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-muted/50 border border-border"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-medium text-foreground">
                            {item.sender_name || "Anonymous"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            To: {item.gift?.artisan?.name} • From: {item.gift?.corporate_client || "Unknown"}
                          </p>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {new Date(item.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <p className="text-foreground">{item.message}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}