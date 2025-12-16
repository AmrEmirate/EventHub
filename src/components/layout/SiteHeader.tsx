import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";

interface SiteHeaderProps {
  currentPath: string;
}

export function SiteHeader({ currentPath }: SiteHeaderProps) {
  const navLinks = [
    { href: "/", label: "Browse Events" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-2xl font-bold text-primary"
          >
            <CalendarDays className="h-8 w-8" />
            <span>EventHub</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={
                  currentPath === link.href
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary"
                }
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="ghost">Login</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Sign Up</Button>
              </Link>
            </div>
            <MobileNav currentPath={currentPath} />
          </div>
        </div>
      </div>
    </header>
  );
}
