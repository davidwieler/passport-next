# NextJS Session Based Authentication with MongoDB and PassportJS

This repo is an example on how you can get PassportJS working with NextJS without the need for a custom server, and using only API routes.

It uses:

-   MongoDB
-   MongooseJS for Mongo connections
-   PassportJS
    -   Github Auth setup (passport-github2)
    -   Email/Username Auth setup. Passwords use the `bcryptjs` library (passport-local)
    -   Uses Cookies. (I might add some extra functionality later to support JWT)
-   Logout and Register routes already set up
-   Next Connect for easier middleware
-   `next-css`and `next-sass` has been set up in the config file.
-   `dotenv` package for using .env files
-   I've added some helper aliases to `next.config.js` so we don't have to use relative file paths on imports. (see examples for an explanation)

## How to use

-   I'm using yarn, but npm will work too

1. Clone this repo
2. Run `yarn` or `npm install`
3. Follow the setup steps below
4. Run `yarn dev` or `npm run dev` to fire up the dev server.
    - If all is working, you should see a `Connected to Mongo DB Server` in the console after running `yarn dev`
5. Hack away.

## Setup

There is a little bit of setup to get this example repo going.

### Step 1 - Github OAuth App creation

You'll need to set up a Github OAuth application for these two pieces of information:

-   client_id
-   client_secret

_! HOLD ON TO THESE UNTIL STEP 3 !_

The callback URL to give Github: `http://localhost:3000/api/auth/github/callback`

The callback URL is just another API route. The callback URL's have been set up in:
`pages/api/auth/[provider]/[provider].js`. This should make adding additional PassportJS strategies easier.

For example, for twitter you could use:

`http://localhost:3000/api/auth/twitter/callback`

or

`http://localhost:3000/api/auth/twitter/authenticate`

Both would work without needing to change the API route structure.

### Step 2 - Get a MongoDB database

You can either use a localhost, or self-hosted option, or you can get a free hosted option at Mongo Atlas. Which ever option you choose, you'll just need the connection string. No need to make any collections manually. User and Session collections will be created as needed.

It should look something like this:

`mongodb+srv://USERNAME:PASSWORD@cloutfeedtest-fr1rq.mongodb.net/DATABASE_NAME?retryWrites=true&w=majority`

_! HOLD ON TO THIS UNTIL STEP 3 !_

### Step 3

Copy `.env.template` to `.env`, which contains:

```
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

MONGODB_CONNECTION=

COOKIE_NAME=cookie_name_here
```

Enter the Github OAuth details, your MongoDB connection string, and change the coookie name to whatever you want it to be.

## Some examples available at:

`pages/_app_.js`

The \_app.js has been configured to check for logged in status on any entry load. When the app loads, it'll check for the users logged in status, and update the home page depending on that. Additionally, it'll run the components `getInitialProps` and `AppContainer.getInitialProps` concurrently, passing both responses into the page's props.

---

`pages/private.js`

This file is an example of using a custom HOC `withAuth` that will automatically check for logged in status, and redirect to the login page if the user is not logged in.

---

`pages/protected-example/index.js`

This file is an example of using `getInitialProps` with an authenticated API route.

---

### Custom config aliasing

I've added some helper aliases to `next.config.js` so we don't have to use relative file paths on imports.

These paths and resolvers can be found in `lib/config/paths` and `lib/config/resolvers`.

These have been set up already:

```
	lib: resolveApp('lib'),
	pages: resolveApp('pages'),
	styles: resolveApp('lib/styles'),
	customHooks: resolveApp('lib/custom-hooks'),
	middleware: resolveApp('lib/middleware'),
	mongodbModels: resolveApp('lib/mongodb-models'),
	components: resolveApp('components')
```

For example, we can import the mongoose user model to find a user by email anywhere in the app like this:

```
import { findUserByEmail } from 'mongodbModels/users';
!- instead of -!
import { findUserByEmail } from '../../../lib/mongodb-models/users';
```

Components can be imported from the ./components folder like this dynamic import example:

```
const Header = dynamic(() => import('components/header'));
const Footer = dynamic(() => import('components/footer'));
```

No more relative paths yay!

# License

Copyright (c) 2020 David Wieler

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
OR OTHER DEALINGS IN THE SOFTWARE.
