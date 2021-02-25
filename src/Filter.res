type mode =
  | Block
  | Delay(int)
  | Off

type filter = {
  patterns: array<string>,
  mode: mode,
  days: array<int>,
  startTime: Js.Date.t,
  endTime: Js.Date.t,
}
type filters = list<filter>

let parseTime = s => Js.Date.fromString("01/01/01 " ++ s)
let withinPeriod = (startTime, endTime, time) => {
  let h = Js.Date.getHours
  let m = Js.Date.getMinutes
  let isAfterStart = h(startTime) < h(time) || (h(startTime) === h(time) && m(startTime) <= m(time))
  let isBeforeEnd = h(endTime) > h(time) || (h(endTime) === h(time) && m(endTime) >= m(time))

  isAfterStart && isBeforeEnd
}

// TODO move this out to a config file
// TODO make this a param of shouldFilter
let filters = [
  {
    patterns: ["youtube\.com", "chess\.com"],
    mode: Block,
    days: [1, 2, 3, 4, 5, 6, 7],
    startTime: parseTime("00:00"),
    endTime: parseTime("12:00"),
  },
  {
    patterns: ["youtube\.com", "chess\.com"],
    mode: Block,
    days: [1, 2, 3, 4, 5, 6, 7],
    startTime: parseTime("20:30"),
    endTime: parseTime("23:59"),
  },
  {
    patterns: ["youtube\.com"],
    mode: Delay(5),
    days: [1, 2, 3, 4, 5, 6, 7],
    startTime: parseTime("00:00"),
    endTime: parseTime("23:59"),
  },
  {
    patterns: ["twitter\.com", "reddit\.com"],
    mode: Block,
    days: [1, 2, 3, 4, 5, 6, 7],
    startTime: parseTime("00:00"),
    endTime: parseTime("18:00"),
  },
]

let getFilter = (~url, ~time) => {
  open Array
  reduce(filters, Off, (acc, filter) => {
    switch acc {
    | Off =>
      let day = time->Js.Date.getDay
      let doDaysMatch = filter.days
      ->map(Int.toFloat)
      // convert week to start on sunday to fit getDay
      ->map(d => d === 7.0 ? 0.0 : d)
      ->some(d => d === day)

      let shouldFilter =
        doDaysMatch &&
        withinPeriod(filter.startTime, filter.endTime, time) &&
        some(filter.patterns, pattern => pattern->Js.Re.fromString->Js.Re.test_(url))
      if shouldFilter {
        filter.mode
      } else {
        Off
      }
    | x => x
    }
  })
}
