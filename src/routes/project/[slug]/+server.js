// src/routes/project/[slug]/+server.js
import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';
import { projects } from '$lib/data/projects.js';

const filePath = path.resolve('src/lib/data/projects.js');

export async function PATCH({ params, request }) {
  const { slug } = params; // <-- use slug instead of title
  const updates = await request.json();

  const project = projects.find(p => p.title === slug); // title still comes from data
  if (!project) return json({ error: 'Not found' }, { status: 404 });

  Object.assign(project, updates);

  fs.writeFileSync(
    filePath,
    `export const projects = ${JSON.stringify(projects, null, 2)};`
  );

  return json({ success: true, project });
}