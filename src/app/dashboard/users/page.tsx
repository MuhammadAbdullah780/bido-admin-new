import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { MetricCard } from "@/components/stats-card";
import Link from "next/link";

type Props = {};

const userStats = [
  { title: "Total Users", value: "400" },
  { title: "Sellers", value: "100" },
  { title: "Buyers", value: "300" },
  { title: "Partially Registered", value: "100" },
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
  },
  {
    id: 2,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Buyer",
    status: "Active",
    registered: "2024-05-20",
  },
  {
    id: 3,
    name: "Charlie Lee",
    email: "charlie@example.com",
    role: "Seller",
    status: "Partially Registered",
    registered: "2024-06-10",
  },
];

// Define columns for the JsonTable
const userColumns: JsonTableColumns<(typeof users)[0]> = [
  { title: "Name", dataIndex: "name" },
  { title: "Email", dataIndex: "email" },
  { title: "Role", dataIndex: "role" },
  { title: "Status", dataIndex: "status" },
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

      <JsonTable columns={userColumns} data={users} />
    </div>
  );
};

export default page;
