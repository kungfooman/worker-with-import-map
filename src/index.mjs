import {isBrowser, isJsDom} from 'browser-or-node';
import * as mod from 'module';
let internalRequire = null;
const ensureRequire = () => (!internalRequire) && (
  internalRequire = mod.createRequire(import.meta.url)
);
let ThisWorker = null;
if (isBrowser || isJsDom) {
  window.workersReady = {};
  class WorkerFrame {
    debug = false;
    iframe = document.createElement('iframe');
    callbackId = `cb${Math.floor(Math.random()*1000000000)}`;
    terminateId = `tm${Math.floor(Math.random()*1000000000)}`;
    constructor(script, options = {}) {
      const {iframe, callbackId, terminateId} = this;
      if (options.inheritMap) {
        const mapEl = document.querySelector('script[type="importmap"]');
        options.map = JSON.parse(mapEl.innerHTML);
      }
      if (!options.map) {
        return new window.Worker(script, options);
      }
      window.workersReady[terminateId] = function(window) {
        iframe.remove();
      };
      this.ready = new Promise((resolve, reject) => {
        window.workersReady[callbackId] = function(window) {
          resolve();
        };
      });
      const html = `<html><head>
          <script type="importmap">${JSON.stringify(options.map)}</script>
      </head><body onload="parent.workersReady.${callbackId}(this.window)"><script>
          window.self = {};
          window.self.postMessage = (e) => {
          parent.postMessage(e);
          };
          window.onmessage = (e) => {
          window.self?.onmessage(e);
          };
      </script><script type="module" src="${script}"></script></body></html>`;
      if (!this.debug) {
        iframe.style.display = 'none';
      }
      document.body.appendChild(iframe);
      iframe.contentWindow.document.open();
      iframe.contentWindow.document.write(html);
      iframe.contentWindow.document.close();
      window.onmessage = (e) => {
        this?.onmessage(e);
      };
    }
    postMessage(data) {
      this.iframe.contentWindow.postMessage(data, '*');
    }
    terminate() {
      window.workersReady[this.terminateId]();
    }
  }
  ThisWorker = WorkerFrame;
} else {
  ensureRequire();
  const NodeWorker = internalRequire('web-worker');
  function Worker(incomingPath, options = {}) {
    const filePath = incomingPath[0] === '.'
      ? new URL(incomingPath, options.root || import.meta.url).pathname
      : incomingPath;
    return new NodeWorker(filePath, options);
  };
  ThisWorker = Worker;
}
export const Worker = ThisWorker;
