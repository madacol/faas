import { sql } from "$lib/server/db";


export async function load({ locals, params }) {
    const user_id = locals.user.user_id;
    const {rows: [user]} = await sql`
        SELECT 
        user_id,
            name,
            lastname,
            email,
            gender,
            image_data_url,
            to_char(birthday,'YYYY-MM-DD') as birthday,
            bio
            FROM users
            JOIN pal_requests ON pal_requests.requestee_id = users.user_id
            WHERE user_id=${params.pal_user_id}
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
