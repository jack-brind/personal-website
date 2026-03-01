import { ExperienceHeader } from "./ExperienceHeader";
import { ExperienceRoleList } from "./ExperienceRoleList";

interface Role {
  title: string;
  start: string;
  end: string;
}

interface ExperienceEntryProps {
  company: string;
  description: string;
  roles: Role[];
}

export function ExperienceEntry({
  company,
  description,
  roles,
}: ExperienceEntryProps) {
  return (
    <div className="mb-16">
      <ExperienceHeader company={company} description={description} />
      <ExperienceRoleList roles={roles} />
    </div>
  );
}
