<script>
    export let data

    const {logs} = data;
</script>

<main>
    <table class="box">
        <thead>
            <tr>
                <th>Path</th>
                <th>Email</th>
                <th>Created At</th>
                <th>Method</th>
                <th>Status</th>
                <th>Referer</th>
                <th>City</th>
                <th>Timezone</th>
                <th>Country</th>
                <th>IP</th>
                <th>User Agent</th>
                <th>Headers</th>
                <th>User Session</th>
                <th>Params</th>
                <th>Body</th>
            </tr>
        </thead>
        <tbody>
            {#each logs as {path, email, created_at, method, status, referer, city, timezone, country, ip, user_agent, headers, user_session, params, body}}
                <tr>
                    <td title={path}>{path === null ? '' : path}</td>
                    <td title={email}>{email === null ? '' : email}</td>
                    <td title={created_at}>{created_at === null ? '' : created_at}</td>
                    <td title={method}>{method === null ? '' : method}</td>
                    <td title={status}>{status === null ? '' : status}</td>
                    <td title={referer}>{referer === null ? '' : referer}</td>
                    <td title={city}>{city === null ? '' : city}</td>
                    <td title={timezone}>{timezone === null ? '' : timezone}</td>
                    <td title={country}>{country === null ? '' : country}</td>
                    <td title={ip}>{ip === null ? '' : ip}</td>
                    <td title={user_agent}>{user_agent === null ? '' : user_agent}</td>
                    <td title={JSON.stringify(headers)}>{JSON.stringify(headers)}</td>
                    <td title={JSON.stringify(user_session)}>{JSON.stringify(user_session)}</td>
                    <td title={JSON.stringify(params)}>{JSON.stringify(params)}</td>
                    <td title={JSON.stringify(body)}>{JSON.stringify(body)}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 2rem;
        overflow: auto;
        margin: auto;
    }
    tbody td {
        border-top: 1px solid #adadad;
    }
    td, th {
        padding: 0.5rem;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: start;
    }
</style>
