import Link from "next/link";
import styles from '../styles/Home.module.sass'
import { useState, useEffect } from 'react'
import Footer from "../components/Footer";
import Header from "../components/Header";

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
    <div className="container">
      <Header title="Blank Horizons" description="Welcome to Blank Horizons!" />

      <main className="main">
        <h1 className="title">
          {loggedInUser === null ?
              <span>Welcome t<img src="/horizon-logo.png" alt="Blank Horizons logo" width={100} height={100}/>
              <span className={styles.dashed}>Blank Horizons!</span></span> :
              <span>Welcome <span className={styles.dashed}>{loggedInUser.username}!</span></span>
          }
        </h1>


        {loggedInUser === null ?
            <p className="description">
              Play Hangman and compete against others!
            </p> :
            <img className={styles.img} src={loggedInUser.picture} alt={loggedInUser.picture_alt} />
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
                  <h2>Login / Register &rarr;</h2>
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

     <Footer />
    </div>
  )
}
