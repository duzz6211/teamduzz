# Team Duzz - 웹 개발 외주 홍보 사이트

신뢰로 완성되는 웹, Team Duzz의 공식 웹사이트입니다.

## 기술 스택

- **Framework:** React 18 + TypeScript
- **Build Tool:** Vite 5
- **Styling:** Tailwind CSS 3
- **Animation:** Framer Motion
- **Routing:** React Router DOM v6
- **Email:** EmailJS (서버리스 이메일 발송)

## 시작하기

### 1. 패키지 설치

```bash
npm install
```

### 2. 환경변수 설정

`env.example` 파일을 참고하여 `.env` 파일을 생성하세요.

```bash
cp env.example .env
```

EmailJS 설정은 [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)를 참고하세요.

### 3. 개발 서버 실행

```bash
npm run dev
```

### 4. 프로덕션 빌드

```bash
npm run build
```

### 5. 빌드 프리뷰

```bash
npm run preview
```

## 프로젝트 구조

```
teamduzz/
├── public/
│   ├── favicon.svg
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── home/          # 홈페이지 섹션 컴포넌트
│   │   ├── layout/        # Header, Footer
│   │   └── ui/            # 재사용 UI 컴포넌트
│   ├── hooks/             # 커스텀 훅
│   ├── pages/             # 페이지 컴포넌트
│   ├── utils/             # 유틸리티 함수
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── tailwind.config.js
├── vite.config.ts
└── package.json
```

## 페이지 구성

- `/` - 홈 (Hero, About, Services, Workflow, Pricing, FAQ, CTA)
- `/about` - 팀 소개 (철학, 역할 구조, 소규모 팀 장점)
- `/services` - 서비스 소개 (홈페이지, 랜딩페이지, 기업웹, 유지보수, 프로그램)
- `/contact` - 문의 (이메일 폼)

## 문의

- 카카오톡 채널: [DUZZ 개발팀 카카오톡채널](https://pf.kakao.com/_kJxbQn)
- 이메일: `teamduzzforyou@gmail.com`

## 배포 (GitHub Pages)

### 자동 배포 (GitHub Actions)

`.github/workflows/deploy.yml` 파일을 생성하여 자동 배포 설정 가능.

### 수동 배포

```bash
npm run build
```

`dist` 폴더의 내용을 GitHub Pages 브랜치에 푸시.

## 성능 최적화

- 코드 스플리팅 (React Router lazy loading 적용 가능)
- 이미지 lazy loading
- Tailwind CSS purge (프로덕션 빌드 시 자동)
- Framer Motion의 `viewport={{ once: true }}` 적용
- 폰트 프리로드 (Pretendard)

## 커스터마이징

### 색상 변경

`tailwind.config.js`의 `theme.extend.colors.brand` 객체 수정

### 폰트 변경

`index.html`의 폰트 CDN 및 `tailwind.config.js`의 `fontFamily` 수정

### SEO 수정

`index.html`의 메타 태그 수정

## 라이선스

Private - Team Duzz



