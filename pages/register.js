import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Register.module.css'
import { useState, useEffect } from 'react'

export default function Register() {

    const [user, setUser] = useState({
        username:   "",
        password:   "",
        firstName:  "",
        lastName:   "",
        country:    "",
        terms:      false,
        profile_pic: {
            large:  "",
            medium: "",
            small:  "",
            alt:    ""
        }
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
                username:   user.username,
                password:   user.password,
                first_name:  user.firstName,
                last_name:   user.lastName,
                country:    user.country,
                large_pic:  user.profile_pic.large,
                medium_pic: user.profile_pic.medium,
                small_pic:  user.profile_pic.small,
                alt_pic:    user.profile_pic.alt
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        if (res.status === 201) {
            await res.json()
            alert("Registration SUCCESSFUL")
        } else {
            const error = await res.text()
            alert("Registration ERROR")
        }
    }

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

                <form className={styles.form} onSubmit={handleSubmit}>

                    {state.userInfo  && (
                        <UserInfo user={user} handleChange={handleChange} setState={setState} />
                    )}

                    {state.userProfile && (
                        <UserProfile user={user} setUser={setUser} setState={setState} />
                    )}

                    {state.userFinish && (
                        <FinishSetUp user={user} />
                    )}

                </form>
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

function UserInfo(props) {

    const { user, handleChange, setState } = props
    const [error, setError] = useState({
        username:   false,
        password:   false,
        firstName:  false,
        lastName:   false,
        country:    false,
        terms:      false
    })

    const handleNext = () => {
        const stringReg = /^[a-zA-ZÄÖ0-9]{1,16}/
        // Password: 1 lowercase, 1 uppercase, 1 number, 1 special, at least 8 characters
        const passReg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/

        let isValid = true

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
        if(!stringReg.test(user.country)) {
            isValid = false
            setError((prev) => ({ ...prev, country: true }))
        }
        if(!user.terms) {
            isValid = false
            setError((prev) => ({ ...prev, terms: true }))
        }

        console.log("isValid: " + isValid)
        console.log(!stringReg.test(user.username))
        console.log(!stringReg.test(user.firstName))
        console.log(!stringReg.test(user.lastName))
        console.log(!passReg.test(user.password))
        console.log(!stringReg.test(user.country))
        console.log(!user.terms)

        if(isValid) setState((prev) => ({ ...prev, userInfo: false, userProfile: true }))

        return isValid
    }

    const handleError = (e) => {
        const { target } = e

        switch (target.name) {
            case "username":
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
            case "country":
                setError((prev) => ({ ...prev, country: false }))
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
                    required />
            </div>

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
                    required />
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
                    required />
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
            </div>

            <div className={styles.section}>
                <label htmlFor="country">Country Code</label>
                <input
                    className={error.country ? styles.error : null}
                    type="text"
                    placeholder="Enter Country"
                    name="country"
                    value={user.country}
                    onChange={e => handleChange(e)}
                    onInput={e => handleError(e)}
                    maxLength={16}
                    required />
            </div>

            <div className={styles.section + " " + styles.terms}>
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
                {error.terms && <p>Please read our terms and conditions.</p>}
            </div>

            <div className={styles.section}>
                <button type="button" onClick={handleNext}>Next &rarr;</button>
            </div>
        </>
    )
}

function UserProfile(props) {

    const { user, setUser, setState } = props
    const [gifs, setGifs] = useState([])
    const [gif, setGif] = useState({
        large: "",
        medium: "",
        small: "",
        alt: ""
    })
    const [isLoading, setIsLoading] = useState(false)
    const [index, setIndex] = useState(1)

    const handleReroll = () => {
        setIsLoading(true)
        try {
            if(index === gifs.length) setIndex(0)
            setIndex((prev) => (prev + 1))
            setGif({
                large: gifs[index].images.original.url,
                medium: gifs[index].images.fixed_width.url,
                small: gifs[index].images.fixed_width_small.url,
                alt: gifs[index].title
            })
        } catch (error) {
            console.error(error)
        } finally {
            console.log(gif)
            setIsLoading(false)
        }
    }

    const handleNext = () => {
        setUser((prev) => ({ ...prev, profile_pic: {
                large: gif.large,
                medium: gif.medium,
                small: gif.small,
                alt: gif.alt
            }
        }))

        setState((prev) => ({ ...prev, userProfile: false, userFinish: true }))

        console.log(user)
    }

    useEffect(() => {
        setIsLoading(true)
        console.log("UserProfile Rendered")

        async function fetchData() {
            console.log('Setting profile picture...')
            try {
                const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}`
                const response = await fetch(url)
                console.log("Begin response")
                const data = await response.json()
                setGifs(data.data)
                setGif({
                    large: data.data[0].images.original.url,
                    medium: data.data[0].images.fixed_width.url,
                    small: data.data[0].images.fixed_width_small.url,
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
            <h2>Your profile picture</h2>

            <img className={styles.img} src={gif.large} alt={gif.alt} />

            <div className={styles.section}>
                <button type="button" onClick={handleReroll}>{isLoading ? "LOADING" : "Reroll Picture"}</button>
            </div>

            <div className={styles.section}>
                <button type="button" onClick={handleNext}>Next &rarr;</button>
            </div>
        </>
    )
}

function FinishSetUp(props) {
    const { user } = props
    const profile = user.profile_pic

    return (
        <>
            <h2>Your info</h2>

            <div className={styles.section}>
                <p>Username:</p>
                <p>{user.username}</p>
            </div>

            <img className={styles.img} src={profile.large} alt={profile.alt} />

            <div className={styles.section}>
                <p>First Name:</p>
                <p>{user.firstName}</p>
            </div>

            <div className={styles.section}>
                <p>Last Name:</p>
                <p>{user.lastName}</p>
            </div>

            <div className={styles.section}>
                <p>Password:</p>
                <p>{user.password}</p>
            </div>

            <div className={styles.section}>
                <p>Country:</p>
                <p>{user.country}</p>
            </div>

            <div className={styles.section}>
                <button type="submit">Register</button>
            </div>
        </>
    )
}
