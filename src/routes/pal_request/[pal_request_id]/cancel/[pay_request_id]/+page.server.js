import { sql } from "$lib/server/db";
import { error } from "@sveltejs/kit";

export async function load({ params }) {
    const {rows: [pay_request]} = await sql`
        UPDATE pay_requests
        SET status = 'cancelled'
        WHERE pay_request_id = ${params.pay_request_id}
            AND ( status = 'pending' OR status = 'rejected' OR status = 'cancelled')
        RETURNING pay_request_id
        ;
    `;

    if (!pay_request) {
        throw error(400, 'Not found')
    }
}
