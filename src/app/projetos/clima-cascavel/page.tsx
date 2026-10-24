import type { Metadata } from "next";
import { ProjectPage } from "@/components/ProjectPage";
import { ClimaInside } from "@/components/project/ClimaInside";
import { ClimaStory } from "@/components/project/ClimaStory";
import { photos } from "@/content/photos";
import { climaDetails, projects } from "@/content/site";

const project = projects.find((p) => p.slug === "clima-cascavel")!;
const { story, chapters } = climaDetails;

export const metadata: Metadata = {
  title: "Clima Cascavel",
  description: project.summary,
  alternates: { canonical: "/projetos/clima-cascavel" },
};

export default function ClimaPage() {
  return (
    <ProjectPage
      project={project}
      hero={photos.clima}
      chapters={[
        { title: "O problema", text: project.problem, photo: photos.climaAbout },
        { title: chapters.day.title, text: chapters.day.text, photo: photos.climaDayDetail },
        { title: chapters.live.title, text: chapters.live.text, photo: photos.climaLive },
      ]}
      extra={
        <>
          <ClimaStory
            title={story.title}
            lead={story.lead}
            steps={story.steps.map((caption, i) => ({ caption, photo: photos.climaStory[i] }))}
          />
          <ClimaInside solution={project.solution} />
        </>
      }
      galleryTitle="No celular, instala como app."
      galleryLayout="phones"
      gallery={[
        { title: "Início", note: "com o menu inferior", photo: photos.climaMobile },
        { title: "Detalhe do dia", note: "chuva hora a hora", photo: photos.climaDayDetailMobile },
        { title: "La Niña", note: "o Pacífico esfria", photo: photos.climaLaNinaMobile },
        { title: "El Niño agora", note: "o dado do NOAA", photo: photos.climaNowMobile },
        { title: "Agora no Pacífico", note: "situação oficial", photo: photos.climaLiveMobile },
      ]}
    />
  );
}
