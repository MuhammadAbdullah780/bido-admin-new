'use client';
import { useState } from "react";
import { MetricCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Gavel, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  TrendingUp, 
  Users, 
  DollarSign,
  Star,
  Bell,
  FileText,
  Eye,
  Filter,
  Search,
  Plus,
  MoreHorizontal
} from "lucide-react";

type Props = {};

const auctionStats = [
  { title: "Total Auctions", value: "1,247", change: "+12%", trend: "up" },
  { title: "Active Auctions", value: "89", change: "+5%", trend: "up" },
  { title: "Pending Approval", value: "23", change: "-8%", trend: "down" },
  { title: "Completed Today", value: "15", change: "+25%", trend: "up" },
  { title: "Total Revenue", value: "$2.4M", change: "+18%", trend: "up" },
  { title: "Avg. Completion Time", value: "3.2 days", change: "-12%", trend: "down" },
];

const recentAuctions = [
  {
    id: "AUCT-2024-001",
    title: "Vintage Rolex Submariner",
    seller: "John Smith",
    currentBid: 15000,
    status: "active",
    timeLeft: "2h 15m",
    bids: 23,
    category: "Luxury Watches",
    priority: "high"
  },
  {
    id: "AUCT-2024-002", 
    title: "Antique Persian Rug",
    seller: "Sarah Wilson",
    currentBid: 8500,
    status: "pending_approval",
    timeLeft: "Pending",
    bids: 0,
    category: "Antiques",
    priority: "medium"
  },
  {
    id: "AUCT-2024-003",
    title: "Modern Art Painting",
    seller: "Emily Davis",
    currentBid: 25000,
    status: "completed",
    timeLeft: "Completed",
    bids: 45,
    category: "Art",
    priority: "high"
  },
  {
    id: "AUCT-2024-004",
    title: "Rare Coin Collection",
    seller: "Mike Johnson",
    currentBid: 12000,
    status: "cancelled",
    timeLeft: "Cancelled",
    bids: 12,
    category: "Collectibles",
    priority: "low"
  }
];

const urgentActions = [
  {
    id: 1,
    type: "approval_needed",
    title: "Auction Request Pending",
    description: "3 auctions waiting for approval",
    count: 3,
    priority: "high",
    action: "Review Requests"
  },
  {
    id: 2,
    type: "payment_issue",
    title: "Payment Failures",
    description: "2 buyers failed to complete payment",
    count: 2,
    priority: "high",
    action: "Handle Issues"
  },
  {
    id: 3,
    type: "overdue_award",
    title: "Overdue Awards",
    description: "5 auctions not awarded within timeframe",
    count: 5,
    priority: "medium",
    action: "Review Awards"
  },
  {
    id: 4,
    type: "inquiry",
    title: "Pending Inquiries",
    description: "8 auction questions need responses",
    count: 8,
    priority: "medium",
    action: "Respond"
  }
];

const page = (props: Props) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "pending_approval": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-blue-100 text-blue-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active": return <Clock className="h-4 w-4 text-green-500" />;
      case "pending_approval": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case "completed": return <CheckCircle className="h-4 w-4 text-blue-500" />;
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

  const getActionTypeIcon = (type: string) => {
    switch (type) {
      case "approval_needed": return <CheckCircle className="h-5 w-5 text-yellow-500" />;
      case "payment_issue": return <DollarSign className="h-5 w-5 text-red-500" />;
      case "overdue_award": return <Clock className="h-5 w-5 text-orange-500" />;
      case "inquiry": return <Bell className="h-5 w-5 text-blue-500" />;
      default: return <AlertTriangle className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex items-center gap-3">
        <Gavel className="w-8 h-8 text-blue-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Auction Management</h1>
          <p className="text-gray-600">Comprehensive auction oversight and management</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {auctionStats.map((stat) => (
          <MetricCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            trend={stat.trend as "up" | "down"}
          />
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="urgent">Urgent Actions</TabsTrigger>
          <TabsTrigger value="recent">Recent Auctions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Quick Actions
                </CardTitle>
                <CardDescription>Common auction management tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start" variant="outline">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Review Pending Requests
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Bell className="w-4 h-4 mr-2" />
                  Respond to Inquiries
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Reports
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filters
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  System Status
                </CardTitle>
                <CardDescription>Current platform health metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Auto-Approval Rate</span>
                  <Badge className="bg-green-100 text-green-800">94.2%</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Avg Response Time</span>
                  <Badge className="bg-blue-100 text-blue-800">2.3 hours</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Fraud Detection</span>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Payment Processing</span>
                  <Badge className="bg-green-100 text-green-800">Normal</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Urgent Actions Tab */}
        <TabsContent value="urgent" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {urgentActions.map((action) => (
              <Card key={action.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getActionTypeIcon(action.type)}
                      <span>{action.title}</span>
                    </div>
                    <Badge className={getPriorityColor(action.priority)}>
                      {action.count}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{action.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full">
                    {action.action}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Recent Auctions Tab */}
        <TabsContent value="recent" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">Recent Auctions</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Search className="w-4 h-4 mr-2" />
                Search
              </Button>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
          
          <div className="space-y-4">
            {recentAuctions.map((auction) => (
              <Card key={auction.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-lg">{auction.title}</h4>
                        <Badge className={getStatusColor(auction.status)}>
                          <div className="flex items-center gap-1">
                            {getStatusIcon(auction.status)}
                            {auction.status.replace('_', ' ')}
                          </div>
                        </Badge>
                        <Badge className={getPriorityColor(auction.priority)}>
                          {auction.priority}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Auction ID:</span> {auction.id}
                        </div>
                        <div>
                          <span className="font-medium">Seller:</span> {auction.seller}
                        </div>
                        <div>
                          <span className="font-medium">Current Bid:</span> ${auction.currentBid.toLocaleString()}
                        </div>
                        <div>
                          <span className="font-medium">Bids:</span> {auction.bids}
                        </div>
                        <div>
                          <span className="font-medium">Category:</span> {auction.category}
                        </div>
                        <div>
                          <span className="font-medium">Time Left:</span> {auction.timeLeft}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Auction Performance</CardTitle>
                <CardDescription>Key metrics over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-2xl font-bold text-green-600">94.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Avg. Bids per Auction</span>
                    <span className="text-2xl font-bold text-blue-600">23.4</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Revenue Growth</span>
                    <span className="text-2xl font-bold text-purple-600">+18.5%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
                <CardDescription>Auctions by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Luxury Items</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                      </div>
                      <span className="text-sm font-medium">65%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Art & Antiques</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{width: '25%'}}></div>
                      </div>
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Collectibles</span>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-yellow-600 h-2 rounded-full" style={{width: '10%'}}></div>
                      </div>
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
