const path = require('path')
const { defineConfig } = require('vite')
import vue from '@vitejs/plugin-vue'

module.exports = defineConfig({
  plugins: [vue()], // to process SFC
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'my-lib',
      formats: ['es'], // adding 'umd' requires globals set to every external module
      fileName: (format) => `my-lib.${format}.js`
    },
    rollupOptions: {
      // external modules won't be bundled into your library
      external: ['vue', /primevue\/.+/], // not every external has a global
      output: {
        // disable warning on src/index.ts using both default and named export
        exports: "named",
        // Provide global variables to use in the UMD build
        // for externalized deps (not useful if 'umd' is not in lib.formats)
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})