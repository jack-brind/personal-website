export default function Page() {
  return (
    <div className="flex flex-col gap-6">
      <h1>Home page</h1>
      <p>Headline, work, side projects and articles</p>
      <div className="bg-elevated border border-zinc-200 rounded-xl p-7 shadow-xs">
        This is test – It is an <em>elevated</em> container to demonstrate
        prominence.
      </div>
    </div>
  );
}
