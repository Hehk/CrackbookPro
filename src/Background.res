Chrome.Runtime.onMessage((message, _, sendResponse) => {
  switch message {
  | CheckFilter(url) => Filter.shouldFilter(~url, ~time=Js.Date.make())->FilterStatus->sendResponse
  | _ => ()
  }
})
