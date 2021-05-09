module.exports = {
  pwa: {
    name: 'EXCAMBIO',
    themeColor: 'rgb(18, 22, 24)',
    msTileColor: 'rgb(18, 22, 24)',
    manifestOptions: {
      background_color: 'rgb(18, 22, 24)'
    },
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js',
      exclude: [
        /\.map$/,
        /manifest\.json$/
      ]
    }
  }
}
