// TO RUN WITH PM2, ON COMMAND LINE RUN 'pm2 start index.js -i 0'
// -i 0 tells PM2 to make as many threads as there are logical cores

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