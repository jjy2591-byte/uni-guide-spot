import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  MapPin, 
  MessageSquare, 
  Heart, 
  Calendar, 
  Bell,
  Menu,
  X,
  ChevronDown,
  Utensils,
  Phone,
  ExternalLink
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navItems = [
    { path: "/", label: "지도", icon: MapPin },
    { path: "/reports", label: "제보", icon: MessageSquare },
    { path: "/welfare", label: "복지시설", icon: Heart },
    { path: "/notifications", label: "알림", icon: Bell },
  ];

  const lifeMenuItems = [
    { path: "/scheduler", label: "스케줄러", icon: Calendar },
    { path: "/dining", label: "학식", icon: Utensils },
    { path: "/contacts", label: "부서 연락처", icon: Phone },
    { label: "공지사항", icon: ExternalLink, external: true },
  ];

  return (
    <nav className="bg-card border-b border-border shadow-campus sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 text-primary font-bold text-xl">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="hidden sm:block">캠퍼스 복지</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <item.icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            ))}

            {/* Life Menu Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  생활
                  <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-popover border border-border shadow-elevated">
                {lifeMenuItems.map((item, index) => (
                  <DropdownMenuItem key={index} asChild>
                    {item.external ? (
                      <a 
                        href="#" 
                        className="flex items-center space-x-2 w-full px-2 py-2 text-sm hover:bg-accent cursor-pointer"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    ) : (
                      <Link 
                        to={item.path!} 
                        className="flex items-center space-x-2 w-full px-2 py-2 text-sm hover:bg-accent"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-base font-medium ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              ))}
              
              <div className="pt-2 border-t border-border">
                <div className="px-3 py-2 text-sm font-medium text-muted-foreground">생활</div>
                {lifeMenuItems.map((item, index) => (
                  <div key={index}>
                    {item.external ? (
                      <a 
                        href="#"
                        className="flex items-center space-x-2 px-6 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </a>
                    ) : (
                      <Link
                        to={item.path!}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center space-x-2 px-6 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
                      >
                        <item.icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;