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
  MessageSquare, 
  Eye, 
  Search, 
  Filter, 
  Send,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  User,
  Calendar,
  DollarSign,
  Star,
  Flag,
  Upload,
  Reply,
  Archive,
  Bell
} from "lucide-react";

type Props = {};

const inquiryStats = [
  { title: "Total Inquiries", value: "1,247", change: "+89", trend: "up" },
  { title: "Pending Response", value: "23", change: "-5", trend: "down" },
  { title: "Resolved Today", value: "15", change: "+3", trend: "up" },
  { title: "Avg. Response Time", value: "2.3h", change: "-0.5h", trend: "down" },
];

// Sample inquiry data
const inquiries = [
  {
    id: 1,
    inquiryId: "INQ-2024-001",
    auctionId: "AUCT-2024-001",
    title: "Vintage Rolex Submariner",
    inquirer: "Jane Smith",
    inquirerEmail: "jane.smith@example.com",
    inquirerType: "buyer",
    seller: "John Smith",
    sellerEmail: "john.smith@example.com",
    inquiryType: "general_question",
    subject: "Is the watch authentic?",
    message: "I'm interested in this watch but want to confirm its authenticity. Do you have the original papers and box?",
    priority: "high",
    status: "pending",
    submittedAt: "2024-01-20 14:30:25",
    respondedAt: null,
    responseTime: null,
    attachments: [
      { name: "watch_photos.pdf", type: "images", size: "2.3MB" }
    ],
    adminNotes: null,
    response: null,
    resolvedBy: null,
    resolvedAt: null
  },
  {
    id: 2,
    inquiryId: "INQ-2024-002",
    auctionId: "AUCT-2024-002",
    title: "Antique Persian Rug",
    inquirer: "Mike Johnson",
    inquirerEmail: "mike.johnson@example.com",
    inquirerType: "buyer",
    seller: "Sarah Wilson",
    sellerEmail: "sarah.wilson@example.com",
    inquiryType: "shipping_question",
    subject: "Shipping costs to Canada",
    message: "What would be the shipping costs to Toronto, Canada? And how long would it take?",
    priority: "medium",
    status: "responded",
    submittedAt: "2024-01-20 10:15:30",
    respondedAt: "2024-01-20 12:30:45",
    responseTime: "2h 15m",
    attachments: [],
    adminNotes: "Seller provided detailed shipping information",
    response: "Shipping to Canada costs $150 and takes 5-7 business days. Insurance is included.",
    resolvedBy: "Admin User",
    resolvedAt: "2024-01-20 12:30:45"
  },
  {
    id: 3,
    inquiryId: "INQ-2024-003",
    auctionId: "AUCT-2024-003",
    title: "Modern Art Painting",
    inquirer: "David Brown",
    inquirerEmail: "david.brown@example.com",
    inquirerType: "buyer",
    seller: "Emily Davis",
    sellerEmail: "emily.davis@example.com",
    inquiryType: "condition_question",
    subject: "Condition of the painting",
    message: "Are there any visible damages or wear on the painting? Can you provide more detailed photos?",
    priority: "medium",
    status: "under_review",
    submittedAt: "2024-01-20 08:45:15",
    respondedAt: null,
    responseTime: null,
    attachments: [],
    adminNotes: "Waiting for seller to provide additional photos",
    response: null,
    resolvedBy: null,
    resolvedAt: null
  },
  {
    id: 4,
    inquiryId: "INQ-2024-004",
    auctionId: "AUCT-2024-004",
    title: "Rare Coin Collection",
    inquirer: "Lisa Anderson",
    inquirerEmail: "lisa.anderson@example.com",
    inquirerType: "buyer",
    seller: "Mike Johnson",
    sellerEmail: "mike.johnson@example.com",
    inquiryType: "payment_question",
    subject: "Payment methods accepted",
    message: "What payment methods do you accept? Do you offer payment plans?",
    priority: "low",
    status: "resolved",
    submittedAt: "2024-01-19 16:20:10",
    respondedAt: "2024-01-19 18:45:30",
    responseTime: "2h 25m",
    attachments: [],
    adminNotes: "Standard payment methods explained",
    response: "We accept credit cards, bank transfers, and PayPal. Payment plans are available for items over $5,000.",
    resolvedBy: "Admin User",
    resolvedAt: "2024-01-19 18:45:30"
  },
  {
    id: 5,
    inquiryId: "INQ-2024-005",
    auctionId: "AUCT-2024-005",
    title: "Vintage Guitar",
    inquirer: "Robert Taylor",
    inquirerEmail: "robert.taylor@example.com",
    inquirerType: "buyer",
    seller: "Tom Wilson",
    sellerEmail: "tom.wilson@example.com",
    inquiryType: "technical_question",
    subject: "Guitar specifications",
    message: "What are the exact specifications of this guitar? Year, model, and any modifications?",
    priority: "medium",
    status: "escalated",
    submittedAt: "2024-01-19 14:10:25",
    respondedAt: null,
    responseTime: null,
    attachments: [],
    adminNotes: "Escalated to technical team for detailed specifications",
    response: null,
    resolvedBy: null,
    resolvedAt: null
  }
];

const page = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedInquiry, setSelectedInquiry] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isResponseModalOpen, setIsResponseModalOpen] = useState(false);
  const [responseData, setResponseData] = useState({
    response: "",
    adminNotes: "",
    priority: "",
    status: ""
  });
  const [activeTab, setActiveTab] = useState("all");

  // Filter inquiries based on search and filters
  const filteredInquiries = inquiries.filter(inquiry => {
    const matchesSearch = inquiry.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.inquirer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         inquiry.auctionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || inquiry.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || inquiry.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewDetails = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setIsDetailModalOpen(true);
  };

  const handleRespondToInquiry = (inquiry: any) => {
    setSelectedInquiry(inquiry);
    setResponseData({
      response: "",
      adminNotes: "",
      priority: inquiry.priority,
      status: inquiry.status
    });
    setIsResponseModalOpen(true);
  };

  const handleProcessResponse = () => {
    if (!responseData.response.trim()) {
      alert("Please provide a response");
      return;
    }

    console.log("Processing response:", {
      inquiry: selectedInquiry,
      responseData
    });

    alert("Response sent successfully!");
    setIsResponseModalOpen(false);
    setResponseData({ response: "", adminNotes: "", priority: "", status: "" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "responded": return "bg-blue-100 text-blue-800";
      case "under_review": return "bg-orange-100 text-orange-800";
      case "resolved": return "bg-green-100 text-green-800";
      case "escalated": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "responded": return <Reply className="h-4 w-4 text-blue-500" />;
      case "under_review": return <Eye className="h-4 w-4 text-orange-500" />;
      case "resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "escalated": return <AlertTriangle className="h-4 w-4 text-red-500" />;
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

  const getInquiryTypeIcon = (type: string) => {
    switch (type) {
      case "general_question": return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "shipping_question": return <Flag className="h-4 w-4 text-green-500" />;
      case "condition_question": return <Eye className="h-4 w-4 text-orange-500" />;
      case "payment_question": return <DollarSign className="h-4 w-4 text-purple-500" />;
      case "technical_question": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const columns: JsonTableColumns<(typeof inquiries)[0]> = [
    { title: "Inquiry ID", dataIndex: "inquiryId", width: 120 },
    { title: "Auction ID", dataIndex: "auctionId", width: 120 },
    { title: "Title", dataIndex: "title", width: 150 },
    { 
      title: "Type", 
      dataIndex: "inquiryType",
      width: 120,
      render: (item) => (
        <div className="flex items-center gap-2">
          {getInquiryTypeIcon(item.inquiryType)}
          <span className="text-xs">{item.inquiryType.replace('_', ' ')}</span>
        </div>
      )
    },
    { title: "Subject", dataIndex: "subject", width: 200 },
    { title: "Inquirer", dataIndex: "inquirer", width: 150 },
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
              onClick={() => handleRespondToInquiry(item)}
            >
              <Reply className="w-4 h-4 mr-1" />
              Respond
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
        <MessageSquare className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Auction Inquiries</h1>
          <p className="text-gray-600">Manage and respond to auction-related questions and inquiries</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inquiryStats.map((stat) => (
          <MetricCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">All ({inquiries.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({inquiries.filter(i => i.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="under_review">Under Review ({inquiries.filter(i => i.status === "under_review").length})</TabsTrigger>
          <TabsTrigger value="responded">Responded ({inquiries.filter(i => i.status === "responded").length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({inquiries.filter(i => i.status === "resolved").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search inquiries..."
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
                  <SelectItem value="responded">Responded</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="escalated">Escalated</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Inquiries ({filteredInquiries.length})</h3>
            </div>
            <div className="w-full overflow-x-auto">
              <JsonTable columns={columns} data={filteredInquiries} enableSelection={false} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Inquiry Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Inquiry Details - {selectedInquiry?.inquiryId}
            </DialogTitle>
            <DialogDescription>
              Complete inquiry information and response management
            </DialogDescription>
          </DialogHeader>
          
          {selectedInquiry && (
            <div className="space-y-6">
              {/* Inquiry Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getInquiryTypeIcon(selectedInquiry.inquiryType)}
                    {selectedInquiry.subject}
                  </CardTitle>
                  <CardDescription>Auction: {selectedInquiry.title} ({selectedInquiry.auctionId})</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Inquiry ID</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.inquiryId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Type</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.inquiryType.replace('_', ' ')}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Priority</Label>
                      <Badge className={getPriorityColor(selectedInquiry.priority)}>
                        {selectedInquiry.priority}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge className={getStatusColor(selectedInquiry.status)}>
                        {selectedInquiry.status.replace('_', ' ')}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Message Content */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Inquiry Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedInquiry.message}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Inquirer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Inquirer Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.inquirer}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.inquirerEmail}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Type</Label>
                      <Badge className="bg-blue-100 text-blue-800">
                        {selectedInquiry.inquirerType}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Submitted</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.submittedAt}</p>
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
                      <p className="text-sm text-gray-900">{selectedInquiry.seller}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-gray-900">{selectedInquiry.sellerEmail}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              {selectedInquiry.attachments.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="w-5 h-5" />
                      Attachments
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {selectedInquiry.attachments.map((attachment: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-2">
                            <Upload className="h-4 w-4 text-gray-500" />
                            <span className="font-medium">{attachment.name}</span>
                            <Badge variant="outline">{attachment.type}</Badge>
                          </div>
                          <span className="text-sm text-gray-500">{attachment.size}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Response Information */}
              {selectedInquiry.response && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Reply className="w-5 h-5" />
                      Response
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedInquiry.response}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium">Responded At</Label>
                        <p className="text-sm text-gray-900">{selectedInquiry.respondedAt}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Response Time</Label>
                        <p className="text-sm text-gray-900">{selectedInquiry.responseTime}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Resolved By</Label>
                        <p className="text-sm text-gray-900">{selectedInquiry.resolvedBy}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Resolved At</Label>
                        <p className="text-sm text-gray-900">{selectedInquiry.resolvedAt}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Admin Notes */}
              {selectedInquiry.adminNotes && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flag className="w-5 h-5" />
                      Admin Notes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-900">{selectedInquiry.adminNotes}</p>
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
            {(selectedInquiry?.status === "pending" || selectedInquiry?.status === "under_review") && (
              <Button onClick={() => handleRespondToInquiry(selectedInquiry)}>
                <Reply className="w-4 h-4 mr-2" />
                Respond to Inquiry
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Response Modal */}
      <Dialog open={isResponseModalOpen} onOpenChange={setIsResponseModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Reply className="w-5 h-5" />
              Respond to Inquiry
            </DialogTitle>
            <DialogDescription>
              Respond to inquiry: {selectedInquiry?.inquiryId}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="response-message">Response Message *</Label>
              <Textarea
                id="response-message"
                placeholder="Enter your response to the inquiry..."
                value={responseData.response}
                onChange={(e) => setResponseData(prev => ({ ...prev, response: e.target.value }))}
                className="mt-1 min-h-[120px]"
              />
            </div>

            <div>
              <Label htmlFor="admin-notes">Admin Notes</Label>
              <Textarea
                id="admin-notes"
                placeholder="Add internal notes about this inquiry..."
                value={responseData.adminNotes}
                onChange={(e) => setResponseData(prev => ({ ...prev, adminNotes: e.target.value }))}
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select value={responseData.priority} onValueChange={(value) => setResponseData(prev => ({ ...prev, priority: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="status">Status</Label>
                <Select value={responseData.status} onValueChange={(value) => setResponseData(prev => ({ ...prev, status: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="responded">Responded</SelectItem>
                    <SelectItem value="under_review">Under Review</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="escalated">Escalated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsResponseModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProcessResponse} disabled={!responseData.response.trim()}>
              <Send className="w-4 h-4 mr-2" />
              Send Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
