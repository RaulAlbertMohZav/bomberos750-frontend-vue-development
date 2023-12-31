import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import GenerateTestModule from './views/GenerateTest'
import ListTestsUncompleteModule from './views/TestsNotComplete'
import ListCardsMemoryModule from './views/CardsMemory'
import FetchCardMemoryModule from './views/FetchCardMemory'
import FetchQuestionnaireModule from './views/FetchTest'
import FetchHistoryQuestionnaireCompleted from './views/ResultsOfTest'

const shortcutRoutes = [
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'generate-questionnaire' },
    children: [
      {
        path: '/tests',
        component: Module,
        redirect: { name: 'generate-questionnaire' },
        children: [
          {
            path: 'create-and-resolve',
            name: 'generate-questionnaire',
            component: GenerateTestModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'tests-uncomplete',
            name: 'list-questionnaires-of-student-not-complete',
            component: ListTestsUncompleteModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'cards-memory',
            name: 'list-cards-memory',
            component: ListCardsMemoryModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'test-uncomplete/:id',
            name: 'fetch-questionnaire',
            component: FetchQuestionnaireModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'cards-memory/:id',
            name: 'fetch-card-memory',
            component: FetchCardMemoryModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'fetch-history/resolved/:id',
            name: 'fetch-history-test-complete',
            component: FetchHistoryQuestionnaireCompleted,
            meta: {
              middleware: [authMiddleware]
            }
          }
        ]
      },
      ...shortcutRoutes
    ]
  }
]

export default (router) => {
  router.addRoutes(moduleRoute)
}
