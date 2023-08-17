import { sql } from "$lib/server/db";

export async function load({ params }) {
    const {rows: [user]} = await sql`
        UPDATE pay_requests
        SET status = 'cancelled'
        WHERE pay_request_id = ${params.pay_request_id}
            AND status = 'pending'
        RETURNING pay_request_id
        ;
    `;
}