<template>
  <v-app>
    <!-- Layout component -->
    <template v-if="responseError">
      <transition name="scale" mode="out-in">
        <handle-errors :error-response="responseError" />
      </transition>
    </template>
    <template v-else>
      <progress-linear-loading-app />
      <component :is="currentLayout" v-if="isRouterLoaded">
        <transition name="scale" mode="out-in">
          <router-view :key="$route.path" />
        </transition>
      </component>
    </template>

    <v-snackbar
      v-model="toast.show"
      :timeout="toast.timeout"
      :color="toast.color"
      bottom
    >
      {{ toast.message }}
      <v-btn
        v-if="toast.timeout === 0"
        color="white"
        text
        @click="toast.show = false"
      >
        {{ $t('common.close') }}
      </v-btn>
    </v-snackbar>

    <cookie-policies-dialog-legal-vue ref="CookiePoliciesDialogLegalVue" @acceptCookiesAgreement="acceptCookiesAgreement"/>

    <!-- Demo customization menu -->
    <!-- <customization-menu /> -->
  </v-app>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'

// Demo Menu

// Layouts
import defaultLayout from './layouts/DefaultLayout'
import landingLayout from './layouts/LandingLayout'
import simpleLayout from './layouts/SimpleLayout'
import authLayout from './layouts/AuthLayout'
import errorLayout from './layouts/ErrorLayout'
import handleErrors from '@/modules/errors/system/views/handleErrors.vue'
import ProgressLinearLoadingApp from '@/modules/loading/components/ProgressLinearLoadingApp.vue'
import  './assets/fuentes/stylesheet.css'
import CookiePoliciesDialogLegalVue from './modules/home/components/Legal/CookiePoliciesDialogLegal.vue'

/*
|---------------------------------------------------------------------
| Main Application Component
|---------------------------------------------------------------------
|
| In charge of choosing the layout according to the router metadata
|
*/
export default {
  components: {
    defaultLayout,
    landingLayout,
    simpleLayout,
    authLayout,
    errorLayout,
    handleErrors,
    ProgressLinearLoadingApp,
    CookiePoliciesDialogLegalVue
  },
  data () {
    return {
      isEditing: true
    }
  },
  computed: {
    ...mapState('app', ['toast']),
    ...mapState('errorsService', ['responseError']),
    isRouterLoaded: function () {
      if (this.$route.name !== null) return true

      return false
    },
    currentLayout: function () {
      const layout = this.$route.meta.layout || 'default'

      return layout + 'Layout'
    }
  },
  beforeMount () {
    //window.addEventListener('beforeunload', this.preventNav)
  },
  mounted() {
    this.set_response_error(null)
    this.verifyAcceptCookies()
    /* ResourceService.post('/test/errors-validation/manually', {
      dni: '1234567891012',
      age: 200
    })
      .then((response) => console.trace(response))
      .catch((error) => console.trace(error.response)) */
  },
  methods: {
    // Metodo para evitar cerrar la ventana del navegador
    ...mapMutations('errorsService', ['set_response_error']),
    ...mapActions('homeService', ['acceptCookies', 'hasAcceptCookies']),
    preventNav(event) {
      if (!this.isEditing) return

      event.preventDefault()

      event.returnValue = ''
    },
    async verifyAcceptCookies() {

      try {

        const verifyStateAcceptCookies = await this.hasAcceptCookies({}, {})

        if (verifyStateAcceptCookies.data.has_accept_cookies) return

        this.$refs['CookiePoliciesDialogLegalVue'].isOpenDialog = true

      } catch (error) {
        console.log(error)
      }
    },
    async acceptCookiesAgreement () {
      try {
        await this.acceptCookies({}, {})
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<style >
:root {
    --fuente_uno: 'kanit-regular';
    --fuente_dos: 'kanit-500';
    --fuente_tres: 'kanit-600';
    --fuente_cuatro: 'kanit-800';
    --fuente_cinco: 'kanit-700';
    --color_uno: #2a99ba;
}
/**
 * Transition animation between pages
 */
/* .fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
} */
body , .fondo_1 > div{
  background-color: #f2f5f8!important;
}

.fondo_1 > div{
  box-shadow: none!important;
}

p, li {
    font-family: var(--fuente_uno) !important;
}
.scale-enter-active,
.scale-leave-active {
  transition: all 0.5s ease;
}
.scale-enter-from,
.scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* .menu_estilo header .v-btn__content{
  color: #505050;
  font-family: var(--fuente_uno);
  font-size: 20px;
  font-weight: normal;
}
.menu_estilo header .v-toolbar__content{
  background: #f2f5f8;
} */

.titulo_1 {
    font-family: var(--fuente_cuatro)!important;
    color: #000;
    font-size: 48px;
    line-height: 48px;
}
.titulo_2{
  font-size: 18px;
  font-family: var(--fuente_tres);
  margin-bottom: 15px;
  color: #000 !important;
}
.titulo_3{
  font-size: 32px;
  font-family: var(--fuente_cinco)!important;
  color: var(--color_uno);
}
.boton-1{
  background: rgb(42, 153, 186);
    background: linear-gradient( 98deg, rgba(42, 153, 186, 1) 0%, rgba(117, 189, 210, 1) 100% );
}
.boton-1 , .boton-2 , .boton-3{

    border: none !important;
    border-radius: 20px;
    font-family: var(--fuente_cuatro);
    font-size: 18px !important;
    height: 53px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff !important;
}
.boton-2{
  background-color: #2a99ba;
}
.boton-1 , .boton-2{
    box-shadow: 0px 4px 4px rgb(0 0 0 / 10%);
    width: 134px;
}
.boton-3 {
    width: 150px;
    background-color: #bf1215;
    background: linear-gradient(101.58deg, #bf1215 42.62%, #df5457 118.43%);
    margin: 0 auto;
}

/* @media(max-width:991px){

  .menu_estilo header {

    z-index: 9;
  }
  .menu_estilo header > div , .menu_estilo header {
    height: 80px!important;
    position: relative!important;
  }
  .menu_estilo .v-navigation-drawer{
    z-index: 9;
  }
} */

</style>
