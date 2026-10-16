import type { Realisation } from "@/lib/content";
import { PROJECT_TITLES } from "@/data/project-seo";
import { pageMetadata } from "@/lib/site";

export function projectMetadata(project: Realisation) {
  return pageMetadata({
    title: PROJECT_TITLES[project.slug] ?? `${project.category} à ${project.city}`,
    description: project.summary,
    path: `/realisations/${project.slug}`,
    type: "article",
  });
}
