'use client';
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { MetricCard } from "@/components/stats-card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { 
  AlertTriangle, 
  DollarSign, 
  TrendingDown, 
  Users, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  AlertCircle,
  FileText,
  Calculator,
  Shield
} from "lucide-react";

type Props = {};

const fraudStats = [
  { title: "Total Auctions", value: "1,250" },
  { title: "Flagged Auctions", value: "23" },
  { title: "High Risk", value: "8" },
  { title: "Under Review", value: "15" },
  { title: "Resolved", value: "156" },
  { title: "Total Loss Prevented", value: "$45,250" },
];

// Sample auction fraud data
const auctionFrauds = [
  {
    id: 1,
    auctionId: "AUCT-2024-001",
    title: "Vintage Rolex Submariner",
    finalBid: 15000.00,
    totalPayments: 12000.00,
    paymentGap: 3000.00,
    gapPercentage: 20.0,
    riskLevel: "High",
    status: "Flagged",
    auctioneer: "John Smith",
    auctioneerEmail: "john.smith@example.com",
    bidder: "Mike Johnson",
    bidderEmail: "mike.johnson@example.com",
    auctionDate: "2024-01-15",
    paymentDeadline: "2024-01-22",
    flaggedAt: "2024-01-16 10:30:25",
    flaggedBy: "System",
    reviewNotes: null,
    resolution: null,
    resolvedAt: null,
    resolvedBy: null,
    paymentBreakdown: [
      { method: "Bank Transfer", amount: 8000.00, status: "Completed", date: "2024-01-16" },
      { method: "Credit Card", amount: 4000.00, status: "Pending", date: "2024-01-17" }
    ],
    alerts: [
      {
        type: "Financial Mismatch",
        message: "Payment gap exceeds 20% threshold",
        severity: "High",
        timestamp: "2024-01-16 10:30:25"
      }
    ]
  },
  {
    id: 2,
    auctionId: "AUCT-2024-002",
    title: "Antique Persian Rug",
    finalBid: 8500.00,
    totalPayments: 6800.00,
    paymentGap: 1700.00,
    gapPercentage: 20.0,
    riskLevel: "Medium",
    status: "Under Review",
    auctioneer: "Sarah Wilson",
    auctioneerEmail: "sarah.wilson@example.com",
    bidder: "David Brown",
    bidderEmail: "david.brown@example.com",
    auctionDate: "2024-01-14",
    paymentDeadline: "2024-01-21",
    flaggedAt: "2024-01-15 14:20:15",
    flaggedBy: "System",
    reviewNotes: "Payment partially received, investigating remaining amount",
    resolution: null,
    resolvedAt: null,
    resolvedBy: null,
    paymentBreakdown: [
      { method: "PayPal", amount: 6800.00, status: "Completed", date: "2024-01-15" }
    ],
    alerts: [
      {
        type: "Payment Gap",
        message: "20% payment gap detected",
        severity: "Medium",
        timestamp: "2024-01-15 14:20:15"
      }
    ]
  },
  {
    id: 3,
    auctionId: "AUCT-2024-003",
    title: "Modern Art Painting",
    finalBid: 25000.00,
    totalPayments: 20000.00,
    paymentGap: 5000.00,
    gapPercentage: 20.0,
    riskLevel: "High",
    status: "Resolved",
    auctioneer: "Emily Davis",
    auctioneerEmail: "emily.davis@example.com",
    bidder: "Robert Taylor",
    bidderEmail: "robert.taylor@example.com",
    auctionDate: "2024-01-10",
    paymentDeadline: "2024-01-17",
    flaggedAt: "2024-01-11 09:15:30",
    flaggedBy: "System",
    reviewNotes: "Payment gap resolved after follow-up with bidder",
    resolution: "Payment completed after reminder",
    resolvedAt: "2024-01-12 16:45:20",
    resolvedBy: "Admin User",
    paymentBreakdown: [
      { method: "Bank Transfer", amount: 20000.00, status: "Completed", date: "2024-01-11" },
      { method: "Bank Transfer", amount: 5000.00, status: "Completed", date: "2024-01-12" }
    ],
    alerts: [
      {
        type: "Financial Mismatch",
        message: "Payment gap exceeds 20% threshold",
        severity: "High",
        timestamp: "2024-01-11 09:15:30"
      },
      {
        type: "Resolution",
        message: "Payment gap resolved successfully",
        severity: "Info",
        timestamp: "2024-01-12 16:45:20"
      }
    ]
  },
  {
    id: 4,
    auctionId: "AUCT-2024-004",
    title: "Rare Coin Collection",
    finalBid: 12000.00,
    totalPayments: 9600.00,
    paymentGap: 2400.00,
    gapPercentage: 20.0,
    riskLevel: "Medium",
    status: "Flagged",
    auctioneer: "Lisa Anderson",
    auctioneerEmail: "lisa.anderson@example.com",
    bidder: "Michael Chen",
    bidderEmail: "michael.chen@example.com",
    auctionDate: "2024-01-13",
    paymentDeadline: "2024-01-20",
    flaggedAt: "2024-01-14 11:45:10",
    flaggedBy: "System",
    reviewNotes: null,
    resolution: null,
    resolvedAt: null,
    resolvedBy: null,
    paymentBreakdown: [
      { method: "Credit Card", amount: 9600.00, status: "Completed", date: "2024-01-14" }
    ],
    alerts: [
      {
        type: "Payment Gap",
        message: "20% payment gap detected",
        severity: "Medium",
        timestamp: "2024-01-14 11:45:10"
      }
    ]
  },
  {
    id: 5,
    auctionId: "AUCT-2024-005",
    title: "Vintage Guitar",
    finalBid: 5500.00,
    totalPayments: 4400.00,
    paymentGap: 1100.00,
    gapPercentage: 20.0,
    riskLevel: "Low",
    status: "Under Review",
    auctioneer: "Tom Wilson",
    auctioneerEmail: "tom.wilson@example.com",
    bidder: "Jennifer Lee",
    bidderEmail: "jennifer.lee@example.com",
    auctionDate: "2024-01-12",
    paymentDeadline: "2024-01-19",
    flaggedAt: "2024-01-13 08:30:45",
    flaggedBy: "System",
    reviewNotes: "Contacting bidder for remaining payment",
    resolution: null,
    resolvedAt: null,
    resolvedBy: null,
    paymentBreakdown: [
      { method: "Bank Transfer", amount: 4400.00, status: "Completed", date: "2024-01-13" }
    ],
    alerts: [
      {
        type: "Payment Gap",
        message: "20% payment gap detected",
        severity: "Low",
        timestamp: "2024-01-13 08:30:45"
      }
    ]
  }
];

const page = (props: Props) => {
  const [fraudData, setFraudData] = useState(auctionFrauds);
  const [selectedFraud, setSelectedFraud] = useState<(typeof auctionFrauds)[0] | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertRecipients, setAlertRecipients] = useState<string[]>([]);
  const [reviewNotes, setReviewNotes] = useState("");
  const [resolution, setResolution] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "flagged" | "review" | "resolved">("all");

  // Filter data based on active tab
  const filteredData = fraudData.filter(fraud => {
    if (activeTab === "all") return true;
    if (activeTab === "flagged") return fraud.status === "Flagged";
    if (activeTab === "review") return fraud.status === "Under Review";
    if (activeTab === "resolved") return fraud.status === "Resolved";
    return true;
  });

  const handleViewDetails = (fraud: (typeof auctionFrauds)[0]) => {
    setSelectedFraud(fraud);
    setIsDetailsOpen(true);
  };

  const handleSendAlert = (fraud: (typeof auctionFrauds)[0]) => {
    setSelectedFraud(fraud);
    setAlertRecipients([fraud.auctioneerEmail, fraud.bidderEmail]);
    setIsAlertModalOpen(true);
  };

  const handleConfirmAlert = () => {
    if (!alertMessage.trim()) {
      alert("Please provide an alert message.");
      return;
    }

    // Simulate sending alert
    console.log("Alert sent:", {
      recipients: alertRecipients,
      message: alertMessage,
      auctionId: selectedFraud?.auctionId
    });

    setAlertMessage("");
    setAlertRecipients([]);
    setIsAlertModalOpen(false);
  };

  const handleMarkAsReviewed = (fraudId: number) => {
    setFraudData(prev => 
      prev.map(fraud => 
        fraud.id === fraudId 
          ? { 
              ...fraud, 
              status: "Under Review",
              reviewNotes: reviewNotes || "Marked for review",
              alerts: [
                ...fraud.alerts,
                {
                  type: "Review",
                  message: "Auction marked for review",
                  severity: "Info",
                  timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
                }
              ]
            } as typeof fraud
          : fraud
      )
    );
    setReviewNotes("");
    setIsDetailsOpen(false);
  };

  const handleResolveFraud = (fraudId: number) => {
    if (!resolution.trim()) {
      alert("Please provide a resolution note.");
      return;
    }

    setFraudData(prev => 
      prev.map(fraud => 
        fraud.id === fraudId 
          ? { 
              ...fraud, 
              status: "Resolved",
              resolution: resolution,
              resolvedAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
              resolvedBy: "Current Admin",
              alerts: [
                ...fraud.alerts,
                {
                  type: "Resolution",
                  message: `Resolved: ${resolution}`,
                  severity: "Info",
                  timestamp: new Date().toISOString().slice(0, 19).replace('T', ' ')
                }
              ]
            } as typeof fraud
          : fraud
      )
    );
    setResolution("");
    setIsDetailsOpen(false);
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel) {
      case "High": return "text-red-600 bg-red-50 border-red-200";
      case "Medium": return "text-yellow-600 bg-yellow-50 border-yellow-200";
      case "Low": return "text-green-600 bg-green-50 border-green-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "High": return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case "Medium": return <AlertCircle className="w-4 h-4 text-yellow-500" />;
      case "Low": return <Clock className="w-4 h-4 text-green-500" />;
      default: return <FileText className="w-4 h-4 text-blue-500" />;
    }
  };

  // Define columns for the JsonTable
  const fraudColumns: JsonTableColumns<(typeof auctionFrauds)[0]> = [
    { title: "Auction ID", dataIndex: "auctionId", width: 120 },
    { title: "Title", dataIndex: "title", width: 200 },
    { 
      title: "Risk Level", 
      dataIndex: "riskLevel",
      width: 120,
      render: (fraud) => (
        <Badge 
          variant={
            fraud.riskLevel === "High" ? "destructive" : 
            fraud.riskLevel === "Medium" ? "secondary" : 
            "outline"
          }
          className="flex items-center gap-1"
        >
          <AlertTriangle className="w-3 h-3" />
          {fraud.riskLevel}
        </Badge>
      )
    },
    { 
      title: "Status", 
      dataIndex: "status",
      width: 120,
      render: (fraud) => (
        <Badge 
          variant={
            fraud.status === "Flagged" ? "destructive" : 
            fraud.status === "Under Review" ? "secondary" : 
            "default"
          }
        >
          {fraud.status}
        </Badge>
      )
    },
    { 
      title: "Final Bid", 
      dataIndex: "finalBid",
      width: 120,
      render: (fraud) => (
        <span className="font-medium text-green-600">
          ${fraud.finalBid.toLocaleString()}
        </span>
      )
    },
    { 
      title: "Payments", 
      dataIndex: "totalPayments",
      width: 120,
      render: (fraud) => (
        <span className="font-medium text-blue-600">
          ${fraud.totalPayments.toLocaleString()}
        </span>
      )
    },
    { 
      title: "Gap", 
      dataIndex: "paymentGap",
      width: 100,
      render: (fraud) => (
        <span className="font-medium text-red-600">
          ${fraud.paymentGap.toLocaleString()}
        </span>
      )
    },
    { 
      title: "Gap %", 
      dataIndex: "gapPercentage",
      width: 80,
      render: (fraud) => (
        <span className="font-medium text-orange-600">
          {fraud.gapPercentage}%
        </span>
      )
    },
    { title: "Auctioneer", dataIndex: "auctioneer", width: 150 },
    { title: "Bidder", dataIndex: "bidder", width: 150 },
    { title: "Flagged Date", dataIndex: "flaggedAt", width: 150 },
    { 
      title: "Actions", 
      dataIndex: "id",
      width: 200,
      render: (fraud) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleViewDetails(fraud)}
          >
            <Eye className="w-4 h-4 mr-1" />
            Review
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleSendAlert(fraud)}
          >
            <AlertCircle className="w-4 h-4 mr-1" />
            Alert
          </Button>
        </div>
      )
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex items-center gap-3">
        <Shield className="w-8 h-8 text-red-500" />
        <h1 className="text-3xl font-medium">Auction Frauds Detection</h1>
      </div>

      {/* Alert Banner */}
      <Alert className="border-red-200 bg-red-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertTitle className="text-red-800">Fraud Detection Active</AlertTitle>
        <AlertDescription className="text-red-700">
          System is monitoring auctions for financial mismatches. Auctions with payment gaps exceeding 20% are automatically flagged.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-2 gap-5">
        {fraudStats.map((stat) => (
          <MetricCard
            className="col-span-1"
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      {/* Filter Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">All ({fraudData.length})</TabsTrigger>
          <TabsTrigger value="flagged">Flagged ({fraudData.filter(f => f.status === "Flagged").length})</TabsTrigger>
          <TabsTrigger value="review">Under Review ({fraudData.filter(f => f.status === "Under Review").length})</TabsTrigger>
          <TabsTrigger value="resolved">Resolved ({fraudData.filter(f => f.status === "Resolved").length})</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-6">
          <JsonTable 
            columns={fraudColumns} 
            data={filteredData} 
            enableSelection={false}
          />
        </TabsContent>
      </Tabs>

      {/* Fraud Details Modal */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              Fraud Review - {selectedFraud?.auctionId}
            </DialogTitle>
            <DialogDescription>
              Review auction details and take appropriate action
            </DialogDescription>
          </DialogHeader>
          
          {selectedFraud && (
            <div className="space-y-6">
              {/* Risk Assessment */}
              <Card className={getRiskColor(selectedFraud.riskLevel)}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="w-5 h-5" />
                    Risk Assessment
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-sm font-medium">Final Bid Amount</Label>
                      <p className="text-2xl font-bold text-green-600">
                        ${selectedFraud.finalBid.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Total Payments</Label>
                      <p className="text-2xl font-bold text-blue-600">
                        ${selectedFraud.totalPayments.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Payment Gap</Label>
                      <p className="text-2xl font-bold text-red-600">
                        ${selectedFraud.paymentGap.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <Label className="text-sm font-medium">Gap Percentage</Label>
                      <p className="text-2xl font-bold text-orange-600">
                        {selectedFraud.gapPercentage}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Payment Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedFraud.paymentBreakdown.map((payment, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{payment.method}</p>
                          <p className="text-sm text-gray-600">{payment.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">${payment.amount.toLocaleString()}</p>
                          <Badge variant={payment.status === "Completed" ? "default" : "secondary"}>
                            {payment.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Auction Details */}
              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Auctioneer Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{selectedFraud.auctioneer}</p>
                    <p className="text-sm text-gray-600">{selectedFraud.auctioneerEmail}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Bidder Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">{selectedFraud.bidder}</p>
                    <p className="text-sm text-gray-600">{selectedFraud.bidderEmail}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Alerts */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {selectedFraud.alerts.map((alert, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        {getSeverityIcon(alert.severity)}
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <p className="font-medium">{alert.type}</p>
                            <p className="text-sm text-gray-500">{alert.timestamp}</p>
                          </div>
                          <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Review Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Review Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="review-notes">Review Notes</Label>
                    <Textarea
                      id="review-notes"
                      placeholder="Add your review notes here..."
                      value={reviewNotes}
                      onChange={(e) => setReviewNotes(e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  
                  {selectedFraud.status === "Flagged" && (
                    <div>
                      <Label htmlFor="resolution">Resolution Notes</Label>
                      <Textarea
                        id="resolution"
                        placeholder="Describe how this fraud case was resolved..."
                        value={resolution}
                        onChange={(e) => setResolution(e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
            {selectedFraud?.status === "Flagged" && (
              <Button
                variant="secondary"
                onClick={() => selectedFraud && handleMarkAsReviewed(selectedFraud.id)}
              >
                <Clock className="w-4 h-4 mr-2" />
                Mark for Review
              </Button>
            )}
            {selectedFraud?.status === "Under Review" && (
              <Button
                onClick={() => selectedFraud && handleResolveFraud(selectedFraud.id)}
                disabled={!resolution.trim()}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Resolve Case
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Alert Modal */}
      <Dialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send Alert</DialogTitle>
            <DialogDescription>
              Send an alert to auctioneer and bidder about this flagged auction.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="alert-message">Alert Message</Label>
              <Textarea
                id="alert-message"
                placeholder="Enter the alert message..."
                value={alertMessage}
                onChange={(e) => setAlertMessage(e.target.value)}
                className="mt-1"
              />
            </div>
            
            <div>
              <Label>Recipients</Label>
              <div className="mt-2 space-y-2">
                {alertRecipients.map((email, index) => (
                  <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span className="text-sm">{email}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAlertModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAlert} disabled={!alertMessage.trim()}>
              Send Alert
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
