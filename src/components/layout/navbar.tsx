"use client";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/language-switcher";
import { cn } from "@/lib/utils";
import {
  Shield,
  Search,
  BarChart,
  User,
  Settings,
  FileText,
  DollarSign,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      name: "Home",
      href: "/home",
      icon: <BarChart size={18} />,
    },
    {
      name: "About",
      href: "/about",
      icon: <User size={18} />,
    },
    {
      name: "Services",
      href: "/services",
      icon: <Settings size={18} />,
    },
    {
      name: "Security",
      href: "/security",
      icon: <Shield size={18} />,
    },
    {
      name: "SEO",
      href: "/seo",
      icon: <Search size={18} />,
    },
    {
      name: "Blog",
      href: "/blog",
      icon: <FileText size={18} />,
    },
    {
      name: "Pricing",
      href: "/pricing",
      icon: <DollarSign size={18} />,
    },
    {
      name: "Contact",
      href: "/contact",
      icon: <Mail size={18} />,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-6 w-6" />
            <span className="font-bold">SecureSEO</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
          {navItems.map((item) => (
            <Button
              key={item.href}
              asChild
              variant="ghost"
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                pathname === item.href
                  ? "text-foreground"
                  : "text-muted-foreground",
              )}
            >
              <Link href={item.href} className="flex items-center gap-2">
                {item.icon}
                {item.name}
              </Link>
            </Button>
          ))}
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <LanguageSwitcher />
          <ThemeSwitcher />
          <Button size="sm">Sign In</Button>
        </div>
      </div>
    </header>
  );
};

export { Navbar };
