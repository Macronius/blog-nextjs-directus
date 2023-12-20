// set up a Directus instance to interact with the CMS

import {Directus} from '@directus/sdk';
const directus = new Directus(process.env.NEXT_PUBLIC_API_URL as string, {
    // custom auth
    auth: {
        staticToken: process.env.DIRECTUS_ADMIN_ACCESS_TOKEN as string,
        // LL:18
    }
});

export default directus;