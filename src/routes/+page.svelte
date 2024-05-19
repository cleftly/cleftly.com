<script lang="ts">
    import AlbumScreenshot from '$lib/assets/screenshots/album.png';
    import DiscordScreenshot from '$lib/assets/screenshots/discordrpc.png';
    import HomeScreenshot from '$lib/assets/screenshots/home.png';
    import { ArrowDownToLine, Github } from 'lucide-svelte';
    import Features from './Features.svelte';

    let screenshotTab = 0;

    const SCREENSHOTS = [
        {
            src: AlbumScreenshot,
            alt: 'Screenshot of the album page of Cleftly'
        },
        {
            src: HomeScreenshot,
            alt: 'Screenshot of the homepage of Cleftly'
        },
        {
            src: DiscordScreenshot,
            alt: 'Screenshot showcasing the Discord Rich Presence integration of Cleftly'
        }
    ];
</script>

<div
    class="flex max-w-[100vw] flex-col items-center justify-start xl:flex-row xl:items-start xl:justify-between"
>
    <div class="shrink lg:w-1/2">
        <div
            class="flex min-h-[calc(100vh-4rem)] items-center justify-center px-2 py-10 text-center xl:justify-start xl:pe-0 xl:ps-10 xl:text-start"
        >
            <div class="space-y-8">
                <h1
                    class="mb-4 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-[4rem]"
                >
                    Simple, fast, customizable music player
                </h1>
                <p
                    class="mb-4 text-lg leading-7 text-gray-500 dark:text-gray-400 sm:text-xl sm:leading-9"
                >
                    A new cross-platform music player with real-time lyrics, an
                    easy to use interface, and tons of integrations (Last.FM,
                    Discord Rich Presence, etc.)
                </p>
                <div
                    class="inline-flex w-full flex-col items-stretch justify-center gap-2 px-4 md:flex-row xl:justify-start xl:px-0"
                >
                    <a
                        href="https://github.com/cleftly/cleftly/releases"
                        class="btn text-lg bg-red-600 hover:bg-red-800"
                        ><ArrowDownToLine /> Download</a
                    >
                    <a
                        href="https://github.com/cleftly/cleftly"
                        class="btn text-lg btn-ghost !bg-transparent hover:underline"
                        ><Github /> Source Code</a
                    >
                </div>
            </div>
        </div>
    </div>
    <div
        class="flex flex-col w-1/2 md:pb-16 xl:pt-16 px-4 md:pl-8 md:pr-4 my-auto"
    >
        <div class="max-h-[70vh]">
            {#if screenshotTab === 0}
                <enhanced:img
                    src="$lib/assets/screenshots/album.png"
                    alt="Screenshot of the album page of Cleftly"
                    class="object-contain"
                />
            {:else}
                <img
                    src={SCREENSHOTS[screenshotTab].src}
                    alt={SCREENSHOTS[screenshotTab].alt}
                    class="object-contain"
                />
            {/if}
        </div>
        {#if SCREENSHOTS.length > 1}
            <div class="flex space-x-2 mx-auto">
                {#each SCREENSHOTS as _, i}
                    <button
                        on:click={() => (screenshotTab = i)}
                        class="btn btn-ghost !bg-transparent hover:brightness-75 btn-circle p-0 text-2xl {screenshotTab ===
                        i
                            ? 'text-red-600'
                            : ''}"
                    >
                        •
                    </button>
                {/each}
            </div>
        {/if}
    </div>
</div>
<Features />
