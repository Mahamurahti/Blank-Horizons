import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Play.module.css'
import Router from "next/router";
import { useState, useEffect } from 'react'
import { showNotification as show } from "../helpers/helpers";

const words = ["wizard", "harry", "potter", "philosopher", "wand"]
let selectedWord = words[Math.floor(Math.random() * words.length)]

export default function Play() {

    const [playable, setPlayable] = useState(true)
    const [correctLetters, setCorrectLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [showNotification, setShowNotification] = useState(false)

    useEffect(() => {
        const handleKeydown = (e) => {
            const { key, keyCode } = e
            if (playable && keyCode >= 65 && keyCode <= 90) {
                const letter = key.toLowerCase()

                if(selectedWord.includes(letter)) {
                    if(!correctLetters.includes(letter)) {
                        setCorrectLetters((prev) => [ ...prev, letter])
                    } else {
                        show(setShowNotification)
                    }
                } else {
                    if(!wrongLetters.includes(letter)) {
                        setWrongLetters((prev) => [ ...prev, letter])
                    } else {
                        show(setShowNotification)
                    }
                }
            }
        }
        window.addEventListener('keydown', handleKeydown)

        return () => window.removeEventListener('keydown', handleKeydown)
    }, [correctLetters, wrongLetters, playable])

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
                   <Figure wrongLetters={wrongLetters} />
                   <WrongLetters wrongLetters={wrongLetters} />
                   <Word selectedWord={selectedWord} correctLetters={correctLetters} />
                   <Notification showNotification={showNotification} />
                   {/*<Results />*/}
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

function Figure(props) {

    const { wrongLetters } = props

    const errors = wrongLetters.length
    
    return (
        <>
            <h1 className={styles.figureContainer}>
                {errors > 0 && <div className={styles.figurePart}>W</div>}
                {errors > 1 && <div className={styles.figurePart}>R</div>}
                {errors > 2 && <div className={styles.figurePart}>O</div>}
                {errors > 3 && <div className={styles.figurePart}>N</div>}
                {errors > 4 && <div className={styles.figurePart}>G</div>}
                {errors > 5 && <div className={styles.figurePart}>!</div>}
            </h1>
        </>
    )
}

function WrongLetters(props) {

    const { wrongLetters } = props

    return (
        <>
            <div className={styles.wrongContainer}>
                <div>
                    {wrongLetters.length > 0 && <p>Wrong</p>}
                    {wrongLetters
                        .map((letter, index) => <span key={index}>{letter}</span>)
                        .reduce((prev, curr) => prev === null ? [curr] : [prev, ', ', curr], null)}
                </div>
            </div>
        </>
    )
}

function Word(props) {

    const { selectedWord, correctLetters } = props

    return (
        <>
            <div className={styles.word}>
                {selectedWord.split("").map((letter, index) => (
                    <span className={styles.letter} key={index}>
                        {correctLetters.includes(letter) ? letter : ""}
                    </span>
                ))}
            </div>
        </>
    )
}

function Results() {
    return (
        <>
            <div className={styles.resultsContainer}>
                <div className={styles.results}>
                    <h2 className={styles.resultMessage}></h2>
                    <h3 className={styles.revealWord}></h3>
                    <button className={styles.playButton}></button>
                </div>
            </div>
        </>
    )
}

function Notification(props) {

    const { showNotification } = props

    return showNotification && (
        <>
            <div className={styles.notificationContainer}>
                <p className={styles.notification}>You have already guessed this letter</p>
            </div>
        </>
    )
}
