// import axios from 'axios'


export default {
  async list(context, paginationData) {
    return await this._vm.$http.get('/file?page='+paginationData.page+'&per_page='+paginationData.perPage)
  },
}
