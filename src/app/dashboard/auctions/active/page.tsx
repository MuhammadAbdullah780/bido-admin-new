'use client';
import { useState } from "react";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { MetricCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  Clock, 
  Eye, 
  Search, 
  Filter, 
  XCircle,
  AlertTriangle,
  Gavel,
  User,
  Calendar,
  DollarSign,
  MessageSquare,
  Star,
  Flag,
  Upload,
  CheckCircle,
  Users,
  TrendingUp,
  Bell
} from "lucide-react";

type Props = {};

const activeStats = [
  { title: "Active Auctions", value: "89", change: "+12", trend: "up" },
  { title: "Ending Today", value: "15", change: "+3", trend: "up" },
  { title: "High Activity", value: "23", change: "+8", trend: "up" },
  { title: "Avg. Bids", value: "18.4", change: "+2.1", trend: "up" },
];

// Sample active auction data
const activeAuctions = [
  {
    id: 1,
    auctionId: "AUCT-2024-001",
    title: "Vintage Rolex Submariner 1960s",
    seller: "John Smith",
    sellerRating: 4.8,
    category: "Luxury Watches",
    startingBid: 5000,
    currentBid: 15000,
    reservePrice: 8000,
    timeLeft: "2h 15m",
    totalBids: 23,
    watchers: 45,
    status: "active",
    priority: "high",
    flags: ["high_value", "authenticity_verified"],
    lastBidAt: "2024-01-20 14:30:00",
    createdAt: "2024-01-18 10:00:00",
    endsAt: "2024-01-20 16:45:00",
    description: "Rare vintage Rolex Submariner from the 1960s, excellent condition, original box and papers included.",
    images: ["watch1.jpg", "watch2.jpg", "certificate.pdf"],
    inquiries: 3,
    issues: []
  },
  {
    id: 2,
    auctionId: "AUCT-2024-002",
    title: "Antique Persian Rug 19th Century",
    seller: "Sarah Wilson",
    sellerRating: 4.5,
    category: "Antiques",
    startingBid: 2000,
    currentBid: 4200,
    reservePrice: 3500,
    timeLeft: "1d 3h",
    totalBids: 12,
    watchers: 28,
    status: "active",
    priority: "medium",
    flags: ["authenticity_verified"],
    lastBidAt: "2024-01-20 13:15:00",
    createdAt: "2024-01-19 14:20:00",
    endsAt: "2024-01-21 17:20:00",
    description: "Beautiful hand-woven Persian rug from the 19th century, traditional patterns, good condition.",
    images: ["rug1.jpg", "rug2.jpg"],
    inquiries: 1,
    issues: []
  },
  {
    id: 3,
    auctionId: "AUCT-2024-003",
    title: "Modern Art Painting - Abstract",
    seller: "Mike Johnson",
    sellerRating: 3.9,
    category: "Art",
    startingBid: 800,
    currentBid: 1200,
    reservePrice: 1200,
    timeLeft: "4h 30m",
    totalBids: 8,
    watchers: 15,
    status: "ending_soon",
    priority: "low",
    flags: [],
    lastBidAt: "2024-01-20 12:45:00",
    createdAt: "2024-01-19 11:30:00",
    endsAt: "2024-01-20 18:30:00",
    description: "Contemporary abstract painting by local artist, signed and dated 2023.",
    images: ["painting1.jpg"],
    inquiries: 0,
    issues: []
  },
  {
    id: 4,
    auctionId: "AUCT-2024-004",
    title: "Rare Coin Collection",
    seller: "David Brown",
    sellerRating: 4.2,
    category: "Collectibles",
    startingBid: 3000,
    currentBid: 4500,
    reservePrice: 4500,
    timeLeft: "6d 12h",
    totalBids: 15,
    watchers: 32,
    status: "active",
    priority: "medium",
    flags: ["verification_pending"],
    lastBidAt: "2024-01-20 11:20:00",
    createdAt: "2024-01-17 12:10:00",
    endsAt: "2024-01-24 00:10:00",
    description: "Collection of rare coins from various countries, includes gold and silver pieces.",
    images: ["coins1.jpg", "coins2.jpg", "catalog.pdf"],
    inquiries: 2,
    issues: ["verification_needed"]
  }
];

const page = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionData, setActionData] = useState({
    action: "",
    reason: "",
    notes: "",
    notifyUsers: true
  });
  const [activeTab, setActiveTab] = useState("all");

  // Filter auctions based on search and filters
  const filteredAuctions = activeAuctions.filter(auction => {
    const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         auction.auctionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || auction.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (auction: any) => {
    setSelectedAuction(auction);
    setIsDetailModalOpen(true);
  };

  const handleTakeAction = (auction: any) => {
    setSelectedAuction(auction);
    setActionData({
      action: "",
      reason: "",
      notes: "",
      notifyUsers: true
    });
    setIsActionModalOpen(true);
  };

  const handleProcessAction = () => {
    if (!actionData.action) {
      alert("Please select an action");
      return;
    }

    if (actionData.action === "cancel" && !actionData.reason.trim()) {
      alert("Please provide a cancellation reason");
      return;
    }

    console.log("Processing action:", {
      auction: selectedAuction,
      actionData
    });

    alert(`Action "${actionData.action}" processed successfully!`);
    setIsActionModalOpen(false);
    setActionData({ action: "", reason: "", notes: "", notifyUsers: true });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "ending_soon": return "bg-yellow-100 text-yellow-800";
      case "paused": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="h-4 w-4 text-green-500" />;
      case "ending_soon": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "paused": return <XCircle className="h-4 w-4 text-blue-500" />;
      case "cancelled": return <XCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-100 text-red-800";
      case "medium": return "bg-yellow-100 text-yellow-800";
      case "low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFlagIcon = (flag: string) => {
    switch (flag) {
      case "high_value": return <DollarSign className="h-3 w-3 text-red-500" />;
      case "authenticity_verified": return <CheckCircle className="h-3 w-3 text-green-500" />;
      case "verification_pending": return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
      default: return <Flag className="h-3 w-3 text-gray-500" />;
    }
  };

  const columns: JsonTableColumns<(typeof activeAuctions)[0]> = [
    { title: "Auction ID", dataIndex: "auctionId", width: 120 },
    { title: "Title", dataIndex: "title", width: 200 },
    { title: "Seller", dataIndex: "seller", width: 150 },
    { 
      title: "Rating", 
      dataIndex: "sellerRating",
      width: 100,
      render: (item) => (
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-500 fill-current" />
          <span className="font-medium">{item.sellerRating}</span>
        </div>
      )
    },
    { title: "Category", dataIndex: "category", width: 120 },
    { 
      title: "Current Bid", 
      dataIndex: "currentBid",
      width: 120,
      render: (item) => (
        <div className="text-right">
          <div className="font-semibold text-green-600">
            ${item.currentBid.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500">
            Reserve: ${item.reservePrice.toLocaleString()}
          </div>
        </div>
      )
    },
    { 
      title: "Time Left", 
      dataIndex: "timeLeft",
      width: 100,
      render: (item) => (
        <div className="text-center">
          <div className="font-medium">{item.timeLeft}</div>
          <div className="text-xs text-gray-500">
            {item.totalBids} bids
          </div>
        </div>
      )
    },
    { 
      title: "Activity", 
      dataIndex: "totalBids",
      width: 100,
      render: (item) => (
        <div className="text-center">
          <div className="flex items-center justify-center gap-1">
            <Users className="h-3 w-3 text-blue-500" />
            <span className="font-medium">{item.watchers}</span>
          </div>
          <div className="text-xs text-gray-500">
            {item.inquiries} inquiries
          </div>
        </div>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      width: 120,
      render: (item) => (
        <div className="flex items-center gap-2">
          {getStatusIcon(item.status)}
          <Badge className={getStatusColor(item.status)}>
            {item.status.replace('_', ' ')}
          </Badge>
        </div>
      )
    },
    { 
      title: "Priority", 
      dataIndex: "priority",
      width: 100,
      render: (item) => (
        <Badge className={getPriorityColor(item.priority)}>
          {item.priority}
        </Badge>
      )
    },
    { 
      title: "Flags", 
      dataIndex: "flags",
      width: 120,
      render: (item) => (
        <div className="flex gap-1">
          {item.flags.map((flag, index) => (
            <div key={index} className="flex items-center" title={flag.replace('_', ' ')}>
              {getFlagIcon(flag)}
            </div>
          ))}
        </div>
      )
    },
    {
      title: "Actions",
      dataIndex: "id",
      width: 200,
      render: (item) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewDetails(item)}
          >
            <Eye className="w-4 h-4 mr-1" />
            View
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleTakeAction(item)}
          >
            <Gavel className="w-4 h-4 mr-1" />
            Action
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Gavel className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Active Auctions</h1>
          <p className="text-gray-600">Monitor and manage currently running auctions</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeStats.map((stat) => (
          <MetricCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend as "up" | "down"}
          />
        ))}
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({activeAuctions.length})</TabsTrigger>
          <TabsTrigger value="active">Active ({activeAuctions.filter(a => a.status === "active").length})</TabsTrigger>
          <TabsTrigger value="ending_soon">Ending Soon ({activeAuctions.filter(a => a.status === "ending_soon").length})</TabsTrigger>
          <TabsTrigger value="high_priority">High Priority ({activeAuctions.filter(a => a.priority === "high").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search auctions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="ending_soon">Ending Soon</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Auctions Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Active Auctions ({filteredAuctions.length})</h3>
            </div>
            <div className="w-full overflow-x-auto">
              <JsonTable columns={columns} data={filteredAuctions} enableSelection={false} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Auction Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              Auction Details - {selectedAuction?.auctionId}
            </DialogTitle>
            <DialogDescription>
              Complete auction information and monitoring
            </DialogDescription>
          </DialogHeader>
          
          {selectedAuction && (
            <div className="space-y-6">
              {/* Auction Header */}
              <Card>
                <CardHeader>
                  <CardTitle>{selectedAuction.title}</CardTitle>
                  <CardDescription>{selectedAuction.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Auction ID</Label>
                      <p className="text-sm text-gray-900">{selectedAuction.auctionId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <p className="text-sm text-gray-900">{selectedAuction.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Time Left</Label>
                      <p className="text-sm text-gray-900 font-medium">{selectedAuction.timeLeft}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Priority</Label>
                      <Badge className={getPriorityColor(selectedAuction.priority)}>
                        {selectedAuction.priority}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bidding Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Bidding Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Starting Bid</Label>
                      <p className="text-2xl font-bold text-blue-600">
                        ${selectedAuction.startingBid.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Current Bid</Label>
                      <p className="text-2xl font-bold text-green-600">
                        ${selectedAuction.currentBid.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Reserve Price</Label>
                      <p className="text-2xl font-bold text-purple-600">
                        ${selectedAuction.reservePrice.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Total Bids</Label>
                      <p className="text-2xl font-bold text-orange-600">
                        {selectedAuction.totalBids}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label className="text-sm font-medium">Bid Progress</Label>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${Math.min((selectedAuction.currentBid / selectedAuction.reservePrice) * 100, 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {((selectedAuction.currentBid / selectedAuction.reservePrice) * 100).toFixed(1)}% of reserve price
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Activity Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Activity Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Watchers</Label>
                      <p className="text-2xl font-bold text-blue-600">
                        {selectedAuction.watchers}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Inquiries</Label>
                      <p className="text-2xl font-bold text-yellow-600">
                        {selectedAuction.inquiries}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Last Bid</Label>
                      <p className="text-sm text-gray-900">
                        {selectedAuction.lastBidAt}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Seller Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p className="text-sm text-gray-900">{selectedAuction.seller}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Rating</Label>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{selectedAuction.sellerRating}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Created</Label>
                      <p className="text-sm text-gray-900">{selectedAuction.createdAt}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Ends At</Label>
                      <p className="text-sm text-gray-900">{selectedAuction.endsAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flags */}
              {selectedAuction.flags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="w-5 h-5" />
                      Flags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedAuction.flags.map((flag, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {getFlagIcon(flag)}
                          {flag.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Issues */}
              {selectedAuction.issues.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-500" />
                      Issues
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedAuction.issues.map((issue, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-red-50 rounded">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          <span className="text-sm text-red-700">{issue}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleTakeAction(selectedAuction)}>
              <Gavel className="w-4 h-4 mr-2" />
              Take Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Action Modal */}
      <Dialog open={isActionModalOpen} onOpenChange={setIsActionModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              Take Action on Auction
            </DialogTitle>
            <DialogDescription>
              Manage auction: {selectedAuction?.auctionId}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="action-type">Action Type *</Label>
              <Select value={actionData.action} onValueChange={(value) => setActionData(prev => ({ ...prev, action: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pause">Pause Auction</SelectItem>
                  <SelectItem value="cancel">Cancel Auction</SelectItem>
                  <SelectItem value="extend">Extend Time</SelectItem>
                  <SelectItem value="flag">Flag for Review</SelectItem>
                  <SelectItem value="contact_seller">Contact Seller</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {(actionData.action === "cancel" || actionData.action === "pause") && (
              <div>
                <Label htmlFor="action-reason">Reason *</Label>
                <Select value={actionData.reason} onValueChange={(value) => setActionData(prev => ({ ...prev, reason: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="fraud_suspected">Fraud Suspected</SelectItem>
                    <SelectItem value="policy_violation">Policy Violation</SelectItem>
                    <SelectItem value="seller_request">Seller Request</SelectItem>
                    <SelectItem value="technical_issue">Technical Issue</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <Label htmlFor="action-notes">Notes</Label>
              <Textarea
                id="action-notes"
                placeholder="Add additional notes..."
                value={actionData.notes}
                onChange={(e) => setActionData(prev => ({ ...prev, notes: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="notify-users"
                checked={actionData.notifyUsers}
                onChange={(e) => setActionData(prev => ({ ...prev, notifyUsers: e.target.checked }))}
              />
              <Label htmlFor="notify-users" className="text-sm">
                Notify all bidders and watchers
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsActionModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProcessAction} disabled={!actionData.action}>
              <Gavel className="w-4 h-4 mr-2" />
              Process Action
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
