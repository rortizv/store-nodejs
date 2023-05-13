const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

require('./utils/auth');

const whitelist = ['http://localhost:8080', 'https://www.thisismyapp.com'];
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('no permitido'));
    }
  }
}

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Hello NodeJS');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);


app.listen(port, () => {
  console.log(`App listening on port ${port}!`);
});
