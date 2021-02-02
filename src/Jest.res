// if the callback has any params the test will fail due to timeout, so we need to uncurry
@bs.val external test : (string, (. unit) => unit) => unit = "test"

type expect<'a>
@bs.val external expect : 'a => expect<'a> = "expect"
@bs.send external toBe : (expect<'a>, 'a) => unit = "toBe"
