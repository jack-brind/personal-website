import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/Breadcrumb";
import { SmartLink } from "@/components/SmartLink";

function Navigation({
  isHome = false,
  title,
}: {
  isHome: boolean;
  title?: string;
}) {
  if (isHome)
    return (
      <header>
        <SmartLink href="/" variant="nav" className="flex flex-col gap-3">
          <div className="relative mb-8 w-10 h-10 rounded-full overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-black/12 before:z-10">
            <Image
              src="/profile-photo-light.png"
              alt="Profile photo of Jack Brind"
              width={240}
              height={240}
              priority
              className="w-full h-full object-cover dark:hidden"
            />
            <Image
              src="/profile-photo-dark.png"
              alt="Profile photo of Jack Brind"
              width={240}
              height={240}
              priority
              className="w-full h-full object-cover hidden dark:block"
            />
          </div>
        </SmartLink>
        <div className="flex flex-col">
          <h1 className="text-body-lg font-semibold">Jack Brind</h1>
          <h2 className="text-body text-secondary font-medium">
            Product Designer
          </h2>
        </div>
      </header>
    );

  return (
    <header>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <SmartLink
              href="/"
              variant="nav"
              className="flex items-center gap-3 underline decoration-border underline-offset-4 text-sm text-secondary"
            >
              <div className="relative h-6 w-6 rounded-full overflow-hidden before:content-[''] before:absolute before:inset-0 before:rounded-full before:border before:border-black/12 before:z-10">
                <Image
                  src="/profile-photo-light.png"
                  alt="Profile photo of Jack Brind"
                  width={120}
                  height={120}
                  priority
                  className="dark:hidden"
                />
                <Image
                  src="/profile-photo-dark.png"
                  alt="Profile photo of Jack Brind"
                  width={120}
                  height={120}
                  priority
                  className="hidden dark:block"
                />
              </div>
              Home
            </SmartLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="text-secondary text-body-sm">
            /
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage className="text-body-sm">
              {title ?? "Page"}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

export default Navigation;
