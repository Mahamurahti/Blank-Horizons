import Head from 'next/head'
import styles from '../styles/Play.module.css'
import Router from "next/router";
import { useState, useEffect } from 'react'
import { showNotification as show, checkIfWon, GameStatus } from "../helpers/helpers";
import Footer from "../components/Footer";
import words from "../words"

let allWords = words()
let selectedWord = allWords[Math.floor(Math.random() * allWords.length)]

export default function Play() {

    const [playable, setPlayable] = useState(true)
    const [correctLetters, setCorrectLetters] = useState([])
    const [wrongLetters, setWrongLetters] = useState([])
    const [showNotification, setShowNotification] = useState(false)
    const [score, setScore] = useState(12)

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
                        setScore((prev) => prev - 2)
                    } else {
                        show(setShowNotification)
                    }
                }
            }
        }
        window.addEventListener('keydown', handleKeydown)

        return () => window.removeEventListener('keydown', handleKeydown)
    }, [correctLetters, wrongLetters, playable])

    function playAgain() {
        setPlayable(true)

        setCorrectLetters([])
        setWrongLetters([])
        setScore(12)

        const random = Math.floor(Math.random() * allWords.length)
        selectedWord = allWords[random]
    }

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
                    Score : {score}
                </h1>

               <div className={styles.game_container}>
                   <Figure wrongLetters={wrongLetters} />
                   <WrongLetters wrongLetters={wrongLetters} />
                   <Word selectedWord={selectedWord} correctLetters={correctLetters} />
               </div>
                <Notification showNotification={showNotification} />
                <Results
                    correctLetters={correctLetters}
                    wrongLetters={wrongLetters}
                    selectedWord={selectedWord}
                    score={score}
                    setPlayable={setPlayable}
                    playAgain={playAgain}
                />
            </main>

            <Footer />
        </div>
    )
}

function Figure(props) {

    const { wrongLetters } = props

    const errors = wrongLetters.length
    
    return (
        <>
            <h1 className={styles.figure_container}>
                {errors > 0 && <div className={styles.figure_part}>W</div>}
                {errors > 1 && <div className={styles.figure_part}>R</div>}
                {errors > 2 && <div className={styles.figure_part}>O</div>}
                {errors > 3 && <div className={styles.figure_part}>N</div>}
                {errors > 4 && <div className={styles.figure_part}>G</div>}
                {errors > 5 && <div className={styles.figure_part}>!</div>}
            </h1>
        </>
    )
}

function WrongLetters(props) {

    const { wrongLetters } = props

    return (
        <>
            <div className={styles.wrong_container}>
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

function Notification(props) {

    const { showNotification } = props

    return (
        <>
            <div className={showNotification ? styles.notification_container : styles.hide}>
                <p>You have already guessed this letter</p>
            </div>
        </>
    )
}

function Results(props) {

    const { correctLetters, wrongLetters, score, selectedWord, setPlayable, playAgain } = props

    const [saveState, setSaveState] = useState({
        isPassive: true,
        isSaving: false,
        isSaved: false,
        isUnauthorized: false,
        isError: false
    })
    let finalMessage = ''
    let revealedWordOrScore = ''
    let playable = true

    function reset() {
        setSaveState({
            isPassive: true,
            isSaving: false,
            isSaved: false,
            isUnauthorized: false,
            isError: false
        })
        playAgain()
    }

    async function saveScore() {
        setSaveState((prev) => ({ ...prev, isPassive: false, isSaving: true }))
        try {
            const user = JSON.parse(localStorage.getItem('user'))
            const token = localStorage.getItem('token')

            const res = await fetch('api/scores', {
                body: JSON.stringify({
                    username: user.username,
                    score: score
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                method: 'POST'
            })
            const data = await res
            console.log(data)
            if(data.status === 401 || data.status === 403) {
                console.log('Unauthorized')
                setSaveState((prev) => ({ ...prev, isSaving: false, isUnauthorized: true }))
            }else if(data.status === 500) {
                console.log('Database error')
                setSaveState((prev) => ({ ...prev, isSaving: false, isError: true }))
            } else {
                console.log('Authorized')
                setSaveState((prev) => ({ ...prev, isSaving: false, isSaved: true }))
            }
        } catch (error) {
            console.error(error)
            setSaveState((prev) => ({ ...prev, isSaving: false, isError: true }))
        }
    }

    if(checkIfWon(correctLetters, wrongLetters, selectedWord) === GameStatus.WIN) {
        finalMessage = 'Congratulations you won!'
        revealedWordOrScore = 'You final score was ' + score
        playable = false

        if(localStorage.getItem('token') && saveState.isPassive) saveScore()

    } else if (checkIfWon(correctLetters, wrongLetters, selectedWord) === GameStatus.LOSE) {
        finalMessage = 'Unfortunately you lost!'
        revealedWordOrScore = <span>The word you were guessing was <span className={styles.reveal}>{selectedWord}</span></span>
        playable = false
    }

    useEffect(() => setPlayable(playable))

    return (
        <>
            <div className={styles.results_container} style={finalMessage !== '' ? {display: "flex"} : {display: "none"}}>
                <h2 className={styles.result_message}>{finalMessage}</h2>
                <h3 className={styles.reveal_word}>{revealedWordOrScore}</h3>
                {saveState.isSaving && <p className={styles.orange}>Score is being saved to database</p>}
                {saveState.isSaved && <p className={styles.green}>Score saved to database</p>}
                {saveState.isError && <p className={styles.red}>An error occurred while saving score</p>}
                {saveState.isUnauthorized && <p className={styles.red}>Your login has expired. Please login again.</p>}
                <button className={styles.play_button} onClick={reset}>Play Again &rarr;</button>
                <button className={styles.back_button} onClick={() => Router.push('/')}>&larr; Home</button>
            </div>
        </>
    )
}
