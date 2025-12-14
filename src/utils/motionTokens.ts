import type { Variants, Transition } from 'framer-motion'

// ====================================
// Motion Tokens - Central Configuration
// ====================================

// Custom Easing Functions
export const easing = {
  // Primary easing - smooth, premium feel
  smooth: [0.22, 1, 0.36, 1] as const,
  // Slightly more bounce for emphasis
  gentle: [0.25, 0.46, 0.45, 0.94] as const,
  // Quick start, slow end
  out: [0, 0, 0.2, 1] as const,
  // Slow start, quick end
  in: [0.4, 0, 1, 1] as const,
  // Spring-like
  spring: [0.175, 0.885, 0.32, 1.275] as const,
}

// Duration tokens (in seconds)
export const duration = {
  fast: 0.3,
  normal: 0.5,
  slow: 0.65,
  slower: 0.8,
  slowest: 0.9,
}

// Stagger delay tokens (in seconds)
export const stagger = {
  fast: 0.06,
  normal: 0.08,
  slow: 0.1,
  slower: 0.12,
  slowest: 0.14,
}

// ====================================
// Transition Presets
// ====================================

export const transitions = {
  default: {
    duration: duration.slow,
    ease: easing.smooth,
  } as Transition,
  
  fast: {
    duration: duration.fast,
    ease: easing.smooth,
  } as Transition,
  
  slow: {
    duration: duration.slower,
    ease: easing.smooth,
  } as Transition,
  
  spring: {
    type: 'spring',
    stiffness: 300,
    damping: 30,
  } as Transition,
}

// ====================================
// Animation Variants
// ====================================

// Hero section - staggered entrance with blur
export const heroVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.slow,
        delayChildren: 0.1,
      },
    },
  } as Variants,

  item: {
    hidden: {
      opacity: 0,
      y: 14,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: duration.slower,
        ease: easing.smooth,
      },
    },
  } as Variants,

  badge: {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.95,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: duration.slow,
        ease: easing.smooth,
      },
    },
  } as Variants,

  stat: {
    hidden: {
      opacity: 0,
      y: 16,
      filter: 'blur(6px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: duration.slower,
        ease: easing.smooth,
      },
    },
  } as Variants,
}

// Section entrance animations
export const sectionVariants = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.normal,
        delayChildren: 0.15,
      },
    },
  } as Variants,

  header: {
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(4px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: duration.slow,
        ease: easing.smooth,
      },
    },
  } as Variants,

  content: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger.fast,
        delayChildren: 0.1,
      },
    },
  } as Variants,
}

// Card animations
export const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: duration.slow,
      ease: easing.smooth,
    },
  },
  hover: {
    y: -4,
    transition: {
      duration: duration.fast,
      ease: easing.smooth,
    },
  },
} as Variants

// FAQ accordion animations
export const accordionVariants = {
  content: {
    hidden: {
      height: 0,
      opacity: 0,
      filter: 'blur(4px)',
    },
    visible: {
      height: 'auto',
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        height: {
          duration: duration.normal,
          ease: easing.smooth,
        },
        opacity: {
          duration: duration.fast,
          delay: 0.1,
          ease: easing.out,
        },
        filter: {
          duration: duration.fast,
          delay: 0.1,
        },
      },
    },
    exit: {
      height: 0,
      opacity: 0,
      filter: 'blur(4px)',
      transition: {
        height: {
          duration: duration.normal,
          ease: easing.smooth,
        },
        opacity: {
          duration: duration.fast,
          ease: easing.in,
        },
        filter: {
          duration: duration.fast,
        },
      },
    },
  } as Variants,
}

// Workflow line animation
export const workflowVariants = {
  line: {
    hidden: { scaleY: 0 },
    visible: {
      scaleY: 1,
      transition: {
        duration: 1.2,
        ease: easing.smooth,
      },
    },
  } as Variants,

  step: {
    hidden: {
      opacity: 0,
      x: -20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: duration.slow,
        ease: easing.smooth,
      },
    },
  } as Variants,

  activeStep: {
    scale: 1,
    boxShadow: '0 4px 20px rgba(109, 40, 217, 0.15)',
    borderColor: 'rgba(109, 40, 217, 0.3)',
    transition: {
      duration: duration.fast,
      ease: easing.smooth,
    },
  },
}

// Button hover effects
export const buttonVariants = {
  rest: {
    y: 0,
    boxShadow: '0 4px 14px 0 rgba(109, 40, 217, 0.25)',
  },
  hover: {
    y: -2,
    boxShadow: '0 8px 25px -5px rgba(109, 40, 217, 0.4)',
    transition: {
      duration: duration.fast,
      ease: easing.smooth,
    },
  },
  tap: {
    y: 0,
    scale: 0.98,
  },
} as Variants

// Fade in up (generic)
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.smooth,
    },
  },
} as Variants

// Fade in with blur
export const fadeInBlur = {
  hidden: {
    opacity: 0,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: duration.slower,
      ease: easing.smooth,
    },
  },
} as Variants

// Parallax background movement
export const parallaxConfig = {
  slow: 0.02, // 2% movement
  medium: 0.04, // 4% movement
  fast: 0.06, // 6% movement
}

// ====================================
// Reduced Motion Support
// ====================================

export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.01 },
  },
}

// Helper to check for reduced motion preference
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

// Get appropriate variants based on motion preference
export const getMotionVariants = (
  normalVariants: Variants,
  reducedVariants: Variants = reducedMotionVariants
): Variants => {
  return prefersReducedMotion() ? reducedVariants : normalVariants
}
