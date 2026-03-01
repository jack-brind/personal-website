export function ExperienceRole({
  title,
  start,
  end,
}: {
  title: string;
  start: string;
  end: string;
}) {
  return (
    <div className="flex items-center gap-5">
      <p className="w-52 font-medium">{title}</p>
      <p className="text-secondary">
        {start} – {end}
      </p>
    </div>
  );
}
