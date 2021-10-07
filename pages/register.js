import Head from 'next/head'
import styles from '../styles/Register.module.css'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Footer from "../components/Footer";
import CountryDropdown from "../components/CountryDropdown";

export default function Register() {

    useEffect(() => {
        if(localStorage.getItem('token')) Router.push('/')
    }, [])

    const [user, setUser] = useState({
        username:   "",
        password:   "",
        firstName:  "",
        lastName:   "",
        country:    "Finland",
        terms:      false,
        picture:    "",
        picture_alt:""
    })

    const [state, setState] = useState({
        userInfo: true,
        userProfile: false,
        userFinish: false
    })

    const handleChange = (e) => {
        const { target } = e

        console.log(user)

        switch (target.name) {
            case "username":
                setUser((prev) => ({ ...prev, username: target.value }))
                break
            case "password":
                setUser((prev) => ({ ...prev, password: target.value }))
                break
            case "firstName":
                setUser((prev) => ({ ...prev, firstName: target.value }))
                break
            case "lastName":
                setUser((prev) => ({ ...prev, lastName: target.value }))
                break
            case "country":
                setUser((prev) => ({ ...prev, country: target.value }))
                break
            case "terms":
                setUser((prev) => ({ ...prev, terms: !user.terms }))
                break
            default:
                console.log("target.name not recognized")
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()

        const res = await fetch('api/users', {
            body: JSON.stringify({
                username:       user.username,
                password:       user.password,
                first_name:     user.firstName,
                last_name:      user.lastName,
                country:        user.country,
                picture:        user.picture,
                picture_alt:    user.picture_alt
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        if (res.status === 201) {
            const result = await res.json()
            console.log("Registration successful: " + result.username)
            await Router.push("/login")
        } else {
            const error = await res.text()
            alert("Registration ERROR: " + error)
        }
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>Blank Horizons - Register</title>
                <meta name="description" content="Register an account" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <button className="home_button" onClick={() => Router.push('/')}>&larr;</button>

            <main className={styles.main}>

                <h1 className={styles.title}>
                    Register
                </h1>

                <form className={styles.form} onSubmit={handleSubmit}>

                    {state.userInfo  && (
                        <UserInfo user={user} handleChange={handleChange} setState={setState} />
                    )}

                    {state.userProfile && (
                        <UserProfile user={user} setUser={setUser} setState={setState} />
                    )}

                    {state.userFinish && (
                        <FinishSetUp user={user} setState={setState} />
                    )}

                </form>
            </main>

            <Footer />
        </div>
    )
}

function UserInfo(props) {

    const { user, handleChange, setState } = props
    const [isUsernameTaken, setIsUsernameTaken] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState({
        username:   false,
        password:   false,
        firstName:  false,
        lastName:   false,
        country:    false,
        terms:      false
    })

    const handleNext = async () => {
        setIsLoading(true)
        let isValid = true

        // Check is the username taken
        try {
            const res = await fetch('api/username', {
                body: JSON.stringify({
                    username:   user.username,
                }),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'POST'
            })

            if (res.status === 201) {
                console.log("Username not taken")
            } else {
                setIsUsernameTaken(true)
                isValid = false
            }
        } catch (e) {
            console.error(e)
        }

        const stringReg = /^[a-zA-ZÄÖ0-9]{3,16}/
        // Password: 1 lowercase, 1 uppercase, 1 number, 1 special, at least 8 characters
        const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

        if(!stringReg.test(user.username)) {
            isValid = false
            setError((prev) => ({ ...prev, username: true }))
        }
        if(!stringReg.test(user.firstName)) {
            isValid = false
            setError((prev) => ({ ...prev, firstName: true }))
        }
        if(!stringReg.test(user.lastName)) {
            isValid = false
            setError((prev) => ({ ...prev, lastName: true }))
        }
        if(!passReg.test(user.password)) {
            isValid = false
            setError((prev) => ({ ...prev, password: true }))
        }
        if(!user.terms) {
            isValid = false
            setError((prev) => ({ ...prev, terms: true }))
        }

        setIsLoading(false)

        if(isValid) setState((prev) => ({ ...prev, userInfo: false, userProfile: true }))
    }

    const handleError = (e) => {
        const { target } = e

        switch (target.name) {
            case "username":
                setIsUsernameTaken(false)
                setError((prev) => ({ ...prev, username: false }))
                break
            case "password":
                setError((prev) => ({ ...prev, password: false }))
                break
            case "firstName":
                setError((prev) => ({ ...prev, firstName: false }))
                break
            case "lastName":
                setError((prev) => ({ ...prev, lastName: false }))
                break
            case "terms":
                setError((prev) => ({ ...prev, terms: false }))
                break
            default:
                console.log("target.name not recognized")
        }
    }

    return (
        <>
            <div className={styles.section}>
                <label htmlFor="username">Username</label>
                <input
                    className={error.username ? styles.error : null}
                    type="text"
                    placeholder="Enter Username"
                    name="username"
                    value={user.username}
                    onChange={e => handleChange(e)}
                    onInput={e => handleError(e)}
                    maxLength={16}
                    minLength={3}
                    required />
                <div className={styles.more_info}>
                    ?
                    <div className={styles.more_info_reveal}>
                        Username must be at least 3 characters long and a maximum of 16 characters.
                        No special characters (including spaces).
                    </div>
                </div>
            </div>
            {isUsernameTaken &&
                <div className={styles.section}>
                    <p className={styles.red}>Username taken. <br/><span>Please use a different one.</span></p>
                </div>
            }

            <div className={styles.section}>
                <label htmlFor="firstName">First Name</label>
                <input
                    className={error.firstName ? styles.error : null}
                    type="text"
                    placeholder="Enter First Name"
                    name="firstName"
                    value={user.firstName}
                    onChange={e => handleChange(e)}
                    onInput={e => handleError(e)}
                    maxLength={16}
                    minLength={3}
                    required />
                <div className={styles.more_info}>
                    ?
                    <div className={styles.more_info_reveal}>
                        First name must be at least 3 characters long and a maximum of 16 characters.
                        No special characters (including spaces).
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <label htmlFor="lastName">Last Name</label>
                <input
                    className={error.lastName ? styles.error : null}
                    type="text"
                    placeholder="Enter Last Name"
                    name="lastName"
                    value={user.lastName}
                    onChange={e => handleChange(e)}
                    onInput={e => handleError(e)}
                    maxLength={16}
                    minLength={3}
                    required />
                <div className={styles.more_info}>
                    ?
                    <div className={styles.more_info_reveal}>
                        Last name must be at least 3 characters long and a maximum of 16 characters.
                        No special characters (including spaces).
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <label htmlFor="password">Password</label>
                <input
                    className={error.password ? styles.error : null}
                    type="password"
                    placeholder="Enter Password"
                    name="password"
                    value={user.password}
                    onChange={e => handleChange(e)}
                    onInput={e => handleError(e)}
                    minLength={8}
                    required />
                <div className={styles.more_info}>
                    ?
                    <div className={styles.more_info_reveal}>
                        Password must be at least 8 characters long and must include 1 uppercase letter, 1 lowercase
                        letter, 1 special character and 1 numeric character.
                    </div>
                </div>
            </div>

            <div className={styles.section}>
                <label htmlFor="country">Country</label>
                <select
                    name="country"
                    value={user.country}
                    onChange={e => handleChange(e)}
                    onInput={e => handleError(e)}
                    required
                >
                    <CountryDropdown />
                </select>
            </div>

            <div className={styles.terms}>
                <div className={styles.row}>
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
                        value={user.terms}
                        onChange={e => handleChange(e)}
                        onInput={e => handleError(e)}
                        required />
                </div>
                {error.terms && <p className={styles.red}>Please read our terms and conditions.</p>}
            </div>

            <div className={styles.section}>
                <button type="button" onClick={handleNext}>{isLoading ? "LOADING" : <span>Next &rarr;</span>}</button>
            </div>
        </>
    )
}

function UserProfile(props) {

    const { setUser, setState } = props
    // Array of fetched GIFs
    const [gifs, setGifs] = useState([])
    // Currently active GIF
    const [gif, setGif] = useState({ src: "", alt: "" })
    const [isLoading, setIsLoading] = useState(false)
    const [index, setIndex] = useState(0)

    const handleReroll = () => {
        try {
            if(index === gifs.length - 1) setIndex(0)
            else setIndex((prev) => (prev + 1))
            setGif({
                src: gifs[index].images.original.url,
                alt: gifs[index].title
            })
        } catch (error) {
            console.error(error)
        } finally {
            console.log(gif)
        }
    }

    const handleNext = () => {
        setUser((prev) => ({ ...prev, picture: gif.src, picture_alt: gif.alt }))
        setState((prev) => ({ ...prev, userProfile: false, userFinish: true }))
    }

    const handleBack = () => {
        setState((prev) => ({ ...prev, userInfo: true, userProfile: false }))
    }

    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            try {
                const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=funny&limit=50&rating=r`
                const response = await fetch(url)
                const data = await response.json()
                setGifs(data.data)
                setGif({
                    src: data.data[0].images.original.url,
                    alt: data.data[0].title
                })
            } catch (error) {
                console.error(error)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
        // Fetch data only once, use deps: [] !!!
    }, [])

    return (
        <>
            <h2>Choose a profile picture</h2>

            <img className={styles.img} src={gif.src} alt={gif.alt} />

            <div className={styles.section}>
                <button type="button" onClick={handleReroll}>{isLoading ? "LOADING" : "Reroll Picture"}</button>
            </div>

            <div className={styles.section}>
                <button type="button" onClick={handleNext}>Next &rarr;</button>
            </div>

            <div className={styles.section}>
                <button type="button" className={styles.back} onClick={handleBack}>&larr; Back</button>
            </div>
        </>
    )
}

function FinishSetUp(props) {
    const { user, setState } = props
    const password = user.password.split("").map(() => "*")

    const [buttonText, setButtonText] = useState("Register")

    useEffect(() => console.log(user), [])

    const handleBack = () => {
        setState((prev) => ({ ...prev, userProfile: true, userFinish: false }))
    }

    return (
        <>
            <h2>Your info</h2>

            <div className={styles.summary}>
                <img className={styles.img} src={user.picture} alt={user.picture_alt} />

                <div className={styles.user_info}>
                    <div className={styles.section}>
                        <p className={styles.bold}>Username:</p>
                        <p className={styles.underline}>{user.username}</p>
                    </div>

                    <div className={styles.section}>
                        <p className={styles.bold}>First Name:</p>
                        <p className={styles.underline}>{user.firstName}</p>
                    </div>

                    <div className={styles.section}>
                        <p className={styles.bold}>Last Name:</p>
                        <p className={styles.underline}>{user.lastName}</p>
                    </div>

                    <div className={styles.section}>
                        <p className={styles.bold}>Password:</p>
                        <p className={styles.underline}>{password}</p>
                    </div>

                    <div className={styles.section}>
                        <p className={styles.bold}>Country:</p>
                        <p className={styles.underline}>{user.country}</p>
                    </div>

                </div>
            </div>
            <div className={styles.section}>
                <button type="submit" onClick={() => {setButtonText("PROCESSING")}}>{buttonText}</button>
            </div>

            <div className={styles.section}>
                <button type="button" className={styles.back} onClick={handleBack}>&larr; Back</button>
            </div>
        </>
    )
}
