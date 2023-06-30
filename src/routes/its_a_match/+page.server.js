import { sql } from "$lib/server/db";

export async function load({ locals, params }) {
    
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
