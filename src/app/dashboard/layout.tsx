import { Header } from "@/components/header";
import MaxWidth from "@/components/max-width";
import { Sidebar } from "@/components/sidebar";
import { SidebarProvider } from "@/contexts/sidebar-context";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // await removePlanId();

  return (
    <SidebarProvider>
      <div className="flex overflow-hidden bg-gray-50 h-screen">
        <Sidebar />
        <div className="flex flex-col overflow-hidden flex-1 h-full">
          <Header />
          <div className="flex-1 h-full overflow-y-auto hide-scroll p-4 min-h-1">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
