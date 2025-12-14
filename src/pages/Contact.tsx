import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import Button from '../components/ui/Button'

interface FormData {
  name: string
  email: string
  message: string
  honeypot: string // spam prevention
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
    honeypot: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = '이름을 입력해주세요.'
    }

    if (!formData.email.trim()) {
      newErrors.email = '이메일을 입력해주세요.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력해주세요.'
    }

    if (!formData.message.trim()) {
      newErrors.message = '문의 내용을 입력해주세요.'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = '문의 내용을 10자 이상 입력해주세요.'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    // Honeypot check (spam prevention)
    if (formData.honeypot) {
      console.log('Spam detected')
      return
    }

    if (!validateForm()) return

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Initialize EmailJS
      emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)

      // Send notification email to team
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_email: 'teamduzzforyou@gmail.com',
        }
      )

      // Send auto-reply to user
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_AUTO_REPLY_TEMPLATE_ID,
        {
          to_name: formData.name,
          to_email: formData.email,
        }
      )

      setSubmitStatus('success')
      setFormData({ name: '', email: '', message: '', honeypot: '' })
    } catch (error) {
      console.error('Email send failed:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-hero-gradient overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-white/5 blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6"
            >
              Contact
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              프로젝트 문의
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed"
            >
              프로젝트에 대해 간단히 알려주세요.
              <br />
              24시간 이내에 답변드리겠습니다.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Pre-contact CTA Section */}
      <section className="py-12 bg-gradient-to-b from-brand-light/30 to-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white shadow-soft border border-brand-light">
              <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-neutral-700 text-left">
                <span className="font-semibold text-brand-primary">간단한 문의도 환영합니다.</span>
                <br className="sm:hidden" />
                <span className="text-sm sm:text-base"> 아이디어 단계부터 함께 정리해드릴게요.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form - Redesigned Layout */}
      <section className="py-16 md:py-24 lg:py-32 bg-white min-h-[70vh]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Side - Contact Info (Desktop) */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 order-2 lg:order-1"
            >
              <div className="lg:sticky lg:top-32">
                <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
                  문의 안내
                </h2>
                <p className="text-neutral-600 mb-8 leading-relaxed">
                  프로젝트의 규모나 예산에 상관없이 편하게 문의해주세요.
                  <br />
                  요구사항 정리부터 함께 도와드립니다.
                </p>

                <div className="space-y-6 mb-8">
                  {/* Email */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-brand-light/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">이메일</p>
                      <a
                        href="mailto:teamduzzforyou@gmail.com"
                        className="text-neutral-900 font-semibold hover:text-brand-primary transition-colors break-all"
                      >
                        teamduzzforyou@gmail.com
                      </a>
                    </div>
                  </div>

                  {/* Response Time */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-brand-light/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">응답 시간</p>
                      <p className="text-neutral-900 font-semibold">24시간 이내</p>
                    </div>
                  </div>

                  {/* Work Time */}
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-neutral-50 hover:bg-brand-light/50 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-500 mb-1">업무 시간</p>
                      <p className="text-neutral-900 font-semibold">평일 10:00 - 19:00</p>
                    </div>
                  </div>
                </div>

                {/* Tip Card */}
                <div className="p-5 rounded-2xl bg-gradient-to-br from-brand-light to-purple-100 border border-brand-muted/30">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-primary/10 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-brand-primary mb-1">Tip</p>
                      <p className="text-sm text-neutral-700 leading-relaxed">
                        프로젝트의 목적, 예상 일정, 참고 사이트 등을 함께 알려주시면 
                        더 빠르고 정확한 답변이 가능합니다.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 order-1 lg:order-2"
            >
              <div className="bg-white rounded-3xl shadow-card-hover border border-neutral-100 p-6 md:p-10">
                <AnimatePresence mode="wait">
                  {submitStatus === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', duration: 0.5, delay: 0.1 }}
                        className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
                      >
                        <svg className="w-10 h-10 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </motion.div>
                      <h3 className="text-2xl font-bold text-neutral-900 mb-3">
                        문의가 접수되었습니다
                      </h3>
                      <p className="text-neutral-600 mb-2">
                        입력하신 이메일로 접수 확인 메일을 보내드렸습니다.
                      </p>
                      <p className="text-neutral-500 text-sm mb-8">
                        빠른 시일 내에 답변드리겠습니다.
                      </p>
                      <button
                        onClick={() => setSubmitStatus('idle')}
                        className="inline-flex items-center gap-2 text-brand-primary font-semibold hover:gap-3 transition-all"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                        새 문의 작성하기
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6"
                    >
                      <div className="mb-8">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">문의하기</h3>
                        <p className="text-neutral-500 text-sm">
                          아래 양식을 작성해주시면 빠르게 연락드리겠습니다.
                        </p>
                      </div>

                      {/* Honeypot field - hidden from users */}
                      <input
                        type="text"
                        name="honeypot"
                        value={formData.honeypot}
                        onChange={handleChange}
                        style={{ display: 'none' }}
                        tabIndex={-1}
                        autoComplete="off"
                      />

                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-2">
                          이름 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="홍길동"
                          className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                            errors.name
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                              : 'border-neutral-200 focus:border-brand-primary focus:ring-brand-primary'
                          } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-neutral-50 focus:bg-white`}
                        />
                        {errors.name && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.name}
                          </p>
                        )}
                      </div>

                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                          이메일 <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="example@email.com"
                          className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                            errors.email
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                              : 'border-neutral-200 focus:border-brand-primary focus:ring-brand-primary'
                          } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all bg-neutral-50 focus:bg-white`}
                        />
                        {errors.email && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.email}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-2">
                          문의 내용 <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="프로젝트에 대해 간단히 설명해주세요.&#10;&#10;예시:&#10;- 기업 소개 홈페이지 제작 희망&#10;- 예상 일정: 1개월&#10;- 참고 사이트: example.com"
                          rows={7}
                          className={`w-full px-4 py-3.5 rounded-xl border-2 ${
                            errors.message
                              ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                              : 'border-neutral-200 focus:border-brand-primary focus:ring-brand-primary'
                          } focus:outline-none focus:ring-2 focus:ring-opacity-20 transition-all resize-none bg-neutral-50 focus:bg-white`}
                        />
                        {errors.message && (
                          <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Submit Error */}
                      <AnimatePresence>
                        {submitStatus === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3"
                          >
                            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <div>
                              <p className="font-medium mb-1">메일 발송에 실패했습니다</p>
                              <p>
                                잠시 후 다시 시도하시거나{' '}
                                <a href="mailto:teamduzzforyou@gmail.com" className="underline font-medium">
                                  teamduzzforyou@gmail.com
                                </a>
                                으로 직접 문의해주세요.
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          loading={isSubmitting}
                          className="w-full"
                          size="lg"
                        >
                          {isSubmitting ? (
                            <span className="flex items-center gap-2">
                              <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                              전송 중...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              문의하기
                              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </span>
                          )}
                        </Button>
                      </div>

                      <p className="text-xs text-neutral-400 text-center pt-2">
                        문의 전송 시{' '}
                        <Link 
                          to="/legal#privacy" 
                          className="text-brand-primary hover:underline"
                        >
                          개인정보 처리방침
                        </Link>
                        에 동의한 것으로 간주합니다.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4">
              자주 묻는 질문
            </h2>
            <p className="text-neutral-600 mb-8">
              문의 전 확인해보세요.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {[
                { q: '견적은 어떻게 받나요?', a: '문의 접수 후 요구사항을 확인하여 견적서를 보내드립니다.' },
                { q: '진행 기간은 얼마나 걸리나요?', a: '랜딩페이지 1~2주, 기업 홈페이지 3~4주가 일반적입니다.' },
                { q: '수정은 몇 회까지 가능한가요?', a: '기본 수정 횟수가 포함되어 있으며, 범위에 따라 다릅니다.' },
                { q: '계약금은 얼마인가요?', a: '일반적으로 총 금액의 50%를 계약금으로 받습니다.' },
              ].map((item, index) => (
                <div key={index} className="bg-white rounded-xl p-5 shadow-soft hover:shadow-card transition-shadow">
                  <h4 className="font-semibold text-neutral-900 mb-2">{item.q}</h4>
                  <p className="text-sm text-neutral-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
