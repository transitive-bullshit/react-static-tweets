import React from 'react'
import { forwardRef } from 'react'
import styles from './styles.module.css'

export const A = forwardRef(
  ({ children, href, title, blank = true, onClick }: any, ref: any) => (
    <a
      ref={ref}
      href={href}
      target={blank ? '_blank' : null}
      rel={blank ? 'noopener noreferrer' : null}
      title={title || href}
      className={styles.anchor}
      onClick={onClick}
    >
      {blank ? <>{children}&nbsp;&raquo;</> : children}
    </a>
  )
)
