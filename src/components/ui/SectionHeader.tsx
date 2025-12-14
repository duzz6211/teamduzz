import { motion, useReducedMotion } from 'framer-motion'
import { sectionVariants } from '../../utils/motionTokens'

interface SectionHeaderProps {
  title: string
  subtitle?: string
  badge?: string
  centered?: boolean
  light?: boolean
}

export default function SectionHeader({
  title,
  subtitle,
  badge,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  const shouldReduceMotion = useReducedMotion()

  const headerVariants = shouldReduceMotion
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.2 } } }
    : sectionVariants.header

  return (
    <motion.div 
      className={`mb-12 md:mb-16 ${centered ? 'text-center' : ''}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      {badge && (
        <motion.div
          variants={headerVariants}
          className="mb-4"
        >
          <span className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium ${
            light
              ? 'bg-white/10 text-white/90'
              : 'bg-brand-light text-brand-primary'
          }`}>
            {badge}
          </span>
        </motion.div>
      )}
      <motion.h2
        variants={headerVariants}
        className={`section-title ${light ? 'text-white' : ''}`}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={headerVariants}
          className={`section-subtitle ${centered ? 'mx-auto' : ''} ${
            light ? 'text-white/80' : ''
          }`}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
