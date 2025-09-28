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
  AlertTriangle, 
  Eye, 
  Search, 
  Filter, 
  Send,
  CheckCircle,
  XCircle,
  Clock,
  DollarSign,
  User,
  Calendar,
  Star,
  Flag,
  Upload,
  Reply,
  Bell,
  TrendingDown,
  AlertCircle,
  Gavel,
  CreditCard,
  FileText
} from "lucide-react";

type Props = {};

const monitoringStats = [
  { title: "Overdue Awards", value: "12", change: "+3", trend: "up" },
  { title: "Payment Failures", value: "8", change: "-2", trend: "down" },
  { title: "Escalated Cases", value: "5", change: "+1", trend: "up" },
  { title: "Avg. Resolution Time", value: "2.1 days", change: "-0.5 days", trend: "down" },
];

// Sample monitoring data
const overdueAwards = [
  {
    id: 1,
    auctionId: "AUCT-2024-001",
    title: "Vintage Rolex Submariner",
    seller: "John Smith",
    sellerEmail: "john.smith@example.com",
    buyer: "Jane Smith",
    buyerEmail: "jane.smith@example.com",
    finalBid: 15000,
    endedAt: "2024-01-15 16:00:00",
    daysOverdue: 5,
    status: "overdue",
    priority: "high",
    lastContact: "2024-01-18 10:30:00",
    contactMethod: "email",
    escalationLevel: 1,
    notes: "Seller not responding to award notifications",
    actions: ["email_sent", "phone_call_attempted"],
    nextAction: "Escalate to supervisor",
    nextActionDate: "2024-01-22"
  },
  {
    id: 2,
    auctionId: "AUCT-2024-002",
    title: "Antique Persian Rug",
    seller: "Sarah Wilson",
    sellerEmail: "sarah.wilson@example.com",
    buyer: "Mike Johnson",
    buyerEmail: "mike.johnson@example.com",
    finalBid: 8500,
    endedAt: "2024-01-16 14:30:00",
    daysOverdue: 4,
    status: "overdue",
    priority: "medium",
    lastContact: "2024-01-19 09:15:00",
    contactMethod: "phone",
    escalationLevel: 1,
    notes: "Seller claims item was damaged in shipping",
    actions: ["email_sent", "phone_call_completed"],
    nextAction: "Request damage documentation",
    nextActionDate: "2024-01-21"
  }
];

const paymentFailures = [
  {
    id: 1,
    auctionId: "AUCT-2024-003",
    title: "Modern Art Painting",
    seller: "Emily Davis",
    sellerEmail: "emily.davis@example.com",
    buyer: "David Brown",
    buyerEmail: "david.brown@example.com",
    finalBid: 12000,
    paymentDeadline: "2024-01-20 23:59:59",
    daysOverdue: 0,
    status: "payment_failed",
    priority: "high",
    failureReason: "Insufficient funds",
    retryAttempts: 2,
    lastRetry: "2024-01-20 15:30:00",
    nextRetry: "2024-01-21 15:30:00",
    paymentMethod: "credit_card",
    actions: ["payment_retry", "email_sent", "sms_sent"],
    nextAction: "Contact buyer directly",
    nextActionDate: "2024-01-21"
  },
  {
    id: 2,
    auctionId: "AUCT-2024-004",
    title: "Rare Coin Collection",
    seller: "Mike Johnson",
    sellerEmail: "mike.johnson@example.com",
    buyer: "Lisa Anderson",
    buyerEmail: "lisa.anderson@example.com",
    finalBid: 4500,
    paymentDeadline: "2024-01-18 23:59:59",
    daysOverdue: 2,
    status: "payment_failed",
    priority: "high",
    failureReason: "Card expired",
    retryAttempts: 3,
    lastRetry: "2024-01-19 10:00:00",
    nextRetry: null,
    paymentMethod: "credit_card",
    actions: ["payment_retry", "email_sent", "phone_call_attempted"],
    nextAction: "Escalate to collections",
    nextActionDate: "2024-01-22"
  }
];

const page = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [selectedCase, setSelectedCase] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [actionData, setActionData] = useState({
    action: "",
    notes: "",
    nextAction: "",
    escalationLevel: 1,
    notifyUsers: true
  });
  const [activeTab, setActiveTab] = useState("overdue_awards");

  // Filter cases based on search and filters
  const filteredOverdueAwards = overdueAwards.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.auctionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const filteredPaymentFailures = paymentFailures.filter(case_ => {
    const matchesSearch = case_.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.buyer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         case_.auctionId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || case_.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || case_.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleViewDetails = (case_: any) => {
    setSelectedCase(case_);
    setIsDetailModalOpen(true);
  };

  const handleTakeAction = (case_: any) => {
    setSelectedCase(case_);
    setActionData({
      action: "",
      notes: "",
      nextAction: "",
      escalationLevel: case_.escalationLevel || 1,
      notifyUsers: true
    });
    setIsActionModalOpen(true);
  };

  const handleProcessAction = () => {
    if (!actionData.action.trim()) {
      alert("Please select an action");
      return;
    }

    console.log("Processing action:", {
      case: selectedCase,
      actionData
    });

    alert("Action processed successfully!");
    setIsActionModalOpen(false);
    setActionData({ action: "", notes: "", nextAction: "", escalationLevel: 1, notifyUsers: true });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "overdue": return "bg-red-100 text-red-800";
      case "payment_failed": return "bg-orange-100 text-orange-800";
      case "escalated": return "bg-purple-100 text-purple-800";
      case "resolved": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "overdue": return <Clock className="h-4 w-4 text-red-500" />;
      case "payment_failed": return <XCircle className="h-4 w-4 text-orange-500" />;
      case "escalated": return <AlertTriangle className="h-4 w-4 text-purple-500" />;
      case "resolved": return <CheckCircle className="h-4 w-4 text-green-500" />;
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

  const getEscalationColor = (level: number) => {
    switch (level) {
      case 1: return "bg-yellow-100 text-yellow-800";
      case 2: return "bg-orange-100 text-orange-800";
      case 3: return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const overdueAwardsColumns: JsonTableColumns<(typeof overdueAwards)[0]> = [
    { title: "Auction ID", dataIndex: "auctionId", width: 120 },
    { title: "Title", dataIndex: "title", width: 200 },
    { title: "Seller", dataIndex: "seller", width: 150 },
    { title: "Buyer", dataIndex: "buyer", width: 150 },
    { 
      title: "Final Bid", 
      dataIndex: "finalBid",
      width: 120,
      render: (item) => (
        <span className="font-medium text-green-600">
          ${item.finalBid.toLocaleString()}
        </span>
      )
    },
    { 
      title: "Days Overdue", 
      dataIndex: "daysOverdue",
      width: 120,
      render: (item) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-red-500" />
          <span className="font-medium text-red-600">{item.daysOverdue} days</span>
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
      title: "Escalation", 
      dataIndex: "escalationLevel",
      width: 100,
      render: (item) => (
        <Badge className={getEscalationColor(item.escalationLevel)}>
          Level {item.escalationLevel}
        </Badge>
      )
    },
    { title: "Next Action", dataIndex: "nextAction", width: 150 },
    {
      title: "Actions",
      dataIndex: "id",
      width: 150,
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
            onClick={() => handleTakeAction(item)}
          >
            <Gavel className="w-4 h-4 mr-1" />
            Action
          </Button>
        </div>
      )
    }
  ];

  const paymentFailuresColumns: JsonTableColumns<(typeof paymentFailures)[0]> = [
    { title: "Auction ID", dataIndex: "auctionId", width: 120 },
    { title: "Title", dataIndex: "title", width: 200 },
    { title: "Seller", dataIndex: "seller", width: 150 },
    { title: "Buyer", dataIndex: "buyer", width: 150 },
    { 
      title: "Final Bid", 
      dataIndex: "finalBid",
      width: 120,
      render: (item) => (
        <span className="font-medium text-green-600">
          ${item.finalBid.toLocaleString()}
        </span>
      )
    },
    { 
      title: "Failure Reason", 
      dataIndex: "failureReason",
      width: 150,
      render: (item) => (
        <div className="flex items-center gap-2">
          <XCircle className="h-4 w-4 text-red-500" />
          <span className="text-sm">{item.failureReason}</span>
        </div>
      )
    },
    { 
      title: "Retry Attempts", 
      dataIndex: "retryAttempts",
      width: 120,
      render: (item) => (
        <div className="text-center">
          <span className="font-medium">{item.retryAttempts}/3</span>
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
    { title: "Next Action", dataIndex: "nextAction", width: 150 },
    {
      title: "Actions",
      dataIndex: "id",
      width: 150,
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
        <AlertTriangle className="w-8 h-8 text-red-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Auction Monitoring</h1>
          <p className="text-gray-600">Monitor and resolve overdue awards and payment failures</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {monitoringStats.map((stat) => (
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overdue_awards">Overdue Awards ({overdueAwards.length})</TabsTrigger>
          <TabsTrigger value="payment_failures">Payment Failures ({paymentFailures.length})</TabsTrigger>
          <TabsTrigger value="escalated">Escalated Cases ({overdueAwards.filter(a => a.escalationLevel > 1).length + paymentFailures.filter(p => p.retryAttempts >= 3).length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Cases Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">
                {activeTab === "overdue_awards" ? "Overdue Awards" : 
                 activeTab === "payment_failures" ? "Payment Failures" : 
                 "Escalated Cases"} 
                ({activeTab === "overdue_awards" ? filteredOverdueAwards.length : 
                  activeTab === "payment_failures" ? filteredPaymentFailures.length : 
                  filteredOverdueAwards.filter(a => a.escalationLevel > 1).length + filteredPaymentFailures.filter(p => p.retryAttempts >= 3).length})
              </h3>
            </div>
            <div className="w-full overflow-x-auto">
              {activeTab === "overdue_awards" ? (
                <JsonTable columns={overdueAwardsColumns} data={filteredOverdueAwards} enableSelection={false} />
              ) : activeTab === "payment_failures" ? (
                <JsonTable columns={paymentFailuresColumns} data={filteredPaymentFailures} enableSelection={false} />
              ) : (
                <JsonTable 
                  columns={overdueAwardsColumns} 
                  data={[...filteredOverdueAwards.filter(a => a.escalationLevel > 1), ...filteredPaymentFailures.filter(p => p.retryAttempts >= 3)]} 
                  enableSelection={false} 
                />
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Case Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Case Details - {selectedCase?.auctionId}
            </DialogTitle>
            <DialogDescription>
              Complete case information and resolution tracking
            </DialogDescription>
          </DialogHeader>
          
          {selectedCase && (
            <div className="space-y-6">
              {/* Case Header */}
              <Card>
                <CardHeader>
                  <CardTitle>{selectedCase.title}</CardTitle>
                  <CardDescription>Auction ID: {selectedCase.auctionId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Final Bid</Label>
                      <p className="text-2xl font-bold text-green-600">
                        ${selectedCase.finalBid.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Priority</Label>
                      <Badge className={getPriorityColor(selectedCase.priority)}>
                        {selectedCase.priority}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge className={getStatusColor(selectedCase.status)}>
                        {selectedCase.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Days Overdue</Label>
                      <p className="text-2xl font-bold text-red-600">
                        {selectedCase.daysOverdue || 0}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Parties Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Seller Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p className="text-sm text-gray-900">{selectedCase.seller}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p className="text-sm text-gray-900">{selectedCase.sellerEmail}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Last Contact</Label>
                        <p className="text-sm text-gray-900">{selectedCase.lastContact}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Contact Method</Label>
                        <p className="text-sm text-gray-900">{selectedCase.contactMethod}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Buyer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <Label className="text-sm font-medium">Name</Label>
                        <p className="text-sm text-gray-900">{selectedCase.buyer}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Email</Label>
                        <p className="text-sm text-gray-900">{selectedCase.buyerEmail}</p>
                      </div>
                      {selectedCase.paymentMethod && (
                        <div>
                          <Label className="text-sm font-medium">Payment Method</Label>
                          <p className="text-sm text-gray-900">{selectedCase.paymentMethod}</p>
                        </div>
                      )}
                      {selectedCase.failureReason && (
                        <div>
                          <Label className="text-sm font-medium">Failure Reason</Label>
                          <p className="text-sm text-red-600">{selectedCase.failureReason}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Timeline Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Auction Ended</Label>
                      <p className="text-sm text-gray-900">{selectedCase.endedAt || selectedCase.paymentDeadline}</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Last Contact</Label>
                      <p className="text-sm text-gray-900">{selectedCase.lastContact}</p>
                    </div>
                    {selectedCase.lastRetry && (
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium">Last Retry</Label>
                        <p className="text-sm text-gray-900">{selectedCase.lastRetry}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Next Action Date</Label>
                      <p className="text-sm text-gray-900">{selectedCase.nextActionDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions Taken */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Flag className="w-5 h-5" />
                    Actions Taken
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {selectedCase.actions.map((action, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span className="text-sm">{action.replace('_', ' ')}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-900">{selectedCase.notes}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleTakeAction(selectedCase)}>
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
              Take Action on Case
            </DialogTitle>
            <DialogDescription>
              Resolve case: {selectedCase?.auctionId}
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
                  <SelectItem value="contact_seller">Contact Seller</SelectItem>
                  <SelectItem value="contact_buyer">Contact Buyer</SelectItem>
                  <SelectItem value="retry_payment">Retry Payment</SelectItem>
                  <SelectItem value="escalate">Escalate Case</SelectItem>
                  <SelectItem value="resolve">Mark as Resolved</SelectItem>
                  <SelectItem value="cancel_auction">Cancel Auction</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="action-notes">Action Notes *</Label>
              <Textarea
                id="action-notes"
                placeholder="Describe the action taken..."
                value={actionData.notes}
                onChange={(e) => setActionData(prev => ({ ...prev, notes: e.target.value }))}
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="next-action">Next Action</Label>
              <Input
                id="next-action"
                placeholder="What should be the next action?"
                value={actionData.nextAction}
                onChange={(e) => setActionData(prev => ({ ...prev, nextAction: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="escalation-level">Escalation Level</Label>
              <Select value={actionData.escalationLevel.toString()} onValueChange={(value) => setActionData(prev => ({ ...prev, escalationLevel: parseInt(value) }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select escalation level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Level 1 - Standard</SelectItem>
                  <SelectItem value="2">Level 2 - Supervisor</SelectItem>
                  <SelectItem value="3">Level 3 - Management</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="notify-users"
                checked={actionData.notifyUsers}
                onChange={(e) => setActionData(prev => ({ ...prev, notifyUsers: e.target.checked }))}
              />
              <Label htmlFor="notify-users" className="text-sm">
                Notify all parties involved
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsActionModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProcessAction} disabled={!actionData.action.trim() || !actionData.notes.trim()}>
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
