# EmailJS 설정 가이드

Team Duzz 웹사이트의 문의 폼에서 이메일을 발송하기 위해 EmailJS를 설정합니다.

## 1. EmailJS 계정 생성

1. [EmailJS](https://www.emailjs.com/) 사이트에 접속
2. 회원가입 (무료 플랜: 월 200건 발송 가능)

## 2. Email Service 연결

1. 대시보드에서 **Email Services** 클릭
2. **Add New Service** 클릭
3. Gmail 선택 (또는 사용할 이메일 서비스)
4. **Connect Account**로 Gmail 연결
5. Service ID 복사 (예: `service_xxxxxx`)

## 3. Email Template 생성

### 템플릿 1: 팀에게 문의 내용 전달

1. **Email Templates** 메뉴 클릭
2. **Create New Template** 클릭
3. 아래 내용으로 작성:

**Subject:**
```
[Team Duzz 문의] {{from_name}}님의 새 문의
```

**Content:**
```
안녕하세요, Team Duzz입니다.

새로운 문의가 접수되었습니다.

---
이름: {{from_name}}
이메일: {{from_email}}

문의 내용:
{{message}}
---

확인 후 빠른 시일 내에 답변 부탁드립니다.
```

**To Email:** `teamduzzforyou@gmail.com`

**From Name:** `Team Duzz Website`

4. **Save** 후 Template ID 복사 (예: `template_xxxxxx`)

### 템플릿 2: 문의자에게 자동 응답

1. **Create New Template** 클릭
2. 아래 내용으로 작성:

**Subject:**
```
[Team Duzz] 문의가 접수되었습니다
```

**Content:**
```
안녕하세요, {{to_name}}님.

Team Duzz입니다.
문의 주셔서 감사합니다.

접수하신 문의 내용을 확인 중이며,
빠른 시일 내에(영업일 기준 24시간 이내) 답변드리겠습니다.

추가로 궁금하신 사항이 있으시면 언제든 연락 주시기 바랍니다.

감사합니다.

---
Team Duzz
teamduzzforyou@gmail.com
https://teamduzz.github.io
```

**To Email:** `{{to_email}}`

**From Name:** `Team Duzz`

**Reply To:** `teamduzzforyou@gmail.com`

3. **Save** 후 Template ID 복사 (예: `template_yyyyyy`)

## 4. Public Key 확인

1. **Account** 메뉴 클릭
2. **General** 탭에서 **Public Key** 복사

## 5. 환경변수 설정

프로젝트 루트에 `.env` 파일 생성:

```bash
VITE_EMAILJS_SERVICE_ID=service_xxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxx
VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID=template_yyyyyy
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## 6. 테스트

1. `npm run dev` 실행
2. `/contact` 페이지에서 테스트 문의 발송
3. 팀 이메일과 문의자 이메일 모두 확인

## 주의사항

- `.env` 파일은 `.gitignore`에 포함되어 있어 Git에 커밋되지 않습니다.
- 배포 시 호스팅 플랫폼의 환경변수 설정에서 동일하게 설정하세요.
- 무료 플랜은 월 200건 제한이 있습니다. 초과 시 유료 플랜 업그레이드가 필요합니다.

## 문제 해결

### 이메일이 발송되지 않는 경우
1. 콘솔에서 에러 메시지 확인
2. EmailJS 대시보드 **History**에서 발송 기록 확인
3. 환경변수가 올바르게 설정되었는지 확인

### CORS 에러가 발생하는 경우
EmailJS는 클라이언트 사이드에서 직접 호출하므로 CORS 문제가 없어야 합니다.
만약 발생한다면 Public Key가 올바른지 확인하세요.



