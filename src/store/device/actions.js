// import axios from 'axios'

import {filterToQueryString} from "../../helpers/URL";

export default {
  async list(context, paginationData) {
    return await this._vm.$http.get('/device?page='+paginationData.page+'&per_page='+paginationData.perPage)
  },
  async fetchDevice({ commit }, uuid) {
    try {
      const response = await this._vm.$http.get(`/device/${uuid}`)
      console.log(response)
      commit('setDevice', response.data)
    } catch (e) {
      console.error("Cannot fetch device")
    }
  },
  async fetchParameters({ commit }, parameters) {
    const filterStr = filterToQueryString(parameters.filter)
    try {
      const response = await this._vm.$http.get(`/device/${parameters.uuid}/parameters?page=${parameters.page}&per_page=${parameters.perPage}${filterStr}`)
      commit('setParameters', response.data)
      return response
    } catch (e) {
      console.error("Cannot fetch device parameters")
    }
  },
  async updateParameters(context, data) {
    try {
      return await this._vm.$http.put(`/device/${data.uuid}/parameters`, {
        name: data.name,
        value: data.value
      })
    } catch (e) {
      console.error("cannot update parameters", e)
    }
  },
  async kickDevice(context, uuid) {
      return await this._vm.$http.get(`/device/${uuid}/kick`)
  }
}
