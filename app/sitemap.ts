import type { MetadataRoute } from "next";
import { site } from "../config/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    "/about",
    "/contact",
    "/charts",
    "/privacy",
    "/terms",
  ].map((path) => ({ url: `${site.url}${path}` }));
}
