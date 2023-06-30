<script>
    import LinkButton from '$lib/components/LinkButton.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import TextArea from '$lib/components/TextArea.svelte'

    export let data
   
</script>

<main>
    <img
        src="/logo.png"
        alt="logo"
        style="padding-top: 10px; width:90px; align-self:center"
    />

    <form method="post">
        
       
        <p>
           its a match
        </p>
        <p />
        
        <LinkButton href="/pals">Keep Searching <i class="fa fa-plus-circle" aria-hidden="true"></i></LinkButton>
    </form>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin-bottom: 0.5rem;
        margin-top: 1rem;
    }
    form {
        display: flex;
        flex-grow: 1;
        flex-direction: column;
        align-items: stretch;
        gap: 1rem;
        padding: 1rem;
        text-align: start;
        max-width: 17em;
        align-self: center;
    }
    p {
        margin: 0;
        padding: 0;
        font-size: small;
    }
</style>
