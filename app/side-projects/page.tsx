import Link from "next/link";
import { getAllContent } from "@/lib/content";

async function SideProjectPage() {
  const sideProject = await getAllContent("side-projects");

  return (
    <div>
      <h1>Side projects</h1>
      <nav className="flex flex-col gap-5">
        {sideProject.map((app) => (
          <Link key={app.slug} href={`/side-projects/${app.slug}`}>
            {app.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default SideProjectPage;
