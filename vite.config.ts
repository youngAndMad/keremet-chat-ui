import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:9000',
                changeOrigin: true,
                secure: false,
            }
        }
    },
    resolve:{
        alias:{
            "@": path.resolve(__dirname, "./src/"),
            "@pages": path.resolve(__dirname, "./src/pages/"),
            "@components": path.resolve(__dirname, "./src/components/"),
            "@ui": path.resolve(__dirname, "./src/components/ui"),
            "@utils": path.resolve(__dirname, "./src/utils/"),
            "@hooks": path.resolve(__dirname, "./src/hooks/"),
            "@assets": path.resolve(__dirname, "./src/assets/"),
            "@libs": path.resolve(__dirname, "./src/libs/"),
        }
    }
})
