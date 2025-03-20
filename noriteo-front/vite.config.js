import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

// export default defineConfig({
//   plugins: [react()],
//   resolve: {
//     alias: {
//       "@": "/src",
//     },
//   },
//   server: {
//     proxy: {
//       "/auth": {
//         target: "http://localhost:8080",
//         changeOrigin: true,
//         secure: false,
//         credentials: "include",
//       },
//     },
//   },
//   define: {
//     global: "window", // SockJS의 global 참조 문제 해결
//   },
//   optimizeDeps: {
//     include: [ "sockjs-client"], // ✅ stompjs와 sockjs-client 사전 로드
//   },
// });

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 백엔드 서버 주소
        changeOrigin: true,
        secure: false, // HTTPS가 아니라면 false
      },
    },
  },
});
