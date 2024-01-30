import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ScreeningWelcome.module.css";

export function ScreeningWelcome({
  as: _Component = _Builtin.Block,
  onclickEdit = {},
  editHeading = "Start message",
  slotInput,
  tooltipText = "This message will appear to the candidate as a welcome message before filling the form",
  onclickClose = {},
  isCloseVisible = false,
  isEditButtonVisible = true,
  slotWarnings,
  isEnd = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "screening-header-info")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "wel_end_wrap")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "icon_wrap")}
          id={_utils.cx(
            _styles,
            "w-node-debf81bd-b097-0a62-fabd-e064c2b8db88-cd1f0124"
          )}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex")}
            value="%3Csvg%20width%3D%22120%22%20height%3D%22120%22%20viewBox%3D%220%200%20120%20120%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%228.13008%22%20fill%3D%22%23F7F9FB%22%2F%3E%0A%3Cpath%20d%3D%22M30.0015%2043.4622C30.0015%2038.3642%2034.1342%2034.2314%2039.2322%2034.2314H62.3092V85.0007H39.2322C34.1342%2085.0007%2030.0015%2080.8679%2030.0015%2075.7699V43.4622Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Crect%20x%3D%2266.9243%22%20y%3D%2238.8467%22%20width%3D%224.61538%22%20height%3D%2241.5385%22%20rx%3D%222.30769%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Crect%20x%3D%2276.1553%22%20y%3D%2243.4619%22%20width%3D%224.61538%22%20height%3D%2232.3077%22%20rx%3D%222.30769%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Crect%20x%3D%2285.3857%22%20y%3D%2248.0762%22%20width%3D%224.61538%22%20height%3D%2223.0769%22%20rx%3D%222.30769%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          {isEnd ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "end_icon")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%22120%22%20height%3D%22120%22%20viewBox%3D%220%200%20120%20120%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%22120%22%20height%3D%22120%22%20rx%3D%228.13008%22%20fill%3D%22%23F7F9FB%22%2F%3E%0A%3Cpath%20d%3D%22M90.0001%2075.7683C90.0001%2080.8663%2085.8674%2084.999%2080.7694%2084.999H57.6924L57.6924%2034.2298L80.7693%2034.2298C85.8674%2034.2298%2090.0001%2038.3626%2090.0001%2043.4606V75.7683Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Crect%20x%3D%2253.0773%22%20y%3D%2280.3838%22%20width%3D%224.61538%22%20height%3D%2241.5385%22%20rx%3D%222.30769%22%20transform%3D%22rotate(-180%2053.0773%2080.3838)%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Crect%20x%3D%2243.8467%22%20y%3D%2275.7686%22%20width%3D%224.61538%22%20height%3D%2232.3077%22%20rx%3D%222.30769%22%20transform%3D%22rotate(-180%2043.8467%2075.7686)%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Crect%20x%3D%2234.6158%22%20y%3D%2271.1543%22%20width%3D%224.61538%22%20height%3D%2223.0769%22%20rx%3D%222.30769%22%20transform%3D%22rotate(-180%2034.6158%2071.1543)%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "content_wrap")}
          tag="div"
        >
          <_Builtin.Block className={_utils.cx(_styles, "text_wrap")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {editHeading}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{tooltipText}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text_update_div")}
            tag="div"
          >
            <_Builtin.Block tag="div">{slotInput}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "edit_close")}
              tag="div"
            >
              {isEditButtonVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "scr-header-edit-icon-block")}
                  tag="div"
                  {...onclickEdit}
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "svg-icon")}
                    value="%3Csvg%20width%3D%2213%22%20height%3D%2213%22%20viewBox%3D%220%200%2013%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.8359%201.88281C10.5703%201.66406%2010.3047%201.66406%2010.0391%201.88281L9.35938%202.5625L10.4375%203.64062L11.1172%202.96094C11.3359%202.69531%2011.3359%202.42969%2011.1172%202.16406L10.8359%201.88281ZM5.42188%206.5C5.34375%206.57812%205.29688%206.66406%205.28125%206.75781L4.88281%208.11719L6.24219%207.71875C6.33594%207.70312%206.42188%207.65625%206.5%207.57812L9.64062%204.4375L8.5625%203.35938L5.42188%206.5ZM9.24219%201.08594C9.58594%200.757812%209.98438%200.59375%2010.4375%200.59375C10.8906%200.59375%2011.2891%200.757812%2011.6328%201.08594L11.9141%201.36719C12.2422%201.71094%2012.4062%202.10938%2012.4062%202.5625C12.4062%203.01562%2012.2422%203.41406%2011.9141%203.75781L7.29688%208.375C7.09375%208.57812%206.85156%208.71875%206.57031%208.79688L4.22656%209.47656C4.00781%209.52344%203.82031%209.47656%203.66406%209.33594C3.50781%209.17969%203.46094%208.99219%203.52344%208.77344L4.20312%206.42969C4.28125%206.16406%204.42188%205.92188%204.625%205.70312L9.24219%201.08594ZM2.5625%202H5.1875C5.53125%202.03125%205.71875%202.21875%205.75%202.5625C5.71875%202.90625%205.53125%203.09375%205.1875%203.125H2.5625C2.29688%203.125%202.07812%203.21875%201.90625%203.40625C1.71875%203.57812%201.625%203.79688%201.625%204.0625V10.4375C1.625%2010.7031%201.71875%2010.9219%201.90625%2011.0938C2.07812%2011.2812%202.29688%2011.375%202.5625%2011.375H8.9375C9.20312%2011.375%209.42188%2011.2812%209.59375%2011.0938C9.78125%2010.9219%209.875%2010.7031%209.875%2010.4375V7.8125C9.90625%207.46875%2010.0938%207.28125%2010.4375%207.25C10.7812%207.28125%2010.9688%207.46875%2011%207.8125V10.4375C10.9844%2011.0156%2010.7812%2011.5%2010.3906%2011.8906C10%2012.2812%209.51562%2012.4844%208.9375%2012.5H2.5625C1.98438%2012.4844%201.5%2012.2812%201.10938%2011.8906C0.71875%2011.5%200.515625%2011.0156%200.5%2010.4375V4.0625C0.515625%203.48437%200.71875%203%201.10938%202.60938C1.5%202.21875%201.98438%202.01563%202.5625%202Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                </_Builtin.Block>
              ) : null}
              {isCloseVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "scr-close-btn", "clickable")}
                  tag="div"
                  {...onclickClose}
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "icon-block", "_16x16")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "svg-icon")}
                      value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7812%202.28125L7.0625%206L10.7812%209.71875C11.0729%2010.0729%2011.0729%2010.4271%2010.7812%2010.7812C10.4271%2011.0729%2010.0729%2011.0729%209.71875%2010.7812L6%207.0625L2.28125%2010.7812C1.92708%2011.0729%201.57292%2011.0729%201.21875%2010.7812C0.927083%2010.4271%200.927083%2010.0729%201.21875%209.71875L4.9375%206L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875L6%204.9375L9.71875%201.21875C10.0729%200.927083%2010.4271%200.927083%2010.7812%201.21875C11.0729%201.57292%2011.0729%201.92708%2010.7812%202.28125Z%22%20fill%3D%22%2349545C%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
