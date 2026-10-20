import { ClimaScene } from "@/components/home/ClimaScene";
import { ContactScene } from "@/components/home/ContactScene";
import { HeroScene } from "@/components/home/HeroScene";
import { InviteBuilder } from "@/components/home/InviteBuilder";
import { IpsisScene } from "@/components/home/IpsisScene";
import { JourneyScene } from "@/components/home/JourneyScene";
import { ManifestoScene } from "@/components/home/ManifestoScene";
import { ScreensScene } from "@/components/home/ScreensScene";
import { LogoInline } from "@/components/LogoInline";

// o roteiro da home, cena por cena (docs/direcao-de-arte.md)
export default function HomePage() {
  return (
    <>
      <HeroScene logo={<LogoInline className="w-full text-cream" />} />
      <ManifestoScene />
      <IpsisScene />
      <ScreensScene />
      <ClimaScene />
      <JourneyScene />
      <InviteBuilder />
      <ContactScene />
    </>
  );
}
