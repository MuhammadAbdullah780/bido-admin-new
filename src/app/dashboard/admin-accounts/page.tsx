"use client";

import { useState } from "react";
import AdminCard from "@/components/admin-card";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, Eye, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Mock data for admin accounts
const adminAccounts = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@scrabia.com",
    role: "Super Admin",
    status: "active",
    createdDate: "2024-01-15",
    lastLogin: "2024-06-10 09:30",
    permissions: ["all"]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@scrabia.com",
    role: "User Manager",
    status: "active",
    createdDate: "2024-02-20",
    lastLogin: "2024-06-09 14:22",
    permissions: ["users", "auctions"]
  },
  {
    id: 3,
    name: "Mike Wilson",
    email: "mike.wilson@scrabia.com",
    role: "Financial Manager",
    status: "inactive",
    createdDate: "2024-03-10",
    lastLogin: "2024-06-05 11:15",
    permissions: ["payments", "reports"]
  },
  {
    id: 4,
    name: "Emily Davis",
    email: "emily.davis@scrabia.com",
    role: "Support Manager",
    status: "active",
    createdDate: "2024-04-05",
    lastLogin: "2024-06-10 08:45",
    permissions: ["messages", "support"]
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@scrabia.com",
    role: "Audit Manager",
    status: "active",
    createdDate: "2024-05-12",
    lastLogin: "2024-06-09 16:30",
    permissions: ["logs", "audit"]
  }
];

const roles = [
  "Super Admin",
  "User Manager", 
  "Financial Manager",
  "Support Manager",
  "Audit Manager",
  "Content Manager"
];

const permissions = [
  { id: "users", label: "Manage Users" },
  { id: "auctions", label: "Manage Auctions" },
  { id: "payments", label: "Manage Payments" },
  { id: "messages", label: "Manage Messages" },
  { id: "logs", label: "View Logs" },
  { id: "settings", label: "System Settings" },
  { id: "reports", label: "View Reports" },
  { id: "support", label: "Support Tools" },
  { id: "audit", label: "Audit Trail" },
  { id: "all", label: "All Permissions" }
];

export default function AdminAccountsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAdmins, setSelectedAdmins] = useState<number[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<any>(null);

  // Filter admin accounts based on search and filters
  const filteredAdmins = adminAccounts.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || admin.role === roleFilter;
    const matchesStatus = statusFilter === "all" || admin.status === statusFilter;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectionChange = (selectedIds: string[]) => {
    setSelectedAdmins(selectedIds.map(id => parseInt(id)));
  };

  const handleEditAdmin = (admin: any) => {
    setEditingAdmin(admin);
    setIsEditModalOpen(true);
  };

  const handleDeleteAdmin = (adminId: number) => {
    // Handle delete logic here
    console.log("Delete admin:", adminId);
  };

  const handleBulkAction = (action: string) => {
    console.log("Bulk action:", action, "on admins:", selectedAdmins);
  };

  const columns: JsonTableColumns<(typeof adminAccounts)[0]> = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { 
      title: "Role", 
      dataIndex: "role",
      render: (item) => (
        <Badge variant={item.role === "Super Admin" ? "default" : "secondary"}>
          {item.role}
        </Badge>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      render: (item) => (
        <Badge variant={item.status === "active" ? "default" : "destructive"}>
          {item.status}
        </Badge>
      )
    },
    { title: "Created", dataIndex: "createdDate" },
    { title: "Last Login", dataIndex: "lastLogin" },
    {
      title: "Actions",
      dataIndex: "id",
      render: (item) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleEditAdmin(item)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => handleDeleteAdmin(item.id)}
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Accounts</h1>
          <p className="text-gray-600 mt-1">Manage admin accounts and their permissions</p>
        </div>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Admin
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Admin</DialogTitle>
            </DialogHeader>
            <AdminForm onClose={() => setIsAddModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search admins by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              {roles.map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </AdminCard>


      {/* Admin Accounts Table */}
      <AdminCard title={`Admin Accounts (${filteredAdmins.length})`}>
        <div className="w-full overflow-x-auto">
          <JsonTable 
            columns={columns} 
            data={filteredAdmins} 
            enableSelection={true}
            selectedIds={selectedAdmins.map(id => id.toString())}
            onSelectionChange={handleSelectionChange}
            bulkActions={[
              {
                label: "Activate",
                action: (ids) => handleBulkAction("activate"),
                variant: "default"
              },
              {
                label: "Deactivate", 
                action: (ids) => handleBulkAction("deactivate"),
                variant: "outline"
              },
              {
                label: "Delete",
                action: (ids) => handleBulkAction("delete"),
                variant: "destructive"
              }
            ]}
          />
        </div>
      </AdminCard>

      {/* Edit Admin Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Admin Account</DialogTitle>
          </DialogHeader>
          <AdminForm 
            admin={editingAdmin} 
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingAdmin(null);
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Admin Form Component
function AdminForm({ admin, onClose }: { admin?: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: admin?.name || "",
    email: admin?.email || "",
    role: admin?.role || "",
    status: admin?.status || "active",
    permissions: admin?.permissions || []
  });

  const handlePermissionChange = (permissionId: string, checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: [...formData.permissions, permissionId]
      });
    } else {
      setFormData({
        ...formData,
         permissions: formData.permissions.filter((p: string) => p !== permissionId)
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter full name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Enter email address"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role
          </label>
          <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map(role => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Permissions
        </label>
        <div className="grid grid-cols-2 gap-3">
          {permissions.map(permission => (
            <div key={permission.id} className="flex items-center space-x-2">
              <Checkbox
                id={permission.id}
                checked={formData.permissions.includes(permission.id)}
                onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
              />
              <label htmlFor={permission.id} className="text-sm text-gray-700">
                {permission.label}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {admin ? "Update Admin" : "Create Admin"}
        </Button>
      </div>
    </form>
  );
}
