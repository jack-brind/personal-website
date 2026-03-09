import { SmartLink } from "@/components/SmartLink";
import { Separator } from "@/components/ui/Separator";

export default function CaseStudyFooter() {
  return (
    <div className="italic text-secondary">
      <Separator className="mb-6 mt-10" />
      <p className="text-body-sm">
        The UI in this case study represents the direction I was taking as part
        of a product redesign initiative. Although the project was later
        deprioritised and not released, this work is a more accurate reflection
        of my current design approach.
      </p>
      <p className="text-body-sm">
        If you're interested in talking more about this project, please{" "}
        <SmartLink href="/contact" className="text-body-sm">
          get in touch
        </SmartLink>
        .
      </p>
    </div>
  );
}
