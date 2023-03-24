import {
  Clock,
  LogOut,
  Megaphone,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { MainNav } from "~/components/main-nav";
import { siteConfig } from "~/temp/site";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const HeaderAvatarMenu = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="mr-2 w-56">
      <DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Perfil</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Opciones</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem>
          <Users className="mr-2 h-4 w-4" />
          <span>Publicar</span>
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Mis publicaciones</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem>
                <Megaphone className="mr-2 h-4 w-4" />
                <span>Activas</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Clock className="mr-2 h-4 w-4" />
                <span>Pasadas</span>
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOut className="mr-2 h-4 w-4" />
        <span>Salir</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export function SiteHeader() {
  return (
    <header className="bg-brand-700 sticky top-0 z-40 w-full border-b border-b-slate-200 dark:border-b-slate-700 dark:bg-slate-900">
      <div className="container flex h-16 items-center justify-between space-x-4 sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <HeaderAvatarMenu />
      </div>
    </header>
  );
}
