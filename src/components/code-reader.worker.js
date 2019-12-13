import hljs from "highlight.js";

self.addEventListener("message", event => {
  const result = hljs.highlightAuto(event.data);
  self.postMessage(result.value);
});
