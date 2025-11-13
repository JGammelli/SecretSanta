import { json } from '@sveltejs/kit';
import { sql } from '$lib/server/db.js';

export async function PATCH({ params, request }) {
  const { name } = params;
  const updates = await request.json();
  const { secretSantaTo, isPicked } = updates;

  try {
    const [row] = await sql`
      UPDATE people
      SET 
        secretSantaTo = COALESCE(${secretSantaTo}, secretSantaTo),
        isPicked = COALESCE(${isPicked}, isPicked)
      WHERE name = ${decodeURIComponent(name)}
      RETURNING *
    `;

    if (!row) {
      return json({ error: 'Person not found' }, { status: 404 });
    }

    return json(row);
  } catch (err) {
    console.error(' Database error:', err);
    return json({ error: 'Database error' }, { status: 500 });
  }
}


export async function GET({ params }) {
  const { name } = params;

  try {
    const rows = await sql`
      SELECT * FROM people
      WHERE name = ${decodeURIComponent(name)}
    `;

    if (rows.length === 0) {
      return json({ error: 'Project not found' }, { status: 404 });
    }

    return json(rows[0]);
  } catch (err) {
    console.error(err);
    return json({ error: 'Database error' }, { status: 500 });
  }
}