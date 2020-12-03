// import axios from 'axios'

import {filterToQueryString} from "../../helpers/URL";

export default {
  async list(context, paginationData) {
    return await this._vm.$http.get('/template?page='+paginationData.page+'&per_page='+paginationData.perPage)
  },
  async fetchTemplate({ commit }, templateId) {
    try {
      const response = await this._vm.$http.get(`/template/${templateId}`)
      commit('setTemplate', response.data.data)
    } catch (e) {
      console.error("Cannot fetch template")
    }
  },
  async listParameters({ commit }, parameters) {
    const filterStr = filterToQueryString(parameters.filter)
    try {
      const response = await this._vm.$http.get(`/template/${parameters.templateId}/parameters?page=${parameters.page}&per_page=${parameters.perPage}${filterStr}`)
      commit('setParameters', response.data.data)
      return response
    } catch (e) {
      console.error("Cannot fetch template parameters")
    }

  }
}
