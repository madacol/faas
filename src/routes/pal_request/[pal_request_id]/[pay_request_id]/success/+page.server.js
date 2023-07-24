import { sql } from "$lib/server/db";
import { sendMail } from "$lib/server/sendMail.js";

export async function load({ params, url }) {
    const {rows: pay_requests} = await sql`
        WITH new_pay_request AS (
            UPDATE pay_requests
            SET status = 'paid'
            WHERE pay_request_id = ${params.pay_request_id}
                AND status = 'pending'
            RETURNING pal_request_id, status
        ) SELECT
                pals.users,
                pay_requests.status,
                requestee_id,
                requester_id
            FROM pal_requests
            LEFT JOIN (
                SELECT pal_request_id, status FROM pay_requests
                UNION ALL
                SELECT pal_request_id, status FROM new_pay_request
            ) AS pay_requests USING (pal_request_id)
            JOIN (
                SELECT
                    ARRAY_AGG(
                        JSONB_BUILD_OBJECT(
                            'user_id', user_id,
                            'name', name,
                            'lastname', lastname,
                            'email', email
                        )
                    ) AS users,
                    pal_request_id
                FROM pal_requests
                JOIN users ON (requestee_id = user_id) OR (requester_id = user_id)
                WHERE pal_request_id = ${params.pal_request_id}
                GROUP BY pal_request_id
            ) AS pals USING (pal_request_id)
        ;
    `;

    const paidCount = pay_requests.filter(pay_request => pay_request.status === 'paid').length;

    // @ts-ignore
    const requestee = pay_requests[0].users.find(user => user.user_id === pay_requests[0].requestee_id);
    // @ts-ignore
    const requester = pay_requests[0].users.find(user => user.user_id === pay_requests[0].requester_id);

    switch (paidCount) {
        case 1: // requester just paid
            const meet_url = `${url.origin}/pal_request/${params.pal_request_id}`;
            sendMail(
                requester.email,
                `You just paid to meet ${requestee.name}!`,
                `Hey ${requester.name}!\n\n`
                    + `You just paid 5.99 CAD to meet ${requestee.name}, the potential friend you're eager to meet on Friendpals.`
            );
            sendMail(
                requestee.email,
                `${requester.name} ${requester.lastname} wants to meet you!`,
                `If you are interested follow this link: ${meet_url}.`
            );
            break;

        case 2: // requestee just paid
            sendMail(
                requester.email,
                `Yay! ${requestee.name} ${requestee.lastname} accepted to meet!`,
                `You can contact them at ${requestee.email}.`
            );
            sendMail(
                requestee.email,
                `Contact details for ${requester.name} ${requester.lastname}!`,
                `Email address: ${requester.email}.`
            );
            break;
        default:
            console.error({paidCount, pay_requests});
            throw new Error('Something went really wrong!');
    }
}