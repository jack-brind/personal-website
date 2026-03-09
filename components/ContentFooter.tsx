import Link from "next/link";
import { LuArrowLeft, LuArrowRight } from "react-icons/lu";
import { Separator } from "@/components/ui/Separator";

interface NavItem {
  title: string;
  slug: string;
}

interface ContentFooterProps {
  prev: NavItem | null;
  next: NavItem | null;
  basePath: string;
}

export default function ContentFooter({
  prev,
  next,
  basePath,
}: ContentFooterProps) {
  if (!prev && !next) return null;

  return (
    <div>
      <Separator className="mb-8" />
      <nav className="flex justify-between gap-8">
        <div className="flex-1">
          {prev && (
            <Link
              href={`${basePath}/${prev.slug}`}
              className="group flex flex-col gap-1"
            >
              <span className="text-body-sm text-secondary flex items-center gap-1">
                <LuArrowLeft size={14} />
                Previous
              </span>
              <span className="font-medium line-clamp-1 group-hover:underline decoration-border-dark underline-offset-4">
                {prev.title}
              </span>
            </Link>
          )}
        </div>
        <div className="flex-1 text-right">
          {next && (
            <Link
              href={`${basePath}/${next.slug}`}
              className="group flex flex-col gap-1 items-end"
            >
              <span className="text-body-sm text-secondary flex items-center gap-1">
                Next
                <LuArrowRight size={14} />
              </span>
              <span className="font-medium line-clamp-1 group-hover:underline decoration-border-dark underline-offset-4">
                {next.title}
              </span>
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
