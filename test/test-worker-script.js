self.onmessage = (e) => {
  console.log("self.onmessage e", e);
  const {data} = e;
  self.postMessage({
    message: `Worker received: ${data}`
  });
};
self.addEventListener('message', (e) => {
  console.log("self.addEventListener('message', e)", e);
  const {data} = e;
  self.postMessage({
    message: `Worker received: ${data}`
  });
});
