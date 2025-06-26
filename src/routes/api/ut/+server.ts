import { dev } from '$app/environment';
import { env } from '$env/dynamic/private';
import { ourFileRouter } from '$lib/server/ut';

import { createRouteHandler } from 'uploadthing/server';

const handlers = createRouteHandler({
	router: ourFileRouter,
	config: {
		token: env.UPLOADTHING_TOKEN,
		isDev: dev
	}
});

export { handlers as GET, handlers as POST };
