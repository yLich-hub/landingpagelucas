import type { Metadata } from "next";
import { ProjectPage } from "@/components/ProjectPage";
import { pageAlternates } from "@/components/RootShell";
import { getContent, paths, type Locale } from "@/content";
import { getIpsisScreens, getPhotos } from "@/content/photos";

const ipsisOf = (locale: Locale) => getContent(locale).projects.find((p) => p.slug === "ipsis")!;

export function ipsisMetadata(locale: Locale): Metadata {
  return {
    title: "Ipsis",
    description: getContent(locale).seo.ipsisDescription,
    alternates: pageAlternates(paths.project(locale, "ipsis")),
  };
}

export function IpsisPage({ locale }: { locale: Locale }) {
  const t = getContent(locale).ui.project;
  const project = ipsisOf(locale);
  const photos = getPhotos(locale);
  return (
    <ProjectPage
      locale={locale}
      project={project}
      hero={photos.ipsisLanding}
      chapters={[
        { title: t.problem, text: project.problem, photo: photos.ipsisCitation },
        { title: t.decision, text: project.solution, photo: photos.ipsisDecisions },
      ]}
      galleryTitle={t.ipsisGallery}
      gallery={getIpsisScreens(locale).map((s) => ({ title: s.title, note: s.note, photo: s.photo }))}
    />
  );
}
