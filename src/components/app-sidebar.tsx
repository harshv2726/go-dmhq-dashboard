import { SidebarNav } from "@/components/layout/sidebar-nav";

export function AppSidebar() {
  return (
    <aside className="m-1.5 hidden h-[85vh] min-w-50 flex-col overflow-y-auto rounded-[9px] border border-[#f1f1f1] p-2 md:flex">
      <SidebarNav />
    </aside>
  );
}
