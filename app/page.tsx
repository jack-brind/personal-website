import ArticleList from "../components/ArticleList";
import ProjectSection from "../components/ProjectSection";
import { SmartLink } from "../components/SmartLink";

export default function Page() {
  return (
    <div>
      <p className="w-[48ch] text-secondary mb-12">
        I design complex software systems and shape them into intuitive,
        well-crafted experiences. I currently work at{" "}
        <SmartLink
          href="https://www.pandadoc.com/"
          variant="external"
          className="text-secondary"
        >
          PandaDoc
        </SmartLink>
        , designing document workflows that feel effortless.
      </p>
      <ul className="flex items-center gap-6 mb-16">
        <SmartLink href="/about" variant="nav">
          About
        </SmartLink>
        {/* <SmartLink href="/shots" variant="nav">
          Shots
        </SmartLink> */}
        <SmartLink href="/contact" variant="nav">
          Contact
        </SmartLink>
      </ul>
      <ProjectSection type="case-studies" title="Work" />
      <ProjectSection type="side-projects" title="Side projects" />
      <ArticleList />
    </div>
  );
}
