import Link from "next/link";
import { cn } from "@/lib/utils";
const linkClass =
  "underline decoration-border-dark hover:decoration-muted underline-offset-4";

interface SmartLinkProps {
  href: string;
  variant?: "nav" | "inline" | "external" | "rich" | "article";
  className?: string;
  children: React.ReactNode;
}

export function SmartLink({
  href,
  variant,
  className,
  children,
}: SmartLinkProps) {
  if (variant === "nav")
    return (
      <Link
        href={href}
        className={cn(linkClass, "text-secondary font-medium", className)}
      >
        {children}
      </Link>
    );

  if (href.startsWith("http"))
    return (
      <a
        href={href}
        className={cn(linkClass, className)}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );

  return (
    <Link href={href} className={cn(linkClass, className)}>
      {children}
    </Link>
  );
}
