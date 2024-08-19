/*!
 * Webflow: Front-end site library
 * @license MIT
 * Inline scripts may access the api using an async handler:
 *   var Webflow = Webflow || [];
 *   Webflow.push(readyFunction);
 */

var OE = Object.create;
var mt = Object.defineProperty;
var RE = Object.getOwnPropertyDescriptor;
var bE = Object.getOwnPropertyNames;
var xE = Object.getPrototypeOf,
  CE = Object.prototype.hasOwnProperty;
var D = (e, t) => () => (e && (t = e((e = 0))), t);
var c = (e, t) => () => (t || e((t = { exports: {} }).exports, t), t.exports),
  U = (e, t) => {
    for (var r in t) mt(e, r, { get: t[r], enumerable: !0 });
  },
  Go = (e, t, r, n) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let o of bE(t))
        !CE.call(e, o) &&
          o !== r &&
          mt(e, o, {
            get: () => t[o],
            enumerable: !(n = RE(t, o)) || n.enumerable,
          });
    return e;
  };
var C = (e, t, r) => (
    (r = e != null ? OE(xE(e)) : {}),
    Go(
      t || !e || !e.__esModule
        ? mt(r, "default", { value: e, enumerable: !0 })
        : r,
      e
    )
  ),
  $ = (e) => Go(mt({}, "__esModule", { value: !0 }), e);
var xr = c((DD, Xo) => {
  var PE =
    typeof global == "object" && global && global.Object === Object && global;
  Xo.exports = PE;
});
var j = c((MD, Vo) => {
  var NE = xr(),
    LE = typeof self == "object" && self && self.Object === Object && self,
    DE = NE || LE || Function("return this")();
  Vo.exports = DE;
});
var me = c((FD, Uo) => {
  var ME = j(),
    FE = ME.Symbol;
  Uo.exports = FE;
});
var ko = c((wD, Wo) => {
  var Bo = me(),
    Ho = Object.prototype,
    wE = Ho.hasOwnProperty,
    qE = Ho.toString,
    Ke = Bo ? Bo.toStringTag : void 0;
  function GE(e) {
    var t = wE.call(e, Ke),
      r = e[Ke];
    try {
      e[Ke] = void 0;
      var n = !0;
    } catch {}
    var o = qE.call(e);
    return n && (t ? (e[Ke] = r) : delete e[Ke]), o;
  }
  Wo.exports = GE;
});
var jo = c((qD, Ko) => {
  var XE = Object.prototype,
    VE = XE.toString;
  function UE(e) {
    return VE.call(e);
  }
  Ko.exports = UE;
});
var ue = c((GD, Qo) => {
  var zo = me(),
    BE = ko(),
    HE = jo(),
    WE = "[object Null]",
    kE = "[object Undefined]",
    Yo = zo ? zo.toStringTag : void 0;
  function KE(e) {
    return e == null
      ? e === void 0
        ? kE
        : WE
      : Yo && Yo in Object(e)
      ? BE(e)
      : HE(e);
  }
  Qo.exports = KE;
});
var Cr = c((XD, $o) => {
  function jE(e, t) {
    return function (r) {
      return e(t(r));
    };
  }
  $o.exports = jE;
});
var Pr = c((VD, Zo) => {
  var zE = Cr(),
    YE = zE(Object.getPrototypeOf, Object);
  Zo.exports = YE;
});
var ne = c((UD, Jo) => {
  function QE(e) {
    return e != null && typeof e == "object";
  }
  Jo.exports = QE;
});
var Nr = c((BD, ti) => {
  var $E = ue(),
    ZE = Pr(),
    JE = ne(),
    eg = "[object Object]",
    tg = Function.prototype,
    rg = Object.prototype,
    ei = tg.toString,
    ng = rg.hasOwnProperty,
    og = ei.call(Object);
  function ig(e) {
    if (!JE(e) || $E(e) != eg) return !1;
    var t = ZE(e);
    if (t === null) return !0;
    var r = ng.call(t, "constructor") && t.constructor;
    return typeof r == "function" && r instanceof r && ei.call(r) == og;
  }
  ti.exports = ig;
});
var ri = c((Lr) => {
  "use strict";
  Object.defineProperty(Lr, "__esModule", { value: !0 });
  Lr.default = ag;
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
var ni = c((Mr, Dr) => {
  "use strict";
  Object.defineProperty(Mr, "__esModule", { value: !0 });
  var sg = ri(),
    ug = cg(sg);
  function cg(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var he;
  typeof self < "u"
    ? (he = self)
    : typeof window < "u"
    ? (he = window)
    : typeof global < "u"
    ? (he = global)
    : typeof Dr < "u"
    ? (he = Dr)
    : (he = Function("return this")());
  var lg = (0, ug.default)(he);
  Mr.default = lg;
});
var Fr = c((je) => {
  "use strict";
  je.__esModule = !0;
  je.ActionTypes = void 0;
  je.default = si;
  var fg = Nr(),
    pg = ai(fg),
    dg = ni(),
    oi = ai(dg);
  function ai(e) {
    return e && e.__esModule ? e : { default: e };
  }
  var ii = (je.ActionTypes = { INIT: "@@redux/INIT" });
  function si(e, t, r) {
    var n;
    if (
      (typeof t == "function" && typeof r > "u" && ((r = t), (t = void 0)),
      typeof r < "u")
    ) {
      if (typeof r != "function")
        throw new Error("Expected the enhancer to be a function.");
      return r(si)(e, t);
    }
    if (typeof e != "function")
      throw new Error("Expected the reducer to be a function.");
    var o = e,
      i = t,
      a = [],
      s = a,
      u = !1;
    function l() {
      s === a && (s = a.slice());
    }
    function p() {
      return i;
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
            var m = s.indexOf(E);
            s.splice(m, 1);
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
        (u = !0), (i = o(i, E));
      } finally {
        u = !1;
      }
      for (var I = (a = s), g = 0; g < I.length; g++) I[g]();
      return E;
    }
    function y(E) {
      if (typeof E != "function")
        throw new Error("Expected the nextReducer to be a function.");
      (o = E), f({ type: ii.INIT });
    }
    function _() {
      var E,
        I = d;
      return (
        (E = {
          subscribe: function (m) {
            if (typeof m != "object")
              throw new TypeError("Expected the observer to be an object.");
            function A() {
              m.next && m.next(p());
            }
            A();
            var h = I(A);
            return { unsubscribe: h };
          },
        }),
        (E[oi.default] = function () {
          return this;
        }),
        E
      );
    }
    return (
      f({ type: ii.INIT }),
      (n = { dispatch: f, subscribe: d, getState: p, replaceReducer: y }),
      (n[oi.default] = _),
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
var li = c((Gr) => {
  "use strict";
  Gr.__esModule = !0;
  Gr.default = Tg;
  var ui = Fr(),
    gg = Nr(),
    KD = ci(gg),
    yg = qr(),
    jD = ci(yg);
  function ci(e) {
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
        n = r(void 0, { type: ui.ActionTypes.INIT });
      if (typeof n > "u")
        throw new Error(
          'Reducer "' +
            t +
            '" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined.'
        );
      var o =
        "@@redux/PROBE_UNKNOWN_ACTION_" +
        Math.random().toString(36).substring(7).split("").join(".");
      if (typeof r(void 0, { type: o }) > "u")
        throw new Error(
          'Reducer "' +
            t +
            '" returned undefined when probed with a random type. ' +
            ("Don't try to handle " +
              ui.ActionTypes.INIT +
              ' or other actions in "redux/*" ') +
            "namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined."
        );
    });
  }
  function Tg(e) {
    for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
      var o = t[n];
      typeof e[o] == "function" && (r[o] = e[o]);
    }
    var i = Object.keys(r);
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
      for (var f = !1, y = {}, _ = 0; _ < i.length; _++) {
        var E = i[_],
          I = r[E],
          g = l[E],
          m = I(g, p);
        if (typeof m > "u") {
          var A = _g(E, p);
          throw new Error(A);
        }
        (y[E] = m), (f = f || m !== g);
      }
      return f ? y : l;
    };
  }
});
var pi = c((Xr) => {
  "use strict";
  Xr.__esModule = !0;
  Xr.default = mg;
  function fi(e, t) {
    return function () {
      return t(e.apply(void 0, arguments));
    };
  }
  function mg(e, t) {
    if (typeof e == "function") return fi(e, t);
    if (typeof e != "object" || e === null)
      throw new Error(
        "bindActionCreators expected an object or a function, instead received " +
          (e === null ? "null" : typeof e) +
          '. Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?'
      );
    for (var r = Object.keys(e), n = {}, o = 0; o < r.length; o++) {
      var i = r[o],
        a = e[i];
      typeof a == "function" && (n[i] = fi(a, t));
    }
    return n;
  }
});
var Ur = c((Vr) => {
  "use strict";
  Vr.__esModule = !0;
  Vr.default = hg;
  function hg() {
    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    if (t.length === 0)
      return function (i) {
        return i;
      };
    if (t.length === 1) return t[0];
    var n = t[t.length - 1],
      o = t.slice(0, -1);
    return function () {
      return o.reduceRight(function (i, a) {
        return a(i);
      }, n.apply(void 0, arguments));
    };
  }
});
var di = c((Br) => {
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
  Br.default = Rg;
  var vg = Ur(),
    Sg = Og(vg);
  function Og(e) {
    return e && e.__esModule ? e : { default: e };
  }
  function Rg() {
    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++)
      t[r] = arguments[r];
    return function (n) {
      return function (o, i, a) {
        var s = n(o, i, a),
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
          (u = Sg.default.apply(void 0, l)(s.dispatch)),
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
  var bg = Fr(),
    xg = Ae(bg),
    Cg = li(),
    Pg = Ae(Cg),
    Ng = pi(),
    Lg = Ae(Ng),
    Dg = di(),
    Mg = Ae(Dg),
    Fg = Ur(),
    wg = Ae(Fg),
    qg = qr(),
    ZD = Ae(qg);
  function Ae(e) {
    return e && e.__esModule ? e : { default: e };
  }
  K.createStore = xg.default;
  K.combineReducers = Pg.default;
  K.bindActionCreators = Lg.default;
  K.applyMiddleware = Mg.default;
  K.compose = wg.default;
});
var z,
  Wr,
  Z,
  Gg,
  Xg,
  ht,
  Vg,
  kr = D(() => {
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
      (Xg = {
        CHILDREN: "CHILDREN",
        SIBLINGS: "SIBLINGS",
        IMMEDIATE_CHILDREN: "IMMEDIATE_CHILDREN",
      }),
      (ht = {
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
      (Vg = {
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
  Ug,
  At = D(() => {
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
      (Ug = {
        ELEMENT: "ELEMENT",
        ELEMENT_CLASS: "ELEMENT_CLASS",
        TRIGGER_ELEMENT: "TRIGGER_ELEMENT",
      });
  });
var Bg,
  Ei = D(() => {
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
  kg,
  Kg,
  jg,
  zg,
  Yg,
  Kr,
  gi = D(() => {
    "use strict";
    At();
    ({
      TRANSFORM_MOVE: Hg,
      TRANSFORM_SCALE: Wg,
      TRANSFORM_ROTATE: kg,
      TRANSFORM_SKEW: Kg,
      STYLE_SIZE: jg,
      STYLE_FILTER: zg,
      STYLE_FONT_VARIATION: Yg,
    } = B),
      (Kr = {
        [Hg]: !0,
        [Wg]: !0,
        [kg]: !0,
        [Kg]: !0,
        [jg]: !0,
        [zg]: !0,
        [Yg]: !0,
      });
  });
var w = {};
U(w, {
  IX2_ACTION_LIST_PLAYBACK_CHANGED: () => py,
  IX2_ANIMATION_FRAME_CHANGED: () => ay,
  IX2_CLEAR_REQUESTED: () => ny,
  IX2_ELEMENT_STATE_CHANGED: () => fy,
  IX2_EVENT_LISTENER_ADDED: () => oy,
  IX2_EVENT_STATE_CHANGED: () => iy,
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
  oy,
  iy,
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
  yi = D(() => {
    "use strict";
    (Qg = "IX2_RAW_DATA_IMPORTED"),
      ($g = "IX2_SESSION_INITIALIZED"),
      (Zg = "IX2_SESSION_STARTED"),
      (Jg = "IX2_SESSION_STOPPED"),
      (ey = "IX2_PREVIEW_REQUESTED"),
      (ty = "IX2_PLAYBACK_REQUESTED"),
      (ry = "IX2_STOP_REQUESTED"),
      (ny = "IX2_CLEAR_REQUESTED"),
      (oy = "IX2_EVENT_LISTENER_ADDED"),
      (iy = "IX2_EVENT_STATE_CHANGED"),
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
U(G, {
  ABSTRACT_NODE: () => d_,
  AUTO: () => r_,
  BACKGROUND: () => Qy,
  BACKGROUND_COLOR: () => Yy,
  BAR_DELIMITER: () => i_,
  BORDER_COLOR: () => $y,
  BOUNDARY_SELECTOR: () => my,
  CHILDREN: () => a_,
  COLON_DELIMITER: () => o_,
  COLOR: () => Zy,
  COMMA_DELIMITER: () => n_,
  CONFIG_UNIT: () => xy,
  CONFIG_VALUE: () => Sy,
  CONFIG_X_UNIT: () => Oy,
  CONFIG_X_VALUE: () => hy,
  CONFIG_Y_UNIT: () => Ry,
  CONFIG_Y_VALUE: () => Ay,
  CONFIG_Z_UNIT: () => by,
  CONFIG_Z_VALUE: () => vy,
  DISPLAY: () => Jy,
  FILTER: () => ky,
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
  ROTATE_Y: () => Xy,
  ROTATE_Z: () => Vy,
  SCALE_3D: () => qy,
  SCALE_X: () => My,
  SCALE_Y: () => Fy,
  SCALE_Z: () => wy,
  SIBLINGS: () => u_,
  SKEW: () => Uy,
  SKEW_X: () => By,
  SKEW_Y: () => Hy,
  TRANSFORM: () => Cy,
  TRANSLATE_3D: () => Dy,
  TRANSLATE_X: () => Py,
  TRANSLATE_Y: () => Ny,
  TRANSLATE_Z: () => Ly,
  WF_PAGE: () => _y,
  WIDTH: () => jy,
  WILL_CHANGE: () => t_,
  W_MOD_IX: () => Ty,
  W_MOD_JS: () => Iy,
});
var yy,
  _y,
  Iy,
  Ty,
  my,
  hy,
  Ay,
  vy,
  Sy,
  Oy,
  Ry,
  by,
  xy,
  Cy,
  Py,
  Ny,
  Ly,
  Dy,
  My,
  Fy,
  wy,
  qy,
  Gy,
  Xy,
  Vy,
  Uy,
  By,
  Hy,
  Wy,
  ky,
  Ky,
  jy,
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
  o_,
  i_,
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
  _i = D(() => {
    "use strict";
    (yy = "|"),
      (_y = "data-wf-page"),
      (Iy = "w-mod-js"),
      (Ty = "w-mod-ix"),
      (my = ".w-dyn-item"),
      (hy = "xValue"),
      (Ay = "yValue"),
      (vy = "zValue"),
      (Sy = "value"),
      (Oy = "xUnit"),
      (Ry = "yUnit"),
      (by = "zUnit"),
      (xy = "unit"),
      (Cy = "transform"),
      (Py = "translateX"),
      (Ny = "translateY"),
      (Ly = "translateZ"),
      (Dy = "translate3d"),
      (My = "scaleX"),
      (Fy = "scaleY"),
      (wy = "scaleZ"),
      (qy = "scale3d"),
      (Gy = "rotateX"),
      (Xy = "rotateY"),
      (Vy = "rotateZ"),
      (Uy = "skew"),
      (By = "skewX"),
      (Hy = "skewY"),
      (Wy = "opacity"),
      (ky = "filter"),
      (Ky = "font-variation-settings"),
      (jy = "width"),
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
      (o_ = ":"),
      (i_ = "|"),
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
var Ii = {};
U(Ii, {
  ActionAppliesTo: () => Ug,
  ActionTypeConsts: () => B,
  EventAppliesTo: () => Wr,
  EventBasedOn: () => Z,
  EventContinuousMouseAxes: () => Gg,
  EventLimitAffectedElements: () => Xg,
  EventTypeConsts: () => z,
  IX2EngineActionTypes: () => w,
  IX2EngineConstants: () => G,
  InteractionTypeConsts: () => Bg,
  QuickEffectDirectionConsts: () => Vg,
  QuickEffectIds: () => ht,
  ReducedMotionTypes: () => Kr,
});
var H = D(() => {
  "use strict";
  kr();
  At();
  Ei();
  gi();
  yi();
  _i();
  At();
  kr();
});
var I_,
  Ti,
  mi = D(() => {
    "use strict";
    H();
    ({ IX2_RAW_DATA_IMPORTED: I_ } = w),
      (Ti = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case I_:
            return t.payload.ixData || Object.freeze({});
          default:
            return e;
        }
      });
  });
var ve = c((M) => {
  "use strict";
  Object.defineProperty(M, "__esModule", { value: !0 });
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
  M.clone = St;
  M.addLast = vi;
  M.addFirst = Si;
  M.removeLast = Oi;
  M.removeFirst = Ri;
  M.insert = bi;
  M.removeAt = xi;
  M.replaceAt = Ci;
  M.getIn = Ot;
  M.set = Rt;
  M.setIn = bt;
  M.update = Ni;
  M.updateIn = Li;
  M.merge = Di;
  M.mergeDeep = Mi;
  M.mergeIn = Fi;
  M.omit = wi;
  M.addDefaults = qi;
  var hi = "INVALID_ARGS";
  function Ai(e) {
    throw new Error(e);
  }
  function jr(e) {
    var t = Object.keys(e);
    return Object.getOwnPropertySymbols
      ? t.concat(Object.getOwnPropertySymbols(e))
      : t;
  }
  var m_ = {}.hasOwnProperty;
  function St(e) {
    if (Array.isArray(e)) return e.slice();
    for (var t = jr(e), r = {}, n = 0; n < t.length; n++) {
      var o = t[n];
      r[o] = e[o];
    }
    return r;
  }
  function W(e, t, r) {
    var n = r;
    n == null && Ai(hi);
    for (
      var o = !1, i = arguments.length, a = Array(i > 3 ? i - 3 : 0), s = 3;
      s < i;
      s++
    )
      a[s - 3] = arguments[s];
    for (var u = 0; u < a.length; u++) {
      var l = a[u];
      if (l != null) {
        var p = jr(l);
        if (p.length)
          for (var d = 0; d <= p.length; d++) {
            var f = p[d];
            if (!(e && n[f] !== void 0)) {
              var y = l[f];
              t && vt(n[f]) && vt(y) && (y = W(e, t, n[f], y)),
                !(y === void 0 || y === n[f]) &&
                  (o || ((o = !0), (n = St(n))), (n[f] = y));
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
  function vi(e, t) {
    return Array.isArray(t) ? e.concat(t) : e.concat([t]);
  }
  function Si(e, t) {
    return Array.isArray(t) ? t.concat(e) : [t].concat(e);
  }
  function Oi(e) {
    return e.length ? e.slice(0, e.length - 1) : e;
  }
  function Ri(e) {
    return e.length ? e.slice(1) : e;
  }
  function bi(e, t, r) {
    return e
      .slice(0, t)
      .concat(Array.isArray(r) ? r : [r])
      .concat(e.slice(t));
  }
  function xi(e, t) {
    return t >= e.length || t < 0 ? e : e.slice(0, t).concat(e.slice(t + 1));
  }
  function Ci(e, t, r) {
    if (e[t] === r) return e;
    for (var n = e.length, o = Array(n), i = 0; i < n; i++) o[i] = e[i];
    return (o[t] = r), o;
  }
  function Ot(e, t) {
    if ((!Array.isArray(t) && Ai(hi), e != null)) {
      for (var r = e, n = 0; n < t.length; n++) {
        var o = t[n];
        if (((r = r?.[o]), r === void 0)) return r;
      }
      return r;
    }
  }
  function Rt(e, t, r) {
    var n = typeof t == "number" ? [] : {},
      o = e ?? n;
    if (o[t] === r) return o;
    var i = St(o);
    return (i[t] = r), i;
  }
  function Pi(e, t, r, n) {
    var o = void 0,
      i = t[n];
    if (n === t.length - 1) o = r;
    else {
      var a = vt(e) && vt(e[i]) ? e[i] : typeof t[n + 1] == "number" ? [] : {};
      o = Pi(a, t, r, n + 1);
    }
    return Rt(e, i, o);
  }
  function bt(e, t, r) {
    return t.length ? Pi(e, t, r, 0) : r;
  }
  function Ni(e, t, r) {
    var n = e?.[t],
      o = r(n);
    return Rt(e, t, o);
  }
  function Li(e, t, r) {
    var n = Ot(e, t),
      o = r(n);
    return bt(e, t, o);
  }
  function Di(e, t, r, n, o, i) {
    for (
      var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
      u < a;
      u++
    )
      s[u - 6] = arguments[u];
    return s.length
      ? W.call.apply(W, [null, !1, !1, e, t, r, n, o, i].concat(s))
      : W(!1, !1, e, t, r, n, o, i);
  }
  function Mi(e, t, r, n, o, i) {
    for (
      var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
      u < a;
      u++
    )
      s[u - 6] = arguments[u];
    return s.length
      ? W.call.apply(W, [null, !1, !0, e, t, r, n, o, i].concat(s))
      : W(!1, !0, e, t, r, n, o, i);
  }
  function Fi(e, t, r, n, o, i, a) {
    var s = Ot(e, t);
    s == null && (s = {});
    for (
      var u = void 0, l = arguments.length, p = Array(l > 7 ? l - 7 : 0), d = 7;
      d < l;
      d++
    )
      p[d - 7] = arguments[d];
    return (
      p.length
        ? (u = W.call.apply(W, [null, !1, !1, s, r, n, o, i, a].concat(p)))
        : (u = W(!1, !1, s, r, n, o, i, a)),
      bt(e, t, u)
    );
  }
  function wi(e, t) {
    for (var r = Array.isArray(t) ? t : [t], n = !1, o = 0; o < r.length; o++)
      if (m_.call(e, r[o])) {
        n = !0;
        break;
      }
    if (!n) return e;
    for (var i = {}, a = jr(e), s = 0; s < a.length; s++) {
      var u = a[s];
      r.indexOf(u) >= 0 || (i[u] = e[u]);
    }
    return i;
  }
  function qi(e, t, r, n, o, i) {
    for (
      var a = arguments.length, s = Array(a > 6 ? a - 6 : 0), u = 6;
      u < a;
      u++
    )
      s[u - 6] = arguments[u];
    return s.length
      ? W.call.apply(W, [null, !0, !1, e, t, r, n, o, i].concat(s))
      : W(!0, !1, e, t, r, n, o, i);
  }
  var h_ = {
    clone: St,
    addLast: vi,
    addFirst: Si,
    removeLast: Oi,
    removeFirst: Ri,
    insert: bi,
    removeAt: xi,
    replaceAt: Ci,
    getIn: Ot,
    set: Rt,
    setIn: bt,
    update: Ni,
    updateIn: Li,
    merge: Di,
    mergeDeep: Mi,
    mergeIn: Fi,
    omit: wi,
    addDefaults: qi,
  };
  M.default = h_;
});
var Xi,
  A_,
  v_,
  S_,
  O_,
  R_,
  Gi,
  Vi,
  Ui = D(() => {
    "use strict";
    H();
    (Xi = C(ve())),
      ({
        IX2_PREVIEW_REQUESTED: A_,
        IX2_PLAYBACK_REQUESTED: v_,
        IX2_STOP_REQUESTED: S_,
        IX2_CLEAR_REQUESTED: O_,
      } = w),
      (R_ = { preview: {}, playback: {}, stop: {}, clear: {} }),
      (Gi = Object.create(null, {
        [A_]: { value: "preview" },
        [v_]: { value: "playback" },
        [S_]: { value: "stop" },
        [O_]: { value: "clear" },
      })),
      (Vi = (e = R_, t) => {
        if (t.type in Gi) {
          let r = [Gi[t.type]];
          return (0, Xi.setIn)(e, [r], { ...t.payload });
        }
        return e;
      });
  });
var X,
  b_,
  x_,
  C_,
  P_,
  N_,
  L_,
  D_,
  M_,
  F_,
  w_,
  Bi,
  q_,
  Hi,
  Wi = D(() => {
    "use strict";
    H();
    (X = C(ve())),
      ({
        IX2_SESSION_INITIALIZED: b_,
        IX2_SESSION_STARTED: x_,
        IX2_TEST_FRAME_RENDERED: C_,
        IX2_SESSION_STOPPED: P_,
        IX2_EVENT_LISTENER_ADDED: N_,
        IX2_EVENT_STATE_CHANGED: L_,
        IX2_ANIMATION_FRAME_CHANGED: D_,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: M_,
        IX2_VIEWPORT_WIDTH_CHANGED: F_,
        IX2_MEDIA_QUERIES_DEFINED: w_,
      } = w),
      (Bi = {
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
      (Hi = (e = Bi, t) => {
        switch (t.type) {
          case b_: {
            let { hasBoundaryNodes: r, reducedMotion: n } = t.payload;
            return (0, X.merge)(e, { hasBoundaryNodes: r, reducedMotion: n });
          }
          case x_:
            return (0, X.set)(e, "active", !0);
          case C_: {
            let {
              payload: { step: r = q_ },
            } = t;
            return (0, X.set)(e, "tick", e.tick + r);
          }
          case P_:
            return Bi;
          case D_: {
            let {
              payload: { now: r },
            } = t;
            return (0, X.set)(e, "tick", r);
          }
          case N_: {
            let r = (0, X.addLast)(e.eventListeners, t.payload);
            return (0, X.set)(e, "eventListeners", r);
          }
          case L_: {
            let { stateKey: r, newState: n } = t.payload;
            return (0, X.setIn)(e, ["eventState", r], n);
          }
          case M_: {
            let { actionListId: r, isPlaying: n } = t.payload;
            return (0, X.setIn)(e, ["playbackState", r], n);
          }
          case F_: {
            let { width: r, mediaQueries: n } = t.payload,
              o = n.length,
              i = null;
            for (let a = 0; a < o; a++) {
              let { key: s, min: u, max: l } = n[a];
              if (r >= u && r <= l) {
                i = s;
                break;
              }
            }
            return (0, X.merge)(e, { viewportWidth: r, mediaQueryKey: i });
          }
          case w_:
            return (0, X.set)(e, "hasDefinedMediaQueries", !0);
          default:
            return e;
        }
      });
  });
var Ki = c((IM, ki) => {
  function G_() {
    (this.__data__ = []), (this.size = 0);
  }
  ki.exports = G_;
});
var xt = c((TM, ji) => {
  function X_(e, t) {
    return e === t || (e !== e && t !== t);
  }
  ji.exports = X_;
});
var ze = c((mM, zi) => {
  var V_ = xt();
  function U_(e, t) {
    for (var r = e.length; r--; ) if (V_(e[r][0], t)) return r;
    return -1;
  }
  zi.exports = U_;
});
var Qi = c((hM, Yi) => {
  var B_ = ze(),
    H_ = Array.prototype,
    W_ = H_.splice;
  function k_(e) {
    var t = this.__data__,
      r = B_(t, e);
    if (r < 0) return !1;
    var n = t.length - 1;
    return r == n ? t.pop() : W_.call(t, r, 1), --this.size, !0;
  }
  Yi.exports = k_;
});
var Zi = c((AM, $i) => {
  var K_ = ze();
  function j_(e) {
    var t = this.__data__,
      r = K_(t, e);
    return r < 0 ? void 0 : t[r][1];
  }
  $i.exports = j_;
});
var ea = c((vM, Ji) => {
  var z_ = ze();
  function Y_(e) {
    return z_(this.__data__, e) > -1;
  }
  Ji.exports = Y_;
});
var ra = c((SM, ta) => {
  var Q_ = ze();
  function $_(e, t) {
    var r = this.__data__,
      n = Q_(r, e);
    return n < 0 ? (++this.size, r.push([e, t])) : (r[n][1] = t), this;
  }
  ta.exports = $_;
});
var Ye = c((OM, na) => {
  var Z_ = Ki(),
    J_ = Qi(),
    eI = Zi(),
    tI = ea(),
    rI = ra();
  function Se(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Se.prototype.clear = Z_;
  Se.prototype.delete = J_;
  Se.prototype.get = eI;
  Se.prototype.has = tI;
  Se.prototype.set = rI;
  na.exports = Se;
});
var ia = c((RM, oa) => {
  var nI = Ye();
  function oI() {
    (this.__data__ = new nI()), (this.size = 0);
  }
  oa.exports = oI;
});
var sa = c((bM, aa) => {
  function iI(e) {
    var t = this.__data__,
      r = t.delete(e);
    return (this.size = t.size), r;
  }
  aa.exports = iI;
});
var ca = c((xM, ua) => {
  function aI(e) {
    return this.__data__.get(e);
  }
  ua.exports = aI;
});
var fa = c((CM, la) => {
  function sI(e) {
    return this.__data__.has(e);
  }
  la.exports = sI;
});
var J = c((PM, pa) => {
  function uI(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  pa.exports = uI;
});
var zr = c((NM, da) => {
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
var ga = c((LM, Ea) => {
  var yI = j(),
    _I = yI["__core-js_shared__"];
  Ea.exports = _I;
});
var Ia = c((DM, _a) => {
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
var Qr = c((MM, Ta) => {
  var TI = Function.prototype,
    mI = TI.toString;
  function hI(e) {
    if (e != null) {
      try {
        return mI.call(e);
      } catch {}
      try {
        return e + "";
      } catch {}
    }
    return "";
  }
  Ta.exports = hI;
});
var ha = c((FM, ma) => {
  var AI = zr(),
    vI = Ia(),
    SI = J(),
    OI = Qr(),
    RI = /[\\^$.*+?()[\]{}|]/g,
    bI = /^\[object .+?Constructor\]$/,
    xI = Function.prototype,
    CI = Object.prototype,
    PI = xI.toString,
    NI = CI.hasOwnProperty,
    LI = RegExp(
      "^" +
        PI.call(NI)
          .replace(RI, "\\$&")
          .replace(
            /hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,
            "$1.*?"
          ) +
        "$"
    );
  function DI(e) {
    if (!SI(e) || vI(e)) return !1;
    var t = AI(e) ? LI : bI;
    return t.test(OI(e));
  }
  ma.exports = DI;
});
var va = c((wM, Aa) => {
  function MI(e, t) {
    return e?.[t];
  }
  Aa.exports = MI;
});
var ce = c((qM, Sa) => {
  var FI = ha(),
    wI = va();
  function qI(e, t) {
    var r = wI(e, t);
    return FI(r) ? r : void 0;
  }
  Sa.exports = qI;
});
var Ct = c((GM, Oa) => {
  var GI = ce(),
    XI = j(),
    VI = GI(XI, "Map");
  Oa.exports = VI;
});
var Qe = c((XM, Ra) => {
  var UI = ce(),
    BI = UI(Object, "create");
  Ra.exports = BI;
});
var Ca = c((VM, xa) => {
  var ba = Qe();
  function HI() {
    (this.__data__ = ba ? ba(null) : {}), (this.size = 0);
  }
  xa.exports = HI;
});
var Na = c((UM, Pa) => {
  function WI(e) {
    var t = this.has(e) && delete this.__data__[e];
    return (this.size -= t ? 1 : 0), t;
  }
  Pa.exports = WI;
});
var Da = c((BM, La) => {
  var kI = Qe(),
    KI = "__lodash_hash_undefined__",
    jI = Object.prototype,
    zI = jI.hasOwnProperty;
  function YI(e) {
    var t = this.__data__;
    if (kI) {
      var r = t[e];
      return r === KI ? void 0 : r;
    }
    return zI.call(t, e) ? t[e] : void 0;
  }
  La.exports = YI;
});
var Fa = c((HM, Ma) => {
  var QI = Qe(),
    $I = Object.prototype,
    ZI = $I.hasOwnProperty;
  function JI(e) {
    var t = this.__data__;
    return QI ? t[e] !== void 0 : ZI.call(t, e);
  }
  Ma.exports = JI;
});
var qa = c((WM, wa) => {
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
var Xa = c((kM, Ga) => {
  var nT = Ca(),
    oT = Na(),
    iT = Da(),
    aT = Fa(),
    sT = qa();
  function Oe(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Oe.prototype.clear = nT;
  Oe.prototype.delete = oT;
  Oe.prototype.get = iT;
  Oe.prototype.has = aT;
  Oe.prototype.set = sT;
  Ga.exports = Oe;
});
var Ba = c((KM, Ua) => {
  var Va = Xa(),
    uT = Ye(),
    cT = Ct();
  function lT() {
    (this.size = 0),
      (this.__data__ = {
        hash: new Va(),
        map: new (cT || uT)(),
        string: new Va(),
      });
  }
  Ua.exports = lT;
});
var Wa = c((jM, Ha) => {
  function fT(e) {
    var t = typeof e;
    return t == "string" || t == "number" || t == "symbol" || t == "boolean"
      ? e !== "__proto__"
      : e === null;
  }
  Ha.exports = fT;
});
var $e = c((zM, ka) => {
  var pT = Wa();
  function dT(e, t) {
    var r = e.__data__;
    return pT(t) ? r[typeof t == "string" ? "string" : "hash"] : r.map;
  }
  ka.exports = dT;
});
var ja = c((YM, Ka) => {
  var ET = $e();
  function gT(e) {
    var t = ET(this, e).delete(e);
    return (this.size -= t ? 1 : 0), t;
  }
  Ka.exports = gT;
});
var Ya = c((QM, za) => {
  var yT = $e();
  function _T(e) {
    return yT(this, e).get(e);
  }
  za.exports = _T;
});
var $a = c(($M, Qa) => {
  var IT = $e();
  function TT(e) {
    return IT(this, e).has(e);
  }
  Qa.exports = TT;
});
var Ja = c((ZM, Za) => {
  var mT = $e();
  function hT(e, t) {
    var r = mT(this, e),
      n = r.size;
    return r.set(e, t), (this.size += r.size == n ? 0 : 1), this;
  }
  Za.exports = hT;
});
var Pt = c((JM, es) => {
  var AT = Ba(),
    vT = ja(),
    ST = Ya(),
    OT = $a(),
    RT = Ja();
  function Re(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.clear(); ++t < r; ) {
      var n = e[t];
      this.set(n[0], n[1]);
    }
  }
  Re.prototype.clear = AT;
  Re.prototype.delete = vT;
  Re.prototype.get = ST;
  Re.prototype.has = OT;
  Re.prototype.set = RT;
  es.exports = Re;
});
var rs = c((eF, ts) => {
  var bT = Ye(),
    xT = Ct(),
    CT = Pt(),
    PT = 200;
  function NT(e, t) {
    var r = this.__data__;
    if (r instanceof bT) {
      var n = r.__data__;
      if (!xT || n.length < PT - 1)
        return n.push([e, t]), (this.size = ++r.size), this;
      r = this.__data__ = new CT(n);
    }
    return r.set(e, t), (this.size = r.size), this;
  }
  ts.exports = NT;
});
var $r = c((tF, ns) => {
  var LT = Ye(),
    DT = ia(),
    MT = sa(),
    FT = ca(),
    wT = fa(),
    qT = rs();
  function be(e) {
    var t = (this.__data__ = new LT(e));
    this.size = t.size;
  }
  be.prototype.clear = DT;
  be.prototype.delete = MT;
  be.prototype.get = FT;
  be.prototype.has = wT;
  be.prototype.set = qT;
  ns.exports = be;
});
var is = c((rF, os) => {
  var GT = "__lodash_hash_undefined__";
  function XT(e) {
    return this.__data__.set(e, GT), this;
  }
  os.exports = XT;
});
var ss = c((nF, as) => {
  function VT(e) {
    return this.__data__.has(e);
  }
  as.exports = VT;
});
var cs = c((oF, us) => {
  var UT = Pt(),
    BT = is(),
    HT = ss();
  function Nt(e) {
    var t = -1,
      r = e == null ? 0 : e.length;
    for (this.__data__ = new UT(); ++t < r; ) this.add(e[t]);
  }
  Nt.prototype.add = Nt.prototype.push = BT;
  Nt.prototype.has = HT;
  us.exports = Nt;
});
var fs = c((iF, ls) => {
  function WT(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length; ++r < n; )
      if (t(e[r], r, e)) return !0;
    return !1;
  }
  ls.exports = WT;
});
var ds = c((aF, ps) => {
  function kT(e, t) {
    return e.has(t);
  }
  ps.exports = kT;
});
var Zr = c((sF, Es) => {
  var KT = cs(),
    jT = fs(),
    zT = ds(),
    YT = 1,
    QT = 2;
  function $T(e, t, r, n, o, i) {
    var a = r & YT,
      s = e.length,
      u = t.length;
    if (s != u && !(a && u > s)) return !1;
    var l = i.get(e),
      p = i.get(t);
    if (l && p) return l == t && p == e;
    var d = -1,
      f = !0,
      y = r & QT ? new KT() : void 0;
    for (i.set(e, t), i.set(t, e); ++d < s; ) {
      var _ = e[d],
        E = t[d];
      if (n) var I = a ? n(E, _, d, t, e, i) : n(_, E, d, e, t, i);
      if (I !== void 0) {
        if (I) continue;
        f = !1;
        break;
      }
      if (y) {
        if (
          !jT(t, function (g, m) {
            if (!zT(y, m) && (_ === g || o(_, g, r, n, i))) return y.push(m);
          })
        ) {
          f = !1;
          break;
        }
      } else if (!(_ === E || o(_, E, r, n, i))) {
        f = !1;
        break;
      }
    }
    return i.delete(e), i.delete(t), f;
  }
  Es.exports = $T;
});
var ys = c((uF, gs) => {
  var ZT = j(),
    JT = ZT.Uint8Array;
  gs.exports = JT;
});
var Is = c((cF, _s) => {
  function em(e) {
    var t = -1,
      r = Array(e.size);
    return (
      e.forEach(function (n, o) {
        r[++t] = [o, n];
      }),
      r
    );
  }
  _s.exports = em;
});
var ms = c((lF, Ts) => {
  function tm(e) {
    var t = -1,
      r = Array(e.size);
    return (
      e.forEach(function (n) {
        r[++t] = n;
      }),
      r
    );
  }
  Ts.exports = tm;
});
var Os = c((fF, Ss) => {
  var hs = me(),
    As = ys(),
    rm = xt(),
    nm = Zr(),
    om = Is(),
    im = ms(),
    am = 1,
    sm = 2,
    um = "[object Boolean]",
    cm = "[object Date]",
    lm = "[object Error]",
    fm = "[object Map]",
    pm = "[object Number]",
    dm = "[object RegExp]",
    Em = "[object Set]",
    gm = "[object String]",
    ym = "[object Symbol]",
    _m = "[object ArrayBuffer]",
    Im = "[object DataView]",
    vs = hs ? hs.prototype : void 0,
    Jr = vs ? vs.valueOf : void 0;
  function Tm(e, t, r, n, o, i, a) {
    switch (r) {
      case Im:
        if (e.byteLength != t.byteLength || e.byteOffset != t.byteOffset)
          return !1;
        (e = e.buffer), (t = t.buffer);
      case _m:
        return !(e.byteLength != t.byteLength || !i(new As(e), new As(t)));
      case um:
      case cm:
      case pm:
        return rm(+e, +t);
      case lm:
        return e.name == t.name && e.message == t.message;
      case dm:
      case gm:
        return e == t + "";
      case fm:
        var s = om;
      case Em:
        var u = n & am;
        if ((s || (s = im), e.size != t.size && !u)) return !1;
        var l = a.get(e);
        if (l) return l == t;
        (n |= sm), a.set(e, t);
        var p = nm(s(e), s(t), n, o, i, a);
        return a.delete(e), p;
      case ym:
        if (Jr) return Jr.call(e) == Jr.call(t);
    }
    return !1;
  }
  Ss.exports = Tm;
});
var Lt = c((pF, Rs) => {
  function mm(e, t) {
    for (var r = -1, n = t.length, o = e.length; ++r < n; ) e[o + r] = t[r];
    return e;
  }
  Rs.exports = mm;
});
var q = c((dF, bs) => {
  var hm = Array.isArray;
  bs.exports = hm;
});
var en = c((EF, xs) => {
  var Am = Lt(),
    vm = q();
  function Sm(e, t, r) {
    var n = t(e);
    return vm(e) ? n : Am(n, r(e));
  }
  xs.exports = Sm;
});
var Ps = c((gF, Cs) => {
  function Om(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, o = 0, i = []; ++r < n; ) {
      var a = e[r];
      t(a, r, e) && (i[o++] = a);
    }
    return i;
  }
  Cs.exports = Om;
});
var tn = c((yF, Ns) => {
  function Rm() {
    return [];
  }
  Ns.exports = Rm;
});
var rn = c((_F, Ds) => {
  var bm = Ps(),
    xm = tn(),
    Cm = Object.prototype,
    Pm = Cm.propertyIsEnumerable,
    Ls = Object.getOwnPropertySymbols,
    Nm = Ls
      ? function (e) {
          return e == null
            ? []
            : ((e = Object(e)),
              bm(Ls(e), function (t) {
                return Pm.call(e, t);
              }));
        }
      : xm;
  Ds.exports = Nm;
});
var Fs = c((IF, Ms) => {
  function Lm(e, t) {
    for (var r = -1, n = Array(e); ++r < e; ) n[r] = t(r);
    return n;
  }
  Ms.exports = Lm;
});
var qs = c((TF, ws) => {
  var Dm = ue(),
    Mm = ne(),
    Fm = "[object Arguments]";
  function wm(e) {
    return Mm(e) && Dm(e) == Fm;
  }
  ws.exports = wm;
});
var Ze = c((mF, Vs) => {
  var Gs = qs(),
    qm = ne(),
    Xs = Object.prototype,
    Gm = Xs.hasOwnProperty,
    Xm = Xs.propertyIsEnumerable,
    Vm = Gs(
      (function () {
        return arguments;
      })()
    )
      ? Gs
      : function (e) {
          return qm(e) && Gm.call(e, "callee") && !Xm.call(e, "callee");
        };
  Vs.exports = Vm;
});
var Bs = c((hF, Us) => {
  function Um() {
    return !1;
  }
  Us.exports = Um;
});
var Dt = c((Je, xe) => {
  var Bm = j(),
    Hm = Bs(),
    ks = typeof Je == "object" && Je && !Je.nodeType && Je,
    Hs = ks && typeof xe == "object" && xe && !xe.nodeType && xe,
    Wm = Hs && Hs.exports === ks,
    Ws = Wm ? Bm.Buffer : void 0,
    km = Ws ? Ws.isBuffer : void 0,
    Km = km || Hm;
  xe.exports = Km;
});
var Mt = c((AF, Ks) => {
  var jm = 9007199254740991,
    zm = /^(?:0|[1-9]\d*)$/;
  function Ym(e, t) {
    var r = typeof e;
    return (
      (t = t ?? jm),
      !!t &&
        (r == "number" || (r != "symbol" && zm.test(e))) &&
        e > -1 &&
        e % 1 == 0 &&
        e < t
    );
  }
  Ks.exports = Ym;
});
var Ft = c((vF, js) => {
  var Qm = 9007199254740991;
  function $m(e) {
    return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Qm;
  }
  js.exports = $m;
});
var Ys = c((SF, zs) => {
  var Zm = ue(),
    Jm = Ft(),
    eh = ne(),
    th = "[object Arguments]",
    rh = "[object Array]",
    nh = "[object Boolean]",
    oh = "[object Date]",
    ih = "[object Error]",
    ah = "[object Function]",
    sh = "[object Map]",
    uh = "[object Number]",
    ch = "[object Object]",
    lh = "[object RegExp]",
    fh = "[object Set]",
    ph = "[object String]",
    dh = "[object WeakMap]",
    Eh = "[object ArrayBuffer]",
    gh = "[object DataView]",
    yh = "[object Float32Array]",
    _h = "[object Float64Array]",
    Ih = "[object Int8Array]",
    Th = "[object Int16Array]",
    mh = "[object Int32Array]",
    hh = "[object Uint8Array]",
    Ah = "[object Uint8ClampedArray]",
    vh = "[object Uint16Array]",
    Sh = "[object Uint32Array]",
    L = {};
  L[yh] = L[_h] = L[Ih] = L[Th] = L[mh] = L[hh] = L[Ah] = L[vh] = L[Sh] = !0;
  L[th] =
    L[rh] =
    L[Eh] =
    L[nh] =
    L[gh] =
    L[oh] =
    L[ih] =
    L[ah] =
    L[sh] =
    L[uh] =
    L[ch] =
    L[lh] =
    L[fh] =
    L[ph] =
    L[dh] =
      !1;
  function Oh(e) {
    return eh(e) && Jm(e.length) && !!L[Zm(e)];
  }
  zs.exports = Oh;
});
var $s = c((OF, Qs) => {
  function Rh(e) {
    return function (t) {
      return e(t);
    };
  }
  Qs.exports = Rh;
});
var Js = c((et, Ce) => {
  var bh = xr(),
    Zs = typeof et == "object" && et && !et.nodeType && et,
    tt = Zs && typeof Ce == "object" && Ce && !Ce.nodeType && Ce,
    xh = tt && tt.exports === Zs,
    nn = xh && bh.process,
    Ch = (function () {
      try {
        var e = tt && tt.require && tt.require("util").types;
        return e || (nn && nn.binding && nn.binding("util"));
      } catch {}
    })();
  Ce.exports = Ch;
});
var wt = c((RF, ru) => {
  var Ph = Ys(),
    Nh = $s(),
    eu = Js(),
    tu = eu && eu.isTypedArray,
    Lh = tu ? Nh(tu) : Ph;
  ru.exports = Lh;
});
var on = c((bF, nu) => {
  var Dh = Fs(),
    Mh = Ze(),
    Fh = q(),
    wh = Dt(),
    qh = Mt(),
    Gh = wt(),
    Xh = Object.prototype,
    Vh = Xh.hasOwnProperty;
  function Uh(e, t) {
    var r = Fh(e),
      n = !r && Mh(e),
      o = !r && !n && wh(e),
      i = !r && !n && !o && Gh(e),
      a = r || n || o || i,
      s = a ? Dh(e.length, String) : [],
      u = s.length;
    for (var l in e)
      (t || Vh.call(e, l)) &&
        !(
          a &&
          (l == "length" ||
            (o && (l == "offset" || l == "parent")) ||
            (i && (l == "buffer" || l == "byteLength" || l == "byteOffset")) ||
            qh(l, u))
        ) &&
        s.push(l);
    return s;
  }
  nu.exports = Uh;
});
var qt = c((xF, ou) => {
  var Bh = Object.prototype;
  function Hh(e) {
    var t = e && e.constructor,
      r = (typeof t == "function" && t.prototype) || Bh;
    return e === r;
  }
  ou.exports = Hh;
});
var au = c((CF, iu) => {
  var Wh = Cr(),
    kh = Wh(Object.keys, Object);
  iu.exports = kh;
});
var Gt = c((PF, su) => {
  var Kh = qt(),
    jh = au(),
    zh = Object.prototype,
    Yh = zh.hasOwnProperty;
  function Qh(e) {
    if (!Kh(e)) return jh(e);
    var t = [];
    for (var r in Object(e)) Yh.call(e, r) && r != "constructor" && t.push(r);
    return t;
  }
  su.exports = Qh;
});
var de = c((NF, uu) => {
  var $h = zr(),
    Zh = Ft();
  function Jh(e) {
    return e != null && Zh(e.length) && !$h(e);
  }
  uu.exports = Jh;
});
var rt = c((LF, cu) => {
  var eA = on(),
    tA = Gt(),
    rA = de();
  function nA(e) {
    return rA(e) ? eA(e) : tA(e);
  }
  cu.exports = nA;
});
var fu = c((DF, lu) => {
  var oA = en(),
    iA = rn(),
    aA = rt();
  function sA(e) {
    return oA(e, aA, iA);
  }
  lu.exports = sA;
});
var Eu = c((MF, du) => {
  var pu = fu(),
    uA = 1,
    cA = Object.prototype,
    lA = cA.hasOwnProperty;
  function fA(e, t, r, n, o, i) {
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
    var y = i.get(e),
      _ = i.get(t);
    if (y && _) return y == t && _ == e;
    var E = !0;
    i.set(e, t), i.set(t, e);
    for (var I = a; ++d < u; ) {
      f = s[d];
      var g = e[f],
        m = t[f];
      if (n) var A = a ? n(m, g, f, t, e, i) : n(g, m, f, e, t, i);
      if (!(A === void 0 ? g === m || o(g, m, r, n, i) : A)) {
        E = !1;
        break;
      }
      I || (I = f == "constructor");
    }
    if (E && !I) {
      var h = e.constructor,
        O = t.constructor;
      h != O &&
        "constructor" in e &&
        "constructor" in t &&
        !(
          typeof h == "function" &&
          h instanceof h &&
          typeof O == "function" &&
          O instanceof O
        ) &&
        (E = !1);
    }
    return i.delete(e), i.delete(t), E;
  }
  du.exports = fA;
});
var yu = c((FF, gu) => {
  var pA = ce(),
    dA = j(),
    EA = pA(dA, "DataView");
  gu.exports = EA;
});
var Iu = c((wF, _u) => {
  var gA = ce(),
    yA = j(),
    _A = gA(yA, "Promise");
  _u.exports = _A;
});
var mu = c((qF, Tu) => {
  var IA = ce(),
    TA = j(),
    mA = IA(TA, "Set");
  Tu.exports = mA;
});
var an = c((GF, hu) => {
  var hA = ce(),
    AA = j(),
    vA = hA(AA, "WeakMap");
  hu.exports = vA;
});
var Xt = c((XF, xu) => {
  var sn = yu(),
    un = Ct(),
    cn = Iu(),
    ln = mu(),
    fn = an(),
    bu = ue(),
    Pe = Qr(),
    Au = "[object Map]",
    SA = "[object Object]",
    vu = "[object Promise]",
    Su = "[object Set]",
    Ou = "[object WeakMap]",
    Ru = "[object DataView]",
    OA = Pe(sn),
    RA = Pe(un),
    bA = Pe(cn),
    xA = Pe(ln),
    CA = Pe(fn),
    Ee = bu;
  ((sn && Ee(new sn(new ArrayBuffer(1))) != Ru) ||
    (un && Ee(new un()) != Au) ||
    (cn && Ee(cn.resolve()) != vu) ||
    (ln && Ee(new ln()) != Su) ||
    (fn && Ee(new fn()) != Ou)) &&
    (Ee = function (e) {
      var t = bu(e),
        r = t == SA ? e.constructor : void 0,
        n = r ? Pe(r) : "";
      if (n)
        switch (n) {
          case OA:
            return Ru;
          case RA:
            return Au;
          case bA:
            return vu;
          case xA:
            return Su;
          case CA:
            return Ou;
        }
      return t;
    });
  xu.exports = Ee;
});
var wu = c((VF, Fu) => {
  var pn = $r(),
    PA = Zr(),
    NA = Os(),
    LA = Eu(),
    Cu = Xt(),
    Pu = q(),
    Nu = Dt(),
    DA = wt(),
    MA = 1,
    Lu = "[object Arguments]",
    Du = "[object Array]",
    Vt = "[object Object]",
    FA = Object.prototype,
    Mu = FA.hasOwnProperty;
  function wA(e, t, r, n, o, i) {
    var a = Pu(e),
      s = Pu(t),
      u = a ? Du : Cu(e),
      l = s ? Du : Cu(t);
    (u = u == Lu ? Vt : u), (l = l == Lu ? Vt : l);
    var p = u == Vt,
      d = l == Vt,
      f = u == l;
    if (f && Nu(e)) {
      if (!Nu(t)) return !1;
      (a = !0), (p = !1);
    }
    if (f && !p)
      return (
        i || (i = new pn()),
        a || DA(e) ? PA(e, t, r, n, o, i) : NA(e, t, u, r, n, o, i)
      );
    if (!(r & MA)) {
      var y = p && Mu.call(e, "__wrapped__"),
        _ = d && Mu.call(t, "__wrapped__");
      if (y || _) {
        var E = y ? e.value() : e,
          I = _ ? t.value() : t;
        return i || (i = new pn()), o(E, I, r, n, i);
      }
    }
    return f ? (i || (i = new pn()), LA(e, t, r, n, o, i)) : !1;
  }
  Fu.exports = wA;
});
var dn = c((UF, Xu) => {
  var qA = wu(),
    qu = ne();
  function Gu(e, t, r, n, o) {
    return e === t
      ? !0
      : e == null || t == null || (!qu(e) && !qu(t))
      ? e !== e && t !== t
      : qA(e, t, r, n, Gu, o);
  }
  Xu.exports = Gu;
});
var Uu = c((BF, Vu) => {
  var GA = $r(),
    XA = dn(),
    VA = 1,
    UA = 2;
  function BA(e, t, r, n) {
    var o = r.length,
      i = o,
      a = !n;
    if (e == null) return !i;
    for (e = Object(e); o--; ) {
      var s = r[o];
      if (a && s[2] ? s[1] !== e[s[0]] : !(s[0] in e)) return !1;
    }
    for (; ++o < i; ) {
      s = r[o];
      var u = s[0],
        l = e[u],
        p = s[1];
      if (a && s[2]) {
        if (l === void 0 && !(u in e)) return !1;
      } else {
        var d = new GA();
        if (n) var f = n(l, p, u, e, t, d);
        if (!(f === void 0 ? XA(p, l, VA | UA, n, d) : f)) return !1;
      }
    }
    return !0;
  }
  Vu.exports = BA;
});
var En = c((HF, Bu) => {
  var HA = J();
  function WA(e) {
    return e === e && !HA(e);
  }
  Bu.exports = WA;
});
var Wu = c((WF, Hu) => {
  var kA = En(),
    KA = rt();
  function jA(e) {
    for (var t = KA(e), r = t.length; r--; ) {
      var n = t[r],
        o = e[n];
      t[r] = [n, o, kA(o)];
    }
    return t;
  }
  Hu.exports = jA;
});
var gn = c((kF, ku) => {
  function zA(e, t) {
    return function (r) {
      return r == null ? !1 : r[e] === t && (t !== void 0 || e in Object(r));
    };
  }
  ku.exports = zA;
});
var ju = c((KF, Ku) => {
  var YA = Uu(),
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
var nt = c((jF, zu) => {
  var JA = ue(),
    ev = ne(),
    tv = "[object Symbol]";
  function rv(e) {
    return typeof e == "symbol" || (ev(e) && JA(e) == tv);
  }
  zu.exports = rv;
});
var Ut = c((zF, Yu) => {
  var nv = q(),
    ov = nt(),
    iv = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    av = /^\w*$/;
  function sv(e, t) {
    if (nv(e)) return !1;
    var r = typeof e;
    return r == "number" ||
      r == "symbol" ||
      r == "boolean" ||
      e == null ||
      ov(e)
      ? !0
      : av.test(e) || !iv.test(e) || (t != null && e in Object(t));
  }
  Yu.exports = sv;
});
var Zu = c((YF, $u) => {
  var Qu = Pt(),
    uv = "Expected a function";
  function yn(e, t) {
    if (typeof e != "function" || (t != null && typeof t != "function"))
      throw new TypeError(uv);
    var r = function () {
      var n = arguments,
        o = t ? t.apply(this, n) : n[0],
        i = r.cache;
      if (i.has(o)) return i.get(o);
      var a = e.apply(this, n);
      return (r.cache = i.set(o, a) || i), a;
    };
    return (r.cache = new (yn.Cache || Qu)()), r;
  }
  yn.Cache = Qu;
  $u.exports = yn;
});
var ec = c((QF, Ju) => {
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
var rc = c(($F, tc) => {
  var pv = ec(),
    dv =
      /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
    Ev = /\\(\\)?/g,
    gv = pv(function (e) {
      var t = [];
      return (
        e.charCodeAt(0) === 46 && t.push(""),
        e.replace(dv, function (r, n, o, i) {
          t.push(o ? i.replace(Ev, "$1") : n || r);
        }),
        t
      );
    });
  tc.exports = gv;
});
var _n = c((ZF, nc) => {
  function yv(e, t) {
    for (var r = -1, n = e == null ? 0 : e.length, o = Array(n); ++r < n; )
      o[r] = t(e[r], r, e);
    return o;
  }
  nc.exports = yv;
});
var cc = c((JF, uc) => {
  var oc = me(),
    _v = _n(),
    Iv = q(),
    Tv = nt(),
    mv = 1 / 0,
    ic = oc ? oc.prototype : void 0,
    ac = ic ? ic.toString : void 0;
  function sc(e) {
    if (typeof e == "string") return e;
    if (Iv(e)) return _v(e, sc) + "";
    if (Tv(e)) return ac ? ac.call(e) : "";
    var t = e + "";
    return t == "0" && 1 / e == -mv ? "-0" : t;
  }
  uc.exports = sc;
});
var fc = c((ew, lc) => {
  var hv = cc();
  function Av(e) {
    return e == null ? "" : hv(e);
  }
  lc.exports = Av;
});
var ot = c((tw, pc) => {
  var vv = q(),
    Sv = Ut(),
    Ov = rc(),
    Rv = fc();
  function bv(e, t) {
    return vv(e) ? e : Sv(e, t) ? [e] : Ov(Rv(e));
  }
  pc.exports = bv;
});
var Ne = c((rw, dc) => {
  var xv = nt(),
    Cv = 1 / 0;
  function Pv(e) {
    if (typeof e == "string" || xv(e)) return e;
    var t = e + "";
    return t == "0" && 1 / e == -Cv ? "-0" : t;
  }
  dc.exports = Pv;
});
var Bt = c((nw, Ec) => {
  var Nv = ot(),
    Lv = Ne();
  function Dv(e, t) {
    t = Nv(t, e);
    for (var r = 0, n = t.length; e != null && r < n; ) e = e[Lv(t[r++])];
    return r && r == n ? e : void 0;
  }
  Ec.exports = Dv;
});
var Ht = c((ow, gc) => {
  var Mv = Bt();
  function Fv(e, t, r) {
    var n = e == null ? void 0 : Mv(e, t);
    return n === void 0 ? r : n;
  }
  gc.exports = Fv;
});
var _c = c((iw, yc) => {
  function wv(e, t) {
    return e != null && t in Object(e);
  }
  yc.exports = wv;
});
var Tc = c((aw, Ic) => {
  var qv = ot(),
    Gv = Ze(),
    Xv = q(),
    Vv = Mt(),
    Uv = Ft(),
    Bv = Ne();
  function Hv(e, t, r) {
    t = qv(t, e);
    for (var n = -1, o = t.length, i = !1; ++n < o; ) {
      var a = Bv(t[n]);
      if (!(i = e != null && r(e, a))) break;
      e = e[a];
    }
    return i || ++n != o
      ? i
      : ((o = e == null ? 0 : e.length),
        !!o && Uv(o) && Vv(a, o) && (Xv(e) || Gv(e)));
  }
  Ic.exports = Hv;
});
var hc = c((sw, mc) => {
  var Wv = _c(),
    kv = Tc();
  function Kv(e, t) {
    return e != null && kv(e, t, Wv);
  }
  mc.exports = Kv;
});
var vc = c((uw, Ac) => {
  var jv = dn(),
    zv = Ht(),
    Yv = hc(),
    Qv = Ut(),
    $v = En(),
    Zv = gn(),
    Jv = Ne(),
    eS = 1,
    tS = 2;
  function rS(e, t) {
    return Qv(e) && $v(t)
      ? Zv(Jv(e), t)
      : function (r) {
          var n = zv(r, e);
          return n === void 0 && n === t ? Yv(r, e) : jv(t, n, eS | tS);
        };
  }
  Ac.exports = rS;
});
var Wt = c((cw, Sc) => {
  function nS(e) {
    return e;
  }
  Sc.exports = nS;
});
var In = c((lw, Oc) => {
  function oS(e) {
    return function (t) {
      return t?.[e];
    };
  }
  Oc.exports = oS;
});
var bc = c((fw, Rc) => {
  var iS = Bt();
  function aS(e) {
    return function (t) {
      return iS(t, e);
    };
  }
  Rc.exports = aS;
});
var Cc = c((pw, xc) => {
  var sS = In(),
    uS = bc(),
    cS = Ut(),
    lS = Ne();
  function fS(e) {
    return cS(e) ? sS(lS(e)) : uS(e);
  }
  xc.exports = fS;
});
var le = c((dw, Pc) => {
  var pS = ju(),
    dS = vc(),
    ES = Wt(),
    gS = q(),
    yS = Cc();
  function _S(e) {
    return typeof e == "function"
      ? e
      : e == null
      ? ES
      : typeof e == "object"
      ? gS(e)
        ? dS(e[0], e[1])
        : pS(e)
      : yS(e);
  }
  Pc.exports = _S;
});
var Tn = c((Ew, Nc) => {
  var IS = le(),
    TS = de(),
    mS = rt();
  function hS(e) {
    return function (t, r, n) {
      var o = Object(t);
      if (!TS(t)) {
        var i = IS(r, 3);
        (t = mS(t)),
          (r = function (s) {
            return i(o[s], s, o);
          });
      }
      var a = e(t, r, n);
      return a > -1 ? o[i ? t[a] : a] : void 0;
    };
  }
  Nc.exports = hS;
});
var mn = c((gw, Lc) => {
  function AS(e, t, r, n) {
    for (var o = e.length, i = r + (n ? 1 : -1); n ? i-- : ++i < o; )
      if (t(e[i], i, e)) return i;
    return -1;
  }
  Lc.exports = AS;
});
var Mc = c((yw, Dc) => {
  var vS = /\s/;
  function SS(e) {
    for (var t = e.length; t-- && vS.test(e.charAt(t)); );
    return t;
  }
  Dc.exports = SS;
});
var wc = c((_w, Fc) => {
  var OS = Mc(),
    RS = /^\s+/;
  function bS(e) {
    return e && e.slice(0, OS(e) + 1).replace(RS, "");
  }
  Fc.exports = bS;
});
var kt = c((Iw, Xc) => {
  var xS = wc(),
    qc = J(),
    CS = nt(),
    Gc = 0 / 0,
    PS = /^[-+]0x[0-9a-f]+$/i,
    NS = /^0b[01]+$/i,
    LS = /^0o[0-7]+$/i,
    DS = parseInt;
  function MS(e) {
    if (typeof e == "number") return e;
    if (CS(e)) return Gc;
    if (qc(e)) {
      var t = typeof e.valueOf == "function" ? e.valueOf() : e;
      e = qc(t) ? t + "" : t;
    }
    if (typeof e != "string") return e === 0 ? e : +e;
    e = xS(e);
    var r = NS.test(e);
    return r || LS.test(e) ? DS(e.slice(2), r ? 2 : 8) : PS.test(e) ? Gc : +e;
  }
  Xc.exports = MS;
});
var Bc = c((Tw, Uc) => {
  var FS = kt(),
    Vc = 1 / 0,
    wS = 17976931348623157e292;
  function qS(e) {
    if (!e) return e === 0 ? e : 0;
    if (((e = FS(e)), e === Vc || e === -Vc)) {
      var t = e < 0 ? -1 : 1;
      return t * wS;
    }
    return e === e ? e : 0;
  }
  Uc.exports = qS;
});
var hn = c((mw, Hc) => {
  var GS = Bc();
  function XS(e) {
    var t = GS(e),
      r = t % 1;
    return t === t ? (r ? t - r : t) : 0;
  }
  Hc.exports = XS;
});
var kc = c((hw, Wc) => {
  var VS = mn(),
    US = le(),
    BS = hn(),
    HS = Math.max;
  function WS(e, t, r) {
    var n = e == null ? 0 : e.length;
    if (!n) return -1;
    var o = r == null ? 0 : BS(r);
    return o < 0 && (o = HS(n + o, 0)), VS(e, US(t, 3), o);
  }
  Wc.exports = WS;
});
var An = c((Aw, Kc) => {
  var kS = Tn(),
    KS = kc(),
    jS = kS(KS);
  Kc.exports = jS;
});
var Yc = {};
U(Yc, {
  ELEMENT_MATCHES: () => zS,
  FLEX_PREFIXED: () => vn,
  IS_BROWSER_ENV: () => Y,
  TRANSFORM_PREFIXED: () => fe,
  TRANSFORM_STYLE_PREFIXED: () => jt,
  withBrowser: () => Kt,
});
var zc,
  Y,
  Kt,
  zS,
  vn,
  fe,
  jc,
  jt,
  zt = D(() => {
    "use strict";
    (zc = C(An())),
      (Y = typeof window < "u"),
      (Kt = (e, t) => (Y ? e() : t)),
      (zS = Kt(() =>
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
          for (let o = 0; o < n; o++) {
            let i = t[o];
            if (((e.style.display = i), e.style.display === i)) return i;
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
          for (let o = 0; o < n; o++) {
            let i = t[o] + r;
            if (e.style[i] !== void 0) return i;
          }
        }
        return "transform";
      }, "transform")),
      (jc = fe.split("transform")[0]),
      (jt = jc ? jc + "TransformStyle" : "transformStyle");
  });
var Sn = c((vw, el) => {
  var YS = 4,
    QS = 0.001,
    $S = 1e-7,
    ZS = 10,
    it = 11,
    Yt = 1 / (it - 1),
    JS = typeof Float32Array == "function";
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
  function eO(e, t, r, n, o) {
    var i,
      a,
      s = 0;
    do (a = t + (r - t) / 2), (i = Qt(a, n, o) - e), i > 0 ? (r = a) : (t = a);
    while (Math.abs(i) > $S && ++s < ZS);
    return a;
  }
  function tO(e, t, r, n) {
    for (var o = 0; o < YS; ++o) {
      var i = Jc(t, r, n);
      if (i === 0) return t;
      var a = Qt(t, r, n) - e;
      t -= a / i;
    }
    return t;
  }
  el.exports = function (t, r, n, o) {
    if (!(0 <= t && t <= 1 && 0 <= n && n <= 1))
      throw new Error("bezier x values must be in [0, 1] range");
    var i = JS ? new Float32Array(it) : new Array(it);
    if (t !== r || n !== o)
      for (var a = 0; a < it; ++a) i[a] = Qt(a * Yt, t, n);
    function s(u) {
      for (var l = 0, p = 1, d = it - 1; p !== d && i[p] <= u; ++p) l += Yt;
      --p;
      var f = (u - i[p]) / (i[p + 1] - i[p]),
        y = l + f * Yt,
        _ = Jc(y, t, n);
      return _ >= QS ? tO(u, y, t, n) : _ === 0 ? y : eO(u, l, l + Yt, t, n);
    }
    return function (l) {
      return t === r && n === o
        ? l
        : l === 0
        ? 0
        : l === 1
        ? 1
        : Qt(s(l), r, o);
    };
  };
});
var st = {};
U(st, {
  bounce: () => qO,
  bouncePast: () => GO,
  ease: () => rO,
  easeIn: () => nO,
  easeInOut: () => iO,
  easeOut: () => oO,
  inBack: () => xO,
  inCirc: () => SO,
  inCubic: () => cO,
  inElastic: () => NO,
  inExpo: () => hO,
  inOutBack: () => PO,
  inOutCirc: () => RO,
  inOutCubic: () => fO,
  inOutElastic: () => DO,
  inOutExpo: () => vO,
  inOutQuad: () => uO,
  inOutQuart: () => EO,
  inOutQuint: () => _O,
  inOutSine: () => mO,
  inQuad: () => aO,
  inQuart: () => pO,
  inQuint: () => gO,
  inSine: () => IO,
  outBack: () => CO,
  outBounce: () => bO,
  outCirc: () => OO,
  outCubic: () => lO,
  outElastic: () => LO,
  outExpo: () => AO,
  outQuad: () => sO,
  outQuart: () => dO,
  outQuint: () => yO,
  outSine: () => TO,
  swingFrom: () => FO,
  swingFromTo: () => MO,
  swingTo: () => wO,
});
function aO(e) {
  return Math.pow(e, 2);
}
function sO(e) {
  return -(Math.pow(e - 1, 2) - 1);
}
function uO(e) {
  return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 2) : -0.5 * ((e -= 2) * e - 2);
}
function cO(e) {
  return Math.pow(e, 3);
}
function lO(e) {
  return Math.pow(e - 1, 3) + 1;
}
function fO(e) {
  return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 3) : 0.5 * (Math.pow(e - 2, 3) + 2);
}
function pO(e) {
  return Math.pow(e, 4);
}
function dO(e) {
  return -(Math.pow(e - 1, 4) - 1);
}
function EO(e) {
  return (e /= 0.5) < 1
    ? 0.5 * Math.pow(e, 4)
    : -0.5 * ((e -= 2) * Math.pow(e, 3) - 2);
}
function gO(e) {
  return Math.pow(e, 5);
}
function yO(e) {
  return Math.pow(e - 1, 5) + 1;
}
function _O(e) {
  return (e /= 0.5) < 1 ? 0.5 * Math.pow(e, 5) : 0.5 * (Math.pow(e - 2, 5) + 2);
}
function IO(e) {
  return -Math.cos(e * (Math.PI / 2)) + 1;
}
function TO(e) {
  return Math.sin(e * (Math.PI / 2));
}
function mO(e) {
  return -0.5 * (Math.cos(Math.PI * e) - 1);
}
function hO(e) {
  return e === 0 ? 0 : Math.pow(2, 10 * (e - 1));
}
function AO(e) {
  return e === 1 ? 1 : -Math.pow(2, -10 * e) + 1;
}
function vO(e) {
  return e === 0
    ? 0
    : e === 1
    ? 1
    : (e /= 0.5) < 1
    ? 0.5 * Math.pow(2, 10 * (e - 1))
    : 0.5 * (-Math.pow(2, -10 * --e) + 2);
}
function SO(e) {
  return -(Math.sqrt(1 - e * e) - 1);
}
function OO(e) {
  return Math.sqrt(1 - Math.pow(e - 1, 2));
}
function RO(e) {
  return (e /= 0.5) < 1
    ? -0.5 * (Math.sqrt(1 - e * e) - 1)
    : 0.5 * (Math.sqrt(1 - (e -= 2) * e) + 1);
}
function bO(e) {
  return e < 1 / 2.75
    ? 7.5625 * e * e
    : e < 2 / 2.75
    ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
    : e < 2.5 / 2.75
    ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
    : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
}
function xO(e) {
  let t = oe;
  return e * e * ((t + 1) * e - t);
}
function CO(e) {
  let t = oe;
  return (e -= 1) * e * ((t + 1) * e + t) + 1;
}
function PO(e) {
  let t = oe;
  return (e /= 0.5) < 1
    ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
    : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
}
function NO(e) {
  let t = oe,
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
function LO(e) {
  let t = oe,
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
function DO(e) {
  let t = oe,
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
function MO(e) {
  let t = oe;
  return (e /= 0.5) < 1
    ? 0.5 * (e * e * (((t *= 1.525) + 1) * e - t))
    : 0.5 * ((e -= 2) * e * (((t *= 1.525) + 1) * e + t) + 2);
}
function FO(e) {
  let t = oe;
  return e * e * ((t + 1) * e - t);
}
function wO(e) {
  let t = oe;
  return (e -= 1) * e * ((t + 1) * e + t) + 1;
}
function qO(e) {
  return e < 1 / 2.75
    ? 7.5625 * e * e
    : e < 2 / 2.75
    ? 7.5625 * (e -= 1.5 / 2.75) * e + 0.75
    : e < 2.5 / 2.75
    ? 7.5625 * (e -= 2.25 / 2.75) * e + 0.9375
    : 7.5625 * (e -= 2.625 / 2.75) * e + 0.984375;
}
function GO(e) {
  return e < 1 / 2.75
    ? 7.5625 * e * e
    : e < 2 / 2.75
    ? 2 - (7.5625 * (e -= 1.5 / 2.75) * e + 0.75)
    : e < 2.5 / 2.75
    ? 2 - (7.5625 * (e -= 2.25 / 2.75) * e + 0.9375)
    : 2 - (7.5625 * (e -= 2.625 / 2.75) * e + 0.984375);
}
var at,
  oe,
  rO,
  nO,
  oO,
  iO,
  On = D(() => {
    "use strict";
    (at = C(Sn())),
      (oe = 1.70158),
      (rO = (0, at.default)(0.25, 0.1, 0.25, 1)),
      (nO = (0, at.default)(0.42, 0, 1, 1)),
      (oO = (0, at.default)(0, 0, 0.58, 1)),
      (iO = (0, at.default)(0.42, 0, 0.58, 1));
  });
var rl = {};
U(rl, {
  applyEasing: () => VO,
  createBezierEasing: () => XO,
  optimizeFloat: () => ut,
});
function ut(e, t = 5, r = 10) {
  let n = Math.pow(r, t),
    o = Number(Math.round(e * n) / n);
  return Math.abs(o) > 1e-4 ? o : 0;
}
function XO(e) {
  return (0, tl.default)(...e);
}
function VO(e, t, r) {
  return t === 0
    ? 0
    : t === 1
    ? 1
    : ut(r ? (t > 0 ? r(t) : t) : t > 0 && e && st[e] ? st[e](t) : t);
}
var tl,
  Rn = D(() => {
    "use strict";
    On();
    tl = C(Sn());
  });
var il = {};
U(il, {
  createElementState: () => ol,
  ixElements: () => eR,
  mergeActionState: () => bn,
});
function ol(e, t, r, n, o) {
  let i = r === UO ? (0, Le.getIn)(o, ["config", "target", "objectId"]) : null;
  return (0, Le.mergeIn)(e, [n], { id: n, ref: t, refId: i, refType: r });
}
function bn(e, t, r, n, o) {
  let i = rR(o);
  return (0, Le.mergeIn)(e, [t, JO, r], n, i);
}
function rR(e) {
  let { config: t } = e;
  return tR.reduce((r, n) => {
    let o = n[0],
      i = n[1],
      a = t[o],
      s = t[i];
    return a != null && s != null && (r[i] = s), r;
  }, {});
}
var Le,
  Ow,
  UO,
  Rw,
  BO,
  HO,
  WO,
  kO,
  KO,
  jO,
  zO,
  YO,
  QO,
  $O,
  ZO,
  nl,
  JO,
  eR,
  tR,
  al = D(() => {
    "use strict";
    Le = C(ve());
    H();
    ({
      HTML_ELEMENT: Ow,
      PLAIN_OBJECT: UO,
      ABSTRACT_NODE: Rw,
      CONFIG_X_VALUE: BO,
      CONFIG_Y_VALUE: HO,
      CONFIG_Z_VALUE: WO,
      CONFIG_VALUE: kO,
      CONFIG_X_UNIT: KO,
      CONFIG_Y_UNIT: jO,
      CONFIG_Z_UNIT: zO,
      CONFIG_UNIT: YO,
    } = G),
      ({
        IX2_SESSION_STOPPED: QO,
        IX2_INSTANCE_ADDED: $O,
        IX2_ELEMENT_STATE_CHANGED: ZO,
      } = w),
      (nl = {}),
      (JO = "refState"),
      (eR = (e = nl, t = {}) => {
        switch (t.type) {
          case QO:
            return nl;
          case $O: {
            let {
                elementId: r,
                element: n,
                origin: o,
                actionItem: i,
                refType: a,
              } = t.payload,
              { actionTypeId: s } = i,
              u = e;
            return (
              (0, Le.getIn)(u, [r, n]) !== n && (u = ol(u, n, a, r, i)),
              bn(u, r, s, o, i)
            );
          }
          case ZO: {
            let {
              elementId: r,
              actionTypeId: n,
              current: o,
              actionItem: i,
            } = t.payload;
            return bn(e, r, n, o, i);
          }
          default:
            return e;
        }
      });
    tR = [
      [BO, KO],
      [HO, jO],
      [WO, zO],
      [kO, YO],
    ];
  });
var sl = c((xn) => {
  "use strict";
  Object.defineProperty(xn, "__esModule", { value: !0 });
  function nR(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  nR(xn, {
    clearPlugin: function () {
      return lR;
    },
    createPluginInstance: function () {
      return uR;
    },
    getPluginConfig: function () {
      return oR;
    },
    getPluginDestination: function () {
      return sR;
    },
    getPluginDuration: function () {
      return iR;
    },
    getPluginOrigin: function () {
      return aR;
    },
    renderPlugin: function () {
      return cR;
    },
  });
  var oR = (e) => e.value,
    iR = (e, t) => {
      if (t.config.duration !== "auto") return null;
      let r = parseFloat(e.getAttribute("data-duration"));
      return r > 0
        ? r * 1e3
        : parseFloat(e.getAttribute("data-default-duration")) * 1e3;
    },
    aR = (e) => e || { value: 0 },
    sR = (e) => ({ value: e.value }),
    uR = (e) => {
      let t = window.Webflow.require("lottie").createInstance(e);
      return t.stop(), t.setSubframe(!0), t;
    },
    cR = (e, t, r) => {
      if (!e) return;
      let n = t[r.actionTypeId].value / 100;
      e.goToFrame(e.frames * n);
    },
    lR = (e) => {
      window.Webflow.require("lottie").createInstance(e).stop();
    };
});
var cl = c((Cn) => {
  "use strict";
  Object.defineProperty(Cn, "__esModule", { value: !0 });
  function fR(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  fR(Cn, {
    clearPlugin: function () {
      return hR;
    },
    createPluginInstance: function () {
      return TR;
    },
    getPluginConfig: function () {
      return gR;
    },
    getPluginDestination: function () {
      return IR;
    },
    getPluginDuration: function () {
      return yR;
    },
    getPluginOrigin: function () {
      return _R;
    },
    renderPlugin: function () {
      return mR;
    },
  });
  var pR = (e) => document.querySelector(`[data-w-id="${e}"]`),
    dR = () => window.Webflow.require("spline"),
    ER = (e, t) => e.filter((r) => !t.includes(r)),
    gR = (e, t) => e.value[t],
    yR = () => null,
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
    _R = (e, t) => {
      let r = t.config.value,
        n = Object.keys(r);
      if (e) {
        let i = Object.keys(e),
          a = ER(n, i);
        return a.length ? a.reduce((u, l) => ((u[l] = ul[l]), u), e) : e;
      }
      return n.reduce((i, a) => ((i[a] = ul[a]), i), {});
    },
    IR = (e) => e.value,
    TR = (e, t) => {
      let r = t?.config?.target?.pluginElement;
      return r ? pR(r) : null;
    },
    mR = (e, t, r) => {
      let n = dR(),
        o = n.getInstance(e),
        i = r.config.target.objectId,
        a = (s) => {
          if (!s) throw new Error("Invalid spline app passed to renderSpline");
          let u = i && s.findObjectById(i);
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
      o ? a(o.spline) : n.setLoadHandler(e, a);
    },
    hR = () => null;
});
var Nn = c((Pn) => {
  "use strict";
  Object.defineProperty(Pn, "__esModule", { value: !0 });
  Object.defineProperty(Pn, "normalizeColor", {
    enumerable: !0,
    get: function () {
      return AR;
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
  function AR(e) {
    let t,
      r,
      n,
      o = 1,
      i = e.replace(/\s/g, "").toLowerCase(),
      s = (typeof ll[i] == "string" ? ll[i].toLowerCase() : null) || i;
    if (s.startsWith("#")) {
      let u = s.substring(1);
      u.length === 3 || u.length === 4
        ? ((t = parseInt(u[0] + u[0], 16)),
          (r = parseInt(u[1] + u[1], 16)),
          (n = parseInt(u[2] + u[2], 16)),
          u.length === 4 && (o = parseInt(u[3] + u[3], 16) / 255))
        : (u.length === 6 || u.length === 8) &&
          ((t = parseInt(u.substring(0, 2), 16)),
          (r = parseInt(u.substring(2, 4), 16)),
          (n = parseInt(u.substring(4, 6), 16)),
          u.length === 8 && (o = parseInt(u.substring(6, 8), 16) / 255));
    } else if (s.startsWith("rgba")) {
      let u = s.match(/rgba\(([^)]+)\)/)[1].split(",");
      (t = parseInt(u[0], 10)),
        (r = parseInt(u[1], 10)),
        (n = parseInt(u[2], 10)),
        (o = parseFloat(u[3]));
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
      o = parseFloat(u[3]);
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
    return { red: t, green: r, blue: n, alpha: o };
  }
});
var fl = c((Ln) => {
  "use strict";
  Object.defineProperty(Ln, "__esModule", { value: !0 });
  function vR(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  vR(Ln, {
    clearPlugin: function () {
      return NR;
    },
    createPluginInstance: function () {
      return CR;
    },
    getPluginConfig: function () {
      return OR;
    },
    getPluginDestination: function () {
      return xR;
    },
    getPluginDuration: function () {
      return RR;
    },
    getPluginOrigin: function () {
      return bR;
    },
    renderPlugin: function () {
      return PR;
    },
  });
  var SR = Nn(),
    OR = (e, t) => e.value[t],
    RR = () => null,
    bR = (e, t) => {
      if (e) return e;
      let r = t.config.value,
        n = t.config.target.objectId,
        o = getComputedStyle(document.documentElement).getPropertyValue(n);
      if (r.size != null) return { size: parseInt(o, 10) };
      if (r.red != null && r.green != null && r.blue != null)
        return (0, SR.normalizeColor)(o);
    },
    xR = (e) => e.value,
    CR = () => null,
    PR = (e, t, r) => {
      let n = r.config.target.objectId,
        o = r.config.value.unit,
        { PLUGIN_VARIABLE: i } = t,
        { size: a, red: s, green: u, blue: l, alpha: p } = i,
        d;
      a != null && (d = a + o),
        s != null &&
          l != null &&
          u != null &&
          p != null &&
          (d = `rgba(${s}, ${u}, ${l}, ${p})`),
        d != null && document.documentElement.style.setProperty(n, d);
    },
    NR = (e, t) => {
      let r = t.config.target.objectId;
      document.documentElement.style.removeProperty(r);
    };
});
var dl = c((Fn) => {
  "use strict";
  Object.defineProperty(Fn, "__esModule", { value: !0 });
  Object.defineProperty(Fn, "pluginMethodMap", {
    enumerable: !0,
    get: function () {
      return FR;
    },
  });
  var Dn = (H(), $(Ii)),
    LR = Mn(sl()),
    DR = Mn(cl()),
    MR = Mn(fl());
  function pl(e) {
    if (typeof WeakMap != "function") return null;
    var t = new WeakMap(),
      r = new WeakMap();
    return (pl = function (n) {
      return n ? r : t;
    })(e);
  }
  function Mn(e, t) {
    if (!t && e && e.__esModule) return e;
    if (e === null || (typeof e != "object" && typeof e != "function"))
      return { default: e };
    var r = pl(t);
    if (r && r.has(e)) return r.get(e);
    var n = { __proto__: null },
      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var i in e)
      if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
        var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
        a && (a.get || a.set) ? Object.defineProperty(n, i, a) : (n[i] = e[i]);
      }
    return (n.default = e), r && r.set(e, n), n;
  }
  var FR = new Map([
    [Dn.ActionTypeConsts.PLUGIN_LOTTIE, { ...LR }],
    [Dn.ActionTypeConsts.PLUGIN_SPLINE, { ...DR }],
    [Dn.ActionTypeConsts.PLUGIN_VARIABLE, { ...MR }],
  ]);
});
var El = {};
U(El, {
  clearPlugin: () => Un,
  createPluginInstance: () => qR,
  getPluginConfig: () => qn,
  getPluginDestination: () => Xn,
  getPluginDuration: () => wR,
  getPluginOrigin: () => Gn,
  isPluginType: () => ge,
  renderPlugin: () => Vn,
});
function ge(e) {
  return wn.pluginMethodMap.has(e);
}
var wn,
  ye,
  qn,
  Gn,
  wR,
  Xn,
  qR,
  Vn,
  Un,
  Bn = D(() => {
    "use strict";
    zt();
    wn = C(dl());
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
      (wR = ye("getPluginDuration")),
      (Xn = ye("getPluginDestination")),
      (qR = ye("createPluginInstance")),
      (Vn = ye("renderPlugin")),
      (Un = ye("clearPlugin"));
  });
var yl = c((Dw, gl) => {
  function GR(e, t) {
    return e == null || e !== e ? t : e;
  }
  gl.exports = GR;
});
var Il = c((Mw, _l) => {
  function XR(e, t, r, n) {
    var o = -1,
      i = e == null ? 0 : e.length;
    for (n && i && (r = e[++o]); ++o < i; ) r = t(r, e[o], o, e);
    return r;
  }
  _l.exports = XR;
});
var ml = c((Fw, Tl) => {
  function VR(e) {
    return function (t, r, n) {
      for (var o = -1, i = Object(t), a = n(t), s = a.length; s--; ) {
        var u = a[e ? s : ++o];
        if (r(i[u], u, i) === !1) break;
      }
      return t;
    };
  }
  Tl.exports = VR;
});
var Al = c((ww, hl) => {
  var UR = ml(),
    BR = UR();
  hl.exports = BR;
});
var Hn = c((qw, vl) => {
  var HR = Al(),
    WR = rt();
  function kR(e, t) {
    return e && HR(e, t, WR);
  }
  vl.exports = kR;
});
var Ol = c((Gw, Sl) => {
  var KR = de();
  function jR(e, t) {
    return function (r, n) {
      if (r == null) return r;
      if (!KR(r)) return e(r, n);
      for (
        var o = r.length, i = t ? o : -1, a = Object(r);
        (t ? i-- : ++i < o) && n(a[i], i, a) !== !1;

      );
      return r;
    };
  }
  Sl.exports = jR;
});
var Wn = c((Xw, Rl) => {
  var zR = Hn(),
    YR = Ol(),
    QR = YR(zR);
  Rl.exports = QR;
});
var xl = c((Vw, bl) => {
  function $R(e, t, r, n, o) {
    return (
      o(e, function (i, a, s) {
        r = n ? ((n = !1), i) : t(r, i, a, s);
      }),
      r
    );
  }
  bl.exports = $R;
});
var Pl = c((Uw, Cl) => {
  var ZR = Il(),
    JR = Wn(),
    eb = le(),
    tb = xl(),
    rb = q();
  function nb(e, t, r) {
    var n = rb(e) ? ZR : tb,
      o = arguments.length < 3;
    return n(e, eb(t, 4), r, o, JR);
  }
  Cl.exports = nb;
});
var Ll = c((Bw, Nl) => {
  var ob = mn(),
    ib = le(),
    ab = hn(),
    sb = Math.max,
    ub = Math.min;
  function cb(e, t, r) {
    var n = e == null ? 0 : e.length;
    if (!n) return -1;
    var o = n - 1;
    return (
      r !== void 0 && ((o = ab(r)), (o = r < 0 ? sb(n + o, 0) : ub(o, n - 1))),
      ob(e, ib(t, 3), o, !0)
    );
  }
  Nl.exports = cb;
});
var Ml = c((Hw, Dl) => {
  var lb = Tn(),
    fb = Ll(),
    pb = lb(fb);
  Dl.exports = pb;
});
function Fl(e, t) {
  return e === t ? e !== 0 || t !== 0 || 1 / e === 1 / t : e !== e && t !== t;
}
function db(e, t) {
  if (Fl(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null)
    return !1;
  let r = Object.keys(e),
    n = Object.keys(t);
  if (r.length !== n.length) return !1;
  for (let o = 0; o < r.length; o++)
    if (!Object.hasOwn(t, r[o]) || !Fl(e[r[o]], t[r[o]])) return !1;
  return !0;
}
var kn,
  wl = D(() => {
    "use strict";
    kn = db;
  });
var ef = {};
U(ef, {
  cleanupHTMLElement: () => lx,
  clearAllStyles: () => cx,
  clearObjectCache: () => Pb,
  getActionListProgress: () => px,
  getAffectedElements: () => Qn,
  getComputedStyle: () => Gb,
  getDestinationValues: () => kb,
  getElementId: () => Mb,
  getInstanceId: () => Lb,
  getInstanceOrigin: () => Ub,
  getItemConfigByKey: () => Wb,
  getMaxDurationItemIndex: () => Jl,
  getNamespacedParameterId: () => gx,
  getRenderType: () => Ql,
  getStyleProp: () => Kb,
  mediaQueriesEqual: () => _x,
  observeStore: () => qb,
  reduceListToGroup: () => dx,
  reifyState: () => Fb,
  renderHTMLElement: () => jb,
  shallowEqual: () => kn,
  shouldAllowMediaQuery: () => yx,
  shouldNamespaceEventParameter: () => Ex,
  stringifyTarget: () => Ix,
});
function Pb() {
  $t.clear();
}
function Lb() {
  return "i" + Nb++;
}
function Mb(e, t) {
  for (let r in e) {
    let n = e[r];
    if (n && n.ref === t) return n.id;
  }
  return "e" + Db++;
}
function Fb({ events: e, actionLists: t, site: r } = {}) {
  let n = (0, tr.default)(
      e,
      (a, s) => {
        let { eventTypeId: u } = s;
        return a[u] || (a[u] = {}), (a[u][s.id] = s), a;
      },
      {}
    ),
    o = r && r.mediaQueries,
    i = [];
  return (
    o
      ? (i = o.map((a) => a.key))
      : ((o = []), console.warn("IX2 missing mediaQueries in site data")),
    {
      ixData: {
        events: e,
        actionLists: t,
        eventTypeMap: n,
        mediaQueries: o,
        mediaQueryKeys: i,
      },
    }
  );
}
function qb({ store: e, select: t, onChange: r, comparator: n = wb }) {
  let { getState: o, subscribe: i } = e,
    a = i(u),
    s = t(o());
  function u() {
    let l = t(o());
    if (l == null) {
      a();
      return;
    }
    n(l, s) || ((s = l), r(s, e));
  }
  return a;
}
function Xl(e) {
  let t = typeof e;
  if (t === "string") return { id: e };
  if (e != null && t === "object") {
    let {
      id: r,
      objectId: n,
      selector: o,
      selectorGuids: i,
      appliesTo: a,
      useEventTarget: s,
    } = e;
    return {
      id: r,
      objectId: n,
      selector: o,
      selectorGuids: i,
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
  elementApi: o,
}) {
  if (!o) throw new Error("IX2 missing elementApi");
  let { targets: i } = e;
  if (Array.isArray(i) && i.length > 0)
    return i.reduce(
      (P, N) =>
        P.concat(
          Qn({
            config: { target: N },
            event: t,
            eventTarget: r,
            elementRoot: n,
            elementApi: o,
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
    } = o,
    { target: _ } = e;
  if (!_) return [];
  let {
    id: E,
    objectId: I,
    selector: g,
    selectorGuids: m,
    appliesTo: A,
    useEventTarget: h,
  } = Xl(_);
  if (I) return [$t.has(I) ? $t.get(I) : $t.set(I, {}).get(I)];
  if (A === Wr.PAGE) {
    let P = a(E);
    return P ? [P] : [];
  }
  let T = (t?.action?.config?.affectedElements ?? {})[E || g] || {},
    R = !!(T.id || T.selector),
    v,
    S,
    b,
    x = t && s(Xl(t.target));
  if (
    (R
      ? ((v = T.limitAffectedElements), (S = x), (b = s(T)))
      : (S = b = s({ id: E, selector: g, selectorGuids: m })),
    t && h)
  ) {
    let P = r && (b || h === !0) ? [r] : u(x);
    if (b) {
      if (h === bb) return u(b).filter((N) => P.some((F) => f(N, F)));
      if (h === ql) return u(b).filter((N) => P.some((F) => f(F, N)));
      if (h === Gl) return u(b).filter((N) => P.some((F) => y(F, N)));
    }
    return P;
  }
  return S == null || b == null
    ? []
    : Y && n
    ? u(b).filter((P) => n.contains(P))
    : v === ql
    ? u(S, b)
    : v === Rb
    ? l(u(S)).filter(d(b))
    : v === Gl
    ? p(u(S)).filter(d(b))
    : u(b);
}
function Gb({ element: e, actionItem: t }) {
  if (!Y) return {};
  let { actionTypeId: r } = t;
  switch (r) {
    case qe:
    case Ge:
    case Xe:
    case Ve:
    case nr:
      return window.getComputedStyle(e);
    default:
      return {};
  }
}
function Ub(e, t = {}, r = {}, n, o) {
  let { getStyle: i } = o,
    { actionTypeId: a } = n;
  if (ge(a)) return Gn(a)(t[a], n);
  switch (n.actionTypeId) {
    case Me:
    case Fe:
    case we:
    case pt:
      return t[n.actionTypeId] || $n[n.actionTypeId];
    case dt:
      return Xb(t[n.actionTypeId], n.config.filters);
    case Et:
      return Vb(t[n.actionTypeId], n.config.fontVariations);
    case jl:
      return { value: (0, ie.default)(parseFloat(i(e, Jt)), 1) };
    case qe: {
      let s = i(e, ee),
        u = i(e, te),
        l,
        p;
      return (
        n.config.widthUnit === pe
          ? (l = Vl.test(s) ? parseFloat(s) : parseFloat(r.width))
          : (l = (0, ie.default)(parseFloat(s), parseFloat(r.width))),
        n.config.heightUnit === pe
          ? (p = Vl.test(u) ? parseFloat(u) : parseFloat(r.height))
          : (p = (0, ie.default)(parseFloat(u), parseFloat(r.height))),
        { widthValue: l, heightValue: p }
      );
    }
    case Ge:
    case Xe:
    case Ve:
      return ax({
        element: e,
        actionTypeId: n.actionTypeId,
        computedStyle: r,
        getStyle: i,
      });
    case nr:
      return { value: (0, ie.default)(i(e, er), r.display) };
    case Cb:
      return t[n.actionTypeId] || { value: 0 };
    default:
      return;
  }
}
function kb({ element: e, actionItem: t, elementApi: r }) {
  if (ge(t.actionTypeId)) return Xn(t.actionTypeId)(t.config);
  switch (t.actionTypeId) {
    case Me:
    case Fe:
    case we:
    case pt: {
      let { xValue: n, yValue: o, zValue: i } = t.config;
      return { xValue: n, yValue: o, zValue: i };
    }
    case qe: {
      let { getStyle: n, setStyle: o, getProperty: i } = r,
        { widthUnit: a, heightUnit: s } = t.config,
        { widthValue: u, heightValue: l } = t.config;
      if (!Y) return { widthValue: u, heightValue: l };
      if (a === pe) {
        let p = n(e, ee);
        o(e, ee, ""), (u = i(e, "offsetWidth")), o(e, ee, p);
      }
      if (s === pe) {
        let p = n(e, te);
        o(e, te, ""), (l = i(e, "offsetHeight")), o(e, te, p);
      }
      return { widthValue: u, heightValue: l };
    }
    case Ge:
    case Xe:
    case Ve: {
      let {
        rValue: n,
        gValue: o,
        bValue: i,
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
      return { rValue: n, gValue: o, bValue: i, aValue: a };
    }
    case dt:
      return t.config.filters.reduce(Bb, {});
    case Et:
      return t.config.fontVariations.reduce(Hb, {});
    default: {
      let { value: n } = t.config;
      return { value: n };
    }
  }
}
function Ql(e) {
  if (/^TRANSFORM_/.test(e)) return kl;
  if (/^STYLE_/.test(e)) return zn;
  if (/^GENERAL_/.test(e)) return jn;
  if (/^PLUGIN_/.test(e)) return Kl;
}
function Kb(e, t) {
  return e === zn ? t.replace("STYLE_", "").toLowerCase() : null;
}
function jb(e, t, r, n, o, i, a, s, u) {
  switch (s) {
    case kl:
      return Zb(e, t, r, o, a);
    case zn:
      return sx(e, t, r, o, i, a);
    case jn:
      return ux(e, o, a);
    case Kl: {
      let { actionTypeId: l } = o;
      if (ge(l)) return Vn(l)(u, t, o);
    }
  }
}
function Zb(e, t, r, n, o) {
  let i = $b
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
          case Me:
            return `${yb}(${l}${f}, ${p}${y}, ${d}${_})`;
          case Fe:
            return `${_b}(${l}${f}, ${p}${y}, ${d}${_})`;
          case we:
            return `${Ib}(${l}${f}) ${Tb}(${p}${y}) ${mb}(${d}${_})`;
          case pt:
            return `${hb}(${l}${f}, ${p}${y})`;
          default:
            return "";
        }
      })
      .join(" "),
    { setStyle: a } = o;
  _e(e, fe, o), a(e, fe, i), tx(n, r) && a(e, jt, Ab);
}
function Jb(e, t, r, n) {
  let o = (0, tr.default)(t, (a, s, u) => `${a} ${u}(${s}${Qb(u, r)})`, ""),
    { setStyle: i } = n;
  _e(e, ct, n), i(e, ct, o);
}
function ex(e, t, r, n) {
  let o = (0, tr.default)(t, (a, s, u) => (a.push(`"${u}" ${s}`), a), []).join(
      ", "
    ),
    { setStyle: i } = n;
  _e(e, lt, n), i(e, lt, o);
}
function tx({ actionTypeId: e }, { xValue: t, yValue: r, zValue: n }) {
  return (
    (e === Me && n !== void 0) ||
    (e === Fe && n !== void 0) ||
    (e === we && (t !== void 0 || r !== void 0))
  );
}
function ix(e, t) {
  let r = e.exec(t);
  return r ? r[1] : "";
}
function ax({ element: e, actionTypeId: t, computedStyle: r, getStyle: n }) {
  let o = Yn[t],
    i = n(e, o),
    a = nx.test(i) ? i : r[o],
    s = ix(ox, a).split(ft);
  return {
    rValue: (0, ie.default)(parseInt(s[0], 10), 255),
    gValue: (0, ie.default)(parseInt(s[1], 10), 255),
    bValue: (0, ie.default)(parseInt(s[2], 10), 255),
    aValue: (0, ie.default)(parseFloat(s[3]), 1),
  };
}
function sx(e, t, r, n, o, i) {
  let { setStyle: a } = i;
  switch (n.actionTypeId) {
    case qe: {
      let { widthUnit: s = "", heightUnit: u = "" } = n.config,
        { widthValue: l, heightValue: p } = r;
      l !== void 0 && (s === pe && (s = "px"), _e(e, ee, i), a(e, ee, l + s)),
        p !== void 0 && (u === pe && (u = "px"), _e(e, te, i), a(e, te, p + u));
      break;
    }
    case dt: {
      Jb(e, r, n.config, i);
      break;
    }
    case Et: {
      ex(e, r, n.config, i);
      break;
    }
    case Ge:
    case Xe:
    case Ve: {
      let s = Yn[n.actionTypeId],
        u = Math.round(r.rValue),
        l = Math.round(r.gValue),
        p = Math.round(r.bValue),
        d = r.aValue;
      _e(e, s, i),
        a(e, s, d >= 1 ? `rgb(${u},${l},${p})` : `rgba(${u},${l},${p},${d})`);
      break;
    }
    default: {
      let { unit: s = "" } = n.config;
      _e(e, o, i), a(e, o, r.value + s);
      break;
    }
  }
}
function ux(e, t, r) {
  let { setStyle: n } = r;
  switch (t.actionTypeId) {
    case nr: {
      let { value: o } = t.config;
      o === vb && Y ? n(e, er, vn) : n(e, er, o);
      return;
    }
  }
}
function _e(e, t, r) {
  if (!Y) return;
  let n = Yl[t];
  if (!n) return;
  let { getStyle: o, setStyle: i } = r,
    a = o(e, De);
  if (!a) {
    i(e, De, n);
    return;
  }
  let s = a.split(ft).map(zl);
  s.indexOf(n) === -1 && i(e, De, s.concat(n).join(ft));
}
function $l(e, t, r) {
  if (!Y) return;
  let n = Yl[t];
  if (!n) return;
  let { getStyle: o, setStyle: i } = r,
    a = o(e, De);
  !a ||
    a.indexOf(n) === -1 ||
    i(
      e,
      De,
      a
        .split(ft)
        .map(zl)
        .filter((s) => s !== n)
        .join(ft)
    );
}
function cx({ store: e, elementApi: t }) {
  let { ixData: r } = e.getState(),
    { events: n = {}, actionLists: o = {} } = r;
  Object.keys(n).forEach((i) => {
    let a = n[i],
      { config: s } = a.action,
      { actionListId: u } = s,
      l = o[u];
    l && Ul({ actionList: l, event: a, elementApi: t });
  }),
    Object.keys(o).forEach((i) => {
      Ul({ actionList: o[i], elementApi: t });
    });
}
function Ul({ actionList: e = {}, event: t, elementApi: r }) {
  let { actionItemGroups: n, continuousParameterGroups: o } = e;
  n &&
    n.forEach((i) => {
      Bl({ actionGroup: i, event: t, elementApi: r });
    }),
    o &&
      o.forEach((i) => {
        let { continuousActionGroups: a } = i;
        a.forEach((s) => {
          Bl({ actionGroup: s, event: t, elementApi: r });
        });
      });
}
function Bl({ actionGroup: e, event: t, elementApi: r }) {
  let { actionItems: n } = e;
  n.forEach((o) => {
    let { actionTypeId: i, config: a } = o,
      s;
    ge(i)
      ? (s = (u) => Un(i)(u, o))
      : (s = Zl({ effect: fx, actionTypeId: i, elementApi: r })),
      Qn({ config: a, event: t, elementApi: r }).forEach(s);
  });
}
function lx(e, t, r) {
  let { setStyle: n, getStyle: o } = r,
    { actionTypeId: i } = t;
  if (i === qe) {
    let { config: a } = t;
    a.widthUnit === pe && n(e, ee, ""), a.heightUnit === pe && n(e, te, "");
  }
  o(e, De) && Zl({ effect: $l, actionTypeId: i, elementApi: r })(e);
}
function fx(e, t, r) {
  let { setStyle: n } = r;
  $l(e, t, r), n(e, t, ""), t === fe && n(e, jt, "");
}
function Jl(e) {
  let t = 0,
    r = 0;
  return (
    e.forEach((n, o) => {
      let { config: i } = n,
        a = i.delay + i.duration;
      a >= t && ((t = a), (r = o));
    }),
    r
  );
}
function px(e, t) {
  let { actionItemGroups: r, useFirstGroupAsInitialState: n } = e,
    { actionItem: o, verboseTimeElapsed: i = 0 } = t,
    a = 0,
    s = 0;
  return (
    r.forEach((u, l) => {
      if (n && l === 0) return;
      let { actionItems: p } = u,
        d = p[Jl(p)],
        { config: f, actionTypeId: y } = d;
      o.id === d.id && (s = a + i);
      let _ = Ql(y) === jn ? 0 : f.duration;
      a += f.delay + _;
    }),
    a > 0 ? ut(s / a) : 0
  );
}
function dx({ actionList: e, actionItemId: t, rawData: r }) {
  let { actionItemGroups: n, continuousParameterGroups: o } = e,
    i = [],
    a = (s) => (
      i.push((0, rr.mergeIn)(s, ["config"], { delay: 0, duration: 0 })),
      s.id === t
    );
  return (
    n && n.some(({ actionItems: s }) => s.some(a)),
    o &&
      o.some((s) => {
        let { continuousActionGroups: u } = s;
        return u.some(({ actionItems: l }) => l.some(a));
      }),
    (0, rr.setIn)(r, ["actionLists"], {
      [e.id]: { id: e.id, actionItemGroups: [{ actionItems: i }] },
    })
  );
}
function Ex(e, { basedOn: t }) {
  return (
    (e === z.SCROLLING_IN_VIEW && (t === Z.ELEMENT || t == null)) ||
    (e === z.MOUSE_MOVE && t === Z.ELEMENT)
  );
}
function gx(e, t) {
  return e + xb + t;
}
function yx(e, t) {
  return t == null ? !0 : e.indexOf(t) !== -1;
}
function _x(e, t) {
  return kn(e && e.sort(), t && t.sort());
}
function Ix(e) {
  if (typeof e == "string") return e;
  if (e.pluginElement && e.objectId) return e.pluginElement + Kn + e.objectId;
  if (e.objectId) return e.objectId;
  let { id: t = "", selector: r = "", useEventTarget: n = "" } = e;
  return t + Kn + r + Kn + n;
}
var ie,
  tr,
  Zt,
  rr,
  Hl,
  Eb,
  gb,
  yb,
  _b,
  Ib,
  Tb,
  mb,
  hb,
  Ab,
  vb,
  Jt,
  ct,
  lt,
  ee,
  te,
  Wl,
  Sb,
  Ob,
  ql,
  Rb,
  Gl,
  bb,
  er,
  De,
  pe,
  ft,
  xb,
  Kn,
  kl,
  jn,
  zn,
  Kl,
  Me,
  Fe,
  we,
  pt,
  jl,
  dt,
  Et,
  qe,
  Ge,
  Xe,
  Ve,
  nr,
  Cb,
  zl,
  Yn,
  Yl,
  $t,
  Nb,
  Db,
  wb,
  Vl,
  Xb,
  Vb,
  Bb,
  Hb,
  Wb,
  $n,
  zb,
  Yb,
  Qb,
  $b,
  rx,
  nx,
  ox,
  Zl,
  tf = D(() => {
    "use strict";
    (ie = C(yl())), (tr = C(Pl())), (Zt = C(Ml())), (rr = C(ve()));
    H();
    wl();
    Rn();
    Hl = C(Nn());
    Bn();
    zt();
    ({
      BACKGROUND: Eb,
      TRANSFORM: gb,
      TRANSLATE_3D: yb,
      SCALE_3D: _b,
      ROTATE_X: Ib,
      ROTATE_Y: Tb,
      ROTATE_Z: mb,
      SKEW: hb,
      PRESERVE_3D: Ab,
      FLEX: vb,
      OPACITY: Jt,
      FILTER: ct,
      FONT_VARIATION_SETTINGS: lt,
      WIDTH: ee,
      HEIGHT: te,
      BACKGROUND_COLOR: Wl,
      BORDER_COLOR: Sb,
      COLOR: Ob,
      CHILDREN: ql,
      IMMEDIATE_CHILDREN: Rb,
      SIBLINGS: Gl,
      PARENT: bb,
      DISPLAY: er,
      WILL_CHANGE: De,
      AUTO: pe,
      COMMA_DELIMITER: ft,
      COLON_DELIMITER: xb,
      BAR_DELIMITER: Kn,
      RENDER_TRANSFORM: kl,
      RENDER_GENERAL: jn,
      RENDER_STYLE: zn,
      RENDER_PLUGIN: Kl,
    } = G),
      ({
        TRANSFORM_MOVE: Me,
        TRANSFORM_SCALE: Fe,
        TRANSFORM_ROTATE: we,
        TRANSFORM_SKEW: pt,
        STYLE_OPACITY: jl,
        STYLE_FILTER: dt,
        STYLE_FONT_VARIATION: Et,
        STYLE_SIZE: qe,
        STYLE_BACKGROUND_COLOR: Ge,
        STYLE_BORDER: Xe,
        STYLE_TEXT_COLOR: Ve,
        GENERAL_DISPLAY: nr,
        OBJECT_VALUE: Cb,
      } = B),
      (zl = (e) => e.trim()),
      (Yn = Object.freeze({ [Ge]: Wl, [Xe]: Sb, [Ve]: Ob })),
      (Yl = Object.freeze({
        [fe]: gb,
        [Wl]: Eb,
        [Jt]: Jt,
        [ct]: ct,
        [ee]: ee,
        [te]: te,
        [lt]: lt,
      })),
      ($t = new Map());
    Nb = 1;
    Db = 1;
    wb = (e, t) => e === t;
    (Vl = /px/),
      (Xb = (e, t) =>
        t.reduce(
          (r, n) => (r[n.type] == null && (r[n.type] = zb[n.type]), r),
          e || {}
        )),
      (Vb = (e, t) =>
        t.reduce(
          (r, n) => (
            r[n.type] == null &&
              (r[n.type] = Yb[n.type] || n.defaultValue || 0),
            r
          ),
          e || {}
        ));
    (Bb = (e, t) => (t && (e[t.type] = t.value || 0), e)),
      (Hb = (e, t) => (t && (e[t.type] = t.value || 0), e)),
      (Wb = (e, t, r) => {
        if (ge(e)) return qn(e)(r, t);
        switch (e) {
          case dt: {
            let n = (0, Zt.default)(r.filters, ({ type: o }) => o === t);
            return n ? n.value : 0;
          }
          case Et: {
            let n = (0, Zt.default)(r.fontVariations, ({ type: o }) => o === t);
            return n ? n.value : 0;
          }
          default:
            return r[t];
        }
      });
    ($n = {
      [Me]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
      [Fe]: Object.freeze({ xValue: 1, yValue: 1, zValue: 1 }),
      [we]: Object.freeze({ xValue: 0, yValue: 0, zValue: 0 }),
      [pt]: Object.freeze({ xValue: 0, yValue: 0 }),
    }),
      (zb = Object.freeze({
        blur: 0,
        "hue-rotate": 0,
        invert: 0,
        grayscale: 0,
        saturate: 100,
        sepia: 0,
        contrast: 100,
        brightness: 100,
      })),
      (Yb = Object.freeze({ wght: 0, opsz: 0, wdth: 0, slnt: 0 })),
      (Qb = (e, t) => {
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
      ($b = Object.keys($n));
    (rx = "\\(([^)]+)\\)"), (nx = /^rgb/), (ox = RegExp(`rgba?${rx}`));
    Zl =
      ({ effect: e, actionTypeId: t, elementApi: r }) =>
      (n) => {
        switch (t) {
          case Me:
          case Fe:
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
          case jl:
            e(n, Jt, r);
            break;
          case qe:
            e(n, ee, r), e(n, te, r);
            break;
          case Ge:
          case Xe:
          case Ve:
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
  function Tx(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  Tx(Zn, {
    IX2BrowserSupport: function () {
      return mx;
    },
    IX2EasingUtils: function () {
      return Ax;
    },
    IX2Easings: function () {
      return hx;
    },
    IX2ElementsReducer: function () {
      return vx;
    },
    IX2VanillaPlugins: function () {
      return Sx;
    },
    IX2VanillaUtils: function () {
      return Ox;
    },
  });
  var mx = Ue((zt(), $(Yc))),
    hx = Ue((On(), $(st))),
    Ax = Ue((Rn(), $(rl))),
    vx = Ue((al(), $(il))),
    Sx = Ue((Bn(), $(El))),
    Ox = Ue((tf(), $(ef)));
  function rf(e) {
    if (typeof WeakMap != "function") return null;
    var t = new WeakMap(),
      r = new WeakMap();
    return (rf = function (n) {
      return n ? r : t;
    })(e);
  }
  function Ue(e, t) {
    if (!t && e && e.__esModule) return e;
    if (e === null || (typeof e != "object" && typeof e != "function"))
      return { default: e };
    var r = rf(t);
    if (r && r.has(e)) return r.get(e);
    var n = { __proto__: null },
      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var i in e)
      if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
        var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
        a && (a.get || a.set) ? Object.defineProperty(n, i, a) : (n[i] = e[i]);
      }
    return (n.default = e), r && r.set(e, n), n;
  }
});
var ir,
  ae,
  Rx,
  bx,
  xx,
  Cx,
  Px,
  Nx,
  or,
  nf,
  Lx,
  Dx,
  Jn,
  Mx,
  Fx,
  wx,
  qx,
  of,
  af = D(() => {
    "use strict";
    H();
    (ir = C(Ie())),
      (ae = C(ve())),
      ({
        IX2_RAW_DATA_IMPORTED: Rx,
        IX2_SESSION_STOPPED: bx,
        IX2_INSTANCE_ADDED: xx,
        IX2_INSTANCE_STARTED: Cx,
        IX2_INSTANCE_REMOVED: Px,
        IX2_ANIMATION_FRAME_CHANGED: Nx,
      } = w),
      ({
        optimizeFloat: or,
        applyEasing: nf,
        createBezierEasing: Lx,
      } = ir.IX2EasingUtils),
      ({ RENDER_GENERAL: Dx } = G),
      ({
        getItemConfigByKey: Jn,
        getRenderType: Mx,
        getStyleProp: Fx,
      } = ir.IX2VanillaUtils),
      (wx = (e, t) => {
        let {
            position: r,
            parameterId: n,
            actionGroups: o,
            destinationKeys: i,
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
          I = or(E - r),
          g = p ? d : or(r + I * y),
          m = g * 100;
        if (g === r && e.current) return e;
        let A, h, O, T;
        for (let v = 0, { length: S } = o; v < S; v++) {
          let { keyframe: b, actionItems: x } = o[v];
          if ((v === 0 && (A = x[0]), m >= b)) {
            A = x[0];
            let P = o[v + 1],
              N = P && m !== b;
            (h = N ? P.actionItems[0] : null),
              N && ((O = b / 100), (T = (P.keyframe - b) / 100));
          }
        }
        let R = {};
        if (A && !h)
          for (let v = 0, { length: S } = i; v < S; v++) {
            let b = i[v];
            R[b] = Jn(u, b, A.config);
          }
        else if (A && h && O !== void 0 && T !== void 0) {
          let v = (g - O) / T,
            S = A.config.easing,
            b = nf(S, v, l);
          for (let x = 0, { length: P } = i; x < P; x++) {
            let N = i[x],
              F = Jn(u, N, A.config),
              br = (Jn(u, N, h.config) - F) * b + F;
            R[N] = br;
          }
        }
        return (0, ae.merge)(e, { position: g, current: R });
      }),
      (qx = (e, t) => {
        let {
            active: r,
            origin: n,
            start: o,
            immediate: i,
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
          a === Dx ? (I = 0) : (i || _) && (I = g = 0);
        let { now: m } = t.payload;
        if (r && n) {
          let A = m - (o + g);
          if (s) {
            let v = m - o,
              S = I + g,
              b = or(Math.min(Math.max(0, v / S), 1));
            e = (0, ae.set)(e, "verboseTimeElapsed", S * b);
          }
          if (A < 0) return e;
          let h = or(Math.min(Math.max(0, A / I), 1)),
            O = nf(E, h, y),
            T = {},
            R = null;
          return (
            p.length &&
              (R = p.reduce((v, S) => {
                let b = l[S],
                  x = parseFloat(n[S]) || 0,
                  N = (parseFloat(b) - x) * O + x;
                return (v[S] = N), v;
              }, {})),
            (T.current = R),
            (T.position = h),
            h === 1 && ((T.active = !1), (T.complete = !0)),
            (0, ae.merge)(e, T)
          );
        }
        return e;
      }),
      (of = (e = Object.freeze({}), t) => {
        switch (t.type) {
          case Rx:
            return t.payload.ixInstances || Object.freeze({});
          case bx:
            return Object.freeze({});
          case xx: {
            let {
                instanceId: r,
                elementId: n,
                actionItem: o,
                eventId: i,
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
                smoothing: m,
                restingValue: A,
                pluginInstance: h,
                pluginDuration: O,
                instanceDelay: T,
                skipMotion: R,
                skipToValue: v,
              } = t.payload,
              { actionTypeId: S } = o,
              b = Mx(S),
              x = Fx(b, S),
              P = Object.keys(f).filter(
                (F) => f[F] != null && typeof f[F] != "string"
              ),
              { easing: N } = o.config;
            return (0, ae.set)(e, r, {
              id: r,
              elementId: n,
              active: !1,
              position: 0,
              start: 0,
              origin: d,
              destination: f,
              destinationKeys: P,
              immediate: y,
              verbose: _,
              current: null,
              actionItem: o,
              actionTypeId: S,
              eventId: i,
              eventTarget: a,
              eventStateKey: s,
              actionListId: u,
              groupIndex: l,
              renderType: b,
              isCarrier: p,
              styleProp: x,
              continuous: E,
              parameterId: I,
              actionGroups: g,
              smoothing: m,
              restingValue: A,
              pluginInstance: h,
              pluginDuration: O,
              instanceDelay: T,
              skipMotion: R,
              skipToValue: v,
              customEasingFn:
                Array.isArray(N) && N.length === 4 ? Lx(N) : void 0,
            });
          }
          case Cx: {
            let { instanceId: r, time: n } = t.payload;
            return (0, ae.mergeIn)(e, [r], {
              active: !0,
              complete: !1,
              start: n,
            });
          }
          case Px: {
            let { instanceId: r } = t.payload;
            if (!e[r]) return e;
            let n = {},
              o = Object.keys(e),
              { length: i } = o;
            for (let a = 0; a < i; a++) {
              let s = o[a];
              s !== r && (n[s] = e[s]);
            }
            return n;
          }
          case Nx: {
            let r = e,
              n = Object.keys(e),
              { length: o } = n;
            for (let i = 0; i < o; i++) {
              let a = n[i],
                s = e[a],
                u = s.continuous ? wx : qx;
              r = (0, ae.set)(r, a, u(s, t));
            }
            return r;
          }
          default:
            return e;
        }
      });
  });
var Gx,
  Xx,
  Vx,
  sf,
  uf = D(() => {
    "use strict";
    H();
    ({
      IX2_RAW_DATA_IMPORTED: Gx,
      IX2_SESSION_STOPPED: Xx,
      IX2_PARAMETER_CHANGED: Vx,
    } = w),
      (sf = (e = {}, t) => {
        switch (t.type) {
          case Gx:
            return t.payload.ixParameters || {};
          case Xx:
            return {};
          case Vx: {
            let { key: r, value: n } = t.payload;
            return (e[r] = n), e;
          }
          default:
            return e;
        }
      });
  });
var ff = {};
U(ff, { default: () => Bx });
var cf,
  lf,
  Ux,
  Bx,
  pf = D(() => {
    "use strict";
    cf = C(Hr());
    mi();
    Ui();
    Wi();
    lf = C(Ie());
    af();
    uf();
    ({ ixElements: Ux } = lf.IX2ElementsReducer),
      (Bx = (0, cf.combineReducers)({
        ixData: Ti,
        ixRequest: Vi,
        ixSession: Hi,
        ixElements: Ux,
        ixInstances: of,
        ixParameters: sf,
      }));
  });
var Ef = c((sq, df) => {
  var Hx = ue(),
    Wx = q(),
    kx = ne(),
    Kx = "[object String]";
  function jx(e) {
    return typeof e == "string" || (!Wx(e) && kx(e) && Hx(e) == Kx);
  }
  df.exports = jx;
});
var yf = c((uq, gf) => {
  var zx = In(),
    Yx = zx("length");
  gf.exports = Yx;
});
var If = c((cq, _f) => {
  var Qx = "\\ud800-\\udfff",
    $x = "\\u0300-\\u036f",
    Zx = "\\ufe20-\\ufe2f",
    Jx = "\\u20d0-\\u20ff",
    eC = $x + Zx + Jx,
    tC = "\\ufe0e\\ufe0f",
    rC = "\\u200d",
    nC = RegExp("[" + rC + Qx + eC + tC + "]");
  function oC(e) {
    return nC.test(e);
  }
  _f.exports = oC;
});
var bf = c((lq, Rf) => {
  var mf = "\\ud800-\\udfff",
    iC = "\\u0300-\\u036f",
    aC = "\\ufe20-\\ufe2f",
    sC = "\\u20d0-\\u20ff",
    uC = iC + aC + sC,
    cC = "\\ufe0e\\ufe0f",
    lC = "[" + mf + "]",
    eo = "[" + uC + "]",
    to = "\\ud83c[\\udffb-\\udfff]",
    fC = "(?:" + eo + "|" + to + ")",
    hf = "[^" + mf + "]",
    Af = "(?:\\ud83c[\\udde6-\\uddff]){2}",
    vf = "[\\ud800-\\udbff][\\udc00-\\udfff]",
    pC = "\\u200d",
    Sf = fC + "?",
    Of = "[" + cC + "]?",
    dC = "(?:" + pC + "(?:" + [hf, Af, vf].join("|") + ")" + Of + Sf + ")*",
    EC = Of + Sf + dC,
    gC = "(?:" + [hf + eo + "?", eo, Af, vf, lC].join("|") + ")",
    Tf = RegExp(to + "(?=" + to + ")|" + gC + EC, "g");
  function yC(e) {
    for (var t = (Tf.lastIndex = 0); Tf.test(e); ) ++t;
    return t;
  }
  Rf.exports = yC;
});
var Cf = c((fq, xf) => {
  var _C = yf(),
    IC = If(),
    TC = bf();
  function mC(e) {
    return IC(e) ? TC(e) : _C(e);
  }
  xf.exports = mC;
});
var Nf = c((pq, Pf) => {
  var hC = Gt(),
    AC = Xt(),
    vC = de(),
    SC = Ef(),
    OC = Cf(),
    RC = "[object Map]",
    bC = "[object Set]";
  function xC(e) {
    if (e == null) return 0;
    if (vC(e)) return SC(e) ? OC(e) : e.length;
    var t = AC(e);
    return t == RC || t == bC ? e.size : hC(e).length;
  }
  Pf.exports = xC;
});
var Df = c((dq, Lf) => {
  var CC = "Expected a function";
  function PC(e) {
    if (typeof e != "function") throw new TypeError(CC);
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
  Lf.exports = PC;
});
var ro = c((Eq, Mf) => {
  var NC = ce(),
    LC = (function () {
      try {
        var e = NC(Object, "defineProperty");
        return e({}, "", {}), e;
      } catch {}
    })();
  Mf.exports = LC;
});
var no = c((gq, wf) => {
  var Ff = ro();
  function DC(e, t, r) {
    t == "__proto__" && Ff
      ? Ff(e, t, { configurable: !0, enumerable: !0, value: r, writable: !0 })
      : (e[t] = r);
  }
  wf.exports = DC;
});
var Gf = c((yq, qf) => {
  var MC = no(),
    FC = xt(),
    wC = Object.prototype,
    qC = wC.hasOwnProperty;
  function GC(e, t, r) {
    var n = e[t];
    (!(qC.call(e, t) && FC(n, r)) || (r === void 0 && !(t in e))) &&
      MC(e, t, r);
  }
  qf.exports = GC;
});
var Uf = c((_q, Vf) => {
  var XC = Gf(),
    VC = ot(),
    UC = Mt(),
    Xf = J(),
    BC = Ne();
  function HC(e, t, r, n) {
    if (!Xf(e)) return e;
    t = VC(t, e);
    for (var o = -1, i = t.length, a = i - 1, s = e; s != null && ++o < i; ) {
      var u = BC(t[o]),
        l = r;
      if (u === "__proto__" || u === "constructor" || u === "prototype")
        return e;
      if (o != a) {
        var p = s[u];
        (l = n ? n(p, u, s) : void 0),
          l === void 0 && (l = Xf(p) ? p : UC(t[o + 1]) ? [] : {});
      }
      XC(s, u, l), (s = s[u]);
    }
    return e;
  }
  Vf.exports = HC;
});
var Hf = c((Iq, Bf) => {
  var WC = Bt(),
    kC = Uf(),
    KC = ot();
  function jC(e, t, r) {
    for (var n = -1, o = t.length, i = {}; ++n < o; ) {
      var a = t[n],
        s = WC(e, a);
      r(s, a) && kC(i, KC(a, e), s);
    }
    return i;
  }
  Bf.exports = jC;
});
var kf = c((Tq, Wf) => {
  var zC = Lt(),
    YC = Pr(),
    QC = rn(),
    $C = tn(),
    ZC = Object.getOwnPropertySymbols,
    JC = ZC
      ? function (e) {
          for (var t = []; e; ) zC(t, QC(e)), (e = YC(e));
          return t;
        }
      : $C;
  Wf.exports = JC;
});
var jf = c((mq, Kf) => {
  function e0(e) {
    var t = [];
    if (e != null) for (var r in Object(e)) t.push(r);
    return t;
  }
  Kf.exports = e0;
});
var Yf = c((hq, zf) => {
  var t0 = J(),
    r0 = qt(),
    n0 = jf(),
    o0 = Object.prototype,
    i0 = o0.hasOwnProperty;
  function a0(e) {
    if (!t0(e)) return n0(e);
    var t = r0(e),
      r = [];
    for (var n in e) (n == "constructor" && (t || !i0.call(e, n))) || r.push(n);
    return r;
  }
  zf.exports = a0;
});
var $f = c((Aq, Qf) => {
  var s0 = on(),
    u0 = Yf(),
    c0 = de();
  function l0(e) {
    return c0(e) ? s0(e, !0) : u0(e);
  }
  Qf.exports = l0;
});
var Jf = c((vq, Zf) => {
  var f0 = en(),
    p0 = kf(),
    d0 = $f();
  function E0(e) {
    return f0(e, d0, p0);
  }
  Zf.exports = E0;
});
var tp = c((Sq, ep) => {
  var g0 = _n(),
    y0 = le(),
    _0 = Hf(),
    I0 = Jf();
  function T0(e, t) {
    if (e == null) return {};
    var r = g0(I0(e), function (n) {
      return [n];
    });
    return (
      (t = y0(t)),
      _0(e, r, function (n, o) {
        return t(n, o[0]);
      })
    );
  }
  ep.exports = T0;
});
var np = c((Oq, rp) => {
  var m0 = le(),
    h0 = Df(),
    A0 = tp();
  function v0(e, t) {
    return A0(e, h0(m0(t)));
  }
  rp.exports = v0;
});
var ip = c((Rq, op) => {
  var S0 = Gt(),
    O0 = Xt(),
    R0 = Ze(),
    b0 = q(),
    x0 = de(),
    C0 = Dt(),
    P0 = qt(),
    N0 = wt(),
    L0 = "[object Map]",
    D0 = "[object Set]",
    M0 = Object.prototype,
    F0 = M0.hasOwnProperty;
  function w0(e) {
    if (e == null) return !0;
    if (
      x0(e) &&
      (b0(e) ||
        typeof e == "string" ||
        typeof e.splice == "function" ||
        C0(e) ||
        N0(e) ||
        R0(e))
    )
      return !e.length;
    var t = O0(e);
    if (t == L0 || t == D0) return !e.size;
    if (P0(e)) return !S0(e).length;
    for (var r in e) if (F0.call(e, r)) return !1;
    return !0;
  }
  op.exports = w0;
});
var sp = c((bq, ap) => {
  var q0 = no(),
    G0 = Hn(),
    X0 = le();
  function V0(e, t) {
    var r = {};
    return (
      (t = X0(t, 3)),
      G0(e, function (n, o, i) {
        q0(r, o, t(n, o, i));
      }),
      r
    );
  }
  ap.exports = V0;
});
var cp = c((xq, up) => {
  function U0(e, t) {
    for (
      var r = -1, n = e == null ? 0 : e.length;
      ++r < n && t(e[r], r, e) !== !1;

    );
    return e;
  }
  up.exports = U0;
});
var fp = c((Cq, lp) => {
  var B0 = Wt();
  function H0(e) {
    return typeof e == "function" ? e : B0;
  }
  lp.exports = H0;
});
var dp = c((Pq, pp) => {
  var W0 = cp(),
    k0 = Wn(),
    K0 = fp(),
    j0 = q();
  function z0(e, t) {
    var r = j0(e) ? W0 : k0;
    return r(e, K0(t));
  }
  pp.exports = z0;
});
var gp = c((Nq, Ep) => {
  var Y0 = j(),
    Q0 = function () {
      return Y0.Date.now();
    };
  Ep.exports = Q0;
});
var Ip = c((Lq, _p) => {
  var $0 = J(),
    oo = gp(),
    yp = kt(),
    Z0 = "Expected a function",
    J0 = Math.max,
    eP = Math.min;
  function tP(e, t, r) {
    var n,
      o,
      i,
      a,
      s,
      u,
      l = 0,
      p = !1,
      d = !1,
      f = !0;
    if (typeof e != "function") throw new TypeError(Z0);
    (t = yp(t) || 0),
      $0(r) &&
        ((p = !!r.leading),
        (d = "maxWait" in r),
        (i = d ? J0(yp(r.maxWait) || 0, t) : i),
        (f = "trailing" in r ? !!r.trailing : f));
    function y(T) {
      var R = n,
        v = o;
      return (n = o = void 0), (l = T), (a = e.apply(v, R)), a;
    }
    function _(T) {
      return (l = T), (s = setTimeout(g, t)), p ? y(T) : a;
    }
    function E(T) {
      var R = T - u,
        v = T - l,
        S = t - R;
      return d ? eP(S, i - v) : S;
    }
    function I(T) {
      var R = T - u,
        v = T - l;
      return u === void 0 || R >= t || R < 0 || (d && v >= i);
    }
    function g() {
      var T = oo();
      if (I(T)) return m(T);
      s = setTimeout(g, E(T));
    }
    function m(T) {
      return (s = void 0), f && n ? y(T) : ((n = o = void 0), a);
    }
    function A() {
      s !== void 0 && clearTimeout(s), (l = 0), (n = u = o = s = void 0);
    }
    function h() {
      return s === void 0 ? a : m(oo());
    }
    function O() {
      var T = oo(),
        R = I(T);
      if (((n = arguments), (o = this), (u = T), R)) {
        if (s === void 0) return _(u);
        if (d) return clearTimeout(s), (s = setTimeout(g, t)), y(u);
      }
      return s === void 0 && (s = setTimeout(g, t)), a;
    }
    return (O.cancel = A), (O.flush = h), O;
  }
  _p.exports = tP;
});
var mp = c((Dq, Tp) => {
  var rP = Ip(),
    nP = J(),
    oP = "Expected a function";
  function iP(e, t, r) {
    var n = !0,
      o = !0;
    if (typeof e != "function") throw new TypeError(oP);
    return (
      nP(r) &&
        ((n = "leading" in r ? !!r.leading : n),
        (o = "trailing" in r ? !!r.trailing : o)),
      rP(e, t, { leading: n, maxWait: t, trailing: o })
    );
  }
  Tp.exports = iP;
});
var Ap = {};
U(Ap, {
  actionListPlaybackChanged: () => He,
  animationFrameChanged: () => sr,
  clearRequested: () => PP,
  elementStateChanged: () => po,
  eventListenerAdded: () => ar,
  eventStateChanged: () => co,
  instanceAdded: () => lo,
  instanceRemoved: () => fo,
  instanceStarted: () => ur,
  mediaQueriesDefined: () => go,
  parameterChanged: () => Be,
  playbackRequested: () => xP,
  previewRequested: () => bP,
  rawDataImported: () => io,
  sessionInitialized: () => ao,
  sessionStarted: () => so,
  sessionStopped: () => uo,
  stopRequested: () => CP,
  testFrameRendered: () => NP,
  viewportWidthChanged: () => Eo,
});
var hp,
  aP,
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
  mP,
  hP,
  AP,
  vP,
  SP,
  OP,
  RP,
  io,
  ao,
  so,
  uo,
  bP,
  xP,
  CP,
  PP,
  ar,
  NP,
  co,
  sr,
  Be,
  lo,
  ur,
  fo,
  po,
  He,
  Eo,
  go,
  cr = D(() => {
    "use strict";
    H();
    (hp = C(Ie())),
      ({
        IX2_RAW_DATA_IMPORTED: aP,
        IX2_SESSION_INITIALIZED: sP,
        IX2_SESSION_STARTED: uP,
        IX2_SESSION_STOPPED: cP,
        IX2_PREVIEW_REQUESTED: lP,
        IX2_PLAYBACK_REQUESTED: fP,
        IX2_STOP_REQUESTED: pP,
        IX2_CLEAR_REQUESTED: dP,
        IX2_EVENT_LISTENER_ADDED: EP,
        IX2_TEST_FRAME_RENDERED: gP,
        IX2_EVENT_STATE_CHANGED: yP,
        IX2_ANIMATION_FRAME_CHANGED: _P,
        IX2_PARAMETER_CHANGED: IP,
        IX2_INSTANCE_ADDED: TP,
        IX2_INSTANCE_STARTED: mP,
        IX2_INSTANCE_REMOVED: hP,
        IX2_ELEMENT_STATE_CHANGED: AP,
        IX2_ACTION_LIST_PLAYBACK_CHANGED: vP,
        IX2_VIEWPORT_WIDTH_CHANGED: SP,
        IX2_MEDIA_QUERIES_DEFINED: OP,
      } = w),
      ({ reifyState: RP } = hp.IX2VanillaUtils),
      (io = (e) => ({ type: aP, payload: { ...RP(e) } })),
      (ao = ({ hasBoundaryNodes: e, reducedMotion: t }) => ({
        type: sP,
        payload: { hasBoundaryNodes: e, reducedMotion: t },
      })),
      (so = () => ({ type: uP })),
      (uo = () => ({ type: cP })),
      (bP = ({ rawData: e, defer: t }) => ({
        type: lP,
        payload: { defer: t, rawData: e },
      })),
      (xP = ({
        actionTypeId: e = B.GENERAL_START_ACTION,
        actionListId: t,
        actionItemId: r,
        eventId: n,
        allowEvents: o,
        immediate: i,
        testManual: a,
        verbose: s,
        rawData: u,
      }) => ({
        type: fP,
        payload: {
          actionTypeId: e,
          actionListId: t,
          actionItemId: r,
          testManual: a,
          eventId: n,
          allowEvents: o,
          immediate: i,
          verbose: s,
          rawData: u,
        },
      })),
      (CP = (e) => ({ type: pP, payload: { actionListId: e } })),
      (PP = () => ({ type: dP })),
      (ar = (e, t) => ({
        type: EP,
        payload: { target: e, listenerParams: t },
      })),
      (NP = (e = 1) => ({ type: gP, payload: { step: e } })),
      (co = (e, t) => ({ type: yP, payload: { stateKey: e, newState: t } })),
      (sr = (e, t) => ({ type: _P, payload: { now: e, parameters: t } })),
      (Be = (e, t) => ({ type: IP, payload: { key: e, value: t } })),
      (lo = (e) => ({ type: TP, payload: { ...e } })),
      (ur = (e, t) => ({ type: mP, payload: { instanceId: e, time: t } })),
      (fo = (e) => ({ type: hP, payload: { instanceId: e } })),
      (po = (e, t, r, n) => ({
        type: AP,
        payload: { elementId: e, actionTypeId: t, current: r, actionItem: n },
      })),
      (He = ({ actionListId: e, isPlaying: t }) => ({
        type: vP,
        payload: { actionListId: e, isPlaying: t },
      })),
      (Eo = ({ width: e, mediaQueries: t }) => ({
        type: SP,
        payload: { width: e, mediaQueries: t },
      })),
      (go = () => ({ type: OP }));
  });
var V = {};
U(V, {
  elementContains: () => Io,
  getChildElements: () => UP,
  getClosestElement: () => gt,
  getProperty: () => wP,
  getQuerySelector: () => _o,
  getRefType: () => To,
  getSiblingElements: () => BP,
  getStyle: () => FP,
  getValidDocument: () => GP,
  isSiblingNode: () => VP,
  matchSelector: () => qP,
  queryDocument: () => XP,
  setStyle: () => MP,
});
function MP(e, t, r) {
  e.style[t] = r;
}
function FP(e, t) {
  return t.startsWith("--")
    ? window.getComputedStyle(document.documentElement).getPropertyValue(t)
    : e.style[t];
}
function wP(e, t) {
  return e[t];
}
function qP(e) {
  return (t) => t[yo](e);
}
function _o({ id: e, selector: t }) {
  if (e) {
    let r = e;
    if (e.indexOf(vp) !== -1) {
      let n = e.split(vp),
        o = n[0];
      if (((r = n[1]), o !== document.documentElement.getAttribute(Op)))
        return null;
    }
    return `[data-w-id="${r}"], [data-w-id^="${r}_instance"]`;
  }
  return t;
}
function GP(e) {
  return e == null || e === document.documentElement.getAttribute(Op)
    ? document
    : null;
}
function XP(e, t) {
  return Array.prototype.slice.call(
    document.querySelectorAll(t ? e + " " + t : e)
  );
}
function Io(e, t) {
  return e.contains(t);
}
function VP(e, t) {
  return e !== t && e.parentNode === t.parentNode;
}
function UP(e) {
  let t = [];
  for (let r = 0, { length: n } = e || []; r < n; r++) {
    let { children: o } = e[r],
      { length: i } = o;
    if (i) for (let a = 0; a < i; a++) t.push(o[a]);
  }
  return t;
}
function BP(e = []) {
  let t = [],
    r = [];
  for (let n = 0, { length: o } = e; n < o; n++) {
    let { parentNode: i } = e[n];
    if (!i || !i.children || !i.children.length || r.indexOf(i) !== -1)
      continue;
    r.push(i);
    let a = i.firstElementChild;
    for (; a != null; )
      e.indexOf(a) === -1 && t.push(a), (a = a.nextElementSibling);
  }
  return t;
}
function To(e) {
  return e != null && typeof e == "object"
    ? e instanceof Element
      ? LP
      : DP
    : null;
}
var Sp,
  yo,
  vp,
  LP,
  DP,
  Op,
  gt,
  Rp = D(() => {
    "use strict";
    Sp = C(Ie());
    H();
    ({ ELEMENT_MATCHES: yo } = Sp.IX2BrowserSupport),
      ({
        IX2_ID_DELIMITER: vp,
        HTML_ELEMENT: LP,
        PLAIN_OBJECT: DP,
        WF_PAGE: Op,
      } = G);
    gt = Element.prototype.closest
      ? (e, t) => (document.documentElement.contains(e) ? e.closest(t) : null)
      : (e, t) => {
          if (!document.documentElement.contains(e)) return null;
          let r = e;
          do {
            if (r[yo] && r[yo](t)) return r;
            r = r.parentNode;
          } while (r != null);
          return null;
        };
  });
var mo = c((wq, xp) => {
  var HP = J(),
    bp = Object.create,
    WP = (function () {
      function e() {}
      return function (t) {
        if (!HP(t)) return {};
        if (bp) return bp(t);
        e.prototype = t;
        var r = new e();
        return (e.prototype = void 0), r;
      };
    })();
  xp.exports = WP;
});
var lr = c((qq, Cp) => {
  function kP() {}
  Cp.exports = kP;
});
var pr = c((Gq, Pp) => {
  var KP = mo(),
    jP = lr();
  function fr(e, t) {
    (this.__wrapped__ = e),
      (this.__actions__ = []),
      (this.__chain__ = !!t),
      (this.__index__ = 0),
      (this.__values__ = void 0);
  }
  fr.prototype = KP(jP.prototype);
  fr.prototype.constructor = fr;
  Pp.exports = fr;
});
var Mp = c((Xq, Dp) => {
  var Np = me(),
    zP = Ze(),
    YP = q(),
    Lp = Np ? Np.isConcatSpreadable : void 0;
  function QP(e) {
    return YP(e) || zP(e) || !!(Lp && e && e[Lp]);
  }
  Dp.exports = QP;
});
var qp = c((Vq, wp) => {
  var $P = Lt(),
    ZP = Mp();
  function Fp(e, t, r, n, o) {
    var i = -1,
      a = e.length;
    for (r || (r = ZP), o || (o = []); ++i < a; ) {
      var s = e[i];
      t > 0 && r(s)
        ? t > 1
          ? Fp(s, t - 1, r, n, o)
          : $P(o, s)
        : n || (o[o.length] = s);
    }
    return o;
  }
  wp.exports = Fp;
});
var Xp = c((Uq, Gp) => {
  var JP = qp();
  function eN(e) {
    var t = e == null ? 0 : e.length;
    return t ? JP(e, 1) : [];
  }
  Gp.exports = eN;
});
var Up = c((Bq, Vp) => {
  function tN(e, t, r) {
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
  Vp.exports = tN;
});
var Wp = c((Hq, Hp) => {
  var rN = Up(),
    Bp = Math.max;
  function nN(e, t, r) {
    return (
      (t = Bp(t === void 0 ? e.length - 1 : t, 0)),
      function () {
        for (
          var n = arguments, o = -1, i = Bp(n.length - t, 0), a = Array(i);
          ++o < i;

        )
          a[o] = n[t + o];
        o = -1;
        for (var s = Array(t + 1); ++o < t; ) s[o] = n[o];
        return (s[t] = r(a)), rN(e, this, s);
      }
    );
  }
  Hp.exports = nN;
});
var Kp = c((Wq, kp) => {
  function oN(e) {
    return function () {
      return e;
    };
  }
  kp.exports = oN;
});
var Yp = c((kq, zp) => {
  var iN = Kp(),
    jp = ro(),
    aN = Wt(),
    sN = jp
      ? function (e, t) {
          return jp(e, "toString", {
            configurable: !0,
            enumerable: !1,
            value: iN(t),
            writable: !0,
          });
        }
      : aN;
  zp.exports = sN;
});
var $p = c((Kq, Qp) => {
  var uN = 800,
    cN = 16,
    lN = Date.now;
  function fN(e) {
    var t = 0,
      r = 0;
    return function () {
      var n = lN(),
        o = cN - (n - r);
      if (((r = n), o > 0)) {
        if (++t >= uN) return arguments[0];
      } else t = 0;
      return e.apply(void 0, arguments);
    };
  }
  Qp.exports = fN;
});
var Jp = c((jq, Zp) => {
  var pN = Yp(),
    dN = $p(),
    EN = dN(pN);
  Zp.exports = EN;
});
var td = c((zq, ed) => {
  var gN = Xp(),
    yN = Wp(),
    _N = Jp();
  function IN(e) {
    return _N(yN(e, void 0, gN), e + "");
  }
  ed.exports = IN;
});
var od = c((Yq, nd) => {
  var rd = an(),
    TN = rd && new rd();
  nd.exports = TN;
});
var ad = c((Qq, id) => {
  function mN() {}
  id.exports = mN;
});
var ho = c(($q, ud) => {
  var sd = od(),
    hN = ad(),
    AN = sd
      ? function (e) {
          return sd.get(e);
        }
      : hN;
  ud.exports = AN;
});
var ld = c((Zq, cd) => {
  var vN = {};
  cd.exports = vN;
});
var Ao = c((Jq, pd) => {
  var fd = ld(),
    SN = Object.prototype,
    ON = SN.hasOwnProperty;
  function RN(e) {
    for (
      var t = e.name + "", r = fd[t], n = ON.call(fd, t) ? r.length : 0;
      n--;

    ) {
      var o = r[n],
        i = o.func;
      if (i == null || i == e) return o.name;
    }
    return t;
  }
  pd.exports = RN;
});
var Er = c((e2, dd) => {
  var bN = mo(),
    xN = lr(),
    CN = 4294967295;
  function dr(e) {
    (this.__wrapped__ = e),
      (this.__actions__ = []),
      (this.__dir__ = 1),
      (this.__filtered__ = !1),
      (this.__iteratees__ = []),
      (this.__takeCount__ = CN),
      (this.__views__ = []);
  }
  dr.prototype = bN(xN.prototype);
  dr.prototype.constructor = dr;
  dd.exports = dr;
});
var gd = c((t2, Ed) => {
  function PN(e, t) {
    var r = -1,
      n = e.length;
    for (t || (t = Array(n)); ++r < n; ) t[r] = e[r];
    return t;
  }
  Ed.exports = PN;
});
var _d = c((r2, yd) => {
  var NN = Er(),
    LN = pr(),
    DN = gd();
  function MN(e) {
    if (e instanceof NN) return e.clone();
    var t = new LN(e.__wrapped__, e.__chain__);
    return (
      (t.__actions__ = DN(e.__actions__)),
      (t.__index__ = e.__index__),
      (t.__values__ = e.__values__),
      t
    );
  }
  yd.exports = MN;
});
var md = c((n2, Td) => {
  var FN = Er(),
    Id = pr(),
    wN = lr(),
    qN = q(),
    GN = ne(),
    XN = _d(),
    VN = Object.prototype,
    UN = VN.hasOwnProperty;
  function gr(e) {
    if (GN(e) && !qN(e) && !(e instanceof FN)) {
      if (e instanceof Id) return e;
      if (UN.call(e, "__wrapped__")) return XN(e);
    }
    return new Id(e);
  }
  gr.prototype = wN.prototype;
  gr.prototype.constructor = gr;
  Td.exports = gr;
});
var Ad = c((o2, hd) => {
  var BN = Er(),
    HN = ho(),
    WN = Ao(),
    kN = md();
  function KN(e) {
    var t = WN(e),
      r = kN[t];
    if (typeof r != "function" || !(t in BN.prototype)) return !1;
    if (e === r) return !0;
    var n = HN(r);
    return !!n && e === n[0];
  }
  hd.exports = KN;
});
var Rd = c((i2, Od) => {
  var vd = pr(),
    jN = td(),
    zN = ho(),
    vo = Ao(),
    YN = q(),
    Sd = Ad(),
    QN = "Expected a function",
    $N = 8,
    ZN = 32,
    JN = 128,
    eL = 256;
  function tL(e) {
    return jN(function (t) {
      var r = t.length,
        n = r,
        o = vd.prototype.thru;
      for (e && t.reverse(); n--; ) {
        var i = t[n];
        if (typeof i != "function") throw new TypeError(QN);
        if (o && !a && vo(i) == "wrapper") var a = new vd([], !0);
      }
      for (n = a ? n : r; ++n < r; ) {
        i = t[n];
        var s = vo(i),
          u = s == "wrapper" ? zN(i) : void 0;
        u &&
        Sd(u[0]) &&
        u[1] == (JN | $N | ZN | eL) &&
        !u[4].length &&
        u[9] == 1
          ? (a = a[vo(u[0])].apply(a, u[3]))
          : (a = i.length == 1 && Sd(i) ? a[s]() : a.thru(i));
      }
      return function () {
        var l = arguments,
          p = l[0];
        if (a && l.length == 1 && YN(p)) return a.plant(p).value();
        for (var d = 0, f = r ? t[d].apply(this, l) : p; ++d < r; )
          f = t[d].call(this, f);
        return f;
      };
    });
  }
  Od.exports = tL;
});
var xd = c((a2, bd) => {
  var rL = Rd(),
    nL = rL();
  bd.exports = nL;
});
var Pd = c((s2, Cd) => {
  function oL(e, t, r) {
    return (
      e === e &&
        (r !== void 0 && (e = e <= r ? e : r),
        t !== void 0 && (e = e >= t ? e : t)),
      e
    );
  }
  Cd.exports = oL;
});
var Ld = c((u2, Nd) => {
  var iL = Pd(),
    So = kt();
  function aL(e, t, r) {
    return (
      r === void 0 && ((r = t), (t = void 0)),
      r !== void 0 && ((r = So(r)), (r = r === r ? r : 0)),
      t !== void 0 && ((t = So(t)), (t = t === t ? t : 0)),
      iL(So(e), t, r)
    );
  }
  Nd.exports = aL;
});
var Ud,
  Bd,
  Hd,
  Wd,
  sL,
  uL,
  cL,
  lL,
  fL,
  pL,
  dL,
  EL,
  gL,
  yL,
  _L,
  IL,
  TL,
  mL,
  hL,
  kd,
  Kd,
  AL,
  vL,
  SL,
  jd,
  OL,
  RL,
  zd,
  bL,
  Oo,
  Yd,
  Dd,
  Md,
  Qd,
  _t,
  xL,
  re,
  $d,
  CL,
  k,
  Q,
  It,
  Zd,
  Ro,
  Fd,
  bo,
  PL,
  yt,
  NL,
  LL,
  DL,
  Jd,
  wd,
  ML,
  qd,
  FL,
  wL,
  qL,
  Gd,
  yr,
  _r,
  Xd,
  Vd,
  eE,
  tE = D(() => {
    "use strict";
    (Ud = C(xd())), (Bd = C(Ht())), (Hd = C(Ld()));
    H();
    xo();
    cr();
    (Wd = C(Ie())),
      ({
        MOUSE_CLICK: sL,
        MOUSE_SECOND_CLICK: uL,
        MOUSE_DOWN: cL,
        MOUSE_UP: lL,
        MOUSE_OVER: fL,
        MOUSE_OUT: pL,
        DROPDOWN_CLOSE: dL,
        DROPDOWN_OPEN: EL,
        SLIDER_ACTIVE: gL,
        SLIDER_INACTIVE: yL,
        TAB_ACTIVE: _L,
        TAB_INACTIVE: IL,
        NAVBAR_CLOSE: TL,
        NAVBAR_OPEN: mL,
        MOUSE_MOVE: hL,
        PAGE_SCROLL_DOWN: kd,
        SCROLL_INTO_VIEW: Kd,
        SCROLL_OUT_OF_VIEW: AL,
        PAGE_SCROLL_UP: vL,
        SCROLLING_IN_VIEW: SL,
        PAGE_FINISH: jd,
        ECOMMERCE_CART_CLOSE: OL,
        ECOMMERCE_CART_OPEN: RL,
        PAGE_START: zd,
        PAGE_SCROLL: bL,
      } = z),
      (Oo = "COMPONENT_ACTIVE"),
      (Yd = "COMPONENT_INACTIVE"),
      ({ COLON_DELIMITER: Dd } = G),
      ({ getNamespacedParameterId: Md } = Wd.IX2VanillaUtils),
      (Qd = (e) => (t) => typeof t == "object" && e(t) ? !0 : t),
      (_t = Qd(({ element: e, nativeEvent: t }) => e === t.target)),
      (xL = Qd(({ element: e, nativeEvent: t }) => e.contains(t.target))),
      (re = (0, Ud.default)([_t, xL])),
      ($d = (e, t) => {
        if (t) {
          let { ixData: r } = e.getState(),
            { events: n } = r,
            o = n[t];
          if (o && !PL[o.eventTypeId]) return o;
        }
        return null;
      }),
      (CL = ({ store: e, event: t }) => {
        let { action: r } = t,
          { autoStopEventId: n } = r.config;
        return !!$d(e, n);
      }),
      (k = ({ store: e, event: t, element: r, eventStateKey: n }, o) => {
        let { action: i, id: a } = t,
          { actionListId: s, autoStopEventId: u } = i.config,
          l = $d(e, u);
        return (
          l &&
            We({
              store: e,
              eventId: u,
              eventTarget: r,
              eventStateKey: u + Dd + n.split(Dd)[1],
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
          o
        );
      }),
      (Q = (e, t) => (r, n) => e(r, n) === !0 ? t(r, n) : n),
      (It = { handler: Q(re, k) }),
      (Zd = { ...It, types: [Oo, Yd].join(" ") }),
      (Ro = [
        { target: window, types: "resize orientationchange", throttle: !0 },
        {
          target: document,
          types: "scroll wheel readystatechange IX2_PAGE_UPDATE",
          throttle: !0,
        },
      ]),
      (Fd = "mouseover mouseout"),
      (bo = { types: Ro }),
      (PL = { PAGE_START: zd, PAGE_FINISH: jd }),
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
      (NL = (e, t) =>
        !(
          e.left > t.right ||
          e.right < t.left ||
          e.top > t.bottom ||
          e.bottom < t.top
        )),
      (LL = ({ element: e, nativeEvent: t }) => {
        let { type: r, target: n, relatedTarget: o } = t,
          i = e.contains(n);
        if (r === "mouseover" && i) return !0;
        let a = e.contains(o);
        return !!(r === "mouseout" && i && a);
      }),
      (DL = (e) => {
        let {
            element: t,
            event: { config: r },
          } = e,
          { clientWidth: n, clientHeight: o } = yt(),
          i = r.scrollOffsetValue,
          u = r.scrollOffsetUnit === "PX" ? i : (o * (i || 0)) / 100;
        return NL(t.getBoundingClientRect(), {
          left: 0,
          top: u,
          right: n,
          bottom: o - u,
        });
      }),
      (Jd = (e) => (t, r) => {
        let { type: n } = t.nativeEvent,
          o = [Oo, Yd].indexOf(n) !== -1 ? n === Oo : r.isActive,
          i = { ...r, isActive: o };
        return ((!r || i.isActive !== r.isActive) && e(t, i)) || i;
      }),
      (wd = (e) => (t, r) => {
        let n = { elementHovered: LL(t) };
        return (
          ((r ? n.elementHovered !== r.elementHovered : n.elementHovered) &&
            e(t, n)) ||
          n
        );
      }),
      (ML = (e) => (t, r) => {
        let n = { ...r, elementVisible: DL(t) };
        return (
          ((r ? n.elementVisible !== r.elementVisible : n.elementVisible) &&
            e(t, n)) ||
          n
        );
      }),
      (qd =
        (e) =>
        (t, r = {}) => {
          let { stiffScrollTop: n, scrollHeight: o, innerHeight: i } = yt(),
            {
              event: { config: a, eventTypeId: s },
            } = t,
            { scrollOffsetValue: u, scrollOffsetUnit: l } = a,
            p = l === "PX",
            d = o - i,
            f = Number((n / d).toFixed(2));
          if (r && r.percentTop === f) return r;
          let y = (p ? u : (i * (u || 0)) / 100) / d,
            _,
            E,
            I = 0;
          r &&
            ((_ = f > r.percentTop),
            (E = r.scrollingDown !== _),
            (I = E ? f : r.anchorTop));
          let g = s === kd ? f >= I + y : f <= I - y,
            m = {
              ...r,
              percentTop: f,
              inBounds: g,
              anchorTop: I,
              scrollingDown: _,
            };
          return (r && g && (E || m.inBounds !== r.inBounds) && e(t, m)) || m;
        }),
      (FL = (e, t) =>
        e.left > t.left &&
        e.left < t.right &&
        e.top > t.top &&
        e.top < t.bottom),
      (wL = (e) => (t, r) => {
        let n = { finished: document.readyState === "complete" };
        return n.finished && !(r && r.finshed) && e(t), n;
      }),
      (qL = (e) => (t, r) => {
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
      (Xd = {
        ...bo,
        handler: ML((e, t) => {
          let { elementVisible: r } = t,
            { event: n, store: o } = e,
            { ixData: i } = o.getState(),
            { events: a } = i;
          return !a[n.action.config.autoStopEventId] && t.triggered
            ? t
            : (n.eventTypeId === Kd) === r
            ? (k(e), { ...t, triggered: !0 })
            : t;
        }),
      }),
      (Vd = 0.05),
      (eE = {
        [gL]: yr(),
        [yL]: _r(),
        [EL]: yr(),
        [dL]: _r(),
        [mL]: yr(!1),
        [TL]: _r(!1),
        [_L]: yr(),
        [IL]: _r(),
        [RL]: { types: "ecommerce-cart-open", handler: Q(re, k) },
        [OL]: { types: "ecommerce-cart-close", handler: Q(re, k) },
        [sL]: {
          types: "click",
          handler: Q(
            re,
            Gd((e, { clickCount: t }) => {
              CL(e) ? t === 1 && k(e) : k(e);
            })
          ),
        },
        [uL]: {
          types: "click",
          handler: Q(
            re,
            Gd((e, { clickCount: t }) => {
              t === 2 && k(e);
            })
          ),
        },
        [cL]: { ...It, types: "mousedown" },
        [lL]: { ...It, types: "mouseup" },
        [fL]: {
          types: Fd,
          handler: Q(
            re,
            wd((e, t) => {
              t.elementHovered && k(e);
            })
          ),
        },
        [pL]: {
          types: Fd,
          handler: Q(
            re,
            wd((e, t) => {
              t.elementHovered || k(e);
            })
          ),
        },
        [hL]: {
          types: "mousemove mouseout scroll",
          handler: (
            {
              store: e,
              element: t,
              eventConfig: r,
              nativeEvent: n,
              eventStateKey: o,
            },
            i = { clientX: 0, clientY: 0, pageX: 0, pageY: 0 }
          ) => {
            let {
                basedOn: a,
                selectedAxis: s,
                continuousParameterGroupId: u,
                reverse: l,
                restingState: p = 0,
              } = r,
              {
                clientX: d = i.clientX,
                clientY: f = i.clientY,
                pageX: y = i.pageX,
                pageY: _ = i.pageY,
              } = n,
              E = s === "X_AXIS",
              I = n.type === "mouseout",
              g = p / 100,
              m = u,
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
                  scrollLeft: h,
                  scrollTop: O,
                  scrollWidth: T,
                  scrollHeight: R,
                } = yt();
                g = E ? Math.min(h + y, T) / T : Math.min(O + _, R) / R;
                break;
              }
              case Z.ELEMENT:
              default: {
                m = Md(o, u);
                let h = n.type.indexOf("mouse") === 0;
                if (h && re({ element: t, nativeEvent: n }) !== !0) break;
                let O = t.getBoundingClientRect(),
                  { left: T, top: R, width: v, height: S } = O;
                if (!h && !FL({ left: d, top: f }, O)) break;
                (A = !0), (g = E ? (d - T) / v : (f - R) / S);
                break;
              }
            }
            return (
              I && (g > 1 - Vd || g < Vd) && (g = Math.round(g)),
              (a !== Z.ELEMENT || A || A !== i.elementHovered) &&
                ((g = l ? 1 - g : g), e.dispatch(Be(m, g))),
              { elementHovered: A, clientX: d, clientY: f, pageX: y, pageY: _ }
            );
          },
        },
        [bL]: {
          types: Ro,
          handler: ({ store: e, eventConfig: t }) => {
            let { continuousParameterGroupId: r, reverse: n } = t,
              { scrollTop: o, scrollHeight: i, clientHeight: a } = yt(),
              s = o / (i - a);
            (s = n ? 1 - s : s), e.dispatch(Be(r, s));
          },
        },
        [SL]: {
          types: Ro,
          handler: (
            { element: e, store: t, eventConfig: r, eventStateKey: n },
            o = { scrollPercent: 0 }
          ) => {
            let {
                scrollLeft: i,
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
                endOffsetValue: m = 0,
              } = r,
              A = d === "X_AXIS";
            if (p === Z.VIEWPORT) {
              let h = A ? i / s : a / u;
              return (
                h !== o.scrollPercent && t.dispatch(Be(f, h)),
                { scrollPercent: h }
              );
            } else {
              let h = Md(n, f),
                O = e.getBoundingClientRect(),
                T = (I ? g : 0) / 100,
                R = (E ? m : 0) / 100;
              (T = y ? T : 1 - T), (R = _ ? R : 1 - R);
              let v = O.top + Math.min(O.height * T, l),
                b = O.top + O.height * R - v,
                x = Math.min(l + b, u),
                N = Math.min(Math.max(0, l - v), x) / x;
              return (
                N !== o.scrollPercent && t.dispatch(Be(h, N)),
                { scrollPercent: N }
              );
            }
          },
        },
        [Kd]: Xd,
        [AL]: Xd,
        [kd]: {
          ...bo,
          handler: qd((e, t) => {
            t.scrollingDown && k(e);
          }),
        },
        [vL]: {
          ...bo,
          handler: qd((e, t) => {
            t.scrollingDown || k(e);
          }),
        },
        [jd]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: Q(_t, wL(k)),
        },
        [zd]: {
          types: "readystatechange IX2_PAGE_UPDATE",
          handler: Q(_t, qL(k)),
        },
      });
  });
var IE = {};
U(IE, {
  observeRequests: () => nD,
  startActionGroup: () => Tt,
  startEngine: () => vr,
  stopActionGroup: () => We,
  stopAllActionGroups: () => gE,
  stopEngine: () => Sr,
});
function nD(e) {
  Te({ store: e, select: ({ ixRequest: t }) => t.preview, onChange: aD }),
    Te({ store: e, select: ({ ixRequest: t }) => t.playback, onChange: sD }),
    Te({ store: e, select: ({ ixRequest: t }) => t.stop, onChange: uD }),
    Te({ store: e, select: ({ ixRequest: t }) => t.clear, onChange: cD });
}
function oD(e) {
  Te({
    store: e,
    select: ({ ixSession: t }) => t.mediaQueryKey,
    onChange: () => {
      Sr(e),
        fE({ store: e, elementApi: V }),
        vr({ store: e, allowEvents: !0 }),
        pE();
    },
  });
}
function iD(e, t) {
  let r = Te({
    store: e,
    select: ({ ixSession: n }) => n.tick,
    onChange: (n) => {
      t(n), r();
    },
  });
}
function aD({ rawData: e, defer: t }, r) {
  let n = () => {
    vr({ store: r, rawData: e, allowEvents: !0 }), pE();
  };
  t ? setTimeout(n, 0) : n();
}
function pE() {
  document.dispatchEvent(new CustomEvent("IX2_PAGE_UPDATE"));
}
function sD(e, t) {
  let {
      actionTypeId: r,
      actionListId: n,
      actionItemId: o,
      eventId: i,
      allowEvents: a,
      immediate: s,
      testManual: u,
      verbose: l = !0,
    } = e,
    { rawData: p } = e;
  if (n && o && p && s) {
    let d = p.actionLists[n];
    d && (p = KL({ actionList: d, actionItemId: o, rawData: p }));
  }
  if (
    (vr({ store: t, rawData: p, allowEvents: a, testManual: u }),
    (n && r === B.GENERAL_START_ACTION) || Co(r))
  ) {
    We({ store: t, actionListId: n }),
      EE({ store: t, actionListId: n, eventId: i });
    let d = Tt({
      store: t,
      eventId: i,
      actionListId: n,
      immediate: s,
      verbose: l,
    });
    l && d && t.dispatch(He({ actionListId: n, isPlaying: !s }));
  }
}
function uD({ actionListId: e }, t) {
  e ? We({ store: t, actionListId: e }) : gE({ store: t }), Sr(t);
}
function cD(e, t) {
  Sr(t), fE({ store: t, elementApi: V });
}
function vr({ store: e, rawData: t, allowEvents: r, testManual: n }) {
  let { ixSession: o } = e.getState();
  t && e.dispatch(io(t)),
    o.active ||
      (e.dispatch(
        ao({
          hasBoundaryNodes: !!document.querySelector(Tr),
          reducedMotion:
            document.body.hasAttribute("data-wf-ix-vacation") &&
            window.matchMedia("(prefers-reduced-motion)").matches,
        })
      ),
      r &&
        (gD(e), lD(), e.getState().ixSession.hasDefinedMediaQueries && oD(e)),
      e.dispatch(so()),
      fD(e, n));
}
function lD() {
  let { documentElement: e } = document;
  e.className.indexOf(rE) === -1 && (e.className += ` ${rE}`);
}
function fD(e, t) {
  let r = (n) => {
    let { ixSession: o, ixParameters: i } = e.getState();
    o.active && (e.dispatch(sr(n, i)), t ? iD(e, r) : requestAnimationFrame(r));
  };
  r(window.performance.now());
}
function Sr(e) {
  let { ixSession: t } = e.getState();
  if (t.active) {
    let { eventListeners: r } = t;
    r.forEach(pD), QL(), e.dispatch(uo());
  }
}
function pD({ target: e, listenerParams: t }) {
  e.removeEventListener.apply(e, t);
}
function dD({
  store: e,
  eventStateKey: t,
  eventTarget: r,
  eventId: n,
  eventConfig: o,
  actionListId: i,
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
    { id: m } = a;
  jL(y, o) && (m = zL(t, m));
  let A = p.hasBoundaryNodes && r ? gt(r, Tr) : null;
  g.forEach((h) => {
    let { keyframe: O, actionItems: T } = h;
    T.forEach((R) => {
      let { actionTypeId: v } = R,
        { target: S } = R.config;
      if (!S) return;
      let b = S.boundaryMode ? A : null,
        x = $L(S) + Po + v;
      if (((E[x] = ED(E[x], O, R)), !_[x])) {
        _[x] = !0;
        let { config: P } = R;
        mr({
          config: P,
          event: f,
          eventTarget: r,
          elementRoot: b,
          elementApi: V,
        }).forEach((N) => {
          I.push({ element: N, key: x });
        });
      }
    });
  }),
    I.forEach(({ element: h, key: O }) => {
      let T = E[O],
        R = (0, se.default)(T, "[0].actionItems[0]", {}),
        { actionTypeId: v } = R,
        S = Ar(v) ? Lo(v)(h, R) : null,
        b = No({ element: h, actionItem: R, elementApi: V }, S);
      Do({
        store: e,
        element: h,
        eventId: n,
        actionListId: i,
        actionItem: R,
        destination: b,
        continuous: !0,
        parameterId: m,
        actionGroups: T,
        smoothing: s,
        restingValue: u,
        pluginInstance: S,
      });
    });
}
function ED(e = [], t, r) {
  let n = [...e],
    o;
  return (
    n.some((i, a) => (i.keyframe === t ? ((o = a), !0) : !1)),
    o == null && ((o = n.length), n.push({ keyframe: t, actionItems: [] })),
    n[o].actionItems.push(r),
    n
  );
}
function gD(e) {
  let { ixData: t } = e.getState(),
    { eventTypeMap: r } = t;
  dE(e),
    (0, ke.default)(r, (o, i) => {
      let a = eE[i];
      if (!a) {
        console.warn(`IX2 event type not configured: ${i}`);
        return;
      }
      hD({ logic: a, store: e, events: o });
    });
  let { ixSession: n } = e.getState();
  n.eventListeners.length && _D(e);
}
function _D(e) {
  let t = () => {
    dE(e);
  };
  yD.forEach((r) => {
    window.addEventListener(r, t), e.dispatch(ar(window, [r, t]));
  }),
    t();
}
function dE(e) {
  let { ixSession: t, ixData: r } = e.getState(),
    n = window.innerWidth;
  if (n !== t.viewportWidth) {
    let { mediaQueries: o } = r;
    e.dispatch(Eo({ width: n, mediaQueries: o }));
  }
}
function hD({ logic: e, store: t, events: r }) {
  AD(r);
  let { types: n, handler: o } = e,
    { ixData: i } = t.getState(),
    { actionLists: a } = i,
    s = ID(r, mD);
  if (!(0, iE.default)(s)) return;
  (0, ke.default)(s, (d, f) => {
    let y = r[f],
      { action: _, id: E, mediaQueries: I = i.mediaQueryKeys } = y,
      { actionListId: g } = _.config;
    ZL(I, i.mediaQueryKeys) || t.dispatch(go()),
      _.actionTypeId === B.GENERAL_CONTINUOUS_ACTION &&
        (Array.isArray(y.config) ? y.config : [y.config]).forEach((A) => {
          let { continuousParameterGroupId: h } = A,
            O = (0, se.default)(a, `${g}.continuousParameterGroups`, []),
            T = (0, oE.default)(O, ({ id: S }) => S === h),
            R = (A.smoothing || 0) / 100,
            v = (A.restingState || 0) / 100;
          T &&
            d.forEach((S, b) => {
              let x = E + Po + b;
              dD({
                store: t,
                eventStateKey: x,
                eventTarget: S,
                eventId: E,
                eventConfig: A,
                actionListId: g,
                parameterGroup: T,
                smoothing: R,
                restingValue: v,
              });
            });
        }),
      (_.actionTypeId === B.GENERAL_START_ACTION || Co(_.actionTypeId)) &&
        EE({ store: t, actionListId: g, eventId: E });
  });
  let u = (d) => {
      let { ixSession: f } = t.getState();
      TD(s, (y, _, E) => {
        let I = r[_],
          g = f.eventState[E],
          { action: m, mediaQueries: A = i.mediaQueryKeys } = I;
        if (!hr(A, f.mediaQueryKey)) return;
        let h = (O = {}) => {
          let T = o(
            {
              store: t,
              element: y,
              event: I,
              eventConfig: O,
              nativeEvent: d,
              eventStateKey: E,
            },
            g
          );
          JL(T, g) || t.dispatch(co(E, T));
        };
        m.actionTypeId === B.GENERAL_CONTINUOUS_ACTION
          ? (Array.isArray(I.config) ? I.config : [I.config]).forEach(h)
          : h();
      });
    },
    l = (0, cE.default)(u, rD),
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
function AD(e) {
  if (!tD) return;
  let t = {},
    r = "";
  for (let n in e) {
    let { eventTypeId: o, target: i } = e[n],
      a = _o(i);
    t[a] ||
      ((o === z.MOUSE_CLICK || o === z.MOUSE_SECOND_CLICK) &&
        ((t[a] = !0),
        (r += a + "{cursor: pointer;touch-action: manipulation;}")));
  }
  if (r) {
    let n = document.createElement("style");
    (n.textContent = r), document.body.appendChild(n);
  }
}
function EE({ store: e, actionListId: t, eventId: r }) {
  let { ixData: n, ixSession: o } = e.getState(),
    { actionLists: i, events: a } = n,
    s = a[r],
    u = i[t];
  if (u && u.useFirstGroupAsInitialState) {
    let l = (0, se.default)(u, "actionItemGroups[0].actionItems", []),
      p = (0, se.default)(s, "mediaQueries", n.mediaQueryKeys);
    if (!hr(p, o.mediaQueryKey)) return;
    l.forEach((d) => {
      let { config: f, actionTypeId: y } = d,
        _ =
          f?.target?.useEventTarget === !0 && f?.target?.objectId == null
            ? { target: s.target, targets: s.targets }
            : f,
        E = mr({ config: _, event: s, elementApi: V }),
        I = Ar(y);
      E.forEach((g) => {
        let m = I ? Lo(y)(g, d) : null;
        Do({
          destination: No({ element: g, actionItem: d, elementApi: V }, m),
          immediate: !0,
          store: e,
          element: g,
          eventId: r,
          actionItem: d,
          actionListId: t,
          pluginInstance: m,
        });
      });
    });
  }
}
function gE({ store: e }) {
  let { ixInstances: t } = e.getState();
  (0, ke.default)(t, (r) => {
    if (!r.continuous) {
      let { actionListId: n, verbose: o } = r;
      Mo(r, e), o && e.dispatch(He({ actionListId: n, isPlaying: !1 }));
    }
  });
}
function We({
  store: e,
  eventId: t,
  eventTarget: r,
  eventStateKey: n,
  actionListId: o,
}) {
  let { ixInstances: i, ixSession: a } = e.getState(),
    s = a.hasBoundaryNodes && r ? gt(r, Tr) : null;
  (0, ke.default)(i, (u) => {
    let l = (0, se.default)(u, "actionItem.config.target.boundaryMode"),
      p = n ? u.eventStateKey === n : !0;
    if (u.actionListId === o && u.eventId === t && p) {
      if (s && l && !Io(s, u.element)) return;
      Mo(u, e), u.verbose && e.dispatch(He({ actionListId: o, isPlaying: !1 }));
    }
  });
}
function Tt({
  store: e,
  eventId: t,
  eventTarget: r,
  eventStateKey: n,
  actionListId: o,
  groupIndex: i = 0,
  immediate: a,
  verbose: s,
}) {
  let { ixData: u, ixSession: l } = e.getState(),
    { events: p } = u,
    d = p[t] || {},
    { mediaQueries: f = u.mediaQueryKeys } = d,
    y = (0, se.default)(u, `actionLists.${o}`, {}),
    { actionItemGroups: _, useFirstGroupAsInitialState: E } = y;
  if (!_ || !_.length) return !1;
  i >= _.length && (0, se.default)(d, "config.loop") && (i = 0),
    i === 0 && E && i++;
  let g =
      (i === 0 || (i === 1 && E)) && Co(d.action?.actionTypeId)
        ? d.config.delay
        : void 0,
    m = (0, se.default)(_, [i, "actionItems"], []);
  if (!m.length || !hr(f, l.mediaQueryKey)) return !1;
  let A = l.hasBoundaryNodes && r ? gt(r, Tr) : null,
    h = HL(m),
    O = !1;
  return (
    m.forEach((T, R) => {
      let { config: v, actionTypeId: S } = T,
        b = Ar(S),
        { target: x } = v;
      if (!x) return;
      let P = x.boundaryMode ? A : null;
      mr({
        config: v,
        event: d,
        eventTarget: r,
        elementRoot: P,
        elementApi: V,
      }).forEach((F, qo) => {
        let Rr = b ? Lo(S)(F, T) : null,
          br = b ? eD(S)(F, T) : null;
        O = !0;
        let AE = h === R && qo === 0,
          vE = WL({ element: F, actionItem: T }),
          SE = No({ element: F, actionItem: T, elementApi: V }, Rr);
        Do({
          store: e,
          element: F,
          actionItem: T,
          eventId: t,
          eventTarget: r,
          eventStateKey: n,
          actionListId: o,
          groupIndex: i,
          isCarrier: AE,
          computedStyle: vE,
          destination: SE,
          immediate: a,
          verbose: s,
          pluginInstance: Rr,
          pluginDuration: br,
          instanceDelay: g,
        });
      });
    }),
    O
  );
}
function Do(e) {
  let { store: t, computedStyle: r, ...n } = e,
    {
      element: o,
      actionItem: i,
      immediate: a,
      pluginInstance: s,
      continuous: u,
      restingValue: l,
      eventId: p,
    } = n,
    d = !u,
    f = UL(),
    { ixElements: y, ixSession: _, ixData: E } = t.getState(),
    I = VL(y, o),
    { refState: g } = y[I] || {},
    m = To(o),
    A = _.reducedMotion && Kr[i.actionTypeId],
    h;
  if (A && u)
    switch (E.events[p]?.eventTypeId) {
      case z.MOUSE_MOVE:
      case z.MOUSE_MOVE_IN_VIEWPORT:
        h = l;
        break;
      default:
        h = 0.5;
        break;
    }
  let O = kL(o, g, r, i, V, s);
  if (
    (t.dispatch(
      lo({
        instanceId: f,
        elementId: I,
        origin: O,
        refType: m,
        skipMotion: A,
        skipToValue: h,
        ...n,
      })
    ),
    yE(document.body, "ix2-animation-started", f),
    a)
  ) {
    vD(t, f);
    return;
  }
  Te({ store: t, select: ({ ixInstances: T }) => T[f], onChange: _E }),
    d && t.dispatch(ur(f, _.tick));
}
function Mo(e, t) {
  yE(document.body, "ix2-animation-stopping", {
    instanceId: e.id,
    state: t.getState(),
  });
  let { elementId: r, actionItem: n } = e,
    { ixElements: o } = t.getState(),
    { ref: i, refType: a } = o[r] || {};
  a === lE && YL(i, n, V), t.dispatch(fo(e.id));
}
function yE(e, t, r) {
  let n = document.createEvent("CustomEvent");
  n.initCustomEvent(t, !0, !0, r), e.dispatchEvent(n);
}
function vD(e, t) {
  let { ixParameters: r } = e.getState();
  e.dispatch(ur(t, 0)), e.dispatch(sr(performance.now(), r));
  let { ixInstances: n } = e.getState();
  _E(n[t], e);
}
function _E(e, t) {
  let {
      active: r,
      continuous: n,
      complete: o,
      elementId: i,
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
      pluginInstance: m,
    } = e,
    { ixData: A, ixSession: h } = t.getState(),
    { events: O } = A,
    T = O && O[d] ? O[d] : {},
    { mediaQueries: R = A.mediaQueryKeys } = T;
  if (hr(R, h.mediaQueryKey) && (n || r || o)) {
    if (l || (u === XL && o)) {
      t.dispatch(po(i, s, l, a));
      let { ixElements: v } = t.getState(),
        { ref: S, refType: b, refState: x } = v[i] || {},
        P = x && x[s];
      (b === lE || Ar(s)) && BL(S, x, P, d, a, I, V, u, m);
    }
    if (o) {
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
      Mo(e, t);
    }
  }
}
var oE,
  se,
  iE,
  aE,
  sE,
  uE,
  ke,
  cE,
  Ir,
  GL,
  Co,
  Po,
  Tr,
  lE,
  XL,
  rE,
  mr,
  VL,
  No,
  Te,
  UL,
  BL,
  fE,
  HL,
  WL,
  kL,
  KL,
  jL,
  zL,
  hr,
  YL,
  QL,
  $L,
  ZL,
  JL,
  Ar,
  Lo,
  eD,
  nE,
  tD,
  rD,
  yD,
  ID,
  TD,
  mD,
  xo = D(() => {
    "use strict";
    (oE = C(An())),
      (se = C(Ht())),
      (iE = C(Nf())),
      (aE = C(np())),
      (sE = C(ip())),
      (uE = C(sp())),
      (ke = C(dp())),
      (cE = C(mp()));
    H();
    Ir = C(Ie());
    cr();
    Rp();
    tE();
    (GL = Object.keys(ht)),
      (Co = (e) => GL.includes(e)),
      ({
        COLON_DELIMITER: Po,
        BOUNDARY_SELECTOR: Tr,
        HTML_ELEMENT: lE,
        RENDER_GENERAL: XL,
        W_MOD_IX: rE,
      } = G),
      ({
        getAffectedElements: mr,
        getElementId: VL,
        getDestinationValues: No,
        observeStore: Te,
        getInstanceId: UL,
        renderHTMLElement: BL,
        clearAllStyles: fE,
        getMaxDurationItemIndex: HL,
        getComputedStyle: WL,
        getInstanceOrigin: kL,
        reduceListToGroup: KL,
        shouldNamespaceEventParameter: jL,
        getNamespacedParameterId: zL,
        shouldAllowMediaQuery: hr,
        cleanupHTMLElement: YL,
        clearObjectCache: QL,
        stringifyTarget: $L,
        mediaQueriesEqual: ZL,
        shallowEqual: JL,
      } = Ir.IX2VanillaUtils),
      ({
        isPluginType: Ar,
        createPluginInstance: Lo,
        getPluginDuration: eD,
      } = Ir.IX2VanillaPlugins),
      (nE = navigator.userAgent),
      (tD = nE.match(/iPad/i) || nE.match(/iPhone/)),
      (rD = 12);
    yD = ["resize", "orientationchange"];
    (ID = (e, t) => (0, aE.default)((0, uE.default)(e, t), sE.default)),
      (TD = (e, t) => {
        (0, ke.default)(e, (r, n) => {
          r.forEach((o, i) => {
            let a = n + Po + i;
            t(o, n, a);
          });
        });
      }),
      (mD = (e) => {
        let t = { target: e.target, targets: e.targets };
        return mr({ config: t, elementApi: V });
      });
  });
var hE = c((wo) => {
  "use strict";
  Object.defineProperty(wo, "__esModule", { value: !0 });
  function SD(e, t) {
    for (var r in t) Object.defineProperty(e, r, { enumerable: !0, get: t[r] });
  }
  SD(wo, {
    actions: function () {
      return bD;
    },
    destroy: function () {
      return mE;
    },
    init: function () {
      return ND;
    },
    setEnv: function () {
      return PD;
    },
    store: function () {
      return Or;
    },
  });
  var OD = Hr(),
    RD = xD((pf(), $(ff))),
    Fo = (xo(), $(IE)),
    bD = CD((cr(), $(Ap)));
  function xD(e) {
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
  function CD(e, t) {
    if (!t && e && e.__esModule) return e;
    if (e === null || (typeof e != "object" && typeof e != "function"))
      return { default: e };
    var r = TE(t);
    if (r && r.has(e)) return r.get(e);
    var n = { __proto__: null },
      o = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var i in e)
      if (i !== "default" && Object.prototype.hasOwnProperty.call(e, i)) {
        var a = o ? Object.getOwnPropertyDescriptor(e, i) : null;
        a && (a.get || a.set) ? Object.defineProperty(n, i, a) : (n[i] = e[i]);
      }
    return (n.default = e), r && r.set(e, n), n;
  }
  var Or = (0, OD.createStore)(RD.default);
  function PD(e) {
    e() && (0, Fo.observeRequests)(Or);
  }
  function ND(e) {
    mE(), (0, Fo.startEngine)({ store: Or, rawData: e, allowEvents: !0 });
  }
  function mE() {
    (0, Fo.stopEngine)(Or);
  }
});
function I2() {
  let e = hE();
  return e.setEnv(() => !0), e;
}
export { I2 as createIX2Engine };
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
