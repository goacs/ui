// import axios from 'axios'

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
  }
}
