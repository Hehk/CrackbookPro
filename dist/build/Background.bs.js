(() => {
  var __commonJS = (callback, module) => () => {
    if (!module) {
      module = {exports: {}};
      callback(module.exports, module);
    }
    return module.exports;
  };

  // ../../node_modules/bs-platform/lib/js/caml_array.js
  var require_caml_array = __commonJS((exports) => {
    "use strict";
    function caml_array_sub(x, offset, len2) {
      var result = new Array(len2);
      var j = 0;
      var i = offset;
      while (j < len2) {
        result[j] = x[i];
        j = j + 1 | 0;
        i = i + 1 | 0;
      }
      ;
      return result;
    }
    function len(_acc, _l) {
      while (true) {
        var l = _l;
        var acc = _acc;
        if (!l) {
          return acc;
        }
        _l = l.tl;
        _acc = l.hd.length + acc | 0;
        continue;
      }
      ;
    }
    function fill(arr, _i, _l) {
      while (true) {
        var l = _l;
        var i = _i;
        if (!l) {
          return;
        }
        var x = l.hd;
        var l$1 = x.length;
        var k = i;
        var j = 0;
        while (j < l$1) {
          arr[k] = x[j];
          k = k + 1 | 0;
          j = j + 1 | 0;
        }
        ;
        _l = l.tl;
        _i = k;
        continue;
      }
      ;
    }
    function caml_array_concat(l) {
      var v = len(0, l);
      var result = new Array(v);
      fill(result, 0, l);
      return result;
    }
    function set(xs, index, newval) {
      if (index < 0 || index >= xs.length) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      xs[index] = newval;
    }
    function get(xs, index) {
      if (index < 0 || index >= xs.length) {
        throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
      }
      return xs[index];
    }
    function caml_make_vect(len2, init) {
      var b = new Array(len2);
      for (var i = 0; i < len2; ++i) {
        b[i] = init;
      }
      return b;
    }
    function caml_make_float_vect(len2) {
      var b = new Array(len2);
      for (var i = 0; i < len2; ++i) {
        b[i] = 0;
      }
      return b;
    }
    function caml_array_blit(a1, i1, a2, i2, len2) {
      if (i2 <= i1) {
        for (var j = 0; j < len2; ++j) {
          a2[j + i2 | 0] = a1[j + i1 | 0];
        }
        return;
      }
      for (var j$1 = len2 - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
      }
    }
    function caml_array_dup(prim) {
      return prim.slice(0);
    }
    exports.caml_array_dup = caml_array_dup;
    exports.caml_array_sub = caml_array_sub;
    exports.caml_array_concat = caml_array_concat;
    exports.caml_make_vect = caml_make_vect;
    exports.caml_make_float_vect = caml_make_float_vect;
    exports.caml_array_blit = caml_array_blit;
    exports.get = get;
    exports.set = set;
  });

  // ../../node_modules/bs-platform/lib/js/curry.js
  var require_curry = __commonJS((exports) => {
    "use strict";
    var Caml_array = require_caml_array();
    function app(_f, _args) {
      while (true) {
        var args = _args;
        var f = _f;
        var init_arity = f.length;
        var arity = init_arity === 0 ? 1 : init_arity;
        var len = args.length;
        var d = arity - len | 0;
        if (d === 0) {
          return f.apply(null, args);
        }
        if (d >= 0) {
          return function(f2, args2) {
            return function(x) {
              return app(f2, args2.concat([x]));
            };
          }(f, args);
        }
        _args = Caml_array.caml_array_sub(args, arity, -d | 0);
        _f = f.apply(null, Caml_array.caml_array_sub(args, 0, arity));
        continue;
      }
      ;
    }
    function _1(o, a0) {
      var arity = o.length;
      if (arity === 1) {
        return o(a0);
      } else {
        switch (arity) {
          case 1:
            return o(a0);
          case 2:
            return function(param) {
              return o(a0, param);
            };
          case 3:
            return function(param, param$1) {
              return o(a0, param, param$1);
            };
          case 4:
            return function(param, param$1, param$2) {
              return o(a0, param, param$1, param$2);
            };
          case 5:
            return function(param, param$1, param$2, param$3) {
              return o(a0, param, param$1, param$2, param$3);
            };
          case 6:
            return function(param, param$1, param$2, param$3, param$4) {
              return o(a0, param, param$1, param$2, param$3, param$4);
            };
          case 7:
            return function(param, param$1, param$2, param$3, param$4, param$5) {
              return o(a0, param, param$1, param$2, param$3, param$4, param$5);
            };
          default:
            return app(o, [a0]);
        }
      }
    }
    function __1(o) {
      var arity = o.length;
      if (arity === 1) {
        return o;
      } else {
        return function(a0) {
          return _1(o, a0);
        };
      }
    }
    function _2(o, a0, a1) {
      var arity = o.length;
      if (arity === 2) {
        return o(a0, a1);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [a1]);
          case 2:
            return o(a0, a1);
          case 3:
            return function(param) {
              return o(a0, a1, param);
            };
          case 4:
            return function(param, param$1) {
              return o(a0, a1, param, param$1);
            };
          case 5:
            return function(param, param$1, param$2) {
              return o(a0, a1, param, param$1, param$2);
            };
          case 6:
            return function(param, param$1, param$2, param$3) {
              return o(a0, a1, param, param$1, param$2, param$3);
            };
          case 7:
            return function(param, param$1, param$2, param$3, param$4) {
              return o(a0, a1, param, param$1, param$2, param$3, param$4);
            };
          default:
            return app(o, [
              a0,
              a1
            ]);
        }
      }
    }
    function __2(o) {
      var arity = o.length;
      if (arity === 2) {
        return o;
      } else {
        return function(a0, a1) {
          return _2(o, a0, a1);
        };
      }
    }
    function _3(o, a0, a1, a2) {
      var arity = o.length;
      if (arity === 3) {
        return o(a0, a1, a2);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2
            ]);
          case 2:
            return app(o(a0, a1), [a2]);
          case 3:
            return o(a0, a1, a2);
          case 4:
            return function(param) {
              return o(a0, a1, a2, param);
            };
          case 5:
            return function(param, param$1) {
              return o(a0, a1, a2, param, param$1);
            };
          case 6:
            return function(param, param$1, param$2) {
              return o(a0, a1, a2, param, param$1, param$2);
            };
          case 7:
            return function(param, param$1, param$2, param$3) {
              return o(a0, a1, a2, param, param$1, param$2, param$3);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2
            ]);
        }
      }
    }
    function __3(o) {
      var arity = o.length;
      if (arity === 3) {
        return o;
      } else {
        return function(a0, a1, a2) {
          return _3(o, a0, a1, a2);
        };
      }
    }
    function _4(o, a0, a1, a2, a3) {
      var arity = o.length;
      if (arity === 4) {
        return o(a0, a1, a2, a3);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3
            ]);
          case 3:
            return app(o(a0, a1, a2), [a3]);
          case 4:
            return o(a0, a1, a2, a3);
          case 5:
            return function(param) {
              return o(a0, a1, a2, a3, param);
            };
          case 6:
            return function(param, param$1) {
              return o(a0, a1, a2, a3, param, param$1);
            };
          case 7:
            return function(param, param$1, param$2) {
              return o(a0, a1, a2, a3, param, param$1, param$2);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3
            ]);
        }
      }
    }
    function __4(o) {
      var arity = o.length;
      if (arity === 4) {
        return o;
      } else {
        return function(a0, a1, a2, a3) {
          return _4(o, a0, a1, a2, a3);
        };
      }
    }
    function _5(o, a0, a1, a2, a3, a4) {
      var arity = o.length;
      if (arity === 5) {
        return o(a0, a1, a2, a3, a4);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [a4]);
          case 5:
            return o(a0, a1, a2, a3, a4);
          case 6:
            return function(param) {
              return o(a0, a1, a2, a3, a4, param);
            };
          case 7:
            return function(param, param$1) {
              return o(a0, a1, a2, a3, a4, param, param$1);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4
            ]);
        }
      }
    }
    function __5(o) {
      var arity = o.length;
      if (arity === 5) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4) {
          return _5(o, a0, a1, a2, a3, a4);
        };
      }
    }
    function _6(o, a0, a1, a2, a3, a4, a5) {
      var arity = o.length;
      if (arity === 6) {
        return o(a0, a1, a2, a3, a4, a5);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [a5]);
          case 6:
            return o(a0, a1, a2, a3, a4, a5);
          case 7:
            return function(param) {
              return o(a0, a1, a2, a3, a4, a5, param);
            };
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5
            ]);
        }
      }
    }
    function __6(o) {
      var arity = o.length;
      if (arity === 6) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5) {
          return _6(o, a0, a1, a2, a3, a4, a5);
        };
      }
    }
    function _7(o, a0, a1, a2, a3, a4, a5, a6) {
      var arity = o.length;
      if (arity === 7) {
        return o(a0, a1, a2, a3, a4, a5, a6);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5,
              a6
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5,
              a6
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [
              a5,
              a6
            ]);
          case 6:
            return app(o(a0, a1, a2, a3, a4, a5), [a6]);
          case 7:
            return o(a0, a1, a2, a3, a4, a5, a6);
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5,
              a6
            ]);
        }
      }
    }
    function __7(o) {
      var arity = o.length;
      if (arity === 7) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5, a6) {
          return _7(o, a0, a1, a2, a3, a4, a5, a6);
        };
      }
    }
    function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
      var arity = o.length;
      if (arity === 8) {
        return o(a0, a1, a2, a3, a4, a5, a6, a7);
      } else {
        switch (arity) {
          case 1:
            return app(o(a0), [
              a1,
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 2:
            return app(o(a0, a1), [
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 3:
            return app(o(a0, a1, a2), [
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
          case 4:
            return app(o(a0, a1, a2, a3), [
              a4,
              a5,
              a6,
              a7
            ]);
          case 5:
            return app(o(a0, a1, a2, a3, a4), [
              a5,
              a6,
              a7
            ]);
          case 6:
            return app(o(a0, a1, a2, a3, a4, a5), [
              a6,
              a7
            ]);
          case 7:
            return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
          default:
            return app(o, [
              a0,
              a1,
              a2,
              a3,
              a4,
              a5,
              a6,
              a7
            ]);
        }
      }
    }
    function __8(o) {
      var arity = o.length;
      if (arity === 8) {
        return o;
      } else {
        return function(a0, a1, a2, a3, a4, a5, a6, a7) {
          return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
        };
      }
    }
    exports.app = app;
    exports._1 = _1;
    exports.__1 = __1;
    exports._2 = _2;
    exports.__2 = __2;
    exports._3 = _3;
    exports.__3 = __3;
    exports._4 = _4;
    exports.__4 = __4;
    exports._5 = _5;
    exports.__5 = __5;
    exports._6 = _6;
    exports.__6 = __6;
    exports._7 = _7;
    exports.__7 = __7;
    exports._8 = _8;
    exports.__8 = __8;
  });

  // ../../node_modules/bs-platform/lib/js/js_int.js
  var require_js_int = __commonJS((exports) => {
    "use strict";
    function equal(x, y) {
      return x === y;
    }
    var max = 2147483647;
    var min = -2147483648;
    exports.equal = equal;
    exports.max = max;
    exports.min = min;
  });

  // ../../node_modules/bs-platform/lib/js/js_math.js
  var require_js_math = __commonJS((exports) => {
    "use strict";
    var Js_int = require_js_int();
    function unsafe_ceil(prim) {
      return Math.ceil(prim);
    }
    function ceil_int(f) {
      if (f > Js_int.max) {
        return Js_int.max;
      } else if (f < Js_int.min) {
        return Js_int.min;
      } else {
        return Math.ceil(f);
      }
    }
    function unsafe_floor(prim) {
      return Math.floor(prim);
    }
    function floor_int(f) {
      if (f > Js_int.max) {
        return Js_int.max;
      } else if (f < Js_int.min) {
        return Js_int.min;
      } else {
        return Math.floor(f);
      }
    }
    function random_int(min, max) {
      return floor_int(Math.random() * (max - min | 0)) + min | 0;
    }
    var ceil = ceil_int;
    var floor = floor_int;
    exports.unsafe_ceil = unsafe_ceil;
    exports.ceil_int = ceil_int;
    exports.ceil = ceil;
    exports.unsafe_floor = unsafe_floor;
    exports.floor_int = floor_int;
    exports.floor = floor;
    exports.random_int = random_int;
  });

  // ../../node_modules/bs-platform/lib/js/caml_option.js
  var require_caml_option = __commonJS((exports) => {
    "use strict";
    function isNested(x) {
      return x.BS_PRIVATE_NESTED_SOME_NONE !== void 0;
    }
    function some(x) {
      if (x === void 0) {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: 0
        };
      } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
        };
      } else {
        return x;
      }
    }
    function nullable_to_opt(x) {
      if (x == null) {
        return;
      } else {
        return some(x);
      }
    }
    function undefined_to_opt(x) {
      if (x === void 0) {
        return;
      } else {
        return some(x);
      }
    }
    function null_to_opt(x) {
      if (x === null) {
        return;
      } else {
        return some(x);
      }
    }
    function valFromOption(x) {
      if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
        return x;
      }
      var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
      if (depth === 0) {
        return;
      } else {
        return {
          BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
        };
      }
    }
    function option_get(x) {
      if (x === void 0) {
        return;
      } else {
        return valFromOption(x);
      }
    }
    function option_unwrap(x) {
      if (x !== void 0) {
        return x.VAL;
      } else {
        return x;
      }
    }
    exports.nullable_to_opt = nullable_to_opt;
    exports.undefined_to_opt = undefined_to_opt;
    exports.null_to_opt = null_to_opt;
    exports.valFromOption = valFromOption;
    exports.some = some;
    exports.isNested = isNested;
    exports.option_get = option_get;
    exports.option_unwrap = option_unwrap;
  });

  // ../../node_modules/bs-platform/lib/js/caml_primitive.js
  var require_caml_primitive = __commonJS((exports) => {
    "use strict";
    function caml_int_compare(x, y) {
      if (x < y) {
        return -1;
      } else if (x === y) {
        return 0;
      } else {
        return 1;
      }
    }
    function caml_bool_compare(x, y) {
      if (x) {
        if (y) {
          return 0;
        } else {
          return 1;
        }
      } else if (y) {
        return -1;
      } else {
        return 0;
      }
    }
    function caml_float_compare(x, y) {
      if (x === y) {
        return 0;
      } else if (x < y) {
        return -1;
      } else if (x > y || x === x) {
        return 1;
      } else if (y === y) {
        return -1;
      } else {
        return 0;
      }
    }
    function caml_string_compare(s1, s2) {
      if (s1 === s2) {
        return 0;
      } else if (s1 < s2) {
        return -1;
      } else {
        return 1;
      }
    }
    function caml_bool_min(x, y) {
      if (x) {
        return y;
      } else {
        return x;
      }
    }
    function caml_int_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_float_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_string_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_nativeint_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_int32_min(x, y) {
      if (x < y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_bool_max(x, y) {
      if (x) {
        return x;
      } else {
        return y;
      }
    }
    function caml_int_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_float_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_string_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_nativeint_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    function caml_int32_max(x, y) {
      if (x > y) {
        return x;
      } else {
        return y;
      }
    }
    var caml_nativeint_compare = caml_int_compare;
    var caml_int32_compare = caml_int_compare;
    exports.caml_int_compare = caml_int_compare;
    exports.caml_bool_compare = caml_bool_compare;
    exports.caml_float_compare = caml_float_compare;
    exports.caml_nativeint_compare = caml_nativeint_compare;
    exports.caml_string_compare = caml_string_compare;
    exports.caml_int32_compare = caml_int32_compare;
    exports.caml_bool_min = caml_bool_min;
    exports.caml_int_min = caml_int_min;
    exports.caml_float_min = caml_float_min;
    exports.caml_string_min = caml_string_min;
    exports.caml_nativeint_min = caml_nativeint_min;
    exports.caml_int32_min = caml_int32_min;
    exports.caml_bool_max = caml_bool_max;
    exports.caml_int_max = caml_int_max;
    exports.caml_float_max = caml_float_max;
    exports.caml_string_max = caml_string_max;
    exports.caml_nativeint_max = caml_nativeint_max;
    exports.caml_int32_max = caml_int32_max;
  });

  // ../../node_modules/bs-platform/lib/js/belt_Array.js
  var require_belt_Array = __commonJS((exports) => {
    "use strict";
    var Curry = require_curry();
    var Js_math = require_js_math();
    var Caml_option = require_caml_option();
    var Caml_primitive = require_caml_primitive();
    function get(arr, i) {
      if (i >= 0 && i < arr.length) {
        return Caml_option.some(arr[i]);
      }
    }
    function getExn(arr, i) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            27,
            4
          ],
          Error: new Error()
        };
      }
      return arr[i];
    }
    function set(arr, i, v) {
      if (i >= 0 && i < arr.length) {
        arr[i] = v;
        return true;
      } else {
        return false;
      }
    }
    function setExn(arr, i, v) {
      if (!(i >= 0 && i < arr.length)) {
        throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            33,
            2
          ],
          Error: new Error()
        };
      }
      arr[i] = v;
    }
    function swapUnsafe(xs, i, j) {
      var tmp = xs[i];
      xs[i] = xs[j];
      xs[j] = tmp;
    }
    function shuffleInPlace(xs) {
      var len = xs.length;
      for (var i = 0; i < len; ++i) {
        swapUnsafe(xs, i, Js_math.random_int(i, len));
      }
    }
    function shuffle(xs) {
      var result = xs.slice(0);
      shuffleInPlace(result);
      return result;
    }
    function reverseInPlace(xs) {
      var len = xs.length;
      var ofs = 0;
      for (var i = 0, i_finish = len / 2 | 0; i < i_finish; ++i) {
        swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
      }
    }
    function reverse(xs) {
      var len = xs.length;
      var result = new Array(len);
      for (var i = 0; i < len; ++i) {
        result[i] = xs[(len - 1 | 0) - i | 0];
      }
      return result;
    }
    function make(l, f) {
      if (l <= 0) {
        return [];
      }
      var res = new Array(l);
      for (var i = 0; i < l; ++i) {
        res[i] = f;
      }
      return res;
    }
    function makeByU(l, f) {
      if (l <= 0) {
        return [];
      }
      var res = new Array(l);
      for (var i = 0; i < l; ++i) {
        res[i] = f(i);
      }
      return res;
    }
    function makeBy(l, f) {
      return makeByU(l, Curry.__1(f));
    }
    function makeByAndShuffleU(l, f) {
      var u = makeByU(l, f);
      shuffleInPlace(u);
      return u;
    }
    function makeByAndShuffle(l, f) {
      return makeByAndShuffleU(l, Curry.__1(f));
    }
    function range(start, finish) {
      var cut = finish - start | 0;
      if (cut < 0) {
        return [];
      }
      var arr = new Array(cut + 1 | 0);
      for (var i = 0; i <= cut; ++i) {
        arr[i] = start + i | 0;
      }
      return arr;
    }
    function rangeBy(start, finish, step) {
      var cut = finish - start | 0;
      if (cut < 0 || step <= 0) {
        return [];
      }
      var nb = (cut / step | 0) + 1 | 0;
      var arr = new Array(nb);
      var cur = start;
      for (var i = 0; i < nb; ++i) {
        arr[i] = cur;
        cur = cur + step | 0;
      }
      return arr;
    }
    function zip(xs, ys) {
      var lenx = xs.length;
      var leny = ys.length;
      var len = lenx < leny ? lenx : leny;
      var s = new Array(len);
      for (var i = 0; i < len; ++i) {
        s[i] = [
          xs[i],
          ys[i]
        ];
      }
      return s;
    }
    function zipByU(xs, ys, f) {
      var lenx = xs.length;
      var leny = ys.length;
      var len = lenx < leny ? lenx : leny;
      var s = new Array(len);
      for (var i = 0; i < len; ++i) {
        s[i] = f(xs[i], ys[i]);
      }
      return s;
    }
    function zipBy(xs, ys, f) {
      return zipByU(xs, ys, Curry.__2(f));
    }
    function concat(a1, a2) {
      var l1 = a1.length;
      var l2 = a2.length;
      var a1a2 = new Array(l1 + l2 | 0);
      for (var i = 0; i < l1; ++i) {
        a1a2[i] = a1[i];
      }
      for (var i$1 = 0; i$1 < l2; ++i$1) {
        a1a2[l1 + i$1 | 0] = a2[i$1];
      }
      return a1a2;
    }
    function concatMany(arrs) {
      var lenArrs = arrs.length;
      var totalLen = 0;
      for (var i = 0; i < lenArrs; ++i) {
        totalLen = totalLen + arrs[i].length | 0;
      }
      var result = new Array(totalLen);
      totalLen = 0;
      for (var j = 0; j < lenArrs; ++j) {
        var cur = arrs[j];
        for (var k = 0, k_finish = cur.length; k < k_finish; ++k) {
          result[totalLen] = cur[k];
          totalLen = totalLen + 1 | 0;
        }
      }
      return result;
    }
    function slice(a, offset, len) {
      if (len <= 0) {
        return [];
      }
      var lena = a.length;
      var ofs = offset < 0 ? Caml_primitive.caml_int_max(lena + offset | 0, 0) : offset;
      var hasLen = lena - ofs | 0;
      var copyLength = hasLen < len ? hasLen : len;
      if (copyLength <= 0) {
        return [];
      }
      var result = new Array(copyLength);
      for (var i = 0; i < copyLength; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function sliceToEnd(a, offset) {
      var lena = a.length;
      var ofs = offset < 0 ? Caml_primitive.caml_int_max(lena + offset | 0, 0) : offset;
      var len = lena - ofs | 0;
      var result = new Array(len);
      for (var i = 0; i < len; ++i) {
        result[i] = a[ofs + i | 0];
      }
      return result;
    }
    function fill(a, offset, len, v) {
      if (len <= 0) {
        return;
      }
      var lena = a.length;
      var ofs = offset < 0 ? Caml_primitive.caml_int_max(lena + offset | 0, 0) : offset;
      var hasLen = lena - ofs | 0;
      var fillLength = hasLen < len ? hasLen : len;
      if (fillLength <= 0) {
        return;
      }
      for (var i = ofs, i_finish = ofs + fillLength | 0; i < i_finish; ++i) {
        a[i] = v;
      }
    }
    function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
      if (srcofs2 <= srcofs1) {
        for (var j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function blit(a1, ofs1, a2, ofs2, len) {
      var lena1 = a1.length;
      var lena2 = a2.length;
      var srcofs1 = ofs1 < 0 ? Caml_primitive.caml_int_max(lena1 + ofs1 | 0, 0) : ofs1;
      var srcofs2 = ofs2 < 0 ? Caml_primitive.caml_int_max(lena2 + ofs2 | 0, 0) : ofs2;
      var blitLength = Caml_primitive.caml_int_min(len, Caml_primitive.caml_int_min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));
      if (srcofs2 <= srcofs1) {
        for (var j = 0; j < blitLength; ++j) {
          a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
        }
        return;
      }
      for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
        a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
      }
    }
    function forEachU(a, f) {
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(a[i]);
      }
    }
    function forEach(a, f) {
      return forEachU(a, Curry.__1(f));
    }
    function mapU(a, f) {
      var l = a.length;
      var r = new Array(l);
      for (var i = 0; i < l; ++i) {
        r[i] = f(a[i]);
      }
      return r;
    }
    function map(a, f) {
      return mapU(a, Curry.__1(f));
    }
    function getByU(a, p) {
      var l = a.length;
      var i = 0;
      var r;
      while (r === void 0 && i < l) {
        var v = a[i];
        if (p(v)) {
          r = Caml_option.some(v);
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function getBy(a, p) {
      return getByU(a, Curry.__1(p));
    }
    function getIndexByU(a, p) {
      var l = a.length;
      var i = 0;
      var r;
      while (r === void 0 && i < l) {
        var v = a[i];
        if (p(v)) {
          r = i;
        }
        i = i + 1 | 0;
      }
      ;
      return r;
    }
    function getIndexBy(a, p) {
      return getIndexByU(a, Curry.__1(p));
    }
    function keepU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        if (f(v)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keep(a, f) {
      return keepU(a, Curry.__1(f));
    }
    function keepWithIndexU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        if (f(v, i)) {
          r[j] = v;
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepWithIndex(a, f) {
      return keepWithIndexU(a, Curry.__2(f));
    }
    function keepMapU(a, f) {
      var l = a.length;
      var r = new Array(l);
      var j = 0;
      for (var i = 0; i < l; ++i) {
        var v = a[i];
        var v$1 = f(v);
        if (v$1 !== void 0) {
          r[j] = Caml_option.valFromOption(v$1);
          j = j + 1 | 0;
        }
      }
      r.length = j;
      return r;
    }
    function keepMap(a, f) {
      return keepMapU(a, Curry.__1(f));
    }
    function forEachWithIndexU(a, f) {
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        f(i, a[i]);
      }
    }
    function forEachWithIndex(a, f) {
      return forEachWithIndexU(a, Curry.__2(f));
    }
    function mapWithIndexU(a, f) {
      var l = a.length;
      var r = new Array(l);
      for (var i = 0; i < l; ++i) {
        r[i] = f(i, a[i]);
      }
      return r;
    }
    function mapWithIndex(a, f) {
      return mapWithIndexU(a, Curry.__2(f));
    }
    function reduceU(a, x, f) {
      var r = x;
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduce(a, x, f) {
      return reduceU(a, x, Curry.__2(f));
    }
    function reduceReverseU(a, x, f) {
      var r = x;
      for (var i = a.length - 1 | 0; i >= 0; --i) {
        r = f(r, a[i]);
      }
      return r;
    }
    function reduceReverse(a, x, f) {
      return reduceReverseU(a, x, Curry.__2(f));
    }
    function reduceReverse2U(a, b, x, f) {
      var r = x;
      var len = Caml_primitive.caml_int_min(a.length, b.length);
      for (var i = len - 1 | 0; i >= 0; --i) {
        r = f(r, a[i], b[i]);
      }
      return r;
    }
    function reduceReverse2(a, b, x, f) {
      return reduceReverse2U(a, b, x, Curry.__3(f));
    }
    function reduceWithIndexU(a, x, f) {
      var r = x;
      for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
        r = f(r, a[i], i);
      }
      return r;
    }
    function reduceWithIndex(a, x, f) {
      return reduceWithIndexU(a, x, Curry.__3(f));
    }
    function everyU(arr, b) {
      var len = arr.length;
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === len) {
          return true;
        }
        if (!b(arr[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function every(arr, f) {
      return everyU(arr, Curry.__1(f));
    }
    function someU(arr, b) {
      var len = arr.length;
      var _i = 0;
      while (true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        if (b(arr[i])) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function some(arr, f) {
      return someU(arr, Curry.__1(f));
    }
    function everyAux2(arr1, arr2, _i, b, len) {
      while (true) {
        var i = _i;
        if (i === len) {
          return true;
        }
        if (!b(arr1[i], arr2[i])) {
          return false;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function every2U(a, b, p) {
      return everyAux2(a, b, 0, p, Caml_primitive.caml_int_min(a.length, b.length));
    }
    function every2(a, b, p) {
      return every2U(a, b, Curry.__2(p));
    }
    function some2U(a, b, p) {
      var _i = 0;
      var len = Caml_primitive.caml_int_min(a.length, b.length);
      while (true) {
        var i = _i;
        if (i === len) {
          return false;
        }
        if (p(a[i], b[i])) {
          return true;
        }
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function some2(a, b, p) {
      return some2U(a, b, Curry.__2(p));
    }
    function eqU(a, b, p) {
      var lena = a.length;
      var lenb = b.length;
      if (lena === lenb) {
        return everyAux2(a, b, 0, p, lena);
      } else {
        return false;
      }
    }
    function eq(a, b, p) {
      return eqU(a, b, Curry.__2(p));
    }
    function cmpU(a, b, p) {
      var lena = a.length;
      var lenb = b.length;
      if (lena > lenb) {
        return 1;
      } else if (lena < lenb) {
        return -1;
      } else {
        var _i = 0;
        while (true) {
          var i = _i;
          if (i === lena) {
            return 0;
          }
          var c = p(a[i], b[i]);
          if (c !== 0) {
            return c;
          }
          _i = i + 1 | 0;
          continue;
        }
        ;
      }
    }
    function cmp(a, b, p) {
      return cmpU(a, b, Curry.__2(p));
    }
    function partitionU(a, f) {
      var l = a.length;
      var i = 0;
      var j = 0;
      var a1 = new Array(l);
      var a2 = new Array(l);
      for (var ii = 0; ii < l; ++ii) {
        var v = a[ii];
        if (f(v)) {
          a1[i] = v;
          i = i + 1 | 0;
        } else {
          a2[j] = v;
          j = j + 1 | 0;
        }
      }
      a1.length = i;
      a2.length = j;
      return [
        a1,
        a2
      ];
    }
    function partition(a, f) {
      return partitionU(a, Curry.__1(f));
    }
    function unzip(a) {
      var l = a.length;
      var a1 = new Array(l);
      var a2 = new Array(l);
      for (var i = 0; i < l; ++i) {
        var match = a[i];
        a1[i] = match[0];
        a2[i] = match[1];
      }
      return [
        a1,
        a2
      ];
    }
    function joinWithU(a, sep, toString) {
      var l = a.length;
      if (l === 0) {
        return "";
      }
      var lastIndex = l - 1 | 0;
      var _i = 0;
      var _res = "";
      while (true) {
        var res = _res;
        var i = _i;
        if (i === lastIndex) {
          return res + toString(a[i]);
        }
        _res = res + (toString(a[i]) + sep);
        _i = i + 1 | 0;
        continue;
      }
      ;
    }
    function joinWith(a, sep, toString) {
      return joinWithU(a, sep, Curry.__1(toString));
    }
    exports.get = get;
    exports.getExn = getExn;
    exports.set = set;
    exports.setExn = setExn;
    exports.shuffleInPlace = shuffleInPlace;
    exports.shuffle = shuffle;
    exports.reverseInPlace = reverseInPlace;
    exports.reverse = reverse;
    exports.make = make;
    exports.range = range;
    exports.rangeBy = rangeBy;
    exports.makeByU = makeByU;
    exports.makeBy = makeBy;
    exports.makeByAndShuffleU = makeByAndShuffleU;
    exports.makeByAndShuffle = makeByAndShuffle;
    exports.zip = zip;
    exports.zipByU = zipByU;
    exports.zipBy = zipBy;
    exports.unzip = unzip;
    exports.concat = concat;
    exports.concatMany = concatMany;
    exports.slice = slice;
    exports.sliceToEnd = sliceToEnd;
    exports.fill = fill;
    exports.blit = blit;
    exports.blitUnsafe = blitUnsafe;
    exports.forEachU = forEachU;
    exports.forEach = forEach;
    exports.mapU = mapU;
    exports.map = map;
    exports.getByU = getByU;
    exports.getBy = getBy;
    exports.getIndexByU = getIndexByU;
    exports.getIndexBy = getIndexBy;
    exports.keepU = keepU;
    exports.keep = keep;
    exports.keepWithIndexU = keepWithIndexU;
    exports.keepWithIndex = keepWithIndex;
    exports.keepMapU = keepMapU;
    exports.keepMap = keepMap;
    exports.forEachWithIndexU = forEachWithIndexU;
    exports.forEachWithIndex = forEachWithIndex;
    exports.mapWithIndexU = mapWithIndexU;
    exports.mapWithIndex = mapWithIndex;
    exports.partitionU = partitionU;
    exports.partition = partition;
    exports.reduceU = reduceU;
    exports.reduce = reduce;
    exports.reduceReverseU = reduceReverseU;
    exports.reduceReverse = reduceReverse;
    exports.reduceReverse2U = reduceReverse2U;
    exports.reduceReverse2 = reduceReverse2;
    exports.reduceWithIndexU = reduceWithIndexU;
    exports.reduceWithIndex = reduceWithIndex;
    exports.joinWithU = joinWithU;
    exports.joinWith = joinWith;
    exports.someU = someU;
    exports.some = some;
    exports.everyU = everyU;
    exports.every = every;
    exports.every2U = every2U;
    exports.every2 = every2;
    exports.some2U = some2U;
    exports.some2 = some2;
    exports.cmpU = cmpU;
    exports.cmp = cmp;
    exports.eqU = eqU;
    exports.eq = eq;
  });

  // ../../src/Filter.bs.js
  var require_Filter_bs = __commonJS((exports) => {
    "use strict";
    var Belt_Array = require_belt_Array();
    function parseTime(s) {
      return new Date("01/01/01 " + s);
    }
    function withinPeriod(startTime, endTime, time) {
      var isAfterStart = startTime.getHours() < time.getHours() || startTime.getHours() === time.getHours() && startTime.getMinutes() <= time.getMinutes();
      var isBeforeEnd = endTime.getHours() > time.getHours() || endTime.getHours() === time.getHours() && endTime.getMinutes() >= time.getMinutes();
      if (isAfterStart) {
        return isBeforeEnd;
      } else {
        return false;
      }
    }
    function make(patterns, mode, days, startTime, endTime) {
      return {
        patterns,
        mode,
        days,
        startTime: new Date("01/01/01 " + startTime),
        endTime: new Date("01/01/01 " + endTime)
      };
    }
    var filters = [
      {
        patterns: [
          "youtube\\.com",
          "chess\\.com"
        ],
        mode: 0,
        days: [
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        startTime: new Date("01/01/01 00:00"),
        endTime: new Date("01/01/01 12:00")
      },
      {
        patterns: [
          "youtube\\.com",
          "chess\\.com"
        ],
        mode: 0,
        days: [
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        startTime: new Date("01/01/01 20:30"),
        endTime: new Date("01/01/01 23:59")
      },
      {
        patterns: ["youtube\\.com"],
        mode: {
          _0: 5
        },
        days: [
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        startTime: new Date("01/01/01 00:00"),
        endTime: new Date("01/01/01 23:59")
      },
      {
        patterns: [
          "twitter\\.com",
          "reddit\\.com"
        ],
        mode: 0,
        days: [
          1,
          2,
          3,
          4,
          5,
          6,
          7
        ],
        startTime: new Date("01/01/01 00:00"),
        endTime: new Date("01/01/01 18:00")
      }
    ];
    function getFilter(url, time) {
      return Belt_Array.reduce(filters, 1, function(acc, filter) {
        if (typeof acc !== "number") {
          return acc;
        }
        if (acc === 0) {
          return acc;
        }
        var day = time.getDay();
        var doDaysMatch = Belt_Array.some(Belt_Array.map(Belt_Array.map(filter.days, function(prim) {
          return prim;
        }), function(d) {
          if (d === 7) {
            return 0;
          } else {
            return d;
          }
        }), function(d) {
          return d === day;
        });
        var shouldFilter = doDaysMatch && withinPeriod(filter.startTime, filter.endTime, time) && Belt_Array.some(filter.patterns, function(pattern) {
          return new RegExp(pattern).test(url);
        });
        if (shouldFilter) {
          return filter.mode;
        } else {
          return 1;
        }
      });
    }
    exports.parseTime = parseTime;
    exports.withinPeriod = withinPeriod;
    exports.make = make;
    exports.filters = filters;
    exports.getFilter = getFilter;
  });

  // ../../node_modules/bs-platform/lib/js/belt_Option.js
  var require_belt_Option = __commonJS((exports) => {
    "use strict";
    var Curry = require_curry();
    var Caml_option = require_caml_option();
    function forEachU(opt, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      }
    }
    function forEach(opt, f) {
      return forEachU(opt, Curry.__1(f));
    }
    function getExn(x) {
      if (x !== void 0) {
        return Caml_option.valFromOption(x);
      }
      throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
    }
    function mapWithDefaultU(opt, $$default, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      } else {
        return $$default;
      }
    }
    function mapWithDefault(opt, $$default, f) {
      return mapWithDefaultU(opt, $$default, Curry.__1(f));
    }
    function mapU(opt, f) {
      if (opt !== void 0) {
        return Caml_option.some(f(Caml_option.valFromOption(opt)));
      }
    }
    function map(opt, f) {
      return mapU(opt, Curry.__1(f));
    }
    function flatMapU(opt, f) {
      if (opt !== void 0) {
        return f(Caml_option.valFromOption(opt));
      }
    }
    function flatMap(opt, f) {
      return flatMapU(opt, Curry.__1(f));
    }
    function getWithDefault(opt, $$default) {
      if (opt !== void 0) {
        return Caml_option.valFromOption(opt);
      } else {
        return $$default;
      }
    }
    function isSome(param) {
      return param !== void 0;
    }
    function isNone(x) {
      return x === void 0;
    }
    function eqU(a, b, f) {
      if (a !== void 0) {
        if (b !== void 0) {
          return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
        } else {
          return false;
        }
      } else {
        return b === void 0;
      }
    }
    function eq(a, b, f) {
      return eqU(a, b, Curry.__2(f));
    }
    function cmpU(a, b, f) {
      if (a !== void 0) {
        if (b !== void 0) {
          return f(Caml_option.valFromOption(a), Caml_option.valFromOption(b));
        } else {
          return 1;
        }
      } else if (b !== void 0) {
        return -1;
      } else {
        return 0;
      }
    }
    function cmp(a, b, f) {
      return cmpU(a, b, Curry.__2(f));
    }
    exports.forEachU = forEachU;
    exports.forEach = forEach;
    exports.getExn = getExn;
    exports.mapWithDefaultU = mapWithDefaultU;
    exports.mapWithDefault = mapWithDefault;
    exports.mapU = mapU;
    exports.map = map;
    exports.flatMapU = flatMapU;
    exports.flatMap = flatMap;
    exports.getWithDefault = getWithDefault;
    exports.isSome = isSome;
    exports.isNone = isNone;
    exports.eqU = eqU;
    exports.eq = eq;
    exports.cmpU = cmpU;
    exports.cmp = cmp;
  });

  // ../../src/App.bs.js
  var require_App_bs = __commonJS((exports) => {
    "use strict";
    var Curry = require_curry();
    var Filter = require_Filter_bs();
    var Belt_Option = require_belt_Option();
    var Caml_option = require_caml_option();
    function CreateForeground(Props) {
      var state = {
        contents: {
          pingInterval: void 0,
          delayTimeout: 0,
          filter: 1,
          url: ""
        }
      };
      var reduce = function($$event) {
        var oldState = state.contents;
        debugger;
        var newState;
        if (typeof $$event === "number") {
          switch ($$event) {
            case 0:
              debugger;
              newState = {
                pingInterval: oldState.pingInterval,
                delayTimeout: 1,
                filter: 1,
                url: oldState.url
              };
              break;
            case 1:
              Curry._1(Props.sendMessage, {
                _0: window.location.href
              });
              var pingInterval = Caml_option.some(setInterval(function(param) {
                return reduce(3);
              }, 6e4));
              newState = {
                pingInterval,
                delayTimeout: 0,
                filter: 1,
                url: window.location.href
              };
              break;
            case 2:
              Belt_Option.forEach(oldState.pingInterval, function(prim) {
                clearInterval(prim);
              });
              var t = oldState.delayTimeout;
              if (typeof t === "number") {
              } else {
                clearTimeout(t._0);
              }
              newState = {
                pingInterval: void 0,
                delayTimeout: 0,
                filter: oldState.filter,
                url: oldState.url
              };
              break;
            case 3:
              Curry._1(Props.sendMessage, {
                _0: oldState.url
              });
              newState = oldState;
              break;
          }
        } else if ($$event.TAG === 0) {
          var newUrl = $$event._0;
          Curry._1(Props.sendMessage, {
            _0: newUrl
          });
          newState = {
            pingInterval: oldState.pingInterval,
            delayTimeout: oldState.delayTimeout,
            filter: oldState.filter,
            url: newUrl
          };
        } else {
          var filter = $$event._0;
          console.log("FILTER", filter, "DELAY_TIMEOUT", oldState.delayTimeout);
          var match = oldState.delayTimeout;
          var filter$1 = typeof match === "number" && match !== 0 && typeof filter !== "number" ? 1 : filter;
          var match$1 = oldState.delayTimeout;
          var delayTimeout = typeof match$1 === "number" && !(match$1 !== 0 || typeof filter$1 === "number") ? {
            _0: setTimeout(function(param) {
              return reduce(0);
            }, Math.imul(filter$1._0, 1e3))
          } : match$1;
          newState = {
            pingInterval: oldState.pingInterval,
            delayTimeout,
            filter: filter$1,
            url: oldState.url
          };
        }
        Curry._1(Props.onStateChange, newState);
        state.contents = newState;
      };
      Curry._1(Props.onMessage, function(message) {
        return reduce({
          TAG: 1,
          _0: message._0
        });
      });
      return {
        state,
        reduce
      };
    }
    function CreateBackground(Props) {
      Curry._1(Props.onMessage, function(id, message) {
        var filter = Filter.getFilter(message._0, new Date());
        return Curry._2(Props.sendMessage, id, {
          _0: filter
        });
      });
      return {};
    }
    exports.CreateForeground = CreateForeground;
    exports.CreateBackground = CreateBackground;
  });

  // ../../node_modules/crx-hotreload/hot-reload.js
  var require_hot_reload = __commonJS(() => {
    var filesInDirectory = (dir) => new Promise((resolve) => dir.createReader().readEntries((entries) => Promise.all(entries.filter((e) => e.name[0] !== ".").map((e) => e.isDirectory ? filesInDirectory(e) : new Promise((resolve2) => e.file(resolve2)))).then((files) => [].concat(...files)).then(resolve)));
    var timestampForFilesInDirectory = (dir) => filesInDirectory(dir).then((files) => files.map((f) => f.name + f.lastModifiedDate).join());
    var watchChanges = (dir, lastTimestamp) => {
      timestampForFilesInDirectory(dir).then((timestamp) => {
        if (!lastTimestamp || lastTimestamp === timestamp) {
          setTimeout(() => watchChanges(dir, timestamp), 1e3);
        } else {
          chrome.runtime.reload();
        }
      });
    };
    chrome.management.getSelf((self) => {
      if (self.installType === "development") {
        chrome.runtime.getPackageDirectoryEntry((dir) => watchChanges(dir));
        chrome.tabs.query({active: true, lastFocusedWindow: true}, (tabs) => {
          if (tabs[0]) {
            chrome.tabs.reload(tabs[0].id);
          }
        });
      }
    });
  });

  // ../../src/Background.bs.js
  var require_Background_bs = __commonJS((exports) => {
    "use strict";
    var App = require_App_bs();
    var Curry = require_curry();
    require_hot_reload();
    function sendMessage(id, message) {
      chrome.tabs.sendMessage(id, message);
    }
    function onMessage(f) {
      chrome.runtime.onMessage.addListener(function(message, sender) {
        var tab = sender.tab;
        if (tab === void 0) {
          return;
        }
        var id = tab.id;
        if (id !== void 0) {
          return Curry._2(f, id, message);
        }
      });
    }
    var Background = App.CreateBackground({
      onMessage,
      sendMessage
    });
    exports.Background = Background;
  });
  require_Background_bs();
})();
