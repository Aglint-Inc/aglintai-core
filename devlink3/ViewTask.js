"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { ViewTaskCard } from "./ViewTaskCard";
import { TaskProgress } from "./TaskProgress";
import * as _utils from "./utils";
import _styles from "./ViewTask.module.css";

export function ViewTask({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotTaskCard,
  slotTaskProgress,
  textTaskDetail = "The TAR (Talent Acquisition Representative) admin currently lacks the ability to edit basic candidate details. It's necessary to grant TAR admins the permission",
  isCancelTaskVisible = false,
  onClickCancelTask = {},
  onClickPrev = {},
  onClickNext = {},
  isDisablePrev = false,
  isDisableNext = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1338")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1339")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600")}
          tag="div"
        >
          {"Task Detail"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1570")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1571")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1569")}
              tag="div"
              {...onClickPrev}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.60156%206.39844C2.38281%206.13281%202.38281%205.86719%202.60156%205.60156L7.10156%201.10156C7.36719%200.882812%207.63281%200.882812%207.89844%201.10156C8.11719%201.36719%208.11719%201.63281%207.89844%201.89844L3.79688%206L7.89844%2010.1016C8.11719%2010.3672%208.11719%2010.6328%207.89844%2010.8984C7.63281%2011.1172%207.36719%2011.1172%207.10156%2010.8984L2.60156%206.39844Z%22%20fill%3D%22%2349545C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Previous"}</_Builtin.Block>
            </_Builtin.Block>
            {isDisablePrev ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1569", "disable")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.60156%206.39844C2.38281%206.13281%202.38281%205.86719%202.60156%205.60156L7.10156%201.10156C7.36719%200.882812%207.63281%200.882812%207.89844%201.10156C8.11719%201.36719%208.11719%201.63281%207.89844%201.89844L3.79688%206L7.89844%2010.1016C8.11719%2010.3672%208.11719%2010.6328%207.89844%2010.8984C7.63281%2011.1172%207.36719%2011.1172%207.10156%2010.8984L2.60156%206.39844Z%22%20fill%3D%22%23c2c8cc%22%2F%3E%0A%3C%2Fsvg%3E"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey_400")}
                  tag="div"
                >
                  {"Previous"}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1571")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1569")}
              tag="div"
              {...onClickNext}
            >
              <_Builtin.Block tag="div">{"Next"}</_Builtin.Block>
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.39844%205.60156C9.61719%205.86719%209.61719%206.13281%209.39844%206.39844L4.89844%2010.8984C4.63281%2011.1172%204.36719%2011.1172%204.10156%2010.8984C3.88281%2010.6328%203.88281%2010.3672%204.10156%2010.1016L8.20312%206L4.10156%201.89844C3.88281%201.63281%203.88281%201.36719%204.10156%201.10156C4.36719%200.882813%204.63281%200.882813%204.89844%201.10156L9.39844%205.60156Z%22%20fill%3D%22%2349545C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            {isDisableNext ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1569", "disable")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey_400")}
                  tag="div"
                >
                  {"Next"}
                </_Builtin.Block>
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "icons")}
                  value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.39844%205.60156C9.61719%205.86719%209.61719%206.13281%209.39844%206.39844L4.89844%2010.8984C4.63281%2011.1172%204.36719%2011.1172%204.10156%2010.8984C3.88281%2010.6328%203.88281%2010.3672%204.10156%2010.1016L8.20312%206L4.10156%201.89844C3.88281%201.63281%203.88281%201.36719%204.10156%201.10156C4.36719%200.882813%204.63281%200.882813%204.89844%201.10156L9.39844%205.60156Z%22%20fill%3D%22%23c2c8cc%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1569", "width-30")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons", "cursor-pointer")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.58594%203.21094L6.79688%206L9.58594%208.78906C9.80469%209.05469%209.80469%209.32031%209.58594%209.58594C9.32031%209.80469%209.05469%209.80469%208.78906%209.58594L6%206.79688L3.21094%209.58594C2.94531%209.80469%202.67969%209.80469%202.41406%209.58594C2.19531%209.32031%202.19531%209.05469%202.41406%208.78906L5.20312%206L2.41406%203.21094C2.19531%202.94531%202.19531%202.67969%202.41406%202.41406C2.67969%202.19531%202.94531%202.19531%203.21094%202.41406L6%205.20312L8.78906%202.41406C9.05469%202.19531%209.32031%202.19531%209.58594%202.41406C9.80469%202.67969%209.80469%202.94531%209.58594%203.21094Z%22%20fill%3D%22%2349545C%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickClose}
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {textTaskDetail}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1344")}
        tag="div"
      >
        {slotTaskCard ?? <ViewTaskCard />}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1345")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey_600")}
            tag="div"
          >
            {"Task Activity"}
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "")} tag="div">
            {slotTaskProgress ?? <TaskProgress />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isCancelTaskVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1545")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1546", "cursor-pointer")}
            tag="div"
            {...onClickCancelTask}
          >
            <_Builtin.Block tag="div">{"Cancel Task"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
