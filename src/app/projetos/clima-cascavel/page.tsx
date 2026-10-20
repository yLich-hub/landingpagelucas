import type { Metadata } from "next";
import { ProjectPage } from "@/components/ProjectPage";
import { photos } from "@/content/photos";
import { projects } from "@/content/site";

const project = projects.find((p) => p.slug === "clima-cascavel")!;

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
        { title: "O problema", text: project.problem, photo: photos.climaElNino },
        { title: "A decisão", text: project.solution, photo: photos.climaDays },
      ]}
      galleryTitle="A cena muda com o tempo em Cascavel."
      gallery={[
        { title: "Céu limpo, à noite", photo: photos.climaMobile },
        { title: "Garoa", photo: photos.climaDrizzleMobile },
        { title: "El Niño no celular", photo: photos.climaElNinoMobile },
        { title: "Nublado", photo: photos.climaCloudy },
        { title: "El Niño: situação atual", photo: photos.climaElNinoData },
        { title: "Próximos dias", photo: photos.climaDays },
      ]}
    />
  );
}
