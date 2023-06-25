import { checkPermissions_MW } from "$lib/server/checkPermissions_MW";
import { sql } from "$lib/server/db";


/** @type {import('./$types').PageServerLoad} */
export const load = checkPermissions_MW(
    'read_users',
    async () => {
        const {rows: users} = await sql`
            SELECT
                username
                , name
                , lastname
                , email
            FROM users
            WHERE is_verified = FALSE
            ORDER BY user_id
            LIMIT 1000
            ;
        `
        return {users};
    }
)

/** @type {import('./$types').Actions} */
export const actions = {
    verify: checkPermissions_MW(
        'update_users',
        async ({ request }) => {

            const data = await request.formData();
            const username = data.get("username");

            // Remove session from DB
            await sql`
                UPDATE users
                SET is_verified = TRUE
                WHERE username = ${username}
                ;
            `;

        },
    )
}