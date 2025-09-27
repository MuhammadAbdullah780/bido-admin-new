"use client";

import { useState } from "react";
import AdminCard from "@/components/admin-card";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Eye, Calendar, Clock, AlertCircle, CheckCircle, Info, XCircle } from "lucide-react";

// Mock data for platform logs
const platformLogs = [
  {
    id: 1,
    timestamp: "2024-06-10 14:30:25",
    level: "ERROR",
    user: "system",
    action: "Database Connection Failed",
    details: "Unable to connect to primary database server",
    ipAddress: "192.168.1.100",
    module: "Database",
    status: "resolved"
  },
  {
    id: 2,
    timestamp: "2024-06-10 14:25:10",
    level: "WARNING",
    user: "admin@scrabia.com",
    action: "High Memory Usage",
    details: "Server memory usage exceeded 85%",
    ipAddress: "192.168.1.50",
    module: "System",
    status: "monitoring"
  },
  {
    id: 3,
    timestamp: "2024-06-10 14:20:45",
    level: "INFO",
    user: "john.doe@example.com",
    action: "User Login",
    details: "Successful login from web interface",
    ipAddress: "203.45.67.89",
    module: "Authentication",
    status: "completed"
  },
  {
    id: 4,
    timestamp: "2024-06-10 14:15:30",
    level: "ERROR",
    user: "system",
    action: "Payment Processing Failed",
    details: "Stripe API timeout during payment processing",
    ipAddress: "192.168.1.100",
    module: "Payments",
    status: "investigating"
  },
  {
    id: 5,
    timestamp: "2024-06-10 14:10:15",
    level: "INFO",
    user: "sarah.johnson@scrabia.com",
    action: "Auction Created",
    details: "New auction #1234 created successfully",
    ipAddress: "192.168.1.75",
    module: "Auctions",
    status: "completed"
  },
  {
    id: 6,
    timestamp: "2024-06-10 14:05:00",
    level: "WARNING",
    user: "system",
    action: "Slow Query Detected",
    details: "Database query took 5.2 seconds to execute",
    ipAddress: "192.168.1.100",
    module: "Database",
    status: "monitoring"
  },
  {
    id: 7,
    timestamp: "2024-06-10 14:00:30",
    level: "INFO",
    user: "mike.wilson@scrabia.com",
    action: "User Registration",
    details: "New user registered with email verification",
    ipAddress: "198.51.100.42",
    module: "Users",
    status: "completed"
  },
  {
    id: 8,
    timestamp: "2024-06-10 13:55:20",
    level: "ERROR",
    user: "system",
    action: "File Upload Failed",
    details: "Image upload exceeded maximum file size limit",
    ipAddress: "192.168.1.100",
    module: "FileSystem",
    status: "resolved"
  }
];

const logLevels = ["ALL", "ERROR", "WARNING", "INFO", "DEBUG"];
const modules = ["ALL", "Database", "System", "Authentication", "Payments", "Auctions", "Users", "FileSystem"];
const statuses = ["ALL", "completed", "monitoring", "investigating", "resolved"];

export default function PlatformLogsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("ALL");
  const [moduleFilter, setModuleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedLog, setSelectedLog] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter logs based on search and filters
  const filteredLogs = platformLogs.filter(log => {
    const matchesSearch = log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.user.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLevel = levelFilter === "ALL" || log.level === levelFilter;
    const matchesModule = moduleFilter === "ALL" || log.module === moduleFilter;
    const matchesStatus = statusFilter === "ALL" || log.status === statusFilter;
    
    return matchesSearch && matchesLevel && matchesModule && matchesStatus;
  });

  const handleViewDetails = (log: any) => {
    setSelectedLog(log);
    setIsDetailModalOpen(true);
  };

  const handleExport = () => {
    console.log("Exporting logs...");
  };

  const getLevelIcon = (level: string) => {
    switch (level) {
      case "ERROR":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "WARNING":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "INFO":
        return <Info className="h-4 w-4 text-blue-500" />;
      case "DEBUG":
        return <Clock className="h-4 w-4 text-gray-500" />;
      default:
        return <Info className="h-4 w-4 text-gray-500" />;
    }
  };

  const getLevelBadgeColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "bg-red-100 text-red-800";
      case "WARNING":
        return "bg-yellow-100 text-yellow-800";
      case "INFO":
        return "bg-blue-100 text-blue-800";
      case "DEBUG":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "monitoring":
        return "bg-yellow-100 text-yellow-800";
      case "investigating":
        return "bg-orange-100 text-orange-800";
      case "resolved":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const columns: JsonTableColumns<(typeof platformLogs)[0]> = [
    {
      title: "Level",
      dataIndex: "level",
      render: (item) => (
        <div className="flex items-center space-x-2">
          {getLevelIcon(item.level)}
          <Badge className={getLevelBadgeColor(item.level)}>
            {item.level}
          </Badge>
        </div>
      )
    },
    { title: "Timestamp", dataIndex: "timestamp" },
    { title: "User", dataIndex: "user" },
    { title: "Action", dataIndex: "action" },
    { 
      title: "Module", 
      dataIndex: "module",
      render: (item) => (
        <Badge variant="outline">{item.module}</Badge>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      render: (item) => (
        <Badge className={getStatusBadgeColor(item.status)}>
          {item.status}
        </Badge>
      )
    },
    { title: "IP Address", dataIndex: "ipAddress" },
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

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Platform Logs</h1>
          <p className="text-gray-600 mt-1">Monitor system logs and platform activities</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Logs
        </Button>
      </div>

      {/* Filters */}
      <AdminCard>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={levelFilter} onValueChange={setLevelFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Log Level" />
            </SelectTrigger>
            <SelectContent>
              {logLevels.map(level => (
                <SelectItem key={level} value={level}>{level}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={moduleFilter} onValueChange={setModuleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map(module => (
                <SelectItem key={module} value={module}>{module}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map(status => (
                <SelectItem key={status} value={status}>{status}</SelectItem>
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

      {/* Log Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <XCircle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Errors</p>
              <p className="text-2xl font-bold text-red-600">
                {filteredLogs.filter(log => log.level === "ERROR").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <AlertCircle className="h-8 w-8 text-yellow-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">
                {filteredLogs.filter(log => log.level === "WARNING").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <Info className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Info</p>
              <p className="text-2xl font-bold text-blue-600">
                {filteredLogs.filter(log => log.level === "INFO").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Logs</p>
              <p className="text-2xl font-bold text-gray-900">
                {filteredLogs.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Logs Table */}
      <AdminCard title={`Platform Logs (${filteredLogs.length})`}>
        <div className="w-full overflow-x-auto">
          <JsonTable columns={columns} data={filteredLogs} />
        </div>
      </AdminCard>

      {/* Log Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Log Details</DialogTitle>
          </DialogHeader>
          {selectedLog && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
                  <div className="flex items-center space-x-2">
                    {getLevelIcon(selectedLog.level)}
                    <Badge className={getLevelBadgeColor(selectedLog.level)}>
                      {selectedLog.level}
                    </Badge>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <Badge className={getStatusBadgeColor(selectedLog.status)}>
                    {selectedLog.status}
                  </Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Timestamp</label>
                  <p className="text-sm text-gray-900">{selectedLog.timestamp}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
                  <p className="text-sm text-gray-900">{selectedLog.user}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                  <Badge variant="outline">{selectedLog.module}</Badge>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                  <p className="text-sm text-gray-900 font-mono">{selectedLog.ipAddress}</p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Action</label>
                <p className="text-sm text-gray-900 font-medium">{selectedLog.action}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Details</label>
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-900 whitespace-pre-wrap">
                    {selectedLog.details}
                  </pre>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
