# Install

```sh
npm i @kungfooman/esm-worker
```

# Why

It seems the powers that be [have no plans to support](https://github.com/WICG/import-maps/issues/2) [importmaps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) in [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API), so this is a shim to use [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) as workers until some large company prioritizes paying developers to implement features that should already be complete.

The price for this early compatibility will mean a decrease in performance as the iframe competes with the main thread for CPU resources, in exchange for being able to use modern standards which can eventually be mainlined into worker esm support with full performance, when our browser overlords deem it so. 

It will still prevent hundreds of megabytes of loaded resources that a traditional build processes will cause as well as have better caching characteristics over time while still remaining build compatible.

# Usage

**test.js**

```js
import {WorkerFrame} from './node_modules/@kungfooman/esm-worker/src/WorkerFrame.js';
const worker = new WorkerFrame('./worker-script.js', {
    // ESM only works in module mode
    type: 'module',
    // So relative URLs are symmetric
    root: import.meta.url,
    // Grab the importmap from the page we execute on
    inheritMap: true,
    // Or map: <importmap>
});
worker.postMessage({hello: 'ping'});
// Sometime later:
worker.terminate();
```

**worker-script.js**

```js
self.onmessage = (e) => {
  self.postMessage({haiToo: 'pong'});
}
```

This works in client and server, buildless (aka no build tools like `rollup` or `Webpack` requiered).

Please just clone this repo and test:

 - http://127.0.0.1/esm-worker/test/test.html

That will give you a better picture with non-trivial code and showing off how you can re-use your importmap too.

# Development

Just test it and report feedback, if you feel like it.

# Have?

Fun!
