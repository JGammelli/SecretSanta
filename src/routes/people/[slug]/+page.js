import { error } from "@sveltejs/kit";
import { projects } from "../../../lib/data/projects";

// export function load({ params }) {
//   const project = projects.find((project) => project.title === params.slug);

//   if (!project) throw error(404);
//   return project;
// }

export async function load({ params, fetch }) {
  const { slug } = params;

  const res = await fetch(`/api/people/${encodeURIComponent(slug)}`);
  const project = res.ok ? await res.json() : null;

  return { slug, project };
}