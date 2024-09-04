<script lang="ts">
    import { onMount } from 'svelte';
    import WindowsIcon from '~icon1s/fa/windows';
    import AppleIcon from '~icons/fa/apple';
    import LinuxIcon from '~icons/fa/linux';
    import { minimatch } from 'minimatch';

    const FRIENDLY_PLATFORMS = {
        windows: {
            name: 'Windows',
            icon: WindowsIcon,
            versions: [
                {
                    name: 'EXE (x86_64)',
                    file: 'Cleftly_*_x64-setup.exe',
                    arch: 'x86_64'
                },
                {
                    name: 'MSI (x86_64)',
                    file: 'Cleftly_*_x64_*.msi',
                    arch: 'x86_64'
                }
            ]
        },
        darwin: {
            name: 'macOS',
            icon: AppleIcon,
            versions: [
                {
                    name: 'Universal',
                    file: 'Cleftly_*_universal.dmg',
                    arch: 'Universal'
                }
            ]
        },
        linux: {
            name: 'Linux',
            icon: LinuxIcon,
            versions: [
                {
                    name: 'AppImage (x86_64)',
                    file: 'cleftly_*_amd64.AppImage',
                    arch: 'x86_64'
                },
                {
                    name: 'deb (x86_64)',
                    file: 'cleftly_*_amd64.deb',
                    arch: 'x86_64'
                },
                {
                    name: 'AppImage (ARM64)',
                    file: 'cleftly_*_aarch64.AppImage',
                    arch: 'ARM64'
                },
                {
                    name: 'deb (ARM64)',
                    file: 'cleftly_*_arm64.deb',
                    arch: 'ARM64'
                }
            ]
        }
    };

    export let data;
    let selectedPlatform: 'windows' | 'linux' | 'darwin' | null = null;
    let selectedVersion: string | null = null;

    function detectOS(): 'windows' | 'linux' | 'darwin' {
        // Modern method using userAgentData
        if (window.navigator.userAgentData) {
            const platform =
                window.navigator.userAgentData.platform.toLowerCase();

            if (platform === 'windows' || platform === 'linux') {
                return platform;
            } else if (platform === 'macos') {
                return 'darwin'; // Return 'darwin' for macOS
            }
        }

        // Fallback to legacy method
        const legacyUserAgent = navigator.userAgent.toLowerCase();

        if (legacyUserAgent.includes('windows')) {
            return 'windows';
        } else if (legacyUserAgent.includes('linux')) {
            return 'linux';
        } else if (legacyUserAgent.includes('macintosh')) {
            return 'darwin';
        }

        // Fallback to 'windows' if platform cannot be detected
        return 'windows';
    }

    async function download() {
        if (!selectedPlatform) {
            selectedPlatform = detectOS();
            if (selectedPlatform) download();
            return;
        }

        const asset = data.assets.find((asset) =>
            minimatch(
                asset.name,
                FRIENDLY_PLATFORMS[selectedPlatform].versions.find(
                    (v: { name: string }) => v.name === selectedVersion
                )?.file
            )
        );
        const fileUrl = asset.url;

        if (!fileUrl) {
            alert('Error: File not found');
            return;
        }

        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = asset.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    onMount(() => {
        selectedPlatform = detectOS();
    });

    $: selectedPlatform,
        (() => {
            if (!selectedPlatform) return;

            if (
                !selectedVersion ||
                !FRIENDLY_PLATFORMS[selectedPlatform].versions.find(
                    (v: { name: string }) => v.name === selectedVersion
                )
            ) {
                selectedVersion =
                    FRIENDLY_PLATFORMS[selectedPlatform].versions[0].name;
            }
        })();
</script>

<svelte:head>
    <title>Download Cleftly</title>
</svelte:head>

<div class="flex flex-col items-center justify-center">
    <div class="flex flex-col gap-2 items-center">
        <h1 class="text-3xl font-bold">Download Cleftly</h1>
        <p class="text-gray-500 mb-4">Cleftly Desktop {data.version}</p>
        <div role="tablist" class="tabs tabs-boxed">
            {#each Object.keys(FRIENDLY_PLATFORMS) as platform}
                <button
                    role="tab"
                    class="tab {selectedPlatform === platform
                        ? '!bg-red-600'
                        : ''}"
                    on:click={() => (selectedPlatform = platform)}
                >
                    <svelte:component
                        this={FRIENDLY_PLATFORMS[platform].icon}
                        class="mr-2"
                    />
                    {FRIENDLY_PLATFORMS[platform]?.name}
                </button>
            {/each}
        </div>
        {#if selectedPlatform && Object.keys(FRIENDLY_PLATFORMS[selectedPlatform].versions).length > 1}
            <div role="tablist" class="tabs tabs-sm tabs-boxed">
                {#each FRIENDLY_PLATFORMS[selectedPlatform].versions as version}
                    <button
                        role="tab"
                        class="tab {selectedVersion === version.name
                            ? '!bg-red-600'
                            : ''}"
                        on:click={() => (selectedVersion = version.name)}
                    >
                        {version.name}
                    </button>
                {/each}
            </div>
        {/if}
        {#if selectedPlatform}
            <button
                class="mt-2 btn bg-red-600 hover:bg-red-700"
                on:click={download}
            >
                <svelte:component
                    this={FRIENDLY_PLATFORMS[selectedPlatform].icon}
                    class=""
                />
                Download for {FRIENDLY_PLATFORMS[selectedPlatform]?.name} ({FRIENDLY_PLATFORMS[
                    selectedPlatform
                ]?.versions.find((v) => v.name === selectedVersion)?.arch})
            </button>
        {:else}
            <a
                href="https://github.com/cleftly/cleftly/releases/latest"
                class="mt-2 btn bg-red-600 hover:bg-red-700"
            >
                Download
            </a>
        {/if}
        <a
            href="https://github.com/cleftly/cleftly/releases"
            class="mt-2 link text-gray-500"
        >
            View other releases
        </a>
    </div>
</div>
