"use client";

import Link from "next/link";
import { Button } from "@/components/Button";
import { useState, useEffect } from "react";

export function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  const displayYear = currentYear ?? 2026;

  const footerLinks = {
    studio: [
      { href: "/#gallery", label: "Gallery" },
      { href: "/#artists", label: "Artists" },
      { href: "/#booking", label: "Book Now" },
      { href: "/collections/all", label: "Shop" },
    ],
    info: [
      { href: "/aftercare", label: "Aftercare Guide" },
      { href: "/pages/pricing", label: "Pricing" },
      { href: "/faqs", label: "FAQs" },
      { href: "/blog", label: "Blog" },
    ],
    legal: [
      { href: "/privacy", label: "Privacy Policy" },
      { href: "/terms", label: "Terms of Service" },
      { href: "/cookies", label: "Cookie Policy" },
    ],
  };

  const socialLinks = [
    { href: "https://www.instagram.com/adara_tattoo_collective/", label: "Instagram" },
    { href: "https://www.facebook.com/AdaraTattooCollective/", label: "Facebook" },
    { href: "https://www.tiktok.com/@adara.tattoo", label: "TikTok" },
  ];

  return (
    <footer className="border-t border-border bg-muted/30" role="contentinfo">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="font-playfair font-bold text-xl md:text-2xl tracking-tight block mb-4">
              INK STUDIO
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Premium custom tattoos in a professional, sterile environment.
              Award-winning artists specializing in diverse styles.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-background text-muted-foreground hover:text-accent hover:bg-muted transition-colors"
                  aria-label={social.label}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {social.label === "Instagram" && (
                      <>
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </>
                    )}
                    {social.label === "Facebook" && (
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    )}
                    {social.label === "TikTok" && (
                      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
                    )}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Studio links">
            <h3 className="font-semibold mb-4">Studio</h3>
            <ul className="space-y-3">
              {footerLinks.studio.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Information links">
            <h3 className="font-semibold mb-4">Information</h3>
            <ul className="space-y-3">
              {footerLinks.info.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal links">
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-accent transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Newsletter */}
        <div className="bg-muted rounded-xl p-8 md:p-12 border border-border mb-12">
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-6 max-w-md md:max-w-lg">
              Subscribe to receive updates about diary openings, flash days & piercing offers.
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg bg-background border border-border focus:border-accent outline-none"
              />
              <Button variant="outline" type="submit">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {displayYear} INK STUDIO. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>📍 10 East Parade, Heworth, YO31 7YJ</span>
            <span>📞 01904 671118</span>
            <span>✉️ hello@inkstudio.com</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
