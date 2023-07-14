import { sql } from "$lib/server/db";
import { sendMail } from "$lib/server/sendMail.js";

export async function load({ params }) {
    const {rows: users} = await sql`
        WITH pay_pal_request AS (
            UPDATE pay_pal_requests
            SET status = 'requester paid'
            WHERE pay_pal_request_id = ${params.pay_pal_request_id}
            RETURNING pal_request_id
        ) SELECT
                user_id,
                name,
                lastname,
                email,
                requestee_id,
                requester_id
            FROM pay_pal_request
            JOIN pal_requests USING (pal_request_id)
            JOIN users ON (requestee_id = user_id) OR (requester_id = user_id)
        ;
    `;

    console.log(users);

    const requestee = users.find(user => user.user_id === user.requestee_id);
    const requester = users.find(user => user.user_id === user.requester_id);


    sendMail(
        requestee.email,
        `Someone wants to meet you!`,
        `Hi ${requestee.name} ${requestee.lastname},
${requester.name} ${requester.lastname} wants to meet you!

You can contact them at ${requester.email}.

Best,
FriendPal`
    );

    return { users };
}