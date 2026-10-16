import photoData from "@/data/photo-registry.json";
import draftData from "@/data/project-drafts.json";
import type { ServiceKey } from "@/lib/services";

export interface Approval {
  status: "pending" | "approved" | "rejected";
  /** Référence de validation explicite de l'entreprise, jamais un nom de fichier. */
  evidence: string | null;
}

export interface ProjectPhoto {
  id: string;
  originalName: string;
  sourceUrl: string;
  sourceFolderId: string;
  mimeType: string;
  validation: Approval;
  localPath: string | null;
  width: number | null;
  height: number | null;
  alt: string | null;
  projectSlug: string | null;
}

export interface ProjectDraft {
  slug: string;
  status: "draft" | "published";
  title: string | null;
  city: string | null;
  intervention: string | null;
  summary: string | null;
  description: string | null;
  services: ServiceKey[];
  photoIds: string[];
  validation: { city: Approval; works: Approval };
  /** Date et durée facultatives : ne pas les déduire des métadonnées Drive. */
  date?: string;
  duration?: string;
}

export const projectPhotos = photoData as ProjectPhoto[];
export const projectDrafts = draftData as ProjectDraft[];

const approved = (value: Approval) => value.status === "approved" && Boolean(value.evidence?.trim());

/** Seul point d'entrée pour publier une NOUVELLE fiche chantier. Échec fermé. */
export function publicationIssues(project: ProjectDraft, photos: ProjectPhoto[] = projectPhotos): string[] {
  const issues: string[] = [];
  if (project.status !== "published") issues.push("Brouillon");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug)) issues.push("Slug invalide");
  if (!project.city?.trim() || !approved(project.validation.city)) issues.push("Commune non confirmée");
  if (!approved(project.validation.works)) issues.push("Travaux non confirmés");
  if (![project.title, project.intervention, project.summary, project.description].every((text) => text?.trim())) {
    issues.push("Description incomplète");
  }
  if (!project.services.length || project.services.some((key) => !SERVICE_KEYS.includes(key))) issues.push("Prestations manquantes ou inconnues");
  if (!project.photoIds.length) issues.push("Photos manquantes");
  for (const id of project.photoIds) {
    const photo = photos.find((item) => item.id === id);
    if (!photo || !approved(photo.validation) || photo.projectSlug !== project.slug ||
      !photo.sourceUrl.startsWith("https://drive.google.com/") || !photo.originalName.trim() ||
      !photo.localPath?.startsWith("/images/realisations/") || photo.localPath.includes("..") ||
      !photo.alt?.trim() || !Number.isInteger(photo.width) || !Number.isInteger(photo.height) ||
      (photo.width ?? 0) <= 0 || (photo.height ?? 0) <= 0) {
      issues.push(`Photo non validée : ${id}`);
    }
  }
  return issues;
}

// Liste sans icônes ni import de contenu public : évite une dépendance circulaire.
const SERVICE_KEYS: ServiceKey[] = ["couverture", "zinguerie", "isolation", "demoussage", "recherche-de-fuite", "fenetres-de-toit"];

export function publishableProjects(): ProjectDraft[] {
  for (const project of projectDrafts) {
    if (project.status === "published") {
      const issues = publicationIssues(project);
      if (issues.length) throw new Error(`[project-publication] ${project.slug}: ${issues.join(", ")}`);
    }
  }
  return projectDrafts.filter((project) => publicationIssues(project).length === 0);
}
