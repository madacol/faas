import { sql } from "$lib/db";

export async function load({  }) {

    const {rows: users} = await sql`
        SELECT
            username
            , name
            , lastname
            , email
            , bio
        FROM users
        LIMIT 10
        ;
    `


    return {
        users
    }
}
