open Chrome

let sendFilterStatus = (filterStatus, sender) => {
  switch sender.tab {
  | Some(tab) =>
    switch tab.id {
    | Some(id) =>
      let message = FilterStatus(filterStatus)
      Tabs.sendMessage(id, message)
    | None => ()
    }
  | None => ()
  }
}

Runtime.onMessage((message, sender) => {
  switch message {
  | CheckFilter(url) => Filter.shouldFilter(~url, ~time=Js.Date.make())->sendFilterStatus(sender)
  | _ => ()
  }
})
