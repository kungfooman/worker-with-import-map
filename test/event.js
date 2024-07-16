import {EventHandler} from "../src/EventHandler.js";
const eventHandler = new EventHandler();
window.eventHandler = eventHandler;
/** @param {PointerEvent} e */
const click = (e) => console.log("Click!", e);
const tests = [
  () => eventHandler.onclick = click,
  () => eventHandler.onclick = null,
  () => eventHandler.addEventListener('click', click),
  () => eventHandler.removeEventListener('click', click),
  () => eventHandler.dispatchEvent(new PointerEvent("click")),
  // To see if our implementation acts like the browser one.
  () => document.onclick = click,
  () => document.onclick = null,
  () => document.addEventListener('click', click),
  () => document.removeEventListener('click', click),
  // Or just click anywhere:
  () => document.dispatchEvent(new PointerEvent("click")),
];
const buttons = tests.map(test => {
  const button = document.createElement('button');
  button.innerText = test;
  button.onclick = test;
  return button;
});
document.body.append(...buttons);
