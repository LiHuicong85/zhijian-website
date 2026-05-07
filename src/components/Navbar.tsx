"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const navItems = [
  { name: "首页", href: "/" },
  { name: "关于知践", href: "/about" },
  { name: "数智转型", href: "/consulting" },
  { name: "赋能培训", href: "/ai" },
  { name: "商业陪跑", href: "/training" },
  { name: "客户案例", href: "/cases" },
  { name: "知践百科", href: "/wiki" },
  { name: "联系我们", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-3 z-50 mx-[7px] rounded-2xl transition-all duration-500 ${
        isScrolled
          ? "bg-slate-900/30 backdrop-blur-2xl shadow-xl shadow-black/20 border border-white/10"
          : "bg-[#0A1628]/80 backdrop-blur-md border border-white/5"
      }`}
    >
      {/* 主导航栏 */}
      <nav className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <img
                src="/logo.png"
                alt="知践咨询"
                className="h-10 md:h-12 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="tab-indicator px-4 py-2 text-sm font-medium text-white/80 hover:text-cyan-400 transition-colors duration-300 relative"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full btn-cta font-semibold text-sm btn-press"
            >
              立即咨询
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-slate-900/95 backdrop-blur-xl border-white/10">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="px-4 py-3 text-lg font-medium text-white/80 hover:text-cyan-400 hover:bg-white/5 rounded-lg transition-all duration-300"
                  >
                    {item.name}
                  </Link>
                ))}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block w-full text-center px-6 py-3 rounded-full btn-cta font-semibold btn-press"
                  >
                    立即咨询
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
