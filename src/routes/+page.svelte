<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { createUploadThing } from '$lib/utils';
	import * as Table from '$lib/components/ui/table';

	let { data } = $props();

	let { files } = $derived(data);

	let uploads = $state<File[]>();
	$inspect(uploads);

	const { startUpload, isUploading } = createUploadThing('imageUploader', {
		onClientUploadComplete: (res) => {
			console.log(res);
			invalidateAll();
		}
	});
</script>

<Input
	disabled={$isUploading}
	type="file"
	multiple
	onchange={async (e) => {
		const files = e.currentTarget.files;
		if (!files || files.length === 0) return;
		// Convert FileList to File[] and start the upload
		await startUpload(Array.from(files));
	}}
/>
<Table.Root>
	<Table.Caption>A list of your recent invoices.</Table.Caption>
	<Table.Header>
		<Table.Row>
			<Table.Head class="w-[100px]">Name</Table.Head>
			<Table.Head>Type</Table.Head>
			<Table.Head class="text-right">Actions</Table.Head>
		</Table.Row>
	</Table.Header>
	<Table.Body>
		{#each files as file}
			<Table.Row>
				<Table.Cell class="font-medium">{file.name}</Table.Cell>
				<Table.Cell>{file.url}</Table.Cell>
				<Table.Cell class="text-right"><Button variant="destructive">Delete</Button></Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
