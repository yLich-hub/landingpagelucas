import type { MetadataRoute } from "next";
import { person } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: new URL("/sitemap.xml", person.url).toString() };
}
