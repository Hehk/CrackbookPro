let cls = "chrome-blocker-12345"
let createOverlay = () => {
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
  overlay
}

let applyOverlay = () => {
  let body = Document.querySelector("body")
  switch body {
  | None => () // TODO this should retry, no body could mean an unloaded page
  | Some(body) =>   
    let overlay = createOverlay()
    Node.appendChild(body, overlay)->ignore
    Js.log("Overlay applied")
  }
}

let removeOverlay = () => {
  switch Document.querySelector("." ++ cls) {
    | None => ()
    | Some(overlay) => Node.remove(overlay)
  }
}

let updateOverlay = () => {
  Js.log("Update Overlay")
  Chrome.Runtime.sendMessage(CheckFilter(Location.href), message => {
    switch message {
    | FilterStatus(shouldFilter) => shouldFilter ? applyOverlay() : removeOverlay()
    | CheckFilter(_) => ()
    }
  })
}

updateOverlay()
