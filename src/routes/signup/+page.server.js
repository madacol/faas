import argon2 from "argon2";
import { sql } from "../../lib/db";
import { argon_options, cookies_options } from "$lib/config";
import { redirect } from "@sveltejs/kit";
import { fail } from "@sveltejs/kit";

/** @type {import('./$types').Actions} */
export const actions = {
	default: async ({ cookies, request, url }) => {
        const data = await request.formData();
        const username = data.get("username");
        const password = data.get("password");
        const name = data.get("name");
        const lastname = data.get("lastname");
        const email = data.get("email");

        if (typeof password !== "string") {
            return fail(422, {error: "Password must be a string"})
        }

        if (password.length < 8) {
            return fail(422, {error: "Password must be at least 8 characters long"})
        }

        const password_hash = await argon2.hash(password, argon_options);

        const {rows: [user]} = await sql`
            SELECT 1
            FROM users
            WHERE username = ${username}
            ;
        `

        if (user) {
            return fail(409, {error: `User "${username}" already exists`})
        }

        const {rows: [new_user]} = await sql`
            INSERT INTO users (
                username
                , password_hash
                , name
                , lastname
                , email
            )
            VALUES (
                ${username}
                , ${password_hash}
                , ${name}
                , ${lastname}
                , ${email || username}
            )
            RETURNING user_id
            ;
        `

        // Insert session in DB and get session_id (uuid)
        const {rows: [session]} = await sql`
            INSERT INTO sessions (user_id, expires_at)
                VALUES (${new_user.user_id}, NOW() + INTERVAL '1 day')
                RETURNING session_id
                ;
        `;

        cookies.set("session", session.session_id, cookies_options);

        throw redirect(303, url.searchParams.get('redirectTo') ?? '/');
    },
}
