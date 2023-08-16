import { sql } from "$lib/server/db";
import { redirect } from "@sveltejs/kit";

export async function load({locals}) {

    // if user is not verified, redirect to the verify page
    if (!locals.user.is_verified) {
        throw redirect(303, '/verify');
    }

    const {rows: pals} = await sql`
        SELECT
            user_id
            , email
            , name
            , lastname
            , bio
            -- calculate age
            , EXTRACT(YEAR FROM AGE(CURRENT_DATE, birthday)) as age
            , gender
            , image_data_url
            , is_verified
        FROM users
        WHERE is_verified = true
        ORDER BY random()
        LIMIT 50
        ;
    `
    return {
        pals
    }
}


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ locals, request }) => {

        const data = await request.formData();
        const pal_id = Number(data.get("pal_id"));

        if (typeof pal_id !== "number") {
            throw new Error("Invalid pal_id provided");
        }

        const {rows: [palRequest]} = await sql`
            INSERT INTO pal_requests (requester_id, requestee_id)
            VALUES (${locals.user.user_id}, ${pal_id})
            RETURNING pal_request_id
            ;
        `;

        throw redirect(303, `/pal_request/${palRequest.pal_request_id}`);
    },
}
