'use client';
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { MetricCard } from "@/components/stats-card";
import Link from "next/link";
import { useState } from "react";

type Props = {};

const userStats = [
  { title: "Total Users", value: "400" },
  { title: "Sellers", value: "100" },
  { title: "Buyers", value: "300" },
  { title: "Partially Registered", value: "100" },
  { title: "Blocked Users", value: "100" },
  { title: "Active Users", value: "300" },
];

// Example user data
const users = [
  {
    id: 1,
    name: "Alice Smith",
    email: "alice@example.com",
    role: "Seller",
    status: "Active",
    registered: "2024-06-01",
    commissionRate: 5.5,
    isBlocked: false,
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Buyer",
    status: "Active",
    registered: "2024-05-20",
    commissionRate: 0,
    isBlocked: false,
  },
  {
    id: 3,
    name: "Charlie Lee",
    email: "charlie@example.com",
    role: "Seller",
    status: "Partially Registered",
    registered: "2024-06-10",
    commissionRate: 3.2,
    isBlocked: true,
  },
];

// Define columns for the JsonTable
const userColumns: JsonTableColumns<(typeof users)[0]> = [
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Role", dataIndex: "role" },
  { title: "Status", dataIndex: "status" },
  { 
    title: "Commission Rate", 
    dataIndex: "commissionRate",
    width:200,
    render: (user) => (
      <span className="font-medium">
        {user.commissionRate}%
      </span>
    )
  },
  { 
    title: "Blocked", 
    dataIndex: "isBlocked",
    render: (user) => (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        user.isBlocked 
          ? "bg-red-100 text-red-800" 
          : "bg-green-100 text-green-800"
      }`}>
        {user.isBlocked ? "Blocked" : "Active"}
      </span>
    )
  },
  { title: "Registered", dataIndex: "registered" },
  {
    title: "",
    dataIndex: "id",
    render: (k) => (
      <Link
        href={`/dashboard/users/${k?.id}`}
        className="inline-flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            d="M9 6l6 6-6 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>
    ),
  },
];

const page = (props: Props) => {
  const [userData, setUserData] = useState(users);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleBlockUsers = (userIds: string[]) => {
    setUserData(prev => 
      prev.map(user => 
        userIds.includes(String(user.id)) 
          ? { ...user, isBlocked: true }
          : user
      )
    );
    // Reset selection after action
    setSelectedUsers([]);
  };

  const handleUnblockUsers = (userIds: string[]) => {
    setUserData(prev => 
      prev.map(user => 
        userIds.includes(String(user.id)) 
          ? { ...user, isBlocked: false }
          : user
      )
    );
    // Reset selection after action
    setSelectedUsers([]);
  };

  const handleSetCommissionRate = (userIds: string[]) => {
    const newRate = prompt("Enter commission rate (0-100):");
    if (newRate !== null) {
      const rate = parseFloat(newRate);
      if (!isNaN(rate) && rate >= 0 && rate <= 100) {
        setUserData(prev => 
          prev.map(user => 
            userIds.includes(String(user.id)) 
              ? { ...user, commissionRate: rate }
              : user
          )
        );
      } else {
        alert("Please enter a valid commission rate between 0 and 100");
      }
    }
    // Always reset selection after action (whether successful, cancelled, or invalid)
    setSelectedUsers([]);
  };

  const bulkActions = [
    {
      label: "Block Users",
      action: handleBlockUsers,
      variant: "destructive" as const
    },
    {
      label: "Unblock Users", 
      action: handleUnblockUsers,
      variant: "outline" as const
    },
    {
      label: "Set Commission Rate",
      action: handleSetCommissionRate,
      variant: "default" as const
    }
  ];

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-medium">Users</h1>
      <div className="grid grid-cols-2 gap-5">
        {userStats.map((stat) => (
          <MetricCard
            className="col-span-1"
            key={stat.title}
            title={stat.title}
            value={stat.value}
          />
        ))}
      </div>

      <JsonTable 
        columns={userColumns} 
        data={userData} 
        enableSelection={true}
        bulkActions={bulkActions}
        selectedIds={selectedUsers}
        onSelectionChange={setSelectedUsers}
      />
    </div>
  );
};

export default page;
