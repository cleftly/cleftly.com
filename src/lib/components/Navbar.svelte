<script>
    const LINKS = [
        {
            name: 'Home',
            href: '/'
        },
        {
            name: 'Download',
            href: '/download'
        },
        {
            name: 'Docs',
            href: 'https://docs.cleftly.com'
        }
    ];
</script>

<div class="navbar bg-base-100">
    <div class="navbar-start">
        <!-- Mobile Nav-->
        <div class="dropdown">
            <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    ><path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 6h16M4 12h8m-8 6h16"
                    /></svg
                >
            </div>
            <ul
                class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
                {#each LINKS as link}
                    <li><a href={link.href}>{link.name}</a></li>
                {/each}
            </ul>
        </div>

        <a href="/" class="btn btn-ghost text-xl">
            <svg data-inline-src="logo" width="24" height="24" />
            Cleftly</a
        >

        <!-- Desktop Nav -->
        <div class="hidden lg:flex">
            <ul class="menu menu-horizontal px-1">
                {#each LINKS as link}
                    <li>
                        <a href={link.href} class="text hover:underline"
                            >{link.name}</a
                        >
                    </li>
                {/each}
            </ul>
        </div>
    </div>
</div>
