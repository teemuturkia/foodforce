foodforce
================

### Prerequisites
- Node
- Bower
- MongoDB

### Database
You need to have mongod instance running. Currently server tries to find connect url from 'MONGOLAB_URI' environment variable and then 'MONGOHQ_URL'. If neither is found, then localhost is used.

### Installation
```
npm install
bower install
```

### Run unit tests
```
npm test
```

#### Running server

```
npm start
```
Go to http://localhost:3000 with your browser.
