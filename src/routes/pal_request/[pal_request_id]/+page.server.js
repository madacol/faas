import { sql } from "$lib/server/db";
import { payToMeet } from "$lib/server/payToMeet.js";
import { error } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export async function load({ params }) {

    const {rows: [pal_request]} = await sql`
        SELECT
            pal_requests.status,
            requestee_id,
            requester_id
            FROM pal_requests
            WHERE pal_request_id=${params.pal_request_id}
        ;
    `;

    if (!pal_request) {
        throw error(404, `Pal Request not found`);
    }

    let user_id
    switch (pal_request.status) {
        case 'pending':
            user_id = pal_request.requestee_id
            break;
        case 'requester paid':
            user_id = pal_request.requester_id
            break;
        case 'requestee paid':
            throw error(400, `Already Pals!`);
        case 'cancelled':
            throw error(400, `Pal Request was cancelled`);
        default:
            throw error(500, `Something went wrong`);
        }

    const {rows: [user]} = await sql`
        SELECT
            name,
            lastname,
            email,
            gender,
            to_char(birthday,'YYYY-MM-DD') as birthday,
            bio,
            image_data_url,
            is_verified,
            EXTRACT(YEAR FROM AGE(CURRENT_DATE, birthday)) as age
        FROM users
        WHERE user_id = ${user_id}
        ;
    `
    return { user };
}

export const actions = {
	default: async ({ locals, url, params }) => {
        const user_id = locals.user.user_id;

        const {rows: [pal_request]} = await sql`
            SELECT status
            FROM pal_requests
            WHERE pal_request_id=${params.pal_request_id}
            ;
        `;

        let payer;
        switch (pal_request.status) {
            case 'pending':
                payer = 'requester';
                break;
            case 'requester paid':
                payer = 'requestee';
                break;
            case 'requestee paid':
                throw error(400, `Already Pals!

                    Check your email
                    We already sent your pal's contact information`
                )
            default:
                console.error({pal_request});
                throw error(500, `Something went wrong`);
        }

        // All validations passed, create a pay_request

        const pay_request_id = crypto.randomUUID();

        const success_url = `${url.origin}${url.pathname}/success/${payer}`;
        const cancel_url = `${url.origin}${url.pathname}/cancel`;
        const metadata = { pay_request_id };

        const stripe_session_promise = payToMeet(success_url, cancel_url, metadata);
        
        await sql`
            INSERT INTO pay_requests (
                pay_request_id,
                pal_request_id,
                user_id
            )
            VALUES (
                ${pay_request_id},
                ${params.pal_request_id},
                ${user_id}
            )
        `;

        const stripe_session = await stripe_session_promise;
        
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
