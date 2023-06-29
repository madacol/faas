import { sql } from "$lib/server/db";

/** @type {import('@sveltejs/kit').Load} */
export async function load({ locals }) {
    const user_id = locals.user.user_id;
    const {rows: [user]} = await sql`
        SELECT 
            name,
            lastname,
            email,
            gender,
            birthday,
            bio,
            COUNT(pal_requests.requestee_id) AS pal_requests_count
            FROM users
            JOIN pal_requests ON pal_requests.requestee_id = users.user_id
            WHERE user_id=${user_id}
            GROUP BY user_id
            ;
    `;

    return { user };
}


/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ request, locals }) => {
        const user_id = locals.user.user_id;
        const data = await request.formData();
        const bio = data.get("bio");

        const {rows: [new_user]} = await sql`
            UPDATE users
                SET bio=${bio}
                WHERE user_id=${user_id}
                RETURNING user_id
                ;
        `;
    },
}
