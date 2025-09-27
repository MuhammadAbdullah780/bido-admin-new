"use client";

import { useState } from "react";
import AdminCard from "@/components/admin-card";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  Activity, 
  MessageSquare,
  Calendar,
  Download,
  RefreshCw
} from "lucide-react";

// Mock data for analytics
const analyticsData = {
  overview: {
    totalUsers: 5139,
    activeUsers: 3247,
    totalAuctions: 2156,
    completedAuctions: 1892,
    totalRevenue: 2456780,
    platformCommission: 122839,
    userGrowth: 12.5,
    revenueGrowth: 18.3,
    auctionGrowth: 8.7,
    commissionGrowth: 15.2
  },
  userMetrics: [
    { period: "Jan 2024", users: 4200, growth: 5.2 },
    { period: "Feb 2024", users: 4350, growth: 3.6 },
    { period: "Mar 2024", users: 4520, growth: 3.9 },
    { period: "Apr 2024", users: 4680, growth: 3.5 },
    { period: "May 2024", users: 4850, growth: 3.6 },
    { period: "Jun 2024", users: 5139, growth: 6.0 }
  ],
  revenueMetrics: [
    { period: "Jan 2024", revenue: 1800000, commission: 90000 },
    { period: "Feb 2024", revenue: 1950000, commission: 97500 },
    { period: "Mar 2024", revenue: 2100000, commission: 105000 },
    { period: "Apr 2024", revenue: 2250000, commission: 112500 },
    { period: "May 2024", revenue: 2350000, commission: 117500 },
    { period: "Jun 2024", revenue: 2456780, commission: 122839 }
  ],
  topUsers: [
    { id: 1, name: "John Smith", email: "john.smith@example.com", auctions: 45, revenue: 125000, commission: 6250 },
    { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com", auctions: 38, revenue: 98000, commission: 4900 },
    { id: 3, name: "Mike Wilson", email: "mike.wilson@example.com", auctions: 42, revenue: 87000, commission: 4350 },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com", auctions: 35, revenue: 76000, commission: 3800 },
    { id: 5, name: "David Brown", email: "david.brown@example.com", auctions: 31, revenue: 68000, commission: 3400 }
  ],
  auctionMetrics: [
    { category: "Electronics", count: 456, revenue: 890000, avgPrice: 1952 },
    { category: "Art & Collectibles", count: 234, revenue: 1200000, avgPrice: 5128 },
    { category: "Jewelry", count: 189, revenue: 680000, avgPrice: 3598 },
    { category: "Fashion", count: 312, revenue: 340000, avgPrice: 1090 },
    { category: "Home & Garden", count: 278, revenue: 420000, avgPrice: 1511 },
    { category: "Sports", count: 156, revenue: 180000, avgPrice: 1154 }
  ]
};

const timeRanges = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "1y", label: "Last Year" },
  { value: "all", label: "All Time" }
];

export default function PlatformAnalyticsPage() {
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleExport = () => {
    console.log("Exporting analytics data...");
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const topUsersColumns: JsonTableColumns<(typeof analyticsData.topUsers)[0]> = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Auctions",
      dataIndex: "auctions",
      render: (item) => (
        <Badge variant="outline">{item.auctions}</Badge>
      )
    },
    { 
      title: "Revenue", 
      dataIndex: "revenue",
      render: (item) => (
        <span className="font-semibold text-green-600">{formatCurrency(item.revenue)}</span>
      )
    },
    { 
      title: "Commission", 
      dataIndex: "commission",
      render: (item) => (
        <span className="font-semibold text-blue-600">{formatCurrency(item.commission)}</span>
      )
    }
  ];

  const auctionMetricsColumns: JsonTableColumns<(typeof analyticsData.auctionMetrics)[0]> = [
    { title: "Category", dataIndex: "category" },
    { 
      title: "Count", 
      dataIndex: "count",
      render: (item) => (
        <Badge variant="secondary">{item.count}</Badge>
      )
    },
    { 
      title: "Revenue", 
      dataIndex: "revenue",
      render: (item) => (
        <span className="font-semibold">{formatCurrency(item.revenue)}</span>
      )
    },
    { 
      title: "Avg Price", 
      dataIndex: "avgPrice",
      render: (item) => (
        <span className="text-gray-600">{formatCurrency(item.avgPrice)}</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Analytics</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights into platform performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Time Range Selector */}
      <AdminCard>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Time Range:</span>
            <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeRanges.map(range => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </AdminCard>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Users</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(analyticsData.overview.totalUsers)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +{analyticsData.overview.userGrowth}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(analyticsData.overview.activeUsers)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +8.2%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <Activity className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Revenue</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(analyticsData.overview.totalRevenue)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +{analyticsData.overview.revenueGrowth}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-emerald-50">
              <DollarSign className="h-6 w-6 text-emerald-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Platform Commission</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(analyticsData.overview.platformCommission)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +{analyticsData.overview.commissionGrowth}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <AdminCard title="User Growth Over Time">
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">User growth chart would be displayed here</p>
                <p className="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>• Peak growth in June: +6.0%</p>
              <p>• Average monthly growth: +4.3%</p>
              <p>• Total growth this year: +22.4%</p>
            </div>
          </div>
        </AdminCard>

        {/* Revenue Chart */}
        <AdminCard title="Revenue Trends">
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue chart would be displayed here</p>
                <p className="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>• Monthly revenue growth: +{analyticsData.overview.revenueGrowth}%</p>
              <p>• Commission rate: 5.0%</p>
              <p>• Projected monthly revenue: $2.6M</p>
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Top Users Table */}
      <AdminCard title="Top Performing Users">
        <div className="w-full overflow-x-auto">
          <JsonTable columns={topUsersColumns} data={analyticsData.topUsers} />
        </div>
      </AdminCard>

      {/* Auction Categories Analysis */}
      <AdminCard title="Auction Categories Performance">
        <div className="w-full overflow-x-auto">
          <JsonTable columns={auctionMetricsColumns} data={analyticsData.auctionMetrics} />
        </div>
      </AdminCard>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard title="Auction Statistics">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Auctions</span>
              <span className="text-lg font-semibold">{formatNumber(analyticsData.overview.totalAuctions)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completed Auctions</span>
              <span className="text-lg font-semibold text-green-600">{formatNumber(analyticsData.overview.completedAuctions)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="text-lg font-semibold">
                {((analyticsData.overview.completedAuctions / analyticsData.overview.totalAuctions) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <span className="text-lg font-semibold text-green-600">+{analyticsData.overview.auctionGrowth}%</span>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="User Engagement">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="text-lg font-semibold">{formatNumber(analyticsData.overview.activeUsers)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">User Activity Rate</span>
              <span className="text-lg font-semibold">
                {((analyticsData.overview.activeUsers / analyticsData.overview.totalUsers) * 100).toFixed(1)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Auctions per User</span>
              <span className="text-lg font-semibold">
                {(analyticsData.overview.totalAuctions / analyticsData.overview.totalUsers).toFixed(1)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg. Revenue per User</span>
              <span className="text-lg font-semibold">
                {formatCurrency(analyticsData.overview.totalRevenue / analyticsData.overview.totalUsers)}
              </span>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Financial Summary">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="text-lg font-semibold">{formatCurrency(analyticsData.overview.totalRevenue)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Platform Commission</span>
              <span className="text-lg font-semibold text-blue-600">{formatCurrency(analyticsData.overview.platformCommission)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Commission Rate</span>
              <span className="text-lg font-semibold">
                {((analyticsData.overview.platformCommission / analyticsData.overview.totalRevenue) * 100).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Revenue Growth</span>
              <span className="text-lg font-semibold text-green-600">+{analyticsData.overview.revenueGrowth}%</span>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
