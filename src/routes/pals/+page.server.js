import { sql } from "$lib/db";

export async function load() {

    const {rows: pals} = await sql`
        SELECT
            user_id
            , username
            , name
            , lastname
            , email
            , bio
        FROM users
        LIMIT 10
        ;
    `


    return {
        pals
    }
}
