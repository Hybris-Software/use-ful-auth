# useAuth

- [useAuth](#useauth)
  - [Introduction](#introduction)
  - [Installation](#installation)
  - [useAuth](#useauth-1)
    - [Parameters](#parameters)
    - [Returned parameters](#returned-parameters)
  - [AuthRoute](#authroute)
    - [Parameters](#parameters-1)
  - [Examples](#examples)
    - [Example 1: useAuth](#example-1-useauth)
    - [Example 2: useAuth](#example-2-useauth)
    - [Example 3: AuthRoute](#example-3-authroute)

## Introduction

Hook used to handle authentication in react applications. With useAuth you can easily handle the page's permissions and the user's authentication. This hook use `seQuery` hook to handle the api calls so it requires an Axios client.
`useQuery` library already provides the `generateApiClient` function which returns a client with a variable base url and an interceptor to send an authentication header, so if you use that library in your project you can use `generateApiClient` function to create the Axios client. You may also create an axios client by your own.
See `useQuery` [documentation](https://www.npmjs.com/package/@hybris-software/use-query) for more information about `generateApiClient`.

## Installation

Install the library with `npm install @hybris-software/use-auth`.

At the upper level of the application you should insert the `AuthProvider` with an api client and authUrl as in the example below:

```javascript
import { generateApiClient } from "@hybris-software/use-query";
import { AuthProvider } from "@hybris-software/use-auth";
...
const apiClient = generateApiClient({
  baseUrl = "https://my.api.com/api/v1",
  authorizationHeader = "Authorization",
  authorizationPrefix = "Bearer"
})


// Or build your own apiClient whatever you want

const authUrl = "https://my.api.com/api/v1/auth";
...
root.render(
  <React.StrictMode>
    <AuthProvider apiClient={apiClient} authUrl={authUrl}>
      <App />
    </AuthProvider>
  </React.StrictMode >
);
```

## useAuth

### Parameters

| Parameter          | Type                 | Default     | Description                                                                                                     |
| ------------------ | -------------------- | ----------- | --------------------------------------------------------------------------------------------------------------- |
| url                | string               |             | Endpoint url                                                                                                    |
| method             | string               | GET         | Request method (GET, POST...)                                                                                   |
| executeImmediately | boolean              | false       | Sets whether the call should be executed when the component is created or wait for the call to `executeQuery()` |
| onSuccess          | `(response) => void` | `() => { }` | Function executed after a successful query                                                                      |
| onUnauthorized     | `(response) => void` | `() => { }` | Function executed after an unsuccessful query if the response code is 401                                       |
| onError            | `(response) => void` | `() => { }` | Function executed after an unsuccessful query if the response code is not 401                                   |

### Returned parameters

| Parameter    | Type                  | Description                                                                                 |
| ------------ | --------------------- | ------------------------------------------------------------------------------------------- |
| isLogged     | boolean               | `true` if the user is logged, `false` otherwise                                             |
| isLoading    | boolean               | `true` while the query is being executed, `false` otherwise, even if it has not yet started |
| isError      | boolean               | `true` while the query finished unsuccessfully, `false` otherwise                           |
| isSuccess    | boolean               | `true` while the query finished successfully, `false` otherwise                             |
| data         | any                   | The query response if it finished successfully, `undefined` otherwise                       |
| error        | any                   | The query response if it finished unsuccessfully, `undefined` otherwise                     |
| executeQuery | `(data?: {}) => void` | Trigger the query with optional body as parameter                                           |

## AuthRoute

`<AuthRoute>` is a component that use useAuth hook to check if the user il logged or not. Setting the `forLoggedUser` parameter you can decide if the route is accessible only for logged users or only for not logged users. If the user is not logged and the route is accessible only for logged users, the user is redirected to the login page. If the user is logged and the route is accessible only for not logged users, the user is redirected to the home page. For example: the login page is accessible only for not logged users, so if the user is logged and try to access the login page, he is redirected to the home page. Insted if the user is not logged and try to access the home page, he is redirected to the login page.

### Parameters

| Parameter          | Type     | Default | Description                                                                                                                                                                                |
| ------------------ | -------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| children           | React    |         | The component to render                                                                                                                                                                    |
| forLoggedUser      | boolean  | false   | If `true` the route is accessible only for logged users, if `false` the route is accessible only for not logged users                                                                      |
| action             | function |         | Function executed after the user is logged or not logged. The function is executed only if the user is logged or not logged, not if the user is redirected to the login page or home page. |
| minimumLoadingTime | number   | 1000    | Minimum time in milliseconds that the loading page is shown. If the loading time is less than the minimum loading time, the loading page is shown for the minimum loading time.            |
| loader             | React    |         | Component to show while the user is logged or not logged. If not specified, the default loader is shown.                                                                                   |

## Examples

### Example 1: useAuth

If you set the parameter executeImmediately as `false` you can trigger the query with the `executeQuery` function. This is useful if you want to execute the query only when the user clicks on a button.

```javascript
import { useAuth } from "@hybris-software/use-auth"

const Login = () => {
  const { isLogged, isLoading, isError, isSuccess, data, error, executeQuery } =
    useAuth({
      url: "/user/",
      method: "GET",
      executeImmediately: false,
      onSuccess: (response) => {
        console.log("Login success")
      },
      onUnauthorized: (response) => {
        console.log("Login failed")
      },
      onError: (response) => {
        console.log("Login failed")
      },
    })

  const checkUserStatus = () => {
    executeQuery()
  }

  return (
    <div>
      <button onClick={checkUserStatus}>Login</button>
    </div>
  )
}
```

### Example 2: useAuth

If you set the parameter executeImmediately as `true` the query will be executed when the component is created. This is useful if you want to check if the user is logged when the page is loaded.

```javascript
import React, { useEffect } from "react"
import { useAuth } from "@hybris-software/use-auth"

const Login = () => {
  const { isLogged, isLoading, isError, isSuccess, data, error, executeQuery } =
    useAuth({
      url: "/user/",
      method: "GET",
      executeImmediately: true,
      onSuccess: (response) => {
        console.log("Login success")
      },
      onUnauthorized: (response) => {
        console.log("Login failed")
      },
      onError: (response) => {
        console.log("Login failed")
      },
    })

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : isLogged ? (
        <div>Logged</div>
      ) : (
        <div>Not logged</div>
      )}
    </div>
  )
}
```

### Example 3: AuthRoute

```javascript
import { AuthRoute } from "@hybris-software/use-auth"

const App = () => {
  return (
    <AuthRoute
      minimumLoadingTime={1000} // Minimum time in milliseconds that the loading page is shown
      forLoggedUser={false} // If true the route is accessible only for logged users
      loader={<CustomLoader />} // leave it undefined if you want to use the built in Loader
      action={() => {
        // Function executed when the user is redirected
        navigate("/")
      }}
    >
      // Your view
    </AuthRoute>
  )
}
```
