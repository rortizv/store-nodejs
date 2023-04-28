const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = 3000;

app.use(express.json());

const whitelist = ['http://localhost:3000', 'https://www.thisismyapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('You are NOT allowed'));
    }
  }
}

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
