import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Play.module.css'
import Router from "next/router";

export default function Play() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Blank Horizons - Play</title>
                <meta name="description" content="Play Hangman!" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button className={styles.home} onClick={() => Router.push('/')}>&larr;</button>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    Play!
                </h1>

               <div className={styles.gameContainer}>
                   This is the game container...
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
