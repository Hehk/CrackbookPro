Chrome.Tabs.onUpdated((_, _, tab) => {
  switch (tab.status, tab.url, tab.id) {
  | (Some("loading"), Some(url), Some(id))
  | (Some("complete"), Some(url), Some(id)) =>
    let filter = Filter.shouldFilter(~url, ~time=Js.Date.make())
    Chrome.Tabs.sendMessage(id, {shouldFilter: filter}, Js.log)
  | (_, _, _) => ()
  }
})
