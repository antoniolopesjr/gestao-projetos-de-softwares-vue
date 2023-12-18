<template>
	<VDialog v-model="openDeleteActivity" max-width="600px">
		<VCard class="flex flex-col justify-center space-y-4">
			<VCardTitle class="text-center text-h5"
				>Tem certeza que deseja deletar esta atividade?</VCardTitle
			>
			<VCardActions>
				<VSpacer></VSpacer>
				<slot />
				<VSpacer></VSpacer>
			</VCardActions>
		</VCard>
	</VDialog>
</template>
<script>
export default {
	name: 'DeleteActivityDialog',
	computed: {
		openDeleteActivity() {
			return this.$store.state.ui.dialogs.deleteActivity;
		}
	}
};
</script>

