import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, Bell, User, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // TODO: Implement search functionality
      console.log("Search query:", searchQuery);
    }
  };

  return (
    <header className="bg-black/80 backdrop-blur-sm fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            </div>
            <span className="text-2xl font-bold hidden md:block">أكاديمية السينما</span>
          </Link>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="البحث عن فيلم أو مسلسل..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-card rounded-full py-2 px-4 pr-10 focus:outline-none focus:ring-2 focus:ring-orange-500 text-white placeholder-gray-400"
              />
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
          </form>

          {/* User Menu */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" className="flex items-center space-x-2 space-x-reverse hover:bg-card">
              <User className="w-5 h-5" />
              <span className="hidden lg:inline">أهلاً بك</span>
            </Button>
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Crown className="w-4 h-4 ml-2" />
              اشتراك VIP
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
