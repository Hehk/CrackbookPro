type backgroundMessage = Filter(Filter.mode)

type foregroundMessage = CheckFilter(string)

type delayTimeout =
  | None
  | Expired
  | Timeout(Window.timeout)

type state = {
  pingInterval: option<Window.interval>,
  delayTimeout: delayTimeout,
  filter: Filter.mode,
  url: string,
}

module type ForegroundProps = {
  let onStateChange: state => unit
  let sendMessage: foregroundMessage => unit
  let onMessage: (backgroundMessage => unit) => unit
}

module CreateForeground = (Props: ForegroundProps) => {
  type event =
    | ChangeUrl(string)
    | ChangeFilter(Filter.mode)
    | DelayExpired
    | Init
    | Cleanup
    | Ping

  let state = ref({
    pingInterval: None,
    delayTimeout: None,
    filter: Off,
    url: "",
  })

  let rec reduce = event => {
    let oldState = state.contents
    %debugger
    let newState = switch event {
    | Cleanup => // TODO fix cleanup
      oldState
    | Init =>
      Props.sendMessage(CheckFilter(Location.href))
      let pingInterval = Window.setInterval(() => {
        reduce(Ping)
      }, 1000 * 10)->Some

      {
        filter: Off,
        pingInterval: pingInterval,
        delayTimeout: switch oldState.delayTimeout {
        | Expired => Expired
        | _ => None
        },
        url: Location.href,
      }
    | Ping =>
      Props.sendMessage(CheckFilter(oldState.url))
      oldState
    | ChangeUrl(newUrl) =>
      Props.sendMessage(CheckFilter(newUrl))
      {...oldState, url: newUrl}
    | ChangeFilter(filter) =>
      Js.log4("FILTER", filter, "DELAY_TIMEOUT", oldState.delayTimeout)
      // If there is an expired delay, don't create another one
      let filter = switch (oldState.delayTimeout, filter) {
      | (Expired, Delay(_)) => Filter.Off
      | (_, filter) => filter
      }
      // if the filter will be delay and there is no timeout, create one
      let delayTimeout = switch (oldState.delayTimeout, filter) {
      | (None, Delay(time)) => Timeout(Window.setTimeout(() => {
            reduce(DelayExpired)
          }, time * 1000))
      | (current, _) => current
      }
      {...oldState, delayTimeout: delayTimeout, filter: filter}
    | DelayExpired =>
      %debugger
      {...oldState, delayTimeout: Expired, filter: Off}
    }

    Props.onStateChange(newState)
    state := newState
  }

  Props.onMessage(message => {
    switch message {
    | Filter(mode) => reduce(ChangeFilter(mode))
    }
  })
}

module type BackgroundProps = {
  type id
  // TODO make sure this cb type works, I am worried something might go wrong with tuple
  let onMessage: ((id, foregroundMessage) => unit) => unit
  let sendMessage: (id, backgroundMessage) => unit
}
module CreateBackground = (Props: BackgroundProps) => {
  Props.onMessage((id, message) => {
    switch message {
    | CheckFilter(url) =>
      let filter = Filter.getFilter(~url, ~time=Js.Date.make())
      Props.sendMessage(id, Filter(filter))
    }
  })
}
