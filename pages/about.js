import Head from 'next/head'
import styles from '../styles/About.module.css'
import Router from "next/router";
import Footer from "../components/Footer";

export default function About() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Blank Horizons - About</title>
                <meta name="description" content="About the site Blank Horizons" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button className="home_button" onClick={() => Router.push('/')}>&larr;</button>

            <main className={styles.main}>
                <h1 className={styles.title}>
                    About
                </h1>

                <div className={styles.about_container}>
                    This is the about container...
                </div>
            </main>

            <Footer />
        </div>
    )
}
