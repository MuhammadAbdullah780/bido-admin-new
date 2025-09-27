"use client";

import { useState } from "react";
import AdminCard from "@/components/admin-card";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Download, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  BarChart3,
  Mail,
  RefreshCw
} from "lucide-react";

// Mock data for commission reports
const commissionData = {
  summary: {
    totalCommission: 122839,
    thisMonth: 18750,
    lastMonth: 16200,
    growth: 15.7,
    totalTransactions: 1247,
    avgCommissionPerTransaction: 98.5,
    commissionRate: 5.0
  },
  monthlyBreakdown: [
    { month: "Jan 2024", commission: 15200, transactions: 156, avgCommission: 97.4 },
    { month: "Feb 2024", commission: 16800, transactions: 172, avgCommission: 97.7 },
    { month: "Mar 2024", commission: 18200, transactions: 189, avgCommission: 96.3 },
    { month: "Apr 2024", commission: 19500, transactions: 201, avgCommission: 97.0 },
    { month: "May 2024", commission: 16200, transactions: 165, avgCommission: 98.2 },
    { month: "Jun 2024", commission: 18750, transactions: 191, avgCommission: 98.2 }
  ],
  topSellers: [
    { id: 1, name: "John Smith", email: "john.smith@example.com", auctions: 45, totalSales: 250000, commission: 12500, commissionRate: 5.0 },
    { id: 2, name: "Sarah Johnson", email: "sarah.johnson@example.com", auctions: 38, totalSales: 196000, commission: 9800, commissionRate: 5.0 },
    { id: 3, name: "Mike Wilson", email: "mike.wilson@example.com", auctions: 42, totalSales: 174000, commission: 8700, commissionRate: 5.0 },
    { id: 4, name: "Emily Davis", email: "emily.davis@example.com", auctions: 35, totalSales: 152000, commission: 7600, commissionRate: 5.0 },
    { id: 5, name: "David Brown", email: "david.brown@example.com", auctions: 31, totalSales: 136000, commission: 6800, commissionRate: 5.0 }
  ],
  commissionTransactions: [
    {
      id: 1,
      auctionId: "AUC-2024-001234",
      seller: "john.smith@example.com",
      buyer: "buyer1@example.com",
      itemTitle: "Vintage Rolex Watch",
      saleAmount: 12500,
      commissionAmount: 625,
      commissionRate: 5.0,
      transactionDate: "2024-06-10 14:30:00",
      status: "completed"
    },
    {
      id: 2,
      auctionId: "AUC-2024-001235",
      seller: "sarah.johnson@example.com",
      buyer: "buyer2@example.com",
      itemTitle: "Antique Art Painting",
      saleAmount: 8500,
      commissionAmount: 425,
      commissionRate: 5.0,
      transactionDate: "2024-06-10 13:45:00",
      status: "completed"
    },
    {
      id: 3,
      auctionId: "AUC-2024-001236",
      seller: "mike.wilson@example.com",
      buyer: "buyer3@example.com",
      itemTitle: "Rare Coin Collection",
      saleAmount: 21000,
      commissionAmount: 1050,
      commissionRate: 5.0,
      transactionDate: "2024-06-10 12:20:00",
      status: "pending"
    },
    {
      id: 4,
      auctionId: "AUC-2024-001237",
      seller: "emily.davis@example.com",
      buyer: "buyer4@example.com",
      itemTitle: "Designer Handbag",
      saleAmount: 4500,
      commissionAmount: 225,
      commissionRate: 5.0,
      transactionDate: "2024-06-10 11:15:00",
      status: "completed"
    },
    {
      id: 5,
      auctionId: "AUC-2024-001238",
      seller: "david.brown@example.com",
      buyer: "buyer5@example.com",
      itemTitle: "Electronics Bundle",
      saleAmount: 3200,
      commissionAmount: 160,
      commissionRate: 5.0,
      transactionDate: "2024-06-09 16:30:00",
      status: "refunded"
    }
  ]
};

const timeRanges = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "1y", label: "Last Year" },
  { value: "all", label: "All Time" }
];

const statuses = ["all", "completed", "pending", "refunded"];

export default function CommissionReportsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTimeRange, setSelectedTimeRange] = useState("30d");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000);
  };

  const handleExport = () => {
    console.log("Exporting commission report...");
  };

  const handleEmailReport = () => {
    console.log("Emailing commission report...");
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

  const topSellersColumns: JsonTableColumns<(typeof commissionData.topSellers)[0]> = [
    { title: "Seller", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { 
      title: "Auctions", 
      dataIndex: "auctions",
      render: (item) => (
        <Badge variant="outline">{item.auctions}</Badge>
      )
    },
    { 
      title: "Total Sales", 
      dataIndex: "totalSales",
      render: (item) => (
        <span className="font-semibold">{formatCurrency(item.totalSales)}</span>
      )
    },
    { 
      title: "Commission", 
      dataIndex: "commission",
      render: (item) => (
        <span className="font-semibold text-green-600">{formatCurrency(item.commission)}</span>
      )
    },
    { 
      title: "Rate", 
      dataIndex: "commissionRate",
      render: (item) => (
        <Badge variant="secondary">{item.commissionRate}%</Badge>
      )
    }
  ];

  const transactionColumns: JsonTableColumns<(typeof commissionData.commissionTransactions)[0]> = [
    { title: "Auction ID", dataIndex: "auctionId" },
    { title: "Seller", dataIndex: "seller" },
    { title: "Buyer", dataIndex: "buyer" },
    { title: "Item", dataIndex: "itemTitle" },
    { 
      title: "Sale Amount", 
      dataIndex: "saleAmount",
      render: (item) => (
        <span className="font-semibold">{formatCurrency(item.saleAmount)}</span>
      )
    },
    { 
      title: "Commission", 
      dataIndex: "commissionAmount",
      render: (item) => (
        <span className="font-semibold text-green-600">{formatCurrency(item.commissionAmount)}</span>
      )
    },
    { 
      title: "Rate", 
      dataIndex: "commissionRate",
      render: (item) => (
        <Badge variant="outline">{item.commissionRate}%</Badge>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      render: (item) => (
        <Badge variant={item.status === "completed" ? "default" : item.status === "pending" ? "secondary" : "destructive"}>
          {item.status}
        </Badge>
      )
    },
    { title: "Date", dataIndex: "transactionDate" }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Commission Reports</h1>
          <p className="text-gray-600 mt-1">Track platform commissions and revenue</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button variant="outline" onClick={handleEmailReport}>
            <Mail className="h-4 w-4 mr-2" />
            Email Report
          </Button>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Commission</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(commissionData.summary.totalCommission)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +{commissionData.summary.growth}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-green-50">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">This Month</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatCurrency(commissionData.summary.thisMonth)}
              </p>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-600">
                  +{((commissionData.summary.thisMonth - commissionData.summary.lastMonth) / commissionData.summary.lastMonth * 100).toFixed(1)}%
                </span>
                <span className="text-sm text-gray-500 ml-1">vs last month</span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-blue-50">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900">
                {formatNumber(commissionData.summary.totalTransactions)}
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500">
                  Avg: {formatCurrency(commissionData.summary.avgCommissionPerTransaction)}
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-purple-50">
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">Commission Rate</p>
              <p className="text-3xl font-bold text-gray-900">
                {commissionData.summary.commissionRate}%
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-gray-500">
                  Platform standard rate
                </span>
              </div>
            </div>
            <div className="p-3 rounded-full bg-orange-50">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Chart */}
      <AdminCard title="Monthly Commission Breakdown">
        <div className="space-y-4">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Monthly commission chart would be displayed here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
          <div className="text-sm text-gray-600">
            <p>• Peak month: June 2024 - {formatCurrency(commissionData.summary.thisMonth)}</p>
            <p>• Average monthly commission: {formatCurrency(commissionData.summary.totalCommission / 6)}</p>
            <p>• Growth trend: +{commissionData.summary.growth}% month-over-month</p>
          </div>
        </div>
      </AdminCard>

      {/* Top Sellers Table */}
      <AdminCard title="Top Commission Earners">
        <div className="w-full overflow-x-auto">
          <JsonTable columns={topSellersColumns} data={commissionData.topSellers} />
        </div>
      </AdminCard>

      {/* Filters for Transactions */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
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

      {/* Commission Transactions Table */}
      <AdminCard title={`Commission Transactions (${commissionData.commissionTransactions.length})`}>
        <div className="w-full overflow-x-auto">
          <JsonTable columns={transactionColumns} data={commissionData.commissionTransactions} />
        </div>
      </AdminCard>

      {/* Commission Summary by Category */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AdminCard title="Commission Summary">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Commission Earned</span>
              <span className="text-xl font-bold text-green-600">
                {formatCurrency(commissionData.summary.totalCommission)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">This Month</span>
              <span className="text-lg font-semibold">
                {formatCurrency(commissionData.summary.thisMonth)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Last Month</span>
              <span className="text-lg font-semibold">
                {formatCurrency(commissionData.summary.lastMonth)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Growth Rate</span>
              <span className="text-lg font-semibold text-green-600">
                +{commissionData.summary.growth}%
              </span>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Transaction Statistics">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Total Transactions</span>
              <span className="text-xl font-bold">
                {formatNumber(commissionData.summary.totalTransactions)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Avg Commission per Transaction</span>
              <span className="text-lg font-semibold">
                {formatCurrency(commissionData.summary.avgCommissionPerTransaction)}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Commission Rate</span>
              <span className="text-lg font-semibold">
                {commissionData.summary.commissionRate}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Top Seller Commission</span>
              <span className="text-lg font-semibold text-green-600">
                {formatCurrency(commissionData.topSellers[0].commission)}
              </span>
            </div>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
