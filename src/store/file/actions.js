// import axios from 'axios'


export default {
  async list(context, paginationData) {
    return await this._vm.$http.get('/file?page='+paginationData.page+'&per_page='+paginationData.perPage)
  },
  async all({ commit }) {
    const response = await this._vm.$http.get('/file')
    commit('setFilesList', response.data.data)
    return response
  },
  async upload(context, file) {
    const formData = new FormData();
    formData.append('file', file)
    return await this._vm.$http.post('/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }
}
