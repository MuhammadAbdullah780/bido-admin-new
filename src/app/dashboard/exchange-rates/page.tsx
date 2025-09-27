"use client";

import { useState } from "react";
import AdminCard from "@/components/admin-card";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Plus, Search, Edit, Trash2, TrendingUp, TrendingDown, DollarSign, Upload, Download } from "lucide-react";

// Mock data for exchange rates
const exchangeRates = [
  {
    id: 1,
    currencyPair: "USD/EUR",
    currentRate: 0.85,
    previousRate: 0.84,
    change: "+1.19%",
    trend: "up",
    lastUpdated: "2024-06-10 14:30:00",
    status: "active",
    effectiveDate: "2024-06-10"
  },
  {
    id: 2,
    currencyPair: "USD/GBP",
    currentRate: 0.79,
    previousRate: 0.80,
    change: "-1.25%",
    trend: "down",
    lastUpdated: "2024-06-10 14:25:00",
    status: "active",
    effectiveDate: "2024-06-10"
  },
  {
    id: 3,
    currencyPair: "USD/JPY",
    currentRate: 150.25,
    previousRate: 149.80,
    change: "+0.30%",
    trend: "up",
    lastUpdated: "2024-06-10 14:20:00",
    status: "active",
    effectiveDate: "2024-06-10"
  },
  {
    id: 4,
    currencyPair: "EUR/GBP",
    currentRate: 0.93,
    previousRate: 0.95,
    change: "-2.11%",
    trend: "down",
    lastUpdated: "2024-06-10 14:15:00",
    status: "active",
    effectiveDate: "2024-06-10"
  },
  {
    id: 5,
    currencyPair: "USD/CAD",
    currentRate: 1.37,
    previousRate: 1.36,
    change: "+0.74%",
    trend: "up",
    lastUpdated: "2024-06-10 14:10:00",
    status: "active",
    effectiveDate: "2024-06-10"
  },
  {
    id: 6,
    currencyPair: "USD/AUD",
    currentRate: 1.52,
    previousRate: 1.51,
    change: "+0.66%",
    trend: "up",
    lastUpdated: "2024-06-10 14:05:00",
    status: "inactive",
    effectiveDate: "2024-06-09"
  }
];

const currencies = [
  "USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF", "CNY", "INR", "BRL"
];

const rateHistory = [
  { date: "2024-06-01", rate: 0.84, pair: "USD/EUR" },
  { date: "2024-06-02", rate: 0.845, pair: "USD/EUR" },
  { date: "2024-06-03", rate: 0.83, pair: "USD/EUR" },
  { date: "2024-06-04", rate: 0.835, pair: "USD/EUR" },
  { date: "2024-06-05", rate: 0.84, pair: "USD/EUR" },
  { date: "2024-06-06", rate: 0.842, pair: "USD/EUR" },
  { date: "2024-06-07", rate: 0.838, pair: "USD/EUR" },
  { date: "2024-06-08", rate: 0.841, pair: "USD/EUR" },
  { date: "2024-06-09", rate: 0.84, pair: "USD/EUR" },
  { date: "2024-06-10", rate: 0.85, pair: "USD/EUR" }
];

export default function ExchangeRatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingRate, setEditingRate] = useState<any>(null);

  // Filter rates based on search and filters
  const filteredRates = exchangeRates.filter(rate => {
    const matchesSearch = rate.currencyPair.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || rate.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleEditRate = (rate: any) => {
    setEditingRate(rate);
    setIsEditModalOpen(true);
  };

  const handleDeleteRate = (rateId: number) => {
    console.log("Delete rate:", rateId);
  };

  const handleBulkUpdate = () => {
    console.log("Bulk update rates...");
  };

  const handleExportRates = () => {
    console.log("Export rates...");
  };

  const columns: JsonTableColumns<(typeof exchangeRates)[0]> = [
    { title: "Currency Pair", dataIndex: "currencyPair" },
    { 
      title: "Current Rate", 
      dataIndex: "currentRate",
      render: (item) => (
        <span className="font-mono text-lg font-semibold">{item.currentRate}</span>
      )
    },
    { 
      title: "Change", 
      dataIndex: "change",
      render: (item) => (
        <div className="flex items-center space-x-1">
          {item.trend === "up" ? (
            <TrendingUp className="h-4 w-4 text-green-500" />
          ) : (
            <TrendingDown className="h-4 w-4 text-red-500" />
          )}
          <span className={`font-medium ${
            item.trend === "up" ? "text-green-600" : "text-red-600"
          }`}>
            {item.change}
          </span>
        </div>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      render: (item) => (
        <Badge variant={item.status === "active" ? "default" : "secondary"}>
          {item.status}
        </Badge>
      )
    },
    { title: "Last Updated", dataIndex: "lastUpdated" },
    { title: "Effective Date", dataIndex: "effectiveDate" },
    {
      title: "Actions",
      dataIndex: "id",
      render: (item) => (
        <div className="flex space-x-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleEditRate(item)}
          >
            <Edit className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteRate(item.id)}
            className="text-red-600 hover:text-red-700"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Exchange Rate Settings</h1>
          <p className="text-gray-600 mt-1">Manage currency exchange rates and conversion settings</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleBulkUpdate}>
            <Upload className="h-4 w-4 mr-2" />
            Bulk Update
          </Button>
          <Button variant="outline" onClick={handleExportRates}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add New Rate
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Exchange Rate</DialogTitle>
              </DialogHeader>
              <RateForm onClose={() => setIsAddModalOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Active Rates</p>
              <p className="text-2xl font-bold text-green-600">
                {exchangeRates.filter(rate => rate.status === "active").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <TrendingUp className="h-8 w-8 text-blue-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Rising Rates</p>
              <p className="text-2xl font-bold text-blue-600">
                {exchangeRates.filter(rate => rate.trend === "up").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <TrendingDown className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Falling Rates</p>
              <p className="text-2xl font-bold text-red-600">
                {exchangeRates.filter(rate => rate.trend === "down").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border p-4">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-gray-500 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Total Pairs</p>
              <p className="text-2xl font-bold text-gray-900">
                {exchangeRates.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <AdminCard>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search currency pairs..."
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
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </AdminCard>

      {/* Exchange Rates Table */}
      <AdminCard title={`Exchange Rates (${filteredRates.length})`}>
        <div className="w-full overflow-x-auto">
          <JsonTable columns={columns} data={filteredRates} />
        </div>
      </AdminCard>

      {/* Rate History Chart */}
      <AdminCard title="Rate History - USD/EUR (Last 10 Days)">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">Rate changes over time</p>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">7D</Button>
              <Button variant="outline" size="sm">30D</Button>
              <Button variant="outline" size="sm">90D</Button>
            </div>
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Rate history chart would be displayed here</p>
              <p className="text-sm text-gray-400">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </AdminCard>

      {/* Edit Rate Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Exchange Rate</DialogTitle>
          </DialogHeader>
          <RateForm 
            rate={editingRate} 
            onClose={() => {
              setIsEditModalOpen(false);
              setEditingRate(null);
            }} 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Rate Form Component
function RateForm({ rate, onClose }: { rate?: any; onClose: () => void }) {
  const [formData, setFormData] = useState({
    fromCurrency: rate?.currencyPair?.split('/')[0] || "",
    toCurrency: rate?.currencyPair?.split('/')[1] || "",
    rate: rate?.currentRate?.toString() || "",
    effectiveDate: rate?.effectiveDate || "",
    status: rate?.status || "active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            From Currency
          </label>
          <Select value={formData.fromCurrency} onValueChange={(value) => setFormData({ ...formData, fromCurrency: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(currency => (
                <SelectItem key={currency} value={currency}>{currency}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            To Currency
          </label>
          <Select value={formData.toCurrency} onValueChange={(value) => setFormData({ ...formData, toCurrency: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              {currencies.map(currency => (
                <SelectItem key={currency} value={currency}>{currency}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Exchange Rate
        </label>
        <Input
          type="number"
          step="0.0001"
          value={formData.rate}
          onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
          placeholder="Enter exchange rate"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Effective Date
          </label>
          <Input
            type="date"
            value={formData.effectiveDate}
            onChange={(e) => setFormData({ ...formData, effectiveDate: e.target.value })}
            required
          />
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

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit">
          {rate ? "Update Rate" : "Create Rate"}
        </Button>
      </div>
    </form>
  );
}
