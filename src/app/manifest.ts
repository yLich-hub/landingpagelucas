import type { MetadataRoute } from "next";
import { person } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${person.name} — portfólio`,
    short_name: "lucas.vieira",
    description: person.shortBio,
    start_url: "/",
    display: "standalone",
    background_color: "#09090c",
    theme_color: "#09090c",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
