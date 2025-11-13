export async function load({ params, fetch }) {
  const { slug } = params;

  const res = await fetch(`/api/people/${encodeURIComponent(slug)}`);
  const project = res.ok ? await res.json() : null;

  return { slug, project };
}