import { ClimaPage, climaMetadata } from "@/components/pages/ClimaPage";

export const metadata = climaMetadata("en");

export default function Page() {
  return <ClimaPage locale="en" />;
}
