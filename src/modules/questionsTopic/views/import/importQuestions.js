import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import { mapActions } from 'vuex'

export default {
  components: {
    ResourceHeaderCrudTitle: () => import(/* webpackChunkName: "ResourceHeaderCrudTitle" */ '@/modules/resources/components/resources/ResourceHeaderCrudTitle'),
    vueDropzone: vue2Dropzone
  },
  data() {
    return {
      canSendFiles: false,
      loadingButton: false,
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        acceptedFiles: '.csv',
        thumbnailWidth: 100,
        maxFileSize: 10, //mib
        parallelUploads: 2,
        maxFiles: 6,
        clickable: true,
        autoQueue: true,
        addRemoveLinks: true
      }
    }
  },
  mounted() {
    //console.log(this.$refs['dropzoneFilesImportQuestions'].$el)
    this.$refs['dropzoneFilesImportQuestions'].$el.innerHTML = /* html */`
      <div class="dz-default dz-message"><span>Adjuntar archivos o click para seleccionar</span></div>
    `
  },
  methods: {
    ...mapActions('questionsTopicService', ['importQuestionsCSV']),
    vdropAddedFile(file) {
      //console.log(file)
    },
    vdropQueueCompleted() {
      //console.log('Queue completed')
    },
    vdropSuccessProcessSendFiles(files, response) {
      /* console.trace({
        files,
        response
      }) */
    },
    getAcceptedFiles() {
      return this.$refs['dropzoneFilesImportQuestions'].getAcceptedFiles()
    },
    sendFilesApi() {
      const files = this.getAcceptedFiles()

      if (Array.isArray(files) && files.length === 0) {
        this.$swal.fire({
          icon: 'error',
          toast: true,
          title: 'Por favor, adjuntar al menos 1 archivo',
          showConfirmButton: true,
          confirmButtonText: 'Entendido',
          timer: 10000
        })

        return
      }

      /* console.trace(files)
      console.log(typeof files) */
      this.sendFilesTopicAction(files)
    },
    async sendFilesTopicAction(files) {
      try {
        const formDataFilesQuestions = new FormData()

        files.forEach((file) => {
          formDataFilesQuestions.append('filesQuestions[]', file)
        })

        //formDataFilesQuestions.append('filesQuestions[]', files)

        this.loadingButton = true

        await this.importQuestionsCSV({
          data: formDataFilesQuestions,
          config: {}
        })

        this.$swal.fire({
          icon: 'success',
          toast: true,
          title: 'El proceso de importación de preguntas ha iniciado. Te notificaremos en cuanto termine o puedes revisar "Mis importaciones"',
          timer: 10000
        })

        this.$refs['dropzoneFilesImportQuestions'].removeAllFiles()

        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButton = false
      } catch (error) {
        console.log(error)
        this.$loadingApp.disabledLoadingProgressLinear()
        this.loadingButton = false
        if (error.response === undefined) {
          this.$swal.fire({
            icon: 'error',
            title: 'Ha ocurrido un problema en la aplicación. Reportelo e intente más tarde',
            showConfirmButton: true,
            confirmButtonText: '¡Entendido!',
            timer: 7500
          })
        } else if (error.response?.status === 422) {
          console.log(error.response)
        }
      }
    }
  },
  head: {
    title: {
      inner: 'Importar preguntas'
    }
  }
}
