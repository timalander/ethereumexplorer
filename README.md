# Ethereum Address Explorer
Using Node, Express, React, Webpack, async/await

### Prerequisites 
- Node Version Manager (nvm)
- Yarn
- MongoDB
### Installation
```sh
$ nvm install
$ yarn install
```

### Commands
```js
$ yarn run build // creates bundle.js client code to be served by the server
$ yarn run dev // starts the local node server, running at localhost:8080
```

### API
| Route | Response | Request |
| ------ | ------ | ----|
| GET `/api/addresses` | `{ addresses: [Address] }` | n/a |
| POST `/api/addresses` | `201` created, `422` unprocessable | `{ address: $addressHash }` |
| GET `/api/addresses/:addressHash` | `{ transactions: [Transaction] }` | n/a |


### Client Routes

`/` => Index page listing all address info

`/address/:address` => Address page listing address specific info

`/add` => Form for submitting new Ethereum addresses to the system
