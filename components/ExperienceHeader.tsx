import { CompanyLogo } from "./CompanyLogo";

export function ExperienceHeader({
  company,
  description,
}: {
  company: string;
  description: string;
}) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-4 mb-2">
        <CompanyLogo name={company} />
        <h3>{company}</h3>
      </div>
      <p className="pl-12 text-body-sm text-secondary">{description}</p>
    </div>
  );
}
