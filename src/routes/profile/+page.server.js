import { sql } from "$lib/server/db";

export async function load({ locals }) {
    const user_id = locals.user.user_id;
    const {rows: [user]} = await sql`
        SELECT 
            name,
            lastname,
            email,
            gender,
            to_char(birthday,'YYYY-MM-DD') as birthday,
            bio,
            image_data_url,
            COUNT(pal_requests.requestee_id) AS pal_requests_count
        FROM users
        LEFT JOIN pal_requests ON pal_requests.requestee_id = users.user_id
        WHERE user_id=${user_id}
        GROUP BY user_id
        ;
    `;
    return { user };
}


export const actions = {
	default: async ({ request, locals }) => {
        const user_id = locals.user.user_id;
        const data = await request.formData();
        const bio = data.get("bio");
        const image_data_url = data.get("image_data_url");

        const {rows: [new_user]} = await sql`
            UPDATE users
                SET bio=${bio}
                , image_data_url=${image_data_url}
                WHERE user_id=${user_id}
                RETURNING user_id
                ;
        `;
    },
}
