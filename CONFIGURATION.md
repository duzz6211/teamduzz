# Configuration

## Contact form endpoint

`src/pages/Contact.jsx`는 문의 폼 전송을 위해 아래 환경변수가 **필수**입니다.

- **VITE_CONTACT_API_URL**: Google Apps Script Web App URL  
  예: `https://script.google.com/macros/s/XXXXX/exec`

로컬 개발에서는 보통 프로젝트 루트에 `.env.local`을 만들고 아래처럼 설정합니다.

```env
VITE_CONTACT_API_URL=https://script.google.com/macros/s/XXXXX/exec
```

환경변수 파일은 로컬/배포 환경에 맞게 직접 설정하세요. (이 저장소에는 `.env*` 파일을 커밋하지 않습니다.)


