self.onmessage = (e) => {
  // console.log("self.onmessage e", e);
  const {data} = e;
  self.postMessage({
    message: `self.onmessage> Received: ${data}`
  });
};
self.addEventListener('message', (e) => {
  // console.log("self.addEventListener('message', e)", e);
  const {data} = e;
  self.postMessage({
    message: `self.addEventListener('message', e)> Received: ${data}`
  });
});
setInterval(() => {
  self.postMessage({
    foo: `test-worker-script.js ${Date.now()}`,
  });
}, 2000);
