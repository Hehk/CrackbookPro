open Belt

type time = {
  hour: int,
  minute: int
}
let parseTime = s => Js.Date.fromString("01/01/01 " ++ s) 
let withinPeriod = (startTime, endTime, time) => {
  let h = Js.Date.getHours
  let m = Js.Date.getMinutes
  let isAfterStart = h(startTime) < h(time) || (h(startTime) === h(time) &&
  m(startTime) <= m(time))
  let isBeforeEnd = h(endTime) > h(time) || (h(endTime) === h(time) && m(endTime) >= m(time)) 

  isAfterStart && isBeforeEnd
}
type filter = {
  patterns: array<Js.Re.t>,
  days: array<int>,
  startTime: Js.Date.t,
  endTime: Js.Date.t,
}
type filters = list<filter>
let filters = [
  { patterns: [%re("/youtube\.com/g")], days: [1,2,3,4,5,6,7], startTime: parseTime("00:00"), endTime: parseTime("13:00") }
]

let shouldFilter = url => {
  open Array
  some(filters, filter => {
    let now = Js.Date.make()
    let today = now->Js.Date.getDay
    let isToday = filter.days
      -> map(Int.toFloat)
      // convert week to start on sunday to fit getDay
      -> map(d => d === 7.0 ? 0.0 : d)
      -> some(d => d === today)

    isToday && withinPeriod(filter.startTime, filter.endTime, now) && some(filter.patterns, pattern => {
      Js.Re.test_(pattern, url)
    })
  })
}

Chrome.Tabs.onUpdated((_, changeInfo, tab) => {
  switch (changeInfo.status, tab.url) {
    | (Some("complete"), Some(url)) => 
      Js.log2("filter", shouldFilter(url))
    | (_, _) => ()
  }
})
