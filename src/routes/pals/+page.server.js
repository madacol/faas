import { sql } from "$lib/server/db";

export async function load() {

    const {rows: pals} = await sql`
        SELECT
            user_id
            , email
            , name
            , lastname
            , bio
            -- calculate age
            , EXTRACT(YEAR FROM AGE(CURRENT_DATE, birthday)) as birthday
            , gender
        FROM users
        LIMIT 10
        ;
    `
console.log(pals);

    return {
        pals
    }
}


/** @type {import('./$types').Actions} */
export const actions = {
    meet: async ({ locals, request }) => {

        const data = await request.formData();
        const pal_id = Number(data.get("pal_id"));

        if (typeof pal_id !== "number") {
            throw new Error("Invalid pal_id provided");
        }

        await sql`
            INSERT INTO pal_requests (requester_id, requestee_id)
            VALUES (${locals.user.user_id}, ${pal_id})
            ;
        `;
    },
}
