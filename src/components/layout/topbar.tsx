"use client";

import { Bell, HelpCircle, LogOut, Search } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useStore } from "@/lib/use-store";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Topbar() {
  const { user, logout } = useAuth();
  const { store } = useStore();

  const initials = (store?.name ?? "S").slice(0, 2).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 bg-neutral-900 px-4 text-neutral-100">
      <span className="shrink-0 text-sm font-semibold">{store?.name ?? "DMHQ"}</span>

      <div className="flex flex-1 justify-center">
        <button
          disabled
          title="Search — coming soon"
          className="flex w-full max-w-md items-center gap-2 rounded-md bg-neutral-800 px-3 py-1.5 text-sm text-neutral-400 opacity-70 disabled:cursor-not-allowed"
        >
          <Search className="h-4 w-4 shrink-0" />
          <span>Search</span>
        </button>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          disabled
          title="Help — coming soon"
          className="rounded-md p-2 text-neutral-400 opacity-50 hover:bg-neutral-800 disabled:cursor-not-allowed"
        >
          <HelpCircle className="h-4 w-4" />
        </button>
        <button
          disabled
          title="Notifications — coming soon"
          className="rounded-md p-2 text-neutral-400 opacity-50 hover:bg-neutral-800 disabled:cursor-not-allowed"
        >
          <Bell className="h-4 w-4" />
        </button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="ml-1 rounded-full" aria-label="Account menu">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-neutral-700 text-neutral-100">{initials}</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>
              {store?.name ?? "Account"}
              {user && <span className="block text-xs font-normal capitalize text-muted-foreground">{user.staffRole}</span>}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
