import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/About.module.css'
import Router from "next/router";

export default function About() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Blank Horizons - About</title>
                <meta name="description" content="About the site Blank Horizons" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button className={styles.home} onClick={() => Router.push('/')}>&larr;</button>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    About
                </h1>

                <div className={styles.aboutContainer}>
                    This is the about container...
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
