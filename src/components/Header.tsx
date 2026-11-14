"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CartButton } from "@/components/CartDrawer";
import { Button } from "@/components/Button";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/#gallery", label: "Gallery" },
    { href: "/#artists", label: "Artists" },
    { href: "/#booking", label: "Book Now" },
    { href: "/collections/all", label: "Shop" },
    { href: "/about-us", label: "About" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md border-b border-border" : "bg-transparent"}`}>
      <nav className="container" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-playfair font-bold text-xl md:text-2xl tracking-tight" aria-label="Go to homepage">
            INK STUDIO
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <CartButton />
            <Link href="/#booking" className="px-5 py-2.5 bg-accent text-background font-medium rounded-lg hover:bg-accent-hover transition-colors text-sm">
              Book Now
            </Link>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>

        <div id="mobile-menu" className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileMenuOpen ? "max-h-96 opacity-100 pt-4 pb-6" : "max-h-0 opacity-0 pt-0 pb-0"}`}>
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="w-full px-4 py-3 bg-accent text-background font-medium text-center hover:bg-accent-hover transition-colors"
            >
              Book Now
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
