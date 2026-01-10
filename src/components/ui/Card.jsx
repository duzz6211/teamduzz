import React from 'react'
import './Card.css'

const Card = ({ variant = 'default', className = '', children, ...props }) => {
  return (
    <div className={`card card--${variant} ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card

