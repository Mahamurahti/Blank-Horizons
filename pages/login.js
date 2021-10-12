import Link from 'next/link'
import styles from '../styles/Login.module.sass'
import { useState, useEffect } from 'react'
import Router from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [wasLoginOk, setWasLoginOk] = useState(true)

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
            setWasLoginOk(false)
            setIsLoading(false)
        }
    }

    return (
        <div className="container">
            <Header title="Blank Horizons - Login" description="Login to Blank Horizons and compete" />
            <button className="home_button" onClick={() => Router.push('/')}>
                &larr;<span>&nbsp;Back to Home</span>
            </button>

            <main className="main">
                <h1 className="title">
                    Login
                </h1>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.section}>
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            placeholder="Enter Username"
                            name="username"
                            value={username}
                            onChange={e => {
                                setUsername(e.target.value)
                                setWasLoginOk(true)
                            }}
                            required />
                    </div>

                    <div className={styles.section}>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            value={password}
                            onChange={e => {
                                setPassword(e.target.value)
                                setWasLoginOk(true)
                            }}
                            required />
                    </div>

                    <div className={styles.section}>
                        <button type="submit">{isLoading ? "LOADING" : "Login"}</button>
                    </div>
                </form>
                {!wasLoginOk && <p className={styles.red}>Invalid credentials</p>}
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
