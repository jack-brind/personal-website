import { ExperienceRole } from "./ExperienceRole";

interface Role {
  title: string;
  start: string;
  end: string;
}

export function ExperienceRoleList({ roles }: { roles: Role[] }) {
  const showTimeline = roles.length > 1;

  return (
    <div className={`${showTimeline ? "pl-3" : "pl-12"} flex flex-col`}>
      {roles.map((role, index) => (
        <div
          key={role.start}
          className={showTimeline ? "relative pl-9 py-1.5" : ""}
        >
          {showTimeline && (
            <>
              <div className="absolute left-0 top-1/2 z-10 size-1.5 -translate-y-1/2 rounded-full bg-border-dark outline-2 outline-default" />
              {index < roles.length - 1 && (
                <div className="absolute left-[2.5px] top-1/2 bottom-0 w-px bg-border-dark" />
              )}
              {index > 0 && (
                <div className="absolute left-[2.5px] top-0 bottom-1/2 w-px bg-border-dark" />
              )}
            </>
          )}
          <ExperienceRole
            title={role.title}
            start={role.start}
            end={role.end}
          />
        </div>
      ))}
    </div>
  );
}
