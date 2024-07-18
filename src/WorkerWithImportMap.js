import {getImportMap} from "./getImportMap.js";
class WorkerWithImportMap extends Worker {
  /**
   * @param {string | URL} scriptURL - The URL.
   * @param {WorkerOptions & {importMap?: 'inherit', debug: boolean}} [options] - The options.
   */
  constructor(scriptURL, options = {}) {
    if (options.importMap === 'inherit') {
      const shimURL = new URL('./WorkerWithImportMap.shim.js', import.meta.url) + "";
      super(shimURL);
      const importMap = getImportMap();
      const baseURL = document.baseURI.split('/').slice(0, -1).join('/');
      if (options.debug) {
        console.log("WorkerWithImportMap debug information", {importMap, shimURL, baseURL});
      }
      this.postMessage({type: 'init', importMap, scriptURL, baseURL});
    } else {
      super(scriptURL, options);
    }
  }
}
export {WorkerWithImportMap};
