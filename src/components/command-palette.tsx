"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { mainNavItems, settingsSections, type SettingsSectionKey } from "@/components/layout/nav-items";

interface CommandPaletteProps {
  onOpenSettings: (section: SettingsSectionKey) => void;
}

export function CommandPalette({ onOpenSettings }: CommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  function goToSettings(section: SettingsSectionKey) {
    setOpen(false);
    onOpenSettings(section);
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex h-8 w-full max-w-sm items-center gap-2 rounded-lg border border-border bg-muted/60 px-3 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Search className="size-4 shrink-0" />
        <span className="flex-1 truncate text-left">Search or jump to...</span>
        <kbd className="pointer-events-none hidden shrink-0 items-center gap-0.5 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium text-muted-foreground sm:flex">
          <span>⌘</span>K
        </kbd>
      </button>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Search pages and settings"
      >
        <Command>
          <CommandInput placeholder="Search pages, settings…" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Pages">
              {mainNavItems.map((item) => (
                <CommandItem key={item.href} value={item.label} onSelect={() => go(item.href)}>
                  <item.icon />
                  <span>{item.label}</span>
                </CommandItem>
              ))}
              {mainNavItems.flatMap((item) =>
                "children" in item
                  ? item.children.map((child) => (
                      <CommandItem key={child.href} value={child.label} onSelect={() => go(child.href)}>
                        <child.icon />
                        <span>{child.label}</span>
                      </CommandItem>
                    ))
                  : [],
              )}
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              {settingsSections.map((section) => (
                <CommandItem
                  key={section.key}
                  value={`Settings ${section.label}`}
                  onSelect={() => goToSettings(section.key)}
                >
                  <section.icon />
                  <span>{section.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  );
}
