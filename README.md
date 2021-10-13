[![Blank Horizons logo](https://raw.githubusercontent.com/Mahamurahti/Blank-Horizons/main/public/horizon-logo.png)](https://raw.githubusercontent.com/Mahamurahti/Blank-Horizons/main/public/horizon-logo.png)

# Blank Horizons

Blank Horizons was created as a final project for the first period of the third year in Metropolia UAS by Eric Keränen.

The vision of the project was to make a simple game, where players can compete against each other.
The game needed to be simple, since there was only two, and a half weeks time to get the project
ready. As the game I decided to make a Hangman game, since it was relatively simple to make
and can be addicting. I also wanted a theme for the website and decided to go with a space theme.
The name "Blank Horizons" was derived from the blank spaces which need to be filled in the
Hangman game and from planets horizon, which can be seen shrinking when the user guesses a wrong letter.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Features

- Play Hangman in a space themed environment

[![Game screen of Blank Horizons](https://i.gyazo.com/b388a7d8cbb9923ecc9057fbc3df18d2.gif)](https://gyazo.com/b388a7d8cbb9923ecc9057fbc3df18d2)

- Register and login to you own user

[![Login in Blank Horizons](https://i.gyazo.com/926ccc5a99fd3d5559877ca188e04136.gif)](https://gyazo.com/926ccc5a99fd3d5559877ca188e04136)

- Compete against other players in the leaderboards

[![Leaderboard of Blank Horizons](https://i.gyazo.com/6920e8bdb407b37f023ce5abc840e56d.gif)](https://gyazo.com/6920e8bdb407b37f023ce5abc840e56d)

# Project Goals

This project had a few goals that needed to be achieved. The project could be continuation of the last [web development
project](https://github.com/Mahamurahti/MyMovie), but I decided to do a new one.

### Framework

As the framework I used a React based framework called [Next.js](https://nextjs.org/).

Next.js provides with fast static and server rendering accompanied by pre-rendering. Next.js features are varied, 
you can check them out on their [official documentation](https://nextjs.org/docs/getting-started).

Next.js also provides an extremely easy way to get your project into production with [Vercel](https://vercel.com/dashboard)
and was the most influential reason why I picked Next.js as the framework. One of my biggest goals was to have everything
online (database and project) so that the project can be accessed from anywhere at anytime.

### Database

As the database I used a MySQL database provided by [PlanetScale](https://planetscale.com/).

The database consists only two tables: `users` and `scores`. With the project being relatively small, I decided to with
a small amount of tables, no need to complicate things for myself. Below you can see the schemas I used for the two
tables.

[![Blank Horizons database schemas](https://i.gyazo.com/039c81b804f0370c85c95bff7966562f.png)](https://gyazo.com/039c81b804f0370c85c95bff7966562f)

### API and GIPHY

With the project being a [Next.js](https://nextjs.org/) project, I decided to use their API solution. This solution 
doesn't  operate on a server, instead only provides API endpoints, which need to be defined under `pages/api` directory 
in the project. Everything in `pages/api` is mapped to `/api/*` and will be treated as 
[API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project has four API endpoints; `api/login`, `api/scores`, `api/username` and `api/users`. To see what each endpoint
returns click [here](https://github.com/Mahamurahti/Blank-Horizons/blob/main/api_endpoints.md)

This project also lets users have a profile picture. I used [GIPHY](https://giphy.com/) to fetch some funny GIFs
and set those as users' profile pictures.

### Validation

Validation in the project is used while registering a new user. While registering a user, all fields that need to be
validated will have a question mark accompanied by the field, which upon hovered over shows what criteria must be met.

[![Validation when registering](https://i.gyazo.com/e8db7e1bbfb115c3c851a0563efbe4f7.gif)](https://gyazo.com/e8db7e1bbfb115c3c851a0563efbe4f7)

Username, first name and last name must be between 3 and 16 characters and cannot contain trailing or beginning spaces.
Max and min lengths of the fields are determined on the HTML tag.
Regular expression for these fields: `/^[-a-zA-Z0-9-()]+(\s+[-a-zA-Z0-9-()]+)*$/`.

Password must contain 1 lowercase, 1 uppercase, 1 number, 1 special and at least 8 characters.
Regular expression for a password: `/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/`.
Passwords will be ***hashed*** when stored into the database.

[![Validation of password](https://i.gyazo.com/4770feed6de3251deb2c5a9dccef5b1a.gif)](https://gyazo.com/4770feed6de3251deb2c5a9dccef5b1a)

Username cannot be already taken, this will be also checked by getting the result from `api/username` endpoint.

Because favourite thing defines what kind of selection fo GIFs the user gets from GIPHY, the field must be valid and
return some kind of result. This means either the field is empty, or some result are fetched from GIPHY. If there are no
results, the user must write a different favourite thing or leave it blank.

Terms and conditions must be checked.

### Authorization

Upon registering and logging in users will get a token which will be saved in the local storage of the browser.
The token will be active for 12 hours, after which user will have to log out and back in to get a new functional token.

Tokens are needed if the user wants to compete in the leaderboard. Saving your score to the database requires a valid
token. Without a token your score cannot be saved into the database. Token is checked when the user is logged in and
wins a round of Hangman. The victory screen post-game shows was the score saved or not (depends on token validity).

[![Access token when logging in](https://i.gyazo.com/316e8a15398ce87b61a6f101b18b2513.gif)](https://gyazo.com/316e8a15398ce87b61a6f101b18b2513)

## Technology stack

- [Next.js / React](https://nextjs.org/) - framework
- [Sass](https://sass-lang.com/) - styling
- [Vercel](https://vercel.com/dashboard) - production deployment
- [PlanetScale](https://planetscale.com/) - database
- [Git](https://github.com/) - version control
- [Three.js](https://threejs.org/) - 3D computer graphic library

## Contributors

- Eric Keränen
