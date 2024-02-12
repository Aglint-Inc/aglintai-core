import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ButtonSchedule.module.css";

export function ButtonSchedule({
  as: _Component = _Builtin.Block,
  onClickSchedule = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "schedul-type")}
      tag="div"
      {...onClickSchedule}
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M3%202.375V2.77344L12.3984%206.00781C12.6172%206.10156%2012.7344%206.26562%2012.75%206.5C12.7344%206.73438%2012.6172%206.89844%2012.3984%206.99219L3%2010.2266V13.625C2.98438%2013.8594%202.85938%2013.9844%202.625%2014C2.39062%2013.9844%202.26562%2013.8594%202.25%2013.625V10.25V9.5V3.5V2.75V2.375C2.26562%202.14062%202.39062%202.01563%202.625%202C2.85938%202.01563%202.98438%202.14062%203%202.375ZM3%203.57031V9.42969L11.5312%206.5L3%203.57031Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <_Builtin.Block tag="div">{"Schedule Type"}</_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "icons")}
        value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2015%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M7.75781%2011.2578C7.58594%2011.4141%207.41406%2011.4141%207.24219%2011.2578L2.74219%206.75781C2.58594%206.58594%202.58594%206.41406%202.74219%206.24219C2.91406%206.08594%203.08594%206.08594%203.25781%206.24219L7.5%2010.4609L11.7422%206.24219C11.9141%206.08594%2012.0859%206.08594%2012.2578%206.24219C12.4141%206.41406%2012.4141%206.58594%2012.2578%206.75781L7.75781%2011.2578Z%22%20fill%3D%22%230F3554%22%2F%3E%0A%3C%2Fsvg%3E"
      />
    </_Component>
  );
}
