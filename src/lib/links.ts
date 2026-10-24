import { contact } from "@/content/shared";

export const hasWhatsapp = contact.whatsappNumber.length > 0;

export function whatsappUrl(text?: string) {
  const base = `https://wa.me/${contact.whatsappNumber}`;
  return text ? `${base}?text=${encodeURIComponent(text)}` : base;
}

export function mailtoUrl(body: string | undefined, subject: string) {
  const params = new URLSearchParams();
  params.set("subject", subject);
  if (body) params.set("body", body);
  // URLSearchParams troca espaço por "+", que alguns clientes de e-mail não decodificam
  return `mailto:${contact.email}?${params.toString().replace(/\+/g, "%20")}`;
}
