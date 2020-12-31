// import axios from 'axios'

export default {
  async fetchTasks() {
    return await this._vm.$http.get('/tasks')
  },
}
