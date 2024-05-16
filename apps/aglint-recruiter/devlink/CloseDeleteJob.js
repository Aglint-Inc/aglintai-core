"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CloseDeleteJob.module.css";

export function CloseDeleteJob({
  as: _Component = _Builtin.Block,
  isCloseJobVisible = true,
  isDeleteJobVisible = false,
  onClickClose = {},
  textDesc = "This is some text inside of a div block.",
  isDynamicDescVisible = false,
  textHeader = "This is some text inside of a div block.",
  slotIcon,
  textButtonLabel = "This is some text inside of a div block.",
}) {
  return (
    <_Component className={_utils.cx(_styles, "close-delete-wrap")} tag="div">
      {isCloseJobVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Close This Job"}
        </_Builtin.Block>
      ) : null}
      {isDynamicDescVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textHeader}
        </_Builtin.Block>
      ) : null}
      {isDeleteJobVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Delete this job"}
        </_Builtin.Block>
      ) : null}
      {isCloseJobVisible ? (
        <_Builtin.List
          className={_utils.cx(_styles, "list-8")}
          tag="ul"
          unstyled={false}
        >
          <_Builtin.ListItem>
            {
              "Closing this job will permanently end all associated activities, including tasks and scheduled interviews."
            }
          </_Builtin.ListItem>
          <_Builtin.ListItem>
            {
              "Once closed, this position will no longer accept applications and cannot be reactivated. "
            }
          </_Builtin.ListItem>
          <_Builtin.ListItem>
            {"The job will also be removed from the company page."}
          </_Builtin.ListItem>
        </_Builtin.List>
      ) : null}
      {isDeleteJobVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "mt-9")}
          tag="div"
        >
          {"By deleting this entire job data will be erased from the system."}
        </_Builtin.Block>
      ) : null}
      {isDynamicDescVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "mt-9")}
          tag="div"
        >
          {textDesc}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-667")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "close-job-btn")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.Block tag="div">
            {isCloseJobVisible ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7812%204.28125L7.0625%208L10.7812%2011.7188C11.0729%2012.0729%2011.0729%2012.4271%2010.7812%2012.7812C10.4271%2013.0729%2010.0729%2013.0729%209.71875%2012.7812L6%209.0625L2.28125%2012.7812C1.92708%2013.0729%201.57292%2013.0729%201.21875%2012.7812C0.927083%2012.4271%200.927083%2012.0729%201.21875%2011.7188L4.9375%208L1.21875%204.28125C0.927083%203.92708%200.927083%203.57292%201.21875%203.21875C1.57292%202.92708%201.92708%202.92708%202.28125%203.21875L6%206.9375L9.71875%203.21875C10.0729%202.92708%2010.4271%202.92708%2010.7812%203.21875C11.0729%203.57292%2011.0729%203.92708%2010.7812%204.28125Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
            {isDeleteJobVisible ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewBox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M5.53125%201.5C5.44792%201.5%205.38542%201.54167%205.34375%201.625L4.75%202.5H9.28125L8.6875%201.625C8.625%201.54167%208.55208%201.5%208.46875%201.5H5.53125ZM11.0625%202.5H11.5H13H13.25C13.7083%202.54167%2013.9583%202.79167%2014%203.25C13.9583%203.70833%2013.7083%203.95833%2013.25%204H12.875L12.125%2014.1562C12.0833%2014.6771%2011.875%2015.1146%2011.5%2015.4688C11.125%2015.8021%2010.6771%2015.9792%2010.1562%2016H3.84375C3.32292%2015.9792%202.875%2015.8021%202.5%2015.4688C2.125%2015.1146%201.91667%2014.6771%201.875%2014.1562L1.125%204H0.75C0.291667%203.95833%200.0416667%203.70833%200%203.25C0.0416667%202.79167%200.291667%202.54167%200.75%202.5H1H2.5H2.9375L4.09375%200.78125C4.44792%200.28125%204.92708%200.0208333%205.53125%200H8.46875C9.07292%200.0208333%209.5625%200.28125%209.9375%200.78125L11.0625%202.5ZM11.375%204H2.625L3.34375%2014.0312C3.40625%2014.3229%203.57292%2014.4792%203.84375%2014.5H10.1562C10.4271%2014.4792%2010.5938%2014.3229%2010.6562%2014.0312L11.375%204Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
            {isDynamicDescVisible ? (
              <_Builtin.Block tag="div">{slotIcon}</_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          {isCloseJobVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-red-500")}
              tag="div"
            >
              {"Close job"}
            </_Builtin.Block>
          ) : null}
          {isDeleteJobVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-red-500")}
              tag="div"
            >
              {"Delete Job"}
            </_Builtin.Block>
          ) : null}
          {isDynamicDescVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold", "text-red-500")}
              tag="div"
            >
              {textButtonLabel}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
