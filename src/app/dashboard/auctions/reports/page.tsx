'use client';
import { useState } from "react";
import { MetricCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { 
  BarChart3, 
  Download, 
  Filter, 
  Calendar,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Gavel,
  FileText,
  PieChart,
  Activity
} from "lucide-react";

type Props = {};

const reportStats = [
  { title: "Total Revenue", value: "$2.4M", change: "+18.5%", trend: "up" },
  { title: "Active Auctions", value: "89", change: "+12", trend: "up" },
  { title: "Success Rate", value: "94.2%", change: "+2.1%", trend: "up" },
  { title: "Avg. Completion Time", value: "3.2 days", change: "-12%", trend: "down" },
];

// Sample report data
const auctionPerformance = [
  { category: "Luxury Watches", totalAuctions: 245, completed: 231, revenue: 1250000, avgBid: 8500, successRate: 94.3 },
  { category: "Art & Antiques", totalAuctions: 189, completed: 178, revenue: 890000, avgBid: 6200, successRate: 94.2 },
  { category: "Collectibles", totalAuctions: 156, completed: 142, revenue: 456000, avgBid: 3200, successRate: 91.0 },
  { category: "Electronics", totalAuctions: 98, completed: 89, revenue: 234000, avgBid: 2800, successRate: 90.8 },
  { category: "Jewelry", totalAuctions: 134, completed: 128, revenue: 567000, avgBid: 4200, successRate: 95.5 },
];

const monthlyRevenue = [
  { month: "Jan 2024", revenue: 180000, auctions: 45, avgBid: 4000 },
  { month: "Feb 2024", revenue: 220000, auctions: 52, avgBid: 4230 },
  { month: "Mar 2024", revenue: 195000, auctions: 48, avgBid: 4062 },
  { month: "Apr 2024", revenue: 250000, auctions: 58, avgBid: 4310 },
  { month: "May 2024", revenue: 280000, auctions: 62, avgBid: 4516 },
  { month: "Jun 2024", revenue: 320000, auctions: 68, avgBid: 4705 },
];

const topSellers = [
  { name: "John Smith", auctions: 45, revenue: 125000, rating: 4.8, successRate: 95.6 },
  { name: "Sarah Wilson", auctions: 38, revenue: 98000, rating: 4.7, successRate: 94.7 },
  { name: "Mike Johnson", auctions: 32, revenue: 87000, rating: 4.6, successRate: 93.8 },
  { name: "Emily Davis", auctions: 28, revenue: 76000, rating: 4.9, successRate: 96.4 },
  { name: "David Brown", auctions: 25, revenue: 65000, rating: 4.5, successRate: 92.0 },
];

const page = (props: Props) => {
  const [dateRange, setDateRange] = useState("30d");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 95) return "text-green-600";
    if (rate >= 90) return "text-yellow-600";
    return "text-red-600";
  };

  const getRevenueBarWidth = (revenue: number, maxRevenue: number) => {
    return `${(revenue / maxRevenue) * 100}%`;
  };

  const maxRevenue = Math.max(...auctionPerformance.map(item => item.revenue));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Auction Reports</h1>
            <p className="text-gray-600">Comprehensive analytics and reporting for auction management</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {reportStats.map((stat) => (
          <MetricCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="date-range">Date Range</Label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue placeholder="Select date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
                <SelectItem value="custom">Custom range</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="category">Category</Label>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="luxury_watches">Luxury Watches</SelectItem>
                <SelectItem value="art_antiques">Art & Antiques</SelectItem>
                <SelectItem value="collectibles">Collectibles</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="jewelry">Jewelry</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end">
            <Button variant="outline" className="w-full">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>

          <div className="flex items-end">
            <Button className="w-full">
              <Calendar className="h-4 w-4 mr-2" />
              Generate Report
            </Button>
          </div>
        </div>
      </div>

      {/* Report Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="revenue">Revenue</TabsTrigger>
          <TabsTrigger value="sellers">Top Sellers</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Key Metrics
                </CardTitle>
                <CardDescription>Essential auction performance indicators</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Total Auctions</span>
                  <span className="text-2xl font-bold text-blue-600">822</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Completed Auctions</span>
                  <span className="text-2xl font-bold text-green-600">768</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Success Rate</span>
                  <span className="text-2xl font-bold text-purple-600">93.4%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg. Bids per Auction</span>
                  <span className="text-2xl font-bold text-orange-600">18.4</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Avg. Completion Time</span>
                  <span className="text-2xl font-bold text-yellow-600">3.2 days</span>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Breakdown */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Revenue Breakdown
                </CardTitle>
                <CardDescription>Revenue distribution by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {auctionPerformance.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.category}</span>
                        <span className="text-sm font-bold">{formatCurrency(item.revenue)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: getRevenueBarWidth(item.revenue, maxRevenue) }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Auction Performance by Category
              </CardTitle>
              <CardDescription>Detailed performance metrics for each category</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Category</th>
                      <th className="text-right p-3 font-medium">Total Auctions</th>
                      <th className="text-right p-3 font-medium">Completed</th>
                      <th className="text-right p-3 font-medium">Revenue</th>
                      <th className="text-right p-3 font-medium">Avg. Bid</th>
                      <th className="text-right p-3 font-medium">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auctionPerformance.map((item, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{item.category}</td>
                        <td className="p-3 text-right">{item.totalAuctions}</td>
                        <td className="p-3 text-right text-green-600 font-medium">{item.completed}</td>
                        <td className="p-3 text-right font-medium">{formatCurrency(item.revenue)}</td>
                        <td className="p-3 text-right">{formatCurrency(item.avgBid)}</td>
                        <td className="p-3 text-right">
                          <span className={`font-medium ${getSuccessRateColor(item.successRate)}`}>
                            {item.successRate}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Revenue Tab */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Revenue Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Monthly Revenue Trend
                </CardTitle>
                <CardDescription>Revenue progression over the last 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyRevenue.map((item, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{item.month}</span>
                        <span className="text-sm font-bold">{formatCurrency(item.revenue)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-green-600 h-3 rounded-full" 
                          style={{ width: `${(item.revenue / Math.max(...monthlyRevenue.map(m => m.revenue))) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{item.auctions} auctions</span>
                        <span>Avg: {formatCurrency(item.avgBid)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="w-5 h-5" />
                  Revenue Summary
                </CardTitle>
                <CardDescription>Revenue distribution and growth metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600">
                      {formatCurrency(monthlyRevenue.reduce((sum, item) => sum + item.revenue, 0))}
                    </div>
                    <div className="text-sm text-blue-800">Total Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600">+18.5%</div>
                    <div className="text-sm text-green-800">Growth Rate</div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Highest Month</span>
                    <span className="text-sm font-bold text-green-600">June 2024</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Average Monthly</span>
                    <span className="text-sm font-bold">{formatCurrency(240833)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Revenue per Auction</span>
                    <span className="text-sm font-bold">{formatCurrency(2920)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Top Sellers Tab */}
        <TabsContent value="sellers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Top Performing Sellers
              </CardTitle>
              <CardDescription>Best performing sellers by revenue and success rate</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topSellers.map((seller, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-blue-600">#{index + 1}</span>
                      </div>
                      <div>
                        <div className="font-medium">{seller.name}</div>
                        <div className="text-sm text-gray-500">{seller.auctions} auctions</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="font-medium">{formatCurrency(seller.revenue)}</div>
                        <div className="text-sm text-gray-500">Revenue</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium text-green-600">{seller.successRate}%</div>
                        <div className="text-sm text-gray-500">Success Rate</div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{seller.rating}</span>
                        </div>
                        <div className="text-sm text-gray-500">Rating</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Growth Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Growth Trends
                </CardTitle>
                <CardDescription>Key growth indicators over time</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Auction Volume Growth</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">+12.5%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Revenue Growth</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">+18.5%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">User Engagement</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">+8.3%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Success Rate</span>
                    <div className="flex items-center gap-1 text-green-600">
                      <TrendingUp className="h-4 w-4" />
                      <span className="font-medium">+2.1%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Performance Insights
                </CardTitle>
                <CardDescription>Key insights and recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-green-800">High Performance</div>
                      <div className="text-sm text-green-700">Luxury watches category shows 94.3% success rate</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-yellow-800">Attention Needed</div>
                      <div className="text-sm text-yellow-700">Electronics category success rate below 91%</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <div className="font-medium text-blue-800">Growth Opportunity</div>
                      <div className="text-sm text-blue-700">Jewelry category shows highest avg bid value</div>
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
