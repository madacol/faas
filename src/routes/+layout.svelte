<script>
  import { page } from '$app/stores';
    import LinkButton from '$lib/components/LinkButton.svelte'
    import PrimaryButton from '$lib/components/PrimaryButton.svelte'
    import Logo from './Logo.svelte'
  export let data;

  let menu_open = false;
  $: isLogged = !!data.user;

  $: isAdmin = data.user?.permissions?.includes('read_users');
</script>

<header>
  <div class="logo_links">
    <div class="logo">
      <a href="/" aria-label="logo">
        <Logo/>
      </a>
    </div>
    {#if isAdmin}
      <div class="links">
        <a href="/pending_users">Pending Users</a>
        <a href="/logs">Logs</a>
        <a href="/personality_test">Personality Test</a>
      </div>
    {/if}

  </div>
  <div id="right-menu">
    {#if data.user}
      <div id="profile">
        <PrimaryButton
            on:click={e => {
                e.stopPropagation()
                menu_open = !menu_open
            }}
            on:keypress={e => e.key === 'Enter' && (menu_open = !menu_open)}
        >
          {data.user.name}
        </PrimaryButton>

        <div
            id="profile-menu"
            class:open={menu_open}
        >
            <div class="profile-menu-item">
              <a href="/profile">Profile</a>
            </div>
            <div class="profile-menu-item">
              <a href="/settings">Settings</a>
            </div>
            <hr>
            <div class="profile-menu-item">
              <a class="logout" href="/logout?redirectTo={$page.url.pathname}">Logout</a>
            </div>
        </div>
      </div>
    {:else}
      <div id="login-button">
        <LinkButton href="/login">Sign In</LinkButton>
      </div>
    {/if}
  </div>
</header>


<div id="content"
    on:click={()=>menu_open = false}
    on:keypress|self={e => e.key === 'Enter' && (menu_open = false)}
>
    <slot />

  <hr>

  <div class="footer">
    <div class="social">
      <a href="https://instagram.com/friendpalsontario">
        <img width="30rem" src="/Instagram_Glyph_Black.svg" alt="Friendpal's Instagram page link">
      </a>
      <a href="https://www.facebook.com/friendpalsontario">
        <img width="30rem" src="/f_logo_RGB-Black_58.png" alt="Friendpal's Facebook page link">
      </a>
    </div>
    <a href="mailto:info@friendpals.ca">info@friendpals.ca</a>
  </div>
</div>



<style>
    header {
      padding: 0 1em 0 0;
      display: flex;
      gap: 2em;
      justify-content: space-between;
      align-items: center;
    }

    .logo_links {
      display: flex;
      align-items: stretch;
      overflow: auto;
    }

    .links {
      display: flex;
      gap: 1em;
      overflow: auto;
      align-items: center;
      padding-left: 1em;
    }
    .links a {
      text-decoration: none;
      color: #000000;
      font-weight: bold;
      font-size: 1.2em;
    }
    .links a:hover {
      color: #fffafa;
    }

    #right-menu {
      position: relative;
      display: flex;
      gap: 1em;
      align-items: stretch;
      align-self: stretch;
    }

    #right-menu > div {
      padding: 1em 0;
      display: flex;
      align-items: center;
    }

    .logo {
      padding: 1em;
    }

    #profile {
      position: relative;
    }

    #profile-menu {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      background: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      flex-direction: column;
      gap: 10px;
      align-items: start;
    }
    #profile-menu.open {
      display: flex;
    }

    .profile-menu-item {
      margin-right: 10px;
    }

    #content {
      overflow: auto;
      flex-grow: 1;
      text-align: center;
      background: #EBF7FF;
      padding: 2rem;
    }

    a {
      color: #333;
    }

    .profile-menu-item a {
      text-decoration: none;
    }

    a.logout {
      color: #9d0000;
    }
    #profile-menu hr {
      align-self: stretch;
      margin: 0;
    }
    hr {
      margin: 2rem 0 1rem 0;
    }
    .footer {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 1rem;
    }
    .social {
      display: flex;
      gap: 1rem;
    }
</style>