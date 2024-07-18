const shimCodeUrl = "https://ga.jspm.io/npm:es-module-shims@1.6.2/dist/es-module-shims.wasm.js"
self.addEventListener('message', function(e) {
  if (e.data.type && e.data.type === 'init') {
    const {scriptURL, importMap, baseURL} = e.data;
    if (importMap?.imports) {
      for (const key in importMap.imports) {
        const val = importMap.imports[key];
        if (val[0] === '.') {
          const url = baseURL + '/' + val;
          importMap.imports[key] = url;
          console.log(`Update baseURL from ${val} to ${url}`);
        }
      }
    }
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
