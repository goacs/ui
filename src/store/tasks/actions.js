// import axios from 'axios'

export default {
  async fetchTasks() {
    return await this._vm.$http.get('/tasks')
  },
  async storeTask(context, data) {
    return await this._vm.$http.post('/tasks', data)
  },
  async updateTask(context, data) {
    return await this._vm.$http.post(`/tasks/${data.id}`, data)
  }
}
