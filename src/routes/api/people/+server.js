import { json } from '@sveltejs/kit';
import { sql } from '$lib/server/db.js';

export async function GET() {
  try {
    const rows = await sql`SELECT * FROM people ORDER BY id`;
    return json(rows);
  } catch (err) {
    console.error(err);
    return json({ error: 'Database error' }, { status: 500 });
  }
}
