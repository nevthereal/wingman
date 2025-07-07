<script lang="ts">
	import { Chat } from '@ai-sdk/svelte';
	import { invalidateAll } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Input } from '$lib/components/ui/input';
	import { cn, createUploader } from '$lib/utils';
	import * as Table from '$lib/components/ui/table';
	import { UploadButton } from '@uploadthing/svelte';

	let { data } = $props();
	let { files } = $derived(data);

	const chat = $derived(
		new Chat({
			initialMessages: [
				{
					role: 'user',
					experimental_attachments: files.map((file) => ({
						url: file.url,
						contentType: file.type,
						name: file.name
					})),
					content: 'The files of the knowledge base',
					id: 'knowledge-base'
				}
			]
		})
	);

	const uploader = createUploader('uploader', {
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
				<Table.Cell class="font-medium"
					><a href={file.url} target="_blank">{file.name}</a></Table.Cell
				>
				<Table.Cell>{file.type}</Table.Cell>
				<Table.Cell class="text-right"><Button variant="destructive">Delete</Button></Table.Cell>
			</Table.Row>
		{/each}
	</Table.Body>
</Table.Root>
<ul>
	{#each chat.messages as message, messageIndex (messageIndex)}
		<li class={[message.role === 'data' && 'hidden']}>
			<div>{message.role}</div>
			<div>
				{#each message.parts as part, partIndex (partIndex)}
					{#if part.type === 'text'}
						<div>{part.text}</div>
					{/if}
				{/each}
			</div>
		</li>
	{/each}
</ul>
<form class="mt-4 flex gap-2" onsubmit={chat.handleSubmit}>
	<Input bind:value={chat.input} />
	<Button type="submit">Send</Button>
</form>
