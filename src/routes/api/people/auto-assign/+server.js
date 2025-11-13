// import { json } from '@sveltejs/kit';
// import { sql } from '$lib/server/db.js';

// function isEmpty(v) {
//   return v === null || v === undefined || (typeof v === 'string' && v.trim() === '');
// }

// export async function POST() {
//   try {
//     // 1️⃣ Get all people
//     const people = await sql`SELECT * FROM people ORDER BY id`;

//     // 2️⃣ Find those who haven't been assigned anyone yet
//     const unassigned = people.filter(p => isEmpty(p.secret_santa_to));

//     // 3️⃣ Find those who haven't been picked by anyone
//     const unpicked = people.filter(
//       p => !people.some(x => !isEmpty(x.secret_santa_to) && x.secret_santa_to === p.name)
//     );

//     // 4️⃣ Debug info — check if we’re in the 1-to-1 case
//     if (!(unassigned.length === 1 && unpicked.length === 1)) {
//       return json({
//         success: false,
//         message: 'No auto-assignment needed',
//         counts: { total: people.length, unassigned: unassigned.length, unpicked: unpicked.length },
//         sample_unassigned: unassigned.map(p => p.name),
//         sample_unpicked: unpicked.map(p => p.name)
//       });
//     }

//     const giver = unassigned[0];
//     const receiver = unpicked[0];

//     // 5️⃣ Update the giver — set their secret_santa_to
//     await sql`
//       UPDATE people
//       SET secret_santa_to = ${receiver.name}
//       WHERE name = ${giver.name}
//     `;

//     // 6️⃣ Update the receiver — mark as picked
//     await sql`
//       UPDATE people
//       SET is_picked = TRUE
//       WHERE name = ${receiver.name}
//     `;

//     // 7️⃣ Re-fetch updated data
//     const [updatedGiver] = await sql`SELECT * FROM people WHERE name = ${giver.name}`;
//     const [updatedReceiver] = await sql`SELECT * FROM people WHERE name = ${receiver.name}`;

//     return json({
//       success: true,
//       message: `🎁 ${giver.name} is now Secret Santa to ${receiver.name}`,
//       giver: updatedGiver,
//       receiver: updatedReceiver
//     });

//   } catch (err) {
//     console.error('❌ auto-assign error:', err);
//     return json({ error: 'Database error', details: String(err) }, { status: 500 });
//   }
// }