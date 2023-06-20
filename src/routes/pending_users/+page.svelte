<script>
  /** @type {import('./$types').PageData} */
  export let data
</script>

<main>

  <h1>Users pending verification</h1>
  
  <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>Username</th>
        <th>Name</th>
        <th>Last Name</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each data.users as user}
        <tr>
          <td>{user.email}</td>
          <td>{user.username}</td>
          <td>{user.name}</td>
          <td>{user.lastname}</td>
          <td class="verify">
            <form method="post" action="?/verify">
              <input type="hidden" name="username" value="{user.username}">
              <button type="submit">Verify</button>
            </form>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</main>


<style>
  main {
    padding: 2em;
  }
  table {
    border-collapse: collapse;
    width: 100%;
  }
  
  th, td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  tr:hover {
    background-color: #f5f5f5;
  }

  .verify button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 5px 10px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 12px;
    margin: 4px 2px;
    cursor: pointer;
  }

  .verify button:hover {
    background-color: #3e8e41;
  }


  td:last-child
  , th:last-child
  {
    width: 0;
  }
</style>