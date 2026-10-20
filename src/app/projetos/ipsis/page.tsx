import type { Metadata } from "next";
import { ProjectPage } from "@/components/ProjectPage";
import { ipsisScreens, photos } from "@/content/photos";
import { projects } from "@/content/site";

const project = projects.find((p) => p.slug === "ipsis")!;

export const metadata: Metadata = {
  title: "Ipsis",
  description: `${project.summary} ${project.claim}`,
  alternates: { canonical: "/projetos/ipsis" },
};

export default function IpsisPage() {
  return (
    <ProjectPage
      project={project}
      hero={photos.ipsisLanding}
      chapters={[
        { title: "O problema", text: project.problem, photo: photos.ipsisCitation },
        { title: "A decisão", text: project.solution, photo: photos.ipsisDecisions },
      ]}
      galleryTitle="As sete telas, do chat à dosimetria."
      gallery={ipsisScreens.map((s) => ({ title: s.title, note: s.note, photo: s.photo }))}
    />
  );
}
