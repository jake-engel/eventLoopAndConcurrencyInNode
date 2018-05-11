const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  // Cause index.js to be executed *again* but in child/slave mode

  // IN GENERAL: MATCH NUMBER OF CLUSTER.FORKS WITH NUMBER OF PHYSICAL/LOGICAL CORES IN YOUR COMPUTER
  cluster.fork();
  cluster.fork();
} else {
  // Child mode here. It will act like a server and do nothing else.
  const crypto = require('crypto');
  const express = require('express');
  const app = express();

  app.get('/', (req, res) => {
    crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
      res.send('Hi there');
    });
  });

  app.get('/fast', (req, res) => {
    res.send('This was fast!');
  })

  app.listen(3000, () => console.log('Running on port 3000!'));
}