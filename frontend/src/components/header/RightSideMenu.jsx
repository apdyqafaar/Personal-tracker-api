import React, { useState } from "react";
import useAthStore from "../../store/UserAuthStore";
import { ModeToggle } from "./ToggleMode";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, LogOut, Menu, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Badge } from "@/components/ui/badge";
import { useTheme } from "../ThemeProvider";

export const RightSideMenu = () => {
  const { user, isAuthenticated, clearAuth } = useAthStore();
  const [showDeleteCom, setShowDeleteCom] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();

  // handle logout
  const handleLout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <>
      <div className="flex items-center space-x-3">
        <div>
          <ModeToggle />
        </div>
        <div>
          {!user || !isAuthenticated ? (
            <Link to={"/login"} className="flex ">
              <Button className="cursor-pointer bg-primary text-sm">
                Sign in
              </Button>
            </Link>
          ) : (
            <div>
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger className="rounded-full cursor-pointer text-center flex items-center justify-center">
                    <Avatar>
                      <AvatarImage src={user?.profileUrl} />
                      <AvatarFallback className="text-center text-xl -mt-0.5">
                        {user?.name?.[0]}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="-ml-30">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to={"/profile"} className="w-full h-full">
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <div
                      className="px-2 py-2 cursor-pointer rounded-sm flex items-center gap-2 bg-destructive/10 hover:bg-destructive/13 mt-2"
                      onClick={() => setShowDeleteCom(!showDeleteCom)}
                    >
                      <LogOut className="w-4 h-4 text-destructive" />
                      <div className="flex flex-col text-sm ">
                        <span className="text-destructive">Log out</span>
                        <span className="text-xs text-destructive">
                          Log out to your account
                        </span>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          )}

          {/* open mobile menu icone */}
          <div className="flex md:hidden">
            {openMenu ? (
              <Badge asChild className="p-0 rounded-sm " variant="outline">
                <X
                  className="text-sm text-muted-foreground"
                  onClick={() => setOpenMenu(!openMenu)}
                />
              </Badge>
            ) : (
              <Badge asChild className="p-0 rounded-sm " variant="outline">
                <Menu
                  className="text-sm text-muted-foreground"
                  onClick={() => setOpenMenu(!openMenu)}
                />
              </Badge>
            )}
          </div>
        </div>
      </div>

      <AlertDialog open={showDeleteCom} onOpenChange={setShowDeleteCom}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to log out?
            </AlertDialogTitle>
            <AlertDialogDescription>
              You will be signed out of your account and will need to log in
              again to continue.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              variants={"destructive"}
              className="bg-destructive/80 hover:bg-destructive/100 text-gray-200 cursor-pointer"
              onClick={handleLout}
            >
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* mobile menu */}
      <Sheet
        onOpenChange={setOpenMenu}
        open={openMenu}
        className={`block md:hidden`}
      >
        <SheetContent className="block md:hidden">
          <SheetHeader>
            <SheetTitle className="flex items-center space-x-1">
              <span>
                {user?.profileUrl ? (
                  <AvatarImage src={user?.profileUrl} />
                ) : (
                  <Badge
                    className={` rounded-full h-8 w-8 text-xl p-4 text-muted-foreground  cursor-pointer`}
                    variant="outline "
                  >
                    {user?.name[0]}
                  </Badge>
                )}
              </span>
              <div>{user?.name}</div>
            </SheetTitle>
            <div className="flex flex-col px-2 mb- mt-2">
              <span className="text-muted-foreground text-xs">user !nfo</span>
              <div className="flex flex-col my-2">
                <Link
                 onClick={()=>setOpenMenu(false)}
                  to="/profile"
                  className="
    w-full p-2 rounded-md border 
    text-start flex items-center 
    hover:bg-muted transition-colors
    border-gray-300 dark:border-gray-700 
    text-gray-800 dark:text-gray-200
  "
                >
                  Profile
                </Link>
                <div
                  className="px-2 py-2 cursor-pointer rounded-sm flex items-center gap-2 bg-destructive/10 hover:bg-destructive/13 mt-2"
                  onClick={() => setShowDeleteCom(!showDeleteCom)}
                >
                  <LogOut className="w-4 h-4 text-destructive" />
                  <div className="flex flex-col text-sm ">
                    <span className="text-destructive">Log out</span>
                    <span className="text-xs text-destructive">
                      Log out to your account
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col px-2 mb- mt-2">
              <span className="text-muted-foreground text-xs mb-2">Navigations</span>
              <Link
              onClick={()=>setOpenMenu(false)}
  to="/transactions"
  className="
    w-full p-2 rounded-md border 
    text-start flex items-center 
    hover:bg-muted transition-colors
    border-gray-50 dark:border-gray-800 
    text-gray-800 dark:text-gray-200
    mb-2
  "
>
  Transactions
</Link>

            <Link
             onClick={()=>setOpenMenu(false)}
  to="/analytics"
  className="
    w-full p-2 rounded-md border 
    text-start flex items-center 
    hover:bg-muted transition-colors
    border-gray-50 dark:border-gray-800 
    text-gray-800 dark:text-gray-200
    mb-2
  "
>
  
  Analytics
</Link>


            <Link
             onClick={()=>setOpenMenu(false)}
  to="/income"
  className="
    w-full p-2 rounded-md border 
    text-start flex items-center 
    hover:bg-muted transition-colors
    border-gray-50 dark:border-gray-800 
    text-gray-800 dark:text-gray-200
    mb-2
  "
>
    Income
</Link>

            <Link
             onClick={()=>setOpenMenu(false)}
  to="/expense"
  className="
    w-full p-2 rounded-md border 
    text-start flex items-center 
    hover:bg-muted transition-colors
    border-gray-50 dark:border-gray-800 
    text-gray-800 dark:text-gray-200
    mb-2
  "
>
    Expenses
</Link>





            </div>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};
