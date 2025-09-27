"use client";

import { useState } from "react";
import AdminCard from "@/components/admin-card";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Filter, 
  MessageSquare, 
  Mail, 
  AlertTriangle, 
  CheckCircle, 
  Clock,
  Reply,
  Archive,
  Trash2,
  Eye,
  Star,
  StarOff
} from "lucide-react";

// Mock data for user messages
const userMessages = [
  {
    id: 1,
    sender: "john.doe@example.com",
    subject: "Account Verification Issue",
    preview: "I'm having trouble verifying my account. The verification email never arrived...",
    category: "support",
    priority: "high",
    status: "unread",
    receivedDate: "2024-06-10 14:30:00",
    lastActivity: "2024-06-10 14:30:00",
    attachments: 0,
    isStarred: false
  },
  {
    id: 2,
    sender: "sarah.wilson@example.com",
    subject: "Payment Not Received",
    preview: "I made a payment 3 days ago but it hasn't been processed yet. Can you help?",
    category: "payment",
    priority: "high",
    status: "read",
    receivedDate: "2024-06-10 12:15:00",
    lastActivity: "2024-06-10 13:45:00",
    attachments: 2,
    isStarred: true
  },
  {
    id: 3,
    sender: "mike.brown@example.com",
    subject: "Auction Dispute",
    preview: "I won an auction but the seller is not responding to my messages...",
    category: "complaint",
    priority: "medium",
    status: "in_progress",
    receivedDate: "2024-06-10 10:20:00",
    lastActivity: "2024-06-10 11:30:00",
    attachments: 1,
    isStarred: false
  },
  {
    id: 4,
    sender: "emily.davis@example.com",
    subject: "Feature Request",
    preview: "It would be great if you could add a dark mode to the platform...",
    category: "general",
    priority: "low",
    status: "resolved",
    receivedDate: "2024-06-09 16:45:00",
    lastActivity: "2024-06-10 09:15:00",
    attachments: 0,
    isStarred: false
  },
  {
    id: 5,
    sender: "david.smith@example.com",
    subject: "Account Suspension Appeal",
    preview: "My account was suspended but I believe it was a mistake. Please review...",
    category: "appeal",
    priority: "high",
    status: "unread",
    receivedDate: "2024-06-09 14:30:00",
    lastActivity: "2024-06-09 14:30:00",
    attachments: 3,
    isStarred: true
  },
  {
    id: 6,
    sender: "lisa.johnson@example.com",
    subject: "Password Reset Help",
    preview: "I forgot my password and the reset link is not working...",
    category: "support",
    priority: "medium",
    status: "read",
    receivedDate: "2024-06-09 11:20:00",
    lastActivity: "2024-06-09 15:10:00",
    attachments: 0,
    isStarred: false
  }
];

const categories = [
  { id: "all", label: "All Messages", count: userMessages.length },
  { id: "unread", label: "Unread", count: userMessages.filter(m => m.status === "unread").length },
  { id: "support", label: "Support", count: userMessages.filter(m => m.category === "support").length },
  { id: "complaint", label: "Complaints", count: userMessages.filter(m => m.category === "complaint").length },
  { id: "general", label: "General", count: userMessages.filter(m => m.category === "general").length }
];

const priorities = ["all", "high", "medium", "low"];
const statuses = ["all", "unread", "read", "in_progress", "resolved"];

export default function UserMessagesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [replyText, setReplyText] = useState("");

  // Filter messages based on search and filters
  const filteredMessages = userMessages.filter(message => {
    const matchesSearch = message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.preview.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.sender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || message.category === selectedCategory;
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter;
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesPriority && matchesStatus;
  });

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
    setIsMessageModalOpen(true);
  };

  const handleReply = () => {
    console.log("Reply to message:", selectedMessage.id, replyText);
    setReplyText("");
  };

  const handleMarkAsRead = (messageId: number) => {
    console.log("Mark as read:", messageId);
  };

  const handleArchive = (messageId: number) => {
    console.log("Archive message:", messageId);
  };

  const handleDelete = (messageId: number) => {
    console.log("Delete message:", messageId);
  };

  const handleStar = (messageId: number) => {
    console.log("Toggle star:", messageId);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "unread":
        return "bg-blue-100 text-blue-800";
      case "read":
        return "bg-gray-100 text-gray-800";
      case "in_progress":
        return "bg-yellow-100 text-yellow-800";
      case "resolved":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "support":
        return <MessageSquare className="h-4 w-4" />;
      case "payment":
        return <Mail className="h-4 w-4" />;
      case "complaint":
        return <AlertTriangle className="h-4 w-4" />;
      case "appeal":
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const columns: JsonTableColumns<(typeof userMessages)[0]> = [
    {
      title: "",
      dataIndex: "isStarred",
      render: (item) => (
        <button onClick={() => handleStar(item.id)}>
          {item.isStarred ? (
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
          ) : (
            <StarOff className="h-4 w-4 text-gray-400" />
          )}
        </button>
      )
    },
    { 
      title: "Sender", 
      dataIndex: "sender",
      render: (item) => (
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {item.sender.split('@')[0].charAt(0).toUpperCase()}
            </span>
          </div>
          <span className="text-sm font-medium">{item.sender}</span>
        </div>
      )
    },
    { 
      title: "Subject", 
      dataIndex: "subject",
      render: (item) => (
        <div className="space-y-1">
          <p className={`font-medium ${item.status === "unread" ? "font-bold" : ""}`}>
            {item.subject}
          </p>
          <p className="text-sm text-gray-500 truncate max-w-xs">
            {item.preview}
          </p>
        </div>
      )
    },
    { 
      title: "Category", 
      dataIndex: "category",
      render: (item) => (
        <div className="flex items-center space-x-1">
          {getCategoryIcon(item.category)}
          <Badge variant="outline" className="capitalize">
            {item.category}
          </Badge>
        </div>
      )
    },
    { 
      title: "Priority", 
      dataIndex: "priority",
      render: (item) => (
        <Badge className={getPriorityColor(item.priority)}>
          {item.priority}
        </Badge>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      render: (item) => (
        <Badge className={getStatusColor(item.status)}>
          {item.status}
        </Badge>
      )
    },
    { title: "Received", dataIndex: "receivedDate" },
    {
      title: "Actions",
      dataIndex: "id",
      render: (item) => (
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewMessage(item)}
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleMarkAsRead(item.id)}
          >
            <CheckCircle className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleArchive(item.id)}
          >
            <Archive className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDelete(item.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Messages</h1>
          <p className="text-gray-600 mt-1">Manage user communications and support requests</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Archive className="h-4 w-4 mr-2" />
            Archive Selected
          </Button>
          <Button variant="outline">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Selected
          </Button>
        </div>
      </div>

      {/* Message Categories */}
      <AdminCard>
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList className="grid w-full grid-cols-5">
            {categories.map(category => (
              <TabsTrigger key={category.id} value={category.id} className="flex items-center space-x-2">
                <span>{category.label}</span>
                <Badge variant="secondary">{category.count}</Badge>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </AdminCard>

      {/* Filters */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              {priorities.map(priority => (
                <SelectItem key={priority} value={priority}>
                  {priority === "all" ? "All Priorities" : priority.charAt(0).toUpperCase() + priority.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </AdminCard>

      {/* Messages Table */}
      <AdminCard title={`Messages (${filteredMessages.length})`}>
        <div className="w-full overflow-x-auto">
          <JsonTable columns={columns} data={filteredMessages} />
        </div>
      </AdminCard>

      {/* Message Detail Modal */}
      <Dialog open={isMessageModalOpen} onOpenChange={setIsMessageModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Message Details</DialogTitle>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-6">
              {/* Message Header */}
              <div className="border-b pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-gray-600">
                        {selectedMessage.sender.split('@')[0].charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{selectedMessage.sender}</h3>
                      <p className="text-sm text-gray-500">{selectedMessage.receivedDate}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Badge className={getPriorityColor(selectedMessage.priority)}>
                      {selectedMessage.priority}
                    </Badge>
                    <Badge className={getStatusColor(selectedMessage.status)}>
                      {selectedMessage.status}
                    </Badge>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-gray-900">{selectedMessage.subject}</h2>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Message Content</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap">
                      {selectedMessage.preview}
                      {"\n\n"}
                      This is a longer version of the message content that would be displayed here.
                      The user has provided detailed information about their issue and is seeking assistance.
                    </p>
                  </div>
                </div>

                {selectedMessage.attachments > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Attachments ({selectedMessage.attachments})</h4>
                    <div className="space-y-2">
                      {Array.from({ length: selectedMessage.attachments }).map((_, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 border rounded-lg">
                          <Mail className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">attachment_{index + 1}.pdf</span>
                          <Button variant="ghost" size="sm">Download</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Reply Section */}
              <div className="border-t pt-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Reply to Message</h4>
                <Textarea
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="min-h-32"
                />
                <div className="flex justify-end space-x-2 mt-3">
                  <Button variant="outline" onClick={() => setReplyText("")}>
                    Clear
                  </Button>
                  <Button onClick={handleReply}>
                    <Reply className="h-4 w-4 mr-2" />
                    Send Reply
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
