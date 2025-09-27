'use client';
import { useState } from "react";
import { MetricCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Package,
  CreditCard,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";

type Props = {};

const dashboardStats = [
  { title: "Total Auctions", value: "156", change: "+12%", trend: "up" },
  { title: "Active Payments", value: "24", change: "+5%", trend: "up" },
  { title: "Completed Payments", value: "118", change: "+18%", trend: "up" },
  { title: "Overdue Payments", value: "8", change: "-25%", trend: "down" },
  { title: "Total Revenue", value: "$2.4M", change: "+22%", trend: "up" },
  { title: "Avg Payment Time", value: "3.2 days", change: "-15%", trend: "down" },
];

const recentPayments = [
  {
    id: 1,
    auctionId: "AUCT-2024-001",
    title: "Vintage Rolex Watch",
    amount: 15000.00,
    currency: "USD",
    status: "completed",
    paymentMethod: "Bank Transfer",
    completedAt: "2024-01-20 14:30:00",
    buyer: "Jane Smith"
  },
  {
    id: 2,
    auctionId: "AUCT-2024-002",
    title: "Antique Painting",
    amount: 8500.00,
    currency: "USD",
    status: "pending",
    paymentMethod: "Credit Card",
    completedAt: null,
    buyer: "Mike Johnson"
  },
  {
    id: 3,
    auctionId: "AUCT-2024-003",
    title: "Rare Coin Collection",
    amount: 12000.00,
    currency: "USD",
    status: "overdue",
    paymentMethod: "PayPal",
    completedAt: null,
    buyer: "Sarah Wilson"
  },
  {
    id: 4,
    auctionId: "AUCT-2024-004",
    title: "Luxury Handbag",
    amount: 3200.00,
    currency: "USD",
    status: "partial",
    paymentMethod: "Bank Transfer",
    completedAt: "2024-01-18 10:15:00",
    buyer: "David Brown"
  }
];

const paymentMethods = ["all", "Credit Card", "Bank Transfer", "PayPal", "Cryptocurrency"];
const statuses = ["all", "completed", "pending", "overdue", "partial"];

export default function AuctionPaymentDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [timeRange, setTimeRange] = useState("7d");

  const filteredPayments = recentPayments.filter(payment => {
    const matchesSearch = payment.auctionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.buyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "all" || payment.paymentMethod === methodFilter;
    
    return matchesSearch && matchesStatus && matchesMethod;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "overdue":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "partial":
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      case "partial":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? 
      <TrendingUp className="h-4 w-4 text-green-500" /> : 
      <TrendingDown className="h-4 w-4 text-red-500" />;
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600";
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const calculateTotalRevenue = () => {
    return recentPayments
      .filter(p => p.status === "completed")
      .reduce((sum, p) => sum + p.amount, 0);
  };

  const calculateCompletionRate = () => {
    const completed = recentPayments.filter(p => p.status === "completed").length;
    return recentPayments.length > 0 ? (completed / recentPayments.length) * 100 : 0;
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Auction Payment Dashboard</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Monitor and analyze auction payment performance</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-full sm:w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => console.log("Export data")} className="w-full sm:w-auto">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {dashboardStats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">{stat.title}</span>
              {getTrendIcon(stat.trend)}
            </div>
            <div className="flex items-center justify-between">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <span className={`text-sm font-medium ${getTrendColor(stat.trend)}`}>
                {stat.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Status Distribution */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Payment Status Distribution</h3>
            <PieChart className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-3">
            {[
              { status: "completed", count: 118, color: "bg-green-500" },
              { status: "pending", count: 24, color: "bg-yellow-500" },
              { status: "overdue", count: 8, color: "bg-red-500" },
              { status: "partial", count: 6, color: "bg-blue-500" }
            ].map((item) => (
              <div key={item.status} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-sm font-medium capitalize">{item.status}</span>
                </div>
                <span className="text-sm text-gray-600">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Revenue Trend</h3>
            <BarChart3 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Revenue</span>
              <span className="text-2xl font-bold text-green-600">
                {formatCurrency(calculateTotalRevenue(), "USD")}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Completion Rate</span>
              <span className="text-2xl font-bold text-blue-600">
                {calculateCompletionRate().toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full" 
                style={{ width: `${calculateCompletionRate()}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search auctions, buyers..."
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
              {statuses.map(status => (
                <SelectItem key={status} value={status}>
                  {status === "all" ? "All Status" : status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={methodFilter} onValueChange={setMethodFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Payment Method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map(method => (
                <SelectItem key={method} value={method}>
                  {method === "all" ? "All Methods" : method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Recent Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h3 className="text-lg font-semibold">Recent Payments ({filteredPayments.length})</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-2" />
                Analytics
              </Button>
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Auction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Buyer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{payment.auctionId}</div>
                      <div className="text-sm text-gray-500 truncate max-w-[200px]">{payment.title}</div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    {payment.buyer}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm font-semibold text-gray-900">
                      {formatCurrency(payment.amount, payment.currency)}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(payment.status)}
                      <Badge className={getStatusColor(payment.status)}>
                        {payment.status}
                      </Badge>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 text-gray-400 mr-2" />
                      {payment.paymentMethod}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                      {payment.completedAt ? 
                        new Date(payment.completedAt).toLocaleDateString() : 
                        'Pending'
                      }
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <Package className="h-8 w-8 text-blue-500" />
            <span className="text-sm text-gray-500">Active Auctions</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">24</h3>
          <p className="text-sm text-gray-600 mt-1">Requiring attention</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="h-8 w-8 text-red-500" />
            <span className="text-sm text-gray-500">Overdue</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">8</h3>
          <p className="text-sm text-gray-600 mt-1">Need immediate action</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="h-8 w-8 text-green-500" />
            <span className="text-sm text-gray-500">Today's Revenue</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">$45,250</h3>
          <p className="text-sm text-gray-600 mt-1">From completed payments</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <Clock className="h-8 w-8 text-yellow-500" />
            <span className="text-sm text-gray-500">Avg Processing</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900">3.2 days</h3>
          <p className="text-sm text-gray-600 mt-1">Payment completion time</p>
        </div>
      </div>
    </div>
  );
}
