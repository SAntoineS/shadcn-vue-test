import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
    css: {
        postcss: {
            plugins: [tailwind(), autoprefixer()],
        },
    },
    plugins: [vue({features: {customElement: true}})],
    build: {
        lib: {
            entry: './src/main.ts',
            name: 'web-app',
            // the proper extensions will be added
            fileName: 'web-app'
        },
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})
