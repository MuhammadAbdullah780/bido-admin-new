import CustomCard from "@/components/custom-card";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { MetricCard } from "@/components/stats-card";

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
];

// Define columns for the JsonTable
const actionLogColumns: JsonTableColumns<(typeof actionLogs)[0]> = [
  { title: "User", dataIndex: "user" },
  { title: "Action", dataIndex: "action" },
  { title: "Target", dataIndex: "target" },
  { title: "Date", dataIndex: "date" },
];

const metrics = [
  // Auction Management Role
  { title: "Running Auctions", value: "50" },
  { title: "Completed Auctions", value: "200" },
  // User Management Role
  { title: "Sellers", value: "100" },
  { title: "Buyers", value: "300" },
  // Financial Management Role
  { title: "Commission Earned", value: "$10,000" },
];

const page = () => {
  return (
    <div className="space-y-10">
      {/* Metrics Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
        {metrics.map((metric) => (
          <MetricCard
            className="col-span-1"
            key={metric.title}
            title={metric.title}
            value={metric.value}
          />
        ))}
      </div>

      <CustomCard title="Action Logs">
        <div className="w-full overflow-x-auto">
          <JsonTable columns={actionLogColumns} data={actionLogs} />
        </div>
      </CustomCard>
    </div>
  );
};

export default page;
