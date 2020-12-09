// import axios from 'axios'

import {filterToQueryString} from "../../helpers/URL";

export default {
  async list(context, paginationData) {
    return await this._vm.$http.get('/device?page='+paginationData.page+'&per_page='+paginationData.perPage)
  },
  async fetchDevice({ commit }, uuid) {
    try {
      const response = await this._vm.$http.get(`/device/${uuid}`)
      commit('setDevice', response.data.data)
    } catch (e) {
      console.error("Cannot fetch device")
    }
  },
  async fetchParameters({ commit }, parameters) {
    const filterStr = filterToQueryString(parameters.filter)
    try {
      const response = await this._vm.$http.get(`/device/${parameters.uuid}/parameters?page=${parameters.page}&per_page=${parameters.perPage}${filterStr}`)
      commit('setParameters', response.data.data)
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
  },
  async addObject(context, params) {
    const {uuid, name, key} = params
    return await this._vm.$http.post(`/device/${uuid}/addobject`, {
      name,
      key,
    })
  },
  async fetchParameterValues(context, uuid) {
    return await this._vm.$http.post(`/device/${uuid}/getparametervalues`)
  },
  async fetchQueuedTasks({ commit }, uuid) {
    try {
      const response = await this._vm.$http.get(`/device/${uuid}/tasks`)
      commit('setQueuedTasks', response.data.data)
      return response
    } catch (e) {
      console.log('cannot fetch queued tasks', e)
    }
  },
  async fetchDeviceTemplates({ commit }, uuid) {
    try {
      const response = await this._vm.$http.get(`/device/${uuid}/templates`)
      commit('setDeviceTemplates', response.data.data)
      return response
    } catch (e) {
      console.log('cannot fetch device templates', e)
    }
  },
  async assignTemplate(context, params) {
    return await this._vm.$http.post(`/device/${params.cpe_uuid}/templates`, {
      template_id: params.template_id,
      priority: params.priority,
    })
  },
  async unAssignTemplate(context, params) {
    return await this._vm.$http.delete(`/device/${params.cpe_uuid}/templates/${params.template_id}`)
  },
}
