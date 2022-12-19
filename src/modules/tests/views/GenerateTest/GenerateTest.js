import components from './component/components'
import data from './component/data'
import methods from './component/methods'

import componentButtonsCrud from '@/modules/resources/mixins/componentButtonsCrud'
import headersOppositionsTable from './component/headersDatatable'
import computedDatatable from '@/modules/resources/mixins/computedDatatable'
import URLBuilderResources from '@/modules/resources/mixins/URLBuilderResources'

const MIXIN_COMPONENT = [
  components,
  data,
  methods
]

const MIXINS_EXTRA = [
  URLBuilderResources, headersOppositionsTable, computedDatatable, componentButtonsCrud
]

export default {
  mixins: [...MIXINS_EXTRA, ...MIXIN_COMPONENT],
  components: {

  },
  beforeCreate() {
    this?.$hasRoleMiddleware('student')
  },
  mounted () {
  },
  methods: {
  },
  head: {
    title: {
      inner: 'Generar cuestionario'
    }
  }
}
