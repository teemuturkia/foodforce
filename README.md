lunch-force
================

### Prerequisites
- Node
- Bower
- MongoDB

### Database
You need to have mongod instance running. If necessary, edit config/index.js to have correct connect url.

### Installation
```
npm install
bower install
```

### Add restaurants to db
```
node util/ruokapaikka.fi.parser.js
```
You can run that command manually or setup to run it frequently by adding it to crontabs.

### Run unit tests
```
npm test
```

#### Running server

```
npm start
```
Go to http://localhost:3000 with your browser.
