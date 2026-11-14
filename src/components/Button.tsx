"use client";

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  asChild?: boolean;
  href?: string;
}

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      loading,
      disabled,
      asChild = false,
      href,
      children,
      ...props
    },
    ref
  ) => {
    const Tag = href || asChild ? "a" : "button";

    const baseStyles = cn(
      "inline-flex items-center justify-center font-medium transition-all duration-200",
      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      "disabled:opacity-50 disabled:cursor-not-allowed"
    );

    const variants = {
      primary: "bg-accent text-background hover:bg-accent-hover",
      secondary: "bg-muted text-foreground hover:bg-muted/80",
      outline: "border border-border hover:bg-accent/10 hover:text-accent",
      ghost: "hover:bg-muted hover:text-accent",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm rounded-md gap-1.5",
      md: "px-4 py-2 text-base rounded-lg gap-2",
      lg: "px-6 py-3 text-lg rounded-xl gap-2.5",
    };

    return (
      <Tag
        ref={ref as React.Ref<HTMLButtonElement>}
        href={href}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={Tag === "button" ? disabled || loading : undefined}
        aria-busy={loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin h-4 w-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
        {children}
      </Tag>
    );
  }
);

Button.displayName = "Button";
