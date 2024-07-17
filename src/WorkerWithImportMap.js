class WorkerWithImportMap extends Worker {
  /**
   * @param {string | URL} scriptURL - The URL.
   * @param {WorkerOptions & {importMap?: 'inherit'}} [options] - The options.
   */
  constructor(scriptURL, options = {}) {
    if (options.importMap === 'inherit') {
      const url = new URL('./WorkerWithImportMap.shim.js', import.meta.url);
      super(url);
      const importMap = document.querySelector('script[type="importmap"]').textContent;
      this.postMessage({type: 'init', importMap, scriptURL});
    } else {
      super(scriptURL, options);
    }
  }
}
export {WorkerWithImportMap};
