<template>
  <div>
    <error404-view v-if="isNotFoundError" />
    <error429-view v-if="isTooManyAttempsRequestsError" />
    <error500-view v-if="isErrorServerOrApp" />
    <error503-view v-if="isMaintenanceServer" />
    <error-keep-one-tab v-if="keepOneTabError"/>
  </div>
</template>

<script>
import Error404View from './error404.vue'
import Error429View from './error429.vue'
import Error500View from './error500.vue'
import Error503View from './error503.vue'
import ErrorKeepOneTab from './errorKeepOneTab.vue'

export default {
  name: 'HandleErrors',
  components: {
    Error404View,
    Error429View,
    Error500View,
    Error503View,
    ErrorKeepOneTab
  },
  props: {
    errorResponse: {
      type: Object,
      required: true
    }
  },
  computed: {
    isErrorServerOrApp() {
      const isErrorServerOrApp =
        (!this.errorResponse?.status ||
        this.errorResponse?.status === 500 ||
        this.errorResponse?.status === 0 ||
        this.errorResponse?.status === 400 ||
        this.errorResponse?.status === 405 ||
        this.errorResponse?.status === 406 ||
        this.errorResponse?.status === 415)

      const isNotErrorClientOrAnotherInvalidError =
        this.errorResponse?.status !== 403 ||
        this.errorResponse?.status !== 404 ||
        this.errorResponse?.status !== 401 ||
        this.errorResponse?.status !== 422 ||
        this.errorResponse?.status !== 429 ||
        this.errorResponse?.status !== 'keep-one-tab'

      return isErrorServerOrApp && isNotErrorClientOrAnotherInvalidError
    },
    isNotFoundError() {
      return (
        this.errorResponse?.status === 403 || this.errorResponse?.status === 404
      )
    },
    isTooManyAttempsRequestsError() {
      return this.errorResponse?.status === 429
    },
    isMaintenanceServer() {
      return this.errorResponse?.status === 503
    },
    keepOneTabError () {
      return this.errorResponse?.status === 'keep-one-tab'
    }
  }
}
</script>
