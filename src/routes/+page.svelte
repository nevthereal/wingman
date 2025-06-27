<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { cn, createUploader } from '$lib/utils';
	import * as Table from '$lib/components/ui/table';
	import { UploadButton } from '@uploadthing/svelte';

	let { data } = $props();

	let { files } = $derived(data);

	let uploads = $state<File[]>();
	$inspect(uploads);

	const uploader = createUploader('imageUploader', {
		onClientUploadComplete: (res) => {
			console.log(res);
			invalidateAll();
		}
	});
</script>

<UploadButton
	{uploader}
	class="ut-uploading:cursor-not-allowed ut-button:bg-primary ut-button:ut-readying:bg-primary/50 mt-4"
>
	<span slot="button-content" let:state>
		{state.isUploading ? 'Uploading...' : 'Pick a file'}
	</span>
	<span slot="clear-btn" let:state> Clear files </span>
	<span slot="allowed-content" let:state>
		You can choose between {state.fileTypes.join(', ')} files
	</span>
</UploadButton>

<!-- <Input
	disabled={$isUploading}
	type="file"
	multiple
	onchange={async (e) => {
		const files = e.currentTarget.files;
		if (!files || files.length === 0) return;
		// Convert FileList to File[] and start the upload
		await startUpload(Array.from(files));
	}}
/> -->
<Table.Root>
	<Table.Caption>Your knowledge base.</Table.Caption>
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
				<Table.Cell>{file.type}</Table.Cell>
				<Table.Cell class="text-right"><Button variant="destructive">Delete</Button></Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
