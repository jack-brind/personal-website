import Link from "next/link";
import { ProjectCard } from "./ProjectCard";

const linkClass =
  "underline text-body-sm text-secondary decoration-border underline-offset-4";

interface SmartLinkProps {
  href: string;
  variant?: "nav" | "inline" | "external" | "rich" | "project" | "article";
  children: React.ReactNode;
}

export function SmartLink({ href, variant, children }: SmartLinkProps) {
  if (variant === "project") return <ProjectCard href={href} />;

  if (href.startsWith("http"))
    return (
      <a
        href={href}
        className={linkClass}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );

  return (
    <Link href={href} className={linkClass}>
      {children}
    </Link>
  );
}
