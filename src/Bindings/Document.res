// technically you can have other documents but I am just working with the default one so I am making all the
// fns work off that

@bs.val @bs.return(nullable)
external querySelector: string => option<Dom.node> = "document.querySelector"

@bs.val external _querySelectorAll : string => Dom.nodeList = "document.querySelectorAll"
@bs.val external _toArray : Dom.nodeList => array<Dom.node> = "Array.from"
let querySelectorAll = query => query->_querySelectorAll->_toArray

@bs.val external createElement: string => Dom.node = "document.createElement"
