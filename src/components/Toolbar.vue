<template>
	<div>
		<v-app-bar color="primary" class="flex-grow-0" app>
			<v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
			<v-app-bar-title
				><router-link :to="{ name: 'home' }" style="cursor: pointer">{{
					appTitle
				}}</router-link></v-app-bar-title
			>
			<template v-slot:append>
				<VToolbarItems>
					<VBtn
						text
						v-for="(item, index) in menuItems"
						:key="index"
						:to="{ name: item.link }"
						exact
						:class="['hidden-sm-and-down', item.class]"
					>
						<VIcon>{{ item.icon }}</VIcon>
						&nbsp;{{ item.title }}
					</VBtn>
					<SwitchTheme class="hidden-sm-and-down"/>
					<VBtn text v-if="isLoggedIn" @click="userLogout" class="btnLogout">
						<VIcon left>mdi-exit-to-app</VIcon>
						Logout
					</VBtn>
				</VToolbarItems>
			</template>
		</v-app-bar>
		<v-navigation-drawer app v-model="drawer" bottom>
			<v-list density="compact" @update:selected="processProjectSelected($event)">
				<v-list-subheader>Projetos</v-list-subheader>
				<v-list-item
					v-for="(item, idx) in projects"
					:key="idx"
					:value="item"
					color="primary"
					@click="toggleProject_(item);"
				>
					<template v-slot:prepend>
						<v-icon :icon="item.icon"></v-icon>
					</template>

					<v-list-item-title>{{ item.name }}</v-list-item-title>
				</v-list-item>
			</v-list>

			<v-list density="compact" class="switch-theme-button">
				<v-list-item color="primary">
					<template v-slot:prepend>
						<SwitchTheme />
					</template>
					<v-list-item-title class="ml-2">Mudar tema</v-list-item-title>
				</v-list-item>
			</v-list>
			<v-divider></v-divider>
			<v-list density="compact">
				<v-list-subheader>Módulos</v-list-subheader>
				<v-list-item
					v-for="(item, index) in menuItems"
					:key="index"
					:to="{ name: item.link }"
					link
				>
					<template v-slot:prepend>
						<v-icon :icon="item.icon"></v-icon>
					</template>

					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
	</div>
</template>

<script>
import SwitchTheme from '@/components/SwitchTheme.vue';
import { mapActions } from 'vuex';

export default {
	name: 'Toolbar',
	components: {
		SwitchTheme
	},
	data: () => ({
		appTitle: 'Gerênciamento de Projetos',
		drawer: false,
		projectSelected: null
	}),
	computed: {
		menuItems() {
			return [
				{
					title: 'Home',
					link: 'home',
					icon: 'mdi-home'
				},
				{
					title: 'Clientes',
					link: 'clients',
					icon: 'mdi-account'
				}
			];
		},
		isLoggedIn() {
			return this.$store.state.auth.isLoggedIn || localStorage.getItem('token');
		},
		projects() {
			return this.$store.state.projects;
		}
	},
	methods: {
		...mapActions(['toggleProject', 'logout']),
		userLogout() {
			this.logout();
			setTimeout(() => {
				this.$router.push({ name: 'login' });
			}, 600);
		},
		toggleProject_(p) {
			setTimeout(() => {
				if (this.projectSelected) {
					this.toggleProject({ project: p });
				} else {
					this.toggleProject({ project: null });
				}
			}, 100);
		},
		processProjectSelected(event) {
			if (event.length === 0) {
				this.projectSelected = false;
			} else {
				this.projectSelected = true;
			}
		}
	}
};
</script>

<style>
.headline {
	display: flex;
	flex-direction: row;
	align-items: center;
}
.btn-project {
	box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
}

@media only screen and (min-width: 767px) {
	.switch-theme-button {
		display: none;
	}
}
</style>

