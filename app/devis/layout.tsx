import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";

// La page devis est un Client Component : ses metadata sont portées par ce layout de segment.
export const metadata: Metadata = pageMetadata({
  title: "Devis toiture et couverture gratuit en ligne",
  description:
    "Demandez votre devis gratuit et sans engagement pour vos travaux de couverture, zinguerie, isolation ou démoussage de toiture avec Jrenov. Réponse sous 24h.",
  path: "/devis",
});

export default function DevisLayout({ children }: { children: React.ReactNode }) {
  return children;
}
