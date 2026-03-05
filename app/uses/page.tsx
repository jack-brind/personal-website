import { UsesItem } from "@/components/UsesItem";

const designEngineeringTools = [
  {
    logo: "/logos/figma.png",
    name: "Figma",
    description:
      "My go-to design tool for UI explorations and creating a shared vision.",
    link: "https://figma.com",
  },
  {
    logo: "/logos/vscode.png",
    name: "VS Code",
    description:
      "My primary code editor, extended with a handful of essential plugins.",
    link: "https://code.visualstudio.com",
  },
  {
    logo: "/logos/github.png",
    name: "GitHub",
    description:
      "Where I host all of my repositories and manage pull requests.",
    link: "https://github.com",
  },
  {
    logo: "/logos/nextjs.png",
    name: "Next.js",
    description: "My React framework of choice when building my side projects.",
    link: "https://nextjs.org",
  },
  {
    logo: "/logos/typescript.png",
    name: "TypeScript",
    description:
      "Typed JavaScript that helps me catch bugs before they happen.",
    link: "https://typescriptlang.org",
  },
  {
    logo: "/logos/tailwind.png",
    name: "Tailwind CSS",
    description:
      "Utility-first CSS framework for rapidly building custom designs.",
    link: "https://tailwindcss.com",
  },
  {
    logo: "/logos/vercel.png",
    name: "Vercel",
    description: "Where I deploy all of my code.",
    link: "https://vercel.com",
  },
  {
    logo: "/logos/claudecode.png",
    name: "Claude Code",
    description: "I use Claude Code as a VS Code extension.",
    link: "https://claude.ai/code",
  },
];

const productivityTools = [
  {
    logo: "/logos/linear.png",
    name: "Linear",
    description: "I use Linear to track all of my side projects and tasks.",
    link: "https://linear.app",
  },
  {
    logo: "/logos/raycastlogo.png",
    name: "Raycast",
    description: "A supercharged launcher that replaced Spotlight entirely.",
    link: "https://raycast.com",
  },
  {
    logo: "/logos/claude.png",
    name: "Claude",
    description:
      "My primary AI assistant for planning, research, and problem solving.",
    link: "https://claude.ai",
  },
  {
    logo: "/logos/chatgpt.png",
    name: "ChatGPT",
    description:
      "Useful for quick lookups and a second opinion alongside Claude.",
    link: "https://chatgpt.com",
  },
  {
    logo: "/logos/dia.png",
    name: "Dia",
    description: "An AI-native browser I use for research-heavy sessions.",
    link: "https://dia.so",
  },
  {
    logo: "/logos/cleanshot.png",
    name: "CleanShot X",
    description: "The best screenshot and screen recording tool on macOS.",
    link: "https://cleanshot.com",
  },
  {
    logo: "/logos/granola.png",
    name: "Granola",
    description:
      "AI meeting notes that runs quietly in the background during calls.",
    link: "https://granola.so",
  },
  {
    logo: "/logos/obsidian.png",
    name: "Obsidian",
    description: "My personal knowledge base for notes, ideas, and logs.",
    link: "https://obsidian.md",
  },
];

function page() {
  return (
    <article className="prose">
      <h1 className="mb-8">Uses</h1>
      <p>
        Tools I use for design, development, and daily work. Updated regularly.
      </p>
      <h2>Design & Engineering</h2>
      <div className="not-prose grid grid-cols-5 mt-12">
        {designEngineeringTools.map((item) => (
          <UsesItem key={item.name} {...item} />
        ))}
      </div>

      <h2>Productivity</h2>
      <div className="not-prose grid grid-cols-5 mt-12">
        {productivityTools.map((item) => (
          <UsesItem key={item.name} {...item} />
        ))}
      </div>
    </article>
  );
}

export default page;
