import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

// La page contact est un Client Component : ses metadata sont portées par ce layout de segment.
export const metadata: Metadata = pageMetadata({
  title: "Contacter Jrenov, couvreur à Décines-Charpieu",
  description:
    "Contactez Jrenov, artisan couvreur-zingueur basé à Décines-Charpieu (69150) : appel au 04 65 84 88 85, e-mail ou formulaire. Interventions à Lyon et dans sa métropole.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
