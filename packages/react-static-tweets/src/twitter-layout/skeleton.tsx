import React from 'react'
import styles from './skeleton.module.css'

export const Skeleton: React.FC<{
  children?: React.ReactNode
  style?: React.CSSProperties
}> = ({ children, style }) => {
  return (
    <span className={styles.skeleton} style={style}>
      {children}
    </span>
  )
}
