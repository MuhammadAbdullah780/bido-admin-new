'use client';
import { useState } from "react";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { MetricCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Download,
  FileText,
  Gavel,
  User,
  Calendar,
  DollarSign,
  MessageSquare,
  Star,
  Flag,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Bell,
  Activity
} from "lucide-react";

type Props = {};

const logStats = [
  { title: "Total Logs", value: "15,247", change: "+1,234", trend: "up" },
  { title: "Today's Activity", value: "342", change: "+45", trend: "up" },
  { title: "Bid Activities", value: "8,923", change: "+567", trend: "up" },
  { title: "Admin Actions", value: "1,234", change: "+89", trend: "up" },
];

// Sample auction log data
const auctionLogs = [
  {
    id: 1,
    logId: "LOG-2024-001",
    auctionId: "AUCT-2024-001",
    action: "bid_placed",
    description: "New bid placed by user",
    actor: "Jane Smith",
    actorType: "bidder",
    actorEmail: "jane.smith@example.com",
    timestamp: "2024-01-20 14:30:25",
    details: {
      bidAmount: 15000,
      previousBid: 14500,
      bidIncrement: 500,
      totalBids: 23
    },
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    metadata: {
      sessionId: "sess_123456789",
      deviceType: "desktop",
      location: "New York, NY"
    }
  },
  {
    id: 2,
    logId: "LOG-2024-002",
    auctionId: "AUCT-2024-001",
    action: "auction_approved",
    description: "Auction request approved by admin",
    actor: "Admin User",
    actorType: "admin",
    actorEmail: "admin@scrabia.com",
    timestamp: "2024-01-20 10:15:30",
    details: {
      approvalNotes: "All documents verified, approved for listing",
      flags: ["high_value", "authenticity_verified"],
      estimatedDuration: 7
    },
    ipAddress: "10.0.0.50",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    status: "success",
    metadata: {
      sessionId: "sess_admin_987654321",
      deviceType: "desktop",
      location: "Admin Office"
    }
  },
  {
    id: 3,
    logId: "LOG-2024-003",
    auctionId: "AUCT-2024-002",
    action: "auction_cancelled",
    description: "Auction cancelled due to policy violation",
    actor: "Admin User",
    actorType: "admin",
    actorEmail: "admin@scrabia.com",
    timestamp: "2024-01-20 09:45:15",
    details: {
      cancellationReason: "Policy Violation",
      refundProcessed: true,
      biddersNotified: 12,
      watchersNotified: 28
    },
    ipAddress: "10.0.0.50",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    status: "success",
    metadata: {
      sessionId: "sess_admin_987654321",
      deviceType: "desktop",
      location: "Admin Office"
    }
  },
  {
    id: 4,
    logId: "LOG-2024-004",
    auctionId: "AUCT-2024-003",
    action: "inquiry_sent",
    description: "Buyer sent inquiry about auction item",
    actor: "Mike Johnson",
    actorType: "buyer",
    actorEmail: "mike.johnson@example.com",
    timestamp: "2024-01-20 08:20:45",
    details: {
      inquiryType: "general_question",
      message: "Is the painting signed by the artist?",
      priority: "medium",
      responseRequired: true
    },
    ipAddress: "203.0.113.45",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15",
    status: "success",
    metadata: {
      sessionId: "sess_mobile_456789123",
      deviceType: "mobile",
      location: "Los Angeles, CA"
    }
  },
  {
    id: 5,
    logId: "LOG-2024-005",
    auctionId: "AUCT-2024-001",
    action: "payment_failed",
    description: "Buyer payment failed during processing",
    actor: "System",
    actorType: "system",
    actorEmail: "system@scrabia.com",
    timestamp: "2024-01-20 07:15:30",
    details: {
      paymentMethod: "credit_card",
      failureReason: "Insufficient funds",
      retryAttempt: 1,
      maxRetries: 3,
      nextRetryAt: "2024-01-20 13:15:30"
    },
    ipAddress: "internal",
    userAgent: "Scrabia Payment System v2.1.0",
    status: "warning",
    metadata: {
      sessionId: "system_payment_001",
      deviceType: "system",
      location: "Payment Server"
    }
  },
  {
    id: 6,
    logId: "LOG-2024-006",
    auctionId: "AUCT-2024-004",
    action: "rating_submitted",
    description: "Seller rated buyer after auction completion",
    actor: "Sarah Wilson",
    actorType: "seller",
    actorEmail: "sarah.wilson@example.com",
    timestamp: "2024-01-19 16:30:20",
    details: {
      rating: 5,
      review: "Excellent buyer, fast payment and great communication",
      ratedUser: "David Brown",
      auctionCompleted: true
    },
    ipAddress: "198.51.100.25",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    status: "success",
    metadata: {
      sessionId: "sess_rating_789123456",
      deviceType: "desktop",
      location: "Chicago, IL"
    }
  }
];

const page = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [actionFilter, setActionFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [dateRange, setDateRange] = useState("today");

  // Filter logs based on search and filters
  const filteredLogs = auctionLogs.filter(log => {
    const matchesSearch = log.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.actor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.auctionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.logId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAction = actionFilter === "all" || log.action === actionFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    
    return matchesSearch && matchesAction && matchesStatus;
  });

  const handleViewDetails = (log: any) => {
    setSelectedLog(log);
    setIsDetailModalOpen(true);
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case "bid_placed": return <DollarSign className="h-4 w-4 text-green-500" />;
      case "auction_approved": return <CheckCircle className="h-4 w-4 text-blue-500" />;
      case "auction_cancelled": return <XCircle className="h-4 w-4 text-red-500" />;
      case "inquiry_sent": return <MessageSquare className="h-4 w-4 text-yellow-500" />;
      case "payment_failed": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "rating_submitted": return <Star className="h-4 w-4 text-purple-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case "bid_placed": return "bg-green-100 text-green-800";
      case "auction_approved": return "bg-blue-100 text-blue-800";
      case "auction_cancelled": return "bg-red-100 text-red-800";
      case "inquiry_sent": return "bg-yellow-100 text-yellow-800";
      case "payment_failed": return "bg-orange-100 text-orange-800";
      case "rating_submitted": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-100 text-green-800";
      case "warning": return "bg-yellow-100 text-yellow-800";
      case "error": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getActorTypeColor = (actorType: string) => {
    switch (actorType) {
      case "admin": return "bg-blue-100 text-blue-800";
      case "seller": return "bg-green-100 text-green-800";
      case "buyer": return "bg-purple-100 text-purple-800";
      case "system": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const columns: JsonTableColumns<(typeof auctionLogs)[0]> = [
    { title: "Log ID", dataIndex: "logId", width: 120 },
    { title: "Auction ID", dataIndex: "auctionId", width: 120 },
    { 
      title: "Action", 
      dataIndex: "action",
      width: 150,
      render: (item) => (
        <div className="flex items-center gap-2">
          {getActionIcon(item.action)}
          <Badge className={getActionColor(item.action)}>
            {item.action.replace('_', ' ')}
          </Badge>
        </div>
      )
    },
    { title: "Description", dataIndex: "description", width: 200 },
    { 
      title: "Actor", 
      dataIndex: "actor",
      width: 150,
      render: (item) => (
        <div>
          <div className="font-medium">{item.actor}</div>
          <Badge className={`text-xs ${getActorTypeColor(item.actorType)}`}>
            {item.actorType}
          </Badge>
        </div>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      width: 100,
      render: (item) => (
        <Badge className={getStatusColor(item.status)}>
          {item.status}
        </Badge>
      )
    },
    { title: "Timestamp", dataIndex: "timestamp", width: 150 },
    {
      title: "Actions",
      dataIndex: "id",
      width: 100,
      render: (item) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleViewDetails(item)}
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <FileText className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Auction Logs</h1>
          <p className="text-gray-600">Comprehensive audit trail of all auction activities</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {logStats.map((stat) => (
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
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({auctionLogs.length})</TabsTrigger>
          <TabsTrigger value="bids">Bids ({auctionLogs.filter(l => l.action === "bid_placed").length})</TabsTrigger>
          <TabsTrigger value="admin">Admin ({auctionLogs.filter(l => l.actorType === "admin").length})</TabsTrigger>
          <TabsTrigger value="system">System ({auctionLogs.filter(l => l.actorType === "system").length})</TabsTrigger>
          <TabsTrigger value="errors">Errors ({auctionLogs.filter(l => l.status === "error" || l.status === "warning").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search logs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={actionFilter} onValueChange={setActionFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Actions</SelectItem>
                  <SelectItem value="bid_placed">Bid Placed</SelectItem>
                  <SelectItem value="auction_approved">Auction Approved</SelectItem>
                  <SelectItem value="auction_cancelled">Auction Cancelled</SelectItem>
                  <SelectItem value="inquiry_sent">Inquiry Sent</SelectItem>
                  <SelectItem value="payment_failed">Payment Failed</SelectItem>
                  <SelectItem value="rating_submitted">Rating Submitted</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="warning">Warning</SelectItem>
                  <SelectItem value="error">Error</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          {/* Logs Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Auction Activity Logs ({filteredLogs.length})</h3>
            </div>
            <div className="w-full overflow-x-auto">
              <JsonTable columns={columns} data={filteredLogs} enableSelection={false} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Log Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Log Details - {selectedLog?.logId}
            </DialogTitle>
            <DialogDescription>
              Complete audit trail information for this activity
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-6">
              {/* Log Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getActionIcon(selectedLog.action)}
                    {selectedLog.description}
                  </CardTitle>
                  <CardDescription>
                    {selectedLog.timestamp} • {selectedLog.auctionId}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Log ID</Label>
                      <p className="text-sm text-gray-900">{selectedLog.logId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Auction ID</Label>
                      <p className="text-sm text-gray-900">{selectedLog.auctionId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge className={getStatusColor(selectedLog.status)}>
                        {selectedLog.status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Actor Type</Label>
                      <Badge className={getActorTypeColor(selectedLog.actorType)}>
                        {selectedLog.actorType}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actor Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Actor Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p className="text-sm text-gray-900">{selectedLog.actor}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-gray-900">{selectedLog.actorEmail}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">IP Address</Label>
                      <p className="text-sm text-gray-900">{selectedLog.ipAddress}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">User Agent</Label>
                      <p className="text-sm text-gray-900 break-all">{selectedLog.userAgent}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Action Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Action Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(selectedLog.details).map(([key, value]) => (
                      <div key={key} className="flex justify-between items-start">
                        <Label className="text-sm font-medium capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}:
                        </Label>
                        <div className="text-sm text-gray-900 text-right max-w-xs">
                          {typeof value === 'object' ? (
                            <pre className="whitespace-pre-wrap text-xs">
                              {JSON.stringify(value, null, 2)}
                            </pre>
                          ) : (
                            String(value)
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="w-5 h-5" />
                    Metadata
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Session ID</Label>
                      <p className="text-sm text-gray-900 font-mono">{selectedLog.metadata.sessionId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Device Type</Label>
                      <p className="text-sm text-gray-900">{selectedLog.metadata.deviceType}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Location</Label>
                      <p className="text-sm text-gray-900">{selectedLog.metadata.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => console.log("Export log details")}>
              <Download className="w-4 h-4 mr-2" />
              Export Details
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
