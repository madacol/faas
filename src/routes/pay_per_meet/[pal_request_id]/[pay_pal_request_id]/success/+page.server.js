import { sql } from "$lib/server/db";

export async function load({ params }) {
    const {rows: [user]} = await sql`
        UPDATE pay_pal_requests
        SET status = 'requester paid'
        WHERE pay_pal_request_id = ${params.pay_pal_request_id}
        RETURNING pay_pal_request_id
        ;
    `;
    return { user };

    
}