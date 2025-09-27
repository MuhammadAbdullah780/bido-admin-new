'use client';
import { useState } from "react";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { MetricCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  AlertTriangle,
  FileText,
  Upload,
  Plus,
  Check,
  X,
  Package,
  Truck,
  Receipt
} from "lucide-react";

type Props = {};

const auctionPaymentStats = [
  { title: "Active Auctions", value: "24" },
  { title: "Pending Payments", value: "8" },
  { title: "Completed Payments", value: "156" },
  { title: "Total Revenue", value: "$45,250" },
  { title: "Partial Payments", value: "12" },
  { title: "Overdue Payments", value: "3" },
];

// Sample auction payment data
const auctionPayments = [
  {
    id: 1,
    auctionId: "AUCT-2024-001",
    title: "Vintage Rolex Watch",
    seller: "John Doe",
    buyer: "Jane Smith",
    finalBid: 15000.00,
    currency: "USD",
    status: "partial_payment",
    partialPayment: 7500.00,
    remainingAmount: 7500.00,
    paymentDeadline: "2024-01-25",
    createdAt: "2024-01-15",
    lastPaymentDate: "2024-01-20",
    documents: [
      { type: "delivery_note", name: "delivery_note_001.pdf", uploaded: true },
      { type: "service_invoice", name: "service_invoice_001.pdf", uploaded: false },
      { type: "proof_of_funds", name: "proof_of_funds_001.pdf", uploaded: true }
    ],
    paymentHistory: [
      {
        type: "partial",
        amount: 7500.00,
        date: "2024-01-20",
        method: "Bank Transfer",
        status: "completed"
      }
    ]
  },
  {
    id: 2,
    auctionId: "AUCT-2024-002",
    title: "Antique Painting",
    seller: "Mike Johnson",
    buyer: "Sarah Wilson",
    finalBid: 8500.00,
    currency: "USD",
    status: "completed",
    partialPayment: 0.00,
    remainingAmount: 0.00,
    paymentDeadline: "2024-01-22",
    createdAt: "2024-01-15",
    lastPaymentDate: "2024-01-18",
    documents: [
      { type: "delivery_note", name: "delivery_note_002.pdf", uploaded: true },
      { type: "service_invoice", name: "service_invoice_002.pdf", uploaded: true },
      { type: "proof_of_funds", name: "proof_of_funds_002.pdf", uploaded: true }
    ],
    paymentHistory: [
      {
        type: "full",
        amount: 8500.00,
        date: "2024-01-18",
        method: "Credit Card",
        status: "completed"
      }
    ]
  },
  {
    id: 3,
    auctionId: "AUCT-2024-003",
    title: "Rare Coin Collection",
    seller: "David Brown",
    buyer: "Emily Davis",
    finalBid: 12000.00,
    currency: "USD",
    status: "pending_payment",
    partialPayment: 0.00,
    remainingAmount: 12000.00,
    paymentDeadline: "2024-01-28",
    createdAt: "2024-01-15",
    lastPaymentDate: null,
    documents: [
      { type: "delivery_note", name: "delivery_note_003.pdf", uploaded: false },
      { type: "service_invoice", name: "service_invoice_003.pdf", uploaded: false },
      { type: "proof_of_funds", name: "proof_of_funds_003.pdf", uploaded: false }
    ],
    paymentHistory: []
  },
  {
    id: 4,
    auctionId: "AUCT-2024-004",
    title: "Luxury Handbag",
    seller: "Lisa Anderson",
    buyer: "Robert Taylor",
    finalBid: 3200.00,
    currency: "USD",
    status: "overdue",
    partialPayment: 1600.00,
    remainingAmount: 1600.00,
    paymentDeadline: "2024-01-20",
    createdAt: "2024-01-15",
    lastPaymentDate: "2024-01-18",
    documents: [
      { type: "delivery_note", name: "delivery_note_004.pdf", uploaded: true },
      { type: "service_invoice", name: "service_invoice_004.pdf", uploaded: false },
      { type: "proof_of_funds", name: "proof_of_funds_004.pdf", uploaded: true }
    ],
    paymentHistory: [
      {
        type: "partial",
        amount: 1600.00,
        date: "2024-01-18",
        method: "PayPal",
        status: "completed"
      }
    ]
  }
];

const statuses = ["all", "pending_payment", "partial_payment", "completed", "overdue"];
const documentTypes = ["delivery_note", "service_invoice", "proof_of_funds"];

export default function AuctionPaymentsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isDocumentModalOpen, setIsDocumentModalOpen] = useState(false);
  const [paymentData, setPaymentData] = useState({
    amount: "",
    method: "",
    notes: ""
  });
  const [documentData, setDocumentData] = useState({
    type: "",
    file: null as File | null,
    notes: ""
  });

  // Filter payments based on search and filters
  const filteredPayments = auctionPayments.filter(payment => {
    const matchesSearch = payment.auctionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.seller.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.buyer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = (payment: any) => {
    setSelectedPayment(payment);
    setIsDetailModalOpen(true);
  };

  const handleConfirmPayment = (payment: any) => {
    setSelectedPayment(payment);
    setPaymentData({
      amount: payment.remainingAmount.toString(),
      method: "",
      notes: ""
    });
    setIsPaymentModalOpen(true);
  };

  const handleUploadDocument = (payment: any) => {
    setSelectedPayment(payment);
    setDocumentData({
      type: "",
      file: null,
      notes: ""
    });
    setIsDocumentModalOpen(true);
  };

  const handleProcessPayment = () => {
    if (!paymentData.amount || !paymentData.method) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Processing payment:", {
      payment: selectedPayment,
      paymentData
    });

    alert("Payment processed successfully!");
    setIsPaymentModalOpen(false);
    setPaymentData({ amount: "", method: "", notes: "" });
  };

  const handleUploadDocumentFile = () => {
    if (!documentData.type || !documentData.file) {
      alert("Please select document type and file.");
      return;
    }

    console.log("Uploading document:", {
      payment: selectedPayment,
      documentData
    });

    alert("Document uploaded successfully!");
    setIsDocumentModalOpen(false);
    setDocumentData({ type: "", file: null, notes: "" });
  };

  const handleCloseAuction = (payment: any) => {
    if (payment.status === "completed" && payment.remainingAmount === 0) {
      console.log("Closing auction:", payment);
      alert("Auction closed successfully!");
    } else {
      alert("Cannot close auction - payment not completed.");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "pending_payment":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "partial_payment":
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case "overdue":
        return <XCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending_payment":
        return "bg-yellow-100 text-yellow-800";
      case "partial_payment":
        return "bg-blue-100 text-blue-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "delivery_note":
        return <Truck className="h-4 w-4 text-blue-500" />;
      case "service_invoice":
        return <Receipt className="h-4 w-4 text-green-500" />;
      case "proof_of_funds":
        return <DollarSign className="h-4 w-4 text-purple-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const columns: JsonTableColumns<(typeof auctionPayments)[0]> = [
    { title: "Auction ID", dataIndex: "auctionId", width: 120 },
    { title: "Item", dataIndex: "title", width: 200 },
    { title: "Seller", dataIndex: "seller", width: 120 },
    { title: "Buyer", dataIndex: "buyer", width: 120 },
    { 
      title: "Final Bid", 
      dataIndex: "finalBid",
      width: 120,
      render: (item) => (
        <div className="text-right">
          <div className="font-semibold">{formatCurrency(item.finalBid, item.currency)}</div>
          <div className="text-sm text-gray-500">
            Remaining: {formatCurrency(item.remainingAmount, item.currency)}
          </div>
        </div>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      width: 140,
      render: (item) => (
        <div className="flex items-center space-x-2">
          {getStatusIcon(item.status)}
          <Badge className={getStatusColor(item.status)}>
            {item.status.replace('_', ' ')}
          </Badge>
        </div>
      )
    },
    { 
      title: "Documents", 
      dataIndex: "id",
      width: 120,
      render: (item) => (
        <div className="flex space-x-1">
          {item.documents.map((doc: any, index: number) => (
            <div key={index} className="flex items-center">
              {getDocumentIcon(doc.type)}
              <span className={`ml-1 text-xs ${doc.uploaded ? 'text-green-600' : 'text-red-600'}`}>
                {doc.uploaded ? '✓' : '✗'}
              </span>
            </div>
          ))}
        </div>
      )
    },
    { title: "Deadline", dataIndex: "paymentDeadline", width: 100 },
    {
      title: "Actions",
      dataIndex: "id",
      width: 200,
      render: (item) => (
        <div className="flex flex-wrap gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleViewDetails(item)}
            className="text-xs"
          >
            <Eye className="h-3 w-3" />
          </Button>
          {item.status !== "completed" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleConfirmPayment(item)}
              className="text-xs text-green-600"
            >
              <Check className="h-3 w-3" />
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleUploadDocument(item)}
            className="text-xs text-blue-600"
          >
            <Upload className="h-3 w-3" />
          </Button>
          {item.status === "completed" && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleCloseAuction(item)}
              className="text-xs text-purple-600"
            >
              <Package className="h-3 w-3" />
            </Button>
          )}
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Auction Payment Workflow</h1>
          <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage auction payments and financial documents</p>
        </div>
        <Button onClick={() => console.log("Export payments")} className="w-full sm:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Export Payments
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {auctionPaymentStats.map((stat) => (
          <MetricCard
            className="col-span-1"
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search auctions..."
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
                  {status === "all" ? "All Status" : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button variant="outline" className="w-full sm:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
        </div>
      </div>

      {/* Auction Payments Table */}
      <div className="bg-white rounded-lg shadow-sm border">
        <div className="p-4 border-b">
          <h3 className="text-lg font-semibold">Auction Payments ({filteredPayments.length})</h3>
        </div>
        <div className="w-full overflow-x-auto">
          <JsonTable columns={columns} data={filteredPayments} enableSelection={false} />
        </div>
      </div>

      {/* Payment Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl w-[95vw] sm:w-full">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Package className="w-5 h-5" />
              Auction Payment Details - {selectedPayment?.auctionId}
            </DialogTitle>
          </DialogHeader>
          {selectedPayment && (
            <div className="space-y-6">
              {/* Payment Header */}
              <div className="border-b pb-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2">
                  <div>
                    <h3 className="text-lg sm:text-xl font-semibold">{selectedPayment.title}</h3>
                    <p className="text-sm text-gray-500">Auction ID: {selectedPayment.auctionId}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedPayment.status)}
                    <Badge className={getStatusColor(selectedPayment.status)}>
                      {selectedPayment.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {formatCurrency(selectedPayment.finalBid, selectedPayment.currency)}
                </div>
              </div>

              {/* Payment Details */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Seller</label>
                    <p className="text-sm text-gray-900">{selectedPayment.seller}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Buyer</label>
                    <p className="text-sm text-gray-900">{selectedPayment.buyer}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Deadline</label>
                    <p className="text-sm text-gray-900">{selectedPayment.paymentDeadline}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                    <p className="text-sm text-gray-900">{selectedPayment.createdAt}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Final Bid</label>
                    <p className="text-lg font-semibold text-gray-900">
                      {formatCurrency(selectedPayment.finalBid, selectedPayment.currency)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Partial Payment</label>
                    <p className="text-lg font-semibold text-blue-600">
                      {formatCurrency(selectedPayment.partialPayment, selectedPayment.currency)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Remaining Amount</label>
                    <p className="text-lg font-semibold text-red-600">
                      {formatCurrency(selectedPayment.remainingAmount, selectedPayment.currency)}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Progress</label>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: `${((selectedPayment.finalBid - selectedPayment.remainingAmount) / selectedPayment.finalBid) * 100}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {(((selectedPayment.finalBid - selectedPayment.remainingAmount) / selectedPayment.finalBid) * 100).toFixed(1)}% Complete
                    </p>
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Required Documents</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {selectedPayment.documents.map((doc, index) => (
                    <div key={index} className="border rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-2">
                        {getDocumentIcon(doc.type)}
                        <span className="text-sm font-medium capitalize">
                          {doc.type.replace('_', ' ')}
                        </span>
                        <span className={`text-xs ${doc.uploaded ? 'text-green-600' : 'text-red-600'}`}>
                          {doc.uploaded ? '✓' : '✗'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">{doc.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment History */}
              {selectedPayment.paymentHistory.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Payment History</h4>
                  <div className="space-y-2">
                    {selectedPayment.paymentHistory.map((payment: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          <div>
                            <p className="text-sm font-medium">
                              {payment.type === 'full' ? 'Full Payment' : 'Partial Payment'}
                            </p>
                            <p className="text-xs text-gray-500">{payment.date}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-600">
                            {formatCurrency(payment.amount, selectedPayment.currency)}
                          </p>
                          <p className="text-xs text-gray-500">{payment.method}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setIsDetailModalOpen(false)} className="w-full sm:w-auto">
              Close
            </Button>
            {selectedPayment?.status !== "completed" && (
              <Button onClick={() => handleConfirmPayment(selectedPayment)} className="w-full sm:w-auto">
                <Check className="w-4 h-4 mr-2" />
                Process Payment
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Payment Confirmation Modal */}
      <Dialog open={isPaymentModalOpen} onOpenChange={setIsPaymentModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Confirm Payment
            </DialogTitle>
            <DialogDescription>
              Process payment for auction {selectedPayment?.auctionId}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <label htmlFor="payment-amount" className="text-sm font-medium">
                Payment Amount ($) *
              </label>
              <input
                id="payment-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter payment amount..."
                value={paymentData.amount}
                onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="payment-method" className="text-sm font-medium">
                Payment Method *
              </label>
              <Select value={paymentData.method} onValueChange={(value) => setPaymentData(prev => ({ ...prev, method: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="credit_card">Credit Card</SelectItem>
                  <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                  <SelectItem value="crypto">Cryptocurrency</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label htmlFor="payment-notes" className="text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="payment-notes"
                placeholder="Enter payment notes..."
                value={paymentData.notes}
                onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleProcessPayment}
              disabled={!paymentData.amount || !paymentData.method}
            >
              <Check className="w-4 h-4 mr-2" />
              Process Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Upload Modal */}
      <Dialog open={isDocumentModalOpen} onOpenChange={setIsDocumentModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Upload Document
            </DialogTitle>
            <DialogDescription>
              Upload financial document for auction {selectedPayment?.auctionId}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <label htmlFor="document-type" className="text-sm font-medium">
                Document Type *
              </label>
              <Select value={documentData.type} onValueChange={(value) => setDocumentData(prev => ({ ...prev, type: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select document type" />
                </SelectTrigger>
                <SelectContent>
                  {documentTypes.map(type => (
                    <SelectItem key={type} value={type}>
                      {type.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              <label htmlFor="document-file" className="text-sm font-medium">
                File *
              </label>
              <input
                id="document-file"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                onChange={(e) => setDocumentData(prev => ({ ...prev, file: e.target.files?.[0] || null }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="document-notes" className="text-sm font-medium">
                Notes
              </label>
              <Textarea
                id="document-notes"
                placeholder="Enter document notes..."
                value={documentData.notes}
                onChange={(e) => setDocumentData(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDocumentModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleUploadDocumentFile}
              disabled={!documentData.type || !documentData.file}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Document
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
