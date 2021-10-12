import styles from '../styles/Register.module.sass'
import { useState, useEffect } from 'react'
import Router from 'next/router'
import Footer from "../components/Footer";
import CountryDropdown from "../components/CountryDropdown";
import Header from "../components/Header";

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
        favThing:   "",
        terms:      false,
        picture:    "",
        picture_alt:""
    })

    const [state, setState] = useState({
        userInfo: true,
        userProfile: false,
        userFinish: false
    })

    const [registerStatus, setRegisterStatus] = useState({ isError: false, text: "" })
    const [disable, setDisable] = useState(false)

    const handleChange = (e) => {
        const { target } = e

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
            case "favouriteThing":
                setUser((prev) => ({ ...prev, favThing: target.value }))
                break
            default:
                console.log("target.name not recognized in handleChange")
        }
    }

    const handleSubmit = async e => {
        e.preventDefault()
        setDisable(true)
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
            setRegisterStatus({ isError: false, text: result.username })
            setTimeout(() => {
                Router.push("/login")
            }, 5000)
        } else {
            const error = await res.text()
            setRegisterStatus({ isError: true, text: error })
        }
    }

    return (
        <div className="container">
            <Header title="Blank Horizons - Register" description="Register an account" />
            <button className="home_button" onClick={() => Router.push('/')}>&larr;</button>

            <main className="main">

                <h1 className="title">
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
                        <FinishSetUp user={user} setState={setState} disable={disable} />
                    )}

                    {registerStatus.text.length > 0 && (
                        <p className={registerStatus.isError ? styles.red : styles.green}>
                            {registerStatus.isError ?
                                "Registration error: " + registerStatus.text :
                                "Registration successful for " + registerStatus.text + ". Redirecting to login page..."}
                        </p>
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
    const [isFavOk, setIsFavOk] = useState(true)
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
                console.log("Username is not taken.")
            } else {
                setIsUsernameTaken(true)
                isValid = false
            }
        } catch (e) {
            console.error(e)
        }

        // Check if something is found with favourite thing
        if(user.favThing){
            try {
                const url = `https://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${user.favThing}&limit=50&rating=g`
                const res = await fetch(url)
                const data = await res.json()

                if (data.data.length >= 1) {
                    console.log("Favourite thing found something.")
                } else {
                    setIsFavOk(false)
                    isValid = false
                }
            } catch (e) {
                console.error(e)
            }
        }

        const stringReg = /^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/
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

        console.log(user)
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
            case "favouriteThing":
                setIsFavOk(true)
                break
            case "terms":
                setError((prev) => ({ ...prev, terms: false }))
                break
            default:
                console.log("target.name not recognized in handleError")
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
                        Username must be at least 3 characters long and a maximum of 16 characters. This name will be
                        used to login to your account.
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
                    required
                >
                    <CountryDropdown />
                </select>
            </div>

            <div className={styles.section}>
                <label htmlFor="favouriteThing">Favourite Thing</label>
                <input
                    type="text"
                    placeholder="Leave blank for random picture"
                    name="favouriteThing"
                    value={user.favThing}
                    onChange={e => handleChange(e)}
                    onInput={e => handleError(e)}
                    maxLength={16} />
                <div className={styles.more_info}>
                    ?
                    <div className={styles.more_info_reveal}>
                        Your favourite thing affects which kind of selection of profile pictures you will receive.
                        If you leave your favourite thing blank, the profile picture selection will be random.
                        Your profile picture can be rerolled.
                    </div>
                </div>
            </div>
            {!isFavOk &&
                <div className={styles.section}>
                    <p>Didn't fnd anything, try something else</p>
                </div>
            }

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
                        checked={user.terms}
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

    const { user, setUser, setState } = props
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

        console.log(user)
    }

    const handleBack = () => {
        setState((prev) => ({ ...prev, userInfo: true, userProfile: false }))
    }

    useEffect(() => {
        setIsLoading(true)
        async function fetchData() {
            try {
                const url = `https://api.giphy.com/v1/gifs/${user.favThing ? "search" : "trending"}?api_key=${process.env.GIPHY_API_KEY}${user.favThing ? "&q=" + user.favThing : ""}&limit=50&rating=g`
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
    const { user, setState, disable } = props
    const password = user.password.split("").map(() => "*")
    const [buttonText, setButtonText] = useState("Register")

    const handleBack = () => setState((prev) => ({ ...prev, userProfile: true, userFinish: false }))

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
                <button
                    type="submit"
                    onClick={() => {setButtonText("PROCESSING")}}
                    disabled={disable}
                >
                    {buttonText}
                </button>
            </div>

            <div className={styles.section}>
                <button
                    type="button"
                    className={styles.back}
                    onClick={handleBack}
                    disabled={disable}
                >
                    &larr; Back
                </button>
            </div>
        </>
    )
}
