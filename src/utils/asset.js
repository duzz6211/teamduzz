export function withBase(inputPath) {
  if (!inputPath) return inputPath
  const path = String(inputPath)
  if (/^https?:\/\//i.test(path)) return path
  const normalized = path.startsWith('/') ? path.slice(1) : path
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${normalized}`
}

