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
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Search, 
  Filter, 
  Upload,
  AlertTriangle,
  Gavel,
  User,
  Calendar,
  DollarSign,
  FileText,
  Star,
  Flag
} from "lucide-react";

type Props = {};

const requestStats = [
  { title: "Pending Requests", value: "23", change: "+3", trend: "up" },
  { title: "Approved Today", value: "15", change: "+8", trend: "up" },
  { title: "Rejected Today", value: "3", change: "-2", trend: "down" },
  { title: "Avg. Review Time", value: "2.3h", change: "-15%", trend: "down" },
];

// Sample auction request data
const auctionRequests = [
  {
    id: 1,
    requestId: "REQ-2024-001",
    title: "Vintage Rolex Submariner 1960s",
    description: "Rare vintage Rolex Submariner from the 1960s, excellent condition, original box and papers included.",
    seller: "John Smith",
    sellerEmail: "john.smith@example.com",
    sellerRating: 4.8,
    category: "Luxury Watches",
    startingBid: 5000,
    reservePrice: 8000,
    estimatedValue: 12000,
    duration: 7,
    status: "pending",
    submittedAt: "2024-01-20 10:30:00",
    reviewedAt: null,
    reviewedBy: null,
    flags: ["high_value", "authenticity_required"],
    attachments: [
      { name: "watch_photos.pdf", type: "images", size: "2.3MB" },
      { name: "certificate.pdf", type: "document", size: "1.1MB" }
    ],
    reviewNotes: null,
    rejectionReason: null,
    priority: "high"
  },
  {
    id: 2,
    requestId: "REQ-2024-002",
    title: "Antique Persian Rug 19th Century",
    description: "Beautiful hand-woven Persian rug from the 19th century, traditional patterns, good condition.",
    seller: "Sarah Wilson",
    sellerEmail: "sarah.wilson@example.com",
    sellerRating: 4.5,
    category: "Antiques",
    startingBid: 2000,
    reservePrice: 3500,
    estimatedValue: 5000,
    duration: 5,
    status: "under_review",
    submittedAt: "2024-01-19 14:20:00",
    reviewedAt: "2024-01-20 09:15:00",
    reviewedBy: "Admin User",
    flags: ["authenticity_required"],
    attachments: [
      { name: "rug_details.pdf", type: "images", size: "3.1MB" }
    ],
    reviewNotes: "Need additional authentication documents",
    rejectionReason: null,
    priority: "medium"
  },
  {
    id: 3,
    requestId: "REQ-2024-003",
    title: "Modern Art Painting - Abstract",
    description: "Contemporary abstract painting by local artist, signed and dated 2023.",
    seller: "Mike Johnson",
    sellerEmail: "mike.johnson@example.com",
    sellerRating: 3.9,
    category: "Art",
    startingBid: 800,
    reservePrice: 1200,
    estimatedValue: 1500,
    duration: 3,
    status: "approved",
    submittedAt: "2024-01-18 16:45:00",
    reviewedAt: "2024-01-19 11:30:00",
    reviewedBy: "Admin User",
    flags: [],
    attachments: [
      { name: "painting_photos.pdf", type: "images", size: "1.8MB" }
    ],
    reviewNotes: "Approved with standard terms",
    rejectionReason: null,
    priority: "low"
  },
  {
    id: 4,
    requestId: "REQ-2024-004",
    title: "Rare Coin Collection",
    description: "Collection of rare coins from various countries, includes gold and silver pieces.",
    seller: "David Brown",
    sellerEmail: "david.brown@example.com",
    sellerRating: 4.2,
    category: "Collectibles",
    startingBid: 3000,
    reservePrice: 4500,
    estimatedValue: 6000,
    duration: 7,
    status: "rejected",
    submittedAt: "2024-01-17 12:10:00",
    reviewedAt: "2024-01-18 15:20:00",
    reviewedBy: "Admin User",
    flags: ["verification_needed"],
    attachments: [
      { name: "coins_catalog.pdf", type: "document", size: "2.7MB" }
    ],
    reviewNotes: "Insufficient documentation for rare coin authentication",
    rejectionReason: "Insufficient authentication documentation",
    priority: "medium"
  }
];

const page = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewData, setReviewData] = useState({
    action: "",
    notes: "",
    flags: [] as string[],
    rejectionReason: ""
  });
  const [activeTab, setActiveTab] = useState("all");

  // Filter requests based on search and filters
  const filteredRequests = auctionRequests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.requestId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || request.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsDetailModalOpen(true);
  };

  const handleReviewRequest = (request: any) => {
    setSelectedRequest(request);
    setReviewData({
      action: "",
      notes: "",
      flags: request.flags || [],
      rejectionReason: ""
    });
    setIsReviewModalOpen(true);
  };

  const handleProcessReview = () => {
    if (!reviewData.action) {
      alert("Please select an action (Approve or Reject)");
      return;
    }

    if (reviewData.action === "reject" && !reviewData.rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }

    console.log("Processing review:", {
      request: selectedRequest,
      reviewData
    });

    alert(`Request ${reviewData.action === "approve" ? "approved" : "rejected"} successfully!`);
    setIsReviewModalOpen(false);
    setReviewData({ action: "", notes: "", flags: [], rejectionReason: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "under_review": return "bg-blue-100 text-blue-800";
      case "approved": return "bg-green-100 text-green-800";
      case "rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "under_review": return <Eye className="h-4 w-4 text-blue-500" />;
      case "approved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "rejected": return <XCircle className="h-4 w-4 text-red-500" />;
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
      case "authenticity_required": return <FileText className="h-3 w-3 text-blue-500" />;
      case "verification_needed": return <AlertTriangle className="h-3 w-3 text-yellow-500" />;
      default: return <Flag className="h-3 w-3 text-gray-500" />;
    }
  };

  const columns: JsonTableColumns<(typeof auctionRequests)[0]> = [
    { title: "Request ID", dataIndex: "requestId", width: 120 },
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
      title: "Starting Bid", 
      dataIndex: "startingBid",
      width: 120,
      render: (item) => (
        <span className="font-medium text-green-600">
          ${item.startingBid.toLocaleString()}
        </span>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      width: 140,
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
    { title: "Submitted", dataIndex: "submittedAt", width: 150 },
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
          {(item.status === "pending" || item.status === "under_review") && (
            <Button
              size="sm"
              onClick={() => handleReviewRequest(item)}
            >
              <Gavel className="w-4 h-4 mr-1" />
              Review
            </Button>
          )}
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
          <h1 className="text-3xl font-bold text-gray-900">Auction Requests</h1>
          <p className="text-gray-600">Manage auction creation requests and approvals</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {requestStats.map((stat) => (
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
          <TabsTrigger value="all">All ({auctionRequests.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({auctionRequests.filter(r => r.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="under_review">Under Review ({auctionRequests.filter(r => r.status === "under_review").length})</TabsTrigger>
          <TabsTrigger value="approved">Approved ({auctionRequests.filter(r => r.status === "approved").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search requests..."
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
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="under_review">Under Review</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Requests Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Auction Requests ({filteredRequests.length})</h3>
            </div>
            <div className="w-full overflow-x-auto">
              <JsonTable columns={columns} data={filteredRequests} enableSelection={false} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Request Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              Request Details - {selectedRequest?.requestId}
            </DialogTitle>
            <DialogDescription>
              Review complete auction request information
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && (
            <div className="space-y-6">
              {/* Request Header */}
              <Card>
                <CardHeader>
                  <CardTitle>{selectedRequest.title}</CardTitle>
                  <CardDescription>{selectedRequest.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Request ID</Label>
                      <p className="text-sm text-gray-900">{selectedRequest.requestId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Category</Label>
                      <p className="text-sm text-gray-900">{selectedRequest.category}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Duration</Label>
                      <p className="text-sm text-gray-900">{selectedRequest.duration} days</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Priority</Label>
                      <Badge className={getPriorityColor(selectedRequest.priority)}>
                        {selectedRequest.priority}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Financial Details */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Details
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Starting Bid</Label>
                      <p className="text-2xl font-bold text-green-600">
                        ${selectedRequest.startingBid.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Reserve Price</Label>
                      <p className="text-2xl font-bold text-blue-600">
                        ${selectedRequest.reservePrice.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Estimated Value</Label>
                      <p className="text-2xl font-bold text-purple-600">
                        ${selectedRequest.estimatedValue.toLocaleString()}
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
                      <p className="text-sm text-gray-900">{selectedRequest.seller}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-gray-900">{selectedRequest.sellerEmail}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Rating</Label>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{selectedRequest.sellerRating}</span>
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Submitted</Label>
                      <p className="text-sm text-gray-900">{selectedRequest.submittedAt}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="w-5 h-5" />
                    Attachments
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedRequest.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-500" />
                          <span className="font-medium">{attachment.name}</span>
                          <Badge variant="outline">{attachment.type}</Badge>
                        </div>
                        <span className="text-sm text-gray-500">{attachment.size}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Flags */}
              {selectedRequest.flags.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="w-5 h-5" />
                      Flags
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {selectedRequest.flags.map((flag, index) => (
                        <Badge key={index} variant="outline" className="flex items-center gap-1">
                          {getFlagIcon(flag)}
                          {flag.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Review Information */}
              {selectedRequest.reviewedAt && (
                <Card>
                  <CardHeader>
                    <CardTitle>Review Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Reviewed At</Label>
                        <p className="text-sm text-gray-900">{selectedRequest.reviewedAt}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Reviewed By</Label>
                        <p className="text-sm text-gray-900">{selectedRequest.reviewedBy}</p>
                      </div>
                    </div>
                    {selectedRequest.reviewNotes && (
                      <div>
                        <Label className="text-sm font-medium">Review Notes</Label>
                        <p className="text-sm text-gray-900 mt-1 p-3 bg-gray-50 rounded">
                          {selectedRequest.reviewNotes}
                        </p>
                      </div>
                    )}
                    {selectedRequest.rejectionReason && (
                      <div>
                        <Label className="text-sm font-medium">Rejection Reason</Label>
                        <p className="text-sm text-red-600 mt-1 p-3 bg-red-50 rounded">
                          {selectedRequest.rejectionReason}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
            {(selectedRequest?.status === "pending" || selectedRequest?.status === "under_review") && (
              <Button onClick={() => handleReviewRequest(selectedRequest)}>
                <Gavel className="w-4 h-4 mr-2" />
                Review Request
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={isReviewModalOpen} onOpenChange={setIsReviewModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gavel className="w-5 h-5" />
              Review Auction Request
            </DialogTitle>
            <DialogDescription>
              Approve or reject the auction request: {selectedRequest?.requestId}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="review-action">Action *</Label>
              <Select value={reviewData.action} onValueChange={(value) => setReviewData(prev => ({ ...prev, action: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="approve">Approve Request</SelectItem>
                  <SelectItem value="reject">Reject Request</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="review-notes">Review Notes</Label>
              <Textarea
                id="review-notes"
                placeholder="Add your review notes..."
                value={reviewData.notes}
                onChange={(e) => setReviewData(prev => ({ ...prev, notes: e.target.value }))}
                className="mt-1"
              />
            </div>

            {reviewData.action === "reject" && (
              <div>
                <Label htmlFor="rejection-reason">Rejection Reason *</Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Provide detailed rejection reason..."
                  value={reviewData.rejectionReason}
                  onChange={(e) => setReviewData(prev => ({ ...prev, rejectionReason: e.target.value }))}
                  className="mt-1"
                />
              </div>
            )}

            <div>
              <Label>Flags</Label>
              <div className="mt-2 space-y-2">
                {["high_value", "authenticity_required", "verification_needed"].map((flag) => (
                  <div key={flag} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={flag}
                      checked={reviewData.flags.includes(flag)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setReviewData(prev => ({ ...prev, flags: [...prev.flags, flag] }));
                        } else {
                          setReviewData(prev => ({ ...prev, flags: prev.flags.filter(f => f !== flag) }));
                        }
                      }}
                    />
                    <Label htmlFor={flag} className="text-sm">
                      {flag.replace('_', ' ')}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProcessReview} disabled={!reviewData.action}>
              {reviewData.action === "approve" ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve Request
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject Request
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
