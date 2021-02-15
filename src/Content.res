open Filter

let cls = "chrome-blocker-12345"
let createOverlay = message => {
  let text = Document.createElement("div")
  Node.setStyle(
    text,
    `
    color: black;
    font-family: monospace;
    padding: 1em;
  `,
  )
  Node.setInnerText(text, message)

  let overlay = Document.createElement("div")
  Node.setClassName(overlay, cls)
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

let applyOverlay = message => {
  let body = Document.querySelector("body")
  switch body {
  | None => () // TODO this should retry, no body could mean an unloaded page
  | Some(body) =>
    let overlay = createOverlay(message)
    Node.appendChild(body, overlay)->ignore
  }
}

let removeOverlay = () => {
  switch Document.querySelector("." ++ cls) {
  | None => ()
  | Some(overlay) => Node.remove(overlay)
  }
}

let timeout = ref(None)
let url = ref(Location.href)
let filterStatus = ref(Filter.Off)

let applyFilter = filter => {
  switch filter {
  | Off => removeOverlay()
  | Delay(delay) =>
    applyOverlay("Delayed for " ++ Belt.Int.toString(delay))
    timeout := Some(Window.setTimeout(() => removeOverlay(), delay * 1000))
  | Block => applyOverlay("Blocked")
  }
}

let updateOverlay = filter => {
  switch filterStatus.contents {
  | Off
  | Block =>
    applyFilter(filter)
  | Delay(_) =>
    switch filter {
    | Delay(_)
    | Off => ()
    | Block => applyFilter(filter)
    }
  }
}

Chrome.Runtime.onMessage((message, _) => {
  switch message {
  | Filter(filter) =>
    updateOverlay(filter)
    filterStatus := filter
  | CheckFilter(_) => ()
  }
})

let notifyBackground = () => {
  Chrome.Runtime.sendMessage(CheckFilter(url.contents))
}

let pingForFilterUpdate = Window.setInterval(() => {
  switch filterStatus.contents {
  | Off
  | Block =>
    notifyBackground()
  | _ => ()
  }
}, 1000 * 60)

let watchUrlChange = Window.setInterval(() => {
  if url.contents !== Location.href {
    url := Location.href
    notifyBackground()
  }
}, 1000)

notifyBackground()

Window.onFocus(Window.window, notifyBackground)
Window.onBlur(Window.window, () => {
  switch timeout.contents {
  | None => ()
  | Some(t) => Window.clearTimeout(t)
  }
})
