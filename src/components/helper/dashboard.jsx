import React from "react";
import { Menu, Search, Bell, Plus, MoreVertical, ChevronLeft, ChevronRight,CircleUserRound,LayoutDashboard,PanelsTopLeft,Timer,Users,CalendarDays,Settings } from "lucide-react";


const SidebarItem = ({ icon: Icon, label, active }) => (
  <li>
    <a
      className={`flex  gap-3 rounded-md px-8 py-3 text-sm font-medium transition-all ${active
        ? "bg-primary text-primary-content"
        : "hover:bg-base-200"
        }`}
    >
      <Icon size={18} />
      {label}
    </a>
  </li>
);

const StatCard = ({ title, value, change, positive }) => (
  <div className="flex flex-col flex-wrap gap-2">
    <span className="text-sm text-base-content/60">{title}</span>
    <div className="flex items-center gap-3">
      <span className="text-2xl font-semibold">{value}</span>
      <span
        className={`badge badge-sm ${positive ? "badge-success" : "badge-error"
          }`}
      >
        {change}
      </span>
    </div>
  </div>
);

const Card = ({ title, action, children }) => (
  <div className="card bg-base-100 shadow-sm rounded-2xl">
    <div className="card-body">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">{title}</h2>
        {action}
      </div>
      {children}
    </div>
  </div>
);

const Topbar = () => (
  <div className="flex items-center justify-between px-6 py-4 border-b border-base-200 bg-base-100">
    <div className="flex items-center gap-4">
      <button className="btn btn-ghost btn-square lg:hidden">
        <Menu size={20} />
      </button>
      <div className="form-control">
        <div className="input input-bordered flex items-center gap-2 ">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search"
            className="grow focus:ring-gray-400"
          />
        </div>
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="btn btn-ghost btn-circle">
        <Bell size={18} />
      </button>
      <div className="flex items-center gap-2">
        <div className="avatar">
          <div className="w-8 rounded-full">
            <img src="https://i.pravatar.cc/100" alt="avatar" />
          </div>
        </div>
        <div className="text-sm">
          <p className="font-medium">James</p>
          <p className="text-xs text-base-content/60">ID: 4827682</p>
        </div>
      </div>
    </div>
  </div>
);

const Sidebar = () => (
  <aside className="hidden lg:flex flex-col  min-h-screen  border-base-300 bg-base-100 border rounded pt-2">
    <h1 className="text-2xl font-bold my-4 text-center">TaskOrbit</h1>
    
    <ul className="menu gap-2 border-t border-base-200 px-4 py-4">
      <SidebarItem icon={LayoutDashboard} label="Dashboard" active />
      <SidebarItem icon={PanelsTopLeft} label="Projects" />
      <SidebarItem icon={Timer} label="Tasks" />
      <SidebarItem icon={Users} label="Teams" />
      <SidebarItem icon={CalendarDays} label="Calendar" />
    </ul>

    <div className="mt-auto flex items-center gap-3 pt-4 p-2 border-t border-base-200">
      <div className="avatar">
        <div className="w-10 rounded-full">
          <img src="https://i.pravatar.cc/101" alt="profile" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium">James P.</p>
        <p className="text-xs text-base-content/60">james@email.com</p>
      </div>
    </div>
  </aside>
);

const PerformanceStats = () => (
  <Card title="Performance Over Time">
    <div className="flex  w-full flex-wrap gap-6 mt-4 ">
      <div className="w-full  md:flex-1  ">
        <StatCard title="Delivered" value="42,642" change="+0.02%" positive />
      </div>

      <div className="w-full  md:flex-1">
        <StatCard title="Opened" value="26,843" change="-0.02%" />
      </div>

      <div className="w-full  md:flex-1">
        <StatCard title="Clicked" value="525,753" change="+0.02%" positive />
      </div>

      <div className="w-full  md:flex-1">
        <StatCard title="Subscribed" value="425" change="+0.02%" positive />
      </div>
    </div>
  </Card>
);


const CampaignPerformance = () => (
  <Card
    title="Campaign Performance"
    action={<MoreVertical size={18} className="cursor-pointer" />}
  >
    <div className="mt-4">
      <h3 className="text-3xl font-semibold">$24,747.01</h3>
      <p className="text-sm text-success">↑ 12% vs last month</p>

      <div className="mt-6 flex items-end gap-4 h-40">
        {[40, 60, 90, 50, 70, 80].map((height, i) => (
          <div
            key={i}
            className="flex-1 bg-primary/70 rounded-xl"
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
    </div>
  </Card>
);

const ScheduleCard = () => (
  <Card
    title="Schedule Campaign"
    action={
      <div className="flex gap-2">
        <ChevronLeft size={18} />
        <ChevronRight size={18} />
      </div>
    }
  >
    <div className="mt-4 flex flex-col gap-4">
      <div className="p-4 rounded-xl bg-warning/20">
        <p className="font-medium">Element of Design Test</p>
        <p className="text-xs text-base-content/60">10:00 - 11:00 AM</p>
      </div>
      <div className="p-4 rounded-xl bg-secondary/20">
        <p className="font-medium">Design Principle Test</p>
        <p className="text-xs text-base-content/60">10:00 - 11:00 AM</p>
      </div>
    </div>
  </Card>
);


export default function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-base-200">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Topbar />

        <main className="p-6 flex flex-col gap-6">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-base-content/60">
              Welcome, Let’s dive into your personalized setup guide.
            </p>
          </div>

          <PerformanceStats />

          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <CampaignPerformance />
            </div>
            <div className="flex-1">
              <ScheduleCard />
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}
