const shimCodeUrl = "https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.wasm.js"
self.addEventListener('message', function(e) {
  if (e.data.type && e.data.type === 'init') {
    const scriptURL = e.data.scriptURL;
    const importMap = JSON.parse(e.data.importMap);
    importScripts(shimCodeUrl);
    importShim.addImportMap(importMap);
    importShim(scriptURL)
      .then(() => {
        console.log(`${scriptURL} worker has been loaded`);
      })
      .catch(e => {
        setTimeout(() => {
          throw e;
        })
      });
  }
});
