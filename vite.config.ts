import { sveltekit } from '@sveltejs/kit/vite';
import { enhancedImages } from '@sveltejs/enhanced-img';
import { defineConfig } from 'vite';
import { inlineSvg } from '@svelte-put/preprocess-inline-svg/vite';
import Icons from 'unplugin-icons/vite';

export default defineConfig({
    plugins: [
        inlineSvg([
            {
                directories: 'src/lib/assets/icons',
                attributes: {
                    class: '',
                    width: '24',
                    height: '24'
                }
            }
        ]),
        enhancedImages(),
        sveltekit(),
        Icons({
            compiler: 'svelte'
        })
    ]
});
