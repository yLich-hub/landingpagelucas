import { IpsisPage, ipsisMetadata } from "@/components/pages/IpsisPage";

export const metadata = ipsisMetadata("en");

export default function Page() {
  return <IpsisPage locale="en" />;
}
