'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  Plus,
  Edit,
  Trash2,
  CreditCard,
  Banknote,
  Receipt
} from "lucide-react";

interface PaymentMilestoneProps {
  auctionId: string;
  finalBid: number;
  currency: string;
  milestones: PaymentMilestone[];
  onAddMilestone: (milestone: Omit<PaymentMilestone, 'id'>) => void;
  onUpdateMilestone: (id: string, milestone: Partial<PaymentMilestone>) => void;
  onDeleteMilestone: (id: string) => void;
  onConfirmPayment: (milestoneId: string, paymentData: PaymentData) => void;
}

interface PaymentMilestone {
  id: string;
  type: 'deposit' | 'partial' | 'final';
  amount: number;
  percentage: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  description: string;
  paymentMethod?: string;
  paidDate?: string;
  notes?: string;
}

interface PaymentData {
  amount: number;
  method: string;
  transactionId: string;
  notes: string;
}

const milestoneTypes = [
  { value: 'deposit', label: 'Deposit', icon: Banknote, color: 'bg-blue-100 text-blue-800' },
  { value: 'partial', label: 'Partial Payment', icon: DollarSign, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'final', label: 'Final Payment', icon: CheckCircle, color: 'bg-green-100 text-green-800' }
];

const paymentMethods = [
  'Credit Card',
  'Bank Transfer',
  'PayPal',
  'Cryptocurrency',
  'Wire Transfer',
  'Check',
  'Cash'
];

export default function PaymentMilestone({
  auctionId,
  finalBid,
  currency,
  milestones,
  onAddMilestone,
  onUpdateMilestone,
  onDeleteMilestone,
  onConfirmPayment
}: PaymentMilestoneProps) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedMilestone, setSelectedMilestone] = useState<PaymentMilestone | null>(null);
  const [milestoneData, setMilestoneData] = useState({
    type: 'deposit' as 'deposit' | 'partial' | 'final',
    amount: '',
    percentage: '',
    dueDate: '',
    description: '',
    notes: ''
  });
  const [paymentData, setPaymentData] = useState({
    amount: '',
    method: '',
    transactionId: '',
    notes: ''
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Clock className="h-4 w-4 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const calculateTotalPaid = () => {
    return milestones
      .filter(m => m.status === 'paid')
      .reduce((sum, m) => sum + m.amount, 0);
  };

  const calculateRemainingAmount = () => {
    return finalBid - calculateTotalPaid();
  };

  const handleAddMilestone = () => {
    if (!milestoneData.amount || !milestoneData.dueDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const amount = parseFloat(milestoneData.amount);
    const percentage = parseFloat(milestoneData.percentage);

    onAddMilestone({
      type: milestoneData.type,
      amount,
      percentage,
      dueDate: milestoneData.dueDate,
      status: 'pending',
      description: milestoneData.description,
      notes: milestoneData.notes
    });

    setMilestoneData({
      type: 'deposit',
      amount: '',
      percentage: '',
      dueDate: '',
      description: '',
      notes: ''
    });
    setIsAddModalOpen(false);
  };

  const handleEditMilestone = (milestone: PaymentMilestone) => {
    setSelectedMilestone(milestone);
    setMilestoneData({
      type: milestone.type,
      amount: milestone.amount.toString(),
      percentage: milestone.percentage.toString(),
      dueDate: milestone.dueDate,
      description: milestone.description,
      notes: milestone.notes || ''
    });
    setIsEditModalOpen(true);
  };

  const handleUpdateMilestone = () => {
    if (!selectedMilestone || !milestoneData.amount || !milestoneData.dueDate) {
      alert('Please fill in all required fields.');
      return;
    }

    const amount = parseFloat(milestoneData.amount);
    const percentage = parseFloat(milestoneData.percentage);

    onUpdateMilestone(selectedMilestone.id, {
      type: milestoneData.type,
      amount,
      percentage,
      dueDate: milestoneData.dueDate,
      description: milestoneData.description,
      notes: milestoneData.notes
    });

    setSelectedMilestone(null);
    setMilestoneData({
      type: 'deposit',
      amount: '',
      percentage: '',
      dueDate: '',
      description: '',
      notes: ''
    });
    setIsEditModalOpen(false);
  };

  const handleConfirmPayment = (milestone: PaymentMilestone) => {
    setSelectedMilestone(milestone);
    setPaymentData({
      amount: milestone.amount.toString(),
      method: '',
      transactionId: '',
      notes: ''
    });
    setIsPaymentModalOpen(true);
  };

  const handleProcessPayment = () => {
    if (!selectedMilestone || !paymentData.amount || !paymentData.method) {
      alert('Please fill in all required fields.');
      return;
    }

    onConfirmPayment(selectedMilestone.id, {
      amount: parseFloat(paymentData.amount),
      method: paymentData.method,
      transactionId: paymentData.transactionId,
      notes: paymentData.notes
    });

    setSelectedMilestone(null);
    setPaymentData({
      amount: '',
      method: '',
      transactionId: '',
      notes: ''
    });
    setIsPaymentModalOpen(false);
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date() && !milestones.find(m => m.dueDate === dueDate)?.status === 'paid';
  };

  return (
    <div className="space-y-6">
      {/* Payment Summary */}
      <div className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <h3 className="text-lg font-semibold mb-2 sm:mb-0">Payment Milestones - {auctionId}</h3>
          <Button onClick={() => setIsAddModalOpen(true)} className="w-full sm:w-auto">
            <Plus className="h-4 w-4 mr-2" />
            Add Milestone
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Final Bid</span>
              <DollarSign className="h-4 w-4 text-gray-400" />
            </div>
            <p className="text-xl font-semibold">{formatCurrency(finalBid)}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Total Paid</span>
              <CheckCircle className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-xl font-semibold text-green-600">{formatCurrency(calculateTotalPaid())}</p>
          </div>
          <div className="bg-red-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Remaining</span>
              <AlertCircle className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-xl font-semibold text-red-600">{formatCurrency(calculateRemainingAmount())}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${(calculateTotalPaid() / finalBid) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600 text-center">
          {((calculateTotalPaid() / finalBid) * 100).toFixed(1)}% Complete
        </p>
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {milestones.map((milestone) => {
          const milestoneType = milestoneTypes.find(t => t.type === milestone.type);
          const IconComponent = milestoneType?.icon || DollarSign;
          const isOverdueMilestone = isOverdue(milestone.dueDate);

          return (
            <div key={milestone.id} className="bg-white rounded-lg shadow-sm border p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
                <div className="flex items-center gap-3 mb-2 sm:mb-0">
                  <IconComponent className="h-5 w-5 text-gray-500" />
                  <div>
                    <h4 className="font-semibold">{milestoneType?.label}</h4>
                    <p className="text-sm text-gray-600">{milestone.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusIcon(milestone.status)}
                  <Badge className={getStatusColor(milestone.status)}>
                    {milestone.status}
                  </Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <span className="text-sm text-gray-600">Amount</span>
                  <p className="font-semibold">{formatCurrency(milestone.amount)}</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Percentage</span>
                  <p className="font-semibold">{milestone.percentage}%</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Due Date</span>
                  <p className="font-semibold flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {milestone.dueDate}
                    {isOverdueMilestone && <AlertCircle className="h-4 w-4 text-red-500" />}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Payment Method</span>
                  <p className="font-semibold">{milestone.paymentMethod || 'Not specified'}</p>
                </div>
              </div>

              {milestone.notes && (
                <div className="mb-4">
                  <span className="text-sm text-gray-600">Notes</span>
                  <p className="text-sm text-gray-800">{milestone.notes}</p>
                </div>
              )}

              <div className="flex flex-wrap gap-2">
                {milestone.status === 'pending' && (
                  <Button
                    onClick={() => handleConfirmPayment(milestone)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Confirm Payment
                  </Button>
                )}
                <Button
                  onClick={() => handleEditMilestone(milestone)}
                  variant="outline"
                  size="sm"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button
                  onClick={() => onDeleteMilestone(milestone.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Milestone Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Add Payment Milestone
            </DialogTitle>
            <DialogDescription>
              Create a new payment milestone for auction {auctionId}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type *</label>
                <Select value={milestoneData.type} onValueChange={(value) => setMilestoneData(prev => ({ ...prev, type: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {milestoneTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Percentage (%)</label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="e.g., 25"
                  value={milestoneData.percentage}
                  onChange={(e) => setMilestoneData(prev => ({ ...prev, percentage: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount ($) *</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter amount"
                value={milestoneData.amount}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date *</label>
              <Input
                type="date"
                value={milestoneData.dueDate}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Brief description of this milestone"
                value={milestoneData.description}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Additional notes..."
                value={milestoneData.notes}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddMilestone}>
              <Plus className="w-4 h-4 mr-2" />
              Add Milestone
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Milestone Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="w-5 h-5" />
              Edit Payment Milestone
            </DialogTitle>
            <DialogDescription>
              Update milestone details for auction {auctionId}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Type *</label>
                <Select value={milestoneData.type} onValueChange={(value) => setMilestoneData(prev => ({ ...prev, type: value as any }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {milestoneTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Percentage (%)</label>
                <Input
                  type="number"
                  step="0.01"
                  min="0"
                  max="100"
                  placeholder="e.g., 25"
                  value={milestoneData.percentage}
                  onChange={(e) => setMilestoneData(prev => ({ ...prev, percentage: e.target.value }))}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount ($) *</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter amount"
                value={milestoneData.amount}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Due Date *</label>
              <Input
                type="date"
                value={milestoneData.dueDate}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Input
                placeholder="Brief description of this milestone"
                value={milestoneData.description}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Additional notes..."
                value={milestoneData.notes}
                onChange={(e) => setMilestoneData(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateMilestone}>
              <Edit className="w-4 h-4 mr-2" />
              Update Milestone
            </Button>
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
              Process payment for milestone: {selectedMilestone?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Amount ($) *</label>
              <Input
                type="number"
                step="0.01"
                min="0"
                placeholder="Enter payment amount"
                value={paymentData.amount}
                onChange={(e) => setPaymentData(prev => ({ ...prev, amount: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method *</label>
              <Select value={paymentData.method} onValueChange={(value) => setPaymentData(prev => ({ ...prev, method: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  {paymentMethods.map((method) => (
                    <SelectItem key={method} value={method}>
                      {method}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Transaction ID</label>
              <Input
                placeholder="Enter transaction reference"
                value={paymentData.transactionId}
                onChange={(e) => setPaymentData(prev => ({ ...prev, transactionId: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Notes</label>
              <Textarea
                placeholder="Payment notes..."
                value={paymentData.notes}
                onChange={(e) => setPaymentData(prev => ({ ...prev, notes: e.target.value }))}
                className="min-h-[80px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPaymentModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProcessPayment} disabled={!paymentData.amount || !paymentData.method}>
              <CheckCircle className="w-4 h-4 mr-2" />
              Confirm Payment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
