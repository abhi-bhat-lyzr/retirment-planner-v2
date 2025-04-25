import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "../logo/Logo";

const Navbar = () => {
  return (
    <header className="sticky top-0 left-0 right-0 z-30 w-full backdrop-blur border-b border-border">
      <div className="px-4 flex h-16 items-center justify-between w-full">
        <div className="items-center flex space-x-5">
          <Logo />
          <div className="font-bold">
            <p className="text-primary">Retirement</p>
            <p className="">Planning Agent</p>
          </div>
        </div>

        <Button variant="outline" size="sm" className="gap-2">
          <LogOut className="h-4 w-4" />
          <span>Logout</span>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
