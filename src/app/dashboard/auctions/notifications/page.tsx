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
  Bell, 
  Eye, 
  Search, 
  Filter, 
  Send,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  MessageSquare,
  User,
  Calendar,
  DollarSign,
  Star,
  Flag,
  Mail,
  Smartphone,
  Globe,
  Settings
} from "lucide-react";

type Props = {};

const notificationStats = [
  { title: "Total Notifications", value: "8,247", change: "+234", trend: "up" },
  { title: "Pending Delivery", value: "23", change: "-5", trend: "down" },
  { title: "Failed Delivery", value: "12", change: "+2", trend: "up" },
  { title: "Avg. Delivery Time", value: "2.3s", change: "-0.5s", trend: "down" },
];

// Sample notification data
const notifications = [
  {
    id: 1,
    notificationId: "NOTIF-2024-001",
    type: "bid_placed",
    title: "New Bid on Your Auction",
    message: "A new bid of $15,000 has been placed on your auction 'Vintage Rolex Submariner'",
    recipient: "John Smith",
    recipientEmail: "john.smith@example.com",
    recipientType: "seller",
    auctionId: "AUCT-2024-001",
    priority: "high",
    status: "delivered",
    channels: ["email", "push", "sms"],
    sentAt: "2024-01-20 14:30:25",
    deliveredAt: "2024-01-20 14:30:27",
    readAt: "2024-01-20 14:35:12",
    failureReason: null,
    retryCount: 0,
    metadata: {
      bidAmount: 15000,
      previousBid: 14500,
      bidder: "Jane Smith"
    }
  },
  {
    id: 2,
    notificationId: "NOTIF-2024-002",
    type: "auction_ending",
    title: "Auction Ending Soon",
    message: "Your auction 'Antique Persian Rug' ends in 2 hours. Current bid: $4,200",
    recipient: "Sarah Wilson",
    recipientEmail: "sarah.wilson@example.com",
    recipientType: "seller",
    auctionId: "AUCT-2024-002",
    priority: "high",
    status: "delivered",
    channels: ["email", "push"],
    sentAt: "2024-01-20 12:00:00",
    deliveredAt: "2024-01-20 12:00:02",
    readAt: "2024-01-20 12:15:30",
    failureReason: null,
    retryCount: 0,
    metadata: {
      timeLeft: "2 hours",
      currentBid: 4200,
      watchers: 28
    }
  },
  {
    id: 3,
    notificationId: "NOTIF-2024-003",
    type: "payment_reminder",
    title: "Payment Reminder",
    message: "Please complete your payment for auction 'Modern Art Painting'. Amount due: $1,200",
    recipient: "Mike Johnson",
    recipientEmail: "mike.johnson@example.com",
    recipientType: "buyer",
    auctionId: "AUCT-2024-003",
    priority: "medium",
    status: "failed",
    channels: ["email", "sms"],
    sentAt: "2024-01-20 10:00:00",
    deliveredAt: null,
    readAt: null,
    failureReason: "Invalid email address",
    retryCount: 2,
    metadata: {
      amountDue: 1200,
      dueDate: "2024-01-22",
      paymentMethod: "credit_card"
    }
  },
  {
    id: 4,
    notificationId: "NOTIF-2024-004",
    type: "auction_cancelled",
    title: "Auction Cancelled",
    message: "The auction 'Rare Coin Collection' has been cancelled due to policy violation. Your bid has been refunded.",
    recipient: "David Brown",
    recipientEmail: "david.brown@example.com",
    recipientType: "buyer",
    auctionId: "AUCT-2024-004",
    priority: "high",
    status: "delivered",
    channels: ["email", "push", "sms"],
    sentAt: "2024-01-20 09:45:15",
    deliveredAt: "2024-01-20 09:45:18",
    readAt: "2024-01-20 10:20:45",
    failureReason: null,
    retryCount: 0,
    metadata: {
      cancellationReason: "Policy Violation",
      refundAmount: 4500,
      refundProcessed: true
    }
  },
  {
    id: 5,
    notificationId: "NOTIF-2024-005",
    type: "inquiry_received",
    title: "New Inquiry on Your Auction",
    message: "You have received a new inquiry about your auction 'Vintage Guitar'. Question: 'Is the guitar in working condition?'",
    recipient: "Tom Wilson",
    recipientEmail: "tom.wilson@example.com",
    recipientType: "seller",
    auctionId: "AUCT-2024-005",
    priority: "medium",
    status: "pending",
    channels: ["email"],
    sentAt: null,
    deliveredAt: null,
    readAt: null,
    failureReason: null,
    retryCount: 0,
    metadata: {
      inquiryText: "Is the guitar in working condition?",
      inquirer: "Jennifer Lee",
      inquiryType: "general_question"
    }
  },
  {
    id: 6,
    notificationId: "NOTIF-2024-006",
    type: "rating_received",
    title: "You Received a Rating",
    message: "You received a 5-star rating from David Brown for your auction 'Luxury Handbag'. Review: 'Excellent seller, fast shipping!'",
    recipient: "Lisa Anderson",
    recipientEmail: "lisa.anderson@example.com",
    recipientType: "seller",
    auctionId: "AUCT-2024-006",
    priority: "low",
    status: "delivered",
    channels: ["email", "push"],
    sentAt: "2024-01-19 16:30:20",
    deliveredAt: "2024-01-19 16:30:22",
    readAt: "2024-01-19 18:45:10",
    failureReason: null,
    retryCount: 0,
    metadata: {
      rating: 5,
      review: "Excellent seller, fast shipping!",
      rater: "David Brown",
      auctionCompleted: true
    }
  }
];

const page = (props: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedNotification, setSelectedNotification] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isSendModalOpen, setIsSendModalOpen] = useState(false);
  const [sendData, setSendData] = useState({
    type: "",
    title: "",
    message: "",
    recipients: "",
    channels: [] as string[],
    priority: "medium"
  });
  const [activeTab, setActiveTab] = useState("all");

  // Filter notifications based on search and filters
  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.recipient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.notificationId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || notification.type === typeFilter;
    const matchesStatus = statusFilter === "all" || notification.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleViewDetails = (notification: any) => {
    setSelectedNotification(notification);
    setIsDetailModalOpen(true);
  };

  const handleSendNotification = () => {
    setSendData({
      type: "",
      title: "",
      message: "",
      recipients: "",
      channels: [],
      priority: "medium"
    });
    setIsSendModalOpen(true);
  };

  const handleProcessSend = () => {
    if (!sendData.type || !sendData.title || !sendData.message || !sendData.recipients) {
      alert("Please fill in all required fields");
      return;
    }

    console.log("Sending notification:", sendData);
    alert("Notification sent successfully!");
    setIsSendModalOpen(false);
    setSendData({ type: "", title: "", message: "", recipients: "", channels: [], priority: "medium" });
  };

  const handleRetryNotification = (notification: any) => {
    console.log("Retrying notification:", notification);
    alert("Notification retry initiated!");
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bid_placed": return <DollarSign className="h-4 w-4 text-green-500" />;
      case "auction_ending": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "payment_reminder": return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "auction_cancelled": return <XCircle className="h-4 w-4 text-red-500" />;
      case "inquiry_received": return <MessageSquare className="h-4 w-4 text-blue-500" />;
      case "rating_received": return <Star className="h-4 w-4 text-purple-500" />;
      default: return <Bell className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "bid_placed": return "bg-green-100 text-green-800";
      case "auction_ending": return "bg-yellow-100 text-yellow-800";
      case "payment_reminder": return "bg-orange-100 text-orange-800";
      case "auction_cancelled": return "bg-red-100 text-red-800";
      case "inquiry_received": return "bg-blue-100 text-blue-800";
      case "rating_received": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered": return "bg-green-100 text-green-800";
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "failed": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "email": return <Mail className="h-3 w-3 text-blue-500" />;
      case "push": return <Bell className="h-3 w-3 text-green-500" />;
      case "sms": return <Smartphone className="h-3 w-3 text-purple-500" />;
      default: return <Globe className="h-3 w-3 text-gray-500" />;
    }
  };

  const columns: JsonTableColumns<(typeof notifications)[0]> = [
    { title: "Notification ID", dataIndex: "notificationId", width: 140 },
    { title: "Auction ID", dataIndex: "auctionId", width: 120 },
    { 
      title: "Type", 
      dataIndex: "type",
      width: 150,
      render: (item) => (
        <div className="flex items-center gap-2">
          {getTypeIcon(item.type)}
          <Badge className={getTypeColor(item.type)}>
            {item.type.replace('_', ' ')}
          </Badge>
        </div>
      )
    },
    { title: "Title", dataIndex: "title", width: 200 },
    { title: "Recipient", dataIndex: "recipient", width: 150 },
    { 
      title: "Channels", 
      dataIndex: "channels" as any,
      width: 100,
      render: (item) => (
        <div className="flex gap-1">
          {(item as any).channels.map((channel: string, index: number) => (
            <div key={index} className="flex items-center" title={channel}>
              {getChannelIcon(channel)}
            </div>
          ))}
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
    { title: "Sent At", dataIndex: "sentAt", width: 150 },
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
          {item.status === "failed" && (
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleRetryNotification(item)}
            >
              <Send className="w-4 h-4 mr-1" />
              Retry
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bell className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Auction Notifications</h1>
            <p className="text-gray-600">Manage and monitor all auction-related notifications</p>
          </div>
        </div>
        <Button onClick={handleSendNotification}>
          <Send className="w-4 h-4 mr-2" />
          Send Notification
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notificationStats.map((stat) => (
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
          <TabsTrigger value="all">All ({notifications.length})</TabsTrigger>
          <TabsTrigger value="delivered">Delivered ({notifications.filter(n => n.status === "delivered").length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({notifications.filter(n => n.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="failed">Failed ({notifications.filter(n => n.status === "failed").length})</TabsTrigger>
          <TabsTrigger value="high_priority">High Priority ({notifications.filter(n => n.priority === "high").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          {/* Filters */}
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search notifications..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="bid_placed">Bid Placed</SelectItem>
                  <SelectItem value="auction_ending">Auction Ending</SelectItem>
                  <SelectItem value="payment_reminder">Payment Reminder</SelectItem>
                  <SelectItem value="auction_cancelled">Auction Cancelled</SelectItem>
                  <SelectItem value="inquiry_received">Inquiry Received</SelectItem>
                  <SelectItem value="rating_received">Rating Received</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto">
                <Filter className="h-4 w-4 mr-2" />
                More Filters
              </Button>
            </div>
          </div>

          {/* Notifications Table */}
          <div className="bg-white rounded-lg shadow-sm border">
            <div className="p-4 border-b">
              <h3 className="text-lg font-semibold">Notifications ({filteredNotifications.length})</h3>
            </div>
            <div className="w-full overflow-x-auto">
              <JsonTable columns={columns} data={filteredNotifications} enableSelection={false} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Notification Details Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Details - {selectedNotification?.notificationId}
            </DialogTitle>
            <DialogDescription>
              Complete notification information and delivery status
            </DialogDescription>
          </DialogHeader>
          
          {selectedNotification && (
            <div className="space-y-6">
              {/* Notification Header */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getTypeIcon(selectedNotification.type)}
                    {selectedNotification.title}
                  </CardTitle>
                  <CardDescription>{selectedNotification.message}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Notification ID</Label>
                      <p className="text-sm text-gray-900">{selectedNotification.notificationId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Auction ID</Label>
                      <p className="text-sm text-gray-900">{selectedNotification.auctionId}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Status</Label>
                      <Badge className={getStatusColor(selectedNotification.status)}>
                        {selectedNotification.status}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Priority</Label>
                      <Badge className={getPriorityColor(selectedNotification.priority)}>
                        {selectedNotification.priority}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recipient Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Recipient Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Name</Label>
                      <p className="text-sm text-gray-900">{selectedNotification.recipient}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Email</Label>
                      <p className="text-sm text-gray-900">{selectedNotification.recipientEmail}</p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Type</Label>
                      <Badge className={getTypeColor(selectedNotification.recipientType)}>
                        {selectedNotification.recipientType}
                      </Badge>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Channels</Label>
                      <div className="flex gap-1 mt-1">
                        {selectedNotification.channels.map((channel: string, index: number) => (
                          <div key={index} className="flex items-center gap-1" title={channel}>
                            {getChannelIcon(channel)}
                            <span className="text-xs">{channel}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Delivery Timeline
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Sent At</Label>
                      <p className="text-sm text-gray-900">
                        {selectedNotification.sentAt || "Not sent yet"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Delivered At</Label>
                      <p className="text-sm text-gray-900">
                        {selectedNotification.deliveredAt || "Not delivered"}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Read At</Label>
                      <p className="text-sm text-gray-900">
                        {selectedNotification.readAt || "Not read"}
                      </p>
                    </div>
                    {selectedNotification.failureReason && (
                      <div className="flex justify-between items-center">
                        <Label className="text-sm font-medium text-red-600">Failure Reason</Label>
                        <p className="text-sm text-red-600">{selectedNotification.failureReason}</p>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <Label className="text-sm font-medium">Retry Count</Label>
                      <p className="text-sm text-gray-900">{selectedNotification.retryCount}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Metadata */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Notification Data
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(selectedNotification.metadata).map(([key, value]) => (
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
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)}>
              Close
            </Button>
            {selectedNotification?.status === "failed" && (
              <Button onClick={() => handleRetryNotification(selectedNotification)}>
                <Send className="w-4 h-4 mr-2" />
                Retry Notification
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Notification Modal */}
      <Dialog open={isSendModalOpen} onOpenChange={setIsSendModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5" />
              Send Notification
            </DialogTitle>
            <DialogDescription>
              Send a custom notification to auction participants
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="notification-type">Notification Type *</Label>
              <Select value={sendData.type} onValueChange={(value) => setSendData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select notification type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom Message</SelectItem>
                  <SelectItem value="auction_update">Auction Update</SelectItem>
                  <SelectItem value="payment_reminder">Payment Reminder</SelectItem>
                  <SelectItem value="system_announcement">System Announcement</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="notification-title">Title *</Label>
              <Input
                id="notification-title"
                placeholder="Enter notification title..."
                value={sendData.title}
                onChange={(e) => setSendData(prev => ({ ...prev, title: e.target.value }))}
              />
            </div>

            <div>
              <Label htmlFor="notification-message">Message *</Label>
              <Textarea
                id="notification-message"
                placeholder="Enter notification message..."
                value={sendData.message}
                onChange={(e) => setSendData(prev => ({ ...prev, message: e.target.value }))}
                className="min-h-[100px]"
              />
            </div>

            <div>
              <Label htmlFor="notification-recipients">Recipients *</Label>
              <Input
                id="notification-recipients"
                placeholder="Enter email addresses (comma separated)..."
                value={sendData.recipients}
                onChange={(e) => setSendData(prev => ({ ...prev, recipients: e.target.value }))}
              />
            </div>

            <div>
              <Label>Channels</Label>
              <div className="mt-2 space-y-2">
                {["email", "push", "sms"].map((channel) => (
                  <div key={channel} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id={channel}
                      checked={sendData.channels.includes(channel)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSendData(prev => ({ ...prev, channels: [...prev.channels, channel] }));
                        } else {
                          setSendData(prev => ({ ...prev, channels: prev.channels.filter(c => c !== channel) }));
                        }
                      }}
                    />
                    <Label htmlFor={channel} className="text-sm flex items-center gap-1">
                      {getChannelIcon(channel)}
                      {channel.toUpperCase()}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <Label htmlFor="notification-priority">Priority</Label>
              <Select value={sendData.priority} onValueChange={(value) => setSendData(prev => ({ ...prev, priority: value }))}>
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
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSendModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProcessSend} disabled={!sendData.type || !sendData.title || !sendData.message || !sendData.recipients}>
              <Send className="w-4 h-4 mr-2" />
              Send Notification
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
