import Head from 'next/head'
import Link from 'next/link'
import styles from '../styles/Login.module.css'

import { useState, useEffect } from 'react'
import Router from "next/router";
import Footer from "../components/Footer";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if(localStorage.getItem('token')) Router.push('/')
    }, [])

    const handleSubmit = async e => {
        e.preventDefault()

        setIsLoading(true)

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
            localStorage.setItem("token", result.accessToken)
            localStorage.setItem("user", JSON.stringify(result.user))
            await Router.push('/')
        } else {
            const error = await res.text()
            alert("Login ERROR: " + error)
            setIsLoading(false)
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
            <button className="home_button" onClick={() => Router.push('/')}>&larr;</button>

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
                        <button type="submit">{isLoading ? "LOADING" : "Login"}</button>
                    </div>
                </form>

                <p className={styles.register}>Not already a user? Register <Link href="/register"><a>here</a></Link>.</p>
                <p>Forgot your password? Reset password {' '}
                    <a
                        href="https://www.youtube.com/watch?v=eBGIQ7ZuuiU"
                       target="_blank"
                    >
                        here
                    </a>.
                </p>
            </main>

            <Footer />
        </div>
    )
}
