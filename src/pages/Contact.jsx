import React from 'react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Button } from '../components/ui'
import './Contact.css'

const GOOGLE_SCRIPT_URL =
  import.meta.env.VITE_CONTACT_API_URL ||
  'https://script.google.com/macros/s/AKfycbxMzGwYLkRdL_Zyj2rdkKIryLSUZM1GyMl-cWps1DjPSSdJ5QmOxjk3F_PASEa_enSL/exec'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    website: '', // honeypot
  })

  const [status, setStatus] = useState({ loading: false, success: false, error: null })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus({ loading: false, success: false, error: '필수 항목을 모두 입력해주세요.' })
      return
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setStatus({ loading: false, success: false, error: '올바른 이메일 주소를 입력해주세요.' })
      return
    }

    setStatus({ loading: true, success: false, error: null })

    try {
      await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          company: formData.company.trim(),
          message: formData.message.trim(),
          website: formData.website,
        }),
      })

      setStatus({ loading: false, success: true, error: null })
      setFormData({ name: '', email: '', company: '', message: '', website: '' })
    } catch (err) {
      setStatus({ loading: false, success: false, error: '전송에 실패했습니다. 잠시 후 다시 시도해주세요.' })
    }
  }

  return (
    <div className="contact-page">
      <Helmet>
        <title>문의하기 | TeamDuzz - 개발 외주 상담</title>
        <meta
          name="description"
          content="웹 개발, 홈페이지 제작, 웹사이트 유지보수 프로젝트를 문의하세요. TeamDuzz가 비즈니스에 맞는 최적의 개발 외주 솔루션을 제안해 드립니다."
        />
        <meta name="keywords" content="개발 외주 문의, 웹 개발 상담, 홈페이지 제작 견적, 웹사이트 유지보수 문의" />
      </Helmet>

      <div className="container">
        <section className="contact-hero">
          <span className="contact-hero__label">Contact</span>
          <h1 className="contact-hero__title">
            프로젝트에 대해
            <br />
            이야기해보세요
          </h1>
          <p className="contact-hero__desc">아이디어가 있으신가요? 편하게 연락주세요.</p>
        </section>

        <section className="contact-info">
          <div className="contact-info__item">
            <span className="contact-info__label">Email</span>
            <a href="mailto:support@teamduzz.com" className="contact-info__value">
              support@teamduzz.com
            </a>
          </div>
          <div className="contact-info__divider" />
          <div className="contact-info__item">
            <span className="contact-info__label">Phone</span>
            <a href="tel:01076567010" className="contact-info__value">
              010 7656 7010
            </a>
          </div>
          <div className="contact-info__divider" />
          <div className="contact-info__item">
            <span className="contact-info__label">Location</span>
            <span className="contact-info__value">Seoul, South Korea</span>
          </div>
        </section>

        <section className="contact-form-section">
          <div className="contact-form-header">
            <h2 className="contact-form-header__title">문의하기</h2>
            <p className="contact-form-header__desc">프로젝트 내용을 간단히 알려주시면 빠르게 답변드리겠습니다.</p>
          </div>

          {status.success && (
            <div className="contact-form__success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M9 12l2 2 4-4" />
              </svg>
              <div>
                <strong>문의가 접수되었습니다!</strong>
                <p>빠른 시일 내에 답변드리겠습니다. 입력하신 이메일로 확인 메일이 발송됩니다.</p>
              </div>
            </div>
          )}

          {status.error && (
            <div className="contact-form__error">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
              <span>{status.error}</span>
            </div>
          )}

          {!status.success && (
            <form className="contact-form" onSubmit={handleSubmit}>
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                style={{ position: 'absolute', left: '-9999px', opacity: 0, height: 0, width: 0 }}
              />

              <div className="contact-form__row">
                <div className="contact-form__group">
                  <label htmlFor="name">
                    이름 <span className="required">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="홍길동"
                    disabled={status.loading}
                    required
                  />
                </div>
                <div className="contact-form__group">
                  <label htmlFor="email">
                    이메일 <span className="required">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@email.com"
                    disabled={status.loading}
                    required
                  />
                </div>
              </div>

              <div className="contact-form__group">
                <label htmlFor="company">
                  회사명 <span className="optional">(선택)</span>
                </label>
                <input
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="회사 또는 단체명"
                  disabled={status.loading}
                />
              </div>

              <div className="contact-form__group">
                <label htmlFor="message">
                  프로젝트 내용 <span className="required">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="6"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="어떤 프로젝트를 계획하고 계신가요? 예산, 일정, 원하시는 기능 등을 자유롭게 적어주세요."
                  disabled={status.loading}
                  required
                />
              </div>

              <Button type="submit" size="lg" disabled={status.loading} className={status.loading ? 'contact-form__submit--loading' : ''}>
                {status.loading ? (
                  <>
                    <span className="spinner" />
                    전송 중...
                  </>
                ) : (
                  '문의 보내기'
                )}
              </Button>
            </form>
          )}

          {status.success && (
            <button className="contact-form__reset" onClick={() => setStatus({ loading: false, success: false, error: null })}>
              새 문의 작성하기
            </button>
          )}
        </section>
      </div>
    </div>
  )
}

export default Contact

