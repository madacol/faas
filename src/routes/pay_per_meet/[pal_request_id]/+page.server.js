import { sql } from "$lib/server/db";
import { payToMeet } from "$lib/server/payToMeet.js";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, params }) {
    const user_id = locals.user.user_id;
    const {rows: [user]} = await sql`
        SELECT 
            name,
            lastname,
            email,
            gender,
            to_char(birthday,'YYYY-MM-DD') as birthday,
            bio,
            image_data_url
            FROM pal_requests
            JOIN users ON pal_requests.requestee_id = users.user_id
            WHERE pal_request_id=${params.pal_request_id}
            ;
    `;
    return { user };
}

export const actions = {
	default: async ({ locals, url, params }) => {

        const payPalRequestUUID = crypto.randomUUID();
        const stripe_session = await payToMeet(`${url.href}/${payPalRequestUUID}/success`, `${url.href}/${payPalRequestUUID}/cancel`)
        
        await sql`
            INSERT INTO pay_pal_requests (
                pay_pal_request_id,
                pal_request_id,
                stripe_requester_session_id
            )
            VALUES (
                ${payPalRequestUUID},
                ${params.pal_request_id},
                ${stripe_session.id}
            )
        `;
        
        if (!stripe_session?.url) {
            console.log({stripe_session});
            return {
                status: 500,
                body: {
                    error: 'Unable to create paying session'
                }
            }
        }

        throw redirect(303, stripe_session.url);
    },
}
