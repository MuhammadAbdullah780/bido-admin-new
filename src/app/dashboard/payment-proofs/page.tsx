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
} from "@/components/ui/dialog";
import { useState } from "react";
import { ChevronDown, ChevronUp, Download, Eye, FileText, Image, X, Check, Clock, AlertCircle } from "lucide-react";

type Props = {};

const paymentProofStats = [
  { title: "Total Proofs", value: "156" },
  { title: "Pending Review", value: "23" },
  { title: "Approved", value: "118" },
  { title: "Rejected", value: "15" },
  { title: "Total Amount", value: "$45,250" },
  { title: "Today's Submissions", value: "8" },
];

// Sample payment proof data
const paymentProofs = [
  {
    id: 1,
    auctionId: "AUCT-2024-001",
    userId: "USR001",
    userName: "John Doe",
    userEmail: "john.doe@example.com",
    submissionDate: "2024-01-15 14:30:25",
    paymentAmount: 1250.0,
    currency: "USD",
    documentType: "Bank Transfer Receipt",
    documentUrl: "/documents/payment-proof-1.pdf",
    documentName: "bank_transfer_receipt_001.pdf",
    status: "Pending",
    submittedAt: "2024-01-15 14:30:25",
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
    history: [
      {
        action: "Submitted",
        timestamp: "2024-01-15 14:30:25",
        user: "John Doe",
        details: "Payment proof document uploaded",
      },
    ],
  },
  {
    id: 2,
    auctionId: "AUCT-2024-002",
    userId: "USR002",
    userName: "Jane Smith",
    userEmail: "jane.smith@example.com",
    submissionDate: "2024-01-15 12:15:10",
    paymentAmount: 850.0,
    currency: "USD",
    documentType: "Credit Card Statement",
    documentUrl: "/documents/payment-proof-2.jpg",
    documentName: "credit_card_statement_002.jpg",
    status: "Approved",
    submittedAt: "2024-01-15 12:15:10",
    reviewedAt: "2024-01-15 13:45:30",
    reviewedBy: "Admin User",
    rejectionReason: null,
    history: [
      {
        action: "Submitted",
        timestamp: "2024-01-15 12:15:10",
        user: "Jane Smith",
        details: "Payment proof document uploaded",
      },
      {
        action: "Approved",
        timestamp: "2024-01-15 13:45:30",
        user: "Admin User",
        details: "Payment proof verified and approved",
      },
    ],
  },
  {
    id: 3,
    auctionId: "AUCT-2024-003",
    userId: "USR003",
    userName: "Mike Johnson",
    userEmail: "mike.johnson@example.com",
    submissionDate: "2024-01-15 10:20:45",
    paymentAmount: 2100.0,
    currency: "USD",
    documentType: "Bank Transfer Receipt",
    documentUrl: "/documents/payment-proof-3.pdf",
    documentName: "bank_transfer_receipt_003.pdf",
    status: "Rejected",
    submittedAt: "2024-01-15 10:20:45",
    reviewedAt: "2024-01-15 11:30:15",
    reviewedBy: "Admin User",
    rejectionReason: "Document is unclear and payment amount does not match",
    history: [
      {
        action: "Submitted",
        timestamp: "2024-01-15 10:20:45",
        user: "Mike Johnson",
        details: "Payment proof document uploaded",
      },
      {
        action: "Rejected",
        timestamp: "2024-01-15 11:30:15",
        user: "Admin User",
        details: "Document is unclear and payment amount does not match",
      },
    ],
  },
  {
    id: 4,
    auctionId: "AUCT-2024-004",
    userId: "USR004",
    userName: "Sarah Wilson",
    userEmail: "sarah.wilson@example.com",
    submissionDate: "2024-01-15 09:15:30",
    paymentAmount: 675.5,
    currency: "USD",
    documentType: "PayPal Receipt",
    documentUrl: "/documents/payment-proof-4.png",
    documentName: "paypal_receipt_004.png",
    status: "Pending",
    submittedAt: "2024-01-15 09:15:30",
    reviewedAt: null,
    reviewedBy: null,
    rejectionReason: null,
    history: [
      {
        action: "Submitted",
        timestamp: "2024-01-15 09:15:30",
        user: "Sarah Wilson",
        details: "Payment proof document uploaded",
      },
    ],
  },
  {
    id: 5,
    auctionId: "AUCT-2024-005",
    userId: "USR005",
    userName: "David Brown",
    userEmail: "david.brown@example.com",
    submissionDate: "2024-01-14 16:45:20",
    paymentAmount: 3200.0,
    currency: "USD",
    documentType: "Bank Transfer Receipt",
    documentUrl: "/documents/payment-proof-5.pdf",
    documentName: "bank_transfer_receipt_005.pdf",
    status: "Approved",
    submittedAt: "2024-01-14 16:45:20",
    reviewedAt: "2024-01-14 17:20:10",
    reviewedBy: "Admin User",
    rejectionReason: null,
    history: [
      {
        action: "Submitted",
        timestamp: "2024-01-14 16:45:20",
        user: "David Brown",
        details: "Payment proof document uploaded",
      },
      {
        action: "Approved",
        timestamp: "2024-01-14 17:20:10",
        user: "Admin User",
        details: "Payment proof verified and approved",
      },
    ],
  },
  {
    id: 6,
    auctionId: "AUCT-2024-006",
    userId: "USR006",
    userName: "Emily Davis",
    userEmail: "emily.davis@example.com",
    submissionDate: "2024-01-14 14:30:15",
    paymentAmount: 450.75,
    currency: "USD",
    documentType: "Credit Card Statement",
    documentUrl: "/documents/payment-proof-6.jpg",
    documentName: "credit_card_statement_006.jpg",
    status: "Rejected",
    submittedAt: "2024-01-14 14:30:15",
    reviewedAt: "2024-01-14 15:10:45",
    reviewedBy: "Admin User",
    rejectionReason: "Incomplete document - missing transaction details",
    history: [
      {
        action: "Submitted",
        timestamp: "2024-01-14 14:30:15",
        user: "Emily Davis",
        details: "Payment proof document uploaded",
      },
      {
        action: "Rejected",
        timestamp: "2024-01-14 15:10:45",
        user: "Admin User",
        details: "Incomplete document - missing transaction details",
      },
    ],
  },
];

// Define columns for the JsonTable
const proofColumns: JsonTableColumns<(typeof paymentProofs)[number]> = [
  { title: "Auction ID", dataIndex: "auctionId", width: 120 },
  { title: "User", dataIndex: "userName", width: 150 },
  { title: "Email", dataIndex: "userEmail", width: 200 },
  {
    title: "Status",
    dataIndex: "status",
    width: 120,
    render: (proof) => (
      <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          proof.status === "Approved"
            ? "bg-green-100 text-green-800"
            : proof.status === "Rejected"
            ? "bg-red-100 text-red-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {proof.status}
      </span>
    ),
  },
  {
    title: "Amount",
    dataIndex: "paymentAmount",
    width: 120,
    render: (proof) => (
      <span className="font-medium text-green-600">
        ${proof.paymentAmount.toFixed(2)} {proof.currency}
      </span>
    ),
  },
  { title: "Document Type", dataIndex: "documentType", width: 150 },
  { title: "Submitted", dataIndex: "submissionDate", width: 150 },
  { title: "Reviewed By", dataIndex: "reviewedBy", width: 120 },
  {
    title: "Actions",
    dataIndex: "id",
    width: 200,
    render: (proof) => (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleViewDocument(proof)}
        >
          <Eye className="w-4 h-4 mr-1" />
          View
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleDownloadDocument(proof)}
        >
          <Download className="w-4 h-4 mr-1" />
          Download
        </Button>
      </div>
    ),
  },
];

// These handlers must be defined before use in proofColumns
let handleViewDocument: (proof: (typeof paymentProofs)[number]) => void;
let handleDownloadDocument: (proof: (typeof paymentProofs)[number]) => void;

const Page = (props: Props) => {
  const [proofData, setProofData] = useState<typeof paymentProofs>(paymentProofs);
  // const [selectedProofs, setSelectedProofs] = useState<string[]>([]); // unused
  const [activeTab, setActiveTab] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedProof, setSelectedProof] = useState<(typeof paymentProofs)[number] | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [pendingRejectProof, setPendingRejectProof] = useState<(typeof paymentProofs)[number] | null>(null);
  const [expandedHistory, setExpandedHistory] = useState<number | null>(null);

  // Filter data based on active tab
  const filteredData = proofData.filter((proof) => {
    if (activeTab === "all") return true;
    return proof.status.toLowerCase() === activeTab;
  });

  handleViewDocument = (proof: (typeof paymentProofs)[number]) => {
    setSelectedProof(proof);
    setIsViewerOpen(true);
  };

  handleDownloadDocument = (proof: (typeof paymentProofs)[number]) => {
    // Simulate download
    const link = document.createElement("a");
    link.href = proof.documentUrl;
    link.download = proof.documentName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleApproveProof = (proofId: number) => {
    setProofData((prev) =>
      prev.map((proof) =>
        proof.id === proofId
          ? {
              ...proof,
              status: "Approved",
              reviewedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
              reviewedBy: "Current Admin",
              history: [
                ...proof.history,
                {
                  action: "Approved",
                  timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
                  user: "Current Admin",
                  details: "Payment proof verified and approved",
                },
              ],
            }
          : proof
      )
    );
    setIsViewerOpen(false);
  };

  const handleRejectProof = (proof: (typeof paymentProofs)[number]) => {
    setPendingRejectProof(proof);
    setIsRejectModalOpen(true);
  };

  const handleConfirmReject = () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a reason for rejection.");
      return;
    }

    if (pendingRejectProof) {
      setProofData((prev) =>
        prev.map((proof) =>
          proof.id === pendingRejectProof.id
            ? {
                ...proof,
                status: "Rejected",
                reviewedAt: new Date().toISOString().slice(0, 19).replace("T", " "),
                reviewedBy: "Current Admin",
                rejectionReason: rejectionReason,
                history: [
                  ...proof.history,
                  {
                    action: "Rejected",
                    timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
                    user: "Current Admin",
                    details: rejectionReason,
                  },
                ],
              }
            : proof
        )
      );
    }

    setRejectionReason("");
    setPendingRejectProof(null);
    setIsRejectModalOpen(false);
    setIsViewerOpen(false);
  };

  const handleCancelReject = () => {
    setRejectionReason("");
    setPendingRejectProof(null);
    setIsRejectModalOpen(false);
  };

  const getDocumentIcon = (documentType: string) => {
    if (documentType.toLowerCase().includes("pdf"))
      return <FileText className="w-5 h-5 text-red-500" />;
    if (
      documentType.toLowerCase().includes("statement") ||
      documentType.toLowerCase().includes("receipt")
    )
      return <Image className="w-5 h-5 text-blue-500" />;
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
        return <Check className="w-4 h-4 text-green-600" />;
      case "Rejected":
        return <X className="w-4 h-4 text-red-600" />;
      case "Pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-medium">Payment Proofs</h1>

      <div className="grid grid-cols-2 gap-5">
        {paymentProofStats.map((stat) => (
          <MetricCard
            className="col-span-1"
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      {/* Status Filter Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
        {[
          { key: "all", label: "All", count: proofData.length },
          {
            key: "pending",
            label: "Pending",
            count: proofData.filter((p) => p.status === "Pending").length,
          },
          {
            key: "approved",
            label: "Approved",
            count: proofData.filter((p) => p.status === "Approved").length,
          },
          {
            key: "rejected",
            label: "Rejected",
            count: proofData.filter((p) => p.status === "Rejected").length,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as "all" | "pending" | "approved" | "rejected")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
            type="button"
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      <JsonTable columns={proofColumns} data={filteredData} enableSelection={false} />

      {/* Document Viewer Modal */}
      <Dialog open={isViewerOpen} onOpenChange={setIsViewerOpen}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {selectedProof && getDocumentIcon(selectedProof.documentType)}
              Payment Proof Review - {selectedProof?.auctionId}
            </DialogTitle>
          </DialogHeader>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-h-[70vh] overflow-y-auto">
            {/* Document Viewer */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Document Viewer</h3>
              <div className="border rounded-lg p-4 bg-gray-50 min-h-[400px] flex items-center justify-center">
                <div className="text-center">
                  {getDocumentIcon(selectedProof?.documentType || "")}
                  <p className="mt-2 text-sm text-gray-600">
                    {selectedProof?.documentName}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click download to view the actual document
                  </p>
                  <Button
                    className="mt-4"
                    onClick={() => selectedProof && handleDownloadDocument(selectedProof)}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Document
                  </Button>
                </div>
              </div>
            </div>

            {/* Details Panel */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Payment Details</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-gray-600">Auction ID:</span>
                    <p className="font-mono">{selectedProof?.auctionId}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Status:</span>
                    <div className="flex items-center gap-2 mt-1">
                      {selectedProof && getStatusIcon(selectedProof.status)}
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          selectedProof?.status === "Approved"
                            ? "bg-green-100 text-green-800"
                            : selectedProof?.status === "Rejected"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {selectedProof?.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">User:</span>
                    <p>{selectedProof?.userName}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Email:</span>
                    <p className="text-xs">{selectedProof?.userEmail}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Amount:</span>
                    <p className="font-semibold text-green-600">
                      {selectedProof
                        ? `$${selectedProof.paymentAmount.toFixed(2)} ${selectedProof.currency}`
                        : ""}
                    </p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Document Type:</span>
                    <p>{selectedProof?.documentType}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Submitted:</span>
                    <p>{selectedProof?.submissionDate}</p>
                  </div>
                  <div>
                    <span className="font-medium text-gray-600">Reviewed By:</span>
                    <p>{selectedProof?.reviewedBy || "Not reviewed"}</p>
                  </div>
                </div>

                {selectedProof?.rejectionReason && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                    <span className="font-medium text-red-800">Rejection Reason:</span>
                    <p className="text-sm text-red-700 mt-1">{selectedProof.rejectionReason}</p>
                  </div>
                )}

                {/* History Log */}
                <div className="mt-6">
                  <button
                    onClick={() =>
                      setExpandedHistory(
                        expandedHistory === selectedProof?.id
                          ? null
                          : selectedProof?.id ?? null
                      )
                    }
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                    type="button"
                  >
                    History Log
                    {expandedHistory === selectedProof?.id ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {expandedHistory === selectedProof?.id && (
                    <div className="mt-2 space-y-2">
                      {selectedProof?.history.map((entry, index) => (
                        <div key={index} className="text-xs bg-gray-50 p-3 rounded-md">
                          <div className="flex justify-between items-start">
                            <span className="font-medium">{entry.action}</span>
                            <span className="text-gray-500">{entry.timestamp}</span>
                          </div>
                          <p className="text-gray-600 mt-1">By: {entry.user}</p>
                          <p className="text-gray-700 mt-1">{entry.details}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="flex gap-2">
            <Button variant="outline" onClick={() => setIsViewerOpen(false)}>
              Close
            </Button>
            <Button
              variant="outline"
              onClick={() => selectedProof && handleDownloadDocument(selectedProof)}
            >
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            {selectedProof?.status === "Pending" && (
              <>
                <Button
                  variant="destructive"
                  onClick={() => selectedProof && handleRejectProof(selectedProof)}
                >
                  <X className="w-4 h-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => selectedProof && handleApproveProof(selectedProof.id)}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Approve
                </Button>
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Modal */}
      <Dialog open={isRejectModalOpen} onOpenChange={setIsRejectModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Reject Payment Proof</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this payment proof. This reason will be sent to the user.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <label htmlFor="rejection-reason" className="text-sm font-medium">
                Rejection Reason
              </label>
              <Textarea
                id="rejection-reason"
                placeholder="Enter the reason for rejecting this payment proof..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancelReject}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleConfirmReject}
              disabled={!rejectionReason.trim()}
            >
              Reject Payment Proof
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Page;
