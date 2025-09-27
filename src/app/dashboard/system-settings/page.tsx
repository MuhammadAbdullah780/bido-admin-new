"use client";

import { useState } from "react";
import AdminCard from "@/components/admin-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Settings, 
  Shield, 
  Mail, 
  Database, 
  Save, 
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Info
} from "lucide-react";

export default function SystemSettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);

  // General Settings State
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Scrabia Admin",
    siteDescription: "Professional auction platform administration",
    contactEmail: "admin@scrabia.com",
    supportEmail: "support@scrabia.com",
    timezone: "America/New_York",
    language: "en",
    maintenanceMode: false,
    registrationEnabled: true,
    emailVerification: true
  });

  // Security Settings State
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    passwordRequireSpecial: true,
    passwordRequireNumbers: true,
    passwordRequireUppercase: true,
    sessionTimeout: 30, // minutes
    maxLoginAttempts: 5,
    lockoutDuration: 15, // minutes
    twoFactorAuth: false,
    ipWhitelist: "",
    auditLogRetention: 90 // days
  });

  // Notification Settings State
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    adminAlerts: true,
    userRegistrationAlerts: true,
    paymentAlerts: true,
    systemAlerts: true,
    emailFromName: "Scrabia Admin",
    emailFromAddress: "noreply@scrabia.com",
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUsername: "",
    smtpPassword: "",
    smtpEncryption: "tls"
  });

  // Maintenance Settings State
  const [maintenanceSettings, setMaintenanceSettings] = useState({
    autoBackup: true,
    backupFrequency: "daily",
    backupRetention: 30, // days
    logLevel: "info",
    cacheEnabled: true,
    cacheTtl: 3600, // seconds
    cdnEnabled: false,
    cdnUrl: "",
    monitoringEnabled: true,
    alertThresholds: {
      cpuUsage: 80,
      memoryUsage: 85,
      diskUsage: 90
    }
  });

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSaving(false);
    setHasChanges(false);
    console.log("Settings saved successfully");
  };

  const handleReset = () => {
    // Reset to default values
    setHasChanges(true);
    console.log("Settings reset to defaults");
  };

  const updateGeneralSetting = (key: string, value: any) => {
    setGeneralSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const updateSecuritySetting = (key: string, value: any) => {
    setSecuritySettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const updateNotificationSetting = (key: string, value: any) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const updateMaintenanceSetting = (key: string, value: any) => {
    setMaintenanceSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure platform settings and preferences</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleReset}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} disabled={isSaving || !hasChanges}>
            {isSaving ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Save className="h-4 w-4 mr-2" />
            )}
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="general" className="flex items-center space-x-2">
            <Settings className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center space-x-2">
            <Shield className="h-4 w-4" />
            <span>Security</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="flex items-center space-x-2">
            <Database className="h-4 w-4" />
            <span>Maintenance</span>
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <AdminCard title="General Settings">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Site Name
                  </label>
                  <Input
                    value={generalSettings.siteName}
                    onChange={(e) => updateGeneralSetting("siteName", e.target.value)}
                    placeholder="Enter site name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone
                  </label>
                  <Select value={generalSettings.timezone} onValueChange={(value) => updateGeneralSetting("timezone", value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="Europe/Paris">Paris (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Site Description
                </label>
                <Textarea
                  value={generalSettings.siteDescription}
                  onChange={(e) => updateGeneralSetting("siteDescription", e.target.value)}
                  placeholder="Enter site description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Email
                  </label>
                  <Input
                    type="email"
                    value={generalSettings.contactEmail}
                    onChange={(e) => updateGeneralSetting("contactEmail", e.target.value)}
                    placeholder="contact@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Support Email
                  </label>
                  <Input
                    type="email"
                    value={generalSettings.supportEmail}
                    onChange={(e) => updateGeneralSetting("supportEmail", e.target.value)}
                    placeholder="support@example.com"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Platform Features</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Maintenance Mode</label>
                      <p className="text-xs text-gray-500">Temporarily disable public access</p>
                    </div>
                    <Switch
                      checked={generalSettings.maintenanceMode}
                      onCheckedChange={(checked) => updateGeneralSetting("maintenanceMode", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">User Registration</label>
                      <p className="text-xs text-gray-500">Allow new user registrations</p>
                    </div>
                    <Switch
                      checked={generalSettings.registrationEnabled}
                      onCheckedChange={(checked) => updateGeneralSetting("registrationEnabled", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Verification</label>
                      <p className="text-xs text-gray-500">Require email verification for new users</p>
                    </div>
                    <Switch
                      checked={generalSettings.emailVerification}
                      onCheckedChange={(checked) => updateGeneralSetting("emailVerification", checked)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </AdminCard>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security">
          <AdminCard title="Security Settings">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Password Policy</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Minimum Length
                    </label>
                    <Input
                      type="number"
                      value={securitySettings.passwordMinLength}
                      onChange={(e) => updateSecuritySetting("passwordMinLength", parseInt(e.target.value))}
                      min="6"
                      max="32"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Session Timeout (minutes)
                    </label>
                    <Input
                      type="number"
                      value={securitySettings.sessionTimeout}
                      onChange={(e) => updateSecuritySetting("sessionTimeout", parseInt(e.target.value))}
                      min="5"
                      max="480"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Require Special Characters</label>
                      <p className="text-xs text-gray-500">Passwords must contain special characters</p>
                    </div>
                    <Switch
                      checked={securitySettings.passwordRequireSpecial}
                      onCheckedChange={(checked) => updateSecuritySetting("passwordRequireSpecial", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Require Numbers</label>
                      <p className="text-xs text-gray-500">Passwords must contain numbers</p>
                    </div>
                    <Switch
                      checked={securitySettings.passwordRequireNumbers}
                      onCheckedChange={(checked) => updateSecuritySetting("passwordRequireNumbers", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Require Uppercase</label>
                      <p className="text-xs text-gray-500">Passwords must contain uppercase letters</p>
                    </div>
                    <Switch
                      checked={securitySettings.passwordRequireUppercase}
                      onCheckedChange={(checked) => updateSecuritySetting("passwordRequireUppercase", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Access Control</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Max Login Attempts
                    </label>
                    <Input
                      type="number"
                      value={securitySettings.maxLoginAttempts}
                      onChange={(e) => updateSecuritySetting("maxLoginAttempts", parseInt(e.target.value))}
                      min="3"
                      max="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Lockout Duration (minutes)
                    </label>
                    <Input
                      type="number"
                      value={securitySettings.lockoutDuration}
                      onChange={(e) => updateSecuritySetting("lockoutDuration", parseInt(e.target.value))}
                      min="5"
                      max="60"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Two-Factor Authentication</label>
                      <p className="text-xs text-gray-500">Require 2FA for admin accounts</p>
                    </div>
                    <Switch
                      checked={securitySettings.twoFactorAuth}
                      onCheckedChange={(checked) => updateSecuritySetting("twoFactorAuth", checked)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IP Whitelist (one per line)
                  </label>
                  <Textarea
                    value={securitySettings.ipWhitelist}
                    onChange={(e) => updateSecuritySetting("ipWhitelist", e.target.value)}
                    placeholder="192.168.1.1&#10;10.0.0.0/8"
                    rows={4}
                  />
                </div>
              </div>
            </div>
          </AdminCard>
        </TabsContent>

        {/* Notification Settings */}
        <TabsContent value="notifications">
          <AdminCard title="Notification Settings">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Email Notifications</label>
                      <p className="text-xs text-gray-500">Send notifications via email</p>
                    </div>
                    <Switch
                      checked={notificationSettings.emailNotifications}
                      onCheckedChange={(checked) => updateNotificationSetting("emailNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">SMS Notifications</label>
                      <p className="text-xs text-gray-500">Send notifications via SMS</p>
                    </div>
                    <Switch
                      checked={notificationSettings.smsNotifications}
                      onCheckedChange={(checked) => updateNotificationSetting("smsNotifications", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Push Notifications</label>
                      <p className="text-xs text-gray-500">Send push notifications to mobile apps</p>
                    </div>
                    <Switch
                      checked={notificationSettings.pushNotifications}
                      onCheckedChange={(checked) => updateNotificationSetting("pushNotifications", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Alert Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Admin Alerts</label>
                      <p className="text-xs text-gray-500">Send alerts to administrators</p>
                    </div>
                    <Switch
                      checked={notificationSettings.adminAlerts}
                      onCheckedChange={(checked) => updateNotificationSetting("adminAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">User Registration Alerts</label>
                      <p className="text-xs text-gray-500">Alert when new users register</p>
                    </div>
                    <Switch
                      checked={notificationSettings.userRegistrationAlerts}
                      onCheckedChange={(checked) => updateNotificationSetting("userRegistrationAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Payment Alerts</label>
                      <p className="text-xs text-gray-500">Alert on payment activities</p>
                    </div>
                    <Switch
                      checked={notificationSettings.paymentAlerts}
                      onCheckedChange={(checked) => updateNotificationSetting("paymentAlerts", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">System Alerts</label>
                      <p className="text-xs text-gray-500">Alert on system issues</p>
                    </div>
                    <Switch
                      checked={notificationSettings.systemAlerts}
                      onCheckedChange={(checked) => updateNotificationSetting("systemAlerts", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Email Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Name
                    </label>
                    <Input
                      value={notificationSettings.emailFromName}
                      onChange={(e) => updateNotificationSetting("emailFromName", e.target.value)}
                      placeholder="Scrabia Admin"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      From Address
                    </label>
                    <Input
                      type="email"
                      value={notificationSettings.emailFromAddress}
                      onChange={(e) => updateNotificationSetting("emailFromAddress", e.target.value)}
                      placeholder="noreply@scrabia.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Host
                    </label>
                    <Input
                      value={notificationSettings.smtpHost}
                      onChange={(e) => updateNotificationSetting("smtpHost", e.target.value)}
                      placeholder="smtp.gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Port
                    </label>
                    <Input
                      type="number"
                      value={notificationSettings.smtpPort}
                      onChange={(e) => updateNotificationSetting("smtpPort", parseInt(e.target.value))}
                      placeholder="587"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Username
                    </label>
                    <Input
                      value={notificationSettings.smtpUsername}
                      onChange={(e) => updateNotificationSetting("smtpUsername", e.target.value)}
                      placeholder="your-email@gmail.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      SMTP Password
                    </label>
                    <Input
                      type="password"
                      value={notificationSettings.smtpPassword}
                      onChange={(e) => updateNotificationSetting("smtpPassword", e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AdminCard>
        </TabsContent>

        {/* Maintenance Settings */}
        <TabsContent value="maintenance">
          <AdminCard title="Maintenance Settings">
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Backup Configuration</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Automatic Backups</label>
                      <p className="text-xs text-gray-500">Enable automatic database backups</p>
                    </div>
                    <Switch
                      checked={maintenanceSettings.autoBackup}
                      onCheckedChange={(checked) => updateMaintenanceSetting("autoBackup", checked)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Backup Frequency
                    </label>
                    <Select value={maintenanceSettings.backupFrequency} onValueChange={(value) => updateMaintenanceSetting("backupFrequency", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Retention Period (days)
                    </label>
                    <Input
                      type="number"
                      value={maintenanceSettings.backupRetention}
                      onChange={(e) => updateMaintenanceSetting("backupRetention", parseInt(e.target.value))}
                      min="1"
                      max="365"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">System Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Log Level
                    </label>
                    <Select value={maintenanceSettings.logLevel} onValueChange={(value) => updateMaintenanceSetting("logLevel", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="debug">Debug</SelectItem>
                        <SelectItem value="info">Info</SelectItem>
                        <SelectItem value="warn">Warning</SelectItem>
                        <SelectItem value="error">Error</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cache TTL (seconds)
                    </label>
                    <Input
                      type="number"
                      value={maintenanceSettings.cacheTtl}
                      onChange={(e) => updateMaintenanceSetting("cacheTtl", parseInt(e.target.value))}
                      min="60"
                      max="86400"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Cache Enabled</label>
                      <p className="text-xs text-gray-500">Enable application caching</p>
                    </div>
                    <Switch
                      checked={maintenanceSettings.cacheEnabled}
                      onCheckedChange={(checked) => updateMaintenanceSetting("cacheEnabled", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">CDN Enabled</label>
                      <p className="text-xs text-gray-500">Use Content Delivery Network</p>
                    </div>
                    <Switch
                      checked={maintenanceSettings.cdnEnabled}
                      onCheckedChange={(checked) => updateMaintenanceSetting("cdnEnabled", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <label className="text-sm font-medium text-gray-700">System Monitoring</label>
                      <p className="text-xs text-gray-500">Monitor system performance</p>
                    </div>
                    <Switch
                      checked={maintenanceSettings.monitoringEnabled}
                      onCheckedChange={(checked) => updateMaintenanceSetting("monitoringEnabled", checked)}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Alert Thresholds</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CPU Usage (%)
                    </label>
                    <Input
                      type="number"
                      value={maintenanceSettings.alertThresholds.cpuUsage}
                      onChange={(e) => updateMaintenanceSetting("alertThresholds", {
                        ...maintenanceSettings.alertThresholds,
                        cpuUsage: parseInt(e.target.value)
                      })}
                      min="50"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Memory Usage (%)
                    </label>
                    <Input
                      type="number"
                      value={maintenanceSettings.alertThresholds.memoryUsage}
                      onChange={(e) => updateMaintenanceSetting("alertThresholds", {
                        ...maintenanceSettings.alertThresholds,
                        memoryUsage: parseInt(e.target.value)
                      })}
                      min="50"
                      max="100"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Disk Usage (%)
                    </label>
                    <Input
                      type="number"
                      value={maintenanceSettings.alertThresholds.diskUsage}
                      onChange={(e) => updateMaintenanceSetting("alertThresholds", {
                        ...maintenanceSettings.alertThresholds,
                        diskUsage: parseInt(e.target.value)
                      })}
                      min="50"
                      max="100"
                    />
                  </div>
                </div>
              </div>
            </div>
          </AdminCard>
        </TabsContent>
      </Tabs>

      {/* Save Status */}
      {hasChanges && (
        <div className="fixed bottom-4 right-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4 shadow-lg">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-600" />
            <span className="text-sm font-medium text-yellow-800">You have unsaved changes</span>
          </div>
        </div>
      )}
    </div>
  );
}
