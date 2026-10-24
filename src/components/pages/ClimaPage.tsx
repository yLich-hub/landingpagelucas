import type { Metadata } from "next";
import { ClimaInside } from "@/components/project/ClimaInside";
import { ClimaStory } from "@/components/project/ClimaStory";
import { ProjectPage } from "@/components/ProjectPage";
import { pageAlternates } from "@/components/RootShell";
import { getContent, paths, type Locale } from "@/content";
import { getPhotos } from "@/content/photos";

const climaOf = (locale: Locale) => getContent(locale).projects.find((p) => p.slug === "clima-cascavel")!;

export function climaMetadata(locale: Locale): Metadata {
  return {
    title: "Clima Cascavel",
    description: climaOf(locale).summary,
    alternates: pageAlternates(paths.project(locale, "clima-cascavel")),
  };
}

export function ClimaPage({ locale }: { locale: Locale }) {
  const c = getContent(locale);
  const t = c.ui.project;
  const { story, chapters, gallery } = c.clima;
  const project = climaOf(locale);
  const photos = getPhotos(locale);
  return (
    <ProjectPage
      locale={locale}
      project={project}
      hero={photos.clima}
      chapters={[
        { title: t.problem, text: project.problem, photo: photos.climaAbout },
        { title: chapters.day.title, text: chapters.day.text, photo: photos.climaDayDetail },
        { title: chapters.live.title, text: chapters.live.text, photo: photos.climaLive },
      ]}
      extra={
        <>
          <ClimaStory
            locale={locale}
            title={story.title}
            lead={story.lead}
            steps={story.steps.map((caption, i) => ({ caption, photo: photos.climaStory[i] }))}
          />
          <ClimaInside locale={locale} solution={project.solution} />
        </>
      }
      galleryTitle={t.climaGallery}
      galleryLayout="phones"
      gallery={[
        { ...gallery.home, photo: photos.climaMobile },
        { ...gallery.day, photo: photos.climaDayDetailMobile },
        { ...gallery.laNina, photo: photos.climaLaNinaMobile },
        { ...gallery.now, photo: photos.climaNowMobile },
        { ...gallery.live, photo: photos.climaLiveMobile },
      ]}
    />
  );
}
