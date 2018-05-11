const https = require('https');

const start = Date.now();

// The operating system itself ultimately makes the http request (not node). Through the OS's async features
// Thus, there's no blocking of the code inside our thread pool/event loop (our application)
// 
const doRequest = () => {
  https.request('https://www.google.com', res => {
    res.on('data', () => {});
    res.on('end', () => {
      console.log(Date.now() - start);
    });
  }).end();
}

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();