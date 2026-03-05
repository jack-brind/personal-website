import { Figure } from "@/components/Figure";
import { SmartLink } from "../../components/SmartLink";
import { Separator } from "../../components/ui/Separator";

function NowPage() {
  return (
    <article className="prose">
      <h1 className="mb-14">Now</h1>

      <Figure
        src="/test-now-image.png"
        alt="alt tag for now image"
        caption="This is a test image to debug issues with the Figure.tsx component"
        width={1440}
        height={600}
        id="now"
      />

      <h2>Work</h2>
      <p>
        I'm focused on a core Workflows initiative at PandaDoc that
        connects two major parts of the product into a unified surface. This is
        a complex, cross-domain project teaching me to work at higher altitude
        and keep multiple teams aligned.
      </p>

      <h2>Learning</h2>
      <p>
        Learning Next.js and TypeScript. Currently working through React Server
        Components and incorporating TypeScript across my projects.
      </p>
      <p>Next up:</p>
      <ul>
        <li>Animations (using Emil Kowalski's Animations on the Web)</li>
        <li>Testing with Jest</li>
      </ul>

      <h2>Building</h2>
      <p>
        Kaizen – a daily learning resource for designers who want to sharpen
        their fundamentals in design and grasp the basics of web development.
        The name comes from the Japanese philosophy of continuous improvement
        through small, compounding changes. In an age where AI is quietly
        eroding design taste, strong foundations matter more than ever.
      </p>

      <h2>Reading</h2>
      <ul>
        <li>
          Now:{" "}
          <SmartLink href="https://www.hachettebookgroup.com/titles/david-baldacci/to-die-for/9781538757901/">
            To Die For by David Baldacci
          </SmartLink>{" "}
          – The third book in the 6:20 man series.
        </li>
        <li>
          <SmartLink href="https://rosenfeldmedia.com/books/the-staff-designer/?srsltid=AfmBOoq1BN6Iy57dz7WvfUWzh-wA0NiP25WRs9-Mgoeg2Fd7Mc82Df72">
            The Staff Designer by Catt Small
          </SmartLink>
        </li>
      </ul>
      <Separator className="mt-16 mb-10" />
      <p className="italic text-secondary">Last updated Feb 2026.</p>
      <p className="italic text-secondary">
        This <SmartLink href="https://nownownow.com/">/now page</SmartLink>{" "}
        describes what I’ve been up to recently, and is inspired by{" "}
        <SmartLink href="https://sive.rs/">Derek Sivers</SmartLink>.
      </p>
    </article>
  );
}

export default NowPage;
