import { ClimaPage, climaMetadata } from "@/components/pages/ClimaPage";

export const metadata = climaMetadata("pt");

export default function Page() {
  return <ClimaPage locale="pt" />;
}
