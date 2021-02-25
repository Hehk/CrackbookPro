%%raw(`require('crx-hotreload')`)
module Background = App.CreateBackground({
  type id = int
  let sendMessage = (id, message) => {
    Chrome.Tabs.sendMessage(id, message)
  }
  let onMessage = f => {
    Chrome.Runtime.onMessage((message, sender) => {
      switch sender.tab {
      | Some(tab) => switch tab.id {
          | Some(id) => {
            f(id, message)
          }
          | None => ()
        }
      |None => ()
      }
    })
  }
})
