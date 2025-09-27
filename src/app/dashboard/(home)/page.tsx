import AdminCard from "@/components/admin-card";
import JsonTable, { JsonTableColumns } from "@/components/json-table";
import { MetricCard } from "@/components/stats-card";
import { TrendingUp, TrendingDown, Users, DollarSign, MessageSquare, Activity } from "lucide-react";

// Example action log data
const actionLogs = [
  {
    user: "Alice Johnson",
    action: "Created Auction",
    target: "Auction #123",
    date: "2024-06-10 10:00",
    status: "success"
  },
  {
    user: "Bob Smith",
    action: "Placed Bid",
    target: "Auction #123",
    date: "2024-06-10 10:05",
    status: "success"
  },
  {
    user: "Charlie Brown",
    action: "Completed Payment",
    target: "Auction #122",
    date: "2024-06-09 18:30",
    status: "success"
  },
  {
    user: "Diana Prince",
    action: "Updated Profile",
    target: "User Profile",
    date: "2024-06-09 15:20",
    status: "info"
  },
  {
    user: "Eve Wilson",
    action: "Reported Issue",
    target: "Auction #120",
    date: "2024-06-09 12:45",
    status: "warning"
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
  {
    title: "Total Sellers",
    value: "1,247",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "text-blue-600"
  },
  {
    title: "Total Buyers", 
    value: "3,892",
    change: "+8%",
    trend: "up",
    icon: Users,
    color: "text-green-600"
  },
  {
    title: "Active Auctions",
    value: "156",
    change: "+5%",
    trend: "up",
    icon: Activity,
    color: "text-purple-600"
  },
  {
    title: "Completed Auctions",
    value: "2,341",
    change: "+15%",
    trend: "up",
    icon: Activity,
    color: "text-orange-600"
  },
  {
    title: "Platform Commission",
    value: "$45,230",
    change: "+23%",
    trend: "up",
    icon: DollarSign,
    color: "text-emerald-600"
  },
  {
    title: "Unread Messages",
    value: "23",
    change: "-3",
    trend: "down",
    icon: MessageSquare,
    color: "text-red-600"
  },
];

const recentActivity = [
  {
    id: 1,
    type: "user_registration",
    message: "New seller registered: John Doe",
    time: "2 minutes ago",
    status: "success"
  },
  {
    id: 2,
    type: "auction_completed",
    message: "Auction #1234 completed successfully",
    time: "15 minutes ago",
    status: "success"
  },
  {
    id: 3,
    type: "payment_received",
    message: "Payment of $1,250 received for Auction #1234",
    time: "1 hour ago",
    status: "success"
  },
  {
    id: 4,
    type: "system_alert",
    message: "High server load detected",
    time: "2 hours ago",
    status: "warning"
  },
  {
    id: 5,
    type: "user_action",
    message: "User reported suspicious activity",
    time: "3 hours ago",
    status: "info"
  },
];

const page = () => {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, Super Admin!</h1>
        <p className="text-blue-100">Here's what's happening on your platform today.</p>
      </div>

      {/* Metrics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric) => (
          <div key={metric.title} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.title}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
                  )}
                  <span className={`text-sm font-medium ${
                    metric.trend === "up" ? "text-green-600" : "text-red-600"
                  }`}>
                    {metric.change}
                  </span>
                  <span className="text-sm text-gray-500 ml-1">from last month</span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 ${metric.color}`}>
                <metric.icon className="h-6 w-6" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <AdminCard title="Recent Activity">
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-2 ${
                  activity.status === "success" ? "bg-green-500" :
                  activity.status === "warning" ? "bg-yellow-500" :
                  "bg-blue-500"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </AdminCard>

        {/* Action Logs */}
        <AdminCard title="Recent Action Logs">
          <div className="w-full overflow-x-auto">
            <JsonTable columns={actionLogColumns} data={actionLogs.slice(0, 5)} />
          </div>
        </AdminCard>
      </div>

      {/* Quick Actions */}
      <AdminCard title="Quick Actions">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Users className="h-8 w-8 text-blue-600 mb-2" />
            <h3 className="font-medium text-gray-900">Manage Users</h3>
            <p className="text-sm text-gray-500">View and manage user accounts</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <Activity className="h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-gray-900">View Auctions</h3>
            <p className="text-sm text-gray-500">Monitor active auctions</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <MessageSquare className="h-8 w-8 text-purple-600 mb-2" />
            <h3 className="font-medium text-gray-900">Check Messages</h3>
            <p className="text-sm text-gray-500">Review user messages</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
            <DollarSign className="h-8 w-8 text-orange-600 mb-2" />
            <h3 className="font-medium text-gray-900">View Payments</h3>
            <p className="text-sm text-gray-500">Monitor transactions</p>
          </button>
        </div>
      </AdminCard>
    </div>
  );
};

export default page;
