import Link from "next/link";
import Image from "next/image";

function Navigation() {
  return (
    <header className="flex items-center justify-between p-6">
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/favicon.ico"
          alt="Site logo"
          width={24}
          height={24}
          priority
        />
        Jack Brind ∙ Product Designer
      </Link>

      <nav>
        <ul className="flex items-center gap-6">
          <li>
            <Link href="/work">Work</Link>
          </li>
          <li>
            <Link href="/side-projects">Side projects</Link>
          </li>
          <li>
            <Link href="/writing">Writing</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Navigation;
