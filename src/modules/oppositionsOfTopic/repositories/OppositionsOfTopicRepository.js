import ResourceService from '@/services/ResourceService'

const resource = 'topics'

export default {
  getAllOppositions(topic_id, config = {}) {
    return ResourceService.get(`${resource}/${topic_id}/relationship/oppositions`, config)
  },
  get(id, config = {}) {
    return ResourceService.get(`${resource}/${id}`, config)
  },
  create(data, config = {}) {
    return ResourceService.post(`${resource}/create`, data, config)
  },
  update(id, data, config = {}) {
    return ResourceService.patch(`${resource}/update/${id}`, data, config)
  },
  delete(id, config = {}) {
    return ResourceService.delete(`${resource}/delete/${id}`, config)
  },
  getSyllabus(opposition_id, config = {}) {
    return ResourceService.get(`${resource}/${opposition_id}/relationship/syllabus`, config)
  },
  actionMassiveSelection(data, config = {}) {
    return ResourceService.post(`${resource}/mass-selection-action`, data, config)
  },
  export(data, config = {}) {
    return ResourceService.post(`${resource}/export`, data, config)
  },
  import(data, config = {}) {
    return ResourceService.post(`${resource}/import`, data, config)
  },
  downloadTemplateImport(config = {}) {
    return ResourceService.get(`${resource}/import/template`, config)
  }
}