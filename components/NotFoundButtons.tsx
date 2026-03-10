"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface Props {
  routes: string[];
}

export function NotFoundButtons({ routes }: Props) {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 w-50">
      <Button asChild variant="default">
        <Link href="/" className="text-white">
          Go to homepage
        </Link>
      </Button>
      <Button
        onClick={() => {
          const route = routes[Math.floor(Math.random() * routes.length)];
          router.replace(route);
        }}
        variant="outline"
      >
        Surprise me
      </Button>
    </div>
  );
}
