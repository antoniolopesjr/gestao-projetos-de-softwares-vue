<template>
	<VBadge color="info" :content="type" inline />
</template>

<script>
export default {
	name: 'Badge',
	props: {
		type: {
			type: String,
			default: ''
		}
	}
};
</script>
