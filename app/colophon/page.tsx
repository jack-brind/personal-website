/* eslint-disable react/no-unescaped-entities */
import { ColophonItem } from "@/components/ColophonItem";
import { SmartLink } from "../../components/SmartLink";

function ColophonPage() {
  return (
    <article className="prose">
      <h1 className="mb-8">Colophon</h1>
      <p>
        This site is designed and built by me with a little help from Claude
        Code. It is hosted and deployed through Vercel.
      </p>

      <h2>Tech stack</h2>
      <div className="not-prose flex flex-col gap-5 mt-8">
        <ColophonItem
          logo="nextjs"
          name="Next.js"
          description="App Router, RSC, and image/font optimisation out of the box."
          variant="Tech"
        />
        <ColophonItem
          logo="typescript"
          name="TypeScript"
          description="Ubiquitous, and the type safety keeps the codebase robust."
          variant="Tech"
        />
        <ColophonItem
          logo="tailwind"
          name="Tailwind CSS"
          description="Co-located styles, zero dead CSS, and a great v4 config model."
          variant="Tech"
        />
        <ColophonItem
          logo="mdx"
          name="MDX"
          description="next-mdx-remote – JSX components embedded directly in Markdown."
          variant="Tech"
        />
        <ColophonItem
          logo="shadcn"
          name="shadcn/ui"
          description="Radix primitives, unstyled – owned components, not a dependency."
          variant="Tech"
        />
        <ColophonItem
          logo="figma"
          name="Figma"
          description="Design scratchpad before anything touches code."
          variant="Tech"
        />
        <ColophonItem
          logo="lucide"
          name="Lucide Icons"
          description="Consistent stroke icons via lucide-react."
          variant="Tech"
        />
      </div>
      <h2>Fonts</h2>
      <div className="not-prose flex flex-col gap-5 mt-6">
        <ColophonItem
          name="Inter"
          description="I love Inter's versatility and italic style."
          variant="Font"
        />
        <ColophonItem
          name="Inter Display"
          description="Inter, but optimised for larger headline text and looks great!"
          variant="Font"
        />
        <ColophonItem
          name="Lora"
          description="Lora is the serif font on the site to contrast with Inter."
          variant="Font"
        />
        <ColophonItem
          name="JetBrains Mono"
          description="My personal favourite free mono font. I use this in my IDE as well."
          variant="Font"
        />
      </div>
      <h2>AI</h2>
      <p>
        AI was used throughout as a pair programmer – not to write the site, but
        to accelerate the parts that benefit: reviewing code, thinking through
        component APIs, and tackling the technically demanding bits. Every
        output was read and often revised. The decisions and the understanding
        are mine.
      </p>

      <h2>Principles</h2>
      <p>
        This site prioritises content over chrome, removes everything
        unnecessary, and keeps navigation shallow. It respects your system theme
        preference, treats accessibility as a requirement, and is maintained
        like a product with a public repository and changelog.
      </p>
      <ul>
        <li>
          Content first – Navigation and chrome exist to serve the work, not
          compete with it.
        </li>
        <li>
          Remove until you can't – The design is finished when there's nothing
          left to take away.
        </li>
        <li>
          Shallow navigation – One level deep wherever possible. No getting
          lost.
        </li>
        <li>
          Mobile first – Designed for small screens, enhanced for large ones.
        </li>
        <li>
          System theme only – Respects your OS preference. No theme toggle.
        </li>
        <li>
          Treat it like a product – Public repo, changelog, maintained over
          time.
        </li>
        <li>
          Accessibility matters – Semantic HTML, keyboard navigation, proper
          contrast.
        </li>
      </ul>
      <h2>Maintanence</h2>
      <p>
        This site is open source.{" "}
        <SmartLink
          href="https://github.com/jack-brind/personal-website"
          variant="external"
        >
          View the code
        </SmartLink>{" "}
        on GitHub
      </p>
      <p>
        You can also see the <SmartLink href="/changelog">changelog</SmartLink>.
      </p>
    </article>
  );
}

export default ColophonPage;
