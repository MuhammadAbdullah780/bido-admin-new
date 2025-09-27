"use client";

import { useState } from "react";
import AdminCard from "@/components/admin-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2, Users, Shield, Settings, DollarSign, MessageSquare, FileText, BarChart3 } from "lucide-react";

// Mock data for roles
const roles = [
  {
    id: 1,
    name: "Super Admin",
    description: "Full access to all platform features and settings",
    userCount: 2,
    permissions: ["all"],
    color: "bg-red-100 text-red-800",
    icon: Shield
  },
  {
    id: 2,
    name: "User Manager",
    description: "Manage users, registrations, and user-related activities",
    userCount: 5,
    permissions: ["users", "auctions", "messages"],
    color: "bg-blue-100 text-blue-800",
    icon: Users
  },
  {
    id: 3,
    name: "Financial Manager",
    description: "Handle payments, commissions, and financial reports",
    userCount: 3,
    permissions: ["payments", "reports", "commissions"],
    color: "bg-green-100 text-green-800",
    icon: DollarSign
  },
  {
    id: 4,
    name: "Support Manager",
    description: "Manage customer support and user communications",
    userCount: 4,
    permissions: ["messages", "support", "users"],
    color: "bg-purple-100 text-purple-800",
    icon: MessageSquare
  },
  {
    id: 5,
    name: "Audit Manager",
    description: "Monitor logs, audit trails, and security activities",
    userCount: 2,
    permissions: ["logs", "audit", "reports"],
    color: "bg-orange-100 text-orange-800",
    icon: FileText
  },
  {
    id: 6,
    name: "Analytics Manager",
    description: "Access to analytics, reports, and data insights",
    userCount: 1,
    permissions: ["reports", "analytics", "logs"],
    color: "bg-indigo-100 text-indigo-800",
    icon: BarChart3
  }
];

const allPermissions = [
  { id: "users", label: "Manage Users", description: "Create, edit, delete user accounts" },
  { id: "auctions", label: "Manage Auctions", description: "Create, edit, delete auctions" },
  { id: "payments", label: "Manage Payments", description: "View and process payments" },
  { id: "messages", label: "Manage Messages", description: "View and respond to user messages" },
  { id: "logs", label: "View Logs", description: "Access to system and activity logs" },
  { id: "settings", label: "System Settings", description: "Modify platform settings" },
  { id: "reports", label: "View Reports", description: "Access to various reports" },
  { id: "support", label: "Support Tools", description: "Customer support tools" },
  { id: "audit", label: "Audit Trail", description: "View audit trail and security logs" },
  { id: "analytics", label: "Analytics", description: "Access to analytics dashboard" },
  { id: "commissions", label: "Commissions", description: "Manage commission settings" },
  { id: "all", label: "All Permissions", description: "Full access to all features" }
];

export default function RoleManagementPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<any>(null);

  // Filter roles based on search
  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditRole = (role: any) => {
    setEditingRole(role);
    setIsEditModalOpen(true);
  };

  const handleDeleteRole = (roleId: number) => {
    console.log("Delete role:", roleId);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Role Management</h1>
          <p className="text-gray-600 mt-1">Create and manage admin roles and permissions</p>
        </div>
        <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create New Role
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Create New Role</DialogTitle>
            </DialogHeader>
            <RoleForm onClose={() => setIsCreateModalOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <AdminCard>
        <div className="relative">
          <Input
            placeholder="Search roles by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Settings className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        </div>
      </AdminCard>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRoles.map((role) => (
          <div key={role.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${role.color}`}>
                  <role.icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{role.name}</h3>
                  <p className="text-sm text-gray-500">{role.userCount} user(s)</p>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleEditRole(role)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteRole(role.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-4">{role.description}</p>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-gray-700">Permissions:</h4>
              <div className="flex flex-wrap gap-1">
                {role.permissions.map((permission) => {
                  const perm = allPermissions.find(p => p.id === permission);
                  return (
                    <Badge key={permission} variant="secondary" className="text-xs">
                      {perm?.label || permission}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Role Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Role</DialogTitle>
          </DialogHeader>
          <RoleForm 
            role={editingRole} 
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingRole(null);
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Role Form Component
function RoleForm({ role, onClose }: { role?: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: role?.name || "",
    description: role?.description || "",
    permissions: role?.permissions || []
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
        permissions: formData.permissions.filter(p => p !== permissionId)
      });
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setFormData({
        ...formData,
        permissions: allPermissions.map(p => p.id)
      });
    } else {
      setFormData({
        ...formData,
        permissions: []
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  const isAllSelected = formData.permissions.length === allPermissions.length;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Role Name
          </label>
          <Input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter role name"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <Input
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Enter role description"
            required
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Permissions
          </label>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={isAllSelected}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm text-gray-700">
              Select All
            </label>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-96 overflow-y-auto border rounded-lg p-4">
          {allPermissions.map(permission => (
            <div key={permission.id} className="flex items-start space-x-3 p-2 rounded hover:bg-gray-50">
              <Checkbox
                id={permission.id}
                checked={formData.permissions.includes(permission.id)}
                onCheckedChange={(checked) => handlePermissionChange(permission.id, checked as boolean)}
                className="mt-1"
              />
              <div className="flex-1 min-w-0">
                <label htmlFor={permission.id} className="text-sm font-medium text-gray-900 cursor-pointer">
                  {permission.label}
                </label>
                <p className="text-xs text-gray-500 mt-1">{permission.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {role ? "Update Role" : "Create Role"}
        </Button>
      </div>
    </form>
  );
}
