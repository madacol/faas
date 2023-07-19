import { sql } from "$lib/server/db";
import { payToMeet } from "$lib/server/payToMeet.js";
import { error } from "@sveltejs/kit";
import { redirect } from "@sveltejs/kit";

export async function load({ locals, params }) {

    const {rows: pay_requests} = await sql`
        SELECT
            pay_requests.status,
            requestee_id,
            requester_id
            FROM pal_requests
            LEFT JOIN pay_requests USING (pal_request_id)
            WHERE (pal_request_id=${params.pal_request_id})
                AND (pay_requests.status = 'paid' OR pay_requests.status IS NULL)
            ;
    `;

    let paidCount = 0;
    pay_requests.forEach(user => {
        if (user.status === 'paid') paidCount++;
    });

    let user;
    switch (paidCount) {
        case 0:
            ({rows: [user]} = await sql`
                SELECT
                    name,
                    lastname,
                    email,
                    gender,
                    to_char(birthday,'YYYY-MM-DD') as birthday,
                    bio,
                    image_data_url
                FROM users
                WHERE user_id = ${pay_requests[0].requestee_id}
                ;`
            )
            break;
        case 1:
            ({rows: [user]} = await sql`
                SELECT
                    name,
                    lastname,
                    email,
                    gender,
                    to_char(birthday,'YYYY-MM-DD') as birthday,
                    bio,
                    image_data_url
                FROM users
                WHERE user_id = ${pay_requests[0].requester_id}
                ;`
            )
            break;
        case 2:
            throw error(400, `Already Pals!`);
        default:
            throw error(500, `Something went wrong`);
    }

    return { user };
}

export const actions = {
	default: async ({ locals, url, params }) => {
        const user_id = locals.user.user_id;

        const {rows: pay_requests} = await sql`
            SELECT
                pay_requests.status
            FROM pal_requests
            JOIN pay_requests USING (pal_request_id)
            WHERE pal_request_id=${params.pal_request_id}
                AND (pay_requests.status = 'paid' OR pay_requests.status IS NULL)
            ;
        `;
        const paidCount = pay_requests.reduce(
            (acc, pay_request) => {
                return pay_request.status === 'paid'
                            ? acc + 1
                            : acc;
            }
            , 0
        );

        switch (paidCount) {
            case 0:
            case 1:
                break;
            case 2:
                throw error(400, `Already Pals!

                    Check your email
                    We already sent your pal's contact information`
                )
            default:
                throw error(500, `Something went wrong`);
        }

        // All validations passed, create a pay_request

        const payRequestUUID = crypto.randomUUID();
        const stripe_session = await payToMeet(`${url.origin}${url.pathname}/${payRequestUUID}/success`, `${url.origin}${url.pathname}/${payRequestUUID}/cancel`)
        
        await sql`
            INSERT INTO pay_requests (
                pay_request_id,
                pal_request_id,
                user_id
            )
            VALUES (
                ${payRequestUUID},
                ${params.pal_request_id},
                ${user_id}
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
