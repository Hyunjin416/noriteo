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
    // https: true,
    proxy: {
      "/api": {
        target: "http://localhost:8080", // http일때
        // target: "http://localhost:7070", // https일때
        changeOrigin: true,
        // 원래 secure가 true가 맞긴 한데 지금 개발중이니까 우선 fasle로 해봄 
        secure: false, // HTTP: secure false인 경우
        // secure: true, // HTTPS: secure true인 경우
      },
    },
  },
});
