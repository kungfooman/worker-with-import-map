import {EventHandler} from './EventHandler.js';
window.workersReady = {};
class WorkerFrame extends EventHandler {
  debug = false;
  iframe = document.createElement('iframe');
  callbackId = `cb${Math.floor(Math.random()*1000000000)}`;
  terminateId = `tm${Math.floor(Math.random()*1000000000)}`;
  constructor(script, options = {}) {
    super();
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
    const html = `
<html>
  <head>
      <script type="importmap">${JSON.stringify(options.map)}</script>
  </head>
  <body onload="parent.workersReady.${callbackId}(this.window)">
    <script>
      ${EventHandler};
      class Self extends EventHandler {
        postMessage(e) {
          parent.postMessage(e);
        }
      };
      const self = new Self();
      window.self = self;
      window.onmessage = (e) => {
        self.dispatchEvent(e);
      };
    </script>
    <script type="module" src="${script}"></script>
  </body>
</html>`;
    if (!this.debug) {
      iframe.style.display = 'none';
    }
    document.body.appendChild(iframe);
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(html);
    iframe.contentWindow.document.close();
    window.onmessage = (e) => {
      this.dispatchEvent(e);
    };
  }
  postMessage(data) {
    this.iframe.contentWindow.postMessage(data, '*');
  }
  terminate() {
    window.workersReady[this.terminateId]();
  }
}
export {WorkerFrame};
