import StatisticsRepository from '../repositories/StatisticsRepository'

const mapItemsDatatableFromApi = (itemsApi) => {
  return itemsApi.map((record) => {
    return {
      id: record.id,
      'finished-at': record.attributes.finished_at,
      'test-questions-count': record.attributes.number_of_questions_generated
    }
  })
}

const mapMetaInformationPagination = (response) => {

  return {
    current_page: response.data.meta.current_page,
    from: response.data.meta.from,
    last_page: response.data.meta.last_page,
    per_page: response.data.meta.per_page,
    to: response.data.meta.to,
    total: response.data.meta.total
  }
}

const getHistoryTestsCompletedByStudent = async ({ commit }, config) => {

  try {

    commit('SET_INFORMATION_META', {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
    })
    commit('SET_STATUS_LOADING_ITEMS', true)

    commit('SET_ITEMS_DATATABLE', [])

    const response = await StatisticsRepository.getHistoryTestsCompletedByStudent(config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE', mapItemsDatatableFromApi(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS', false)
      commit('SET_INFORMATION_META', mapMetaInformationPagination(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    commit('SET_STATUS_LOADING_ITEMS', false)
    //console.log(error)

    return Promise.reject(error)
  }
}

const getHistoryStatisticsDataGraph = async (_, options) => {
  try {

    const response = await StatisticsRepository.getHistoryStatisticsDataGraph(options.data, options.config)

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const mapItemsDatatableQuestionsWrongFromApi = (itemsApi) => {
  return itemsApi.map((record) => {
    const { question_wrong_id, test_wrong_id } = record

    return {
      id: `${question_wrong_id} - ${test_wrong_id}`,
      'question-text': record.texto_pregunta,
      'reason-text': record.explicacion_pregunta,
      'answer-solved-in-question': record.texto_respuesta_marcada,
      'answer-correct-question': record.texto_respuesta_correcta,
      'question_data': record.question_data,
      'finished-at': record.fecha_test
    }
  })
}

const getHistoryQuestionsWrongByTopic = async ({ commit }, options) => {
  try {

    commit('SET_INFORMATION_META_QUESTIONS_WRONG', {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
    })
    commit('SET_STATUS_LOADING_ITEMS_QUESTIONS_WRONG', true)

    commit('SET_ITEMS_DATATABLE_QUESTIONS_WRONG', [])

    const response = await StatisticsRepository.getHistoryQuestionsWrongByTopic(options.topic_id, options.config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE_QUESTIONS_WRONG', mapItemsDatatableQuestionsWrongFromApi(response.data.data))
      //commit('SET_STATUS_LOADING_ITEMS_QUESTIONS_WRONG', false)
      //commit('SET_INFORMATION_META_QUESTIONS_WRONG', mapMetaInformationPaginationQuestionsWrong(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)
    commit('SET_INFORMATION_META_QUESTIONS_WRONG', {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
    })
    commit('SET_STATUS_LOADING_ITEMS_QUESTIONS_WRONG', true)

    commit('SET_ITEMS_DATATABLE_QUESTIONS_WRONG', [])

    return Promise.reject(error)
  }
}

const mapItemsDatatableTestsByPeriodFromApi = (itemsApi) => {
  return itemsApi.map((record) => {

    return {
      id: record.id,
      'created-at': record.attributes.created_at,
      'test-questions-count': record.attributes.number_of_questions_generated
    }
  })
}

const getTestsByPeriodApi = async ({ commit }, options) => {
  try {

    commit('SET_INFORMATION_META_TESTS_BY_PERIOD', {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
    })
    commit('SET_STATUS_LOADING_ITEMS_TESTS_BY_PERIOD', true)

    commit('SET_ITEMS_DATATABLE_TESTS_BY_PERIOD', [])

    const response = await StatisticsRepository.getTestsByPeriod(options.period_key, options.config)

    if (response) {
      //console.trace(response)

      commit('SET_ITEMS_DATATABLE_TESTS_BY_PERIOD', mapItemsDatatableTestsByPeriodFromApi(response.data.data))
      commit('SET_STATUS_LOADING_ITEMS_TESTS_BY_PERIOD', false)
      commit('SET_INFORMATION_META_TESTS_BY_PERIOD', mapMetaInformationPagination(response))

    }

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)
    commit('SET_INFORMATION_META_TESTS_BY_PERIOD', {
      current_page: 1,
      from: 1,
      last_page: 1,
      per_page: 10,
      to: 10,
      total: 10
    })
    commit('SET_STATUS_LOADING_ITEMS_TESTS_BY_PERIOD', true)

    commit('SET_ITEMS_DATATABLE_TESTS_BY_PERIOD', [])

    return Promise.reject(error)
  }
}

const getQuestionsByTestAndTypeQuestion = async (_, options) => {
  try {

    const response = await StatisticsRepository.getQuestionsByTestAndTypeQuestion(options.test_id, options.type_question, options.config)

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

const getTopicsWorstInTestsStudent = async (_, config) => {
  try {

    const response = await StatisticsRepository.getTopicsWorstInTestsStudent(config)

    return Promise.resolve(response)

  } catch (error) {
    //console.log(error)

    return Promise.reject(error)
  }
}

export default {
  getHistoryTestsCompletedByStudent,
  getHistoryStatisticsDataGraph,
  getHistoryQuestionsWrongByTopic,
  getTestsByPeriodApi,
  getQuestionsByTestAndTypeQuestion,
  getTopicsWorstInTestsStudent
}
