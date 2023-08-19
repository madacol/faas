import { checkPermissions_MW } from "$lib/server/checkPermissions_MW";
import { sql } from "$lib/server/db";


/** @type {import('./$types').PageServerLoad} */
export const load = checkPermissions_MW(
    'read_users',
    async () => {
        const {rows: users} = await sql`
            SELECT
                email
                , name
                , lastname
                , is_verified
            FROM users
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
            const email = data.get("email");

            // Remove session from DB
            await sql`
                UPDATE users
                SET is_verified = TRUE
                WHERE email = ${email}
                ;
            `;

        },
    ),
    unverify: checkPermissions_MW(
        'update_users',
        async ({ request }) => {

            const data = await request.formData();
            const email = data.get("email");

            // Remove session from DB
            await sql`
                UPDATE users
                SET is_verified = FALSE
                WHERE email = ${email}
                ;
            `;

        },
    )
}