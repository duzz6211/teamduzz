import React from 'react'
import './Button.css'

const Button = ({
  as: Comp = 'button',
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) => {
  return <Comp className={`btn btn--${variant} btn--${size} ${className}`} {...props} />
}

export default Button

