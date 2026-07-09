import { SidebarNav } from "@/components/layout/sidebar-nav";

export function AppSidebar() {
  return (
    <aside className="m-3 hidden h-[85vh] min-w-[200px] flex-col overflow-y-auto rounded-[9px] border border-[#f1f1f1] px-2 py-4 md:flex">
      <SidebarNav />
    </aside>
  );
}
