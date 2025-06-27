import * as p from 'drizzle-orm/pg-core';

export const files = p.pgTable('files', {
	id: p.uuid('id').primaryKey().defaultRandom(),
	url: p.text('url').notNull(),
	name: p.text('name').notNull(),
	type: p.text('type').notNull(),
	projectId: p
		.uuid('projectId')
		.notNull()
		.references(() => project.id)
});

export const project = p.pgTable('project', {
	id: p.uuid('id').primaryKey().defaultRandom(),
	name: p.text('name').notNull()
});
