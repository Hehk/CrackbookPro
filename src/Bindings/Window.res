type t
@bs.val external window : t = "window"

type timeout
@bs.val external setTimeout : (unit => unit, int) => timeout = "setTimeout"
@bs.val external clearTimeout : timeout => unit = "clearTimeout"
type interval
@bs.val external setInterval : (unit => unit, int) => interval = "setInterval"
@bs.val external clearInterval : interval => unit = "clearInterval"

@bs.set external onBlur: (t, unit => unit) => unit = "onblur"
@bs.set external onFocus: (t, unit => unit) => unit = "onfocus"

