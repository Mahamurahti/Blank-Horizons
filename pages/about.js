import styles from '../styles/About.module.sass'
import Router from "next/router";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function About() {
    return (
        <div className="container">
            <Header title="Blank Horizons - About" description="About the site Blank Horizons" />
            <button className="home_button" onClick={() => Router.push('/')}>
                &larr;<span>&nbsp;Back to Home</span>
            </button>

            <main className="main">
                <h1 className="title">
                    About
                </h1>

                <div className={styles.about_container}>
                    <p>
                        Blank Horizons was created as a final project for the first period of the third year in Metropolia
                        UAS by Eric Keränen. <br/><br/>
                        The game is only playable on desktop and has no support for mobile. <br/> Play using your {' '}
                        <span className={styles.bold_underline}>keyboard</span>.
                    </p>
                    <h2>Rules</h2>
                    <section>
                        <ul className={styles.list}>
                            <li>
                                Every time you start playing, a random word will be selected from a list of ~1000 most
                                common english words.
                            </li>
                            <li>
                                Each round you start with 12 points and lose 2 points for every wrong letter guessed.
                            </li>
                            <li>
                                You have a total of 6 tries to guess the word. Earth in the middle of the play screen
                                will keep losing its segments, going from a sphere to a triangle. This indicates how many
                                tries you have left.
                            </li>
                            <li>
                                If the word contains multiples of the same letter and the letter is guessed, all the
                                occurrences of the letter will be filled.
                            </li>
                            <li>
                                If you guess the word with less than 6 tries, you win and gain the points you were left
                                with. Earth will be saved!
                            </li>
                            <li>
                                If you can't guess the word in 6 tries, you lose and gain nothing. This will also result
                                in Earth exploding.
                            </li>
                            <li>
                                All won points will be added to your account if you're logged in. No points can be lost
                                once they've been acquired.
                            </li>
                        </ul>
                    </section>
                    <h2>Vision</h2>
                    <p>
                        The vision of the project was to make a simple game, where players can compete against each other.
                        The game needed to be simple, since there was only two and a half weeks time to get the project
                        ready. As the game I decided to make a Hangman game, since it was relatively simple to make
                        and can be addicting. I also wanted a theme for the website and decided to go with a space theme.
                        The name "Blank Horizons" was derived from the blank spaces which need to be filled in the
                        Hangman game and from planets horizon. Originally it was planned to place the blank spaces
                        along a horizon, but it proved hard to achieve.
                    </p>
                    <h2>Technologies used</h2>
                    <section>
                        <ul className={styles.list}>
                            <li>
                                <a href="https://nextjs.org/" target="_blank">Next.js / React</a> - framework
                            </li>
                            <li>
                                <a href="https://sass-lang.com/" target="_blank">Sass</a> - styling
                            </li>
                            <li>
                                <a href="https://vercel.com/dashboard" target="_blank">Vercel</a> - production deployment
                            </li>
                            <li>
                                <a href="https://planetscale.com/" target="_blank">PlanetScale</a> - database
                            </li>
                            <li>
                                <a href="https://github.com/" target="_blank">Git</a> - version control
                            </li>
                            <li>
                                <a href="https://threejs.org/" target="_blank">Three.js</a> - 3D computer graphic library
                            </li>
                        </ul>
                    </section>
                </div>
            </main>

            <Footer />
        </div>
    )
}
