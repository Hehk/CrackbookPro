let body = Document.querySelector("body")
let blocker = Document.createElement("div")
blocker->Node.setStyle(`
  height: 100vh;
  width: 100vw;
  background: black;
  position: fixed;
  top: 0;
  z-index: ${Js.Int.max->Js.Int.toString};
`)

Js.log("ADD LISTENER")
Chrome.Runtime.onMessage((message, _, _) => {
  if (message.shouldFilter) {
    switch body {
      | None => Js.log("Yo")
      | Some(body) => body->Node.appendChild(blocker)->Js.log
    }
  }
  true
})

Js.log3(blocker, body, "Hello World!")

