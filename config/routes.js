require('dotenv').config();
const axios = require('axios');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const db = require('../database/dbConfig');

const { authenticate } = require('../auth/authenticate');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};


const genToken = user => {
  const payload = {
      subject: user.id,
      username: user.username
  }

  const options = {
      expiresIn: '6h'
  }

  const secret = process.env.JWT_SECRET;

  return jwt.sign(payload, secret, options);
}


function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 7);

  user.password = hash;

  db.insert(user)
    .into('users')
    .then(id => {
      res.status(201).json(id[0]);
    })
    .catch(err => {
      res.status(500).json({ err });
    })
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  db('users')
    .where({ username })
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {
        const token = genToken(user);

        res.status(200).json({
          message: `Welcome ${username}`,
          token
        })
      } else {
        res.status(400).json({ message: 'Invalid Credentials' });
      }
    })
    .catch(err => {
      res.status(500).json({ 
          message: 'Could Not Log In',
          err
      })
    });
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
