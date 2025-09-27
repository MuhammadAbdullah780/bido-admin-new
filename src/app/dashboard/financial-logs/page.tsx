'use client';
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { MetricCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";

type Props = {};

const financialLogStats = [
  { title: "Total Transactions", value: "2,450" },
  { title: "Total Revenue", value: "$125,750" },
  { title: "Pending Payments", value: "$8,500" },
  { title: "Failed Transactions", value: "45" },
  { title: "Refunded Amount", value: "$2,300" },
  { title: "Today's Revenue", value: "$3,250" },
];

// Example financial log data
const financialLogs = [
  {
    id: 1,
    transactionId: "TXN001",
    userId: "USR001",
    userName: "John Doe",
    email: "john.doe@example.com",
    type: "Payment",
    status: "Completed",
    amount: 150.00,
    currency: "USD",
    paymentMethod: "Credit Card",
    gateway: "Stripe",
    description: "Product Purchase - Premium Plan",
    reference: "ORD-2024-001",
    ipAddress: "192.168.1.100",
    timestamp: "2024-01-15 14:30:25",
    processedAt: "2024-01-15 14:30:30",
    fees: 4.50,
    netAmount: 145.50,
    isRefunded: false,
    refundAmount: 0,
    refundReason: null,
    location: "New York, NY",
    device: "Desktop",
    browser: "Chrome",
  },
  {
    id: 2,
    transactionId: "TXN002",
    userId: "USR002",
    userName: "Jane Smith",
    email: "jane.smith@example.com",
    type: "Refund",
    status: "Completed",
    amount: 75.00,
    currency: "USD",
    paymentMethod: "Credit Card",
    gateway: "Stripe",
    description: "Refund - Product Return",
    reference: "REF-2024-001",
    ipAddress: "192.168.1.101",
    timestamp: "2024-01-15 14:25:10",
    processedAt: "2024-01-15 14:25:15",
    fees: 0,
    netAmount: -75.00,
    isRefunded: true,
    refundAmount: 75.00,
    refundReason: "Customer requested return",
    location: "Los Angeles, CA",
    device: "Mobile",
    browser: "Safari",
  },
  {
    id: 3,
    transactionId: "TXN003",
    userId: "USR003",
    userName: "Mike Johnson",
    email: "mike.johnson@example.com",
    type: "Payment",
    status: "Failed",
    amount: 200.00,
    currency: "USD",
    paymentMethod: "Debit Card",
    gateway: "PayPal",
    description: "Service Subscription",
    reference: "SUB-2024-001",
    ipAddress: "192.168.1.102",
    timestamp: "2024-01-15 14:20:45",
    processedAt: null,
    fees: 0,
    netAmount: 0,
    isRefunded: false,
    refundAmount: 0,
    refundReason: null,
    location: "Chicago, IL",
    device: "Desktop",
    browser: "Firefox",
  },
  {
    id: 4,
    transactionId: "TXN004",
    userId: "USR004",
    userName: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    type: "Payment",
    status: "Pending",
    amount: 89.99,
    currency: "USD",
    paymentMethod: "Bank Transfer",
    gateway: "ACH",
    description: "Monthly Subscription",
    reference: "SUB-2024-002",
    ipAddress: "192.168.1.103",
    timestamp: "2024-01-15 14:15:30",
    processedAt: null,
    fees: 1.50,
    netAmount: 88.49,
    isRefunded: false,
    refundAmount: 0,
    refundReason: null,
    location: "Miami, FL",
    device: "Desktop",
    browser: "Chrome",
  },
  {
    id: 5,
    transactionId: "TXN005",
    userId: "USR005",
    userName: "David Brown",
    email: "david.brown@example.com",
    type: "Payment",
    status: "Completed",
    amount: 299.99,
    currency: "USD",
    paymentMethod: "Credit Card",
    gateway: "Stripe",
    description: "Enterprise Plan Upgrade",
    reference: "UPG-2024-001",
    ipAddress: "192.168.1.104",
    timestamp: "2024-01-15 14:10:15",
    processedAt: "2024-01-15 14:10:20",
    fees: 8.99,
    netAmount: 291.00,
    isRefunded: false,
    refundAmount: 0,
    refundReason: null,
    location: "Seattle, WA",
    device: "Desktop",
    browser: "Edge",
  },
  {
    id: 6,
    transactionId: "TXN006",
    userId: "USR006",
    userName: "Emily Davis",
    email: "emily.davis@example.com",
    type: "Payment",
    status: "Completed",
    amount: 45.00,
    currency: "USD",
    paymentMethod: "PayPal",
    gateway: "PayPal",
    description: "One-time Purchase",
    reference: "PUR-2024-001",
    ipAddress: "192.168.1.105",
    timestamp: "2024-01-15 14:05:00",
    processedAt: "2024-01-15 14:05:05",
    fees: 1.35,
    netAmount: 43.65,
    isRefunded: false,
    refundAmount: 0,
    refundReason: null,
    location: "Austin, TX",
    device: "Mobile",
    browser: "Chrome",
  },
  {
    id: 7,
    transactionId: "TXN007",
    userId: "USR007",
    userName: "Robert Taylor",
    email: "robert.taylor@example.com",
    type: "Refund",
    status: "Completed",
    amount: 120.00,
    currency: "USD",
    paymentMethod: "Credit Card",
    gateway: "Stripe",
    description: "Partial Refund - Service Issue",
    reference: "REF-2024-002",
    ipAddress: "192.168.1.106",
    timestamp: "2024-01-15 13:55:30",
    processedAt: "2024-01-15 13:55:35",
    fees: 0,
    netAmount: -120.00,
    isRefunded: true,
    refundAmount: 120.00,
    refundReason: "Service not as described",
    location: "Denver, CO",
    device: "Desktop",
    browser: "Safari",
  },
  {
    id: 8,
    transactionId: "TXN008",
    userId: "USR008",
    userName: "Lisa Anderson",
    email: "lisa.anderson@example.com",
    type: "Payment",
    status: "Failed",
    amount: 65.50,
    currency: "USD",
    paymentMethod: "Debit Card",
    gateway: "Stripe",
    description: "Product Purchase",
    reference: "ORD-2024-002",
    ipAddress: "192.168.1.107",
    timestamp: "2024-01-15 13:50:15",
    processedAt: null,
    fees: 0,
    netAmount: 0,
    isRefunded: false,
    refundAmount: 0,
    refundReason: null,
    location: "Phoenix, AZ",
    device: "Mobile",
    browser: "Firefox",
  },
];

// Define columns for the JsonTable
const financialColumns: JsonTableColumns<(typeof financialLogs)[0]> = [
  { title: "Transaction ID", dataIndex: "transactionId", width: 120 },
  { title: "User", dataIndex: "userName", width: 150 },
  { title: "Email", dataIndex: "email", width: 200 },
  { title: "Type", dataIndex: "type", width: 100 },
  { 
    title: "Status", 
    dataIndex: "status",
    width: 120,
    render: (log) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        log.status === "Completed" 
          ? "bg-green-100 text-green-800" 
          : log.status === "Failed"
          ? "bg-red-100 text-red-800"
          : log.status === "Pending"
          ? "bg-yellow-100 text-yellow-800"
          : "bg-gray-100 text-gray-800"
      }`}>
        {log.status}
      </span>
    )
  },
  { 
    title: "Amount", 
    dataIndex: "amount",
    width: 120,
    render: (log) => (
      <span className={`font-medium ${log.amount < 0 ? 'text-red-600' : 'text-green-600'}`}>
        ${Math.abs(log.amount).toFixed(2)} {log.currency}
      </span>
    )
  },
  { title: "Payment Method", dataIndex: "paymentMethod", width: 130 },
  { title: "Gateway", dataIndex: "gateway", width: 100 },
  { title: "Description", dataIndex: "description", width: 200 },
  { title: "Reference", dataIndex: "reference", width: 120 },
  { 
    title: "Fees", 
    dataIndex: "fees",
    width: 80,
    render: (log) => (
      <span className="text-sm text-gray-600">
        ${log.fees.toFixed(2)}
      </span>
    )
  },
  { 
    title: "Net Amount", 
    dataIndex: "netAmount",
    width: 120,
    render: (log) => (
      <span className={`font-medium ${log.netAmount < 0 ? 'text-red-600' : 'text-green-600'}`}>
        ${Math.abs(log.netAmount).toFixed(2)}
      </span>
    )
  },
  { 
    title: "Refunded", 
    dataIndex: "isRefunded",
    width: 100,
    render: (log) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        log.isRefunded 
          ? "bg-orange-100 text-orange-800" 
          : "bg-gray-100 text-gray-800"
      }`}>
        {log.isRefunded ? "Yes" : "No"}
      </span>
    )
  },
  { 
    title: "Refund Amount", 
    dataIndex: "refundAmount",
    width: 120,
    render: (log) => (
      <span className={`text-sm ${log.refundAmount > 0 ? 'text-orange-600' : 'text-gray-400'}`}>
        {log.refundAmount > 0 ? `$${log.refundAmount.toFixed(2)}` : 'N/A'}
      </span>
    )
  },
  { title: "Timestamp", dataIndex: "timestamp", width: 150 },
  { title: "Location", dataIndex: "location", width: 150 },
  { 
    title: "Refund Reason", 
    dataIndex: "refundReason",
    width: 200,
    render: (log) => (
      <span className={`text-xs ${log.refundReason ? 'text-orange-600' : 'text-gray-400'}`}>
        {log.refundReason || 'N/A'}
      </span>
    )
  },
];

const page = (props: Props) => {
  const [logData, setLogData] = useState(financialLogs);
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [refundAmount, setRefundAmount] = useState("");
  const [pendingRefundLogs, setPendingRefundLogs] = useState<string[]>([]);

  const handleRefundLogs = (logIds: string[]) => {
    setPendingRefundLogs(logIds);
    setIsRefundModalOpen(true);
  };

  const handleConfirmRefund = () => {
    if (!refundReason.trim()) {
      alert("Please provide a reason for the refund.");
      return;
    }

    const refundAmountValue = parseFloat(refundAmount);
    if (isNaN(refundAmountValue) || refundAmountValue <= 0) {
      alert("Please enter a valid refund amount.");
      return;
    }

    setLogData(prev => 
      prev.map(log => 
        pendingRefundLogs.includes(String(log.id)) 
          ? { 
              ...log, 
              isRefunded: true, 
              refundAmount: refundAmountValue,
              refundReason: refundReason,
              status: "Completed"
            }
          : log
      )
    );
    
    // Reset state
    setSelectedLogs([]);
    setPendingRefundLogs([]);
    setRefundReason("");
    setRefundAmount("");
    setIsRefundModalOpen(false);
  };

  const handleCancelRefund = () => {
    setPendingRefundLogs([]);
    setRefundReason("");
    setRefundAmount("");
    setIsRefundModalOpen(false);
  };

  const handleExportLogs = (logIds: string[]) => {
    const logsToExport = logData.filter(log => logIds.includes(String(log.id)));
    const csvContent = [
      ['Transaction ID', 'User', 'Email', 'Type', 'Status', 'Amount', 'Currency', 'Payment Method', 'Gateway', 'Description', 'Reference', 'Fees', 'Net Amount', 'Refunded', 'Refund Amount', 'Refund Reason', 'Timestamp', 'Location'],
      ...logsToExport.map(log => [
        log.transactionId,
        log.userName,
        log.email,
        log.type,
        log.status,
        log.amount,
        log.currency,
        log.paymentMethod,
        log.gateway,
        log.description,
        log.reference,
        log.fees,
        log.netAmount,
        log.isRefunded ? 'Yes' : 'No',
        log.refundAmount,
        log.refundReason || '',
        log.timestamp,
        log.location
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `financial-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setSelectedLogs([]);
  };

  const handleMarkAsCompleted = (logIds: string[]) => {
    setLogData(prev => 
      prev.map(log => 
        logIds.includes(String(log.id)) 
          ? { ...log, status: "Completed", processedAt: new Date().toISOString().slice(0, 19).replace('T', ' ') }
          : log
      )
    );
    setSelectedLogs([]);
  };

  const bulkActions = [
    {
      label: "Process Refund",
      action: handleRefundLogs,
      variant: "destructive" as const
    },
    {
      label: "Mark as Completed", 
      action: handleMarkAsCompleted,
      variant: "default" as const
    },
    {
      label: "Export to CSV",
      action: handleExportLogs,
      variant: "outline" as const
    }
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-medium">Financial Logs</h1>
      
      <div className="grid grid-cols-2 gap-5">
        {financialLogStats.map((stat) => (
          <MetricCard
            className="col-span-1"
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <JsonTable 
        columns={financialColumns} 
        data={logData} 
        enableSelection={true}
        bulkActions={bulkActions}
        selectedIds={selectedLogs}
        onSelectionChange={setSelectedLogs}
      />

      {/* Refund Modal */}
      <Dialog open={isRefundModalOpen} onOpenChange={setIsRefundModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Process Refund</DialogTitle>
            <DialogDescription>
              Please provide details for refunding {pendingRefundLogs.length} transaction{pendingRefundLogs.length !== 1 ? 's' : ''}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <label htmlFor="refund-amount" className="text-sm font-medium">
                Refund Amount ($)
              </label>
              <input
                id="refund-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter refund amount..."
                value={refundAmount}
                onChange={(e) => setRefundAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="space-y-3">
              <label htmlFor="refund-reason" className="text-sm font-medium">
                Refund Reason
              </label>
              <Textarea
                id="refund-reason"
                placeholder="Enter the reason for the refund..."
                value={refundReason}
                onChange={(e) => setRefundReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelRefund}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmRefund}
              disabled={!refundReason.trim() || !refundAmount.trim()}
            >
              Process Refund
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
