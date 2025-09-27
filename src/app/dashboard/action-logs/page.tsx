"use client";

import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

// Example action log data
const actionLogs = [
  {
    user: "Alice",
    action: "Created Auction",
    target: "Auction #123",
    date: "2024-06-10 10:00",
  },
  {
    user: "Bob",
    action: "Placed Bid",
    target: "Auction #123",
    date: "2024-06-10 10:05",
  },
  {
    user: "Charlie",
    action: "Completed Payment",
    target: "Auction #122",
    date: "2024-06-09 18:30",
  },
  {
    user: "Alice",
    action: "Updated User",
    target: "User #45",
    date: "2024-06-08 14:20",
  },
];

// Define columns for the JsonTable
const actionLogColumns: JsonTableColumns<(typeof actionLogs)[0]> = [
  { title: "User", dataIndex: "user" },
  { title: "Action", dataIndex: "action" },
  { title: "Target", dataIndex: "target" },
  { title: "Date", dataIndex: "date" },
];

const getUniqueUsers = (logs: typeof actionLogs) => {
  const users = logs.map((log) => log.user);
  return Array.from(new Set(users));
};

const page = () => {
  const [username, setUsername] = useState("");
  const [date, setDate] = useState("");

  // Filtering logic
  const filteredLogs = actionLogs.filter((log) => {
    const matchesUser = !username || log.user.toLowerCase().includes(username.toLowerCase());
    const matchesDate = !date || log.date.slice(0, 10) === date; // date is in "YYYY-MM-DD" format
    return matchesUser && matchesDate;
  });

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-medium">Action Logs</h1>
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <div className="flex-1">
          <Label htmlFor="username" className="mb-2">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Search by username..."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full"
            list="user-list"
          />
          <datalist id="user-list">
            {getUniqueUsers(actionLogs).map((user) => (
              <option key={user} value={user} />
            ))}
          </datalist>
        </div>
        <div className="space-y-2">
          <Label htmlFor="date">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full"
          />
        </div>
      </div>
      <div className="w-full overflow-x-auto">
        <JsonTable columns={actionLogColumns} data={filteredLogs} />
      </div>
    </div>
  );
};

export default page;
