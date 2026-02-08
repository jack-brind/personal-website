import Link from "next/link";
import { getAllContent } from "@/lib/content";

async function WorkPage() {
  const caseStudies = await getAllContent("case-studies");

  return (
    <div>
      <h1>Work</h1>
      <nav className="flex flex-col gap-5">
        {caseStudies.map((caseStudy) => (
          <Link key={caseStudy.slug} href={`/work/${caseStudy.slug}`}>
            {caseStudy.title}
          </Link>
        ))}
      </nav>
    </div>
  );
}

export default WorkPage;
