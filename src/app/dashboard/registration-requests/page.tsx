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
import Link from "next/link";
import { useState } from "react";

type Props = {};

const registrationStats = [
  { title: "Total Requests", value: "150" },
  { title: "Approved Requests", value: "120" },
  { title: "Blocked Requests", value: "30" },
];

// Example registration request data
const registrationRequests = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    company: "Tech Solutions Inc.",
    role: "Seller",
    status: "Pending",
    submittedAt: "2024-01-15",
    documents: "Complete",
    isApproved: false,
    isBlocked: false,
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 234-5678",
    company: "Digital Marketing Co.",
    role: "Buyer",
    status: "Approved",
    submittedAt: "2024-01-14",
    documents: "Complete",
    isApproved: true,
    isBlocked: false,
  },
  {
    id: 3,
    name: "Mike Johnson",
    email: "mike.johnson@example.com",
    phone: "+1 (555) 345-6789",
    company: "Retail Store LLC",
    role: "Seller",
    status: "Blocked",
    submittedAt: "2024-01-13",
    documents: "Incomplete",
    isApproved: false,
    isBlocked: true,
  },
  {
    id: 4,
    name: "Sarah Wilson",
    email: "sarah.wilson@example.com",
    phone: "+1 (555) 456-7890",
    company: "E-commerce Solutions",
    role: "Buyer",
    status: "Pending",
    submittedAt: "2024-01-12",
    documents: "Complete",
    isApproved: false,
    isBlocked: false,
  },
  {
    id: 5,
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "+1 (555) 567-8901",
    company: "Manufacturing Corp",
    role: "Seller",
    status: "Approved",
    submittedAt: "2024-01-11",
    documents: "Complete",
    isApproved: true,
    isBlocked: false,
  },
];

// Define columns for the JsonTable
const requestColumns: JsonTableColumns<(typeof registrationRequests)[0]> = [
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Phone", dataIndex: "phone" },
  { title: "Company", dataIndex: "company" },
  { title: "Role", dataIndex: "role" },
  { 
    title: "Status", 
    dataIndex: "status",
    render: (request) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        request.status === "Approved" 
          ? "bg-green-100 text-green-800" 
          : request.status === "Blocked"
          ? "bg-red-100 text-red-800"
          : "bg-yellow-100 text-yellow-800"
      }`}>
        {request.status}
      </span>
    )
  },
  { title: "Documents", dataIndex: "documents" },
  { title: "Submitted", dataIndex: "submittedAt" },
  // {
  //   title: "",
  //   dataIndex: "id",
  //   render: (k) => (
  //     <Link
  //       href={`/dashboard/registration-requests/${k?.id}`}
  //       className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 cursor-pointer"
  //     >
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="20"
  //         height="20"
  //         fill="none"
  //         viewBox="0 0 24 24"
  //         stroke="currentColor"
  //         strokeWidth="2"
  //       >
  //         <path
  //           d="M9 6l6 6-6 6"
  //           stroke="currentColor"
  //           strokeWidth="2"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //         />
  //       </svg>
  //     </Link>
  //   ),
  // },
];

const page = (props: Props) => {
  const [requestData, setRequestData] = useState(registrationRequests);
  const [selectedRequests, setSelectedRequests] = useState<string[]>([]);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [blockReason, setBlockReason] = useState("");
  const [pendingBlockRequests, setPendingBlockRequests] = useState<string[]>([]);

  const handleApproveRequests = (requestIds: string[]) => {
    setRequestData(prev => 
      prev.map(request => 
        requestIds.includes(String(request.id)) 
          ? { ...request, status: "Approved", isApproved: true, isBlocked: false }
          : request
      )
    );
    setSelectedRequests([]);
  };

  const handleBlockRequests = (requestIds: string[]) => {
    setPendingBlockRequests(requestIds);
    setIsBlockModalOpen(true);
  };

  const handleConfirmBlock = () => {
    if (!blockReason.trim()) {
      alert("Please provide a reason for blocking the requests.");
      return;
    }

    setRequestData(prev => 
      prev.map(request => 
        pendingBlockRequests.includes(String(request.id)) 
          ? { ...request, status: "Blocked", isApproved: false, isBlocked: true, blockReason: blockReason }
          : request
      )
    );
    
    // Reset state
    setSelectedRequests([]);
    setPendingBlockRequests([]);
    setBlockReason("");
    setIsBlockModalOpen(false);
  };

  const handleCancelBlock = () => {
    setPendingBlockRequests([]);
    setBlockReason("");
    setIsBlockModalOpen(false);
  };

  const handleRejectRequests = (requestIds: string[]) => {
    setRequestData(prev => 
      prev.map(request => 
        requestIds.includes(String(request.id)) 
          ? { ...request, status: "Rejected", isApproved: false, isBlocked: false }
          : request
      )
    );
    setSelectedRequests([]);
  };

  const bulkActions = [
    {
      label: "Approve Requests",
      action: handleApproveRequests,
      variant: "default" as const
    },
    {
      label: "Block Requests", 
      action: handleBlockRequests,
      variant: "destructive" as const
    },
    {
      label: "Reject Requests",
      action: handleRejectRequests,
      variant: "outline" as const
    }
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-medium">Registration Requests</h1>
      
      <div className="grid grid-cols-3 gap-5">
        {registrationStats.map((stat) => (
          <MetricCard
            className="col-span-1"
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <JsonTable 
        columns={requestColumns} 
        data={requestData} 
        enableSelection={true}
        bulkActions={bulkActions}
        selectedIds={selectedRequests}
        onSelectionChange={setSelectedRequests}
      />

      {/* Block Requests Modal */}
      <Dialog open={isBlockModalOpen} onOpenChange={setIsBlockModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Block Registration Requests</DialogTitle>
            <DialogDescription>
              Please provide a reason for blocking {pendingBlockRequests.length} request{pendingBlockRequests.length !== 1 ? 's' : ''}. This reason will be recorded and may be shared with the affected users.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-3">
              <label htmlFor="block-reason" className="text-sm mb-5 font-medium">
                Reason for blocking
              </label>
              <Textarea
                id="block-reason"
                placeholder="Enter the reason for blocking these requests..."
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
              Block Requests
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default page;
