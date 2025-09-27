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
  FileText, 
  User, 
  Settings, 
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowRight
} from "lucide-react";

// Mock data for audit trail
const auditTrail = [
  {
    id: 1,
    timestamp: "2024-06-10 14:30:25",
    user: "admin@scrabia.com",
    action: "User Account Updated",
    resource: "User Profile",
    resourceId: "user_123",
    oldValue: "status: active, role: user",
    newValue: "status: suspended, role: user",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    module: "User Management",
    severity: "medium"
  },
  {
    id: 2,
    timestamp: "2024-06-10 14:25:10",
    user: "superadmin@scrabia.com",
    action: "System Settings Changed",
    resource: "Platform Settings",
    resourceId: "settings_commission",
    oldValue: "commission_rate: 5%",
    newValue: "commission_rate: 6%",
    ipAddress: "192.168.1.50",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    module: "System Configuration",
    severity: "high"
  },
  {
    id: 3,
    timestamp: "2024-06-10 14:20:45",
    user: "admin@scrabia.com",
    action: "Auction Created",
    resource: "Auction",
    resourceId: "auction_456",
    oldValue: null,
    newValue: "title: Vintage Watch, starting_price: $500",
    ipAddress: "203.45.67.89",
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15",
    module: "Auction Management",
    severity: "low"
  },
  {
    id: 4,
    timestamp: "2024-06-10 14:15:30",
    user: "system",
    action: "Security Alert",
    resource: "Login Attempt",
    resourceId: "login_789",
    oldValue: null,
    newValue: "failed_login: user@example.com, reason: invalid_password",
    ipAddress: "198.51.100.42",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    module: "Security",
    severity: "high"
  },
  {
    id: 5,
    timestamp: "2024-06-10 14:10:15",
    user: "admin@scrabia.com",
    action: "Payment Processed",
    resource: "Payment",
    resourceId: "payment_101",
    oldValue: "status: pending, amount: $1250",
    newValue: "status: completed, amount: $1250, commission: $62.50",
    ipAddress: "192.168.1.75",
    userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36",
    module: "Payment Processing",
    severity: "medium"
  },
  {
    id: 6,
    timestamp: "2024-06-10 14:05:00",
    user: "superadmin@scrabia.com",
    action: "Admin Role Assigned",
    resource: "Admin Account",
    resourceId: "admin_202",
    oldValue: "role: user_manager, permissions: [users, auctions]",
    newValue: "role: financial_manager, permissions: [payments, reports, commissions]",
    ipAddress: "192.168.1.50",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
    module: "Admin Management",
    severity: "high"
  },
  {
    id: 7,
    timestamp: "2024-06-10 14:00:30",
    user: "admin@scrabia.com",
    action: "Data Export",
    resource: "User Data",
    resourceId: "export_303",
    oldValue: null,
    newValue: "exported_users: 1500, format: CSV, reason: compliance_audit",
    ipAddress: "192.168.1.100",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
    module: "Data Management",
    severity: "medium"
  },
  {
    id: 8,
    timestamp: "2024-06-10 13:55:20",
    user: "system",
    action: "System Maintenance",
    resource: "Database",
    resourceId: "db_maintenance_404",
    oldValue: "status: active, last_backup: 2024-06-09",
    newValue: "status: maintenance, last_backup: 2024-06-10, duration: 15min",
    ipAddress: "192.168.1.100",
    userAgent: "System/1.0",
    module: "System Maintenance",
    severity: "low"
  }
];

const modules = ["all", "User Management", "System Configuration", "Auction Management", "Security", "Payment Processing", "Admin Management", "Data Management", "System Maintenance"];
const severities = ["all", "low", "medium", "high", "critical"];
const actions = ["all", "User Account Updated", "System Settings Changed", "Auction Created", "Security Alert", "Payment Processed", "Admin Role Assigned", "Data Export", "System Maintenance"];

export default function AuditTrailPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [severityFilter, setSeverityFilter] = useState("all");
  const [actionFilter, setActionFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedAudit, setSelectedAudit] = useState<any>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

  // Filter audit entries based on search and filters
  const filteredAudits = auditTrail.filter(audit => {
    const matchesSearch = audit.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.resource.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         audit.resourceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesModule = moduleFilter === "all" || audit.module === moduleFilter;
    const matchesSeverity = severityFilter === "all" || audit.severity === severityFilter;
    const matchesAction = actionFilter === "all" || audit.action === actionFilter;
    
    return matchesSearch && matchesModule && matchesSeverity && matchesAction;
  });

  const handleViewDetails = (audit: any) => {
    setSelectedAudit(audit);
    setIsDetailModalOpen(true);
  };

  const handleExport = () => {
    console.log("Exporting audit trail...");
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "high":
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      case "medium":
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case "low":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-100 text-red-800";
      case "high":
        return "bg-orange-100 text-orange-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getModuleIcon = (module: string) => {
    switch (module) {
      case "User Management":
        return <User className="h-4 w-4" />;
      case "System Configuration":
        return <Settings className="h-4 w-4" />;
      case "Security":
        return <Shield className="h-4 w-4" />;
      case "Admin Management":
        return <Shield className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const columns: JsonTableColumns<(typeof auditTrail)[0]> = [
    {
      title: "Severity",
      dataIndex: "severity",
      render: (item) => (
        <div className="flex items-center space-x-2">
          {getSeverityIcon(item.severity)}
          <Badge className={getSeverityColor(item.severity)}>
            {item.severity}
          </Badge>
        </div>
      )
    },
    { title: "Timestamp", dataIndex: "timestamp" },
    { title: "User", dataIndex: "user" },
    { title: "Action", dataIndex: "action" },
    { 
      title: "Resource", 
      dataIndex: "resource",
      render: (item) => (
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            {getModuleIcon(item.module)}
            <span className="font-medium">{item.resource}</span>
          </div>
          <p className="text-xs text-gray-500">{item.resourceId}</p>
        </div>
      )
    },
    { 
      title: "Module", 
      dataIndex: "module",
      render: (item) => (
        <Badge variant="outline">{item.module}</Badge>
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

  // Calculate summary statistics
  const totalAudits = filteredAudits.length;
  const criticalAudits = filteredAudits.filter(a => a.severity === "critical").length;
  const highAudits = filteredAudits.filter(a => a.severity === "high").length;
  const todayAudits = filteredAudits.filter(a => a.timestamp.startsWith("2024-06-10")).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Audit Trail</h1>
          <p className="text-gray-600 mt-1">Monitor all system activities and changes</p>
        </div>
        <Button onClick={handleExport}>
          <Download className="h-4 w-4 mr-2" />
          Export Audit Log
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-2xl font-bold text-blue-600">{totalAudits}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <AlertTriangle className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Critical Events</p>
              <p className="text-2xl font-bold text-red-600">{criticalAudits}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <Shield className="h-8 w-8 text-orange-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-2xl font-bold text-orange-600">{highAudits}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <Clock className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Today's Events</p>
              <p className="text-2xl font-bold text-green-600">{todayAudits}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Filters */}
      <AdminCard>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          <div className="lg:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search audit trail..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          <Select value={moduleFilter} onValueChange={setModuleFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Module" />
            </SelectTrigger>
            <SelectContent>
              {modules.map(module => (
                <SelectItem key={module} value={module}>
                  {module === "all" ? "All Modules" : module}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Severity" />
            </SelectTrigger>
            <SelectContent>
              {severities.map(severity => (
                <SelectItem key={severity} value={severity}>
                  {severity === "all" ? "All Severities" : severity.charAt(0).toUpperCase() + severity.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={actionFilter} onValueChange={setActionFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Action" />
            </SelectTrigger>
            <SelectContent>
              {actions.map(action => (
                <SelectItem key={action} value={action}>
                  {action === "all" ? "All Actions" : action}
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

      {/* Audit Trail Table */}
      <AdminCard title={`Audit Trail (${filteredAudits.length})`}>
        <div className="w-full overflow-x-auto">
          <JsonTable columns={columns} data={filteredAudits} />
        </div>
      </AdminCard>

      {/* Audit Detail Modal */}
      <Dialog open={isDetailModalOpen} onOpenChange={setIsDetailModalOpen}>
        <DialogContent className="max-w-6xl">
          <DialogHeader>
            <DialogTitle>Audit Details</DialogTitle>
          </DialogHeader>
          {selectedAudit && (
            <div className="space-y-6">
              {/* Audit Header */}
              <div className="border-b pb-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedAudit.action}</h3>
                    <p className="text-sm text-gray-500">{selectedAudit.timestamp}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getSeverityIcon(selectedAudit.severity)}
                    <Badge className={getSeverityColor(selectedAudit.severity)}>
                      {selectedAudit.severity}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{selectedAudit.user}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Shield className="h-4 w-4" />
                    <span>{selectedAudit.module}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <FileText className="h-4 w-4" />
                    <span>{selectedAudit.resource}</span>
                  </div>
                </div>
              </div>

              {/* Change Comparison */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Before</h4>
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <pre className="text-sm text-red-800 whitespace-pre-wrap">
                      {selectedAudit.oldValue || "No previous value"}
                    </pre>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-3">After</h4>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <pre className="text-sm text-green-800 whitespace-pre-wrap">
                      {selectedAudit.newValue || "No new value"}
                    </pre>
                  </div>
                </div>
              </div>

              {/* Technical Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Resource ID</label>
                    <p className="text-sm text-gray-900 font-mono">{selectedAudit.resourceId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">IP Address</label>
                    <p className="text-sm text-gray-900 font-mono">{selectedAudit.ipAddress}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">User Agent</label>
                    <p className="text-xs text-gray-600 break-all">{selectedAudit.userAgent}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Module</label>
                    <Badge variant="outline">{selectedAudit.module}</Badge>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <div className="flex items-center space-x-2">
                      {getSeverityIcon(selectedAudit.severity)}
                      <Badge className={getSeverityColor(selectedAudit.severity)}>
                        {selectedAudit.severity}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Timestamp</label>
                    <p className="text-sm text-gray-900">{selectedAudit.timestamp}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
