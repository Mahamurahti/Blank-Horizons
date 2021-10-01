import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react'

export default function Home() {

  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    setLoggedInUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setLoggedInUser(null)
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Blank Horizons</title>
        <meta name="description" content="Welcome to Blank Horizons!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {loggedInUser === null ?
              <span>Welcome to <span className={styles.dashed}>Blank Horizons!</span></span> :
              <span>Welcome <span className={styles.dashed}>{loggedInUser.username}!</span></span>
          }
        </h1>

        {loggedInUser === null ?
            <p className={styles.description}>
              Play Hangman and compete against others!
            </p> :
            <img className={styles.img} src={loggedInUser.large_pic} alt={loggedInUser.alt_pic} />
        }

        <div className={styles.grid}>
          <Link href="/play">
            <a className={styles.card}>
              <h2>Play &rarr;</h2>
              <p>Play Hangman!</p>
            </a>
          </Link>

          <Link href="/about">
            <a className={styles.card}>
              <h2>About &rarr;</h2>
              <p>Learn more about this site.</p>
            </a>
          </Link>

          <Link href="/leaderboard">
            <a className={styles.card}>
              <h2>Leaderboard &rarr;</h2>
              <p>See the leaderboards and where you fit in!</p>
            </a>
          </Link>

          {loggedInUser === null ?
              <Link href="/login">
                <a className={styles.card}>
                  <h2>Login &rarr;</h2>
                  <p>Log in to track your score in the leaderboard!</p>
                </a>
              </Link> :
              <a className={styles.card} onClick={handleLogout}>
                <h2>Logout &rarr;</h2>
                <p>Logout to give a chance for others to compete also!</p>
              </a>
          }
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
