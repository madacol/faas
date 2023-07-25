import { sql } from "$lib/server/db";


export async function load({ params }) {
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
            WHERE user_id=${params.pal_user_id}
            GROUP BY user_id
            ;
    `;
    return { user };
}
