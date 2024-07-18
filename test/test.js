// WorkerFrame...
import {WorkerWithImportMapViaInlineFrame, WorkerWithImportMapViaBedfordsShim} from 'esm-worker';
const url = new URL('./test-workerframe-script.js', import.meta.url);
const workerFrame = new WorkerWithImportMapViaBedfordsShim(url, {type: 'module', importMap: 'inherit'});
function stringify(_) {
  // return JSON.stringify(_, null, 2);
  return JSON.stringify(_);
}
workerFrame.onmessage = (e) => {
  // console.log("[workerFrame.onmessage] workerFrame got e.data", e.data);
  const msg = stringify(e.data);
  const textarea = textareas[0];
  textarea.value += `${msg}\n`;
  textarea.scrollTop = textarea.scrollHeight;
};
workerFrame.addEventListener('message', (e) => {
  // console.log("[workerFrame.addEventListener('message', cb)] workerFrame got e.data", e.data);
  const msg = stringify(e.data);
  const textarea = textareas[1];
  textarea.value += `${msg}\n`;
  textarea.scrollTop = textarea.scrollHeight;
});
// Worker...
const worker = new Worker('./test-worker-script.js', {type: 'module'});
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
const texts = ['WorkerFrame onmessage', 'WorkerFrame addEventListener', 'Worker onmessage', 'Worker addEventListener'];
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
const data = {workerFrame, worker, divs, textareas, grid, WorkerWithImportMapViaInlineFrame, WorkerWithImportMapViaBedfordsShim};
console.log(data);
Object.assign(window, data);
