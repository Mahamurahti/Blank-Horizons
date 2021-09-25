import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Register.module.css'

export default function Register() {
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

                <div className={styles.leaderboardContainer}>
                    This is the register container...
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
