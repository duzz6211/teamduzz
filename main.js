// Team DUZZ - Brand Intro Animation
// - No external libraries (GSAP, anime.js 금지)
// - CSS transitions + requestAnimationFrame 기반
// - Reduced Motion 환경에서도 브랜드 인트로는 반드시 실행
//
// 구조:
// - index.html의 #duzz-intro-portal에서 실행
// - React #root와 완전히 분리되어 충돌 없음

const INTRO_TEXT = 'Team DUZZ'
const CHAR_SEQUENCE = ['T', 'e', 'a', 'm', ' ', 'D', 'U', 'Z', 'Z']
const INTRO_GUARD_KEY = '__DUZZ_BRAND_INTRO_RAN__'

// ========== 유틸리티 함수 ==========

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

// ease-out: 빠르게 시작 → 천천히 끝
function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3)
}

// ease-in: 천천히 시작 → 빠르게 끝 (종료 연출용)
function easeInCubic(t) {
  return t * t * t
}

function normalizeText(s) {
  return (s || '').replace(/\s+/g, ' ').trim().toLowerCase()
}

function waitFor(getter, { timeoutMs = 8000, intervalMs = 50 } = {}) {
  const start = performance.now()

  return new Promise((resolve, reject) => {
    const tick = () => {
      const value = getter()
      if (value) return resolve(value)
      if (performance.now() - start > timeoutMs) return reject(new Error('waitFor: timeout'))
      setTimeout(tick, intervalMs)
    }
    tick()
  })
}

// ========== DOM 탐색 함수 ==========

function findNavLogoTextEl() {
  const header = document.querySelector('header')
  if (!header) return null

  const homeLink = header.querySelector('a[href="/"]')
  if (homeLink) {
    const spans = Array.from(homeLink.querySelectorAll('span'))
    const textSpan = spans.find((s) => normalizeText(s.textContent).includes('team'))
    if (textSpan) return textSpan
  }

  const spans = Array.from(header.querySelectorAll('span'))
  return spans.find((s) => normalizeText(s.textContent) === 'team duzz') || null
}

// Nav 로고 텍스트를 "Team DUZZ"로 강제 고정
function forceLogoText(el) {
  if (!el) return () => {}

  const apply = () => {
    if (el.textContent !== INTRO_TEXT) {
      el.textContent = INTRO_TEXT
    }
  }

  apply()

  const obs = new MutationObserver(() => apply())
  obs.observe(el, { characterData: true, childList: true, subtree: true })

  return () => obs.disconnect()
}

// ========== 인트로 DOM 생성 ==========

function buildIntroDOM() {
  const portal = document.getElementById('duzz-intro-portal')
  if (!portal) return null

  portal.innerHTML = ''

  const intro = document.createElement('div')
  intro.className = 'duzz-intro'

  const stage = document.createElement('div')
  stage.className = 'duzz-intro__stage'

  const word = document.createElement('div')
  word.className = 'duzz-intro__word'
  word.setAttribute('aria-label', INTRO_TEXT)

  const chars = []
  for (let i = 0; i < CHAR_SEQUENCE.length; i++) {
    const ch = CHAR_SEQUENCE[i]
    const span = document.createElement('span')
    span.className = 'duzz-intro__char'
    span.dataset.i = String(i)
    span.textContent = ch === ' ' ? '\u00A0' : ch
    word.appendChild(span)
    chars.push(span)
  }

  stage.appendChild(word)
  intro.appendChild(stage)
  portal.appendChild(intro)

  return { portal, intro, stage, word, chars }
}

// ========== 레이아웃 측정 ==========

async function measureAndLayout(wordEl, chars) {
  if (document.fonts && document.fonts.ready) {
    try {
      await document.fonts.ready
    } catch {
      // ignore
    }
  }

  const measure = document.createElement('div')
  measure.style.cssText = 'position:fixed;left:-9999px;top:-9999px;visibility:hidden;'

  const cloneWord = wordEl.cloneNode(false)
  cloneWord.className = wordEl.className

  const cloneSpans = []
  for (const span of chars) {
    const c = span.cloneNode(true)
    c.className = 'duzz-intro__char'
    c.style.cssText = 'position:static;opacity:1;transform:none;'
    cloneWord.appendChild(c)
    cloneSpans.push(c)
  }

  measure.appendChild(cloneWord)
  document.body.appendChild(measure)

  const widths = cloneSpans.map((s) => s.getBoundingClientRect().width)
  const totalWidth = widths.reduce((a, b) => a + b, 0)

  let x = 0
  for (let i = 0; i < chars.length; i++) {
    chars[i].style.left = `${x}px`
    x += widths[i]
  }

  const tWidth = widths[0] || 0
  wordEl.style.width = `${totalWidth}px`

  // 초기: "T"의 중심이 화면 중앙
  wordEl.style.transform = `translate3d(${-tWidth / 2}px, -50%, 0)`

  measure.remove()
  return { totalWidth, tWidth }
}

// ========== 글자 순차 등장 애니메이션 ==========
// "부드럽게 이동하며 합쳐지는" 느낌

async function playLetterIntro(chars, { stepMs = 95 } = {}) {
  // T(chars[0])는 이미 보이는 상태
  // e → a → m → (공백) → D → U → Z → Z 순차 등장
  for (let i = 1; i < chars.length; i++) {
    await sleep(stepMs)
    chars[i].classList.add('is-on')
  }
  // 글자 settle 대기
  await sleep(150)
}

// ========== 중앙 정렬 전환 ==========

async function centerWord(wordEl, { totalWidth }) {
  wordEl.classList.add('is-centering')
  // "T" 기준 → 전체 텍스트 기준으로 중앙 이동
  wordEl.style.transform = `translate3d(${-totalWidth / 2}px, -50%, 0)`
  await sleep(650)
}

// ========== 종료 애니메이션: 좌상단으로 이동하며 사라짐 ==========
// - 정확히 1초
// - ease-in (천천히 시작 → 점점 빨라짐)
// - 대각선 좌상단 방향

function animateExitToTopLeft(wordEl, logoTextEl, { durationMs = 1000 } = {}) {
  return new Promise((resolve) => {
    const startRect = wordEl.getBoundingClientRect()
    
    // 목표 위치 계산 (좌상단 - nav 방향)
    let targetX, targetY
    
    if (logoTextEl) {
      // nav 로고가 있으면 그 근처로 이동
      const logoRect = logoTextEl.getBoundingClientRect()
      targetX = logoRect.left - startRect.left - 50 // 약간 왼쪽으로
      targetY = logoRect.top - startRect.top - 30   // 약간 위로
    } else {
      // 로고 없으면 화면 좌상단 방향으로
      targetX = -startRect.left - 100
      targetY = -startRect.top - 100
    }

    wordEl.classList.add('is-exiting')
    
    // Nav 로고 페이드인 준비
    if (logoTextEl) {
      logoTextEl.classList.add('duzz-logo-fadein')
    }

    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / durationMs)
      
      // ease-in: 천천히 시작 → 점점 빨라지며 사라짐
      const p = easeInCubic(t)

      const x = targetX * p
      const y = targetY * p
      
      // 페이드아웃 (후반부에 더 빠르게)
      const opacity = Math.max(0, 1 - p * 1.2)
      
      // 약간 축소되면서 사라지는 효과
      const scale = 1 - (p * 0.15)

      wordEl.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`
      wordEl.style.opacity = String(opacity)

      // Nav 로고 동시 페이드인 (중반부터 시작)
      if (logoTextEl && t > 0.3) {
        const logoOpacity = Math.min(1, (t - 0.3) / 0.5)
        logoTextEl.style.opacity = String(logoOpacity)
      }

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
        // 완료
        if (logoTextEl) {
          logoTextEl.style.opacity = '1'
          logoTextEl.classList.remove('duzz-logo-fadein')
        }
        resolve()
      }
    }

    requestAnimationFrame(tick)
  })
}

// ========== 메인 인트로 실행 ==========

async function runIntro() {
  // 중복 실행 방지
  if (window[INTRO_GUARD_KEY]) return
  window[INTRO_GUARD_KEY] = true

  const portal = document.getElementById('duzz-intro-portal')
  if (!portal) return

  // ★ Reduced Motion 환경에서도 브랜드 인트로는 반드시 실행

  document.documentElement.classList.add('duzz-intro-running')

  // 인트로 DOM 생성
  const dom = buildIntroDOM()
  if (!dom) {
    document.documentElement.classList.remove('duzz-intro-running')
    return
  }

  // Nav 로고 텍스트 찾기 및 숨김
  let logoTextEl = null
  let disconnectLogoObserver = () => {}

  try {
    logoTextEl = await waitFor(() => findNavLogoTextEl(), { timeoutMs: 15000 })
    disconnectLogoObserver = forceLogoText(logoTextEl)
    logoTextEl.style.opacity = '0'
  } catch {
    // 로고 못 찾아도 계속 진행
  }

  // 레이아웃 측정
  const layout = await measureAndLayout(dom.word, dom.chars)

  // ========== 애니메이션 시퀀스 ==========

  // 1) 초기 상태: 중앙에 "T"만 (200ms 대기)
  await sleep(200)

  // 2) 글자 순차 등장 (95ms 간격, 부드럽게 이동하며 합쳐짐)
  await playLetterIntro(dom.chars, { stepMs: 95 })

  // 3) 전체 텍스트 중앙 정렬
  await centerWord(dom.word, layout)

  // 4) "Team DUZZ" 완성 후 잠시 정지 (250ms)
  await sleep(250)

  // 5) Nav 로고 다시 확인
  if (!logoTextEl) {
    try {
      logoTextEl = await waitFor(() => findNavLogoTextEl(), { timeoutMs: 5000 })
      disconnectLogoObserver = forceLogoText(logoTextEl)
      logoTextEl.style.opacity = '0'
    } catch {
      // fallback
    }
  }

  // 6) 종료 애니메이션: 좌상단으로 이동하며 사라짐 (정확히 1초, ease-in)
  await animateExitToTopLeft(dom.word, logoTextEl, { durationMs: 1000 })

  // 7) 오버레이 페이드아웃
  dom.intro.classList.add('duzz-intro__fade')
  await sleep(400)

  // ========== 정리 ==========

  // 인트로 DOM 제거 (hero에 텍스트 남지 않음)
  dom.portal.innerHTML = ''

  // html 클래스 제거 (스크롤 복원)
  document.documentElement.classList.remove('duzz-intro-running')

  // Nav 로고 상태 확정
  if (logoTextEl) {
    logoTextEl.style.opacity = ''
    logoTextEl.style.transition = ''
  }
}

// 즉시 실행
runIntro()
