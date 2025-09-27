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

const registrationLogStats = [
  { title: "Total Logs", value: "1,250" },
  { title: "Successful Registrations", value: "1,100" },
  { title: "Failed Registrations", value: "150" },
  { title: "Pending Verifications", value: "25" },
  { title: "Blocked Attempts", value: "50" },
  { title: "Today's Activity", value: "45" },
];

// Example registration log data
const registrationLogs = [
  {
    id: 1,
    userId: "USR001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    action: "Registration",
    status: "Success",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2024-01-15 14:30:25",
    location: "New York, NY",
    device: "Desktop",
    browser: "Chrome",
    os: "Windows 10",
    isBlocked: false,
    errorMessage: null,
  },
  {
    id: 2,
    userId: "USR002",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    action: "Registration",
    status: "Failed",
    ipAddress: "192.168.1.101",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X)",
    timestamp: "2024-01-15 14:25:10",
    location: "Los Angeles, CA",
    device: "Mobile",
    browser: "Safari",
    os: "iOS 15.0",
    isBlocked: false,
    errorMessage: "Invalid email format",
  },
  {
    id: 3,
    userId: "USR003",
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    action: "Registration",
    status: "Blocked",
    ipAddress: "192.168.1.102",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    timestamp: "2024-01-15 14:20:45",
    location: "Chicago, IL",
    device: "Desktop",
    browser: "Firefox",
    os: "Ubuntu 20.04",
    isBlocked: true,
    errorMessage: "Suspicious activity detected",
  },
  {
    id: 4,
    userId: "USR004",
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    action: "Registration",
    status: "Pending",
    ipAddress: "192.168.1.103",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    timestamp: "2024-01-15 14:15:30",
    location: "Miami, FL",
    device: "Desktop",
    browser: "Chrome",
    os: "macOS",
    isBlocked: false,
    errorMessage: null,
  },
  {
    id: 5,
    userId: "USR005",
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    action: "Registration",
    status: "Success",
    ipAddress: "192.168.1.104",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    timestamp: "2024-01-15 14:10:15",
    location: "Seattle, WA",
    device: "Desktop",
    browser: "Edge",
    os: "Windows 11",
    isBlocked: false,
    errorMessage: null,
  },
  {
    id: 6,
    userId: "USR006",
    name: "Emily Davis",
    email: "emily.davis@example.com",
    phone: "+1 (555) 678-9012",
    action: "Registration",
    status: "Failed",
    ipAddress: "192.168.1.105",
    userAgent: "Mozilla/5.0 (Android 11; Mobile; rv:68.0) Gecko/68.0 Firefox/88.0",
    timestamp: "2024-01-15 14:05:00",
    location: "Austin, TX",
    device: "Mobile",
    browser: "Firefox",
    os: "Android 11",
    isBlocked: false,
    errorMessage: "Phone number already exists",
  },
];

// Define columns for the JsonTable
const logColumns: JsonTableColumns<(typeof registrationLogs)[0]> = [
  { title: "User ID", dataIndex: "userId", width: 100 },
  { title: "Name", dataIndex: "name", width: 150 },
  { title: "Email", dataIndex: "email", width: 200 },
  { title: "Phone", dataIndex: "phone", width: 150 },
  { title: "Action", dataIndex: "action", width: 120 },
  { 
    title: "Status", 
    dataIndex: "status",
    width: 120,
    render: (log) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        log.status === "Success" 
          ? "bg-green-100 text-green-800" 
          : log.status === "Failed"
          ? "bg-red-100 text-red-800"
          : log.status === "Blocked"
          ? "bg-gray-100 text-gray-800"
          : "bg-yellow-100 text-yellow-800"
      }`}>
        {log.status}
      </span>
    )
  },
  { title: "IP Address", dataIndex: "ipAddress", width: 130 },
  { title: "Location", dataIndex: "location", width: 150 },
  { title: "Device", dataIndex: "device", width: 100 },
  { title: "Browser", dataIndex: "browser", width: 100 },
  { title: "OS", dataIndex: "os", width: 120 },
  { 
    title: "Blocked", 
    dataIndex: "isBlocked",
    width: 100,
    render: (log) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        log.isBlocked 
          ? "bg-red-100 text-red-800" 
          : "bg-green-100 text-green-800"
      }`}>
        {log.isBlocked ? "Yes" : "No"}
      </span>
    )
  },
  { title: "Timestamp", dataIndex: "timestamp", width: 150 },
  { 
    title: "Error Message", 
    dataIndex: "errorMessage",
    width: 200,
    render: (log) => (
      <span className={`text-xs ${log.errorMessage ? 'text-red-600' : 'text-gray-400'}`}>
        {log.errorMessage || 'N/A'}
      </span>
    )
  },
];

const page = (props: Props) => {
  const [logData, setLogData] = useState(registrationLogs);
  const [selectedLogs, setSelectedLogs] = useState<string[]>([]);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [pendingBlockLogs, setPendingBlockLogs] = useState<string[]>([]);

  const handleBlockLogs = (logIds: string[]) => {
    setPendingBlockLogs(logIds);
    setIsBlockModalOpen(true);
  };

  const handleConfirmBlock = () => {
    if (!blockReason.trim()) {
      alert("Please provide a reason for blocking these logs.");
      return;
    }

    setLogData(prev => 
      prev.map(log => 
        pendingBlockLogs.includes(String(log.id)) 
          ? { ...log, isBlocked: true, status: "Blocked", errorMessage: blockReason }
          : log
      )
    );
    
    // Reset state
    setSelectedLogs([]);
    setPendingBlockLogs([]);
    setBlockReason("");
    setIsBlockModalOpen(false);
  };

  const handleCancelBlock = () => {
    setPendingBlockLogs([]);
    setBlockReason("");
    setIsBlockModalOpen(false);
  };

  const handleUnblockLogs = (logIds: string[]) => {
    setLogData(prev => 
      prev.map(log => 
        logIds.includes(String(log.id)) 
          ? { ...log, isBlocked: false, status: "Success", errorMessage: null }
          : log
      )
    );
    setSelectedLogs([]);
  };

  const handleExportLogs = (logIds: string[]) => {
    const logsToExport = logData.filter(log => logIds.includes(String(log.id)));
    const csvContent = [
      ['User ID', 'Name', 'Email', 'Phone', 'Action', 'Status', 'IP Address', 'Location', 'Device', 'Browser', 'OS', 'Blocked', 'Timestamp', 'Error Message'],
      ...logsToExport.map(log => [
        log.userId,
        log.name,
        log.email,
        log.phone,
        log.action,
        log.status,
        log.ipAddress,
        log.location,
        log.device,
        log.browser,
        log.os,
        log.isBlocked ? 'Yes' : 'No',
        log.timestamp,
        log.errorMessage || ''
      ])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registration-logs-${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setSelectedLogs([]);
  };

  const bulkActions = [
    {
      label: "Block Logs",
      action: handleBlockLogs,
      variant: "destructive" as const
    },
    {
      label: "Unblock Logs", 
      action: handleUnblockLogs,
      variant: "outline" as const
    },
    {
      label: "Export to CSV",
      action: handleExportLogs,
      variant: "default" as const
    }
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-medium">Registration Logs</h1>
      
      <div className="grid grid-cols-2 gap-5">
        {registrationLogStats.map((stat) => (
          <MetricCard
            className="col-span-1"
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <JsonTable 
        columns={logColumns} 
        data={logData} 
        enableSelection={true}
        bulkActions={bulkActions}
        selectedIds={selectedLogs}
        onSelectionChange={setSelectedLogs}
      />

      {/* Block Logs Modal */}
      <Dialog open={isBlockModalOpen} onOpenChange={setIsBlockModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Block Registration Logs</DialogTitle>
            <DialogDescription>
              Please provide a reason for blocking {pendingBlockLogs.length} log{pendingBlockLogs.length !== 1 ? 's' : ''}. This action will mark the selected logs as blocked.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <label htmlFor="block-reason" className="text-sm mb-5 font-medium">
                Reason for blocking
              </label>
              <Textarea
                id="block-reason"
                placeholder="Enter the reason for blocking these logs..."
                value={blockReason}
                onChange={(e) => setBlockReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelBlock}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmBlock}
              disabled={!blockReason.trim()}
            >
              Block Logs
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;