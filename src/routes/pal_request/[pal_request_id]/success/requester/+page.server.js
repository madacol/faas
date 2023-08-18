import { sql } from "$lib/server/db";
import { sendMail } from "$lib/server/sendMail.js";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const {rows: [pal_request]} = await sql`
        SELECT
            requestee_id,
            requester_id,
            JSONB_OBJECT_AGG(
                CASE
                    WHEN (requestee_id = user_id) THEN 'requestee'
                    WHEN (requester_id = user_id) THEN 'requester'
                END,
                JSONB_BUILD_OBJECT(
                    'user_id', user_id,
                    'name', name,
                    'lastname', lastname,
                    'email', email
                )
            ) AS users
        FROM pal_requests
        JOIN users ON (requestee_id = user_id) OR (requester_id = user_id)
        WHERE pal_request_id=${params.pal_request_id}
            AND status = 'requester paid'
        GROUP BY pal_request_id
        ;
    `;

    if (!pal_request) {
        throw error(400, 'Invalid request')
    }

    let {requestee, requester} = pal_request.users

    if (pal_request.requestee_id === pal_request.requester_id) {
        requester = requestee; // temporary
        // requester and requestee are the same person
        // this should never happen
        console.error('requester and requestee are the same person');
        // break;
    }

    return {requestee, requester};
}