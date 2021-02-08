open Belt

type filter = {
  patterns: array<Js.Re.t>,
  days: array<int>,
  startTime: Js.Date.t,
  endTime: Js.Date.t,
}
type filters = list<filter>

let parseTime = s => Js.Date.fromString("01/01/01 " ++ s) 
let withinPeriod = (startTime, endTime, time) => {
  let h = Js.Date.getHours
  let m = Js.Date.getMinutes
  let isAfterStart = h(startTime) < h(time) || (h(startTime) === h(time) &&
  m(startTime) <= m(time))
  let isBeforeEnd = h(endTime) > h(time) || (h(endTime) === h(time) && m(endTime) >= m(time)) 

  isAfterStart && isBeforeEnd
}

// TODO move this out to a config file
// TODO make this a param of shouldFilter
let filters = [
  { patterns: [%re("/youtube\.com/g")], days: [1,2,3,4,5,6,7], startTime: parseTime("00:00"), endTime: parseTime("13:00") }
]

let shouldFilter = (~url, ~time) => {
  open Array
  some(filters, filter => {
    let day = time->Js.Date.getDay
    let doDaysMatch = filter.days
      -> map(Int.toFloat)
      // convert week to start on sunday to fit getDay
      -> map(d => d === 7.0 ? 0.0 : d)
      -> some(d => d === day)

    doDaysMatch && withinPeriod(filter.startTime, filter.endTime, time) && some(filter.patterns, pattern => {
      Js.Re.test_(pattern, url)
    })
  })
}
