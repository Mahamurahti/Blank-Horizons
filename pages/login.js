import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Login.module.css'

import { useState } from 'react'
import Router from "next/router";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()

        const res = await fetch('api/login', {
            body: JSON.stringify({
                username:   username,
                password:   password
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        if (res.status === 201) {
            const result = await res.json()
            console.log(result.user)
            alert("Login SUCCESSFUL: " + result.accessToken)
        } else {
            const error = await res.text()
            alert("Login ERROR: " + error)
        }
    }

    const printUser = () => console.log(username + " " + password)

    return (
        <div className={styles.container}>
            <Head>
                <title>Blank Horizons - Login</title>
                <meta name="description" content="Leaderboard of Hangman" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button className={styles.home} onClick={() => Router.push('/')}>&larr;</button>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Login
                </h1>

                <form className={styles.form} onChange={printUser} onSubmit={handleSubmit}>
                    <div className={styles.section}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            required />
                    </div>

                    <div className={styles.section}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required />
                    </div>

                    <div className={styles.section}>
                        <button type="submit">Login</button>
                    </div>
                </form>

                <p>Not already a user? Register <Link href="/register"><a>here</a></Link>.</p>
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
