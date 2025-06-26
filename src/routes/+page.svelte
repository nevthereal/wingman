<script lang="ts">
	import { Input } from '$lib/components/ui/input';
	import { createUploadThing } from '$lib/utils';

	let uploads = $state<string[]>([]);

	const { startUpload, isUploading } = createUploadThing('imageUploader', {
		onClientUploadComplete: (files) => {
			console.log(files);
			uploads = files.map((file) => file.ufsUrl);
		}
	});
</script>

<Input
	type="file"
	multiple
	onchange={async (e) => {
		const files = e.currentTarget.files;
		if (!files || files.length === 0) return;
		// Convert FileList to File[] and start the upload
		await startUpload(Array.from(files));
	}}
/>
