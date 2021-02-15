open Chrome

let sendFilter = (filter, sender) => {
  switch sender.tab {
  | Some(tab) =>
    switch tab.id {
    | Some(id) =>
      let message = Filter(filter)
      Tabs.sendMessage(id, message)
    | None => ()
    }
  | None => ()
  }
}

Runtime.onMessage((message, sender) => {
  switch message {
  | CheckFilter(url) => 
    let filter = Filter.getFilter(~url, ~time=Js.Date.make())
    sendFilter(filter, sender)
  | _ => ()
  }
})
