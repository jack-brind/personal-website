import { getAllSlugs } from "@/lib/content";
import { NotFoundButtons } from "@/components/NotFoundButtons";

const staticRoutes = [
  "/about",
  "/shots",
  "/contact",
  "/changelog",
  "/uses",
  "/colophon",
  "/now",
];

export default async function NotFound() {
  const [articleSlugs, workSlugs, sideProjectSlugs] = await Promise.all([
    getAllSlugs("articles"),
    getAllSlugs("case-studies"),
    getAllSlugs("side-projects"),
  ]);

  const routes = [
    ...staticRoutes,
    ...articleSlugs.map((slug) => `/articles/${slug}`),
    ...workSlugs.map((slug) => `/work/${slug}`),
    ...sideProjectSlugs.map((slug) => `/side-projects/${slug}`),
  ];

  return (
    <div className="flex flex-col items-center text-center gap-6 mt-24">
      <div className="flex flex-col gap-2 mb-3.5">
        <span className="text-body text-secondary font-semibold">404</span>
        <h1 className="text-display-lg">Page not found</h1>
        <p className="text-secondary font-medium mt-2">
          The page you're trying to access does not exist.
        </p>
      </div>
      <NotFoundButtons routes={routes} />
    </div>
  );
}
