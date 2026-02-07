import Link from "next/link";

function Footer() {
  return (
    <footer className="p-6">
      <ul className="flex items-center gap-6">
        <Link href="/uses">Uses</Link>
        <Link href="/changelog">Changelog</Link>
        <Link href="/now">Now</Link>
        <Link href="/colophon">Colophon</Link>
        <Link href="/privacy">Privacy</Link>
      </ul>
    </footer>
  );
}

export default Footer;
