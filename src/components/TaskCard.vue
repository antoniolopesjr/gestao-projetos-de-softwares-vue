<template>
	<VCard class="mx-auto" max-width="400">
		<VCardText>
			<p class="text-h6 text--primary">
				{{ task.title }}
			</p>
			<div class="flex items-center justify-start mt-4">
				<VAvatar size="36px">
					<VImg
						v-if="clientAvatarUrl"
						alt="Avatar"
						:src="clientAvatarUrl"
					></VImg>
					<VIcon v-else color="teal" icon="mdi-account"></VIcon>
				</VAvatar>
				<div class="flex items-center justify-between mt-2 ml-2">
					<span class="text-sm text-gray-600">{{ clientName }}</span>
				</div>
			</div>
			<div class="flex items-center justify-between mt-4">
				<span class="text-sm text-gray-600">{{ task.date }}</span>
			</div>
		</VCardText>
		<VCardActions>
			<div class="actions-container">
				<div class="actions-container-inner">
					<VBtn
						class="ml-2"
						icon="mdi-pencil"
						size="x-small"
						color="grey"
						variant="tonal"
						@click="editActivity(task, columnTitle)"
					></VBtn>
					<VBtn
						icon="mdi-delete"
						size="x-small"
						color="red"
						variant="tonal"
						@click="toggleDelete"
					></VBtn>
				</div>
				<Badge Badge :type="activityTypes[task.typeId].name" />
			</div>
		</VCardActions>
	</VCard>
</template>

<script>
import { mapActions } from 'vuex';
import Badge from './Badge.vue';
export default {
	name: 'TaskCard',
	components: {
		Badge
	},
	props: {
		task: {
			type: Object,
			default: () => ({})
		},
		columnTitle: {
			type: String,
			default: ''
		}
	},
	computed: {
		clientAvatarUrl() {
			return this.$store.state.clients[this.task.clientId].url;
		},
		clientName() {
			return this.$store.state.clients[this.task.clientId].name;
		},
		activityTypes() {
      return this.$store.state.activityTypes
    },
	},
	methods: {
		...mapActions(['toggleActivityDialog', 'activityEditing']),
		editActivity(task, columnTitle) {
			this.activityEditing({ activity: task, columnTitle: this.columnTitle });
			this.toggleActivityDialog({ state: true, type: 'edit' });
		},
		toggleDelete() {
			this.$emit('toggle-delete');
		}
	}
};
</script>

<style>
.actions-container {
	align-items: center;
	display: flex;
	justify-content: space-between;
	flex: 0 0 auto;
	position: relative;
	transition: inherit;
	width: 80%;
}
.actions-container-inner {
	align-items: center;
	display: flex;
	flex: 0 0 auto;
	position: relative;
	transition: inherit;
	width: 100%;
}
</style>

