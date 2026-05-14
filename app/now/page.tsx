import { Figure } from "@/components/Figure";
import { SmartLink } from "../../components/SmartLink";
import { Separator } from "../../components/ui/Separator";

function NowPage() {
  return (
    <article className="prose">
      <h1 className="mb-14">Now</h1>

      <Figure
        src="/woodland-walk.png"
        alt="Photo of me and my daughter on a walk"
        caption="Me and my daughter on a walk. Photo taken by my talented wife."
        lightboxBorderBg="var(--color-border-dark)"
        width="1340"
        height="800"
      />

      <h2>Work</h2>
      <p>
        I'm focused on a 0 → 1 Workflows initiative at PandaDoc that connects
        two major parts of the product into a brand new orchestration surface.
        This is a complex, cross-domain project teaching me to work at higher
        altitude and keep multiple teams and stakeholders aligned.
      </p>
      <p>
        I'm also building a prototyping playground for the Design team called
        ProtoPanda that removes technical barriers for designers prototyping in
        code with the PandaDoc Design System.
      </p>

      <h2>Learning</h2>
      <p>
        Learning Next.js and TypeScript. Currently working through React Server
        Components and incorporating TypeScript across my projects.
      </p>
      <p>Next up:</p>
      <ul>
        <li>Animations (using Emil Kowalski's Animations on the Web)</li>
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
          <SmartLink href="https://books.google.co.uk/books/about/Project_Hail_Mary.html?id=oxyOEAAAQBAJ">
            Project Hail Mary by Andy Weir
          </SmartLink>
        </li>
        <li>
          Previous:{" "}
          <SmartLink href="https://books.google.co.uk/books/about/To_Die_For_A_Travis_Devine_Novel_3.html?id=X3sSEQAAQBAJ">
            To Die For by David Baldacci
          </SmartLink>
        </li>
      </ul>
      <Separator className="mt-16 mb-10" />
      <p className="italic text-secondary">Last updated Feb 2026.</p>
      <p className="italic text-secondary">
        This{" "}
        <SmartLink href="https://nownownow.com/" className="text-secondary">
          /now page
        </SmartLink>{" "}
        describes what I’ve been up to recently, and is inspired by{" "}
        <SmartLink href="https://sive.rs/" className="text-secondary">
          Derek Sivers
        </SmartLink>
        .
      </p>
    </article>
  );
}

export default NowPage;
