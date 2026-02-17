import { getAllContent } from "../lib/content";
import ProjectItems from "./ProjectItems";

async function ProjectSection({
  type,
  title,
}: {
  type: string;
  title: string;
}) {
  const allItems = await getAllContent(type);

  return <ProjectItems items={allItems} title={title} />;
}

export default ProjectSection;
