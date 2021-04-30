open Filter

let cls = "chrome-blocker-12345"
let hasOverlay = ref(false)
let createOverlay = message => {
  let text = Document.createElement("div")
  Node.setStyle(
    text,
    `
    color: black;
    font-family: monospace;
    padding: 1rem;
    grid-column: 2;
    grid-row: 2;
    text-align: center;
  `,
  )
  Node.setInnerText(text, message)

  let overlay = Document.createElement("div")
  Node.setClassName(overlay, cls)
  Node.setStyle(
    overlay,
    `
    font-size: 18px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);
    grid-gap: 1rem;
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

let removeOverlay = () => {
  Document.querySelectorAll("." ++ cls)->Array.map(Node.remove)->ignore
  hasOverlay := false
}

let applyOverlay = message => {
  if (!hasOverlay.contents) {
    let body = Document.querySelector("body")
    switch body {
    | None => () // TODO this should retry, no body could mean an unloaded page
    | Some(body) =>
      Document.querySelectorAll("video")->Array.forEach(Node.pause)

      let overlay = createOverlay(message)
      Node.appendChild(body, overlay)->ignore
      hasOverlay := true
    }
  }
}

let render = state => {
  open App
  switch state.filter {
  | Delay(time) => applyOverlay("Delayed: " ++ Int.toString(time))
  | Block => applyOverlay("BLOCKED")
  | Off => removeOverlay()
  }
}

module Foreground = App.CreateForeground({
  let onMessage = f => {
    Chrome.Runtime.onMessage((message, _sender) => f(message))
  }

  let sendMessage = Chrome.Runtime.sendMessage
  let onStateChange = render
})

let watchUrlChange = Window.setInterval(() => {
  if Foreground.state.contents.url !== Location.href {
    Foreground.reduce(ChangeUrl(Location.href))
  }
}, 1000)

Foreground.reduce(Init)
Window.onFocus(Window.window, () => Foreground.reduce(Ping))
Window.onBlur(Window.window, () => Foreground.reduce(Cleanup))
