import Link from "next/link";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/Breadcrumb";

function Navigation({ isHome = false }: { isHome: boolean }) {
  if (isHome)
    return (
      <header>
        <Link href="/" className="flex flex-col gap-3">
          <div className="mb-8 w-10 h-10 rounded-full border border-black/12 overflow-hidden">
            <Image
              src="/profile-image-light.png"
              alt="Profile photo of Jack Brind"
              width={40}
              height={40}
              priority
              className="w-full h-full object-cover"
            />
          </div>
        </Link>
        <div className="flex flex-col">
          <h1 className="text-display-sm font-semibold">Jack Brind</h1>
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
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/profile-image-light.png"
                alt="Profile photo of Jack Brind"
                width={24}
                height={24}
                priority
              />
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

export default Navigation;
