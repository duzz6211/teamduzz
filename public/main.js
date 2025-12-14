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

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

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
  wordEl.style.transform = `translate3d(${-tWidth / 2}px, -50%, 0)`

  measure.remove()
  return { totalWidth }
}

async function playLetterIntro(chars, { stepMs = 95 } = {}) {
  for (let i = 1; i < chars.length; i++) {
    await sleep(stepMs)
    chars[i].classList.add('is-on')
  }
  await sleep(150)
}

async function centerWord(wordEl, { totalWidth }) {
  wordEl.classList.add('is-centering')
  wordEl.style.transform = `translate3d(${-totalWidth / 2}px, -50%, 0)`
  await sleep(650)
}

function animateExitToTopLeft(wordEl, logoTextEl, { durationMs = 1000 } = {}) {
  return new Promise((resolve) => {
    const startRect = wordEl.getBoundingClientRect()

    let targetX
    let targetY

    if (logoTextEl) {
      const logoRect = logoTextEl.getBoundingClientRect()
      targetX = logoRect.left - startRect.left - 50
      targetY = logoRect.top - startRect.top - 30
    } else {
      targetX = -startRect.left - 100
      targetY = -startRect.top - 100
    }

    wordEl.classList.add('is-exiting')

    if (logoTextEl) {
      logoTextEl.classList.add('duzz-logo-fadein')
    }

    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const t = Math.min(1, elapsed / durationMs)
      const p = easeInCubic(t)

      const x = targetX * p
      const y = targetY * p

      const opacity = Math.max(0, 1 - p * 1.2)
      const scale = 1 - p * 0.15

      wordEl.style.transform = `translate3d(calc(-50% + ${x}px), calc(-50% + ${y}px), 0) scale(${scale})`
      wordEl.style.opacity = String(opacity)

      if (logoTextEl && t > 0.3) {
        const logoOpacity = Math.min(1, (t - 0.3) / 0.5)
        logoTextEl.style.opacity = String(logoOpacity)
      }

      if (t < 1) {
        requestAnimationFrame(tick)
      } else {
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

async function runIntro() {
  if (window[INTRO_GUARD_KEY]) return
  window[INTRO_GUARD_KEY] = true

  const portal = document.getElementById('duzz-intro-portal')
  if (!portal) return

  document.documentElement.classList.add('duzz-intro-running')

  const dom = buildIntroDOM()
  if (!dom) {
    document.documentElement.classList.remove('duzz-intro-running')
    return
  }

  let logoTextEl = null
  let disconnectLogoObserver = () => {}

  try {
    logoTextEl = await waitFor(() => findNavLogoTextEl(), { timeoutMs: 15000 })
    disconnectLogoObserver = forceLogoText(logoTextEl)
    logoTextEl.style.opacity = '0'
  } catch {
    // ignore
  }

  const layout = await measureAndLayout(dom.word, dom.chars)

  await sleep(200)
  await playLetterIntro(dom.chars, { stepMs: 95 })
  await centerWord(dom.word, layout)
  await sleep(250)

  if (!logoTextEl) {
    try {
      logoTextEl = await waitFor(() => findNavLogoTextEl(), { timeoutMs: 5000 })
      disconnectLogoObserver = forceLogoText(logoTextEl)
      logoTextEl.style.opacity = '0'
    } catch {
      // ignore
    }
  }

  await animateExitToTopLeft(dom.word, logoTextEl, { durationMs: 1000 })

  dom.intro.classList.add('duzz-intro__fade')
  await sleep(400)

  dom.portal.innerHTML = ''
  document.documentElement.classList.remove('duzz-intro-running')

  if (logoTextEl) {
    logoTextEl.style.opacity = ''
    logoTextEl.style.transition = ''
  }

  disconnectLogoObserver()
}

runIntro()

