import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 커스텀 도메인(teamduzz.com) 루트 배포: base는 '/' 가 정답
export default defineConfig({
  base: '/',
  plugins: [
    react({
      // JSX 자동 런타임을 명시해 `React is not defined` 류의 문제를 방지
      jsxRuntime: 'automatic',
    }),
  ],
})

