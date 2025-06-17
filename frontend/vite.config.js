import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
    esbuild: {
        target: 'esnext'
    },
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                Projects: resolve(__dirname, 'public/Projects.html'),
                signin: resolve(__dirname, 'public/signin.html'),
                signup: resolve(__dirname, 'public/signup.html'),
                404: resolve(__dirname, 'public/404.html'),
                ProjectPage: resolve(__dirname, 'public/ProjectPage.html'),
            },
        },
    },
})