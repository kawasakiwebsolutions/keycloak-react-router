# Keycloak React Router

Boilerplate to protect your ReactJS application using keycloak (using routers).

## Necessary configurations

This project needs a keycloak instance (single or cluster-mode) with a PostgreSQL/MySQL database to store the users. Make sure you run it locally with the docker-compose file in this repo (```docker-compose up -d```) or with a development version. Either way, you'll have to change the configuration inside the `src/keycloak.ts` file (adapt the URL, realm and clientId to your configuration):

```ts
import Keycloak from 'keycloak-js';

// Setup Keycloak instance as needed
// Pass initialization options as required or leave blank to load from 'keycloak.json'
const keycloak = Keycloak({
  url: 'http://localhost:8080/auth',
  realm: 'demo-realm',
  clientId: 'react-app'
});

export default keycloak;
```

Make sure you configure this application URL (e.g. http://localhost:3000/*) into your keycloak client config in the following fields: `Root URL`, `Valid Redirect URIs`, `Admin URL` and `Web Origins`.

## Flow

The usage flow for this app works as following:

1. Click in the login button, which will trigger the `login()` method from the `@react-keycloak/web` library and open default keycloak login form:

```ts
const { keycloak } = useKeycloak()

const login = useCallback(() => {
    keycloak?.login()
}, [keycloak])

if (keycloak?.authenticated)
    return <Redirect to={currentLocationState?.from as string} />

return (
    <div>
        <button type="button" onClick={login}>
            Login
        </button>
    </div>
)
```

2. Inside keycloak page, you may login, create a new user or reset the password. For now, only the login will trigger a redirect webhook back to your application.

3. After you login, you can logout clicking in the button or reveal the token and the decoded JWT for demonstration purposes.

Same flow would work for other SPAs – a VueJS example can be found [here](https://github.com/dsb-norge/vue-keycloak-js/tree/master/examples).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
