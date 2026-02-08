import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://jackbrind.com";

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/work",
    "/writing",
    "/side-projects",
    "/contact",
    "/now",
    "/colophon",
    "/changelog",
    "/uses",
    "/privacy",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
  }));

  const [writing, sideProjects] = await Promise.all([
    getAllContent("writing"),
    getAllContent("side-projects"),
  ]);

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...writing.map((item) => ({
      url: `${baseUrl}/writing/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
    })),
    ...sideProjects.map((item) => ({
      url: `${baseUrl}/side-projects/${item.slug}`,
      lastModified: item.date ? new Date(item.date) : new Date(),
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}
