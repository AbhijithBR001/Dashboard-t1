import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "../ui/separator";

export function Header() {
  return (
    <header className="bg-orange-500 h-16 flex items-center justify-between pr-4">
      <div className="flex-1">
        <div className="flex gap-3">
          <div className="relative">
            <div className="backdrop-blur-md bg-white/30 rounded-xl p-1">
              <Input
                className="w-full bg-transparent border-none focus:ring-0"
                // value={searchTerm}
                // onChange={handleSearch}
              />
            </div>
          </div>
          <button className="bg-teal-500 hover:bg-teal-600 text-white rounded-xl w-12 h-12 flex items-center justify-center">
            <Search size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-white/10">
          <Bell className="text-white" size={20} />
        </button>

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <User className="text-white" size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;