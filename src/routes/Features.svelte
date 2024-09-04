<script lang="ts">
    import { Code, ListMusic, Palette, Puzzle, Rss, Zap } from 'lucide-svelte';

    const FEATURES = [
        {
            icon: Zap,
            title: 'Blazing fast',
            description:
                'Uses Tauri to take advantage of the speed of native Rust code and the power of web technologies'
        },
        {
            icon: ListMusic,
            title: 'Real-time lyrics',
            description:
                'View the lyrics of your favorite songs in real-time, fetched automatically'
        },
        {
            icon: Rss,
            title: 'Share your music',
            description:
                "Let others know what you're listening to with Discord Rich Presence integration, Last.FM integration, and more"
        },
        {
            icon: Puzzle,
            title: 'Extendable',
            description:
                'Extend Cleftly with additional plugins and integrations to enhance your experience'
        },
        {
            icon: Palette,
            title: 'Customizable',
            description:
                'Use any of the available themes and settings to customize your experience'
        },
        {
            icon: Code,
            title: 'Free and open source',
            description:
                'Cleftly is a free and open source project. Check out the source code on GitHub'
        }
    ];
</script>

<!-- Grid of features-->
<div class=" mx-auto max-w-6xl px-8 py-16">
    <div
        class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 text-center justify-center"
    >
        {#each FEATURES as feature}
            <div class="card card-compact w-full">
                <div class="card-body items-center text-center">
                    <svelte:component
                        this={feature.icon}
                        class="h-12 w-12 text-red-500"
                    />
                    <h2 class="card-title">{feature.title}</h2>
                    <p>{feature.description}</p>
                </div>
            </div>
        {/each}
    </div>
</div>
