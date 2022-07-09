import "./style.css";
import { Compartment } from "@codemirror/state";
import { EditorView, basicSetup } from "codemirror";
function onChange() {
  const doc = editor.state.doc.toString();
  localStorage.setItem("code", doc);
  document.getElementsByName("preview")[0].srcdoc = doc;
}
var timeout = null;
function debounceChanges() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(function callOnChange() {
    onChange();
  }, 300);
}
const language = new Compartment();
const editor = new EditorView({
  doc:
    localStorage.getItem("code") ||
    "<!DOCTYPE html>\n" +
      "<p> Welcome to the real-time HTML editor. Type HTML in " +
      "the textarea above, and it will appear in a frame below.",
  extensions: [
    basicSetup,
    language.of([]),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) debounceChanges();
    }),
  ],
  parent: document.getElementById("editor"),
});
(async () => {
  const { html } = await import("@codemirror/lang-html");
  editor.dispatch({ effects: language.reconfigure(html()) });
})();
onChange();
