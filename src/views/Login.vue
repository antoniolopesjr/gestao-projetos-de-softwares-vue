<template>
	<div class="background-image"></div>
	<div class="layout-wrapper layout-blank">
		<div class="justify-center auth-wrapper d-flex align-center pa-4">
			<VCard class="auth-card pa-4 pt-7" max-width="648">
				<VCardItem class="justify-center">
					<template #prepend>
						<div class="d-flex">
							<div v-html="logo" />
						</div>
					</template>

					<VCardTitle class="text-4xl font-weight-bold text-uppercase">
						Gestão de projetos
					</VCardTitle>
				</VCardItem>

				<VCardItem class="justify-center">
					<VCardText class="pt-2">
						<h5 class="mb-1 text-h5 font-weight-semibold">Seja bem vindo!</h5>
					</VCardText>
				</VCardItem>

				<VCardText>
					<VForm @submit.prevent="login_">
						<VRow>
							<!-- email -->
							<VCol cols="12">
								<VTextField v-model="email" label="Email" type="email" />
							</VCol>

							<!-- password -->
							<VCol cols="12">
								<VTextField
									v-model="password"
									label="Password"
									:type="isPasswordVisible ? 'text' : 'password'"
									:append-inner-icon="
										isPasswordVisible
											? 'mdi-eye-off-outline'
											: 'mdi-eye-outline'
									"
									@click:append-inner="isPasswordVisible = !isPasswordVisible"
								/>
								<VBtn block :loading="ui.isLoading" type="submit" color="primary" class="mt-3" :disabled="email.length === 0 || password.length === 0"> Login </VBtn>
							</VCol>
						</VRow>
					</VForm>
				</VCardText>
			</VCard>
		</div>
	</div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
	data() {
		return {
      isPasswordVisible: false,
			email: 'admin@admin.com',
			password: '123456',
      ui: {
        isLoading: false,
      }
		};
	},
  created() {
    localStorage.removeItem('token');
  },
	methods: {
		...mapActions(['login']),
		login_() {
			const vm = this;
			const fakeToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9';
			localStorage.setItem('token', fakeToken);
      this.ui.isLoading = true;
      setTimeout(() => {
        vm.login();
			  vm.$router.push('/home');
        vm.ui.isLoading = false;
      }, 500);
		}
	}
};
</script>

<style lang="scss">
.background-image {
	position: fixed;
	left: 9vw;
	right: 0;
	z-index: 1;
	display: block;
	background-image: url('https://uploads-ssl.webflow.com/5ea704591b73e7337746aa7b/63222abca320b680f3c48df1_slack%20project%20management.png');
  width: 100vw;
  height: 100vh;
	-webkit-filter: blur(5px);
	-moz-filter: blur(5px);
	-o-filter: blur(5px);
	-ms-filter: blur(5px);
	filter: blur(5px);
}
.layout-blank {
	position: relative;
	left: 0;
	right: 0;
	z-index: 9999;

	.auth-wrapper {
		min-block-size: calc(var(--vh, 1vh) * 100);

		.auth-footer-mask {
			position: absolute;
			inset-block-end: 0;
			min-inline-size: 100%;
		}

		.auth-footer-start-tree,
		.auth-footer-end-tree {
			position: absolute;
			z-index: 1;
		}

		.auth-footer-start-tree {
			inset-block-end: 0;
			inset-inline-start: 0;
		}

		.auth-footer-end-tree {
			inset-block-end: 0;
			inset-inline-end: 0;
		}

		.auth-illustration {
			z-index: 1;
		}
	}

	.auth-card {
		z-index: 1 !important;
		min-width: 530px;
	}
}

@media (min-width: 960px) {
	.skin--bordered {
		.auth-card-v2 {
			border-inline-start: 1px solid
				rgba(var(--v-border-color), var(--v-border-opacity)) !important;
		}
	}
}

.auth-logo {
	position: absolute;
	z-index: 1;
	inset-block-start: 2rem;
	inset-inline-start: 2.3rem;
}

.auth-card-v2 {
	background-color: rgb(var(--v-theme-surface));
}

@media only screen and (max-width: 767px) {
	.layout-blank .auth-card {
		min-width: 370px;
	}
	.background-image {
		left: 0;
	}
}
</style>

