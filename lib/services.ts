import { Home, Droplets, Shield, Sparkles, CloudRain, AppWindow, type LucideIcon } from "lucide-react";

export type ServiceKey =
  | "couverture"
  | "zinguerie"
  | "isolation"
  | "demoussage"
  | "recherche-de-fuite"
  | "fenetres-de-toit";

export interface ServiceItem {
  key: ServiceKey;
  title: string;
  /** Nom utilisé dans les données structurées Service. */
  schemaName: string;
  description: string;
  icon: LucideIcon;
  href: string;
  /** Prestations détaillées, reprises des pages services existantes. */
  highlights: string[];
}

/** Prestations réellement proposées (une page dédiée existe pour chacune). */
export const SERVICES: ServiceItem[] = [
  {
    key: "couverture",
    schemaName: "Couverture et rénovation de toiture",
    title: "Couverture & Toiture",
    description:
      "Rénovation complète ou partielle, pose de tuiles (terre cuite, béton), ardoises et bac acier dans l'Est lyonnais et la métropole de Lyon.",
    icon: Home,
    href: "/services/couverture",
    highlights: [
      "Tuiles en terre cuite et en béton",
      "Ardoises naturelles",
      "Bac acier & toitures plates",
      "Réfection des faîtages et des rives",
    ],
  },
  {
    key: "zinguerie",
    schemaName: "Zinguerie et gouttières",
    title: "Zinguerie & Gouttières",
    description:
      "Installation et réparation de chéneaux, gouttières zinc ou PVC, entourages de cheminée et abergements.",
    icon: Droplets,
    href: "/services/zinguerie",
    highlights: [
      "Gouttières zinc, aluminium, PVC et cuivre",
      "Chéneaux & noues",
      "Abergements de cheminée",
      "Habillage de bandeaux & rives",
    ],
  },
  {
    key: "isolation",
    schemaName: "Isolation de toiture",
    title: "Isolation de Toiture",
    description:
      "Isolation thermique par l'extérieur (Sarking) ou sous combles pour améliorer votre confort et réduire vos factures.",
    icon: Shield,
    href: "/services/isolation",
    highlights: [
      "Isolation par l'extérieur (Sarking)",
      "Isolation des combles aménagés",
      "Isolation des combles perdus par soufflage",
    ],
  },
  {
    key: "demoussage",
    schemaName: "Nettoyage et démoussage de toiture",
    title: "Nettoyage & Démoussage",
    description:
      "Traitement fongicide, démoussage et application d'hydrofuge pour prolonger la durée de vie de votre toit.",
    icon: Sparkles,
    href: "/services/demoussage",
    highlights: [
      "Nettoyage de la couverture",
      "Traitement fongicide anti-mousse",
      "Traitement hydrofuge incolore ou coloré",
      "Nettoyage des gouttières et chéneaux",
    ],
  },
  {
    key: "recherche-de-fuite",
    schemaName: "Recherche de fuite et réparation de toiture",
    title: "Recherche de Fuite & Urgence",
    description:
      "Localisation de l'origine d'une infiltration, bâchage et mise hors d'eau, puis réparation de la toiture, y compris après intempéries.",
    icon: CloudRain,
    href: "/services/recherche-de-fuite",
    highlights: [
      "Recherche de l'origine de l'infiltration",
      "Bâchage et mise hors d'eau",
      "Réparation de tuiles, solins, noues et abergements",
      "Interventions après orage ou grêle",
    ],
  },
  {
    key: "fenetres-de-toit",
    schemaName: "Pose et remplacement de fenêtres de toit",
    title: "Fenêtres de Toit",
    description:
      "Création, pose et remplacement de fenêtres de toit de type Velux et de verrières, avec raccordement d'étanchéité à la couverture.",
    icon: AppWindow,
    href: "/services/fenetres-de-toit",
    highlights: [
      "Création d'une ouverture en toiture",
      "Remplacement d'anciennes fenêtres de toit",
      "Verrières de toit",
      "Raccordements d'étanchéité à la couverture",
    ],
  },
];

export function getService(key: ServiceKey): ServiceItem {
  const service = SERVICES.find((item) => item.key === key);
  if (!service) throw new Error(`Service inconnu : ${key}`);
  return service;
}
