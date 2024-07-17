import {add} from 'calculator';
self.onmessage = (e) => {
  console.log("self.onmessage e", e);
  const {data} = e;
  self.postMessage({
    message: `self.onmessage> Received: ${data} and add(1, 2) is ${add(1, 2)}`
  });
};
self.addEventListener('message', (e) => {
  console.log("self.addEventListener('message', e)", e);
  const {data} = e;
  self.postMessage({
    message: `self.addEventListener('message', e)> Received: ${data} and add(1, 2) is ${add(1, 2)}`
  });
});
setInterval(() => {
  self.postMessage({
    foo: `test-workerframe-script.js ${Date.now()}`,
  });
}, 2000);
