/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

var SE = Object.create;
var ht = Object.defineProperty;
var bE = Object.getOwnPropertyDescriptor;
var CE = Object.getOwnPropertyNames;
var xE = Object.getPrototypeOf,
  RE = Object.prototype.hasOwnProperty;
var M = (e, t) => () => (e && (t = e((e = 0))), t);
var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  X = (e, t) => {
    for (var r in t) ht(e, r, { get: t[r], enumerable: !0 });
  },
  qi = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let i of CE(t))
        !RE.call(e, i) &&
          i !== r &&
          ht(e, i, {
            get: () => t[i],
            enumerable: !(n = bE(t, i)) || n.enumerable,
          });
    return e;
  };
var R = (e, t, r) => (
    (r = e != null ? SE(xE(e)) : {}),
    qi(
      t || !e || !e.__esModule
        ? ht(r, "default", { value: e, enumerable: !0 })
        : r,
      e
    )
  ),
  $ = (e) => qi(ht({}, "__esModule", { value: !0 }), e);
var xr = c((MM, Gi) => {
  var NE =
    typeof global == "object" && global && global.Object === Object && global;
  Gi.exports = NE;
});
var k = c((FM, Vi) => {
  var LE = xr(),
    PE = typeof self == "object" && self && self.Object === Object && self,
    ME = LE || PE || Function("return this")();
  Vi.exports = ME;
});
var he = c((DM, Ui) => {
  var FE = k(),
    DE = FE.Symbol;
  Ui.exports = DE;
});
var Wi = c((wM, Hi) => {
  var Xi = he(),
    Bi = Object.prototype,
    wE = Bi.hasOwnProperty,
    qE = Bi.toString,
    Ke = Xi ? Xi.toStringTag : void 0;
  function GE(e) {
    var t = wE.call(e, Ke),
      r = e[Ke];
    try {
      e[Ke] = void 0;
      var n = !0;
    } catch {}
    var i = qE.call(e);
    return n && (t ? (e[Ke] = r) : delete e[Ke]), i;
  }
  Hi.exports = GE;
});
var Ki = c((qM, ji) => {
  var VE = Object.prototype,
    UE = VE.toString;
  function XE(e) {
    return UE.call(e);
  }
  ji.exports = XE;
});
var ue = c((GM, Yi) => {
  var ki = he(),
    BE = Wi(),
    HE = Ki(),
    WE = "[object Null]",
    jE = "[object Undefined]",
    zi = ki ? ki.toStringTag : void 0;
  function KE(e) {
    return e == null
      ? e === void 0
        ? jE
        : WE
      : zi && zi in Object(e)
      ? BE(e)
      : HE(e);
  }
  Yi.exports = KE;
});
var Rr = c((VM, Qi) => {
  function kE(e, t) {
    return function (r) {
      return e(t(r));
    };
  }
  Qi.exports = kE;
});
var Nr = c((UM, $i) => {
  var zE = Rr(),
    YE = zE(Object.getPrototypeOf, Object);
  $i.exports = YE;
});
var ne = c((XM, Zi) => {
  function QE(e) {
    return e != null && typeof e == "object";
  }
  Zi.exports = QE;
});
var Lr = c((BM, eo) => {
  var $E = ue(),
    ZE = Nr(),
    JE = ne(),
    eg = "[object Object]",
    tg = Function.prototype,
    rg = Object.prototype,
    Ji = tg.toString,
    ng = rg.hasOwnProperty,
    ig = Ji.call(Object);
  function og(e) {
    if (!JE(e) || $E(e) != eg) return !1;
    var t = ZE(e);
    if (t === null) return !0;
    var r = ng.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && Ji.call(r) == ig;
  }
  eo.exports = og;
});
var to = c((Pr) => {
  "use strict";
  Object.defineProperty(Pr, "__esModule", { value: !0 });
  Pr.default = ag;
  function ag(e) {
    var t,
      r = e.Symbol;
    return (
      typeof r == "function"
        ? r.observable
          ? (t = r.observable)
          : ((t = r("observable")), (r.observable = t))
        : (t = "@@observable"),
      t
    );
  }
});
var ro = c((Fr, Mr) => {
  "use strict";
  Object.defineProperty(Fr, "__esModule", { value: !0 });
  var sg = to(),
    ug = cg(sg);
  function cg(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var me;
  typeof self < "u"
    ? (me = self)
    : typeof window < "u"
    ? (me = window)
    : typeof global < "u"
    ? (me = global)
    : typeof Mr < "u"
    ? (me = Mr)
    : (me = Function("return this")());
  var lg = (0, ug.default)(me);
  Fr.default = lg;
});
var Dr = c((ke) => {
  "use strict";
  ke.__esModule = !0;
  ke.ActionTypes = void 0;
  ke.default = ao;
  var fg = Lr(),
    pg = oo(fg),
    dg = ro(),
    no = oo(dg);
  function oo(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var io = (ke.ActionTypes = { INIT: "@@redux/INIT" });
  function ao(e, t, r) {
    var n;
    if (
      (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
      typeof r < "u")
    ) {
      if (typeof r != "function")
        throw new Error("Expected the enhancer to be a function.");
      return r(ao)(e, t);
    }
    if (typeof e != "function")
      throw new Error("Expected the reducer to be a function.");
    var i = e,
      o = t,
      a = [],
      s = a,
      u = !1;
    function l() {
      s === a && (s = a.slice());
    }
    function p() {
      return o;
    }
    function d(E) {
      if (typeof E != "function")
        throw new Error("Expected listener to be a function.");
      var I = !0;
      return (
        l(),
        s.push(E),
        function () {
          if (I) {
            (I = !1), l();
            var h = s.indexOf(E);
            s.splice(h, 1);
          }
        }
      );
    }
    function f(E) {
      if (!(0, pg.default)(E))
        throw new Error(
          "Actions must be plain objects. Use custom middleware for async actions."
        );
      if (typeof E.type > "u")
        throw new Error(
          'Actions may not have an undefined "type" property. Have you misspelled a constant?'
        );
      if (u) throw new Error("Reducers may not dispatch actions.");
      try {
        (u = !0), (o = i(o, E));
      } finally {
        u = !1;
      }
      for (var I = (a = s), g = 0; g < I.length; g++) I[g]();
      return E;
    }
    function y(E) {
      if (typeof E != "function")
        throw new Error("Expected the nextReducer to be a function.");
      (i = E), f({ type: io.INIT });
    }
    function _() {
      var E,
        I = d;
      return (
        (E = {
          subscribe: function (h) {
            if (typeof h != "object")
              throw new TypeError("Expected the observer to be an object.");
            function A() {
              h.next && h.next(p());
            }
            A();
            var m = I(A);
            return { unsubscribe: m };
          },
        }),
        (E[no.default] = function () {
          return this;
        }),
        E
      );
    }
    return (
      f({ type: io.INIT }),
      (n = { dispatch: f, subscribe: d, getState: p, replaceReducer: y }),
      (n[no.default] = _),
      n
    );
  }
});
var qr = c((wr) => {
  "use strict";
  wr.__esModule = !0;
  wr.default = Eg;
  function Eg(e) {
    typeof console < "u" &&
      typeof console.error == "function" &&
      console.error(e);
    try {
      throw new Error(e);
    } catch {}
  }
});
var co = c((Gr) => {
  "use strict";
  Gr.__esModule = !0;
  Gr.default = Tg;
  var so = Dr(),
    gg = Lr(),
    KM = uo(gg),
    yg = qr(),
    kM = uo(yg);
  function uo(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function _g(e, t) {
    var r = t && t.type,
      n = (r && '"' + r.toString() + '"') || "an action";
    return (
      "Given action " +
      n +
      ', reducer "' +
      e +
      '" returned undefined. To ignore an action, you must explicitly return the previous state.'
    );
  }
  function Ig(e) {
    Object.keys(e).forEach(function (t) {
      var r = e[t],
        n = r(void 0, { type: so.ActionTypes.INIT });
      if (typeof n > "u")
        throw new Error(
          'Reducer "' +
            t +
            '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
        );
      var i =
        "@@redux/PROBE_UNKNOWN_ACTION_" +
        Math.random().toString(36).substring(7).split("").join(".");
      if (typeof r(void 0, { type: i }) > "u")
        throw new Error(
          'Reducer "' +
            t +
            '" returned undefined when probed with a random type. ' +
            ("Don't try to handle " +
              so.ActionTypes.INIT +
              ' or other actions in "redux/*" ') +
            "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
        );
    });
  }
  function Tg(e) {
    for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
      var i = t[n];
      typeof e[i] == "function" && (r[i] = e[i]);
    }
    var o = Object.keys(r);
    if (!1) var a;
    var s;
    try {
      Ig(r);
    } catch (u) {
      s = u;
    }
    return function () {
      var l =
          arguments.length <= 0 || arguments[0] === void 0 ? {} : arguments[0],
        p = arguments[1];
      if (s) throw s;
      if (!1) var d;
      for (var f = !1, y = {}, _ = 0; _ < o.length; _++) {
        var E = o[_],
          I = r[E],
          g = l[E],
          h = I(g, p);
        if (typeof h > "u") {
          var A = _g(E, p);
          throw new Error(A);
        }
        (y[E] = h), (f = f || h !== g);
      }
      return f ? y : l;
    };
  }
});
var fo = c((Vr) => {
  "use strict";
  Vr.__esModule = !0;
  Vr.default = hg;
  function lo(e, t) {
    return function () {
      return t(e.apply(void 0, arguments));
    };
  }
  function hg(e, t) {
    if (typeof e == "function") return lo(e, t);
    if (typeof e != "object" || e === null)
      throw new Error(
        "bindActionCreators expected an object or a function, instead received " +
          (e === null ? "null" : typeof e) +
          '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
      );
    for (var r = Object.keys(e), n = {}, i = 0; i < r.length; i++) {
      var o = r[i],
        a = e[o];
      typeof a == "function" && (n[o] = lo(a, t));
    }
    return n;
  }
});
var Xr = c((Ur) => {
  "use strict";
  Ur.__esModule = !0;
  Ur.default = mg;
  function mg() {
    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    if (t.length === 0)
      return function (o) {
        return o;
      };
    if (t.length === 1) return t[0];
    var n = t[t.length - 1],
      i = t.slice(0, -1);
    return function () {
      return i.reduceRight(function (o, a) {
        return a(o);
      }, n.apply(void 0, arguments));
    };
  }
});
var po = c((Br) => {
  "use strict";
  Br.__esModule = !0;
  var Ag =
    Object.assign ||
    function (e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r)
          Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    };
  Br.default = bg;
  var vg = Xr(),
    Og = Sg(vg);
  function Sg(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function bg() {
    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return function (n) {
      return function (i, o, a) {
        var s = n(i, o, a),
          u = s.dispatch,
          l = [],
          p = {
            getState: s.getState,
            dispatch: function (f) {
              return u(f);
            },
          };
        return (
          (l = t.map(function (d) {
            return d(p);
          })),
          (u = Og.default.apply(void 0, l)(s.dispatch)),
          Ag({}, s, { dispatch: u })
        );
      };
    };
  }
});
var Hr = c((K) => {
  "use strict";
  K.__esModule = !0;
  K.compose =
    K.applyMiddleware =
    K.bindActionCreators =
    K.combineReducers =
    K.createStore =
      void 0;
  var Cg = Dr(),
    xg = Ae(Cg),
    Rg = co(),
    Ng = Ae(Rg),
    Lg = fo(),
    Pg = Ae(Lg),
    Mg = po(),
    Fg = Ae(Mg),
    Dg = Xr(),
    wg = Ae(Dg),
    qg = qr(),
    ZM = Ae(qg);
  function Ae(e) {
    return e && e.__esModule ? e : { default: e };
  }
  K.createStore = xg.default;
  K.combineReducers = Ng.default;
  K.bindActionCreators = Pg.default;
  K.applyMiddleware = Fg.default;
  K.compose = wg.default;
});
var z,
  Wr,
  Z,
  Gg,
  Vg,
  mt,
  Ug,
  jr = M(() => {
    "use strict";
    (z = {
      NAVBAR_OPEN: "NAVBAR_OPEN",
      NAVBAR_CLOSE: "NAVBAR_CLOSE",
      TAB_ACTIVE: "TAB_ACTIVE",
      TAB_INACTIVE: "TAB_INACTIVE",
      SLIDER_ACTIVE: "SLIDER_ACTIVE",
      SLIDER_INACTIVE: "SLIDER_INACTIVE",
      DROPDOWN_OPEN: "DROPDOWN_OPEN",
      DROPDOWN_CLOSE: "DROPDOWN_CLOSE",
      MOUSE_CLICK: "MOUSE_CLICK",
      MOUSE_SECOND_CLICK: "MOUSE_SECOND_CLICK",
      MOUSE_DOWN: "MOUSE_DOWN",
      MOUSE_UP: "MOUSE_UP",
      MOUSE_OVER: "MOUSE_OVER",
      MOUSE_OUT: "MOUSE_OUT",
      MOUSE_MOVE: "MOUSE_MOVE",
      MOUSE_MOVE_IN_VIEWPORT: "MOUSE_MOVE_IN_VIEWPORT",
      SCROLL_INTO_VIEW: "SCROLL_INTO_VIEW",
      SCROLL_OUT_OF_VIEW: "SCROLL_OUT_OF_VIEW",
      SCROLLING_IN_VIEW: "SCROLLING_IN_VIEW",
      ECOMMERCE_CART_OPEN: "ECOMMERCE_CART_OPEN",
      ECOMMERCE_CART_CLOSE: "ECOMMERCE_CART_CLOSE",
      PAGE_START: "PAGE_START",
      PAGE_FINISH: "PAGE_FINISH",
      PAGE_SCROLL_UP: "PAGE_SCROLL_UP",
      PAGE_SCROLL_DOWN: "PAGE_SCROLL_DOWN",
      PAGE_SCROLL: "PAGE_SCROLL",
    }),
      (Wr = { ELEMENT: "ELEMENT", CLASS: "CLASS", PAGE: "PAGE" }),
      (Z = { ELEMENT: "ELEMENT", VIEWPORT: "VIEWPORT" }),
      (Gg = { X_AXIS: "X_AXIS", Y_AXIS: "Y_AXIS" }),
      (Vg = {
        CHILDREN: "CHILDREN",
        SIBLINGS: "SIBLINGS",
        IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
      }),
      (mt = {
        FADE_EFFECT: "FADE_EFFECT",
        SLIDE_EFFECT: "SLIDE_EFFECT",
        GROW_EFFECT: "GROW_EFFECT",
        SHRINK_EFFECT: "SHRINK_EFFECT",
        SPIN_EFFECT: "SPIN_EFFECT",
        FLY_EFFECT: "FLY_EFFECT",
        POP_EFFECT: "POP_EFFECT",
        FLIP_EFFECT: "FLIP_EFFECT",
        JIGGLE_EFFECT: "JIGGLE_EFFECT",
        PULSE_EFFECT: "PULSE_EFFECT",
        DROP_EFFECT: "DROP_EFFECT",
        BLINK_EFFECT: "BLINK_EFFECT",
        BOUNCE_EFFECT: "BOUNCE_EFFECT",
        FLIP_LEFT_TO_RIGHT_EFFECT: "FLIP_LEFT_TO_RIGHT_EFFECT",
        FLIP_RIGHT_TO_LEFT_EFFECT: "FLIP_RIGHT_TO_LEFT_EFFECT",
        RUBBER_BAND_EFFECT: "RUBBER_BAND_EFFECT",
        JELLO_EFFECT: "JELLO_EFFECT",
        GROW_BIG_EFFECT: "GROW_BIG_EFFECT",
        SHRINK_BIG_EFFECT: "SHRINK_BIG_EFFECT",
        PLUGIN_LOTTIE_EFFECT: "PLUGIN_LOTTIE_EFFECT",
      }),
      (Ug = {
        LEFT: "LEFT",
        RIGHT: "RIGHT",
        BOTTOM: "BOTTOM",
        TOP: "TOP",
        BOTTOM_LEFT: "BOTTOM_LEFT",
        BOTTOM_RIGHT: "BOTTOM_RIGHT",
        TOP_RIGHT: "TOP_RIGHT",
        TOP_LEFT: "TOP_LEFT",
        CLOCKWISE: "CLOCKWISE",
        COUNTER_CLOCKWISE: "COUNTER_CLOCKWISE",
      });
  });
var B,
  Xg,
  At = M(() => {
    "use strict";
    (B = {
      TRANSFORM_MOVE: "TRANSFORM_MOVE",
      TRANSFORM_SCALE: "TRANSFORM_SCALE",
      TRANSFORM_ROTATE: "TRANSFORM_ROTATE",
      TRANSFORM_SKEW: "TRANSFORM_SKEW",
      STYLE_OPACITY: "STYLE_OPACITY",
      STYLE_SIZE: "STYLE_SIZE",
      STYLE_FILTER: "STYLE_FILTER",
      STYLE_FONT_VARIATION: "STYLE_FONT_VARIATION",
      STYLE_BACKGROUND_COLOR: "STYLE_BACKGROUND_COLOR",
      STYLE_BORDER: "STYLE_BORDER",
      STYLE_TEXT_COLOR: "STYLE_TEXT_COLOR",
      OBJECT_VALUE: "OBJECT_VALUE",
      PLUGIN_LOTTIE: "PLUGIN_LOTTIE",
      PLUGIN_SPLINE: "PLUGIN_SPLINE",
      PLUGIN_VARIABLE: "PLUGIN_VARIABLE",
      GENERAL_DISPLAY: "GENERAL_DISPLAY",
      GENERAL_START_ACTION: "GENERAL_START_ACTION",
      GENERAL_CONTINUOUS_ACTION: "GENERAL_CONTINUOUS_ACTION",
      GENERAL_COMBO_CLASS: "GENERAL_COMBO_CLASS",
      GENERAL_STOP_ACTION: "GENERAL_STOP_ACTION",
      GENERAL_LOOP: "GENERAL_LOOP",
      STYLE_BOX_SHADOW: "STYLE_BOX_SHADOW",
    }),
      (Xg = {
        ELEMENT: "ELEMENT",
        ELEMENT_CLASS: "ELEMENT_CLASS",
        TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
      });
  });
var Bg,
  Eo = M(() => {
    "use strict";
    Bg = {
      MOUSE_CLICK_INTERACTION: "MOUSE_CLICK_INTERACTION",
      MOUSE_HOVER_INTERACTION: "MOUSE_HOVER_INTERACTION",
      MOUSE_MOVE_INTERACTION: "MOUSE_MOVE_INTERACTION",
      SCROLL_INTO_VIEW_INTERACTION: "SCROLL_INTO_VIEW_INTERACTION",
      SCROLLING_IN_VIEW_INTERACTION: "SCROLLING_IN_VIEW_INTERACTION",
      MOUSE_MOVE_IN_VIEWPORT_INTERACTION: "MOUSE_MOVE_IN_VIEWPORT_INTERACTION",
      PAGE_IS_SCROLLING_INTERACTION: "PAGE_IS_SCROLLING_INTERACTION",
      PAGE_LOAD_INTERACTION: "PAGE_LOAD_INTERACTION",
      PAGE_SCROLLED_INTERACTION: "PAGE_SCROLLED_INTERACTION",
      NAVBAR_INTERACTION: "NAVBAR_INTERACTION",
      DROPDOWN_INTERACTION: "DROPDOWN_INTERACTION",
      ECOMMERCE_CART_INTERACTION: "ECOMMERCE_CART_INTERACTION",
      TAB_INTERACTION: "TAB_INTERACTION",
      SLIDER_INTERACTION: "SLIDER_INTERACTION",
    };
  });
var Hg,
  Wg,
  jg,
  Kg,
  kg,
  zg,
  Yg,
  Kr,
  go = M(() => {
    "use strict";
    At();
    ({
      TRANSFORM_MOVE: Hg,
      TRANSFORM_SCALE: Wg,
      TRANSFORM_ROTATE: jg,
      TRANSFORM_SKEW: Kg,
      STYLE_SIZE: kg,
      STYLE_FILTER: zg,
      STYLE_FONT_VARIATION: Yg,
    } = B),
      (Kr = {
        [Hg]: !0,
        [Wg]: !0,
        [jg]: !0,
        [Kg]: !0,
        [kg]: !0,
        [zg]: !0,
        [Yg]: !0,
      });
  });
var w = {};
X(w, {
  IX2_ACTION_LIST_PLAYBACK_CHANGED: () => py,
  IX2_ANIMATION_FRAME_CHANGED: () => ay,
  IX2_CLEAR_REQUESTED: () => ny,
  IX2_ELEMENT_STATE_CHANGED: () => fy,
  IX2_EVENT_LISTENER_ADDED: () => iy,
  IX2_EVENT_STATE_CHANGED: () => oy,
  IX2_INSTANCE_ADDED: () => uy,
  IX2_INSTANCE_REMOVED: () => ly,
  IX2_INSTANCE_STARTED: () => cy,
  IX2_MEDIA_QUERIES_DEFINED: () => Ey,
  IX2_PARAMETER_CHANGED: () => sy,
  IX2_PLAYBACK_REQUESTED: () => ty,
  IX2_PREVIEW_REQUESTED: () => ey,
  IX2_RAW_DATA_IMPORTED: () => Qg,
  IX2_SESSION_INITIALIZED: () => $g,
  IX2_SESSION_STARTED: () => Zg,
  IX2_SESSION_STOPPED: () => Jg,
  IX2_STOP_REQUESTED: () => ry,
  IX2_TEST_FRAME_RENDERED: () => gy,
  IX2_VIEWPORT_WIDTH_CHANGED: () => dy,
});
var Qg,
  $g,
  Zg,
  Jg,
  ey,
  ty,
  ry,
  ny,
  iy,
  oy,
  ay,
  sy,
  uy,
  cy,
  ly,
  fy,
  py,
  dy,
  Ey,
  gy,
  yo = M(() => {
    "use strict";
    (Qg = "IX2_RAW_DATA_IMPORTED"),
      ($g = "IX2_SESSION_INITIALIZED"),
      (Zg = "IX2_SESSION_STARTED"),
      (Jg = "IX2_SESSION_STOPPED"),
      (ey = "IX2_PREVIEW_REQUESTED"),
      (ty = "IX2_PLAYBACK_REQUESTED"),
      (ry = "IX2_STOP_REQUESTED"),
      (ny = "IX2_CLEAR_REQUESTED"),
      (iy = "IX2_EVENT_LISTENER_ADDED"),
      (oy = "IX2_EVENT_STATE_CHANGED"),
      (ay = "IX2_ANIMATION_FRAME_CHANGED"),
      (sy = "IX2_PARAMETER_CHANGED"),
      (uy = "IX2_INSTANCE_ADDED"),
      (cy = "IX2_INSTANCE_STARTED"),
      (ly = "IX2_INSTANCE_REMOVED"),
      (fy = "IX2_ELEMENT_STATE_CHANGED"),
      (py = "IX2_ACTION_LIST_PLAYBACK_CHANGED"),
      (dy = "IX2_VIEWPORT_WIDTH_CHANGED"),
      (Ey = "IX2_MEDIA_QUERIES_DEFINED"),
      (gy = "IX2_TEST_FRAME_RENDERED");
  });
var G = {};
X(G, {
  ABSTRACT_NODE: () => d_,
  AUTO: () => r_,
  BACKGROUND: () => Qy,
  BACKGROUND_COLOR: () => Yy,
  BAR_DELIMITER: () => o_,
  BORDER_COLOR: () => $y,
  BOUNDARY_SELECTOR: () => hy,
  CHILDREN: () => a_,
  COLON_DELIMITER: () => i_,
  COLOR: () => Zy,
  COMMA_DELIMITER: () => n_,
  CONFIG_UNIT: () => xy,
  CONFIG_VALUE: () => Oy,
  CONFIG_X_UNIT: () => Sy,
  CONFIG_X_VALUE: () => my,
  CONFIG_Y_UNIT: () => by,
  CONFIG_Y_VALUE: () => Ay,
  CONFIG_Z_UNIT: () => Cy,
  CONFIG_Z_VALUE: () => vy,
  DISPLAY: () => Jy,
  FILTER: () => jy,
  FLEX: () => e_,
  FONT_VARIATION_SETTINGS: () => Ky,
  HEIGHT: () => zy,
  HTML_ELEMENT: () => f_,
  IMMEDIATE_CHILDREN: () => s_,
  IX2_ID_DELIMITER: () => yy,
  OPACITY: () => Wy,
  PARENT: () => c_,
  PLAIN_OBJECT: () => p_,
  PRESERVE_3D: () => l_,
  RENDER_GENERAL: () => g_,
  RENDER_PLUGIN: () => __,
  RENDER_STYLE: () => y_,
  RENDER_TRANSFORM: () => E_,
  ROTATE_X: () => Gy,
  ROTATE_Y: () => Vy,
  ROTATE_Z: () => Uy,
  SCALE_3D: () => qy,
  SCALE_X: () => Fy,
  SCALE_Y: () => Dy,
  SCALE_Z: () => wy,
  SIBLINGS: () => u_,
  SKEW: () => Xy,
  SKEW_X: () => By,
  SKEW_Y: () => Hy,
  TRANSFORM: () => Ry,
  TRANSLATE_3D: () => My,
  TRANSLATE_X: () => Ny,
  TRANSLATE_Y: () => Ly,
  TRANSLATE_Z: () => Py,
  WF_PAGE: () => _y,
  WIDTH: () => ky,
  WILL_CHANGE: () => t_,
  W_MOD_IX: () => Ty,
  W_MOD_JS: () => Iy,
});
var yy,
  _y,
  Iy,
  Ty,
  hy,
  my,
  Ay,
  vy,
  Oy,
  Sy,
  by,
  Cy,
  xy,
  Ry,
  Ny,
  Ly,
  Py,
  My,
  Fy,
  Dy,
  wy,
  qy,
  Gy,
  Vy,
  Uy,
  Xy,
  By,
  Hy,
  Wy,
  jy,
  Ky,
  ky,
  zy,
  Yy,
  Qy,
  $y,
  Zy,
  Jy,
  e_,
  t_,
  r_,
  n_,
  i_,
  o_,
  a_,
  s_,
  u_,
  c_,
  l_,
  f_,
  p_,
  d_,
  E_,
  g_,
  y_,
  __,
  _o = M(() => {
    "use strict";
    (yy = "|"),
      (_y = "data-wf-page"),
      (Iy = "w-mod-js"),
      (Ty = "w-mod-ix"),
      (hy = ".w-dyn-item"),
      (my = "xValue"),
      (Ay = "yValue"),
      (vy = "zValue"),
      (Oy = "value"),
      (Sy = "xUnit"),
      (by = "yUnit"),
      (Cy = "zUnit"),
      (xy = "unit"),
      (Ry = "transform"),
      (Ny = "translateX"),
      (Ly = "translateY"),
      (Py = "translateZ"),
      (My = "translate3d"),
      (Fy = "scaleX"),
      (Dy = "scaleY"),
      (wy = "scaleZ"),
      (qy = "scale3d"),
      (Gy = "rotateX"),
      (Vy = "rotateY"),
      (Uy = "rotateZ"),
      (Xy = "skew"),
      (By = "skewX"),
      (Hy = "skewY"),
      (Wy = "opacity"),
      (jy = "filter"),
      (Ky = "font-variation-settings"),
      (ky = "width"),
      (zy = "height"),
      (Yy = "backgroundColor"),
      (Qy = "background"),
      ($y = "borderColor"),
      (Zy = "color"),
      (Jy = "display"),
      (e_ = "flex"),
      (t_ = "willChange"),
      (r_ = "AUTO"),
      (n_ = ","),
      (i_ = ":"),
      (o_ = "|"),
      (a_ = "CHILDREN"),
      (s_ = "IMMEDIATE_CHILDREN"),
      (u_ = "SIBLINGS"),
      (c_ = "PARENT"),
      (l_ = "preserve-3d"),
      (f_ = "HTML_ELEMENT"),
      (p_ = "PLAIN_OBJECT"),
      (d_ = "ABSTRACT_NODE"),
      (E_ = "RENDER_TRANSFORM"),
      (g_ = "RENDER_GENERAL"),
      (y_ = "RENDER_STYLE"),
      (__ = "RENDER_PLUGIN");
  });
var Io = {};
X(Io, {
  ActionAppliesTo: () => Xg,
  ActionTypeConsts: () => B,
  EventAppliesTo: () => Wr,
  EventBasedOn: () => Z,
  EventContinuousMouseAxes: () => Gg,
  EventLimitAffectedElements: () => Vg,
  EventTypeConsts: () => z,
  IX2EngineActionTypes: () => w,
  IX2EngineConstants: () => G,
  InteractionTypeConsts: () => Bg,
  QuickEffectDirectionConsts: () => Ug,
  QuickEffectIds: () => mt,
  ReducedMotionTypes: () => Kr,
});
var H = M(() => {
  "use strict";
  jr();
  At();
  Eo();
  go();
  yo();
  _o();
  At();
  jr();
});
var I_,
  To,
  ho = M(() => {
    "use strict";
    H();
    ({ IX2_RAW_DATA_IMPORTED: I_ } = w),
      (To = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case I_:
            return t.payload.ixData || Object.freeze({});
          default:
            return e;
        }
      });
  });
var ve = c((F) => {
  "use strict";
  Object.defineProperty(F, "__esModule", { value: !0 });
  var T_ =
    typeof Symbol == "function" && typeof Symbol.iterator == "symbol"
      ? function (e) {
          return typeof e;
        }
      : function (e) {
          return e &&
            typeof Symbol == "function" &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? "symbol"
            : typeof e;
        };
  F.clone = Ot;
  F.addLast = vo;
  F.addFirst = Oo;
  F.removeLast = So;
  F.removeFirst = bo;
  F.insert = Co;
  F.removeAt = xo;
  F.replaceAt = Ro;
  F.getIn = St;
  F.set = bt;
  F.setIn = Ct;
  F.update = Lo;
  F.updateIn = Po;
  F.merge = Mo;
  F.mergeDeep = Fo;
  F.mergeIn = Do;
  F.omit = wo;
  F.addDefaults = qo;
  var mo = "INVALID_ARGS";
  function Ao(e) {
    throw new Error(e);
  }
  function kr(e) {
    var t = Object.keys(e);
    return Object.getOwnPropertySymbols
      ? t.concat(Object.getOwnPropertySymbols(e))
      : t;
  }
  var h_ = {}.hasOwnProperty;
  function Ot(e) {
    if (Array.isArray(e)) return e.slice();
    for (var t = kr(e), r = {}, n = 0; n < t.length; n++) {
      var i = t[n];
      r[i] = e[i];
    }
    return r;
  }
  function W(e, t, r) {
    var n = r;
    n == null && Ao(mo);
    for (
      var i = !1, o = arguments.length, a = Array(o > 3 ? o - 3 : 0), s = 3;
      s < o;
      s++
    )
      a[s - 3] = arguments[s];
    for (var u = 0; u < a.length; u++) {
      var l = a[u];
      if (l != null) {
        var p = kr(l);
        if (p.length)
          for (var d = 0; d <= p.length; d++) {
            var f = p[d];
            if (!(e && n[f] !== void 0)) {
              var y = l[f];
              t && vt(n[f]) && vt(y) && (y = W(e, t, n[f], y)),
                !(y === void 0 || y === n[f]) &&
                  (i || ((i = !0), (n = Ot(n))), (n[f] = y));
            }
          }
      }
    }
    return n;
  }
  function vt(e) {
    var t = typeof e > "u" ? "undefined" : T_(e);
    return e != null && (t === "object" || t === "function");
  }
  function vo(e, t) {
    return Array.isArray(t) ? e.concat(t) : e.concat([t]);
  }
  function Oo(e, t) {
    return Array.isArray(t) ? t.concat(e) : [t].concat(e);
  }
  function So(e) {
    return e.length ? e.slice(0, e.length - 1) : e;
  }
  function bo(e) {
    return e.length ? e.slice(1) : e;
  }
  function Co(e, t, r) {
    return e
      .slice(0, t)
      .concat(Array.isArray(r) ? r : [r])
      .concat(e.slice(t));
  }
  function xo(e, t) {
    return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
  }
  function Ro(e, t, r) {
    if (e[t] === r) return e;
    for (var n = e.length, i = Array(n), o = 0; o < n; o++) i[o] = e[o];
    return (i[t] = r), i;
  }
  function St(e, t) {
    if ((!Array.isArray(t) && Ao(mo), e != null)) {
      for (var r = e, n = 0; n < t.length; n++) {
        var i = t[n];
        if (((r = r?.[i]), r === void 0)) return r;
      }
      return r;
    }
  }
  function bt(e, t, r) {
    var n = typeof t == "number" ? [] : {},
      i = e ?? n;
    if (i[t] === r) return i;
    var o = Ot(i);
    return (o[t] = r), o;
  }
  function No(e, t, r, n) {
    var i = void 0,
      o = t[n];
    if (n === t.length - 1) i = r;
    else {
      var a = vt(e) && vt(e[o]) ? e[o] : typeof t[n + 1] == "number" ? [] : {};
      i = No(a, t, r, n + 1);
    }
    return bt(e, o, i);
  }
  function Ct(e, t, r) {
    return t.length ? No(e, t, r, 0) : r;
  }
  function Lo(e, t, r) {
    var n = e?.[t],
      i = r(n);
    return bt(e, t, i);
  }
  function Po(e, t, r) {
    var n = St(e, t),
      i = r(n);
    return Ct(e, t, i);
  }
  function Mo(e, t, r, n, i, o) {
    for (
      var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
      u < a;
      u++
    )
      s[u - 6] = arguments[u];
    return s.length
      ? W.call.apply(W, [null, !1, !1, e, t, r, n, i, o].concat(s))
      : W(!1, !1, e, t, r, n, i, o);
  }
  function Fo(e, t, r, n, i, o) {
    for (
      var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
      u < a;
      u++
    )
      s[u - 6] = arguments[u];
    return s.length
      ? W.call.apply(W, [null, !1, !0, e, t, r, n, i, o].concat(s))
      : W(!1, !0, e, t, r, n, i, o);
  }
  function Do(e, t, r, n, i, o, a) {
    var s = St(e, t);
    s == null && (s = {});
    for (
      var u = void 0, l = arguments.length, p = Array(l > 7 ? l - 7 : 0), d = 7;
      d < l;
      d++
    )
      p[d - 7] = arguments[d];
    return (
      p.length
        ? (u = W.call.apply(W, [null, !1, !1, s, r, n, i, o, a].concat(p)))
        : (u = W(!1, !1, s, r, n, i, o, a)),
      Ct(e, t, u)
    );
  }
  function wo(e, t) {
    for (var r = Array.isArray(t) ? t : [t], n = !1, i = 0; i < r.length; i++)
      if (h_.call(e, r[i])) {
        n = !0;
        break;
      }
    if (!n) return e;
    for (var o = {}, a = kr(e), s = 0; s < a.length; s++) {
      var u = a[s];
      r.indexOf(u) >= 0 || (o[u] = e[u]);
    }
    return o;
  }
  function qo(e, t, r, n, i, o) {
    for (
      var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
      u < a;
      u++
    )
      s[u - 6] = arguments[u];
    return s.length
      ? W.call.apply(W, [null, !0, !1, e, t, r, n, i, o].concat(s))
      : W(!0, !1, e, t, r, n, i, o);
  }
  var m_ = {
    clone: Ot,
    addLast: vo,
    addFirst: Oo,
    removeLast: So,
    removeFirst: bo,
    insert: Co,
    removeAt: xo,
    replaceAt: Ro,
    getIn: St,
    set: bt,
    setIn: Ct,
    update: Lo,
    updateIn: Po,
    merge: Mo,
    mergeDeep: Fo,
    mergeIn: Do,
    omit: wo,
    addDefaults: qo,
  };
  F.default = m_;
});
var Vo,
  A_,
  v_,
  O_,
  S_,
  b_,
  Go,
  Uo,
  Xo = M(() => {
    "use strict";
    H();
    (Vo = R(ve())),
      ({
        IX2_PREVIEW_REQUESTED: A_,
        IX2_PLAYBACK_REQUESTED: v_,
        IX2_STOP_REQUESTED: O_,
        IX2_CLEAR_REQUESTED: S_,
      } = w),
      (b_ = { preview: {}, playback: {}, stop: {}, clear: {} }),
      (Go = Object.create(null, {
        [A_]: { value: "preview" },
        [v_]: { value: "playback" },
        [O_]: { value: "stop" },
        [S_]: { value: "clear" },
      })),
      (Uo = (e = b_, t) => {
        if (t.type in Go) {
          let r = [Go[t.type]];
          return (0, Vo.setIn)(e, [r], { ...t.payload });
        }
        return e;
      });
  });
var V,
  C_,
  x_,
  R_,
  N_,
  L_,
  P_,
  M_,
  F_,
  D_,
  w_,
  Bo,
  q_,
  Ho,
  Wo = M(() => {
    "use strict";
    H();
    (V = R(ve())),
      ({
        IX2_SESSION_INITIALIZED: C_,
        IX2_SESSION_STARTED: x_,
        IX2_TEST_FRAME_RENDERED: R_,
        IX2_SESSION_STOPPED: N_,
        IX2_EVENT_LISTENER_ADDED: L_,
        IX2_EVENT_STATE_CHANGED: P_,
        IX2_ANIMATION_FRAME_CHANGED: M_,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: F_,
        IX2_VIEWPORT_WIDTH_CHANGED: D_,
        IX2_MEDIA_QUERIES_DEFINED: w_,
      } = w),
      (Bo = {
        active: !1,
        tick: 0,
        eventListeners: [],
        eventState: {},
        playbackState: {},
        viewportWidth: 0,
        mediaQueryKey: null,
        hasBoundaryNodes: !1,
        hasDefinedMediaQueries: !1,
        reducedMotion: !1,
      }),
      (q_ = 20),
      (Ho = (e = Bo, t) => {
        switch (t.type) {
          case C_: {
            let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
            return (0, V.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
          }
          case x_:
            return (0, V.set)(e, "active", !0);
          case R_: {
            let {
              payload: { step: r = q_ },
            } = t;
            return (0, V.set)(e, "tick", e.tick + r);
          }
          case N_:
            return Bo;
          case M_: {
            let {
              payload: { now: r },
            } = t;
            return (0, V.set)(e, "tick", r);
          }
          case L_: {
            let r = (0, V.addLast)(e.eventListeners, t.payload);
            return (0, V.set)(e, "eventListeners", r);
          }
          case P_: {
            let { stateKey: r, newState: n } = t.payload;
            return (0, V.setIn)(e, ["eventState", r], n);
          }
          case F_: {
            let { actionListId: r, isPlaying: n } = t.payload;
            return (0, V.setIn)(e, ["playbackState", r], n);
          }
          case D_: {
            let { width: r, mediaQueries: n } = t.payload,
              i = n.length,
              o = null;
            for (let a = 0; a < i; a++) {
              let { key: s, min: u, max: l } = n[a];
              if (r >= u && r <= l) {
                o = s;
                break;
              }
            }
            return (0, V.merge)(e, { viewportWidth: r, mediaQueryKey: o });
          }
          case w_:
            return (0, V.set)(e, "hasDefinedMediaQueries", !0);
          default:
            return e;
        }
      });
  });
var Ko = c((IF, jo) => {
  function G_() {
    (this.__data__ = []), (this.size = 0);
  }
  jo.exports = G_;
});
var xt = c((TF, ko) => {
  function V_(e, t) {
    return e === t || (e !== e && t !== t);
  }
  ko.exports = V_;
});
var ze = c((hF, zo) => {
  var U_ = xt();
  function X_(e, t) {
    for (var r = e.length; r--; ) if (U_(e[r][0], t)) return r;
    return -1;
  }
  zo.exports = X_;
});
var Qo = c((mF, Yo) => {
  var B_ = ze(),
    H_ = Array.prototype,
    W_ = H_.splice;
  function j_(e) {
    var t = this.__data__,
      r = B_(t, e);
    if (r < 0) return !1;
    var n = t.length - 1;
    return r == n ? t.pop() : W_.call(t, r, 1), --this.size, !0;
  }
  Yo.exports = j_;
});
var Zo = c((AF, $o) => {
  var K_ = ze();
  function k_(e) {
    var t = this.__data__,
      r = K_(t, e);
    return r < 0 ? void 0 : t[r][1];
  }
  $o.exports = k_;
});
var ea = c((vF, Jo) => {
  var z_ = ze();
  function Y_(e) {
    return z_(this.__data__, e) > -1;
  }
  Jo.exports = Y_;
});
var ra = c((OF, ta) => {
  var Q_ = ze();
  function $_(e, t) {
    var r = this.__data__,
      n = Q_(r, e);
    return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
  }
  ta.exports = $_;
});
var Ye = c((SF, na) => {
  var Z_ = Ko(),
    J_ = Qo(),
    eI = Zo(),
    tI = ea(),
    rI = ra();
  function Oe(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Oe.prototype.clear = Z_;
  Oe.prototype.delete = J_;
  Oe.prototype.get = eI;
  Oe.prototype.has = tI;
  Oe.prototype.set = rI;
  na.exports = Oe;
});
var oa = c((bF, ia) => {
  var nI = Ye();
  function iI() {
    (this.__data__ = new nI()), (this.size = 0);
  }
  ia.exports = iI;
});
var sa = c((CF, aa) => {
  function oI(e) {
    var t = this.__data__,
      r = t.delete(e);
    return (this.size = t.size), r;
  }
  aa.exports = oI;
});
var ca = c((xF, ua) => {
  function aI(e) {
    return this.__data__.get(e);
  }
  ua.exports = aI;
});
var fa = c((RF, la) => {
  function sI(e) {
    return this.__data__.has(e);
  }
  la.exports = sI;
});
var J = c((NF, pa) => {
  function uI(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  pa.exports = uI;
});
var zr = c((LF, da) => {
  var cI = ue(),
    lI = J(),
    fI = "[object AsyncFunction]",
    pI = "[object Function]",
    dI = "[object GeneratorFunction]",
    EI = "[object Proxy]";
  function gI(e) {
    if (!lI(e)) return !1;
    var t = cI(e);
    return t == pI || t == dI || t == fI || t == EI;
  }
  da.exports = gI;
});
var ga = c((PF, Ea) => {
  var yI = k(),
    _I = yI["__core-js_shared__"];
  Ea.exports = _I;
});
var Ia = c((MF, _a) => {
  var Yr = ga(),
    ya = (function () {
      var e = /[^.]+$/.exec((Yr && Yr.keys && Yr.keys.IE_PROTO) || "");
      return e ? "Symbol(src)_1." + e : "";
    })();
  function II(e) {
    return !!ya && ya in e;
  }
  _a.exports = II;
});
var Qr = c((FF, Ta) => {
  var TI = Function.prototype,
    hI = TI.toString;
  function mI(e) {
    if (e != null) {
      try {
        return hI.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  }
  Ta.exports = mI;
});
var ma = c((DF, ha) => {
  var AI = zr(),
    vI = Ia(),
    OI = J(),
    SI = Qr(),
    bI = /[\\^$.*+?()[\]{}|]/g,
    CI = /^\[object .+?Constructor\]$/,
    xI = Function.prototype,
    RI = Object.prototype,
    NI = xI.toString,
    LI = RI.hasOwnProperty,
    PI = RegExp(
      "^" +
        NI.call(LI)
          .replace(bI, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
  function MI(e) {
    if (!OI(e) || vI(e)) return !1;
    var t = AI(e) ? PI : CI;
    return t.test(SI(e));
  }
  ha.exports = MI;
});
var va = c((wF, Aa) => {
  function FI(e, t) {
    return e?.[t];
  }
  Aa.exports = FI;
});
var ce = c((qF, Oa) => {
  var DI = ma(),
    wI = va();
  function qI(e, t) {
    var r = wI(e, t);
    return DI(r) ? r : void 0;
  }
  Oa.exports = qI;
});
var Rt = c((GF, Sa) => {
  var GI = ce(),
    VI = k(),
    UI = GI(VI, "Map");
  Sa.exports = UI;
});
var Qe = c((VF, ba) => {
  var XI = ce(),
    BI = XI(Object, "create");
  ba.exports = BI;
});
var Ra = c((UF, xa) => {
  var Ca = Qe();
  function HI() {
    (this.__data__ = Ca ? Ca(null) : {}), (this.size = 0);
  }
  xa.exports = HI;
});
var La = c((XF, Na) => {
  function WI(e) {
    var t = this.has(e) && delete this.__data__[e];
    return (this.size -= t ? 1 : 0), t;
  }
  Na.exports = WI;
});
var Ma = c((BF, Pa) => {
  var jI = Qe(),
    KI = "__lodash_hash_undefined__",
    kI = Object.prototype,
    zI = kI.hasOwnProperty;
  function YI(e) {
    var t = this.__data__;
    if (jI) {
      var r = t[e];
      return r === KI ? void 0 : r;
    }
    return zI.call(t, e) ? t[e] : void 0;
  }
  Pa.exports = YI;
});
var Da = c((HF, Fa) => {
  var QI = Qe(),
    $I = Object.prototype,
    ZI = $I.hasOwnProperty;
  function JI(e) {
    var t = this.__data__;
    return QI ? t[e] !== void 0 : ZI.call(t, e);
  }
  Fa.exports = JI;
});
var qa = c((WF, wa) => {
  var eT = Qe(),
    tT = "__lodash_hash_undefined__";
  function rT(e, t) {
    var r = this.__data__;
    return (
      (this.size += this.has(e) ? 0 : 1),
      (r[e] = eT && t === void 0 ? tT : t),
      this
    );
  }
  wa.exports = rT;
});
var Va = c((jF, Ga) => {
  var nT = Ra(),
    iT = La(),
    oT = Ma(),
    aT = Da(),
    sT = qa();
  function Se(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Se.prototype.clear = nT;
  Se.prototype.delete = iT;
  Se.prototype.get = oT;
  Se.prototype.has = aT;
  Se.prototype.set = sT;
  Ga.exports = Se;
});
var Ba = c((KF, Xa) => {
  var Ua = Va(),
    uT = Ye(),
    cT = Rt();
  function lT() {
    (this.size = 0),
      (this.__data__ = {
        hash: new Ua(),
        map: new (cT || uT)(),
        string: new Ua(),
      });
  }
  Xa.exports = lT;
});
var Wa = c((kF, Ha) => {
  function fT(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  }
  Ha.exports = fT;
});
var $e = c((zF, ja) => {
  var pT = Wa();
  function dT(e, t) {
    var r = e.__data__;
    return pT(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
  }
  ja.exports = dT;
});
var ka = c((YF, Ka) => {
  var ET = $e();
  function gT(e) {
    var t = ET(this, e).delete(e);
    return (this.size -= t ? 1 : 0), t;
  }
  Ka.exports = gT;
});
var Ya = c((QF, za) => {
  var yT = $e();
  function _T(e) {
    return yT(this, e).get(e);
  }
  za.exports = _T;
});
var $a = c(($F, Qa) => {
  var IT = $e();
  function TT(e) {
    return IT(this, e).has(e);
  }
  Qa.exports = TT;
});
var Ja = c((ZF, Za) => {
  var hT = $e();
  function mT(e, t) {
    var r = hT(this, e),
      n = r.size;
    return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
  }
  Za.exports = mT;
});
var Nt = c((JF, es) => {
  var AT = Ba(),
    vT = ka(),
    OT = Ya(),
    ST = $a(),
    bT = Ja();
  function be(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  be.prototype.clear = AT;
  be.prototype.delete = vT;
  be.prototype.get = OT;
  be.prototype.has = ST;
  be.prototype.set = bT;
  es.exports = be;
});
var rs = c((eD, ts) => {
  var CT = Ye(),
    xT = Rt(),
    RT = Nt(),
    NT = 200;
  function LT(e, t) {
    var r = this.__data__;
    if (r instanceof CT) {
      var n = r.__data__;
      if (!xT || n.length < NT - 1)
        return n.push([e, t]), (this.size = ++r.size), this;
      r = this.__data__ = new RT(n);
    }
    return r.set(e, t), (this.size = r.size), this;
  }
  ts.exports = LT;
});
var $r = c((tD, ns) => {
  var PT = Ye(),
    MT = oa(),
    FT = sa(),
    DT = ca(),
    wT = fa(),
    qT = rs();
  function Ce(e) {
    var t = (this.__data__ = new PT(e));
    this.size = t.size;
  }
  Ce.prototype.clear = MT;
  Ce.prototype.delete = FT;
  Ce.prototype.get = DT;
  Ce.prototype.has = wT;
  Ce.prototype.set = qT;
  ns.exports = Ce;
});
var os = c((rD, is) => {
  var GT = "__lodash_hash_undefined__";
  function VT(e) {
    return this.__data__.set(e, GT), this;
  }
  is.exports = VT;
});
var ss = c((nD, as) => {
  function UT(e) {
    return this.__data__.has(e);
  }
  as.exports = UT;
});
var cs = c((iD, us) => {
  var XT = Nt(),
    BT = os(),
    HT = ss();
  function Lt(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.__data__ = new XT(); ++t < r; ) this.add(e[t]);
  }
  Lt.prototype.add = Lt.prototype.push = BT;
  Lt.prototype.has = HT;
  us.exports = Lt;
});
var fs = c((oD, ls) => {
  function WT(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
      if (t(e[r], r, e)) return !0;
    return !1;
  }
  ls.exports = WT;
});
var ds = c((aD, ps) => {
  function jT(e, t) {
    return e.has(t);
  }
  ps.exports = jT;
});
var Zr = c((sD, Es) => {
  var KT = cs(),
    kT = fs(),
    zT = ds(),
    YT = 1,
    QT = 2;
  function $T(e, t, r, n, i, o) {
    var a = r & YT,
      s = e.length,
      u = t.length;
    if (s != u && !(a && u > s)) return !1;
    var l = o.get(e),
      p = o.get(t);
    if (l && p) return l == t && p == e;
    var d = -1,
      f = !0,
      y = r & QT ? new KT() : void 0;
    for (o.set(e, t), o.set(t, e); ++d < s; ) {
      var _ = e[d],
        E = t[d];
      if (n) var I = a ? n(E, _, d, t, e, o) : n(_, E, d, e, t, o);
      if (I !== void 0) {
        if (I) continue;
        f = !1;
        break;
      }
      if (y) {
        if (
          !kT(t, function (g, h) {
            if (!zT(y, h) && (_ === g || i(_, g, r, n, o))) return y.push(h);
          })
        ) {
          f = !1;
          break;
        }
      } else if (!(_ === E || i(_, E, r, n, o))) {
        f = !1;
        break;
      }
    }
    return o.delete(e), o.delete(t), f;
  }
  Es.exports = $T;
});
var ys = c((uD, gs) => {
  var ZT = k(),
    JT = ZT.Uint8Array;
  gs.exports = JT;
});
var Is = c((cD, _s) => {
  function eh(e) {
    var t = -1,
      r = Array(e.size);
    return (
      e.forEach(function (n, i) {
        r[++t] = [i, n];
      }),
      r
    );
  }
  _s.exports = eh;
});
var hs = c((lD, Ts) => {
  function th(e) {
    var t = -1,
      r = Array(e.size);
    return (
      e.forEach(function (n) {
        r[++t] = n;
      }),
      r
    );
  }
  Ts.exports = th;
});
var Ss = c((fD, Os) => {
  var ms = he(),
    As = ys(),
    rh = xt(),
    nh = Zr(),
    ih = Is(),
    oh = hs(),
    ah = 1,
    sh = 2,
    uh = "[object Boolean]",
    ch = "[object Date]",
    lh = "[object Error]",
    fh = "[object Map]",
    ph = "[object Number]",
    dh = "[object RegExp]",
    Eh = "[object Set]",
    gh = "[object String]",
    yh = "[object Symbol]",
    _h = "[object ArrayBuffer]",
    Ih = "[object DataView]",
    vs = ms ? ms.prototype : void 0,
    Jr = vs ? vs.valueOf : void 0;
  function Th(e, t, r, n, i, o, a) {
    switch (r) {
      case Ih:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
          return !1;
        (e = e.buffer), (t = t.buffer);
      case _h:
        return !(e.byteLength != t.byteLength || !o(new As(e), new As(t)));
      case uh:
      case ch:
      case ph:
        return rh(+e, +t);
      case lh:
        return e.name == t.name && e.message == t.message;
      case dh:
      case gh:
        return e == t + "";
      case fh:
        var s = ih;
      case Eh:
        var u = n & ah;
        if ((s || (s = oh), e.size != t.size && !u)) return !1;
        var l = a.get(e);
        if (l) return l == t;
        (n |= sh), a.set(e, t);
        var p = nh(s(e), s(t), n, i, o, a);
        return a.delete(e), p;
      case yh:
        if (Jr) return Jr.call(e) == Jr.call(t);
    }
    return !1;
  }
  Os.exports = Th;
});
var Pt = c((pD, bs) => {
  function hh(e, t) {
    for (var r = -1, n = t.length, i = e.length; ++r < n; ) e[i + r] = t[r];
    return e;
  }
  bs.exports = hh;
});
var q = c((dD, Cs) => {
  var mh = Array.isArray;
  Cs.exports = mh;
});
var en = c((ED, xs) => {
  var Ah = Pt(),
    vh = q();
  function Oh(e, t, r) {
    var n = t(e);
    return vh(e) ? n : Ah(n, r(e));
  }
  xs.exports = Oh;
});
var Ns = c((gD, Rs) => {
  function Sh(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, i = 0, o = []; ++r < n; ) {
      var a = e[r];
      t(a, r, e) && (o[i++] = a);
    }
    return o;
  }
  Rs.exports = Sh;
});
var tn = c((yD, Ls) => {
  function bh() {
    return [];
  }
  Ls.exports = bh;
});
var rn = c((_D, Ms) => {
  var Ch = Ns(),
    xh = tn(),
    Rh = Object.prototype,
    Nh = Rh.propertyIsEnumerable,
    Ps = Object.getOwnPropertySymbols,
    Lh = Ps
      ? function (e) {
          return e == null
            ? []
            : ((e = Object(e)),
              Ch(Ps(e), function (t) {
                return Nh.call(e, t);
              }));
        }
      : xh;
  Ms.exports = Lh;
});
var Ds = c((ID, Fs) => {
  function Ph(e, t) {
    for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
    return n;
  }
  Fs.exports = Ph;
});
var qs = c((TD, ws) => {
  var Mh = ue(),
    Fh = ne(),
    Dh = "[object Arguments]";
  function wh(e) {
    return Fh(e) && Mh(e) == Dh;
  }
  ws.exports = wh;
});
var Ze = c((hD, Us) => {
  var Gs = qs(),
    qh = ne(),
    Vs = Object.prototype,
    Gh = Vs.hasOwnProperty,
    Vh = Vs.propertyIsEnumerable,
    Uh = Gs(
      (function () {
        return arguments;
      })()
    )
      ? Gs
      : function (e) {
          return qh(e) && Gh.call(e, "callee") && !Vh.call(e, "callee");
        };
  Us.exports = Uh;
});
var Bs = c((mD, Xs) => {
  function Xh() {
    return !1;
  }
  Xs.exports = Xh;
});
var Mt = c((Je, xe) => {
  var Bh = k(),
    Hh = Bs(),
    js = typeof Je == "object" && Je && !Je.nodeType && Je,
    Hs = js && typeof xe == "object" && xe && !xe.nodeType && xe,
    Wh = Hs && Hs.exports === js,
    Ws = Wh ? Bh.Buffer : void 0,
    jh = Ws ? Ws.isBuffer : void 0,
    Kh = jh || Hh;
  xe.exports = Kh;
});
var Ft = c((AD, Ks) => {
  var kh = 9007199254740991,
    zh = /^(?:0|[1-9]\d*)$/;
  function Yh(e, t) {
    var r = typeof e;
    return (
      (t = t ?? kh),
      !!t &&
        (r == "number" || (r != "symbol" && zh.test(e))) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
    );
  }
  Ks.exports = Yh;
});
var Dt = c((vD, ks) => {
  var Qh = 9007199254740991;
  function $h(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Qh;
  }
  ks.exports = $h;
});
var Ys = c((OD, zs) => {
  var Zh = ue(),
    Jh = Dt(),
    em = ne(),
    tm = "[object Arguments]",
    rm = "[object Array]",
    nm = "[object Boolean]",
    im = "[object Date]",
    om = "[object Error]",
    am = "[object Function]",
    sm = "[object Map]",
    um = "[object Number]",
    cm = "[object Object]",
    lm = "[object RegExp]",
    fm = "[object Set]",
    pm = "[object String]",
    dm = "[object WeakMap]",
    Em = "[object ArrayBuffer]",
    gm = "[object DataView]",
    ym = "[object Float32Array]",
    _m = "[object Float64Array]",
    Im = "[object Int8Array]",
    Tm = "[object Int16Array]",
    hm = "[object Int32Array]",
    mm = "[object Uint8Array]",
    Am = "[object Uint8ClampedArray]",
    vm = "[object Uint16Array]",
    Om = "[object Uint32Array]",
    P = {};
  P[ym] = P[_m] = P[Im] = P[Tm] = P[hm] = P[mm] = P[Am] = P[vm] = P[Om] = !0;
  P[tm] =
    P[rm] =
    P[Em] =
    P[nm] =
    P[gm] =
    P[im] =
    P[om] =
    P[am] =
    P[sm] =
    P[um] =
    P[cm] =
    P[lm] =
    P[fm] =
    P[pm] =
    P[dm] =
      !1;
  function Sm(e) {
    return em(e) && Jh(e.length) && !!P[Zh(e)];
  }
  zs.exports = Sm;
});
var $s = c((SD, Qs) => {
  function bm(e) {
    return function (t) {
      return e(t);
    };
  }
  Qs.exports = bm;
});
var Js = c((et, Re) => {
  var Cm = xr(),
    Zs = typeof et == "object" && et && !et.nodeType && et,
    tt = Zs && typeof Re == "object" && Re && !Re.nodeType && Re,
    xm = tt && tt.exports === Zs,
    nn = xm && Cm.process,
    Rm = (function () {
      try {
        var e = tt && tt.require && tt.require("util").types;
        return e || (nn && nn.binding && nn.binding("util"));
      } catch {}
    })();
  Re.exports = Rm;
});
var wt = c((bD, ru) => {
  var Nm = Ys(),
    Lm = $s(),
    eu = Js(),
    tu = eu && eu.isTypedArray,
    Pm = tu ? Lm(tu) : Nm;
  ru.exports = Pm;
});
var on = c((CD, nu) => {
  var Mm = Ds(),
    Fm = Ze(),
    Dm = q(),
    wm = Mt(),
    qm = Ft(),
    Gm = wt(),
    Vm = Object.prototype,
    Um = Vm.hasOwnProperty;
  function Xm(e, t) {
    var r = Dm(e),
      n = !r && Fm(e),
      i = !r && !n && wm(e),
      o = !r && !n && !i && Gm(e),
      a = r || n || i || o,
      s = a ? Mm(e.length, String) : [],
      u = s.length;
    for (var l in e)
      (t || Um.call(e, l)) &&
        !(
          a &&
          (l == "length" ||
            (i && (l == "offset" || l == "parent")) ||
            (o && (l == "buffer" || l == "byteLength" || l == "byteOffset")) ||
            qm(l, u))
        ) &&
        s.push(l);
    return s;
  }
  nu.exports = Xm;
});
var qt = c((xD, iu) => {
  var Bm = Object.prototype;
  function Hm(e) {
    var t = e && e.constructor,
      r = (typeof t == "function" && t.prototype) || Bm;
    return e === r;
  }
  iu.exports = Hm;
});
var au = c((RD, ou) => {
  var Wm = Rr(),
    jm = Wm(Object.keys, Object);
  ou.exports = jm;
});
var Gt = c((ND, su) => {
  var Km = qt(),
    km = au(),
    zm = Object.prototype,
    Ym = zm.hasOwnProperty;
  function Qm(e) {
    if (!Km(e)) return km(e);
    var t = [];
    for (var r in Object(e)) Ym.call(e, r) && r != "constructor" && t.push(r);
    return t;
  }
  su.exports = Qm;
});
var de = c((LD, uu) => {
  var $m = zr(),
    Zm = Dt();
  function Jm(e) {
    return e != null && Zm(e.length) && !$m(e);
  }
  uu.exports = Jm;
});
var rt = c((PD, cu) => {
  var eA = on(),
    tA = Gt(),
    rA = de();
  function nA(e) {
    return rA(e) ? eA(e) : tA(e);
  }
  cu.exports = nA;
});
var fu = c((MD, lu) => {
  var iA = en(),
    oA = rn(),
    aA = rt();
  function sA(e) {
    return iA(e, aA, oA);
  }
  lu.exports = sA;
});
var Eu = c((FD, du) => {
  var pu = fu(),
    uA = 1,
    cA = Object.prototype,
    lA = cA.hasOwnProperty;
  function fA(e, t, r, n, i, o) {
    var a = r & uA,
      s = pu(e),
      u = s.length,
      l = pu(t),
      p = l.length;
    if (u != p && !a) return !1;
    for (var d = u; d--; ) {
      var f = s[d];
      if (!(a ? f in t : lA.call(t, f))) return !1;
    }
    var y = o.get(e),
      _ = o.get(t);
    if (y && _) return y == t && _ == e;
    var E = !0;
    o.set(e, t), o.set(t, e);
    for (var I = a; ++d < u; ) {
      f = s[d];
      var g = e[f],
        h = t[f];
      if (n) var A = a ? n(h, g, f, t, e, o) : n(g, h, f, e, t, o);
      if (!(A === void 0 ? g === h || i(g, h, r, n, o) : A)) {
        E = !1;
        break;
      }
      I || (I = f == "constructor");
    }
    if (E && !I) {
      var m = e.constructor,
        b = t.constructor;
      m != b &&
        "constructor" in e &&
        "constructor" in t &&
        !(
          typeof m == "function" &&
          m instanceof m &&
          typeof b == "function" &&
          b instanceof b
        ) &&
        (E = !1);
    }
    return o.delete(e), o.delete(t), E;
  }
  du.exports = fA;
});
var yu = c((DD, gu) => {
  var pA = ce(),
    dA = k(),
    EA = pA(dA, "DataView");
  gu.exports = EA;
});
var Iu = c((wD, _u) => {
  var gA = ce(),
    yA = k(),
    _A = gA(yA, "Promise");
  _u.exports = _A;
});
var hu = c((qD, Tu) => {
  var IA = ce(),
    TA = k(),
    hA = IA(TA, "Set");
  Tu.exports = hA;
});
var an = c((GD, mu) => {
  var mA = ce(),
    AA = k(),
    vA = mA(AA, "WeakMap");
  mu.exports = vA;
});
var Vt = c((VD, xu) => {
  var sn = yu(),
    un = Rt(),
    cn = Iu(),
    ln = hu(),
    fn = an(),
    Cu = ue(),
    Ne = Qr(),
    Au = "[object Map]",
    OA = "[object Object]",
    vu = "[object Promise]",
    Ou = "[object Set]",
    Su = "[object WeakMap]",
    bu = "[object DataView]",
    SA = Ne(sn),
    bA = Ne(un),
    CA = Ne(cn),
    xA = Ne(ln),
    RA = Ne(fn),
    Ee = Cu;
  ((sn && Ee(new sn(new ArrayBuffer(1))) != bu) ||
    (un && Ee(new un()) != Au) ||
    (cn && Ee(cn.resolve()) != vu) ||
    (ln && Ee(new ln()) != Ou) ||
    (fn && Ee(new fn()) != Su)) &&
    (Ee = function (e) {
      var t = Cu(e),
        r = t == OA ? e.constructor : void 0,
        n = r ? Ne(r) : "";
      if (n)
        switch (n) {
          case SA:
            return bu;
          case bA:
            return Au;
          case CA:
            return vu;
          case xA:
            return Ou;
          case RA:
            return Su;
        }
      return t;
    });
  xu.exports = Ee;
});
var wu = c((UD, Du) => {
  var pn = $r(),
    NA = Zr(),
    LA = Ss(),
    PA = Eu(),
    Ru = Vt(),
    Nu = q(),
    Lu = Mt(),
    MA = wt(),
    FA = 1,
    Pu = "[object Arguments]",
    Mu = "[object Array]",
    Ut = "[object Object]",
    DA = Object.prototype,
    Fu = DA.hasOwnProperty;
  function wA(e, t, r, n, i, o) {
    var a = Nu(e),
      s = Nu(t),
      u = a ? Mu : Ru(e),
      l = s ? Mu : Ru(t);
    (u = u == Pu ? Ut : u), (l = l == Pu ? Ut : l);
    var p = u == Ut,
      d = l == Ut,
      f = u == l;
    if (f && Lu(e)) {
      if (!Lu(t)) return !1;
      (a = !0), (p = !1);
    }
    if (f && !p)
      return (
        o || (o = new pn()),
        a || MA(e) ? NA(e, t, r, n, i, o) : LA(e, t, u, r, n, i, o)
      );
    if (!(r & FA)) {
      var y = p && Fu.call(e, "__wrapped__"),
        _ = d && Fu.call(t, "__wrapped__");
      if (y || _) {
        var E = y ? e.value() : e,
          I = _ ? t.value() : t;
        return o || (o = new pn()), i(E, I, r, n, o);
      }
    }
    return f ? (o || (o = new pn()), PA(e, t, r, n, i, o)) : !1;
  }
  Du.exports = wA;
});
var dn = c((XD, Vu) => {
  var qA = wu(),
    qu = ne();
  function Gu(e, t, r, n, i) {
    return e === t
      ? !0
      : e == null || t == null || (!qu(e) && !qu(t))
      ? e !== e && t !== t
      : qA(e, t, r, n, Gu, i);
  }
  Vu.exports = Gu;
});
var Xu = c((BD, Uu) => {
  var GA = $r(),
    VA = dn(),
    UA = 1,
    XA = 2;
  function BA(e, t, r, n) {
    var i = r.length,
      o = i,
      a = !n;
    if (e == null) return !o;
    for (e = Object(e); i--; ) {
      var s = r[i];
      if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
    }
    for (; ++i < o; ) {
      s = r[i];
      var u = s[0],
        l = e[u],
        p = s[1];
      if (a && s[2]) {
        if (l === void 0 && !(u in e)) return !1;
      } else {
        var d = new GA();
        if (n) var f = n(l, p, u, e, t, d);
        if (!(f === void 0 ? VA(p, l, UA | XA, n, d) : f)) return !1;
      }
    }
    return !0;
  }
  Uu.exports = BA;
});
var En = c((HD, Bu) => {
  var HA = J();
  function WA(e) {
    return e === e && !HA(e);
  }
  Bu.exports = WA;
});
var Wu = c((WD, Hu) => {
  var jA = En(),
    KA = rt();
  function kA(e) {
    for (var t = KA(e), r = t.length; r--; ) {
      var n = t[r],
        i = e[n];
      t[r] = [n, i, jA(i)];
    }
    return t;
  }
  Hu.exports = kA;
});
var gn = c((jD, ju) => {
  function zA(e, t) {
    return function (r) {
      return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
    };
  }
  ju.exports = zA;
});
var ku = c((KD, Ku) => {
  var YA = Xu(),
    QA = Wu(),
    $A = gn();
  function ZA(e) {
    var t = QA(e);
    return t.length == 1 && t[0][2]
      ? $A(t[0][0], t[0][1])
      : function (r) {
          return r === e || YA(r, e, t);
        };
  }
  Ku.exports = ZA;
});
var nt = c((kD, zu) => {
  var JA = ue(),
    ev = ne(),
    tv = "[object Symbol]";
  function rv(e) {
    return typeof e == "symbol" || (ev(e) && JA(e) == tv);
  }
  zu.exports = rv;
});
var Xt = c((zD, Yu) => {
  var nv = q(),
    iv = nt(),
    ov = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    av = /^\w*$/;
  function sv(e, t) {
    if (nv(e)) return !1;
    var r = typeof e;
    return r == "number" ||
      r == "symbol" ||
      r == "boolean" ||
      e == null ||
      iv(e)
      ? !0
      : av.test(e) || !ov.test(e) || (t != null && e in Object(t));
  }
  Yu.exports = sv;
});
var Zu = c((YD, $u) => {
  var Qu = Nt(),
    uv = "Expected a function";
  function yn(e, t) {
    if (typeof e != "function" || (t != null && typeof t != "function"))
      throw new TypeError(uv);
    var r = function () {
      var n = arguments,
        i = t ? t.apply(this, n) : n[0],
        o = r.cache;
      if (o.has(i)) return o.get(i);
      var a = e.apply(this, n);
      return (r.cache = o.set(i, a) || o), a;
    };
    return (r.cache = new (yn.Cache || Qu)()), r;
  }
  yn.Cache = Qu;
  $u.exports = yn;
});
var ec = c((QD, Ju) => {
  var cv = Zu(),
    lv = 500;
  function fv(e) {
    var t = cv(e, function (n) {
        return r.size === lv && r.clear(), n;
      }),
      r = t.cache;
    return t;
  }
  Ju.exports = fv;
});
var rc = c(($D, tc) => {
  var pv = ec(),
    dv =
      /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    Ev = /\\(\\)?/g,
    gv = pv(function (e) {
      var t = [];
      return (
        e.charCodeAt(0) === 46 && t.push(""),
        e.replace(dv, function (r, n, i, o) {
          t.push(i ? o.replace(Ev, "$1") : n || r);
        }),
        t
      );
    });
  tc.exports = gv;
});
var _n = c((ZD, nc) => {
  function yv(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, i = Array(n); ++r < n; )
      i[r] = t(e[r], r, e);
    return i;
  }
  nc.exports = yv;
});
var cc = c((JD, uc) => {
  var ic = he(),
    _v = _n(),
    Iv = q(),
    Tv = nt(),
    hv = 1 / 0,
    oc = ic ? ic.prototype : void 0,
    ac = oc ? oc.toString : void 0;
  function sc(e) {
    if (typeof e == "string") return e;
    if (Iv(e)) return _v(e, sc) + "";
    if (Tv(e)) return ac ? ac.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -hv ? "-0" : t;
  }
  uc.exports = sc;
});
var fc = c((ew, lc) => {
  var mv = cc();
  function Av(e) {
    return e == null ? "" : mv(e);
  }
  lc.exports = Av;
});
var it = c((tw, pc) => {
  var vv = q(),
    Ov = Xt(),
    Sv = rc(),
    bv = fc();
  function Cv(e, t) {
    return vv(e) ? e : Ov(e, t) ? [e] : Sv(bv(e));
  }
  pc.exports = Cv;
});
var Le = c((rw, dc) => {
  var xv = nt(),
    Rv = 1 / 0;
  function Nv(e) {
    if (typeof e == "string" || xv(e)) return e;
    var t = e + "";
    return t == "0" && 1 / e == -Rv ? "-0" : t;
  }
  dc.exports = Nv;
});
var Bt = c((nw, Ec) => {
  var Lv = it(),
    Pv = Le();
  function Mv(e, t) {
    t = Lv(t, e);
    for (var r = 0, n = t.length; e != null && r < n; ) e = e[Pv(t[r++])];
    return r && r == n ? e : void 0;
  }
  Ec.exports = Mv;
});
var Ht = c((iw, gc) => {
  var Fv = Bt();
  function Dv(e, t, r) {
    var n = e == null ? void 0 : Fv(e, t);
    return n === void 0 ? r : n;
  }
  gc.exports = Dv;
});
var _c = c((ow, yc) => {
  function wv(e, t) {
    return e != null && t in Object(e);
  }
  yc.exports = wv;
});
var Tc = c((aw, Ic) => {
  var qv = it(),
    Gv = Ze(),
    Vv = q(),
    Uv = Ft(),
    Xv = Dt(),
    Bv = Le();
  function Hv(e, t, r) {
    t = qv(t, e);
    for (var n = -1, i = t.length, o = !1; ++n < i; ) {
      var a = Bv(t[n]);
      if (!(o = e != null && r(e, a))) break;
      e = e[a];
    }
    return o || ++n != i
      ? o
      : ((i = e == null ? 0 : e.length),
        !!i && Xv(i) && Uv(a, i) && (Vv(e) || Gv(e)));
  }
  Ic.exports = Hv;
});
var mc = c((sw, hc) => {
  var Wv = _c(),
    jv = Tc();
  function Kv(e, t) {
    return e != null && jv(e, t, Wv);
  }
  hc.exports = Kv;
});
var vc = c((uw, Ac) => {
  var kv = dn(),
    zv = Ht(),
    Yv = mc(),
    Qv = Xt(),
    $v = En(),
    Zv = gn(),
    Jv = Le(),
    eO = 1,
    tO = 2;
  function rO(e, t) {
    return Qv(e) && $v(t)
      ? Zv(Jv(e), t)
      : function (r) {
          var n = zv(r, e);
          return n === void 0 && n === t ? Yv(r, e) : kv(t, n, eO | tO);
        };
  }
  Ac.exports = rO;
});
var Wt = c((cw, Oc) => {
  function nO(e) {
    return e;
  }
  Oc.exports = nO;
});
var In = c((lw, Sc) => {
  function iO(e) {
    return function (t) {
      return t?.[e];
    };
  }
  Sc.exports = iO;
});
var Cc = c((fw, bc) => {
  var oO = Bt();
  function aO(e) {
    return function (t) {
      return oO(t, e);
    };
  }
  bc.exports = aO;
});
var Rc = c((pw, xc) => {
  var sO = In(),
    uO = Cc(),
    cO = Xt(),
    lO = Le();
  function fO(e) {
    return cO(e) ? sO(lO(e)) : uO(e);
  }
  xc.exports = fO;
});
var le = c((dw, Nc) => {
  var pO = ku(),
    dO = vc(),
    EO = Wt(),
    gO = q(),
    yO = Rc();
  function _O(e) {
    return typeof e == "function"
      ? e
      : e == null
      ? EO
      : typeof e == "object"
      ? gO(e)
        ? dO(e[0], e[1])
        : pO(e)
      : yO(e);
  }
  Nc.exports = _O;
});
var Tn = c((Ew, Lc) => {
  var IO = le(),
    TO = de(),
    hO = rt();
  function mO(e) {
    return function (t, r, n) {
      var i = Object(t);
      if (!TO(t)) {
        var o = IO(r, 3);
        (t = hO(t)),
          (r = function (s) {
            return o(i[s], s, i);
          });
      }
      var a = e(t, r, n);
      return a > -1 ? i[o ? t[a] : a] : void 0;
    };
  }
  Lc.exports = mO;
});
var hn = c((gw, Pc) => {
  function AO(e, t, r, n) {
    for (var i = e.length, o = r + (n ? 1 : -1); n ? o-- : ++o < i; )
      if (t(e[o], o, e)) return o;
    return -1;
  }
  Pc.exports = AO;
});
var Fc = c((yw, Mc) => {
  var vO = /\s/;
  function OO(e) {
    for (var t = e.length; t-- && vO.test(e.charAt(t)); );
    return t;
  }
  Mc.exports = OO;
});
var wc = c((_w, Dc) => {
  var SO = Fc(),
    bO = /^\s+/;
  function CO(e) {
    return e && e.slice(0, SO(e) + 1).replace(bO, "");
  }
  Dc.exports = CO;
});
var jt = c((Iw, Vc) => {
  var xO = wc(),
    qc = J(),
    RO = nt(),
    Gc = 0 / 0,
    NO = /^[-+]0x[0-9a-f]+$/i,
    LO = /^0b[01]+$/i,
    PO = /^0o[0-7]+$/i,
    MO = parseInt;
  function FO(e) {
    if (typeof e == "number") return e;
    if (RO(e)) return Gc;
    if (qc(e)) {
      var t = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = qc(t) ? t + "" : t;
    }
    if (typeof e != "string") return e === 0 ? e : +e;
    e = xO(e);
    var r = LO.test(e);
    return r || PO.test(e) ? MO(e.slice(2), r ? 2 : 8) : NO.test(e) ? Gc : +e;
  }
  Vc.exports = FO;
});
var Bc = c((Tw, Xc) => {
  var DO = jt(),
    Uc = 1 / 0,
    wO = 17976931348623157e292;
  function qO(e) {
    if (!e) return e === 0 ? e : 0;
    if (((e = DO(e)), e === Uc || e === -Uc)) {
      var t = e < 0 ? -1 : 1;
      return t * wO;
    }
    return e === e ? e : 0;
  }
  Xc.exports = qO;
});
var mn = c((hw, Hc) => {
  var GO = Bc();
  function VO(e) {
    var t = GO(e),
      r = t % 1;
    return t === t ? (r ? t - r : t) : 0;
  }
  Hc.exports = VO;
});
var jc = c((mw, Wc) => {
  var UO = hn(),
    XO = le(),
    BO = mn(),
    HO = Math.max;
  function WO(e, t, r) {
    var n = e == null ? 0 : e.length;
    if (!n) return -1;
    var i = r == null ? 0 : BO(r);
    return i < 0 && (i = HO(n + i, 0)), UO(e, XO(t, 3), i);
  }
  Wc.exports = WO;
});
var An = c((Aw, Kc) => {
  var jO = Tn(),
    KO = jc(),
    kO = jO(KO);
  Kc.exports = kO;
});
var Yc = {};
X(Yc, {
  ELEMENT_MATCHES: () => zO,
  FLEX_PREFIXED: () => vn,
  IS_BROWSER_ENV: () => Y,
  TRANSFORM_PREFIXED: () => fe,
  TRANSFORM_STYLE_PREFIXED: () => kt,
  withBrowser: () => Kt,
});
var zc,
  Y,
  Kt,
  zO,
  vn,
  fe,
  kc,
  kt,
  zt = M(() => {
    "use strict";
    (zc = R(An())),
      (Y = typeof window < "u"),
      (Kt = (e, t) => (Y ? e() : t)),
      (zO = Kt(() =>
        (0, zc.default)(
          [
            "matches",
            "matchesSelector",
            "mozMatchesSelector",
            "msMatchesSelector",
            "oMatchesSelector",
            "webkitMatchesSelector",
          ],
          (e) => e in Element.prototype
        )
      )),
      (vn = Kt(() => {
        let e = document.createElement("i"),
          t = [
            "flex",
            "-webkit-flex",
            "-ms-flexbox",
            "-moz-box",
            "-webkit-box",
          ],
          r = "";
        try {
          let { length: n } = t;
          for (let i = 0; i < n; i++) {
            let o = t[i];
            if (((e.style.display = o), e.style.display === o)) return o;
          }
          return r;
        } catch {
          return r;
        }
      }, "flex")),
      (fe = Kt(() => {
        let e = document.createElement("i");
        if (e.style.transform == null) {
          let t = ["Webkit", "Moz", "ms"],
            r = "Transform",
            { length: n } = t;
          for (let i = 0; i < n; i++) {
            let o = t[i] + r;
            if (e.style[o] !== void 0) return o;
          }
        }
        return "transform";
      }, "transform")),
      (kc = fe.split("transform")[0]),
      (kt = kc ? kc + "TransformStyle" : "transformStyle");
  });
var On = c((vw, el) => {
  var YO = 4,
    QO = 0.001,
    $O = 1e-7,
    ZO = 10,
    ot = 11,
    Yt = 1 / (ot - 1),
    JO = typeof Float32Array == "function";
  function Qc(e, t) {
    return 1 - 3 * t + 3 * e;
  }
  function $c(e, t) {
    return 3 * t - 6 * e;
  }
  function Zc(e) {
    return 3 * e;
  }
  function Qt(e, t, r) {
    return ((Qc(t, r) * e + $c(t, r)) * e + Zc(t)) * e;
  }
  function Jc(e, t, r) {
    return 3 * Qc(t, r) * e * e + 2 * $c(t, r) * e + Zc(t);
  }
  function eS(e, t, r, n, i) {
    var o,
      a,
      s = 0;
    do (a = t + (r - t) / 2), (o = Qt(a, n, i) - e), o > 0 ? (r = a) : (t = a);
    while (Math.abs(o) > $O && ++s < ZO);
    return a;
  }
  function tS(e, t, r, n) {
    for (var i = 0; i < YO; ++i) {
      var o = Jc(t, r, n);
      if (o === 0) return t;
      var a = Qt(t, r, n) - e;
      t -= a / o;
    }
    return t;
  }
  el.exports = function (t, r, n, i) {
    if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
      throw new Error("bezier x values must be in [0, 1] range");
    var o = JO ? new Float32Array(ot) : new Array(ot);
    if (t !== r || n !== i)
      for (var a = 0; a < ot; ++a) o[a] = Qt(a * Yt, t, n);
    function s(u) {
      for (var l = 0, p = 1, d = ot - 1; p !== d && o[p] <= u; ++p) l += Yt;
      --p;
      var f = (u - o[p]) / (o[p + 1] - o[p]),
        y = l + f * Yt,
        _ = Jc(y, t, n);
      return _ >= QO ? tS(u, y, t, n) : _ === 0 ? y : eS(u, l, l + Yt, t, n);
    }
    return function (l) {
      return t === r && n === i
        ? l
        : l === 0
        ? 0
        : l === 1
        ? 1
        : Qt(s(l), r, i);
    };
  };
});
var st = {};
X(st, {
  bounce: () => qS,
  bouncePast: () => GS,
  ease: () => rS,
  easeIn: () => nS,
  easeInOut: () => oS,
  easeOut: () => iS,
  inBack: () => xS,
  inCirc: () => OS,
  inCubic: () => cS,
  inElastic: () => LS,
  inExpo: () => mS,
  inOutBack: () => NS,
  inOutCirc: () => bS,
  inOutCubic: () => fS,
  inOutElastic: () => MS,
  inOutExpo: () => vS,
  inOutQuad: () => uS,
  inOutQuart: () => ES,
  inOutQuint: () => _S,
  inOutSine: () => hS,
  inQuad: () => aS,
  inQuart: () => pS,
  inQuint: () => gS,
  inSine: () => IS,
  outBack: () => RS,
  outBounce: () => CS,
  outCirc: () => SS,
  outCubic: () => lS,
  outElastic: () => PS,
  outExpo: () => AS,
  outQuad: () => sS,
  outQuart: () => dS,
  outQuint: () => yS,
  outSine: () => TS,
  swingFrom: () => DS,
  swingFromTo: () => FS,
  swingTo: () => wS,
});
function aS(e) {
  return Math.pow(e, 2);
}
function sS(e) {
  return -(Math.pow(e - 1, 2) - 1);
}
function uS(e) {
  return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
}
function cS(e) {
  return Math.pow(e, 3);
}
function lS(e) {
  return Math.pow(e - 1, 3) + 1;
}
function fS(e) {
  return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 3) : 0.5 * (Math.pow(e - 2, 3) + 2);
}
function pS(e) {
  return Math.pow(e, 4);
}
function dS(e) {
  return -(Math.pow(e - 1, 4) - 1);
}
function ES(e) {
  return (e /= 0.5) < 1
    ? 0.5 * Math.pow(e, 4)
    : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
}
function gS(e) {
  return Math.pow(e, 5);
}
function yS(e) {
  return Math.pow(e - 1, 5) + 1;
}
function _S(e) {
  return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 5) : 0.5 * (Math.pow(e - 2, 5) + 2);
}
function IS(e) {
  return -Math.cos(e * (Math.PI / 2)) + 1;
}
function TS(e) {
  return Math.sin(e * (Math.PI / 2));
}
function hS(e) {
  return -0.5 * (Math.cos(Math.PI * e) - 1);
}
function mS(e) {
  return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
}
function AS(e) {
  return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
}
function vS(e) {
  return e === 0
    ? 0
    : e === 1
    ? 1
    : (e /= 0.5) < 1
    ? 0.5 * Math.pow(2, 10 * (e - 1))
    : 0.5 * (-Math.pow(2, -10 * --e) + 2);
}
function OS(e) {
  return -(Math.sqrt(1 - e * e) - 1);
}
function SS(e) {
  return Math.sqrt(1 - Math.pow(e - 1, 2));
}
function bS(e) {
  return (e /= 0.5) < 1
    ? -0.5 * (Math.sqrt(1 - e * e) - 1)
    : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
}
function CS(e) {
  return e < 1 / 2.75
    ? 7.5625 * e * e
    : e < 2 / 2.75
    ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
    : e < 2.5 / 2.75
    ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
    : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
}
function xS(e) {
  let t = ie;
  return e * e * ((t + 1) * e - t);
}
function RS(e) {
  let t = ie;
  return (e -= 1) * e * ((t + 1) * e + t) + 1;
}
function NS(e) {
  let t = ie;
  return (e /= 0.5) < 1
    ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
    : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
}
function LS(e) {
  let t = ie,
    r = 0,
    n = 1;
  return e === 0
    ? 0
    : e === 1
    ? 1
    : (r || (r = 0.3),
      n < 1
        ? ((n = 1), (t = r / 4))
        : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
      -(
        n *
        Math.pow(2, 10 * (e -= 1)) *
        Math.sin(((e - t) * (2 * Math.PI)) / r)
      ));
}
function PS(e) {
  let t = ie,
    r = 0,
    n = 1;
  return e === 0
    ? 0
    : e === 1
    ? 1
    : (r || (r = 0.3),
      n < 1
        ? ((n = 1), (t = r / 4))
        : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
      n * Math.pow(2, -10 * e) * Math.sin(((e - t) * (2 * Math.PI)) / r) + 1);
}
function MS(e) {
  let t = ie,
    r = 0,
    n = 1;
  return e === 0
    ? 0
    : (e /= 1 / 2) === 2
    ? 1
    : (r || (r = 0.3 * 1.5),
      n < 1
        ? ((n = 1), (t = r / 4))
        : (t = (r / (2 * Math.PI)) * Math.asin(1 / n)),
      e < 1
        ? -0.5 *
          (n *
            Math.pow(2, 10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r))
        : n *
            Math.pow(2, -10 * (e -= 1)) *
            Math.sin(((e - t) * (2 * Math.PI)) / r) *
            0.5 +
          1);
}
function FS(e) {
  let t = ie;
  return (e /= 0.5) < 1
    ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
    : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
}
function DS(e) {
  let t = ie;
  return e * e * ((t + 1) * e - t);
}
function wS(e) {
  let t = ie;
  return (e -= 1) * e * ((t + 1) * e + t) + 1;
}
function qS(e) {
  return e < 1 / 2.75
    ? 7.5625 * e * e
    : e < 2 / 2.75
    ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
    : e < 2.5 / 2.75
    ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
    : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
}
function GS(e) {
  return e < 1 / 2.75
    ? 7.5625 * e * e
    : e < 2 / 2.75
    ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
    : e < 2.5 / 2.75
    ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
    : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
}
var at,
  ie,
  rS,
  nS,
  iS,
  oS,
  Sn = M(() => {
    "use strict";
    (at = R(On())),
      (ie = 1.70158),
      (rS = (0, at.default)(0.25, 0.1, 0.25, 1)),
      (nS = (0, at.default)(0.42, 0, 1, 1)),
      (iS = (0, at.default)(0, 0, 0.58, 1)),
      (oS = (0, at.default)(0.42, 0, 0.58, 1));
  });
var rl = {};
X(rl, {
  applyEasing: () => US,
  createBezierEasing: () => VS,
  optimizeFloat: () => ut,
});
function ut(e, t = 5, r = 10) {
  let n = Math.pow(r, t),
    i = Number(Math.round(e * n) / n);
  return Math.abs(i) > 1e-4 ? i : 0;
}
function VS(e) {
  return (0, tl.default)(...e);
}
function US(e, t, r) {
  return t === 0
    ? 0
    : t === 1
    ? 1
    : ut(r ? (t > 0 ? r(t) : t) : t > 0 && e && st[e] ? st[e](t) : t);
}
var tl,
  bn = M(() => {
    "use strict";
    Sn();
    tl = R(On());
  });
var ol = {};
X(ol, {
  createElementState: () => il,
  ixElements: () => eb,
  mergeActionState: () => Cn,
});
function il(e, t, r, n, i) {
  let o = r === XS ? (0, Pe.getIn)(i, ["config", "target", "objectId"]) : null;
  return (0, Pe.mergeIn)(e, [n], { id: n, ref: t, refId: o, refType: r });
}
function Cn(e, t, r, n, i) {
  let o = rb(i);
  return (0, Pe.mergeIn)(e, [t, JS, r], n, o);
}
function rb(e) {
  let { config: t } = e;
  return tb.reduce((r, n) => {
    let i = n[0],
      o = n[1],
      a = t[i],
      s = t[o];
    return a != null && s != null && (r[o] = s), r;
  }, {});
}
var Pe,
  Sw,
  XS,
  bw,
  BS,
  HS,
  WS,
  jS,
  KS,
  kS,
  zS,
  YS,
  QS,
  $S,
  ZS,
  nl,
  JS,
  eb,
  tb,
  al = M(() => {
    "use strict";
    Pe = R(ve());
    H();
    ({
      HTML_ELEMENT: Sw,
      PLAIN_OBJECT: XS,
      ABSTRACT_NODE: bw,
      CONFIG_X_VALUE: BS,
      CONFIG_Y_VALUE: HS,
      CONFIG_Z_VALUE: WS,
      CONFIG_VALUE: jS,
      CONFIG_X_UNIT: KS,
      CONFIG_Y_UNIT: kS,
      CONFIG_Z_UNIT: zS,
      CONFIG_UNIT: YS,
    } = G),
      ({
        IX2_SESSION_STOPPED: QS,
        IX2_INSTANCE_ADDED: $S,
        IX2_ELEMENT_STATE_CHANGED: ZS,
      } = w),
      (nl = {}),
      (JS = "refState"),
      (eb = (e = nl, t = {}) => {
        switch (t.type) {
          case QS:
            return nl;
          case $S: {
            let {
                elementId: r,
                element: n,
                origin: i,
                actionItem: o,
                refType: a,
              } = t.payload,
              { actionTypeId: s } = o,
              u = e;
            return (
              (0, Pe.getIn)(u, [r, n]) !== n && (u = il(u, n, a, r, o)),
              Cn(u, r, s, i, o)
            );
          }
          case ZS: {
            let {
              elementId: r,
              actionTypeId: n,
              current: i,
              actionItem: o,
            } = t.payload;
            return Cn(e, r, n, i, o);
          }
          default:
            return e;
        }
      });
    tb = [
      [BS, KS],
      [HS, kS],
      [WS, zS],
      [jS, YS],
    ];
  });
var sl = c((xn) => {
  "use strict";
  Object.defineProperty(xn, "__esModule", { value: !0 });
  function nb(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  nb(xn, {
    clearPlugin: function () {
      return lb;
    },
    createPluginInstance: function () {
      return ub;
    },
    getPluginConfig: function () {
      return ib;
    },
    getPluginDestination: function () {
      return sb;
    },
    getPluginDuration: function () {
      return ob;
    },
    getPluginOrigin: function () {
      return ab;
    },
    renderPlugin: function () {
      return cb;
    },
  });
  var ib = (e) => e.value,
    ob = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    },
    ab = (e) => e || { value: 0 },
    sb = (e) => ({ value: e.value }),
    ub = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    },
    cb = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    },
    lb = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
});
var cl = c((Rn) => {
  "use strict";
  Object.defineProperty(Rn, "__esModule", { value: !0 });
  function fb(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  fb(Rn, {
    clearPlugin: function () {
      return mb;
    },
    createPluginInstance: function () {
      return Tb;
    },
    getPluginConfig: function () {
      return gb;
    },
    getPluginDestination: function () {
      return Ib;
    },
    getPluginDuration: function () {
      return yb;
    },
    getPluginOrigin: function () {
      return _b;
    },
    renderPlugin: function () {
      return hb;
    },
  });
  var pb = (e) => document.querySelector(`[data-w-id="${e}"]`),
    db = () => window.Webflow.require("spline"),
    Eb = (e, t) => e.filter((r) => !t.includes(r)),
    gb = (e, t) => e.value[t],
    yb = () => null,
    ul = Object.freeze({
      positionX: 0,
      positionY: 0,
      positionZ: 0,
      rotationX: 0,
      rotationY: 0,
      rotationZ: 0,
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
    }),
    _b = (e, t) => {
      let r = t.config.value,
        n = Object.keys(r);
      if (e) {
        let o = Object.keys(e),
          a = Eb(n, o);
        return a.length ? a.reduce((u, l) => ((u[l] = ul[l]), u), e) : e;
      }
      return n.reduce((o, a) => ((o[a] = ul[a]), o), {});
    },
    Ib = (e) => e.value,
    Tb = (e, t) => {
      let r = t?.config?.target?.pluginElement;
      return r ? pb(r) : null;
    },
    hb = (e, t, r) => {
      let n = db(),
        i = n.getInstance(e),
        o = r.config.target.objectId,
        a = (s) => {
          if (!s) throw new Error("Invalid spline app passed to renderSpline");
          let u = o && s.findObjectById(o);
          if (!u) return;
          let { PLUGIN_SPLINE: l } = t;
          l.positionX != null && (u.position.x = l.positionX),
            l.positionY != null && (u.position.y = l.positionY),
            l.positionZ != null && (u.position.z = l.positionZ),
            l.rotationX != null && (u.rotation.x = l.rotationX),
            l.rotationY != null && (u.rotation.y = l.rotationY),
            l.rotationZ != null && (u.rotation.z = l.rotationZ),
            l.scaleX != null && (u.scale.x = l.scaleX),
            l.scaleY != null && (u.scale.y = l.scaleY),
            l.scaleZ != null && (u.scale.z = l.scaleZ);
        };
      i ? a(i.spline) : n.setLoadHandler(e, a);
    },
    mb = () => null;
});
var Ln = c((Nn) => {
  "use strict";
  Object.defineProperty(Nn, "__esModule", { value: !0 });
  Object.defineProperty(Nn, "normalizeColor", {
    enumerable: !0,
    get: function () {
      return Ab;
    },
  });
  var ll = {
    aliceblue: "#F0F8FF",
    antiquewhite: "#FAEBD7",
    aqua: "#00FFFF",
    aquamarine: "#7FFFD4",
    azure: "#F0FFFF",
    beige: "#F5F5DC",
    bisque: "#FFE4C4",
    black: "#000000",
    blanchedalmond: "#FFEBCD",
    blue: "#0000FF",
    blueviolet: "#8A2BE2",
    brown: "#A52A2A",
    burlywood: "#DEB887",
    cadetblue: "#5F9EA0",
    chartreuse: "#7FFF00",
    chocolate: "#D2691E",
    coral: "#FF7F50",
    cornflowerblue: "#6495ED",
    cornsilk: "#FFF8DC",
    crimson: "#DC143C",
    cyan: "#00FFFF",
    darkblue: "#00008B",
    darkcyan: "#008B8B",
    darkgoldenrod: "#B8860B",
    darkgray: "#A9A9A9",
    darkgreen: "#006400",
    darkgrey: "#A9A9A9",
    darkkhaki: "#BDB76B",
    darkmagenta: "#8B008B",
    darkolivegreen: "#556B2F",
    darkorange: "#FF8C00",
    darkorchid: "#9932CC",
    darkred: "#8B0000",
    darksalmon: "#E9967A",
    darkseagreen: "#8FBC8F",
    darkslateblue: "#483D8B",
    darkslategray: "#2F4F4F",
    darkslategrey: "#2F4F4F",
    darkturquoise: "#00CED1",
    darkviolet: "#9400D3",
    deeppink: "#FF1493",
    deepskyblue: "#00BFFF",
    dimgray: "#696969",
    dimgrey: "#696969",
    dodgerblue: "#1E90FF",
    firebrick: "#B22222",
    floralwhite: "#FFFAF0",
    forestgreen: "#228B22",
    fuchsia: "#FF00FF",
    gainsboro: "#DCDCDC",
    ghostwhite: "#F8F8FF",
    gold: "#FFD700",
    goldenrod: "#DAA520",
    gray: "#808080",
    green: "#008000",
    greenyellow: "#ADFF2F",
    grey: "#808080",
    honeydew: "#F0FFF0",
    hotpink: "#FF69B4",
    indianred: "#CD5C5C",
    indigo: "#4B0082",
    ivory: "#FFFFF0",
    khaki: "#F0E68C",
    lavender: "#E6E6FA",
    lavenderblush: "#FFF0F5",
    lawngreen: "#7CFC00",
    lemonchiffon: "#FFFACD",
    lightblue: "#ADD8E6",
    lightcoral: "#F08080",
    lightcyan: "#E0FFFF",
    lightgoldenrodyellow: "#FAFAD2",
    lightgray: "#D3D3D3",
    lightgreen: "#90EE90",
    lightgrey: "#D3D3D3",
    lightpink: "#FFB6C1",
    lightsalmon: "#FFA07A",
    lightseagreen: "#20B2AA",
    lightskyblue: "#87CEFA",
    lightslategray: "#778899",
    lightslategrey: "#778899",
    lightsteelblue: "#B0C4DE",
    lightyellow: "#FFFFE0",
    lime: "#00FF00",
    limegreen: "#32CD32",
    linen: "#FAF0E6",
    magenta: "#FF00FF",
    maroon: "#800000",
    mediumaquamarine: "#66CDAA",
    mediumblue: "#0000CD",
    mediumorchid: "#BA55D3",
    mediumpurple: "#9370DB",
    mediumseagreen: "#3CB371",
    mediumslateblue: "#7B68EE",
    mediumspringgreen: "#00FA9A",
    mediumturquoise: "#48D1CC",
    mediumvioletred: "#C71585",
    midnightblue: "#191970",
    mintcream: "#F5FFFA",
    mistyrose: "#FFE4E1",
    moccasin: "#FFE4B5",
    navajowhite: "#FFDEAD",
    navy: "#000080",
    oldlace: "#FDF5E6",
    olive: "#808000",
    olivedrab: "#6B8E23",
    orange: "#FFA500",
    orangered: "#FF4500",
    orchid: "#DA70D6",
    palegoldenrod: "#EEE8AA",
    palegreen: "#98FB98",
    paleturquoise: "#AFEEEE",
    palevioletred: "#DB7093",
    papayawhip: "#FFEFD5",
    peachpuff: "#FFDAB9",
    peru: "#CD853F",
    pink: "#FFC0CB",
    plum: "#DDA0DD",
    powderblue: "#B0E0E6",
    purple: "#800080",
    rebeccapurple: "#663399",
    red: "#FF0000",
    rosybrown: "#BC8F8F",
    royalblue: "#4169E1",
    saddlebrown: "#8B4513",
    salmon: "#FA8072",
    sandybrown: "#F4A460",
    seagreen: "#2E8B57",
    seashell: "#FFF5EE",
    sienna: "#A0522D",
    silver: "#C0C0C0",
    skyblue: "#87CEEB",
    slateblue: "#6A5ACD",
    slategray: "#708090",
    slategrey: "#708090",
    snow: "#FFFAFA",
    springgreen: "#00FF7F",
    steelblue: "#4682B4",
    tan: "#D2B48C",
    teal: "#008080",
    thistle: "#D8BFD8",
    tomato: "#FF6347",
    turquoise: "#40E0D0",
    violet: "#EE82EE",
    wheat: "#F5DEB3",
    white: "#FFFFFF",
    whitesmoke: "#F5F5F5",
    yellow: "#FFFF00",
    yellowgreen: "#9ACD32",
  };
  function Ab(e) {
    let t,
      r,
      n,
      i = 1,
      o = e.replace(/\s/g, "").toLowerCase(),
      s = (typeof ll[o] == "string" ? ll[o].toLowerCase() : null) || o;
    if (s.startsWith("#")) {
      let u = s.substring(1);
      u.length === 3 || u.length === 4
        ? ((t = parseInt(u[0] + u[0], 16)),
          (r = parseInt(u[1] + u[1], 16)),
          (n = parseInt(u[2] + u[2], 16)),
          u.length === 4 && (i = parseInt(u[3] + u[3], 16) / 255))
        : (u.length === 6 || u.length === 8) &&
          ((t = parseInt(u.substring(0, 2), 16)),
          (r = parseInt(u.substring(2, 4), 16)),
          (n = parseInt(u.substring(4, 6), 16)),
          u.length === 8 && (i = parseInt(u.substring(6, 8), 16) / 255));
    } else if (s.startsWith("rgba")) {
      let u = s.match(/rgba\(([^)]+)\)/)[1].split(",");
      (t = parseInt(u[0], 10)),
        (r = parseInt(u[1], 10)),
        (n = parseInt(u[2], 10)),
        (i = parseFloat(u[3]));
    } else if (s.startsWith("rgb")) {
      let u = s.match(/rgb\(([^)]+)\)/)[1].split(",");
      (t = parseInt(u[0], 10)),
        (r = parseInt(u[1], 10)),
        (n = parseInt(u[2], 10));
    } else if (s.startsWith("hsla")) {
      let u = s.match(/hsla\(([^)]+)\)/)[1].split(","),
        l = parseFloat(u[0]),
        p = parseFloat(u[1].replace("%", "")) / 100,
        d = parseFloat(u[2].replace("%", "")) / 100;
      i = parseFloat(u[3]);
      let f = (1 - Math.abs(2 * d - 1)) * p,
        y = f * (1 - Math.abs(((l / 60) % 2) - 1)),
        _ = d - f / 2,
        E,
        I,
        g;
      l >= 0 && l < 60
        ? ((E = f), (I = y), (g = 0))
        : l >= 60 && l < 120
        ? ((E = y), (I = f), (g = 0))
        : l >= 120 && l < 180
        ? ((E = 0), (I = f), (g = y))
        : l >= 180 && l < 240
        ? ((E = 0), (I = y), (g = f))
        : l >= 240 && l < 300
        ? ((E = y), (I = 0), (g = f))
        : ((E = f), (I = 0), (g = y)),
        (t = Math.round((E + _) * 255)),
        (r = Math.round((I + _) * 255)),
        (n = Math.round((g + _) * 255));
    } else if (s.startsWith("hsl")) {
      let u = s.match(/hsl\(([^)]+)\)/)[1].split(","),
        l = parseFloat(u[0]),
        p = parseFloat(u[1].replace("%", "")) / 100,
        d = parseFloat(u[2].replace("%", "")) / 100,
        f = (1 - Math.abs(2 * d - 1)) * p,
        y = f * (1 - Math.abs(((l / 60) % 2) - 1)),
        _ = d - f / 2,
        E,
        I,
        g;
      l >= 0 && l < 60
        ? ((E = f), (I = y), (g = 0))
        : l >= 60 && l < 120
        ? ((E = y), (I = f), (g = 0))
        : l >= 120 && l < 180
        ? ((E = 0), (I = f), (g = y))
        : l >= 180 && l < 240
        ? ((E = 0), (I = y), (g = f))
        : l >= 240 && l < 300
        ? ((E = y), (I = 0), (g = f))
        : ((E = f), (I = 0), (g = y)),
        (t = Math.round((E + _) * 255)),
        (r = Math.round((I + _) * 255)),
        (n = Math.round((g + _) * 255));
    }
    if (Number.isNaN(t) || Number.isNaN(r) || Number.isNaN(n))
      throw new Error(
        `Invalid color in [ix2/shared/utils/normalizeColor.js] '${e}'`
      );
    return { red: t, green: r, blue: n, alpha: i };
  }
});
var fl = c((Pn) => {
  "use strict";
  Object.defineProperty(Pn, "__esModule", { value: !0 });
  function vb(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  vb(Pn, {
    clearPlugin: function () {
      return Lb;
    },
    createPluginInstance: function () {
      return Rb;
    },
    getPluginConfig: function () {
      return Sb;
    },
    getPluginDestination: function () {
      return xb;
    },
    getPluginDuration: function () {
      return bb;
    },
    getPluginOrigin: function () {
      return Cb;
    },
    renderPlugin: function () {
      return Nb;
    },
  });
  var Ob = Ln(),
    Sb = (e, t) => e.value[t],
    bb = () => null,
    Cb = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        i = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(i, 10) };
      if (r.red != null && r.green != null && r.blue != null)
        return (0, Ob.normalizeColor)(i);
    },
    xb = (e) => e.value,
    Rb = () => null,
    Nb = (e, t, r) => {
      let n = r.config.target.objectId,
        i = r.config.value.unit,
        { PLUGIN_VARIABLE: o } = t,
        { size: a, red: s, green: u, blue: l, alpha: p } = o,
        d;
      a != null && (d = a + i),
        s != null &&
          l != null &&
          u != null &&
          p != null &&
          (d = `rgba(${s}, ${u}, ${l}, ${p})`),
        d != null && document.documentElement.style.setProperty(n, d);
    },
    Lb = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
});
var dl = c((Dn) => {
  "use strict";
  Object.defineProperty(Dn, "__esModule", { value: !0 });
  Object.defineProperty(Dn, "pluginMethodMap", {
    enumerable: !0,
    get: function () {
      return Db;
    },
  });
  var Mn = (H(), $(Io)),
    Pb = Fn(sl()),
    Mb = Fn(cl()),
    Fb = Fn(fl());
  function pl(e) {
    if (typeof WeakMap != "function") return null;
    var t = new WeakMap(),
      r = new WeakMap();
    return (pl = function (n) {
      return n ? r : t;
    })(e);
  }
  function Fn(e, t) {
    if (!t && e && e.__esModule) return e;
    if (e === null || (typeof e != "object" && typeof e != "function"))
      return { default: e };
    var r = pl(t);
    if (r && r.has(e)) return r.get(e);
    var n = { __proto__: null },
      i = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var o in e)
      if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
        var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
        a && (a.get || a.set) ? Object.defineProperty(n, o, a) : (n[o] = e[o]);
      }
    return (n.default = e), r && r.set(e, n), n;
  }
  var Db = new Map([
    [Mn.ActionTypeConsts.PLUGIN_LOTTIE, { ...Pb }],
    [Mn.ActionTypeConsts.PLUGIN_SPLINE, { ...Mb }],
    [Mn.ActionTypeConsts.PLUGIN_VARIABLE, { ...Fb }],
  ]);
});
var El = {};
X(El, {
  clearPlugin: () => Xn,
  createPluginInstance: () => qb,
  getPluginConfig: () => qn,
  getPluginDestination: () => Vn,
  getPluginDuration: () => wb,
  getPluginOrigin: () => Gn,
  isPluginType: () => ge,
  renderPlugin: () => Un,
});
function ge(e) {
  return wn.pluginMethodMap.has(e);
}
var wn,
  ye,
  qn,
  Gn,
  wb,
  Vn,
  qb,
  Un,
  Xn,
  Bn = M(() => {
    "use strict";
    zt();
    wn = R(dl());
    (ye = (e) => (t) => {
      if (!Y) return () => null;
      let r = wn.pluginMethodMap.get(t);
      if (!r) throw new Error(`IX2 no plugin configured for: ${t}`);
      let n = r[e];
      if (!n) throw new Error(`IX2 invalid plugin method: ${e}`);
      return n;
    }),
      (qn = ye("getPluginConfig")),
      (Gn = ye("getPluginOrigin")),
      (wb = ye("getPluginDuration")),
      (Vn = ye("getPluginDestination")),
      (qb = ye("createPluginInstance")),
      (Un = ye("renderPlugin")),
      (Xn = ye("clearPlugin"));
  });
var yl = c((Mw, gl) => {
  function Gb(e, t) {
    return e == null || e !== e ? t : e;
  }
  gl.exports = Gb;
});
var Il = c((Fw, _l) => {
  function Vb(e, t, r, n) {
    var i = -1,
      o = e == null ? 0 : e.length;
    for (n && o && (r = e[++i]); ++i < o; ) r = t(r, e[i], i, e);
    return r;
  }
  _l.exports = Vb;
});
var hl = c((Dw, Tl) => {
  function Ub(e) {
    return function (t, r, n) {
      for (var i = -1, o = Object(t), a = n(t), s = a.length; s--; ) {
        var u = a[e ? s : ++i];
        if (r(o[u], u, o) === !1) break;
      }
      return t;
    };
  }
  Tl.exports = Ub;
});
var Al = c((ww, ml) => {
  var Xb = hl(),
    Bb = Xb();
  ml.exports = Bb;
});
var Hn = c((qw, vl) => {
  var Hb = Al(),
    Wb = rt();
  function jb(e, t) {
    return e && Hb(e, t, Wb);
  }
  vl.exports = jb;
});
var Sl = c((Gw, Ol) => {
  var Kb = de();
  function kb(e, t) {
    return function (r, n) {
      if (r == null) return r;
      if (!Kb(r)) return e(r, n);
      for (
        var i = r.length, o = t ? i : -1, a = Object(r);
        (t ? o-- : ++o < i) && n(a[o], o, a) !== !1;

      );
      return r;
    };
  }
  Ol.exports = kb;
});
var Wn = c((Vw, bl) => {
  var zb = Hn(),
    Yb = Sl(),
    Qb = Yb(zb);
  bl.exports = Qb;
});
var xl = c((Uw, Cl) => {
  function $b(e, t, r, n, i) {
    return (
      i(e, function (o, a, s) {
        r = n ? ((n = !1), o) : t(r, o, a, s);
      }),
      r
    );
  }
  Cl.exports = $b;
});
var Nl = c((Xw, Rl) => {
  var Zb = Il(),
    Jb = Wn(),
    e0 = le(),
    t0 = xl(),
    r0 = q();
  function n0(e, t, r) {
    var n = r0(e) ? Zb : t0,
      i = arguments.length < 3;
    return n(e, e0(t, 4), r, i, Jb);
  }
  Rl.exports = n0;
});
var Pl = c((Bw, Ll) => {
  var i0 = hn(),
    o0 = le(),
    a0 = mn(),
    s0 = Math.max,
    u0 = Math.min;
  function c0(e, t, r) {
    var n = e == null ? 0 : e.length;
    if (!n) return -1;
    var i = n - 1;
    return (
      r !== void 0 && ((i = a0(r)), (i = r < 0 ? s0(n + i, 0) : u0(i, n - 1))),
      i0(e, o0(t, 3), i, !0)
    );
  }
  Ll.exports = c0;
});
var Fl = c((Hw, Ml) => {
  var l0 = Tn(),
    f0 = Pl(),
    p0 = l0(f0);
  Ml.exports = p0;
});
function Dl(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function d0(e, t) {
  if (Dl(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  let r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (let i = 0; i < r.length; i++)
    if (!Object.hasOwn(t, r[i]) || !Dl(e[r[i]], t[r[i]])) return !1;
  return !0;
}
var jn,
  wl = M(() => {
    "use strict";
    jn = d0;
  });
var ef = {};
X(ef, {
  cleanupHTMLElement: () => lC,
  clearAllStyles: () => cC,
  clearObjectCache: () => N0,
  getActionListProgress: () => pC,
  getAffectedElements: () => Qn,
  getComputedStyle: () => G0,
  getDestinationValues: () => j0,
  getElementId: () => F0,
  getInstanceId: () => P0,
  getInstanceOrigin: () => X0,
  getItemConfigByKey: () => W0,
  getMaxDurationItemIndex: () => Jl,
  getNamespacedParameterId: () => gC,
  getRenderType: () => Ql,
  getStyleProp: () => K0,
  mediaQueriesEqual: () => _C,
  observeStore: () => q0,
  reduceListToGroup: () => dC,
  reifyState: () => D0,
  renderHTMLElement: () => k0,
  shallowEqual: () => jn,
  shouldAllowMediaQuery: () => yC,
  shouldNamespaceEventParameter: () => EC,
  stringifyTarget: () => IC,
});
function N0() {
  $t.clear();
}
function P0() {
  return "i" + L0++;
}
function F0(e, t) {
  for (let r in e) {
    let n = e[r];
    if (n && n.ref === t) return n.id;
  }
  return "e" + M0++;
}
function D0({ events: e, actionLists: t, site: r } = {}) {
  let n = (0, tr.default)(
      e,
      (a, s) => {
        let { eventTypeId: u } = s;
        return a[u] || (a[u] = {}), (a[u][s.id] = s), a;
      },
      {}
    ),
    i = r && r.mediaQueries,
    o = [];
  return (
    i
      ? (o = i.map((a) => a.key))
      : ((i = []), console.warn("IX2 missing mediaQueries in site data")),
    {
      ixData: {
        events: e,
        actionLists: t,
        eventTypeMap: n,
        mediaQueries: i,
        mediaQueryKeys: o,
      },
    }
  );
}
function q0({ store: e, select: t, onChange: r, comparator: n = w0 }) {
  let { getState: i, subscribe: o } = e,
    a = o(u),
    s = t(i());
  function u() {
    let l = t(i());
    if (l == null) {
      a();
      return;
    }
    n(l, s) || ((s = l), r(s, e));
  }
  return a;
}
function Vl(e) {
  let t = typeof e;
  if (t === "string") return { id: e };
  if (e != null && t === "object") {
    let {
      id: r,
      objectId: n,
      selector: i,
      selectorGuids: o,
      appliesTo: a,
      useEventTarget: s,
    } = e;
    return {
      id: r,
      objectId: n,
      selector: i,
      selectorGuids: o,
      appliesTo: a,
      useEventTarget: s,
    };
  }
  return {};
}
function Qn({
  config: e,
  event: t,
  eventTarget: r,
  elementRoot: n,
  elementApi: i,
}) {
  if (!i) throw new Error("IX2 missing elementApi");
  let { targets: o } = e;
  if (Array.isArray(o) && o.length > 0)
    return o.reduce(
      (N, L) =>
        N.concat(
          Qn({
            config: { target: L },
            event: t,
            eventTarget: r,
            elementRoot: n,
            elementApi: i,
          })
        ),
      []
    );
  let {
      getValidDocument: a,
      getQuerySelector: s,
      queryDocument: u,
      getChildElements: l,
      getSiblingElements: p,
      matchSelector: d,
      elementContains: f,
      isSiblingNode: y,
    } = i,
    { target: _ } = e;
  if (!_) return [];
  let {
    id: E,
    objectId: I,
    selector: g,
    selectorGuids: h,
    appliesTo: A,
    useEventTarget: m,
  } = Vl(_);
  if (I) return [$t.has(I) ? $t.get(I) : $t.set(I, {}).get(I)];
  if (A === Wr.PAGE) {
    let N = a(E);
    return N ? [N] : [];
  }
  let T = (t?.action?.config?.affectedElements ?? {})[E || g] || {},
    S = !!(T.id || T.selector),
    v,
    O,
    C,
    x = t && s(Vl(t.target));
  if (
    (S
      ? ((v = T.limitAffectedElements), (O = x), (C = s(T)))
      : (O = C = s({ id: E, selector: g, selectorGuids: h })),
    t && m)
  ) {
    let N = r && (C || m === !0) ? [r] : u(x);
    if (C) {
      if (m === C0) return u(C).filter((L) => N.some((D) => f(L, D)));
      if (m === ql) return u(C).filter((L) => N.some((D) => f(D, L)));
      if (m === Gl) return u(C).filter((L) => N.some((D) => y(D, L)));
    }
    return N;
  }
  return O == null || C == null
    ? []
    : Y && n
    ? u(C).filter((N) => n.contains(N))
    : v === ql
    ? u(O, C)
    : v === b0
    ? l(u(O)).filter(d(C))
    : v === Gl
    ? p(u(O)).filter(d(C))
    : u(C);
}
function G0({ element: e, actionItem: t }) {
  if (!Y) return {};
  let { actionTypeId: r } = t;
  switch (r) {
    case qe:
    case Ge:
    case Ve:
    case Ue:
    case nr:
      return window.getComputedStyle(e);
    default:
      return {};
  }
}
function X0(e, t = {}, r = {}, n, i) {
  let { getStyle: o } = i,
    { actionTypeId: a } = n;
  if (ge(a)) return Gn(a)(t[a], n);
  switch (n.actionTypeId) {
    case Fe:
    case De:
    case we:
    case pt:
      return t[n.actionTypeId] || $n[n.actionTypeId];
    case dt:
      return V0(t[n.actionTypeId], n.config.filters);
    case Et:
      return U0(t[n.actionTypeId], n.config.fontVariations);
    case kl:
      return { value: (0, oe.default)(parseFloat(o(e, Jt)), 1) };
    case qe: {
      let s = o(e, ee),
        u = o(e, te),
        l,
        p;
      return (
        n.config.widthUnit === pe
          ? (l = Ul.test(s) ? parseFloat(s) : parseFloat(r.width))
          : (l = (0, oe.default)(parseFloat(s), parseFloat(r.width))),
        n.config.heightUnit === pe
          ? (p = Ul.test(u) ? parseFloat(u) : parseFloat(r.height))
          : (p = (0, oe.default)(parseFloat(u), parseFloat(r.height))),
        { widthValue: l, heightValue: p }
      );
    }
    case Ge:
    case Ve:
    case Ue:
      return aC({
        element: e,
        actionTypeId: n.actionTypeId,
        computedStyle: r,
        getStyle: o,
      });
    case nr:
      return { value: (0, oe.default)(o(e, er), r.display) };
    case R0:
      return t[n.actionTypeId] || { value: 0 };
    default:
      return;
  }
}
function j0({ element: e, actionItem: t, elementApi: r }) {
  if (ge(t.actionTypeId)) return Vn(t.actionTypeId)(t.config);
  switch (t.actionTypeId) {
    case Fe:
    case De:
    case we:
    case pt: {
      let { xValue: n, yValue: i, zValue: o } = t.config;
      return { xValue: n, yValue: i, zValue: o };
    }
    case qe: {
      let { getStyle: n, setStyle: i, getProperty: o } = r,
        { widthUnit: a, heightUnit: s } = t.config,
        { widthValue: u, heightValue: l } = t.config;
      if (!Y) return { widthValue: u, heightValue: l };
      if (a === pe) {
        let p = n(e, ee);
        i(e, ee, ""), (u = o(e, "offsetWidth")), i(e, ee, p);
      }
      if (s === pe) {
        let p = n(e, te);
        i(e, te, ""), (l = o(e, "offsetHeight")), i(e, te, p);
      }
      return { widthValue: u, heightValue: l };
    }
    case Ge:
    case Ve:
    case Ue: {
      let {
        rValue: n,
        gValue: i,
        bValue: o,
        aValue: a,
        globalSwatchId: s,
      } = t.config;
      if (s && s.startsWith("--")) {
        let { getStyle: u } = r,
          l = u(e, s),
          p = (0, Hl.normalizeColor)(l);
        return {
          rValue: p.red,
          gValue: p.green,
          bValue: p.blue,
          aValue: p.alpha,
        };
      }
      return { rValue: n, gValue: i, bValue: o, aValue: a };
    }
    case dt:
      return t.config.filters.reduce(B0, {});
    case Et:
      return t.config.fontVariations.reduce(H0, {});
    default: {
      let { value: n } = t.config;
      return { value: n };
    }
  }
}
function Ql(e) {
  if (/^TRANSFORM_/.test(e)) return jl;
  if (/^STYLE_/.test(e)) return zn;
  if (/^GENERAL_/.test(e)) return kn;
  if (/^PLUGIN_/.test(e)) return Kl;
}
function K0(e, t) {
  return e === zn ? t.replace("STYLE_", "").toLowerCase() : null;
}
function k0(e, t, r, n, i, o, a, s, u) {
  switch (s) {
    case jl:
      return Z0(e, t, r, i, a);
    case zn:
      return sC(e, t, r, i, o, a);
    case kn:
      return uC(e, i, a);
    case Kl: {
      let { actionTypeId: l } = i;
      if (ge(l)) return Un(l)(u, t, i);
    }
  }
}
function Z0(e, t, r, n, i) {
  let o = $0
      .map((s) => {
        let u = $n[s],
          {
            xValue: l = u.xValue,
            yValue: p = u.yValue,
            zValue: d = u.zValue,
            xUnit: f = "",
            yUnit: y = "",
            zUnit: _ = "",
          } = t[s] || {};
        switch (s) {
          case Fe:
            return `${y0}(${l}${f}, ${p}${y}, ${d}${_})`;
          case De:
            return `${_0}(${l}${f}, ${p}${y}, ${d}${_})`;
          case we:
            return `${I0}(${l}${f}) ${T0}(${p}${y}) ${h0}(${d}${_})`;
          case pt:
            return `${m0}(${l}${f}, ${p}${y})`;
          default:
            return "";
        }
      })
      .join(" "),
    { setStyle: a } = i;
  _e(e, fe, i), a(e, fe, o), tC(n, r) && a(e, kt, A0);
}
function J0(e, t, r, n) {
  let i = (0, tr.default)(t, (a, s, u) => `${a} ${u}(${s}${Q0(u, r)})`, ""),
    { setStyle: o } = n;
  _e(e, ct, n), o(e, ct, i);
}
function eC(e, t, r, n) {
  let i = (0, tr.default)(t, (a, s, u) => (a.push(`"${u}" ${s}`), a), []).join(
      ", "
    ),
    { setStyle: o } = n;
  _e(e, lt, n), o(e, lt, i);
}
function tC({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
  return (
    (e === Fe && n !== void 0) ||
    (e === De && n !== void 0) ||
    (e === we && (t !== void 0 || r !== void 0))
  );
}
function oC(e, t) {
  let r = e.exec(t);
  return r ? r[1] : "";
}
function aC({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
  let i = Yn[t],
    o = n(e, i),
    a = nC.test(o) ? o : r[i],
    s = oC(iC, a).split(ft);
  return {
    rValue: (0, oe.default)(parseInt(s[0], 10), 255),
    gValue: (0, oe.default)(parseInt(s[1], 10), 255),
    bValue: (0, oe.default)(parseInt(s[2], 10), 255),
    aValue: (0, oe.default)(parseFloat(s[3]), 1),
  };
}
function sC(e, t, r, n, i, o) {
  let { setStyle: a } = o;
  switch (n.actionTypeId) {
    case qe: {
      let { widthUnit: s = "", heightUnit: u = "" } = n.config,
        { widthValue: l, heightValue: p } = r;
      l !== void 0 && (s === pe && (s = "px"), _e(e, ee, o), a(e, ee, l + s)),
        p !== void 0 && (u === pe && (u = "px"), _e(e, te, o), a(e, te, p + u));
      break;
    }
    case dt: {
      J0(e, r, n.config, o);
      break;
    }
    case Et: {
      eC(e, r, n.config, o);
      break;
    }
    case Ge:
    case Ve:
    case Ue: {
      let s = Yn[n.actionTypeId],
        u = Math.round(r.rValue),
        l = Math.round(r.gValue),
        p = Math.round(r.bValue),
        d = r.aValue;
      _e(e, s, o),
        a(e, s, d >= 1 ? `rgb(${u},${l},${p})` : `rgba(${u},${l},${p},${d})`);
      break;
    }
    default: {
      let { unit: s = "" } = n.config;
      _e(e, i, o), a(e, i, r.value + s);
      break;
    }
  }
}
function uC(e, t, r) {
  let { setStyle: n } = r;
  switch (t.actionTypeId) {
    case nr: {
      let { value: i } = t.config;
      i === v0 && Y ? n(e, er, vn) : n(e, er, i);
      return;
    }
  }
}
function _e(e, t, r) {
  if (!Y) return;
  let n = Yl[t];
  if (!n) return;
  let { getStyle: i, setStyle: o } = r,
    a = i(e, Me);
  if (!a) {
    o(e, Me, n);
    return;
  }
  let s = a.split(ft).map(zl);
  s.indexOf(n) === -1 && o(e, Me, s.concat(n).join(ft));
}
function $l(e, t, r) {
  if (!Y) return;
  let n = Yl[t];
  if (!n) return;
  let { getStyle: i, setStyle: o } = r,
    a = i(e, Me);
  !a ||
    a.indexOf(n) === -1 ||
    o(
      e,
      Me,
      a
        .split(ft)
        .map(zl)
        .filter((s) => s !== n)
        .join(ft)
    );
}
function cC({ store: e, elementApi: t }) {
  let { ixData: r } = e.getState(),
    { events: n = {}, actionLists: i = {} } = r;
  Object.keys(n).forEach((o) => {
    let a = n[o],
      { config: s } = a.action,
      { actionListId: u } = s,
      l = i[u];
    l && Xl({ actionList: l, event: a, elementApi: t });
  }),
    Object.keys(i).forEach((o) => {
      Xl({ actionList: i[o], elementApi: t });
    });
}
function Xl({ actionList: e = {}, event: t, elementApi: r }) {
  let { actionItemGroups: n, continuousParameterGroups: i } = e;
  n &&
    n.forEach((o) => {
      Bl({ actionGroup: o, event: t, elementApi: r });
    }),
    i &&
      i.forEach((o) => {
        let { continuousActionGroups: a } = o;
        a.forEach((s) => {
          Bl({ actionGroup: s, event: t, elementApi: r });
        });
      });
}
function Bl({ actionGroup: e, event: t, elementApi: r }) {
  let { actionItems: n } = e;
  n.forEach((i) => {
    let { actionTypeId: o, config: a } = i,
      s;
    ge(o)
      ? (s = (u) => Xn(o)(u, i))
      : (s = Zl({ effect: fC, actionTypeId: o, elementApi: r })),
      Qn({ config: a, event: t, elementApi: r }).forEach(s);
  });
}
function lC(e, t, r) {
  let { setStyle: n, getStyle: i } = r,
    { actionTypeId: o } = t;
  if (o === qe) {
    let { config: a } = t;
    a.widthUnit === pe && n(e, ee, ""), a.heightUnit === pe && n(e, te, "");
  }
  i(e, Me) && Zl({ effect: $l, actionTypeId: o, elementApi: r })(e);
}
function fC(e, t, r) {
  let { setStyle: n } = r;
  $l(e, t, r), n(e, t, ""), t === fe && n(e, kt, "");
}
function Jl(e) {
  let t = 0,
    r = 0;
  return (
    e.forEach((n, i) => {
      let { config: o } = n,
        a = o.delay + o.duration;
      a >= t && ((t = a), (r = i));
    }),
    r
  );
}
function pC(e, t) {
  let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
    { actionItem: i, verboseTimeElapsed: o = 0 } = t,
    a = 0,
    s = 0;
  return (
    r.forEach((u, l) => {
      if (n && l === 0) return;
      let { actionItems: p } = u,
        d = p[Jl(p)],
        { config: f, actionTypeId: y } = d;
      i.id === d.id && (s = a + o);
      let _ = Ql(y) === kn ? 0 : f.duration;
      a += f.delay + _;
    }),
    a > 0 ? ut(s / a) : 0
  );
}
function dC({ actionList: e, actionItemId: t, rawData: r }) {
  let { actionItemGroups: n, continuousParameterGroups: i } = e,
    o = [],
    a = (s) => (
      o.push((0, rr.mergeIn)(s, ["config"], { delay: 0, duration: 0 })),
      s.id === t
    );
  return (
    n && n.some(({ actionItems: s }) => s.some(a)),
    i &&
      i.some((s) => {
        let { continuousActionGroups: u } = s;
        return u.some(({ actionItems: l }) => l.some(a));
      }),
    (0, rr.setIn)(r, ["actionLists"], {
      [e.id]: { id: e.id, actionItemGroups: [{ actionItems: o }] },
    })
  );
}
function EC(e, { basedOn: t }) {
  return (
    (e === z.SCROLLING_IN_VIEW && (t === Z.ELEMENT || t == null)) ||
    (e === z.MOUSE_MOVE && t === Z.ELEMENT)
  );
}
function gC(e, t) {
  return e + x0 + t;
}
function yC(e, t) {
  return t == null ? !0 : e.indexOf(t) !== -1;
}
function _C(e, t) {
  return jn(e && e.sort(), t && t.sort());
}
function IC(e) {
  if (typeof e == "string") return e;
  if (e.pluginElement && e.objectId) return e.pluginElement + Kn + e.objectId;
  if (e.objectId) return e.objectId;
  let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
  return t + Kn + r + Kn + n;
}
var oe,
  tr,
  Zt,
  rr,
  Hl,
  E0,
  g0,
  y0,
  _0,
  I0,
  T0,
  h0,
  m0,
  A0,
  v0,
  Jt,
  ct,
  lt,
  ee,
  te,
  Wl,
  O0,
  S0,
  ql,
  b0,
  Gl,
  C0,
  er,
  Me,
  pe,
  ft,
  x0,
  Kn,
  jl,
  kn,
  zn,
  Kl,
  Fe,
  De,
  we,
  pt,
  kl,
  dt,
  Et,
  qe,
  Ge,
  Ve,
  Ue,
  nr,
  R0,
  zl,
  Yn,
  Yl,
  $t,
  L0,
  M0,
  w0,
  Ul,
  V0,
  U0,
  B0,
  H0,
  W0,
  $n,
  z0,
  Y0,
  Q0,
  $0,
  rC,
  nC,
  iC,
  Zl,
  tf = M(() => {
    "use strict";
    (oe = R(yl())), (tr = R(Nl())), (Zt = R(Fl())), (rr = R(ve()));
    H();
    wl();
    bn();
    Hl = R(Ln());
    Bn();
    zt();
    ({
      BACKGROUND: E0,
      TRANSFORM: g0,
      TRANSLATE_3D: y0,
      SCALE_3D: _0,
      ROTATE_X: I0,
      ROTATE_Y: T0,
      ROTATE_Z: h0,
      SKEW: m0,
      PRESERVE_3D: A0,
      FLEX: v0,
      OPACITY: Jt,
      FILTER: ct,
      FONT_VARIATION_SETTINGS: lt,
      WIDTH: ee,
      HEIGHT: te,
      BACKGROUND_COLOR: Wl,
      BORDER_COLOR: O0,
      COLOR: S0,
      CHILDREN: ql,
      IMMEDIATE_CHILDREN: b0,
      SIBLINGS: Gl,
      PARENT: C0,
      DISPLAY: er,
      WILL_CHANGE: Me,
      AUTO: pe,
      COMMA_DELIMITER: ft,
      COLON_DELIMITER: x0,
      BAR_DELIMITER: Kn,
      RENDER_TRANSFORM: jl,
      RENDER_GENERAL: kn,
      RENDER_STYLE: zn,
      RENDER_PLUGIN: Kl,
    } = G),
      ({
        TRANSFORM_MOVE: Fe,
        TRANSFORM_SCALE: De,
        TRANSFORM_ROTATE: we,
        TRANSFORM_SKEW: pt,
        STYLE_OPACITY: kl,
        STYLE_FILTER: dt,
        STYLE_FONT_VARIATION: Et,
        STYLE_SIZE: qe,
        STYLE_BACKGROUND_COLOR: Ge,
        STYLE_BORDER: Ve,
        STYLE_TEXT_COLOR: Ue,
        GENERAL_DISPLAY: nr,
        OBJECT_VALUE: R0,
      } = B),
      (zl = (e) => e.trim()),
      (Yn = Object.freeze({ [Ge]: Wl, [Ve]: O0, [Ue]: S0 })),
      (Yl = Object.freeze({
        [fe]: g0,
        [Wl]: E0,
        [Jt]: Jt,
        [ct]: ct,
        [ee]: ee,
        [te]: te,
        [lt]: lt,
      })),
      ($t = new Map());
    L0 = 1;
    M0 = 1;
    w0 = (e, t) => e === t;
    (Ul = /px/),
      (V0 = (e, t) =>
        t.reduce(
          (r, n) => (r[n.type] == null && (r[n.type] = z0[n.type]), r),
          e || {}
        )),
      (U0 = (e, t) =>
        t.reduce(
          (r, n) => (
            r[n.type] == null &&
              (r[n.type] = Y0[n.type] || n.defaultValue || 0),
            r
          ),
          e || {}
        ));
    (B0 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
      (H0 = (e, t) => (t && (e[t.type] = t.value || 0), e)),
      (W0 = (e, t, r) => {
        if (ge(e)) return qn(e)(r, t);
        switch (e) {
          case dt: {
            let n = (0, Zt.default)(r.filters, ({ type: i }) => i === t);
            return n ? n.value : 0;
          }
          case Et: {
            let n = (0, Zt.default)(r.fontVariations, ({ type: i }) => i === t);
            return n ? n.value : 0;
          }
          default:
            return r[t];
        }
      });
    ($n = {
      [Fe]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
      [De]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
      [we]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
      [pt]: Object.freeze({ xValue: 0, yValue: 0 }),
    }),
      (z0 = Object.freeze({
        blur: 0,
        "hue-rotate": 0,
        invert: 0,
        grayscale: 0,
        saturate: 100,
        sepia: 0,
        contrast: 100,
        brightness: 100,
      })),
      (Y0 = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
      (Q0 = (e, t) => {
        let r = (0, Zt.default)(t.filters, ({ type: n }) => n === e);
        if (r && r.unit) return r.unit;
        switch (e) {
          case "blur":
            return "px";
          case "hue-rotate":
            return "deg";
          default:
            return "%";
        }
      }),
      ($0 = Object.keys($n));
    (rC = "\\(([^)]+)\\)"), (nC = /^rgb/), (iC = RegExp(`rgba?${rC}`));
    Zl =
      ({ effect: e, actionTypeId: t, elementApi: r }) =>
      (n) => {
        switch (t) {
          case Fe:
          case De:
          case we:
          case pt:
            e(n, fe, r);
            break;
          case dt:
            e(n, ct, r);
            break;
          case Et:
            e(n, lt, r);
            break;
          case kl:
            e(n, Jt, r);
            break;
          case qe:
            e(n, ee, r), e(n, te, r);
            break;
          case Ge:
          case Ve:
          case Ue:
            e(n, Yn[t], r);
            break;
          case nr:
            e(n, er, r);
            break;
        }
      };
  });
var Ie = c((Zn) => {
  "use strict";
  Object.defineProperty(Zn, "__esModule", { value: !0 });
  function TC(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  TC(Zn, {
    IX2BrowserSupport: function () {
      return hC;
    },
    IX2EasingUtils: function () {
      return AC;
    },
    IX2Easings: function () {
      return mC;
    },
    IX2ElementsReducer: function () {
      return vC;
    },
    IX2VanillaPlugins: function () {
      return OC;
    },
    IX2VanillaUtils: function () {
      return SC;
    },
  });
  var hC = Xe((zt(), $(Yc))),
    mC = Xe((Sn(), $(st))),
    AC = Xe((bn(), $(rl))),
    vC = Xe((al(), $(ol))),
    OC = Xe((Bn(), $(El))),
    SC = Xe((tf(), $(ef)));
  function rf(e) {
    if (typeof WeakMap != "function") return null;
    var t = new WeakMap(),
      r = new WeakMap();
    return (rf = function (n) {
      return n ? r : t;
    })(e);
  }
  function Xe(e, t) {
    if (!t && e && e.__esModule) return e;
    if (e === null || (typeof e != "object" && typeof e != "function"))
      return { default: e };
    var r = rf(t);
    if (r && r.has(e)) return r.get(e);
    var n = { __proto__: null },
      i = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var o in e)
      if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
        var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
        a && (a.get || a.set) ? Object.defineProperty(n, o, a) : (n[o] = e[o]);
      }
    return (n.default = e), r && r.set(e, n), n;
  }
});
var or,
  ae,
  bC,
  CC,
  xC,
  RC,
  NC,
  LC,
  ir,
  nf,
  PC,
  MC,
  Jn,
  FC,
  DC,
  wC,
  qC,
  of,
  af = M(() => {
    "use strict";
    H();
    (or = R(Ie())),
      (ae = R(ve())),
      ({
        IX2_RAW_DATA_IMPORTED: bC,
        IX2_SESSION_STOPPED: CC,
        IX2_INSTANCE_ADDED: xC,
        IX2_INSTANCE_STARTED: RC,
        IX2_INSTANCE_REMOVED: NC,
        IX2_ANIMATION_FRAME_CHANGED: LC,
      } = w),
      ({
        optimizeFloat: ir,
        applyEasing: nf,
        createBezierEasing: PC,
      } = or.IX2EasingUtils),
      ({ RENDER_GENERAL: MC } = G),
      ({
        getItemConfigByKey: Jn,
        getRenderType: FC,
        getStyleProp: DC,
      } = or.IX2VanillaUtils),
      (wC = (e, t) => {
        let {
            position: r,
            parameterId: n,
            actionGroups: i,
            destinationKeys: o,
            smoothing: a,
            restingValue: s,
            actionTypeId: u,
            customEasingFn: l,
            skipMotion: p,
            skipToValue: d,
          } = e,
          { parameters: f } = t.payload,
          y = Math.max(1 - a, 0.01),
          _ = f[n];
        _ == null && ((y = 1), (_ = s));
        let E = Math.max(_, 0) || 0,
          I = ir(E - r),
          g = p ? d : ir(r + I * y),
          h = g * 100;
        if (g === r && e.current) return e;
        let A, m, b, T;
        for (let v = 0, { length: O } = i; v < O; v++) {
          let { keyframe: C, actionItems: x } = i[v];
          if ((v === 0 && (A = x[0]), h >= C)) {
            A = x[0];
            let N = i[v + 1],
              L = N && h !== C;
            (m = L ? N.actionItems[0] : null),
              L && ((b = C / 100), (T = (N.keyframe - C) / 100));
          }
        }
        let S = {};
        if (A && !m)
          for (let v = 0, { length: O } = o; v < O; v++) {
            let C = o[v];
            S[C] = Jn(u, C, A.config);
          }
        else if (A && m && b !== void 0 && T !== void 0) {
          let v = (g - b) / T,
            O = A.config.easing,
            C = nf(O, v, l);
          for (let x = 0, { length: N } = o; x < N; x++) {
            let L = o[x],
              D = Jn(u, L, A.config),
              Cr = (Jn(u, L, m.config) - D) * C + D;
            S[L] = Cr;
          }
        }
        return (0, ae.merge)(e, { position: g, current: S });
      }),
      (qC = (e, t) => {
        let {
            active: r,
            origin: n,
            start: i,
            immediate: o,
            renderType: a,
            verbose: s,
            actionItem: u,
            destination: l,
            destinationKeys: p,
            pluginDuration: d,
            instanceDelay: f,
            customEasingFn: y,
            skipMotion: _,
          } = e,
          E = u.config.easing,
          { duration: I, delay: g } = u.config;
        d != null && (I = d),
          (g = f ?? g),
          a === MC ? (I = 0) : (o || _) && (I = g = 0);
        let { now: h } = t.payload;
        if (r && n) {
          let A = h - (i + g);
          if (s) {
            let v = h - i,
              O = I + g,
              C = ir(Math.min(Math.max(0, v / O), 1));
            e = (0, ae.set)(e, "verboseTimeElapsed", O * C);
          }
          if (A < 0) return e;
          let m = ir(Math.min(Math.max(0, A / I), 1)),
            b = nf(E, m, y),
            T = {},
            S = null;
          return (
            p.length &&
              (S = p.reduce((v, O) => {
                let C = l[O],
                  x = parseFloat(n[O]) || 0,
                  L = (parseFloat(C) - x) * b + x;
                return (v[O] = L), v;
              }, {})),
            (T.current = S),
            (T.position = m),
            m === 1 && ((T.active = !1), (T.complete = !0)),
            (0, ae.merge)(e, T)
          );
        }
        return e;
      }),
      (of = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case bC:
            return t.payload.ixInstances || Object.freeze({});
          case CC:
            return Object.freeze({});
          case xC: {
            let {
                instanceId: r,
                elementId: n,
                actionItem: i,
                eventId: o,
                eventTarget: a,
                eventStateKey: s,
                actionListId: u,
                groupIndex: l,
                isCarrier: p,
                origin: d,
                destination: f,
                immediate: y,
                verbose: _,
                continuous: E,
                parameterId: I,
                actionGroups: g,
                smoothing: h,
                restingValue: A,
                pluginInstance: m,
                pluginDuration: b,
                instanceDelay: T,
                skipMotion: S,
                skipToValue: v,
              } = t.payload,
              { actionTypeId: O } = i,
              C = FC(O),
              x = DC(C, O),
              N = Object.keys(f).filter(
                (D) => f[D] != null && typeof f[D] != "string"
              ),
              { easing: L } = i.config;
            return (0, ae.set)(e, r, {
              id: r,
              elementId: n,
              active: !1,
              position: 0,
              start: 0,
              origin: d,
              destination: f,
              destinationKeys: N,
              immediate: y,
              verbose: _,
              current: null,
              actionItem: i,
              actionTypeId: O,
              eventId: o,
              eventTarget: a,
              eventStateKey: s,
              actionListId: u,
              groupIndex: l,
              renderType: C,
              isCarrier: p,
              styleProp: x,
              continuous: E,
              parameterId: I,
              actionGroups: g,
              smoothing: h,
              restingValue: A,
              pluginInstance: m,
              pluginDuration: b,
              instanceDelay: T,
              skipMotion: S,
              skipToValue: v,
              customEasingFn:
                Array.isArray(L) && L.length === 4 ? PC(L) : void 0,
            });
          }
          case RC: {
            let { instanceId: r, time: n } = t.payload;
            return (0, ae.mergeIn)(e, [r], {
              active: !0,
              complete: !1,
              start: n,
            });
          }
          case NC: {
            let { instanceId: r } = t.payload;
            if (!e[r]) return e;
            let n = {},
              i = Object.keys(e),
              { length: o } = i;
            for (let a = 0; a < o; a++) {
              let s = i[a];
              s !== r && (n[s] = e[s]);
            }
            return n;
          }
          case LC: {
            let r = e,
              n = Object.keys(e),
              { length: i } = n;
            for (let o = 0; o < i; o++) {
              let a = n[o],
                s = e[a],
                u = s.continuous ? wC : qC;
              r = (0, ae.set)(r, a, u(s, t));
            }
            return r;
          }
          default:
            return e;
        }
      });
  });
var GC,
  VC,
  UC,
  sf,
  uf = M(() => {
    "use strict";
    H();
    ({
      IX2_RAW_DATA_IMPORTED: GC,
      IX2_SESSION_STOPPED: VC,
      IX2_PARAMETER_CHANGED: UC,
    } = w),
      (sf = (e = {}, t) => {
        switch (t.type) {
          case GC:
            return t.payload.ixParameters || {};
          case VC:
            return {};
          case UC: {
            let { key: r, value: n } = t.payload;
            return (e[r] = n), e;
          }
          default:
            return e;
        }
      });
  });
var ff = {};
X(ff, { default: () => BC });
var cf,
  lf,
  XC,
  BC,
  pf = M(() => {
    "use strict";
    cf = R(Hr());
    ho();
    Xo();
    Wo();
    lf = R(Ie());
    af();
    uf();
    ({ ixElements: XC } = lf.IX2ElementsReducer),
      (BC = (0, cf.combineReducers)({
        ixData: To,
        ixRequest: Uo,
        ixSession: Ho,
        ixElements: XC,
        ixInstances: of,
        ixParameters: sf,
      }));
  });
var Ef = c((aq, df) => {
  var HC = ue(),
    WC = q(),
    jC = ne(),
    KC = "[object String]";
  function kC(e) {
    return typeof e == "string" || (!WC(e) && jC(e) && HC(e) == KC);
  }
  df.exports = kC;
});
var yf = c((sq, gf) => {
  var zC = In(),
    YC = zC("length");
  gf.exports = YC;
});
var If = c((uq, _f) => {
  var QC = "\\ud800-\\udfff",
    $C = "\\u0300-\\u036f",
    ZC = "\\ufe20-\\ufe2f",
    JC = "\\u20d0-\\u20ff",
    ex = $C + ZC + JC,
    tx = "\\ufe0e\\ufe0f",
    rx = "\\u200d",
    nx = RegExp("[" + rx + QC + ex + tx + "]");
  function ix(e) {
    return nx.test(e);
  }
  _f.exports = ix;
});
var Cf = c((cq, bf) => {
  var hf = "\\ud800-\\udfff",
    ox = "\\u0300-\\u036f",
    ax = "\\ufe20-\\ufe2f",
    sx = "\\u20d0-\\u20ff",
    ux = ox + ax + sx,
    cx = "\\ufe0e\\ufe0f",
    lx = "[" + hf + "]",
    ei = "[" + ux + "]",
    ti = "\\ud83c[\\udffb-\\udfff]",
    fx = "(?:" + ei + "|" + ti + ")",
    mf = "[^" + hf + "]",
    Af = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    vf = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    px = "\\u200d",
    Of = fx + "?",
    Sf = "[" + cx + "]?",
    dx = "(?:" + px + "(?:" + [mf, Af, vf].join("|") + ")" + Sf + Of + ")*",
    Ex = Sf + Of + dx,
    gx = "(?:" + [mf + ei + "?", ei, Af, vf, lx].join("|") + ")",
    Tf = RegExp(ti + "(?=" + ti + ")|" + gx + Ex, "g");
  function yx(e) {
    for (var t = (Tf.lastIndex = 0); Tf.test(e); ) ++t;
    return t;
  }
  bf.exports = yx;
});
var Rf = c((lq, xf) => {
  var _x = yf(),
    Ix = If(),
    Tx = Cf();
  function hx(e) {
    return Ix(e) ? Tx(e) : _x(e);
  }
  xf.exports = hx;
});
var Lf = c((fq, Nf) => {
  var mx = Gt(),
    Ax = Vt(),
    vx = de(),
    Ox = Ef(),
    Sx = Rf(),
    bx = "[object Map]",
    Cx = "[object Set]";
  function xx(e) {
    if (e == null) return 0;
    if (vx(e)) return Ox(e) ? Sx(e) : e.length;
    var t = Ax(e);
    return t == bx || t == Cx ? e.size : mx(e).length;
  }
  Nf.exports = xx;
});
var Mf = c((pq, Pf) => {
  var Rx = "Expected a function";
  function Nx(e) {
    if (typeof e != "function") throw new TypeError(Rx);
    return function () {
      var t = arguments;
      switch (t.length) {
        case 0:
          return !e.call(this);
        case 1:
          return !e.call(this, t[0]);
        case 2:
          return !e.call(this, t[0], t[1]);
        case 3:
          return !e.call(this, t[0], t[1], t[2]);
      }
      return !e.apply(this, t);
    };
  }
  Pf.exports = Nx;
});
var ri = c((dq, Ff) => {
  var Lx = ce(),
    Px = (function () {
      try {
        var e = Lx(Object, "defineProperty");
        return e({}, "", {}), e;
      } catch {}
    })();
  Ff.exports = Px;
});
var ni = c((Eq, wf) => {
  var Df = ri();
  function Mx(e, t, r) {
    t == "__proto__" && Df
      ? Df(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
      : (e[t] = r);
  }
  wf.exports = Mx;
});
var Gf = c((gq, qf) => {
  var Fx = ni(),
    Dx = xt(),
    wx = Object.prototype,
    qx = wx.hasOwnProperty;
  function Gx(e, t, r) {
    var n = e[t];
    (!(qx.call(e, t) && Dx(n, r)) || (r === void 0 && !(t in e))) &&
      Fx(e, t, r);
  }
  qf.exports = Gx;
});
var Xf = c((yq, Uf) => {
  var Vx = Gf(),
    Ux = it(),
    Xx = Ft(),
    Vf = J(),
    Bx = Le();
  function Hx(e, t, r, n) {
    if (!Vf(e)) return e;
    t = Ux(t, e);
    for (var i = -1, o = t.length, a = o - 1, s = e; s != null && ++i < o; ) {
      var u = Bx(t[i]),
        l = r;
      if (u === "__proto__" || u === "constructor" || u === "prototype")
        return e;
      if (i != a) {
        var p = s[u];
        (l = n ? n(p, u, s) : void 0),
          l === void 0 && (l = Vf(p) ? p : Xx(t[i + 1]) ? [] : {});
      }
      Vx(s, u, l), (s = s[u]);
    }
    return e;
  }
  Uf.exports = Hx;
});
var Hf = c((_q, Bf) => {
  var Wx = Bt(),
    jx = Xf(),
    Kx = it();
  function kx(e, t, r) {
    for (var n = -1, i = t.length, o = {}; ++n < i; ) {
      var a = t[n],
        s = Wx(e, a);
      r(s, a) && jx(o, Kx(a, e), s);
    }
    return o;
  }
  Bf.exports = kx;
});
var jf = c((Iq, Wf) => {
  var zx = Pt(),
    Yx = Nr(),
    Qx = rn(),
    $x = tn(),
    Zx = Object.getOwnPropertySymbols,
    Jx = Zx
      ? function (e) {
          for (var t = []; e; ) zx(t, Qx(e)), (e = Yx(e));
          return t;
        }
      : $x;
  Wf.exports = Jx;
});
var kf = c((Tq, Kf) => {
  function eR(e) {
    var t = [];
    if (e != null) for (var r in Object(e)) t.push(r);
    return t;
  }
  Kf.exports = eR;
});
var Yf = c((hq, zf) => {
  var tR = J(),
    rR = qt(),
    nR = kf(),
    iR = Object.prototype,
    oR = iR.hasOwnProperty;
  function aR(e) {
    if (!tR(e)) return nR(e);
    var t = rR(e),
      r = [];
    for (var n in e) (n == "constructor" && (t || !oR.call(e, n))) || r.push(n);
    return r;
  }
  zf.exports = aR;
});
var $f = c((mq, Qf) => {
  var sR = on(),
    uR = Yf(),
    cR = de();
  function lR(e) {
    return cR(e) ? sR(e, !0) : uR(e);
  }
  Qf.exports = lR;
});
var Jf = c((Aq, Zf) => {
  var fR = en(),
    pR = jf(),
    dR = $f();
  function ER(e) {
    return fR(e, dR, pR);
  }
  Zf.exports = ER;
});
var tp = c((vq, ep) => {
  var gR = _n(),
    yR = le(),
    _R = Hf(),
    IR = Jf();
  function TR(e, t) {
    if (e == null) return {};
    var r = gR(IR(e), function (n) {
      return [n];
    });
    return (
      (t = yR(t)),
      _R(e, r, function (n, i) {
        return t(n, i[0]);
      })
    );
  }
  ep.exports = TR;
});
var np = c((Oq, rp) => {
  var hR = le(),
    mR = Mf(),
    AR = tp();
  function vR(e, t) {
    return AR(e, mR(hR(t)));
  }
  rp.exports = vR;
});
var op = c((Sq, ip) => {
  var OR = Gt(),
    SR = Vt(),
    bR = Ze(),
    CR = q(),
    xR = de(),
    RR = Mt(),
    NR = qt(),
    LR = wt(),
    PR = "[object Map]",
    MR = "[object Set]",
    FR = Object.prototype,
    DR = FR.hasOwnProperty;
  function wR(e) {
    if (e == null) return !0;
    if (
      xR(e) &&
      (CR(e) ||
        typeof e == "string" ||
        typeof e.splice == "function" ||
        RR(e) ||
        LR(e) ||
        bR(e))
    )
      return !e.length;
    var t = SR(e);
    if (t == PR || t == MR) return !e.size;
    if (NR(e)) return !OR(e).length;
    for (var r in e) if (DR.call(e, r)) return !1;
    return !0;
  }
  ip.exports = wR;
});
var sp = c((bq, ap) => {
  var qR = ni(),
    GR = Hn(),
    VR = le();
  function UR(e, t) {
    var r = {};
    return (
      (t = VR(t, 3)),
      GR(e, function (n, i, o) {
        qR(r, i, t(n, i, o));
      }),
      r
    );
  }
  ap.exports = UR;
});
var cp = c((Cq, up) => {
  function XR(e, t) {
    for (
      var r = -1, n = e == null ? 0 : e.length;
      ++r < n && t(e[r], r, e) !== !1;

    );
    return e;
  }
  up.exports = XR;
});
var fp = c((xq, lp) => {
  var BR = Wt();
  function HR(e) {
    return typeof e == "function" ? e : BR;
  }
  lp.exports = HR;
});
var dp = c((Rq, pp) => {
  var WR = cp(),
    jR = Wn(),
    KR = fp(),
    kR = q();
  function zR(e, t) {
    var r = kR(e) ? WR : jR;
    return r(e, KR(t));
  }
  pp.exports = zR;
});
var gp = c((Nq, Ep) => {
  var YR = k(),
    QR = function () {
      return YR.Date.now();
    };
  Ep.exports = QR;
});
var Ip = c((Lq, _p) => {
  var $R = J(),
    ii = gp(),
    yp = jt(),
    ZR = "Expected a function",
    JR = Math.max,
    eN = Math.min;
  function tN(e, t, r) {
    var n,
      i,
      o,
      a,
      s,
      u,
      l = 0,
      p = !1,
      d = !1,
      f = !0;
    if (typeof e != "function") throw new TypeError(ZR);
    (t = yp(t) || 0),
      $R(r) &&
        ((p = !!r.leading),
        (d = "maxWait" in r),
        (o = d ? JR(yp(r.maxWait) || 0, t) : o),
        (f = "trailing" in r ? !!r.trailing : f));
    function y(T) {
      var S = n,
        v = i;
      return (n = i = void 0), (l = T), (a = e.apply(v, S)), a;
    }
    function _(T) {
      return (l = T), (s = setTimeout(g, t)), p ? y(T) : a;
    }
    function E(T) {
      var S = T - u,
        v = T - l,
        O = t - S;
      return d ? eN(O, o - v) : O;
    }
    function I(T) {
      var S = T - u,
        v = T - l;
      return u === void 0 || S >= t || S < 0 || (d && v >= o);
    }
    function g() {
      var T = ii();
      if (I(T)) return h(T);
      s = setTimeout(g, E(T));
    }
    function h(T) {
      return (s = void 0), f && n ? y(T) : ((n = i = void 0), a);
    }
    function A() {
      s !== void 0 && clearTimeout(s), (l = 0), (n = u = i = s = void 0);
    }
    function m() {
      return s === void 0 ? a : h(ii());
    }
    function b() {
      var T = ii(),
        S = I(T);
      if (((n = arguments), (i = this), (u = T), S)) {
        if (s === void 0) return _(u);
        if (d) return clearTimeout(s), (s = setTimeout(g, t)), y(u);
      }
      return s === void 0 && (s = setTimeout(g, t)), a;
    }
    return (b.cancel = A), (b.flush = m), b;
  }
  _p.exports = tN;
});
var hp = c((Pq, Tp) => {
  var rN = Ip(),
    nN = J(),
    iN = "Expected a function";
  function oN(e, t, r) {
    var n = !0,
      i = !0;
    if (typeof e != "function") throw new TypeError(iN);
    return (
      nN(r) &&
        ((n = "leading" in r ? !!r.leading : n),
        (i = "trailing" in r ? !!r.trailing : i)),
      rN(e, t, { leading: n, maxWait: t, trailing: i })
    );
  }
  Tp.exports = oN;
});
var Ap = {};
X(Ap, {
  actionListPlaybackChanged: () => He,
  animationFrameChanged: () => sr,
  clearRequested: () => NN,
  elementStateChanged: () => pi,
  eventListenerAdded: () => ar,
  eventStateChanged: () => ci,
  instanceAdded: () => li,
  instanceRemoved: () => fi,
  instanceStarted: () => ur,
  mediaQueriesDefined: () => Ei,
  parameterChanged: () => Be,
  playbackRequested: () => xN,
  previewRequested: () => CN,
  rawDataImported: () => oi,
  sessionInitialized: () => ai,
  sessionStarted: () => si,
  sessionStopped: () => ui,
  stopRequested: () => RN,
  testFrameRendered: () => LN,
  viewportWidthChanged: () => di,
});
var mp,
  aN,
  sN,
  uN,
  cN,
  lN,
  fN,
  pN,
  dN,
  EN,
  gN,
  yN,
  _N,
  IN,
  TN,
  hN,
  mN,
  AN,
  vN,
  ON,
  SN,
  bN,
  oi,
  ai,
  si,
  ui,
  CN,
  xN,
  RN,
  NN,
  ar,
  LN,
  ci,
  sr,
  Be,
  li,
  ur,
  fi,
  pi,
  He,
  di,
  Ei,
  cr = M(() => {
    "use strict";
    H();
    (mp = R(Ie())),
      ({
        IX2_RAW_DATA_IMPORTED: aN,
        IX2_SESSION_INITIALIZED: sN,
        IX2_SESSION_STARTED: uN,
        IX2_SESSION_STOPPED: cN,
        IX2_PREVIEW_REQUESTED: lN,
        IX2_PLAYBACK_REQUESTED: fN,
        IX2_STOP_REQUESTED: pN,
        IX2_CLEAR_REQUESTED: dN,
        IX2_EVENT_LISTENER_ADDED: EN,
        IX2_TEST_FRAME_RENDERED: gN,
        IX2_EVENT_STATE_CHANGED: yN,
        IX2_ANIMATION_FRAME_CHANGED: _N,
        IX2_PARAMETER_CHANGED: IN,
        IX2_INSTANCE_ADDED: TN,
        IX2_INSTANCE_STARTED: hN,
        IX2_INSTANCE_REMOVED: mN,
        IX2_ELEMENT_STATE_CHANGED: AN,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: vN,
        IX2_VIEWPORT_WIDTH_CHANGED: ON,
        IX2_MEDIA_QUERIES_DEFINED: SN,
      } = w),
      ({ reifyState: bN } = mp.IX2VanillaUtils),
      (oi = (e) => ({ type: aN, payload: { ...bN(e) } })),
      (ai = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
        type: sN,
        payload: { hasBoundaryNodes: e, reducedMotion: t },
      })),
      (si = () => ({ type: uN })),
      (ui = () => ({ type: cN })),
      (CN = ({ rawData: e, defer: t }) => ({
        type: lN,
        payload: { defer: t, rawData: e },
      })),
      (xN = ({
        actionTypeId: e = B.GENERAL_START_ACTION,
        actionListId: t,
        actionItemId: r,
        eventId: n,
        allowEvents: i,
        immediate: o,
        testManual: a,
        verbose: s,
        rawData: u,
      }) => ({
        type: fN,
        payload: {
          actionTypeId: e,
          actionListId: t,
          actionItemId: r,
          testManual: a,
          eventId: n,
          allowEvents: i,
          immediate: o,
          verbose: s,
          rawData: u,
        },
      })),
      (RN = (e) => ({ type: pN, payload: { actionListId: e } })),
      (NN = () => ({ type: dN })),
      (ar = (e, t) => ({
        type: EN,
        payload: { target: e, listenerParams: t },
      })),
      (LN = (e = 1) => ({ type: gN, payload: { step: e } })),
      (ci = (e, t) => ({ type: yN, payload: { stateKey: e, newState: t } })),
      (sr = (e, t) => ({ type: _N, payload: { now: e, parameters: t } })),
      (Be = (e, t) => ({ type: IN, payload: { key: e, value: t } })),
      (li = (e) => ({ type: TN, payload: { ...e } })),
      (ur = (e, t) => ({ type: hN, payload: { instanceId: e, time: t } })),
      (fi = (e) => ({ type: mN, payload: { instanceId: e } })),
      (pi = (e, t, r, n) => ({
        type: AN,
        payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
      })),
      (He = ({ actionListId: e, isPlaying: t }) => ({
        type: vN,
        payload: { actionListId: e, isPlaying: t },
      })),
      (di = ({ width: e, mediaQueries: t }) => ({
        type: ON,
        payload: { width: e, mediaQueries: t },
      })),
      (Ei = () => ({ type: SN }));
  });
var U = {};
X(U, {
  elementContains: () => _i,
  getChildElements: () => XN,
  getClosestElement: () => gt,
  getProperty: () => wN,
  getQuerySelector: () => yi,
  getRefType: () => Ii,
  getSiblingElements: () => BN,
  getStyle: () => DN,
  getValidDocument: () => GN,
  isSiblingNode: () => UN,
  matchSelector: () => qN,
  queryDocument: () => VN,
  setStyle: () => FN,
});
function FN(e, t, r) {
  e.style[t] = r;
}
function DN(e, t) {
  return t.startsWith("--")
    ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
    : e.style[t];
}
function wN(e, t) {
  return e[t];
}
function qN(e) {
  return (t) => t[gi](e);
}
function yi({ id: e, selector: t }) {
  if (e) {
    let r = e;
    if (e.indexOf(vp) !== -1) {
      let n = e.split(vp),
        i = n[0];
      if (((r = n[1]), i !== document.documentElement.getAttribute(Sp)))
        return null;
    }
    return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
  }
  return t;
}
function GN(e) {
  return e == null || e === document.documentElement.getAttribute(Sp)
    ? document
    : null;
}
function VN(e, t) {
  return Array.prototype.slice.call(
    document.querySelectorAll(t ? e + " " + t : e)
  );
}
function _i(e, t) {
  return e.contains(t);
}
function UN(e, t) {
  return e !== t && e.parentNode === t.parentNode;
}
function XN(e) {
  let t = [];
  for (let r = 0, { length: n } = e || []; r < n; r++) {
    let { children: i } = e[r],
      { length: o } = i;
    if (o) for (let a = 0; a < o; a++) t.push(i[a]);
  }
  return t;
}
function BN(e = []) {
  let t = [],
    r = [];
  for (let n = 0, { length: i } = e; n < i; n++) {
    let { parentNode: o } = e[n];
    if (!o || !o.children || !o.children.length || r.indexOf(o) !== -1)
      continue;
    r.push(o);
    let a = o.firstElementChild;
    for (; a != null; )
      e.indexOf(a) === -1 && t.push(a), (a = a.nextElementSibling);
  }
  return t;
}
function Ii(e) {
  return e != null && typeof e == "object"
    ? e instanceof Element
      ? PN
      : MN
    : null;
}
var Op,
  gi,
  vp,
  PN,
  MN,
  Sp,
  gt,
  bp = M(() => {
    "use strict";
    Op = R(Ie());
    H();
    ({ ELEMENT_MATCHES: gi } = Op.IX2BrowserSupport),
      ({
        IX2_ID_DELIMITER: vp,
        HTML_ELEMENT: PN,
        PLAIN_OBJECT: MN,
        WF_PAGE: Sp,
      } = G);
    gt = Element.prototype.closest
      ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
      : (e, t) => {
          if (!document.documentElement.contains(e)) return null;
          let r = e;
          do {
            if (r[gi] && r[gi](t)) return r;
            r = r.parentNode;
          } while (r != null);
          return null;
        };
  });
var Ti = c((Dq, xp) => {
  var HN = J(),
    Cp = Object.create,
    WN = (function () {
      function e() {}
      return function (t) {
        if (!HN(t)) return {};
        if (Cp) return Cp(t);
        e.prototype = t;
        var r = new e();
        return (e.prototype = void 0), r;
      };
    })();
  xp.exports = WN;
});
var lr = c((wq, Rp) => {
  function jN() {}
  Rp.exports = jN;
});
var pr = c((qq, Np) => {
  var KN = Ti(),
    kN = lr();
  function fr(e, t) {
    (this.__wrapped__ = e),
      (this.__actions__ = []),
      (this.__chain__ = !!t),
      (this.__index__ = 0),
      (this.__values__ = void 0);
  }
  fr.prototype = KN(kN.prototype);
  fr.prototype.constructor = fr;
  Np.exports = fr;
});
var Fp = c((Gq, Mp) => {
  var Lp = he(),
    zN = Ze(),
    YN = q(),
    Pp = Lp ? Lp.isConcatSpreadable : void 0;
  function QN(e) {
    return YN(e) || zN(e) || !!(Pp && e && e[Pp]);
  }
  Mp.exports = QN;
});
var qp = c((Vq, wp) => {
  var $N = Pt(),
    ZN = Fp();
  function Dp(e, t, r, n, i) {
    var o = -1,
      a = e.length;
    for (r || (r = ZN), i || (i = []); ++o < a; ) {
      var s = e[o];
      t > 0 && r(s)
        ? t > 1
          ? Dp(s, t - 1, r, n, i)
          : $N(i, s)
        : n || (i[i.length] = s);
    }
    return i;
  }
  wp.exports = Dp;
});
var Vp = c((Uq, Gp) => {
  var JN = qp();
  function eL(e) {
    var t = e == null ? 0 : e.length;
    return t ? JN(e, 1) : [];
  }
  Gp.exports = eL;
});
var Xp = c((Xq, Up) => {
  function tL(e, t, r) {
    switch (r.length) {
      case 0:
        return e.call(t);
      case 1:
        return e.call(t, r[0]);
      case 2:
        return e.call(t, r[0], r[1]);
      case 3:
        return e.call(t, r[0], r[1], r[2]);
    }
    return e.apply(t, r);
  }
  Up.exports = tL;
});
var Wp = c((Bq, Hp) => {
  var rL = Xp(),
    Bp = Math.max;
  function nL(e, t, r) {
    return (
      (t = Bp(t === void 0 ? e.length - 1 : t, 0)),
      function () {
        for (
          var n = arguments, i = -1, o = Bp(n.length - t, 0), a = Array(o);
          ++i < o;

        )
          a[i] = n[t + i];
        i = -1;
        for (var s = Array(t + 1); ++i < t; ) s[i] = n[i];
        return (s[t] = r(a)), rL(e, this, s);
      }
    );
  }
  Hp.exports = nL;
});
var Kp = c((Hq, jp) => {
  function iL(e) {
    return function () {
      return e;
    };
  }
  jp.exports = iL;
});
var Yp = c((Wq, zp) => {
  var oL = Kp(),
    kp = ri(),
    aL = Wt(),
    sL = kp
      ? function (e, t) {
          return kp(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: oL(t),
            writable: !0,
          });
        }
      : aL;
  zp.exports = sL;
});
var $p = c((jq, Qp) => {
  var uL = 800,
    cL = 16,
    lL = Date.now;
  function fL(e) {
    var t = 0,
      r = 0;
    return function () {
      var n = lL(),
        i = cL - (n - r);
      if (((r = n), i > 0)) {
        if (++t >= uL) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  Qp.exports = fL;
});
var Jp = c((Kq, Zp) => {
  var pL = Yp(),
    dL = $p(),
    EL = dL(pL);
  Zp.exports = EL;
});
var td = c((kq, ed) => {
  var gL = Vp(),
    yL = Wp(),
    _L = Jp();
  function IL(e) {
    return _L(yL(e, void 0, gL), e + "");
  }
  ed.exports = IL;
});
var id = c((zq, nd) => {
  var rd = an(),
    TL = rd && new rd();
  nd.exports = TL;
});
var ad = c((Yq, od) => {
  function hL() {}
  od.exports = hL;
});
var hi = c((Qq, ud) => {
  var sd = id(),
    mL = ad(),
    AL = sd
      ? function (e) {
          return sd.get(e);
        }
      : mL;
  ud.exports = AL;
});
var ld = c(($q, cd) => {
  var vL = {};
  cd.exports = vL;
});
var mi = c((Zq, pd) => {
  var fd = ld(),
    OL = Object.prototype,
    SL = OL.hasOwnProperty;
  function bL(e) {
    for (
      var t = e.name + "", r = fd[t], n = SL.call(fd, t) ? r.length : 0;
      n--;

    ) {
      var i = r[n],
        o = i.func;
      if (o == null || o == e) return i.name;
    }
    return t;
  }
  pd.exports = bL;
});
var Er = c((Jq, dd) => {
  var CL = Ti(),
    xL = lr(),
    RL = 4294967295;
  function dr(e) {
    (this.__wrapped__ = e),
      (this.__actions__ = []),
      (this.__dir__ = 1),
      (this.__filtered__ = !1),
      (this.__iteratees__ = []),
      (this.__takeCount__ = RL),
      (this.__views__ = []);
  }
  dr.prototype = CL(xL.prototype);
  dr.prototype.constructor = dr;
  dd.exports = dr;
});
var gd = c((e2, Ed) => {
  function NL(e, t) {
    var r = -1,
      n = e.length;
    for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
    return t;
  }
  Ed.exports = NL;
});
var _d = c((t2, yd) => {
  var LL = Er(),
    PL = pr(),
    ML = gd();
  function FL(e) {
    if (e instanceof LL) return e.clone();
    var t = new PL(e.__wrapped__, e.__chain__);
    return (
      (t.__actions__ = ML(e.__actions__)),
      (t.__index__ = e.__index__),
      (t.__values__ = e.__values__),
      t
    );
  }
  yd.exports = FL;
});
var hd = c((r2, Td) => {
  var DL = Er(),
    Id = pr(),
    wL = lr(),
    qL = q(),
    GL = ne(),
    VL = _d(),
    UL = Object.prototype,
    XL = UL.hasOwnProperty;
  function gr(e) {
    if (GL(e) && !qL(e) && !(e instanceof DL)) {
      if (e instanceof Id) return e;
      if (XL.call(e, "__wrapped__")) return VL(e);
    }
    return new Id(e);
  }
  gr.prototype = wL.prototype;
  gr.prototype.constructor = gr;
  Td.exports = gr;
});
var Ad = c((n2, md) => {
  var BL = Er(),
    HL = hi(),
    WL = mi(),
    jL = hd();
  function KL(e) {
    var t = WL(e),
      r = jL[t];
    if (typeof r != "function" || !(t in BL.prototype)) return !1;
    if (e === r) return !0;
    var n = HL(r);
    return !!n && e === n[0];
  }
  md.exports = KL;
});
var bd = c((i2, Sd) => {
  var vd = pr(),
    kL = td(),
    zL = hi(),
    Ai = mi(),
    YL = q(),
    Od = Ad(),
    QL = "Expected a function",
    $L = 8,
    ZL = 32,
    JL = 128,
    eP = 256;
  function tP(e) {
    return kL(function (t) {
      var r = t.length,
        n = r,
        i = vd.prototype.thru;
      for (e && t.reverse(); n--; ) {
        var o = t[n];
        if (typeof o != "function") throw new TypeError(QL);
        if (i && !a && Ai(o) == "wrapper") var a = new vd([], !0);
      }
      for (n = a ? n : r; ++n < r; ) {
        o = t[n];
        var s = Ai(o),
          u = s == "wrapper" ? zL(o) : void 0;
        u &&
        Od(u[0]) &&
        u[1] == (JL | $L | ZL | eP) &&
        !u[4].length &&
        u[9] == 1
          ? (a = a[Ai(u[0])].apply(a, u[3]))
          : (a = o.length == 1 && Od(o) ? a[s]() : a.thru(o));
      }
      return function () {
        var l = arguments,
          p = l[0];
        if (a && l.length == 1 && YL(p)) return a.plant(p).value();
        for (var d = 0, f = r ? t[d].apply(this, l) : p; ++d < r; )
          f = t[d].call(this, f);
        return f;
      };
    });
  }
  Sd.exports = tP;
});
var xd = c((o2, Cd) => {
  var rP = bd(),
    nP = rP();
  Cd.exports = nP;
});
var Nd = c((a2, Rd) => {
  function iP(e, t, r) {
    return (
      e === e &&
        (r !== void 0 && (e = e <= r ? e : r),
        t !== void 0 && (e = e >= t ? e : t)),
      e
    );
  }
  Rd.exports = iP;
});
var Pd = c((s2, Ld) => {
  var oP = Nd(),
    vi = jt();
  function aP(e, t, r) {
    return (
      r === void 0 && ((r = t), (t = void 0)),
      r !== void 0 && ((r = vi(r)), (r = r === r ? r : 0)),
      t !== void 0 && ((t = vi(t)), (t = t === t ? t : 0)),
      oP(vi(e), t, r)
    );
  }
  Ld.exports = aP;
});
var Xd,
  Bd,
  Hd,
  Wd,
  sP,
  uP,
  cP,
  lP,
  fP,
  pP,
  dP,
  EP,
  gP,
  yP,
  _P,
  IP,
  TP,
  hP,
  mP,
  jd,
  Kd,
  AP,
  vP,
  OP,
  kd,
  SP,
  bP,
  zd,
  CP,
  Oi,
  Yd,
  Md,
  Fd,
  Qd,
  _t,
  xP,
  re,
  $d,
  RP,
  j,
  Q,
  It,
  Zd,
  Si,
  Dd,
  bi,
  NP,
  yt,
  LP,
  PP,
  MP,
  Jd,
  wd,
  FP,
  qd,
  DP,
  wP,
  qP,
  Gd,
  yr,
  _r,
  Vd,
  Ud,
  eE,
  tE = M(() => {
    "use strict";
    (Xd = R(xd())), (Bd = R(Ht())), (Hd = R(Pd()));
    H();
    Ci();
    cr();
    (Wd = R(Ie())),
      ({
        MOUSE_CLICK: sP,
        MOUSE_SECOND_CLICK: uP,
        MOUSE_DOWN: cP,
        MOUSE_UP: lP,
        MOUSE_OVER: fP,
        MOUSE_OUT: pP,
        DROPDOWN_CLOSE: dP,
        DROPDOWN_OPEN: EP,
        SLIDER_ACTIVE: gP,
        SLIDER_INACTIVE: yP,
        TAB_ACTIVE: _P,
        TAB_INACTIVE: IP,
        NAVBAR_CLOSE: TP,
        NAVBAR_OPEN: hP,
        MOUSE_MOVE: mP,
        PAGE_SCROLL_DOWN: jd,
        SCROLL_INTO_VIEW: Kd,
        SCROLL_OUT_OF_VIEW: AP,
        PAGE_SCROLL_UP: vP,
        SCROLLING_IN_VIEW: OP,
        PAGE_FINISH: kd,
        ECOMMERCE_CART_CLOSE: SP,
        ECOMMERCE_CART_OPEN: bP,
        PAGE_START: zd,
        PAGE_SCROLL: CP,
      } = z),
      (Oi = "COMPONENT_ACTIVE"),
      (Yd = "COMPONENT_INACTIVE"),
      ({ COLON_DELIMITER: Md } = G),
      ({ getNamespacedParameterId: Fd } = Wd.IX2VanillaUtils),
      (Qd = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
      (_t = Qd(({ element: e, nativeEvent: t }) => e === t.target)),
      (xP = Qd(({ element: e, nativeEvent: t }) => e.contains(t.target))),
      (re = (0, Xd.default)([_t, xP])),
      ($d = (e, t) => {
        if (t) {
          let { ixData: r } = e.getState(),
            { events: n } = r,
            i = n[t];
          if (i && !NP[i.eventTypeId]) return i;
        }
        return null;
      }),
      (RP = ({ store: e, event: t }) => {
        let { action: r } = t,
          { autoStopEventId: n } = r.config;
        return !!$d(e, n);
      }),
      (j = ({ store: e, event: t, element: r, eventStateKey: n }, i) => {
        let { action: o, id: a } = t,
          { actionListId: s, autoStopEventId: u } = o.config,
          l = $d(e, u);
        return (
          l &&
            We({
              store: e,
              eventId: u,
              eventTarget: r,
              eventStateKey: u + Md + n.split(Md)[1],
              actionListId: (0, Bd.default)(l, "action.config.actionListId"),
            }),
          We({
            store: e,
            eventId: a,
            eventTarget: r,
            eventStateKey: n,
            actionListId: s,
          }),
          Tt({
            store: e,
            eventId: a,
            eventTarget: r,
            eventStateKey: n,
            actionListId: s,
          }),
          i
        );
      }),
      (Q = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
      (It = { handler: Q(re, j) }),
      (Zd = { ...It, types: [Oi, Yd].join(" ") }),
      (Si = [
        { target: window, types: "resize orientationchange", throttle: !0 },
        {
          target: document,
          types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
          throttle: !0,
        },
      ]),
      (Dd = "mouseover mouseout"),
      (bi = { types: Si }),
      (NP = { PAGE_START: zd, PAGE_FINISH: kd }),
      (yt = (() => {
        let e = window.pageXOffset !== void 0,
          r =
            document.compatMode === "CSS1Compat"
              ? document.documentElement
              : document.body;
        return () => ({
          scrollLeft: e ? window.pageXOffset : r.scrollLeft,
          scrollTop: e ? window.pageYOffset : r.scrollTop,
          stiffScrollTop: (0, Hd.default)(
            e ? window.pageYOffset : r.scrollTop,
            0,
            r.scrollHeight - window.innerHeight
          ),
          scrollWidth: r.scrollWidth,
          scrollHeight: r.scrollHeight,
          clientWidth: r.clientWidth,
          clientHeight: r.clientHeight,
          innerWidth: window.innerWidth,
          innerHeight: window.innerHeight,
        });
      })()),
      (LP = (e, t) =>
        !(
          e.left > t.right ||
          e.right < t.left ||
          e.top > t.bottom ||
          e.bottom < t.top
        )),
      (PP = ({ element: e, nativeEvent: t }) => {
        let { type: r, target: n, relatedTarget: i } = t,
          o = e.contains(n);
        if (r === "mouseover" && o) return !0;
        let a = e.contains(i);
        return !!(r === "mouseout" && o && a);
      }),
      (MP = (e) => {
        let {
            element: t,
            event: { config: r },
          } = e,
          { clientWidth: n, clientHeight: i } = yt(),
          o = r.scrollOffsetValue,
          u = r.scrollOffsetUnit === "PX" ? o : (i * (o || 0)) / 100;
        return LP(t.getBoundingClientRect(), {
          left: 0,
          top: u,
          right: n,
          bottom: i - u,
        });
      }),
      (Jd = (e) => (t, r) => {
        let { type: n } = t.nativeEvent,
          i = [Oi, Yd].indexOf(n) !== -1 ? n === Oi : r.isActive,
          o = { ...r, isActive: i };
        return ((!r || o.isActive !== r.isActive) && e(t, o)) || o;
      }),
      (wd = (e) => (t, r) => {
        let n = { elementHovered: PP(t) };
        return (
          ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
            e(t, n)) ||
          n
        );
      }),
      (FP = (e) => (t, r) => {
        let n = { ...r, elementVisible: MP(t) };
        return (
          ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
            e(t, n)) ||
          n
        );
      }),
      (qd =
        (e) =>
        (t, r = {}) => {
          let { stiffScrollTop: n, scrollHeight: i, innerHeight: o } = yt(),
            {
              event: { config: a, eventTypeId: s },
            } = t,
            { scrollOffsetValue: u, scrollOffsetUnit: l } = a,
            p = l === "PX",
            d = i - o,
            f = Number((n / d).toFixed(2));
          if (r && r.percentTop === f) return r;
          let y = (p ? u : (o * (u || 0)) / 100) / d,
            _,
            E,
            I = 0;
          r &&
            ((_ = f > r.percentTop),
            (E = r.scrollingDown !== _),
            (I = E ? f : r.anchorTop));
          let g = s === jd ? f >= I + y : f <= I - y,
            h = {
              ...r,
              percentTop: f,
              inBounds: g,
              anchorTop: I,
              scrollingDown: _,
            };
          return (r && g && (E || h.inBounds !== r.inBounds) && e(t, h)) || h;
        }),
      (DP = (e, t) =>
        e.left > t.left &&
        e.left < t.right &&
        e.top > t.top &&
        e.top < t.bottom),
      (wP = (e) => (t, r) => {
        let n = { finished: document.readyState === "complete" };
        return n.finished && !(r && r.finshed) && e(t), n;
      }),
      (qP = (e) => (t, r) => {
        let n = { started: !0 };
        return r || e(t), n;
      }),
      (Gd =
        (e) =>
        (t, r = { clickCount: 0 }) => {
          let n = { clickCount: (r.clickCount % 2) + 1 };
          return (n.clickCount !== r.clickCount && e(t, n)) || n;
        }),
      (yr = (e = !0) => ({
        ...Zd,
        handler: Q(
          e ? re : _t,
          Jd((t, r) => (r.isActive ? It.handler(t, r) : r))
        ),
      })),
      (_r = (e = !0) => ({
        ...Zd,
        handler: Q(
          e ? re : _t,
          Jd((t, r) => (r.isActive ? r : It.handler(t, r)))
        ),
      })),
      (Vd = {
        ...bi,
        handler: FP((e, t) => {
          let { elementVisible: r } = t,
            { event: n, store: i } = e,
            { ixData: o } = i.getState(),
            { events: a } = o;
          return !a[n.action.config.autoStopEventId] && t.triggered
            ? t
            : (n.eventTypeId === Kd) === r
            ? (j(e), { ...t, triggered: !0 })
            : t;
        }),
      }),
      (Ud = 0.05),
      (eE = {
        [gP]: yr(),
        [yP]: _r(),
        [EP]: yr(),
        [dP]: _r(),
        [hP]: yr(!1),
        [TP]: _r(!1),
        [_P]: yr(),
        [IP]: _r(),
        [bP]: { types: "ecommerce-cart-open", handler: Q(re, j) },
        [SP]: { types: "ecommerce-cart-close", handler: Q(re, j) },
        [sP]: {
          types: "click",
          handler: Q(
            re,
            Gd((e, { clickCount: t }) => {
              RP(e) ? t === 1 && j(e) : j(e);
            })
          ),
        },
        [uP]: {
          types: "click",
          handler: Q(
            re,
            Gd((e, { clickCount: t }) => {
              t === 2 && j(e);
            })
          ),
        },
        [cP]: { ...It, types: "mousedown" },
        [lP]: { ...It, types: "mouseup" },
        [fP]: {
          types: Dd,
          handler: Q(
            re,
            wd((e, t) => {
              t.elementHovered && j(e);
            })
          ),
        },
        [pP]: {
          types: Dd,
          handler: Q(
            re,
            wd((e, t) => {
              t.elementHovered || j(e);
            })
          ),
        },
        [mP]: {
          types: "mousemove mouseout scroll",
          handler: (
            {
              store: e,
              element: t,
              eventConfig: r,
              nativeEvent: n,
              eventStateKey: i,
            },
            o = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
          ) => {
            let {
                basedOn: a,
                selectedAxis: s,
                continuousParameterGroupId: u,
                reverse: l,
                restingState: p = 0,
              } = r,
              {
                clientX: d = o.clientX,
                clientY: f = o.clientY,
                pageX: y = o.pageX,
                pageY: _ = o.pageY,
              } = n,
              E = s === "X_AXIS",
              I = n.type === "mouseout",
              g = p / 100,
              h = u,
              A = !1;
            switch (a) {
              case Z.VIEWPORT: {
                g = E
                  ? Math.min(d, window.innerWidth) / window.innerWidth
                  : Math.min(f, window.innerHeight) / window.innerHeight;
                break;
              }
              case Z.PAGE: {
                let {
                  scrollLeft: m,
                  scrollTop: b,
                  scrollWidth: T,
                  scrollHeight: S,
                } = yt();
                g = E ? Math.min(m + y, T) / T : Math.min(b + _, S) / S;
                break;
              }
              case Z.ELEMENT:
              default: {
                h = Fd(i, u);
                let m = n.type.indexOf("mouse") === 0;
                if (m && re({ element: t, nativeEvent: n }) !== !0) break;
                let b = t.getBoundingClientRect(),
                  { left: T, top: S, width: v, height: O } = b;
                if (!m && !DP({ left: d, top: f }, b)) break;
                (A = !0), (g = E ? (d - T) / v : (f - S) / O);
                break;
              }
            }
            return (
              I && (g > 1 - Ud || g < Ud) && (g = Math.round(g)),
              (a !== Z.ELEMENT || A || A !== o.elementHovered) &&
                ((g = l ? 1 - g : g), e.dispatch(Be(h, g))),
              { elementHovered: A, clientX: d, clientY: f, pageX: y, pageY: _ }
            );
          },
        },
        [CP]: {
          types: Si,
          handler: ({ store: e, eventConfig: t }) => {
            let { continuousParameterGroupId: r, reverse: n } = t,
              { scrollTop: i, scrollHeight: o, clientHeight: a } = yt(),
              s = i / (o - a);
            (s = n ? 1 - s : s), e.dispatch(Be(r, s));
          },
        },
        [OP]: {
          types: Si,
          handler: (
            { element: e, store: t, eventConfig: r, eventStateKey: n },
            i = { scrollPercent: 0 }
          ) => {
            let {
                scrollLeft: o,
                scrollTop: a,
                scrollWidth: s,
                scrollHeight: u,
                clientHeight: l,
              } = yt(),
              {
                basedOn: p,
                selectedAxis: d,
                continuousParameterGroupId: f,
                startsEntering: y,
                startsExiting: _,
                addEndOffset: E,
                addStartOffset: I,
                addOffsetValue: g = 0,
                endOffsetValue: h = 0,
              } = r,
              A = d === "X_AXIS";
            if (p === Z.VIEWPORT) {
              let m = A ? o / s : a / u;
              return (
                m !== i.scrollPercent && t.dispatch(Be(f, m)),
                { scrollPercent: m }
              );
            } else {
              let m = Fd(n, f),
                b = e.getBoundingClientRect(),
                T = (I ? g : 0) / 100,
                S = (E ? h : 0) / 100;
              (T = y ? T : 1 - T), (S = _ ? S : 1 - S);
              let v = b.top + Math.min(b.height * T, l),
                C = b.top + b.height * S - v,
                x = Math.min(l + C, u),
                L = Math.min(Math.max(0, l - v), x) / x;
              return (
                L !== i.scrollPercent && t.dispatch(Be(m, L)),
                { scrollPercent: L }
              );
            }
          },
        },
        [Kd]: Vd,
        [AP]: Vd,
        [jd]: {
          ...bi,
          handler: qd((e, t) => {
            t.scrollingDown && j(e);
          }),
        },
        [vP]: {
          ...bi,
          handler: qd((e, t) => {
            t.scrollingDown || j(e);
          }),
        },
        [kd]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: Q(_t, wP(j)),
        },
        [zd]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: Q(_t, qP(j)),
        },
      });
  });
var IE = {};
X(IE, {
  observeRequests: () => nM,
  startActionGroup: () => Tt,
  startEngine: () => vr,
  stopActionGroup: () => We,
  stopAllActionGroups: () => gE,
  stopEngine: () => Or,
});
function nM(e) {
  Te({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: aM }),
    Te({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: sM }),
    Te({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: uM }),
    Te({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: cM });
}
function iM(e) {
  Te({
    store: e,
    select: ({ ixSession: t }) => t.mediaQueryKey,
    onChange: () => {
      Or(e),
        fE({ store: e, elementApi: U }),
        vr({ store: e, allowEvents: !0 }),
        pE();
    },
  });
}
function oM(e, t) {
  let r = Te({
    store: e,
    select: ({ ixSession: n }) => n.tick,
    onChange: (n) => {
      t(n), r();
    },
  });
}
function aM({ rawData: e, defer: t }, r) {
  let n = () => {
    vr({ store: r, rawData: e, allowEvents: !0 }), pE();
  };
  t ? setTimeout(n, 0) : n();
}
function pE() {
  document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
}
function sM(e, t) {
  let {
      actionTypeId: r,
      actionListId: n,
      actionItemId: i,
      eventId: o,
      allowEvents: a,
      immediate: s,
      testManual: u,
      verbose: l = !0,
    } = e,
    { rawData: p } = e;
  if (n && i && p && s) {
    let d = p.actionLists[n];
    d && (p = KP({ actionList: d, actionItemId: i, rawData: p }));
  }
  if (
    (vr({ store: t, rawData: p, allowEvents: a, testManual: u }),
    (n && r === B.GENERAL_START_ACTION) || xi(r))
  ) {
    We({ store: t, actionListId: n }),
      EE({ store: t, actionListId: n, eventId: o });
    let d = Tt({
      store: t,
      eventId: o,
      actionListId: n,
      immediate: s,
      verbose: l,
    });
    l && d && t.dispatch(He({ actionListId: n, isPlaying: !s }));
  }
}
function uM({ actionListId: e }, t) {
  e ? We({ store: t, actionListId: e }) : gE({ store: t }), Or(t);
}
function cM(e, t) {
  Or(t), fE({ store: t, elementApi: U });
}
function vr({ store: e, rawData: t, allowEvents: r, testManual: n }) {
  let { ixSession: i } = e.getState();
  t && e.dispatch(oi(t)),
    i.active ||
      (e.dispatch(
        ai({
          hasBoundaryNodes: !!document.querySelector(Tr),
          reducedMotion:
            document.body.hasAttribute("data-wf-ix-vacation") &&
            window.matchMedia("(prefers-reduced-motion)").matches,
        })
      ),
      r &&
        (gM(e), lM(), e.getState().ixSession.hasDefinedMediaQueries && iM(e)),
      e.dispatch(si()),
      fM(e, n));
}
function lM() {
  let { documentElement: e } = document;
  e.className.indexOf(rE) === -1 && (e.className += ` ${rE}`);
}
function fM(e, t) {
  let r = (n) => {
    let { ixSession: i, ixParameters: o } = e.getState();
    i.active && (e.dispatch(sr(n, o)), t ? oM(e, r) : requestAnimationFrame(r));
  };
  r(window.performance.now());
}
function Or(e) {
  let { ixSession: t } = e.getState();
  if (t.active) {
    let { eventListeners: r } = t;
    r.forEach(pM), QP(), e.dispatch(ui());
  }
}
function pM({ target: e, listenerParams: t }) {
  e.removeEventListener.apply(e, t);
}
function dM({
  store: e,
  eventStateKey: t,
  eventTarget: r,
  eventId: n,
  eventConfig: i,
  actionListId: o,
  parameterGroup: a,
  smoothing: s,
  restingValue: u,
}) {
  let { ixData: l, ixSession: p } = e.getState(),
    { events: d } = l,
    f = d[n],
    { eventTypeId: y } = f,
    _ = {},
    E = {},
    I = [],
    { continuousActionGroups: g } = a,
    { id: h } = a;
  kP(y, i) && (h = zP(t, h));
  let A = p.hasBoundaryNodes && r ? gt(r, Tr) : null;
  g.forEach((m) => {
    let { keyframe: b, actionItems: T } = m;
    T.forEach((S) => {
      let { actionTypeId: v } = S,
        { target: O } = S.config;
      if (!O) return;
      let C = O.boundaryMode ? A : null,
        x = $P(O) + Ri + v;
      if (((E[x] = EM(E[x], b, S)), !_[x])) {
        _[x] = !0;
        let { config: N } = S;
        hr({
          config: N,
          event: f,
          eventTarget: r,
          elementRoot: C,
          elementApi: U,
        }).forEach((L) => {
          I.push({ element: L, key: x });
        });
      }
    });
  }),
    I.forEach(({ element: m, key: b }) => {
      let T = E[b],
        S = (0, se.default)(T, "[0].actionItems[0]", {}),
        { actionTypeId: v } = S,
        O = Ar(v) ? Li(v)(m, S) : null,
        C = Ni({ element: m, actionItem: S, elementApi: U }, O);
      Pi({
        store: e,
        element: m,
        eventId: n,
        actionListId: o,
        actionItem: S,
        destination: C,
        continuous: !0,
        parameterId: h,
        actionGroups: T,
        smoothing: s,
        restingValue: u,
        pluginInstance: O,
      });
    });
}
function EM(e = [], t, r) {
  let n = [...e],
    i;
  return (
    n.some((o, a) => (o.keyframe === t ? ((i = a), !0) : !1)),
    i == null && ((i = n.length), n.push({ keyframe: t, actionItems: [] })),
    n[i].actionItems.push(r),
    n
  );
}
function gM(e) {
  let { ixData: t } = e.getState(),
    { eventTypeMap: r } = t;
  dE(e),
    (0, je.default)(r, (i, o) => {
      let a = eE[o];
      if (!a) {
        console.warn(`IX2 event type not configured: ${o}`);
        return;
      }
      mM({ logic: a, store: e, events: i });
    });
  let { ixSession: n } = e.getState();
  n.eventListeners.length && _M(e);
}
function _M(e) {
  let t = () => {
    dE(e);
  };
  yM.forEach((r) => {
    window.addEventListener(r, t), e.dispatch(ar(window, [r, t]));
  }),
    t();
}
function dE(e) {
  let { ixSession: t, ixData: r } = e.getState(),
    n = window.innerWidth;
  if (n !== t.viewportWidth) {
    let { mediaQueries: i } = r;
    e.dispatch(di({ width: n, mediaQueries: i }));
  }
}
function mM({ logic: e, store: t, events: r }) {
  AM(r);
  let { types: n, handler: i } = e,
    { ixData: o } = t.getState(),
    { actionLists: a } = o,
    s = IM(r, hM);
  if (!(0, oE.default)(s)) return;
  (0, je.default)(s, (d, f) => {
    let y = r[f],
      { action: _, id: E, mediaQueries: I = o.mediaQueryKeys } = y,
      { actionListId: g } = _.config;
    ZP(I, o.mediaQueryKeys) || t.dispatch(Ei()),
      _.actionTypeId === B.GENERAL_CONTINUOUS_ACTION &&
        (Array.isArray(y.config) ? y.config : [y.config]).forEach((A) => {
          let { continuousParameterGroupId: m } = A,
            b = (0, se.default)(a, `${g}.continuousParameterGroups`, []),
            T = (0, iE.default)(b, ({ id: O }) => O === m),
            S = (A.smoothing || 0) / 100,
            v = (A.restingState || 0) / 100;
          T &&
            d.forEach((O, C) => {
              let x = E + Ri + C;
              dM({
                store: t,
                eventStateKey: x,
                eventTarget: O,
                eventId: E,
                eventConfig: A,
                actionListId: g,
                parameterGroup: T,
                smoothing: S,
                restingValue: v,
              });
            });
        }),
      (_.actionTypeId === B.GENERAL_START_ACTION || xi(_.actionTypeId)) &&
        EE({ store: t, actionListId: g, eventId: E });
  });
  let u = (d) => {
      let { ixSession: f } = t.getState();
      TM(s, (y, _, E) => {
        let I = r[_],
          g = f.eventState[E],
          { action: h, mediaQueries: A = o.mediaQueryKeys } = I;
        if (!mr(A, f.mediaQueryKey)) return;
        let m = (b = {}) => {
          let T = i(
            {
              store: t,
              element: y,
              event: I,
              eventConfig: b,
              nativeEvent: d,
              eventStateKey: E,
            },
            g
          );
          JP(T, g) || t.dispatch(ci(E, T));
        };
        h.actionTypeId === B.GENERAL_CONTINUOUS_ACTION
          ? (Array.isArray(I.config) ? I.config : [I.config]).forEach(m)
          : m();
      });
    },
    l = (0, cE.default)(u, rM),
    p = ({ target: d = document, types: f, throttle: y }) => {
      f.split(" ")
        .filter(Boolean)
        .forEach((_) => {
          let E = y ? l : u;
          d.addEventListener(_, E), t.dispatch(ar(d, [_, E]));
        });
    };
  Array.isArray(n) ? n.forEach(p) : typeof n == "string" && p(e);
}
function AM(e) {
  if (!tM) return;
  let t = {},
    r = "";
  for (let n in e) {
    let { eventTypeId: i, target: o } = e[n],
      a = yi(o);
    t[a] ||
      ((i === z.MOUSE_CLICK || i === z.MOUSE_SECOND_CLICK) &&
        ((t[a] = !0),
        (r += a + "{cursor: pointer;touch-action: manipulation;}")));
  }
  if (r) {
    let n = document.createElement("style");
    (n.textContent = r), document.body.appendChild(n);
  }
}
function EE({ store: e, actionListId: t, eventId: r }) {
  let { ixData: n, ixSession: i } = e.getState(),
    { actionLists: o, events: a } = n,
    s = a[r],
    u = o[t];
  if (u && u.useFirstGroupAsInitialState) {
    let l = (0, se.default)(u, "actionItemGroups[0].actionItems", []),
      p = (0, se.default)(s, "mediaQueries", n.mediaQueryKeys);
    if (!mr(p, i.mediaQueryKey)) return;
    l.forEach((d) => {
      let { config: f, actionTypeId: y } = d,
        _ =
          f?.target?.useEventTarget === !0 && f?.target?.objectId == null
            ? { target: s.target, targets: s.targets }
            : f,
        E = hr({ config: _, event: s, elementApi: U }),
        I = Ar(y);
      E.forEach((g) => {
        let h = I ? Li(y)(g, d) : null;
        Pi({
          destination: Ni({ element: g, actionItem: d, elementApi: U }, h),
          immediate: !0,
          store: e,
          element: g,
          eventId: r,
          actionItem: d,
          actionListId: t,
          pluginInstance: h,
        });
      });
    });
  }
}
function gE({ store: e }) {
  let { ixInstances: t } = e.getState();
  (0, je.default)(t, (r) => {
    if (!r.continuous) {
      let { actionListId: n, verbose: i } = r;
      Mi(r, e), i && e.dispatch(He({ actionListId: n, isPlaying: !1 }));
    }
  });
}
function We({
  store: e,
  eventId: t,
  eventTarget: r,
  eventStateKey: n,
  actionListId: i,
}) {
  let { ixInstances: o, ixSession: a } = e.getState(),
    s = a.hasBoundaryNodes && r ? gt(r, Tr) : null;
  (0, je.default)(o, (u) => {
    let l = (0, se.default)(u, "actionItem.config.target.boundaryMode"),
      p = n ? u.eventStateKey === n : !0;
    if (u.actionListId === i && u.eventId === t && p) {
      if (s && l && !_i(s, u.element)) return;
      Mi(u, e), u.verbose && e.dispatch(He({ actionListId: i, isPlaying: !1 }));
    }
  });
}
function Tt({
  store: e,
  eventId: t,
  eventTarget: r,
  eventStateKey: n,
  actionListId: i,
  groupIndex: o = 0,
  immediate: a,
  verbose: s,
}) {
  let { ixData: u, ixSession: l } = e.getState(),
    { events: p } = u,
    d = p[t] || {},
    { mediaQueries: f = u.mediaQueryKeys } = d,
    y = (0, se.default)(u, `actionLists.${i}`, {}),
    { actionItemGroups: _, useFirstGroupAsInitialState: E } = y;
  if (!_ || !_.length) return !1;
  o >= _.length && (0, se.default)(d, "config.loop") && (o = 0),
    o === 0 && E && o++;
  let g =
      (o === 0 || (o === 1 && E)) && xi(d.action?.actionTypeId)
        ? d.config.delay
        : void 0,
    h = (0, se.default)(_, [o, "actionItems"], []);
  if (!h.length || !mr(f, l.mediaQueryKey)) return !1;
  let A = l.hasBoundaryNodes && r ? gt(r, Tr) : null,
    m = HP(h),
    b = !1;
  return (
    h.forEach((T, S) => {
      let { config: v, actionTypeId: O } = T,
        C = Ar(O),
        { target: x } = v;
      if (!x) return;
      let N = x.boundaryMode ? A : null;
      hr({
        config: v,
        event: d,
        eventTarget: r,
        elementRoot: N,
        elementApi: U,
      }).forEach((D, wi) => {
        let br = C ? Li(O)(D, T) : null,
          Cr = C ? eM(O)(D, T) : null;
        b = !0;
        let AE = m === S && wi === 0,
          vE = WP({ element: D, actionItem: T }),
          OE = Ni({ element: D, actionItem: T, elementApi: U }, br);
        Pi({
          store: e,
          element: D,
          actionItem: T,
          eventId: t,
          eventTarget: r,
          eventStateKey: n,
          actionListId: i,
          groupIndex: o,
          isCarrier: AE,
          computedStyle: vE,
          destination: OE,
          immediate: a,
          verbose: s,
          pluginInstance: br,
          pluginDuration: Cr,
          instanceDelay: g,
        });
      });
    }),
    b
  );
}
function Pi(e) {
  let { store: t, computedStyle: r, ...n } = e,
    {
      element: i,
      actionItem: o,
      immediate: a,
      pluginInstance: s,
      continuous: u,
      restingValue: l,
      eventId: p,
    } = n,
    d = !u,
    f = XP(),
    { ixElements: y, ixSession: _, ixData: E } = t.getState(),
    I = UP(y, i),
    { refState: g } = y[I] || {},
    h = Ii(i),
    A = _.reducedMotion && Kr[o.actionTypeId],
    m;
  if (A && u)
    switch (E.events[p]?.eventTypeId) {
      case z.MOUSE_MOVE:
      case z.MOUSE_MOVE_IN_VIEWPORT:
        m = l;
        break;
      default:
        m = 0.5;
        break;
    }
  let b = jP(i, g, r, o, U, s);
  if (
    (t.dispatch(
      li({
        instanceId: f,
        elementId: I,
        origin: b,
        refType: h,
        skipMotion: A,
        skipToValue: m,
        ...n,
      })
    ),
    yE(document.body, "ix2-animation-started", f),
    a)
  ) {
    vM(t, f);
    return;
  }
  Te({ store: t, select: ({ ixInstances: T }) => T[f], onChange: _E }),
    d && t.dispatch(ur(f, _.tick));
}
function Mi(e, t) {
  yE(document.body, "ix2-animation-stopping", {
    instanceId: e.id,
    state: t.getState(),
  });
  let { elementId: r, actionItem: n } = e,
    { ixElements: i } = t.getState(),
    { ref: o, refType: a } = i[r] || {};
  a === lE && YP(o, n, U), t.dispatch(fi(e.id));
}
function yE(e, t, r) {
  let n = document.createEvent("CustomEvent");
  n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
}
function vM(e, t) {
  let { ixParameters: r } = e.getState();
  e.dispatch(ur(t, 0)), e.dispatch(sr(performance.now(), r));
  let { ixInstances: n } = e.getState();
  _E(n[t], e);
}
function _E(e, t) {
  let {
      active: r,
      continuous: n,
      complete: i,
      elementId: o,
      actionItem: a,
      actionTypeId: s,
      renderType: u,
      current: l,
      groupIndex: p,
      eventId: d,
      eventTarget: f,
      eventStateKey: y,
      actionListId: _,
      isCarrier: E,
      styleProp: I,
      verbose: g,
      pluginInstance: h,
    } = e,
    { ixData: A, ixSession: m } = t.getState(),
    { events: b } = A,
    T = b[d] || {},
    { mediaQueries: S = A.mediaQueryKeys } = T;
  if (mr(S, m.mediaQueryKey) && (n || r || i)) {
    if (l || (u === VP && i)) {
      t.dispatch(pi(o, s, l, a));
      let { ixElements: v } = t.getState(),
        { ref: O, refType: C, refState: x } = v[o] || {},
        N = x && x[s];
      (C === lE || Ar(s)) && BP(O, x, N, d, a, I, U, u, h);
    }
    if (i) {
      if (E) {
        let v = Tt({
          store: t,
          eventId: d,
          eventTarget: f,
          eventStateKey: y,
          actionListId: _,
          groupIndex: p + 1,
          verbose: g,
        });
        g && !v && t.dispatch(He({ actionListId: _, isPlaying: !1 }));
      }
      Mi(e, t);
    }
  }
}
var iE,
  se,
  oE,
  aE,
  sE,
  uE,
  je,
  cE,
  Ir,
  GP,
  xi,
  Ri,
  Tr,
  lE,
  VP,
  rE,
  hr,
  UP,
  Ni,
  Te,
  XP,
  BP,
  fE,
  HP,
  WP,
  jP,
  KP,
  kP,
  zP,
  mr,
  YP,
  QP,
  $P,
  ZP,
  JP,
  Ar,
  Li,
  eM,
  nE,
  tM,
  rM,
  yM,
  IM,
  TM,
  hM,
  Ci = M(() => {
    "use strict";
    (iE = R(An())),
      (se = R(Ht())),
      (oE = R(Lf())),
      (aE = R(np())),
      (sE = R(op())),
      (uE = R(sp())),
      (je = R(dp())),
      (cE = R(hp()));
    H();
    Ir = R(Ie());
    cr();
    bp();
    tE();
    (GP = Object.keys(mt)),
      (xi = (e) => GP.includes(e)),
      ({
        COLON_DELIMITER: Ri,
        BOUNDARY_SELECTOR: Tr,
        HTML_ELEMENT: lE,
        RENDER_GENERAL: VP,
        W_MOD_IX: rE,
      } = G),
      ({
        getAffectedElements: hr,
        getElementId: UP,
        getDestinationValues: Ni,
        observeStore: Te,
        getInstanceId: XP,
        renderHTMLElement: BP,
        clearAllStyles: fE,
        getMaxDurationItemIndex: HP,
        getComputedStyle: WP,
        getInstanceOrigin: jP,
        reduceListToGroup: KP,
        shouldNamespaceEventParameter: kP,
        getNamespacedParameterId: zP,
        shouldAllowMediaQuery: mr,
        cleanupHTMLElement: YP,
        clearObjectCache: QP,
        stringifyTarget: $P,
        mediaQueriesEqual: ZP,
        shallowEqual: JP,
      } = Ir.IX2VanillaUtils),
      ({
        isPluginType: Ar,
        createPluginInstance: Li,
        getPluginDuration: eM,
      } = Ir.IX2VanillaPlugins),
      (nE = navigator.userAgent),
      (tM = nE.match(/iPad/i) || nE.match(/iPhone/)),
      (rM = 12);
    yM = ["resize", "orientationchange"];
    (IM = (e, t) => (0, aE.default)((0, uE.default)(e, t), sE.default)),
      (TM = (e, t) => {
        (0, je.default)(e, (r, n) => {
          r.forEach((i, o) => {
            let a = n + Ri + o;
            t(i, n, a);
          });
        });
      }),
      (hM = (e) => {
        let t = { target: e.target, targets: e.targets };
        return hr({ config: t, elementApi: U });
      });
  });
var mE = c((Di) => {
  "use strict";
  Object.defineProperty(Di, "__esModule", { value: !0 });
  function OM(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  OM(Di, {
    actions: function () {
      return CM;
    },
    destroy: function () {
      return hE;
    },
    init: function () {
      return LM;
    },
    setEnv: function () {
      return NM;
    },
    store: function () {
      return Sr;
    },
  });
  var SM = Hr(),
    bM = xM((pf(), $(ff))),
    Fi = (Ci(), $(IE)),
    CM = RM((cr(), $(Ap)));
  function xM(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function TE(e) {
    if (typeof WeakMap != "function") return null;
    var t = new WeakMap(),
      r = new WeakMap();
    return (TE = function (n) {
      return n ? r : t;
    })(e);
  }
  function RM(e, t) {
    if (!t && e && e.__esModule) return e;
    if (e === null || (typeof e != "object" && typeof e != "function"))
      return { default: e };
    var r = TE(t);
    if (r && r.has(e)) return r.get(e);
    var n = { __proto__: null },
      i = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var o in e)
      if (o !== "default" && Object.prototype.hasOwnProperty.call(e, o)) {
        var a = i ? Object.getOwnPropertyDescriptor(e, o) : null;
        a && (a.get || a.set) ? Object.defineProperty(n, o, a) : (n[o] = e[o]);
      }
    return (n.default = e), r && r.set(e, n), n;
  }
  var Sr = (0, SM.createStore)(bM.default);
  function NM(e) {
    e() && (0, Fi.observeRequests)(Sr);
  }
  function LM(e) {
    hE(), (0, Fi.startEngine)({ store: Sr, rawData: e, allowEvents: !0 });
  }
  function hE() {
    (0, Fi.stopEngine)(Sr);
  }
});
function y2() {
  let e = mE();
  return e.setEnv(() => !0), e;
}
export { y2 as createIX2Engine };
/*! Bundled license information:

timm/lib/timm.js:
  (*!
   * Timm
   *
   * Immutability helpers with fast reads and acceptable writes.
   *
   * @copyright Guillermo Grau Panea 2016
   * @license MIT
   *)
*/
