import Link from "next/link";

function page() {
  return (
    <div>
      <h1>Work</h1>
      <nav className="flex flex-col gap-5">
        <Link href="/work/pandadoc">PandaDoc Case Study</Link>
        <Link href="/work/itris">itris Case Study</Link>
      </nav>
    </div>
  );
}

export default page;
