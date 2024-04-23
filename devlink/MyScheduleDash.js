import React from "react";
import * as _Builtin from "./_Builtin";
import { ScheduleCollapseCard } from "./ScheduleCollapseCard";
import * as _utils from "./utils";
import _styles from "./MyScheduleDash.module.css";

export function MyScheduleDash({
  as: _Component = _Builtin.Block,
  slotCompleted,
  onClickIconCompleted = {},
  onClickIconUpcoming = {},
  slotUpcoming,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-885")} tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-886")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Completed"}
          </_Builtin.Block>
          <_Builtin.Block tag="div" {...onClickIconCompleted}>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2228%22%20height%3D%2228%22%20viewBox%3D%220%200%2028%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%2227.5%22%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%2213.5%22%20transform%3D%22rotate(-90%200.5%2027.5)%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%2227.5%22%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%2213.5%22%20transform%3D%22rotate(-90%200.5%2027.5)%22%20stroke%3D%22%23E9EBED%22%2F%3E%0A%3Cpath%20d%3D%22M13.4688%2018.5312L7.46875%2012.5312C7.17708%2012.1771%207.17708%2011.8229%207.46875%2011.4688C7.82292%2011.1771%208.17708%2011.1771%208.53125%2011.4688L14%2016.9375L19.4688%2011.4687C19.8229%2011.1771%2020.1771%2011.1771%2020.5312%2011.4687C20.8229%2011.8229%2020.8229%2012.1771%2020.5312%2012.5312L14.5312%2018.5312C14.1771%2018.8229%2013.8229%2018.8229%2013.4688%2018.5312Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-887")}
          tag="div"
        >
          {slotCompleted ?? <ScheduleCollapseCard />}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-886")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Upcoming"}
          </_Builtin.Block>
          <_Builtin.Block tag="div" {...onClickIconUpcoming}>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2228%22%20height%3D%2228%22%20viewBox%3D%220%200%2028%2028%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%2227.5%22%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%2213.5%22%20transform%3D%22rotate(-90%200.5%2027.5)%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%220.5%22%20y%3D%2227.5%22%20width%3D%2227%22%20height%3D%2227%22%20rx%3D%2213.5%22%20transform%3D%22rotate(-90%200.5%2027.5)%22%20stroke%3D%22%23E9EBED%22%2F%3E%0A%3Cpath%20d%3D%22M13.4688%2018.5312L7.46875%2012.5312C7.17708%2012.1771%207.17708%2011.8229%207.46875%2011.4688C7.82292%2011.1771%208.17708%2011.1771%208.53125%2011.4688L14%2016.9375L19.4688%2011.4687C19.8229%2011.1771%2020.1771%2011.1771%2020.5312%2011.4687C20.8229%2011.8229%2020.8229%2012.1771%2020.5312%2012.5312L14.5312%2018.5312C14.1771%2018.8229%2013.8229%2018.8229%2013.4688%2018.5312Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-887")}
          tag="div"
        >
          {slotUpcoming}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
