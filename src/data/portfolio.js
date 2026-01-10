import portfolioData from './portfolioData.json'

export { portfolioData }

export const getPortfolioById = (id) => portfolioData.find((item) => item.id === id)

export const getPortfolioList = () =>
  portfolioData.map(({ id, title, category, year, thumbnail, summary }) => ({
    id,
    title,
    category,
    year,
    thumbnail,
    summary,
  }))

