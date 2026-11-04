import ArticleList from "../components/ArticleList";
import ProjectSection from "../components/ProjectSection";
import { SmartLink } from "../components/SmartLink";

export default function Page() {
  return (
    <div>
      <p className="w-[48ch] text-secondary mb-8">
        (lean into AI, system's thinker, builder) I design complex software systems and shape them into intuitive,
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
      <ul className="flex items-center gap-6 mb-14">
        <SmartLink href="/about" variant="nav" className="text-sm font-medium">
          About
        </SmartLink>
        <SmartLink
          href="/contact"
          variant="nav"
          className="text-sm font-medium"
        >
          Contact
        </SmartLink>
      </ul>
      <ProjectSection type="case-studies" title="Work" />
      <ProjectSection type="side-projects" title="Side projects" />
      <ArticleList />
    </div>
  );
}
