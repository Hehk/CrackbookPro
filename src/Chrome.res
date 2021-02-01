// Module for all the chrome bindings
type request
type sender
type sendResponse = unit => unit
type listener = (request, sender, sendResponse) => unit
module Runtime = {
  @bs.val external onMessage : listener => unit = "chrome.runtime.onMessage.addListener"
}

module Tabs = {
  type updateProperties = {
    "active": bool,
    "autoDiscardable": bool,
    "highlighted": bool,
    "muted": bool,
    "openerTabId": int,
    "pinned": bool,
    "url": string
  }
  type t = {
    active: bool,
    audible: option<bool>,
    autoDiscardable: option<bool>,
    url: option<string>
    // TODO fill this out https://developer.chrome.com/docs/extensions/reference/tabs/#type-Tab
  }
  type mutedInfo
  // https://developer.chrome.com/docs/extensions/reference/tabs/#method-update
  @bs.val external update : (int, updateProperties, t => unit) => unit = "chrome.tabs.update"
  type changeInfo = {
    audible: option<bool>,
    autoDiscardable: option<bool>,
    discarded: option<bool>,
    favIconUrl: option<string>,
    groupId: option<int>,
    mutedInfo: option<mutedInfo>,
    pinned: option<bool>,
    status: option<string>,
    title: option<string>,
    url: option<string>
  }
  type onUpdateListener = (int, changeInfo, t) => unit
  @bs.val external onUpdated : onUpdateListener => unit = "chrome.tabs.onUpdated.addListener"
}
