# Install

```sh
npm i worker-with-import-map
```

# Specification

See https://github.com/WICG/import-maps/issues/2

# Two available polyfill classes

1) **WorkerWithImportMapViaInlineFrame**: Enabling [importmaps](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/importmap) in [web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API) via [iframes](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe) as workers.

2) **WorkerWithImportMapViaBedfordsShim**: Same polyfill idea, but using @guybedford's ESM shim inside a normal `Worker`.

# Usage

**test.html**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>
    <script type="importmap">{"imports": {
        "worker-with-import-map": "./node_modules/worker-with-import-map/src/index.js"
    }}</script>
    <script type="module" src="test.js"></script>
  </head>
</html>
```

**test.js**

```js
import {
  WorkerWithImportMapViaBedfordsShim,
  WorkerWithImportMapViaInlineFrame,
} from 'worker-with-import-map';
// You can use either one! But WorkerWithImportMapViaInlineFrame has caching issues.
const worker = new WorkerWithImportMapViaBedfordsShim('./worker-script.js', {
  importMap: 'inherit',
});
worker.postMessage({hello: 'ping'});
```

**worker-script.js**

```js
// Here you can import anything you want now with import map support!
import {funny} from 'one-of-your-fancy-libs';
self.onmessage = (e) => {
  const haiToo = funny('pong');
  self.postMessage({haiToo});
}
```

This works in client and server, buildless (aka no build tools like `rollup` or `Webpack` required).

Please just clone this repo and test:

 - http://127.0.0.1/worker-with-import-map/test/test.html

That will give you a better picture with non-trivial code and showing off how you can re-use your importmap too.

# Development

Just test it and report feedback, if you feel like it.

# Have?

Fun!
