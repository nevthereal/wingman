import { db } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const files = await db.query.files.findMany({
		where: {
			projectId: 'beb460cd-99da-40c3-b3a7-a23a5d72cb85'
		}
	});

	return {
		files
	};
};
