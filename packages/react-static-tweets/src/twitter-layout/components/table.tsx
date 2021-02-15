import React from 'react'

export const Table = (p) => (
  <div className='table-container'>
    <table {...p} />
  </div>
)

export const Th = (p) => <th {...p} />

export const Td = (p) => <td {...p} />
