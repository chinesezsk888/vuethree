module.exports = {
  filenameHashing: false,
  productionSourceMap: false,
  pages: {
    py_inventory_detail : {
      entry: 'src/pages/py_inventory_detail/main.ts',
      template: '/public/index.html',
      filename: 'py_inventory_detail.html'
    }
  }
}
