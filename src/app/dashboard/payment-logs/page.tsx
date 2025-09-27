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
  Filter, 
  Download, 
  Eye, 
  CreditCard, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle
} from "lucide-react";

// Mock data for payment logs
const paymentLogs = [
  {
    id: 1,
    transactionId: "TXN-2024-001234",
    user: "john.doe@example.com",
    amount: 1250.00,
    currency: "USD",
    status: "completed",
    paymentMethod: "Credit Card",
    gateway: "Stripe",
    date: "2024-06-10 14:30:00",
    commission: 62.50,
    netAmount: 1187.50,
    description: "Auction #1234 - Vintage Watch"
  },
  {
    id: 2,
    transactionId: "TXN-2024-001235",
    user: "sarah.wilson@example.com",
    amount: 850.00,
    currency: "USD",
    status: "pending",
    paymentMethod: "PayPal",
    gateway: "PayPal",
    date: "2024-06-10 13:45:00",
    commission: 42.50,
    netAmount: 807.50,
    description: "Auction #1235 - Art Painting"
  },
  {
    id: 3,
    transactionId: "TXN-2024-001236",
    user: "mike.brown@example.com",
    amount: 2100.00,
    currency: "USD",
    status: "failed",
    paymentMethod: "Bank Transfer",
    gateway: "Stripe",
    date: "2024-06-10 12:20:00",
    commission: 0.00,
    netAmount: 0.00,
    description: "Auction #1236 - Antique Furniture"
  },
  {
    id: 4,
    transactionId: "TXN-2024-001237",
    user: "emily.davis@example.com",
    amount: 450.00,
    currency: "USD",
    status: "completed",
    paymentMethod: "Debit Card",
    gateway: "Stripe",
    date: "2024-06-10 11:15:00",
    commission: 22.50,
    netAmount: 427.50,
    description: "Auction #1237 - Electronics"
  },
  {
    id: 5,
    transactionId: "TXN-2024-001238",
    user: "david.smith@example.com",
    amount: 3200.00,
    currency: "USD",
    status: "refunded",
    paymentMethod: "Credit Card",
    gateway: "Stripe",
    date: "2024-06-09 16:30:00",
    commission: -160.00,
    netAmount: -3200.00,
    description: "Auction #1238 - Jewelry (Refunded)"
  },
  {
    id: 6,
    transactionId: "TXN-2024-001239",
    user: "lisa.johnson@example.com",
    amount: 750.00,
    currency: "USD",
    status: "processing",
    paymentMethod: "Crypto",
    gateway: "Coinbase",
    date: "2024-06-09 14:45:00",
    commission: 37.50,
    netAmount: 712.50,
    description: "Auction #1239 - Collectibles"
  }
];

const statuses = ["all", "completed", "pending", "failed", "refunded", "processing"];
const paymentMethods = ["all", "Credit Card", "Debit Card", "PayPal", "Bank Transfer", "Crypto"];
const gateways = ["all", "Stripe", "PayPal", "Coinbase", "Square"];

export default function PaymentLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [gatewayFilter, setGatewayFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter payments based on search and filters
  const filteredPayments = paymentLogs.filter(payment => {
    const matchesSearch = payment.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesMethod = methodFilter === "all" || payment.paymentMethod === methodFilter;
    const matchesGateway = gatewayFilter === "all" || payment.gateway === gatewayFilter;
    
    return matchesSearch && matchesStatus && matchesMethod && matchesGateway;
  });

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setIsDetailModalOpen(true);
  };

  const handleExport = () => {
    console.log("Exporting payment logs...");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "refunded":
        return <TrendingDown className="h-4 w-4 text-blue-500" />;
      case "processing":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
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
      case "failed":
        return "bg-red-100 text-red-800";
      case "refunded":
        return "bg-blue-100 text-blue-800";
      case "processing":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const columns: JsonTableColumns<(typeof paymentLogs)[0]> = [
    { title: "Transaction ID", dataIndex: "transactionId" },
    { title: "User", dataIndex: "user" },
    { 
      title: "Amount", 
      dataIndex: "amount",
      render: (item) => (
        <div className="text-right">
          <div className="font-semibold">{formatCurrency(item.amount, item.currency)}</div>
          <div className="text-sm text-gray-500">
            Net: {formatCurrency(item.netAmount, item.currency)}
          </div>
        </div>
      )
    },
    { 
      title: "Commission", 
      dataIndex: "commission",
      render: (item) => (
        <div className={`text-right font-medium ${
          item.commission >= 0 ? "text-green-600" : "text-red-600"
        }`}>
          {formatCurrency(item.commission, item.currency)}
        </div>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      render: (item) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(item.status)}
          <Badge className={getStatusColor(item.status)}>
            {item.status}
          </Badge>
        </div>
      )
    },
    { title: "Payment Method", dataIndex: "paymentMethod" },
    { title: "Gateway", dataIndex: "gateway" },
    { title: "Date", dataIndex: "date" },
    {
      title: "Actions",
      dataIndex: "id",
      render: (item) => (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleViewDetails(item)}
        >
          <Eye className="h-4 w-4" />
        </Button>
      )
    }
  ];

  // Calculate summary statistics
  const totalAmount = filteredPayments.reduce((sum, payment) => sum + payment.amount, 0);
  const totalCommission = filteredPayments.reduce((sum, payment) => sum + payment.commission, 0);
  const completedPayments = filteredPayments.filter(p => p.status === "completed").length;
  const successRate = filteredPayments.length > 0 ? (completedPayments / filteredPayments.length) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Payment Logs</h1>
          <p className="text-gray-600 mt-1">Monitor and manage payment transactions</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Payments
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(totalAmount, "USD")}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Commission</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(totalCommission, "USD")}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Success Rate</p>
              <p className="text-2xl font-bold text-green-600">
                {successRate.toFixed(1)}%
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Transactions</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredPayments.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AdminCard>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
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

          <Select value={gatewayFilter} onValueChange={setGatewayFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Gateway" />
            </SelectTrigger>
            <SelectContent>
              {gateways.map(gateway => (
                <SelectItem key={gateway} value={gateway}>
                  {gateway === "all" ? "All Gateways" : gateway}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <div className="flex space-x-2">
            <Input
              type="date"
              placeholder="From Date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <Input
              type="date"
              placeholder="To Date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />
          </div>
        </div>
      </AdminCard>

      {/* Payment Logs Table */}
      <AdminCard title={`Payment Logs (${filteredPayments.length})`}>
        <div className="w-full overflow-x-auto">
          <JsonTable columns={columns} data={filteredPayments} />
        </div>
      </AdminCard>

      {/* Payment Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Payment Details</DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              {/* Payment Header */}
              <div className="border-b pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedPayment.transactionId}</h3>
                    <p className="text-sm text-gray-500">{selectedPayment.date}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedPayment.status)}
                    <Badge className={getStatusColor(selectedPayment.status)}>
                      {selectedPayment.status}
                    </Badge>
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">
                  {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                    <p className="text-sm text-gray-900">{selectedPayment.user}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                    <p className="text-sm text-gray-900">{selectedPayment.paymentMethod}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gateway</label>
                    <p className="text-sm text-gray-900">{selectedPayment.gateway}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <p className="text-sm text-gray-900">{selectedPayment.description}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gross Amount</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(selectedPayment.amount, selectedPayment.currency)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commission</label>
                    <p className={`text-lg font-semibold ${
                      selectedPayment.commission >= 0 ? "text-green-600" : "text-red-600"
                    }`}>
                      {formatCurrency(selectedPayment.commission, selectedPayment.currency)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Net Amount</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(selectedPayment.netAmount, selectedPayment.currency)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commission Rate</label>
                    <p className="text-sm text-gray-900">
                      {((selectedPayment.commission / selectedPayment.amount) * 100).toFixed(2)}%
                    </p>
                  </div>
                </div>
              </div>

              {/* Transaction Timeline */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Transaction Timeline</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">Payment Initiated</p>
                      <p className="text-xs text-gray-500">{selectedPayment.date}</p>
                    </div>
                  </div>
                  {selectedPayment.status === "completed" && (
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payment Completed</p>
                        <p className="text-xs text-gray-500">{selectedPayment.date}</p>
                      </div>
                    </div>
                  )}
                  {selectedPayment.status === "failed" && (
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">Payment Failed</p>
                        <p className="text-xs text-gray-500">{selectedPayment.date}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
