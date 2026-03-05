"use client";

import { ProfileImage } from "@/components/ProfileImage";
import { ExperienceEntry } from "../../components/ExperienceEntry";
import { SmartLink } from "../../components/SmartLink";

function AboutPage() {
  return (
    <div>
      <h1 className="mb-8">About</h1>
      <div className="flex items-start justify-between">
        <div className="flex flex-col w-102">
          <p className="mb-6">
            I'm Jack, a Senior Product Designer from the UK, working at PandaDoc
            in the Workflows domain. Previously, I was the first design hire at
            itris, a recruitment CRM, where I worked solo for over a decade
            designing a complete platform rewrite. Being the only designer meant
            I was involved in everything from product strategy and
            specifications to getting into the code to smooth out rough edges.
          </p>
          <p className="mb-20">
            I came to design through writing after finishing my Philosophy
            degree, and I spent 18 months writing technical documentation before
            transitioning into a design role. I approach problems pragmatically,
            focusing on what users actually need rather than what they ask for.
            I collaborate closely with engineers and product managers, and I'm
            comfortable contributing to technical conversations when it helps
            move the work forward.
          </p>
        </div>
        <ProfileImage />
      </div>
      <h2 className="mb-8">Experience</h2>
      <ExperienceEntry
        company="PandaDoc"
        description="Workflows domain, designing complex B2B workflow orchestration features for a large-scale SaaS platform. Working with cross-functional teams to solve holistic problems."
        roles={[
          {
            title: "Senior Product Designer",
            start: "Jul 2025",
            end: "Present",
          },
        ]}
      />

      <ExperienceEntry
        company="itris"
        description="Led the design of a complete platform rewrite from the ground up, generated a 107% increase in ARR in the first year, then continued evolving the product with major features."
        roles={[
          {
            title: "Senior Product Designer",
            start: "Jan 2020",
            end: "Mar 2025",
          },
          { title: "Product Designer", start: "Nov 2014", end: "Jan 2020" },
          { title: "Technical Writer", start: "Jun 2013", end: "Nov 2014" },
        ]}
      />
      <h2 className="mb-8">Outside of work</h2>
      <p className="mb-6">
        When I'm not designing, I love spending time with my wife and daughter.
        I also enjoy long country walks, playing golf and{" "}
        <SmartLink variant="external" href="https://unsplash.com/@brindo_">
          photography
        </SmartLink>
        . I also love to go snowboarding when I get the chance, and I have
        always loved travelling to new places. Aside from that, I love to learn
        new things – I'm currently learning JavaScript and React which you can
        read about{" "}
        <SmartLink href="https://jackbrind.com/src/365-days-of-javascript.html">
          here
        </SmartLink>
        .
      </p>
    </div>
  );
}

export default AboutPage;
