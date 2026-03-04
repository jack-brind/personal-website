import Link from "next/link";
import { ProjectCard } from "./ProjectCard";

interface SmartLinkProps {
  href: string;
  variant?: "nav" | "inline" | "external" | "rich" | "project" | "article";
  children: React.ReactNode;
}

export function SmartLink({ href, variant, children }: SmartLinkProps) {
  // Render external link
  if (href.startsWith("http"))
    return (
      <a
        href={href}
        className="underline text-body-sm text-primary hover:text-primary/75 decoration-muted underline-offset-4"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );

  // Render nav link for internal high-level navigation
  if (variant === "nav")
    return (
      <Link
        href={href}
        className="underline text-body-sm text-secondary decoration-border underline-offset-4"
      >
        {children}
      </Link>
    );

  // Render a project card for case studies and side projects
  if (variant === "project") return <ProjectCard href={href}></ProjectCard>;

  if (variant === "article")
    return (
      <Link href={href} className="text-primary font-medium">
        {children}
      </Link>
    );

  // Render rich link for external links
  if (variant === "rich")
    return (
      <a href={href} className="bg-red-500">
        {children}
      </a>
    );

  // Default internal, inline link
  return (
    <Link href={href} className="text-blue-600">
      {children}
    </Link>
  );
}
