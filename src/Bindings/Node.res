@bs.send external appendChild: (Dom.node, Dom.node) => Dom.node = "appendChild"
@bs.send external remove: (Dom.node) => unit = "remove"
@bs.set external setStyle: (Dom.node, string) => unit = "style"
@bs.set external setInnerText: (Dom.node, string) => unit = "innerText"

@bs.set external setClassName: (Dom.node, string) => unit = "className"

