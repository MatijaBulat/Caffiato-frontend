const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: 'https://localhost:7051/',
    headers: {
    }
  }
})
// "Access-Control-Allow-Origin": "ORIGIN",
// "Access-Control-Allow-Methods": "PUT, GET, HEAD, POST, DELETE, OPTIONS",
// "Access-Control-Allow-Headers": "*",
// "Access-Control-Allow-Credentials": "true"


