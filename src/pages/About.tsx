import { motion } from 'framer-motion'
import SectionHeader from '../components/ui/SectionHeader'
import Button from '../components/ui/Button'
import { staggerContainer, staggerItem } from '../utils/animations'

const values = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: '신뢰 중심',
    description: '약속한 일정과 품질을 지킵니다. 과장 없이 솔직하게 소통합니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: '효율적 프로세스',
    description: '불필요한 단계를 줄이고, 핵심에 집중합니다. 빠른 의사결정이 가능합니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: '투명한 진행',
    description: '테스트 도메인으로 실시간 확인이 가능합니다. 모든 단계를 공유합니다.',
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
    ),
    title: '책임감',
    description: '납품 후에도 책임집니다. 유지보수와 후속 지원을 제공합니다.',
  },
]

const roles = [
  {
    title: '기획',
    description: '요구사항 분석, 정보 구조 설계, 사용자 흐름 정의',
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: '퍼블리싱',
    description: '반응형 웹 마크업, 디자인 구현, 크로스 브라우저 대응',
    color: 'from-purple-500 to-indigo-600',
  },
  {
    title: '개발',
    description: '프론트엔드/백엔드 개발, API 연동, 성능 최적화',
    color: 'from-indigo-500 to-blue-600',
  },
  {
    title: '유지보수',
    description: '모니터링, 보안 업데이트, 기능 개선, 기술 지원',
    color: 'from-blue-500 to-cyan-600',
  },
]

const benefits = [
  {
    title: '빠른 커뮤니케이션',
    description: '복잡한 보고 체계 없이 담당자와 직접 소통합니다. 의견 반영이 빠릅니다.',
  },
  {
    title: '유연한 대응',
    description: '변경 사항에 빠르게 대응할 수 있습니다. 프로젝트 상황에 맞춰 조정이 가능합니다.',
  },
  {
    title: '일관된 품질',
    description: '한 팀이 처음부터 끝까지 담당하여 일관된 품질을 유지합니다.',
  },
  {
    title: '비용 효율',
    description: '불필요한 인력 비용 없이 효율적으로 프로젝트를 진행합니다.',
  },
]

export default function About() {
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
              About Team Duzz
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              역할 중심으로 움직이는
              <br />
              <span className="text-brand-muted">소규모 전문 개발팀</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-white/80 leading-relaxed"
            >
              Team Duzz는 기획, 퍼블리싱, 개발, 유지보수 역할로 구성된 
              전문 개발팀입니다. 소규모 팀의 장점을 살려 효율적이고 
              책임감 있는 프로젝트 진행을 약속합니다.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeader
            badge="Philosophy"
            title="팀 철학"
            subtitle="Team Duzz가 일하는 방식입니다."
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className="card text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-light flex items-center justify-center text-brand-primary mx-auto mb-5">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Team Structure */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <SectionHeader
            badge="Structure"
            title="역할 기반 팀 구조"
            subtitle="각 프로젝트는 4개의 전문 역할로 나뉘어 체계적으로 진행됩니다."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {roles.map((role, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${role.color} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                <div className="relative bg-white rounded-2xl p-6 shadow-card group-hover:bg-transparent transition-colors duration-300">
                  <div className="w-12 h-12 rounded-xl bg-brand-light flex items-center justify-center text-brand-primary font-bold text-lg mb-4 group-hover:bg-white/20 group-hover:text-white transition-colors duration-300">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2 group-hover:text-white transition-colors duration-300">
                    {role.title}
                  </h3>
                  <p className="text-neutral-600 text-sm leading-relaxed group-hover:text-white/90 transition-colors duration-300">
                    {role.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Connection illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white shadow-soft text-neutral-700">
              <svg className="w-5 h-5 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span className="font-medium">
                모든 역할이 유기적으로 연결되어 하나의 팀으로 움직입니다
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Small Team */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-brand-light text-brand-primary text-sm font-medium mb-4">
                  Why Small Team
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                  왜 소규모 팀이
                  <br />
                  <span className="text-brand-primary">효율적인가요?</span>
                </h2>
                <p className="text-neutral-600 leading-relaxed mb-8">
                  대형 에이전시는 규모의 경제가 있지만, 복잡한 보고 체계와 
                  다단계 커뮤니케이션으로 인해 비용과 시간이 증가하기도 합니다.
                  <br /><br />
                  Team Duzz는 핵심 역할만으로 구성된 소규모 팀으로, 
                  빠른 의사결정과 직접적인 소통이 가능합니다. 
                  불필요한 단계 없이 효율적으로 높은 품질을 달성합니다.
                </p>
                <Button href="/contact">
                  프로젝트 문의하기
                </Button>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="p-5 rounded-xl bg-neutral-50 border border-neutral-100"
                  >
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed">
                      {benefit.description}
                    </p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="section-padding bg-brand-darker text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-sm font-medium mb-6">
                Quality Standards
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                품질 기준
              </h2>
              <p className="text-lg text-white/80 mb-12">
                모든 프로젝트에 적용되는 Team Duzz의 품질 기준입니다.
              </p>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {[
                { title: '반응형 디자인', desc: '모든 디바이스에서 완벽하게 작동' },
                { title: 'SEO 최적화', desc: '검색 엔진 친화적 구조 설계' },
                { title: '성능 최적화', desc: '빠른 로딩 속도와 최적화된 리소스' },
                { title: '웹 표준 준수', desc: 'W3C 표준 및 접근성 가이드라인' },
                { title: '크로스 브라우저', desc: '주요 브라우저 완벽 지원' },
                { title: '보안 강화', desc: 'HTTPS, 데이터 보호 적용' },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  variants={staggerItem}
                  className="p-6 rounded-xl bg-white/5 border border-white/10"
                >
                  <h3 className="font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-neutral-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6">
                함께 일할 준비가 되셨나요?
              </h2>
              <p className="text-neutral-600 mb-8 leading-relaxed">
                프로젝트에 대해 이야기 나눠보세요.
                <br />
                요구사항 정리부터 도와드립니다.
              </p>
              <Button href="/contact" size="lg">
                프로젝트 문의하기
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}



