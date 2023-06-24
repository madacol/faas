<script>
    export let data;
</script>

<main>
    <form method="post">
        {#each data.questions as question}
            <div class="questions">
                <h4>{question.question}</h4>
                <div class="answers">
                    <label class="strongly_disagree">
                        <input
                            type="radio"
                            name="{question.personality_question_id}"
                            value=1
                            checked={question.answer === 1}
                        >
                        <span>Strongly Disagree</span>
                    </label>
                    <label class="disagree">
                        <input
                            type="radio"
                            name="{question.personality_question_id}"
                            value=2
                            checked={question.answer === 2}
                        >
                        <span>Disagree</span>
                    </label>
                    <label class="neutral">
                        <input
                            type="radio"
                            name="{question.personality_question_id}"
                            value=3
                            checked={question.answer === 3}
                        >
                        <span>Neutral</span>
                    </label>
                    <label class="agree">
                        <input
                            type="radio"
                            name="{question.personality_question_id}"
                            value=4
                            checked={question.answer === 4}
                        >
                        <span>Agree</span>
                    </label>
                    <label class="strongly_agree">
                        <input
                            type="radio"
                            name="{question.personality_question_id}"
                            value=5
                            checked={question.answer === 5}
                        >
                        <span>Strongly Agree</span>
                    </label>
                </div>
            </div>
        {/each}
        <button type="submit">Submit</button>
    </form>
</main>

<style>
    :global(body) {
        background-color: #f3ece6;
    }

    main {
        font-size: 0.8em;
        padding: 1.5em;
        max-width: 800px;
        min-width: 340px;
        margin: auto;
    }

    .questions {
        text-align: start;
        margin-bottom: 1.5em;
        background-color: white;
        border-radius: 1em;
        padding: 1em;
    }

    h4 {
        margin-top: 0;
    }

    .answers {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 0.5em;
    }

    label {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        align-items: center;
        text-decoration: solid black 1px;
    }

    input {
        opacity: 0;
        display: none;
    }

    span {
        font-size: 0.8em;
        height: 3em;
        width: 5em;
        padding: 0.25em 0.5em;
        border-radius: 0.5em;
        cursor: pointer;
        transition: background-color 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .strongly_disagree span {
        background-color: #fff3f3;
    }
    .disagree span {
        background-color: #fffaea;
    }
    .neutral span {
        background-color: #eef1f4;
    }
    .agree span {
        background-color: #ebffec;
    }
    .strongly_agree span {
        background-color: #f5f9ff;
    }

    input:checked + span {
        /* box-shadow: 0 0 0 0.1em black inset; */
        color: white;
    }

    .strongly_disagree input:checked + span {
        background-color: #c25656;
    }
    .disagree input:checked + span {
        background-color: #b8a45c;
    }
    .neutral input:checked + span {
        background-color: #70777f;
    }
    .agree input:checked + span {
        background-color: #419543;
    }
    .strongly_agree input:checked + span {
        background-color: #4371b1;
    }

    button {
        padding: 1em;
        width: 100%;
        border: none;
        border-radius: 0.5em;
        background-color: #419543;
        color: white;
        font-size: 1em;
        font-weight: bold;
        cursor: pointer;
        transition: background-color 0.3s ease;
    }

    button:hover {
        background-color: #62af65;
    }
</style>
