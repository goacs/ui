const path = require('path');


module.exports = {
  configureWebpack: {
    entry: {app: './src/main.js'},
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  },
  "transpileDependencies": [
    "vuetify"
  ]
}
