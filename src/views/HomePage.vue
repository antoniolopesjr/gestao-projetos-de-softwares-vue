<template>
	<div class="w-full h-screen bg-gray-300">
		<Toolbar />
		<div
			class="flex flex-col justify-center mx-4 mt-20 space-y-4 md:flex-row md:space-y-0 md:space-x-4"
		>
			<div
				v-for="column in finalActivitiesColumns"
				:key="column.title"
				class="flex flex-col min-w-[400px] bg-gray-100 p-4 shadow rounded-lg activities-column"
			>
				<h4 class="flex items-center justify-between p-3 mb-2">
					<span class="text-xl text-gray-600 md:text-2xl">
						{{ column.title }}
					</span>
				</h4>
				<div class="flex flex-col space-y-4">
					<VueDraggableNext
						:list="column.tasks"
						:animation="200"
						ghost-class="ghost-card"
						group="tasks"
					>
						<TaskCard
							v-for="task in column.tasks"
							:key="task.id"
							:task="task"
							:column-title="column.title"
							class="mt-3 cursor-move"
							group="task"
							@start="drag = true"
							@end="drag = false"
							@toggle-delete="deleteActivity(column, task)"
						></TaskCard>
					</VueDraggableNext>
				</div>
				<VBtn
					prepend-icon="mdi-plus"
					class="my-3 text-lg text-gray-300"
					@click="addAtividade(column)"
				>
					Adicionar atividade
				</VBtn>
			</div>
		</div>
		<ActivitiesDialog />
		<DeleteActivityDialog>
			<slot>
				<VBtn
					color="grey-darken-1"
					variant="flat"
					@click="toggleDeleteActivityDialog({ state: false })"
					>Cancelar</VBtn
				>
				<VBtn
					color="red-darken-1"
					variant="flat"
					@click="deleteActivityConfirm"
					>OK</VBtn
				>
			</slot>
		</DeleteActivityDialog>
	</div>
</template>

<script>
import { VueDraggableNext } from 'vue-draggable-next';
import Toolbar from '@/components/Toolbar.vue';
import TaskCard from '@/components/TaskCard.vue';
import ActivitiesDialog from '@/components/ActivitiesDialog.vue';
import DeleteActivityDialog from '@/components/DeleteActivityDialog.vue';
import { mapActions } from 'vuex';

export default {
	name: 'HomePage',
	created() {
		document.title = 'Kanban Page';
	},
	components: {
		TaskCard,
		Toolbar,
		VueDraggableNext,
		ActivitiesDialog,
		DeleteActivityDialog
	},
	data() {
		return {
			dialogDelete: false,
			dialogDeleteItemColumn: null,
			dialogDeleteItemTask: null
		};
	},
	computed: {
		activitiesColumns() {
			return this.$store.state.activitiesColumns;
		},
    filteredActivitiesColumns() {
      return this.$store.state.filteredActivitiesColumns;
    },
    finalActivitiesColumns() {
      if (this.filteredActivitiesColumns && this.filteredActivitiesColumns.length === 0) {
        return this.activitiesColumns;
      } else {
        let hasRecords = false;
        this.filteredActivitiesColumns.forEach((column) => {
          column.tasks.forEach((task) => {
            hasRecords = true;
          });
        });
        if (hasRecords) {
          return this.filteredActivitiesColumns;
        } else {
          return this.activitiesColumns;
        }
      }
    },
	},
	methods: {
		...mapActions([
			'toggleActivityDialog',
			'activityEditing',
			'toggleDeleteActivityDialog'
		]),
		addAtividade(column) {
			this.activityEditing({ columnTitle: column.title });
			this.toggleActivityDialog({ state: true, type: 'add' });
		},
		deleteActivity(column, task) {
			this.dialogDeleteItemColumn = column;
			this.dialogDeleteItemTask = task;
			this.toggleDeleteActivityDialog({ state: true });
		},
		deleteActivityConfirm() {
			const index = this.dialogDeleteItemColumn.tasks.indexOf(
				this.dialogDeleteItemTask
			);
			if (index !== -1) {
				this.dialogDeleteItemColumn.tasks.splice(index, 1);
			}
			this.toggleDeleteActivityDialog({ state: false });

			this.$swal.fire('Deletada!', 'Sua atividade foi deletada.', 'success');
		}
	}
};
</script>

<style lang="scss">
@media only screen and (max-width: 767px) {
	.activities-column {
		min-width: 300px
	}
	.bg-gray-300 {
		background-color: #fff !important;
	}
}
</style>