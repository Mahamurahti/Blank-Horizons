import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'

export default function Login() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Blank Horizons - Login</title>
                <meta name="description" content="Leaderboard of Hangman" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Login
                </h1>

                <div className={styles.loginContainer}>
                    This is the login container...
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
