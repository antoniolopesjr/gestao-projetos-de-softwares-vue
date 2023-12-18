<template>
  <VRow justify="center">
    <VDialog
      v-model="openActivitiesDialog"
      persistent
      width="1024"
    >
      <form @submit.prevent="salvar">
        <VCard>
          <VCardTitle>
            <span class="text-h5">{{ modalTitle }}</span>
          </VCardTitle>
          <VCardText>
            <VContainer>
              <VRow>
                <VCol
                  cols="12"
                  sm="6"
                >
                  <VTextField
                    v-model="formData.title"
                    label="Título*"
                    required
                  ></VTextField>
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                >
                  <VTextField
                    v-model="formData.date"
                    label="Data*"
                    type="date"
                    required
                  ></VTextField>
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                >
                  <VAutocomplete
                    v-model="formData.typeId"
                    :items="activityTypes"
                    label="Tipo*"
                    item-text="name"
                    item-value="id"
                    item-title="name"
                    required
                  ></VAutocomplete>
                </VCol>
                <VCol
                  cols="12"
                  sm="6"
                >
                  <VAutocomplete
                    v-model="formData.clientId"
                    :items="clients"
                    label="Cliente*"
                    item-text="name"
                    item-value="id"
                    item-title="name"
                    required
                  ></VAutocomplete>
                </VCol>
              </VRow>
            </VContainer>
            <small>*Obrigatório</small>
          </VCardText>
          <VCardActions>
            <VSpacer></VSpacer>
            <VBtn
              color="grey-darken-1"
              variant="flat"
              @click="close()"
            >
              Cancelar
            </VBtn>
            <VBtn
              color="green-darken-1"
              variant="flat"
              class="ml-5"
              @click="salvar()"
            >
              Salvar
            </VBtn>
          </VCardActions>
        </VCard>
      </form>
    </VDialog>
  </VRow>
</template>

<script>
import moment from 'moment'
import { mapActions } from 'vuex'

function FormataStringData(data) {
  var dia  = data.split("/")[0];
  var mes  = data.split("/")[1];
  var ano  = data.split("/")[2];

  return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
}

export default {
  name: 'ActivitiesDialog',
  props: {
    activity: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      formData: {
        id: null,
        title: '',
        date: '',
        type: null,
        clientId: null
      },
    }
  },
  computed: {
    openActivitiesDialog() {
      return this.$store.state.ui.dialogs.addActivity
    },
    modalTitle() {
      return this.$store.state.ui.dialogs.type === 'add' ? 'Adicionar nova atividade' : 'Editar atividade'
    },
    clients() {
      return this.$store.state.clients
    },
    activityTypes() {
      return this.$store.state.activityTypes
    },
    activityEditing() {
      return this.$store.state.activityEditing
    },
    activityEditingColumnTitle() {
      return this.$store.state.activityEditingColumnTitle
    }
  },
  watch: {
    activityEditing: {
      handler(newValue) {
        if(newValue) {
          this.formData = {
            title: newValue.title,
            date: FormataStringData(newValue.date),
            typeId: newValue.typeId,
            clientId: newValue.clientId,
            id: newValue.id
          }
        } else {
          this.formData = {
            title: '',
            date: '',
            typeId: null,
            clientId: null,
            id: null
          }
        }
      },
    }
  },
  methods: {
    ...mapActions(['toggleActivityDialog', 'saveActivity']),
    close() {
      this.toggleActivityDialog({ state: false, type: null })
    },
    async salvar() {
      var date = moment(this.formData.date);
      if (date.isValid()) {
        this.formData.date = date.format('DD/MM/YYYY')
      }
      await this.saveActivity({ columnTitle: this.activityEditingColumnTitle, index: this.activityEditing ? this.formData.id : null, activity: this.formData })
      this.close()
      let msg = this.activityEditing ? 'editada' : 'salva'
      this.$swal.fire(
        'Salvo!',
        `Sua atividade foi ${msg} com sucesso!`,
        'success'
      )
    }
  },
}
</script>