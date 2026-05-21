import React from "react";
import { Menu, Search, Bell, Plus, MoreVertical, ChevronLeft, ChevronRight } from "lucide-react";

// --- Reusable Components ---

const SidebarItem = ({ icon: Icon, label, active }) => (
  <li>
    <a
      className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all ${
        active
          ? "bg-[#6C5DD3] text-white"
          : "text-gray-500 hover:bg-[#F3F4F6]"
      }`}
    >
      <Icon size={18} />
      {label}
    </a>
  </li>
);

const StatCard = ({ title, value, change, positive }) => (
  <div className="flex flex-col gap-2">
    <span className="text-sm text-gray-400">{title}</span>
    <div className="flex items-center gap-3">
      <span className="text-2xl font-semibold text-gray-800">{value}</span>
      <span
        className={`text-xs font-medium px-2 py-1 rounded-full ${
          positive
            ? "bg-green-100 text-green-600"
            : "bg-red-100 text-red-500"
        }`}
      >
        {change}
      </span>
    </div>
  </div>
);

const Card = ({ title, action, children }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      {action}
    </div>
    {children}
  </div>
);

const Topbar = () => (
  <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-100">
    <div className="flex items-center gap-4">
      <button className="lg:hidden text-gray-600">
        <Menu size={20} />
      </button>
      <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-xl w-72">
        <Search size={16} className="text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-sm w-full"
        />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="text-gray-600">
        <Bell size={18} />
      </button>
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-gray-200" />
        <div className="text-sm">
          <p className="font-medium text-gray-800">James</p>
          <p className="text-xs text-gray-400">ID: 4827682</p>
        </div>
      </div>
    </div>
  </div>
);

const Sidebar = () => (
  <aside className="hidden lg:flex flex-col w-64 min-h-screen bg-white border-r border-gray-100 p-6">
    <h1 className="text-2xl font-bold text-[#6C5DD3] mb-8">emitly</h1>

    <ul className="space-y-2">
      <SidebarItem icon={Menu} label="Overview" active />
      <SidebarItem icon={Plus} label="Create Campaign" />
      <SidebarItem icon={Menu} label="Automation" />
      <SidebarItem icon={Menu} label="Subscriptions" />
      <SidebarItem icon={Menu} label="AI Chatbot" />
      <SidebarItem icon={Menu} label="Integrations" />
    </ul>

    <div className="mt-auto pt-6 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-200" />
        <div>
          <p className="text-sm font-medium text-gray-800">James P.</p>
          <p className="text-xs text-gray-400">james@email.com</p>
        </div>
      </div>
    </div>
  </aside>
);

const PerformanceStats = () => (
  <Card title="Performance Over Time">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      <StatCard title="Delivered" value="42,642" change="+0.02%" positive />
      <StatCard title="Opened" value="26,843" change="-0.02%" />
      <StatCard title="Clicked" value="525,753" change="+0.02%" positive />
      <StatCard title="Subscribed" value="425" change="+0.02%" positive />
    </div>
  </Card>
);

const CampaignPerformance = () => (
  <Card
    title="Campaign Performance"
    action={<MoreVertical size={18} className="cursor-pointer text-gray-400" />}
  >
    <h3 className="text-3xl font-semibold text-gray-800">$24,747.01</h3>
    <p className="text-sm text-green-500 mb-6">↑ 12% vs last month</p>

    <div className="flex items-end gap-4 h-40">
      {[40, 60, 90, 50, 70, 80].map((height, i) => (
        <div
          key={i}
          className="flex-1 bg-[#6C5DD3] rounded-xl"
          style={{ height: `${height}%` }}
        />
      ))}
    </div>
  </Card>
);

const ScheduleCard = () => (
  <Card
    title="Schedule Campaign"
    action={
      <div className="flex gap-2 text-gray-400">
        <ChevronLeft size={18} />
        <ChevronRight size={18} />
      </div>
    }
  >
    <div className="flex flex-col gap-4">
      <div className="p-4 rounded-xl bg-purple-50">
        <p className="font-medium text-gray-800">Element of Design Test</p>
        <p className="text-xs text-gray-400">10:00 - 11:00 AM</p>
      </div>
      <div className="p-4 rounded-xl bg-blue-50">
        <p className="font-medium text-gray-800">Design Principle Test</p>
        <p className="text-xs text-gray-400">10:00 - 11:00 AM</p>
      </div>
    </div>
  </Card>
);

// --- Main Layout ---

export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-[#F8F9FC]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-400">
              Welcome, Let’s dive into your personalized setup guide.
            </p>
          </div>

          <PerformanceStats />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CampaignPerformance />
            <ScheduleCard />
          </div>
        </main>
      </div>
    </div>
  );
}
