'use client'

import React from 'react'
import { useState } from 'react'
import Link from 'next/link'

import styles from './styles.module.css'

const APP_URL = 'https://react-static-tweets.vercel.app'
const cn = (arr) => arr.filter(Boolean).join(' ')

function getRandomId(id, tweets) {
  let i = 0
  while (true) {
    const randomId = tweets[Math.floor(Math.random() * tweets.length)]
    if (randomId !== id) return randomId
    // Make sure to not create an infinite loop
    i++
    if (i >= tweets.length) return id
  }
}

async function getError(res) {
  if (res.headers.get('Content-Type').includes('application/json')) {
    const data = await res.json()
    return data.errors[0]
  }
  return { message: (await res.text()) || res.statusText }
}

export function RandomTweet({ initialId }) {
  const [{ id, loading, error, success }, setState] = useState({
    id: initialId,
    loading: false
  } as any)

  const fetchTweet = async (e) => {
    e.preventDefault()
    setState({ id, loading: true })

    const res = await fetch('/api/tweets')

    if (res.ok) {
      const { tweets } = await res.json()
      return setState({
        id: getRandomId(id, tweets),
        loading: false,
        success: true
      })
    }

    const error = await getError(res)

    setState({ id, loading: false, error })
  }

  return (
    <div className={styles['random-tweet-container']}>
      <Link href={`/${id}`}>
        {APP_URL}/<span className={success ? styles.id : null}>{id}</span>
      </Link>

      <div className={styles['random-tweet']}>
        <button
          className={cn([
            styles['generate-tweet-button'],
            loading && styles['tweet-loading']
          ])}
          type='button'
          onClick={fetchTweet}
        >
          {loading ? (
            <>
              ⏱<i> Fetching a random tweet</i>
            </>
          ) : (
            <>&#x21BA; Click here to get a random tweet</>
          )}
        </button>

        {error && <span>⚠️ Error: {error.message}. Please try again</span>}
      </div>
    </div>
  )
}
