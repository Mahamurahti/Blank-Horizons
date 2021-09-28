import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Register.module.css'

import { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [terms, setTerms] = useState(false)
    const [country, setCountry] = useState("")

    const handleSubmit = async e => {
        e.preventDefault()

        const res = await fetch('api/users', {
            body: JSON.stringify({
                username: username,
                password: password,
                country: country
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        if (res.status === 201) {
            await res.json()
            alert("201")
        } else {
            const error = await res.text()
            alert("ERROR")
        }
        console.log("%s %s %s %s %s %s", username, firstName, lastName, password, country, terms)
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Blank Horizons - Register</title>
                <meta name="description" content="Register an account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Register
                </h1>

                <form className={styles.form} onSubmit={handleSubmit}>
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
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            placeholder="Enter First Name"
                            name="firstName"
                            value={firstName}
                            onChange={e => setFirstName(e.target.value)}
                             />
                    </div>

                    <div className={styles.section}>
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            placeholder="Enter Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={e => setLastName(e.target.value)}
                             />
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
                        <label htmlFor="country">Country</label>
                        <input
                            type="text"
                            placeholder="Enter Country"
                            name="country"
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                            required />
                    </div>

                    <div className={styles.section + " " + styles.terms}>
                        <label htmlFor="terms">
                            Do you accept our {" "}
                            <a
                                href="https://www.youtube.com/watch?v=eBGIQ7ZuuiU"
                                target="_blank"
                            >
                                terms and conditions
                            </a>?
                        </label>
                        <input
                            type="checkbox"
                            name="terms"
                            value={terms}
                            onChange={e => setTerms(!terms)}
                             />
                    </div>

                    <div className={styles.section}>
                        <button type="submit">Login</button>
                    </div>
                </form>
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
