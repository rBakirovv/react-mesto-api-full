require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');
const user = require('./routes/user');
const card = require('./routes/card');
const { login, logout, createUser } = require('./controllers/user');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');
const auth = require('./middlewares/auth');
const { validateUser } = require('./middlewares/validations');
const ErrorNotFound = require('./errors/ErrorNotFound');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);

app.use(cors({
  origin: [
    'https://api.bakirov.students.nomoredomains.work',
    'https://bakirov.students.nomoredomains.work',
    'http://bakirov.students.nomoredomains.work',
    'http://localhost:3000',
    'http://localhost:3001',
  ],
  credentials: true,
}));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateUser, createUser);
app.post('/signin', validateUser, login);
app.delete('/signout', logout);

app.use(auth);

app.use('/', user);
app.use('/', card);

app.use(errorLogger);

app.use(errors());

app.use((req, res, next) => {
  next(new ErrorNotFound('Запрашиваемый ресурс не найден'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
