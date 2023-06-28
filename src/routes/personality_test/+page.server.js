import { sql } from "$lib/server/db";

export async function load({locals}) {
    const user_id = locals.user.user_id;
    const {rows: questions} = await sql`
        SELECT
            questions.personality_question_id
            , question
            , answer
        FROM personality_questions AS questions
        LEFT JOIN personality_answers AS answers
            ON user_id = ${user_id}
            AND questions.personality_question_id = answers.personality_question_id
        LIMIT 1000
        ;
    `
    return {
        questions
    };
}


/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({ request, locals }) => {
        const form = await request.formData();
        const user_id = locals.user.user_id;
        const form_data = ([...form]).map(([personality_question_id, answer]) => {
            return {
                user_id,
                personality_question_id: Number(personality_question_id),
                answer: Number(answer)
            }
        });

        await sql`
            INSERT INTO personality_answers (user_id, personality_question_id, answer)
            SELECT ${user_id}, personality_question_id, answer
            FROM json_to_recordset(${JSON.stringify(form_data)}) AS x("personality_question_id" int, "answer" int)
            ON CONFLICT (user_id, personality_question_id) DO UPDATE
            SET answer = EXCLUDED.answer
            ;
        `;
    },
}
