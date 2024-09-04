import axios from 'axios';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const latestJsonUrl = `https://api.github.com/repos/cleftly/cleftly/releases/latest`;
    const data = (await axios.get(latestJsonUrl)).data;

    return {
        version: data.tag_name,
        assets: data.assets.map(
            (a: { name: string; browser_download_url: string }) => ({
                name: a.name,
                url: a.browser_download_url
            })
        )
    };
};
