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
        terms:      false
    })

    const [state, setState] = useState({
        userInfo: true,
        countryInfo: false,
        finishInfo: false
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
                username: user.username,
                password: user.password,
                country: user.country
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        })

        if (res.status === 201) {
            await res.json()
            alert("201")
        } else {
            const error = await res.text()
            alert("ERROR")
        }
        console.log("%s %s %s %s %s %s",
            user.username, user.firstName, user.lastName, user.password, user.country, user.terms)
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

                    {state.userInfo  && <UserInfo user={user} handleChange={handleChange} setState={setState} />}

                    {state.countryInfo && <CountryInfo user={user} handleChange={handleChange} setState={setState} />}

                    {state.finishInfo && <FinishSetUp user={user} handleChange={handleChange} setState={setState} />}

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
        if(!user.terms) {
            isValid = false
            setError((prev) => ({ ...prev, terms: true }))
        }

        console.log("isValid: " + isValid)
        console.log(!stringReg.test(user.username))
        console.log(!stringReg.test(user.firstName))
        console.log(!stringReg.test(user.lastName))
        console.log(!passReg.test(user.password))
        console.log(!user.terms)

        if(isValid) setState((prev) => ({ ...prev, userInfo: false, countryInfo: true }))

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

function CountryInfo(props) {

    const { user, handleChange, setState } = props
    const [gif, setGif] = useState({
        src: "",
        alt: ""
    })

    useEffect(() => {
        console.log("CountryInfo Rendered")

        async function fetchData() {
            console.log('Checking name info...')
            try {
                console.log(process.env.GIPHY_API_KEY)
                const url = `https://api.giphy.com/v1/gifs/trending?api_key=${process.env.GIPHY_API_KEY}`
                //const fullName = user.firstName + "%20" + user.lastName
                console.log("Begin fetch")
                const response = await fetch(url)
                console.log("Begin response")
                const data = await response.json()
                console.log(data.data[0])
                setGif({
                    src: data.data[0].images.original.url,
                    alt: data.data[0].title
                })
                console.log(gif)
            } catch (error) {
                console.error(error)
            }
        }
        fetchData()
        // Fetch data only once, use deps: [] !!!
    }, [])

    return (
        <>
            <img className={styles.img} src={gif.src} alt={gif.alt} />
            
            <div className={styles.section}>
                <label htmlFor="country">Country</label>
                <input
                    type="text"
                    placeholder="Enter Country"
                    name="country"
                    value={user.country}
                    onChange={e => handleChange(e)}
                    required />
            </div>

            <div className={styles.section}>
                <button type="button">Next &rarr;</button>
            </div>
        </>
    )
}

function FinishSetUp(props) {
    return (
        <div className={styles.section}>
            <button type="submit">Login</button>
        </div>
    )
}
