/* eslint-disable import/no-unresolved */
import { createStore } from 'vuex';

const store = createStore({
	state: {
		projects: [
			{
				id: 0,
				name: 'Projeto - Steve Jobs',
				description: 'Projeto - Steve Jobs',
				date: '17/12/2023',
				color: 'blue',
				clientId: 5,
				clientName: 'Steve Jobs',
				icon: 'mdi-folder'
			},
			{
				id: 1,
				name: 'Projeto - João Silva',
				description: 'Projeto - João Silva',
				date: '17/12/2023',
				color: 'blue',
				clientId: 1,
				clientName: 'João Silva',
				icon: 'mdi-folder'
			}
		],
		clients: [
			{
				id: 0,
				name: 'Dario Silva',
				email: 'dario@email.com',
				url: 'https://randomuser.me/api/portraits/men/69.jpg'
			},
			{
				id: 1,
				name: 'João Silva',
				email: 'joao@email.com',
				url: 'https://randomuser.me/api/portraits/men/75.jpg'
			},
			{
				id: 2,
				name: 'Mario Neves',
				email: 'maria@email.com',
				url: 'https://randomuser.me/api/portraits/men/94.jpg'
			},
			{
				id: 3,
				name: 'José Santos',
				email: 'jose@email.com',
				url: 'https://randomuser.me/api/portraits/men/73.jpg'
			},
			{
				id: 4,
				name: 'Naldo Neto',
				email: 'ana@email.com',
				url: 'https://randomuser.me/api/portraits/men/82.jpg'
			},
			{
				id: 5,
				name: 'Steve Jobs',
				email: 'jose@email.com',
				url: 'https://randomuser.me/api/portraits/men/71.jpg'
			},
			{
				id: 6,
				name: 'Jonas Neves',
				email: 'joana@email.com',
				url: 'https://randomuser.me/api/portraits/men/70.jpg'
			},
			{
				id: 7,
				name: 'Luiz Santos',
				email: 'luiz@email.com',
				url: 'https://randomuser.me/api/portraits/men/65.jpg'
			}
		],
		activityTypes: [
			{
				id: 0,
				name: 'Design',
				color: 'purple'
			},
			{
				id: 1,
				name: 'Frontend',
				color: 'teal'
			},
			{
				id: 2,
				name: 'Backend',
				color: 'blue'
			},
			{
				id: 3,
				name: 'Feature',
				color: 'orange'
			},
			{
				id: 4,
				name: 'QA',
				color: 'green'
			}
		],
		activitiesColumns: [
			{
				title: 'Backlog',
				tasks: [
					{
						id: 654654,
						title: 'Landing page',
						date: '17/12/2023',
						typeId: 0,
						clientId: 5
					},
					{
						id: 145687,
						title: 'Api pagamentos',
						date: '17/12/2023',
						typeId: 2,
						clientId: 2
          },
          {
						id: 456546,
						title: 'Navbar Front',
						date: '17/12/2023',
						typeId: 3,
						clientId: 4
					}
				]
			},
			{
				title: 'Para fazer',
				tasks: [
					{
						id: 646545,
						title: 'Serviço de pagamentos',
						date: '17/12/2023',
						typeId: 2,
						clientId: 3
					},
					{
						id: 747545,
						title: 'Vuej.js e Vuex',
						date: '17/12/2023',
						typeId: 1,
						clientId: 6
          },
          {
						id: 456546,
						title: 'Nova tela',
						date: '17/12/2023',
						typeId: 3,
						clientId: 4
					}
				]
			},
			{
				title: 'Fazendo',
				tasks: [
					{
						id: 956746,
						title: 'Login da aplicação',
						date: '17/12/2023',
						typeId: 1,
						clientId: 5
          },
          {
						id: 456546,
						title: 'Footer Front App',
						date: '17/12/2023',
						typeId: 3,
						clientId: 1
					}
				]
			},
			{
				title: 'Feito',
				tasks: [
					{
						id: 456546,
						title: 'Pagamentos de boletos',
						date: '17/12/2023',
						typeId: 3,
						clientId: 1
					}
				]
			}
    ],
    filteredActivitiesColumns: [],
		activityEditing: null,
		activityEditingColumnTitle: null,
		auth: {
			isLoggedIn: false
		},
		ui: {
			dialogs: {
				addActivity: false,
				deleteActivity: false,
				type: 'add'
			}
		}
	},
	mutations: {
		SET_LOGIN_STATUS(state, isLoggedIn) {
			state.auth.isLoggedIn = isLoggedIn;
		},
		TOGGLE_ACTIVITY_DIALOG(state, state_) {
			state.ui.dialogs.addActivity = state_;
		},
		TOGGLE_DELETE_ACTIVITY_DIALOG(state, state_) {
			state.ui.dialogs.deleteActivity = state_;
		},
		TOGGLE_ACTIVITY_DIALOG_TYPE(state, type) {
			state.ui.dialogs.type = type;
		},
		SET_ACTIVITY_EDITING(state, { activity, columnTitle }) {
			state.activityEditing = activity;
			state.activityEditingColumnTitle = columnTitle;
		},
		SET_SAVE_ACTIVITY(state, { columnTitle, index, activity }) {
			const columnIndex = state.activitiesColumns.findIndex(
				(c) => c.title === columnTitle
			);
			if (columnIndex !== -1) {
				const taskIndex = state.activitiesColumns[columnIndex].tasks.findIndex(
					(task) => task.id === index
				);

				if (taskIndex !== -1) {
					const updatedTasks = [...state.activitiesColumns[columnIndex].tasks];
					updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], ...activity };

					const updatedColumn = {
						...state.activitiesColumns[columnIndex],
						tasks: updatedTasks
					};

					state.activitiesColumns = [
						...state.activitiesColumns.slice(0, columnIndex),
						updatedColumn,
						...state.activitiesColumns.slice(columnIndex + 1)
					];
				} else {
					activity.id = Date.now();
					const updatedColumn = {
						...state.activitiesColumns[columnIndex],
						tasks: [...state.activitiesColumns[columnIndex].tasks, activity]
					};

					state.activitiesColumns = [
						...state.activitiesColumns.slice(0, columnIndex),
						updatedColumn,
						...state.activitiesColumns.slice(columnIndex + 1)
					];
				}
      }
      
      if (state.filteredActivitiesColumns.length > 0) {
        const project = activity;
        this.commit('TOGGLE_PROJECT', { project });
      }
    },
    TOGGLE_PROJECT(state, { project }) {
      if (project !== null) {
        state.filteredActivitiesColumns = state.activitiesColumns.map(column => {
          return {
            ...column,
            tasks: column.tasks.filter(task => task.clientId === project.clientId)
          };
        });
      } else {
        state.filteredActivitiesColumns = [];
      }
    }
	},
	actions: {
		login({ commit }) {
			commit('SET_LOGIN_STATUS', true);
		},
		logout({ commit }) {
			commit('SET_LOGIN_STATUS', false);
			localStorage.removeItem('token');
		},
		toggleActivityDialog({ commit }, { state, type }) {
			commit('TOGGLE_ACTIVITY_DIALOG', state);
			commit('TOGGLE_ACTIVITY_DIALOG_TYPE', type);
		},
		toggleDeleteActivityDialog({ commit }, { state }) {
			commit('TOGGLE_DELETE_ACTIVITY_DIALOG', state);
		},
		activityEditing({ commit }, { activity = null, columnTitle }) {
			commit('SET_ACTIVITY_EDITING', { activity, columnTitle });
		},
		saveActivity({ commit }, { columnTitle, index, activity }) {
			if (index) {
				commit('SET_ACTIVITY_EDITING', { activity: null, columnTitle: null });
				commit('SET_SAVE_ACTIVITY', { columnTitle, index, activity });
			} else {
				index = Date.now();
				commit('SET_SAVE_ACTIVITY', { columnTitle, index, activity });
			}
    },
    toggleProject({ commit }, { project }) {
      commit('TOGGLE_PROJECT', { project });
    },
	},
	getters: {}
});

export default store;

