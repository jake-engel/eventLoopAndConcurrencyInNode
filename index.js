// This app makes use of webworkers to deal with concurrency challenges

// Child mode here. It will act like a server and do nothing else.
const crypto = require('crypto');
const express = require('express');
const Worker = require('webworker-threads').Worker;
const app = express();

app.get('/', (req, res) => {
  // Note: You will not be able to access variables defined outside of the new Worker definition from within
  const worker = new Worker(function () {
    this.onmessage = function() {
      // Ideally will put super computationally advanced work here to be run on separate thread. And call result with postMessage
      let counter = 0;
      while (counter < 1e9) { counter++; }
      postMessage(counter);
    }
  });
  worker.onmessage = function(message) {
    console.log(message.data);
    res.send('' + message.data);
  };
  worker.postMessage();
});

app.get('/fast', (req, res) => {
  res.send('This was fast!');
})

app.listen(3000, () => console.log('Running on port 3000!'));

