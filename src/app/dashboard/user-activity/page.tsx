"use client";

import { useState } from "react";
import AdminCard from "@/components/admin-card";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  Users, 
  Activity, 
  Clock,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin,
  BarChart3,
  RefreshCw
} from "lucide-react";

// Mock data for user activity
const userActivityData = {
  overview: {
    activeUsers: 3247,
    newRegistrations: 156,
    loginRate: 78.5,
    avgSessionDuration: 24.5, // minutes
    pageViews: 45678,
    bounceRate: 32.1,
    userGrowth: 12.5,
    activityGrowth: 8.3
  },
  activityTimeline: [
    {
      id: 1,
      user: "john.doe@example.com",
      action: "Logged In",
      timestamp: "2024-06-10 14:30:00",
      ipAddress: "192.168.1.100",
      location: "New York, NY",
      device: "Desktop",
      browser: "Chrome",
      sessionDuration: 45
    },
    {
      id: 2,
      user: "sarah.johnson@example.com",
      action: "Created Auction",
      timestamp: "2024-06-10 14:25:00",
      ipAddress: "203.45.67.89",
      location: "Los Angeles, CA",
      device: "Mobile",
      browser: "Safari",
      sessionDuration: 32
    },
    {
      id: 3,
      user: "mike.wilson@example.com",
      action: "Placed Bid",
      timestamp: "2024-06-10 14:20:00",
      ipAddress: "198.51.100.42",
      location: "Chicago, IL",
      device: "Desktop",
      browser: "Firefox",
      sessionDuration: 28
    },
    {
      id: 4,
      user: "emily.davis@example.com",
      action: "Updated Profile",
      timestamp: "2024-06-10 14:15:00",
      ipAddress: "172.16.0.50",
      location: "Miami, FL",
      device: "Tablet",
      browser: "Chrome",
      sessionDuration: 15
    },
    {
      id: 5,
      user: "david.brown@example.com",
      action: "Completed Payment",
      timestamp: "2024-06-10 14:10:00",
      ipAddress: "10.0.0.25",
      location: "Seattle, WA",
      device: "Mobile",
      browser: "Chrome",
      sessionDuration: 38
    }
  ],
  topUsers: [
    { id: 1, name: "John Smith", email: "john.smith@example.com", activityScore: 95, logins: 45, auctions: 12, bids: 28, lastActive: "2024-06-10 14:30:00" },
    { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com", activityScore: 88, logins: 38, auctions: 8, bids: 22, lastActive: "2024-06-10 14:25:00" },
    { id: 3, name: "Mike Wilson", email: "mike.wilson@example.com", activityScore: 82, logins: 42, auctions: 15, bids: 35, lastActive: "2024-06-10 14:20:00" },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com", activityScore: 76, logins: 35, auctions: 6, bids: 18, lastActive: "2024-06-10 14:15:00" },
    { id: 5, name: "David Brown", email: "david.brown@example.com", activityScore: 71, logins: 31, auctions: 9, bids: 24, lastActive: "2024-06-10 14:10:00" }
  ],
  loginPatterns: [
    { hour: "00:00", logins: 12 },
    { hour: "01:00", logins: 8 },
    { hour: "02:00", logins: 5 },
    { hour: "03:00", logins: 3 },
    { hour: "04:00", logins: 4 },
    { hour: "05:00", logins: 7 },
    { hour: "06:00", logins: 15 },
    { hour: "07:00", logins: 28 },
    { hour: "08:00", logins: 45 },
    { hour: "09:00", logins: 62 },
    { hour: "10:00", logins: 78 },
    { hour: "11:00", logins: 85 },
    { hour: "12:00", logins: 92 },
    { hour: "13:00", logins: 88 },
    { hour: "14:00", logins: 95 },
    { hour: "15:00", logins: 89 },
    { hour: "16:00", logins: 76 },
    { hour: "17:00", logins: 68 },
    { hour: "18:00", logins: 54 },
    { hour: "19:00", logins: 42 },
    { hour: "20:00", logins: 38 },
    { hour: "21:00", logins: 35 },
    { hour: "22:00", logins: 28 },
    { hour: "23:00", logins: 18 }
  ],
  geographicDistribution: [
    { country: "United States", users: 2156, percentage: 66.4 },
    { country: "Canada", users: 456, percentage: 14.0 },
    { country: "United Kingdom", users: 234, percentage: 7.2 },
    { country: "Australia", users: 189, percentage: 5.8 },
    { country: "Germany", users: 156, percentage: 4.8 },
    { country: "Others", users: 56, percentage: 1.8 }
  ]
};

const timeRanges = [
  { value: "1h", label: "Last Hour" },
  { value: "24h", label: "Last 24 Hours" },
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" }
];

const actions = ["all", "Logged In", "Created Auction", "Placed Bid", "Updated Profile", "Completed Payment", "Viewed Item", "Searched"];

export default function UserActivityPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("24h");
  const [actionFilter, setActionFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleExport = () => {
    console.log("Exporting user activity data...");
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  const getActivityScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getActivityScoreBadge = (score: number) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-blue-100 text-blue-800";
    if (score >= 70) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const topUsersColumns: JsonTableColumns<(typeof userActivityData.topUsers)[0]> = [
    { title: "User", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { 
      title: "Activity Score", 
      dataIndex: "activityScore",
      render: (item) => (
        <div className="flex items-center space-x-2">
          <span className={`font-semibold ${getActivityScoreColor(item.activityScore)}`}>{item.activityScore}</span>
          <Badge className={getActivityScoreBadge(item.activityScore)}>
            {item.activityScore >= 90 ? "Excellent" : item.activityScore >= 80 ? "Good" : item.activityScore >= 70 ? "Fair" : "Poor"}
          </Badge>
        </div>
      )
    },
    { 
      title: "Logins", 
      dataIndex: "logins",
      render: (item) => (
        <Badge variant="outline">{item.logins}</Badge>
      )
    },
    { 
      title: "Auctions", 
      dataIndex: "auctions",
      render: (item) => (
        <Badge variant="secondary">{item.auctions}</Badge>
      )
    },
    { 
      title: "Bids", 
      dataIndex: "bids",
      render: (item) => (
        <Badge variant="outline">{item.bids}</Badge>
      )
    },
    { title: "Last Active", dataIndex: "lastActive" }
  ];

  const activityColumns: JsonTableColumns<(typeof userActivityData.activityTimeline)[0]> = [
    { title: "User", dataIndex: "user" },
    { title: "Action", dataIndex: "action" },
    { title: "Timestamp", dataIndex: "timestamp" },
    { 
      title: "Location", 
      dataIndex: "location",
      render: (item) => (
        <div className="flex items-center space-x-1">
          <MapPin className="h-3 w-3 text-gray-400" />
          <span className="text-sm">{item.location}</span>
        </div>
      )
    },
    { 
      title: "Device", 
      dataIndex: "device",
      render: (item) => (
        <Badge variant="outline">{item.device}</Badge>
      )
    },
    { title: "Browser", dataIndex: "browser" },
    { 
      title: "Session", 
      dataIndex: "sessionDuration",
      render: (item) => (
        <span className="text-sm text-gray-600">{item.sessionDuration} min</span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">User Activity Reports</h1>
          <p className="text-gray-600 mt-1">Monitor user behavior and engagement patterns</p>
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
              <p className="text-sm font-medium text-gray-600 mb-1">Active Users</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(userActivityData.overview.activeUsers)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +{userActivityData.overview.userGrowth}%
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
              <p className="text-sm font-medium text-gray-600 mb-1">New Registrations</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(userActivityData.overview.newRegistrations)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +5.2%
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
              <p className="text-sm font-medium text-gray-600 mb-1">Login Rate</p>
              <p className="text-3xl font-bold text-gray-900">
                {userActivityData.overview.loginRate}%
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +2.1%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <Clock className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Avg Session Duration</p>
              <p className="text-3xl font-bold text-gray-900">
                {userActivityData.overview.avgSessionDuration}m
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +{userActivityData.overview.activityGrowth}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <BarChart3 className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Login Patterns Chart */}
        <AdminCard title="Login Patterns (24 Hours)">
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Login patterns chart would be displayed here</p>
                <p className="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              <p>• Peak login time: 2:00 PM - {Math.max(...userActivityData.loginPatterns.map(p => p.logins))} logins</p>
              <p>• Lowest activity: 3:00 AM - {Math.min(...userActivityData.loginPatterns.map(p => p.logins))} logins</p>
              <p>• Average hourly logins: {Math.round(userActivityData.loginPatterns.reduce((sum, p) => sum + p.logins, 0) / userActivityData.loginPatterns.length)}</p>
            </div>
          </div>
        </AdminCard>

        {/* Geographic Distribution Chart */}
        <AdminCard title="Geographic Distribution">
          <div className="space-y-4">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Geographic distribution chart would be displayed here</p>
                <p className="text-sm text-gray-400">Integration with charting library needed</p>
              </div>
            </div>
            <div className="space-y-2">
              {userActivityData.geographicDistribution.slice(0, 5).map((country, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">{country.country}</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${country.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm font-medium">{country.percentage}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AdminCard>
      </div>

      {/* Top Users Table */}
      <AdminCard title="Most Active Users">
        <div className="w-full overflow-x-auto">
          <JsonTable columns={topUsersColumns} data={userActivityData.topUsers} />
        </div>
      </AdminCard>

      {/* Filters for Activity Timeline */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search user activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by action" />
            </SelectTrigger>
            <SelectContent>
              {actions.map(action => (
                <SelectItem key={action} value={action}>
                  {action === "all" ? "All Actions" : action}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </AdminCard>

      {/* Activity Timeline Table */}
      <AdminCard title={`Recent Activity (${userActivityData.activityTimeline.length})`}>
        <div className="w-full overflow-x-auto">
          <JsonTable columns={activityColumns} data={userActivityData.activityTimeline} />
        </div>
      </AdminCard>

      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AdminCard title="Engagement Metrics">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Page Views</span>
              <span className="text-lg font-semibold">{formatNumber(userActivityData.overview.pageViews)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bounce Rate</span>
              <span className="text-lg font-semibold">{userActivityData.overview.bounceRate}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Session Duration</span>
              <span className="text-lg font-semibold">{userActivityData.overview.avgSessionDuration}m</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Login Rate</span>
              <span className="text-lg font-semibold text-green-600">{userActivityData.overview.loginRate}%</span>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="User Growth">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Active Users</span>
              <span className="text-lg font-semibold">{formatNumber(userActivityData.overview.activeUsers)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">New Registrations</span>
              <span className="text-lg font-semibold text-green-600">{formatNumber(userActivityData.overview.newRegistrations)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">User Growth Rate</span>
              <span className="text-lg font-semibold text-green-600">+{userActivityData.overview.userGrowth}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Activity Growth</span>
              <span className="text-lg font-semibold text-green-600">+{userActivityData.overview.activityGrowth}%</span>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Geographic Summary">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Top Country</span>
              <span className="text-lg font-semibold">{userActivityData.geographicDistribution[0].country}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">US Users</span>
              <span className="text-lg font-semibold">{formatNumber(userActivityData.geographicDistribution[0].users)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">International</span>
              <span className="text-lg font-semibold">{formatNumber(userActivityData.geographicDistribution.slice(1).reduce((sum, country) => sum + country.users, 0))}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Countries</span>
              <span className="text-lg font-semibold">{userActivityData.geographicDistribution.length}</span>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
