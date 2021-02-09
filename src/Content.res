let body = Document.querySelector("body")
let text = Document.createElement("div")
Node.setStyle(
  text,
  `
  color: black;
  font-family: monospace;
  padding: 1em;
`,
)
Node.setInnerText(text, "Blocked")

let overlay = Document.createElement("div")
Node.setStyle(
  overlay,
  `
  height: 100vh;
  width: 100vw;
  background: white;
  position: fixed;
  top: 0;
  z-index: ${Js.Int.max->Js.Int.toString};
`,
)
overlay->Node.appendChild(text)->ignore

Chrome.Runtime.onMessage((message, _, _) => {
  if message.shouldFilter {
    switch body {
    | None => Js.log("Yo")
    | Some(body) => body->Node.appendChild(overlay)->Js.log
    }
  }
  true
})
