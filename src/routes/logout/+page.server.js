import { cookies_options } from "$lib/config";
import { sql } from "$lib/db";
import { redirect } from "@sveltejs/kit";


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ cookies, url }) => {
        const session_id = cookies.get("session");

        // Remove session from DB
        await sql`
            DELETE FROM sessions
            WHERE session_id=${session_id}
            ;
        `;

        cookies.delete("session", cookies_options);

        const redirectTo = url.searchParams.get('redirectTo') ?? '/';
        throw redirect(303, `/login?redirectTo=${redirectTo}`);
    },
}
