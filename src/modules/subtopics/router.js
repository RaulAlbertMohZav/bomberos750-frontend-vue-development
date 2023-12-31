import Module from './module.vue'
import authMiddleware from '@/middlewares/auth'
import ManageSubtopicsModule from './views/Subtopics'
import CreateSubtopicModule from './views/CreateSubtopic'
import UpdateSubtopicModule from './views/UpdateSubtopic'
import importSubtopics from './views/import'

const shortcutRoutes = [
  {
    path: 'subtemas',
    redirect: { name: 'manage-subtopics' },
    meta: {
      middleware: [authMiddleware]
    }
  },
  {
    path: 'subtemas/crear',
    redirect: { name: 'create-subtopic' },
    meta: {
      middleware: [authMiddleware]
    }
  }
]

const moduleRoute = [
  {
    path: '/',
    component: Module,
    redirect: { name: 'manage-subtopics' },
    children: [
      {
        path: '/subtopics',
        component: Module,
        redirect: { name: 'import-subtopics' },
        children: [
          /* {
            path: 'update',
            redirect: { name: 'manage-subtopics' },
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'list',
            name: 'manage-subtopics',
            component: ManageSubtopicsModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'create',
            name: 'create-subtopic',
            component: CreateSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          },
          {
            path: 'update/:id',
            name: 'update-subtopic',
            component: UpdateSubtopicModule,
            meta: {
              middleware: [authMiddleware]
            }
          }, */
          {
            path: 'import/subtopics',
            name: 'import-subtopics',
            component: importSubtopics,
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
