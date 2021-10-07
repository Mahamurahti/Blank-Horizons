import Head from 'next/head'
import styles from '../styles/Leaderboard.module.css'
import Router from "next/router";
import { useState, useEffect } from 'react'
import Footer from "../components/Footer";

export default function Leaderboard() {

    const [scores, setScores] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [currentUser, setCurrentUser] = useState("")

    useEffect(() => {
        setCurrentUser(JSON.parse(localStorage.getItem("user"))?.username)
        async function getScores() {
            setIsLoading(true)
            try {
                const res = await fetch('api/scores', { method: 'GET' })
                if (res.status === 200) {
                    const result = await res.json()

                    setScores(result)
                } else {
                    console.log("No scores found")
                }
            } catch (e) {
                console.error(e)
            }
            setIsLoading(false)
        }
        getScores()
    }, [])

    return (
        <div className={styles.container}>
            <Head>
                <title>Blank Horizons - Leaderboard</title>
                <meta name="description" content="Leaderboard of Hangman" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button className="home_button" onClick={() => Router.push('/')}>&larr;</button>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Leaderboard
                </h1>

                {isLoading ? (
                    <div className={styles.loading} />
                ) : (
                    <ul className={styles.leaderboard_container}>
                        {scores.sort((a,b) => a.score < b.score ? 1 : -1).map((score, index) => (
                            <li key={index} className={styles.entry}>
                                <img className={styles.img} src={score.picture} alt={score.picture_alt} />
                                <span className={currentUser === score.username ? styles.orange : null}>
                                    {score.username}
                                </span>
                                <span className={styles.score}>
                                    {score.score}
                                </span>
                            </li>
                        ))}
                    </ul>
                )}
            </main>

            <Footer />
        </div>
    )
}
