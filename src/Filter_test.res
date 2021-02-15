open Jest
open Filter

test("initial filter test", (. ()) => {
  let url = "https://example.com"
  let time = Js.Date.fromString("01/01/2020 18:00")
  expect(getFilter(~url, ~time))->toBe(Off)
})
