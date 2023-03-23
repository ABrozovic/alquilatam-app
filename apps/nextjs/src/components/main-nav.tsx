import * as React from "react";
import Link from "next/link";

import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { siteConfig, type NavItem } from "~/temp/site";

interface MainNavProps {
  items?: NavItem[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex items-center gap-6 md:gap-10">
      <Link
        href="/"
        className="hidden items-center justify-center space-x-2 md:flex"
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white">
          <Icons.logo className="text-brand-700 h-6 w-6" />
        </div>

        <span className="hidden font-bold text-white sm:inline-block">
          {siteConfig.name}
        </span>
      </Link>

      <div className="absolute right-1/2 translate-x-1/2 text-xl font-bold text-white sm:inline-block">
        El lugar donde se alquila todo
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="-ml-4 text-base hover:bg-transparent focus:ring-0 md:hidden"
          >
            <Icons.menu className="h-6 w-6 text-white" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="start"
          sideOffset={24}
          className="relative w-[300px] overflow-scroll"
        >
          <DropdownMenuLabel>
            <Link href="/" className="relative flex items-center">
              <Icons.logo className="text-brand-700 mr-2 h-6 w-6" />
              <div className="text-slate-600">{siteConfig.name}</div>
            </Link>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items?.map(
            (item, index) =>
              item.href && (
                <DropdownMenuItem key={index} asChild>
                  <Link href={item.href}>{item.title}</Link>
                </DropdownMenuItem>
              ),
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
