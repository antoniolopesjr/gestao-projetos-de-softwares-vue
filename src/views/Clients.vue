<template>
	<div class="w-full h-screen bg-gray-300">
		<Toolbar />
		<div
			class="flex flex-col justify-center mx-4 mt-20 space-y-4 md:flex-row md:space-y-0 md:space-x-6"
		>
			<div
				class="flex flex-col max-w-[1400px] min-w-[600px] bg-gray-100 p-4 shadow overflow-hidden rounded-lg"
			>
				<VDataTable
					:headers="headers"
					:items="clients"
					:sort-by="[{ key: 'name', order: 'asc' }]"
				>
					<template v-slot:top>
						<VToolbar flat>
							<VToolbarTitle>Clientes</VToolbarTitle>
							<VDivider class="mx-4" inset vertical></VDivider>
							<VSpacer></VSpacer>
							<VDialog v-model="dialog" max-width="500px">
								<template v-slot:activator="{ props }">
									<VBtn color="primary" dark class="mb-2" v-bind="props">
										Adicionar novo cliente
									</VBtn>
								</template>
								<VCard>
									<VCardTitle>
										<span class="text-h5">{{ formTitle }}</span>
									</VCardTitle>

									<VCardText>
										<VContainer>
											<VRow>
												<VCol cols="12" sm="6">
													<VTextField
														v-model="editedItem.name"
														label="Nome do cliente"
													></VTextField>
												</VCol>
												<VCol cols="12" sm="6">
													<VTextField
														v-model="editedItem.email"
														type="email"
														label="E-mail"
													></VTextField>
												</VCol>
												<VCol cols="12" sm="12">
													<VTextField
														v-model="editedItem.url"
														label="Url do avatar"
													></VTextField>
												</VCol>
											</VRow>
										</VContainer>
									</VCardText>

									<VCardActions>
										<VSpacer></VSpacer>
										<VBtn color="grey-darken-1" variant="flat" @click="close">
											Cancelar
										</VBtn>
										<VBtn color="green-darken-1" variant="flat" @click="save">
											Salvar
										</VBtn>
									</VCardActions>
								</VCard>
							</VDialog>
							<VDialog v-model="dialogDelete" max-width="600px">
								<VCard class="flex flex-col justify-center space-y-4">
									<VCardTitle class="text-center text-h5"
										>Tem certeza que deseja deletar este cliente?</VCardTitle
									>
									<VCardActions>
										<VSpacer></VSpacer>
										<VBtn
											color="grey-darken-1"
											variant="flat"
											@click="closeDelete"
											>Cancelar</VBtn
										>
										<VBtn
											color="red-darken-1"
											variant="flat"
											@click="deleteItemConfirm"
											>OK</VBtn
										>
										<VSpacer></VSpacer>
									</VCardActions>
								</VCard>
							</VDialog>
						</VToolbar>
					</template>
					<template v-slot:item.actions="{ item }">
						<VIcon size="small" class="me-2" @click="editItem(item)">
							mdi-pencil
						</VIcon>
						<VIcon size="small" @click="deleteItem(item)"> mdi-delete </VIcon>
					</template>
					<template v-slot:no-data>
						<VBtn color="primary" @click="initialize"> Reset </VBtn>
					</template>
				</VDataTable>
			</div>
		</div>
	</div>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
export default {
	name: 'Clients',
	components: {
		Toolbar
	},
	data: () => ({
		dialog: false,
		dialogDelete: false,
		headers: [
			{
				title: 'ID',
				align: 'start',
				sortable: false,
				key: 'id'
			},
			{ title: 'Nome', key: 'name' },
			{ title: 'E-mail', key: 'email' },
			{ title: 'URL', key: 'url' },
			{ title: 'Ações', key: 'actions', sortable: false }
		],
		desserts: [],
		editedIndex: -1,
		editedItem: {
			name: '',
			email: 0,
			url: 0
		},
		defaultItem: {
			name: '',
			email: 0,
			url: 0
		}
	}),
	computed: {
		formTitle() {
			return this.editedIndex === -1 ? 'Novo cliente' : 'Editar cliente';
		},
		clients() {
			return this.$store.state.clients;
		}
	},
	watch: {
		dialog(val) {
			val || this.close();
		},
		dialogDelete(val) {
			val || this.closeDelete();
		}
	},
	methods: {
		editItem(item) {
			this.editedIndex = this.clients.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialog = true;
		},

		deleteItem(item) {
			this.editedIndex = this.clients.indexOf(item);
			this.editedItem = Object.assign({}, item);
			this.dialogDelete = true;
		},

		deleteItemConfirm() {
			this.clients.splice(this.editedIndex, 1);
			this.closeDelete();
		},

		close() {
			this.dialog = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		closeDelete() {
			this.dialogDelete = false;
			this.$nextTick(() => {
				this.editedItem = Object.assign({}, this.defaultItem);
				this.editedIndex = -1;
			});
		},

		save() {
			if (this.editedIndex > -1) {
				Object.assign(this.clients[this.editedIndex], this.editedItem);
			} else {
				this.editedItem.id = this.clients[this.clients.length - 1].id + 1;
				this.clients.push(this.editedItem);
			}
			this.close();
		}
	}
};
</script>

<style>
@media only screen and (max-width: 767px) {
	.bg-gray-300 {
		background-color: #fff !important;
	}
}
</style>