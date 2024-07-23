import {Worker} from 'worker-with-import-map';
const WorkerOriginal = globalThis.Worker;
const workerShim = new Worker('./test-worker-script-shim.js', {
  type: 'module',
  debug: true,
});
/**
 * @param {*} _ - The input.
 * @returns {string} Stringified output.
 */
function stringify(_) {
  // return JSON.stringify(_, null, 2);
  return JSON.stringify(_);
}
workerShim.onmessage = (e) => {
  // console.log("[workerShim.onmessage] workerShim got e.data", e.data);
  const msg = stringify(e.data);
  const textarea = textareas[0];
  textarea.value += `${msg}\n`;
  textarea.scrollTop = textarea.scrollHeight;
};
workerShim.addEventListener('message', (e) => {
  // console.log("[workerShim.addEventListener('message', cb)] workerShim got e.data", e.data);
  const msg = stringify(e.data);
  const textarea = textareas[1];
  textarea.value += `${msg}\n`;
  textarea.scrollTop = textarea.scrollHeight;
});
// Worker...
const worker = new WorkerOriginal('./test-worker-script.js', {type: 'module'});
worker.onmessage = (e) => {
  // console.log("[worker.onmessage] worker got e.data", e.data);
  const msg = stringify(e.data);
  const textarea = textareas[2];
  textarea.value += `${msg}\n`;
  textarea.scrollTop = textarea.scrollHeight;
};
worker.addEventListener('message', (e) => {
  // console.log("[worker.addEventListener('message', cb)] worker got e.data", e.data);
  const msg = stringify(e.data);
  const textarea = textareas[3];
  textarea.value += `${msg}\n`;
  textarea.scrollTop = textarea.scrollHeight;
});
const texts = ['WorkerWithImportMap onmessage', 'WorkerWithImportMap addEventListener', 'Worker onmessage', 'Worker addEventListener'];
const grid = document.createElement('div');
grid.style.display = 'grid';
grid.style.gridTemplateColumns = '1fr 1fr';
/** @type {HTMLTextAreaElement[]} */
const textareas = [];
const divs = texts.map(text => {
  const div = document.createElement('div');
  const headline = document.createElement('h3');
  const textarea = document.createElement('textarea');
  textareas.push(textarea);
  headline.append(text);
  textarea.placeholder = text;
  textarea.style.padding = '10px';
  div.append(headline, textarea);
  return div;
});
grid.append(...divs);
document.body.prepend(grid);
const data = {workerShim, worker, divs, textareas, grid};
console.log(data);
Object.assign(window, data);
