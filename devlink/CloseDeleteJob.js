import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CloseDeleteJob.module.css";

export function CloseDeleteJob({
  as: _Component = _Builtin.Block,
  isCloseJobVisible = true,
  isDeleteJobVisible = false,
  onClickClose = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "close-delete-wrap")} tag="div">
      {isCloseJobVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Close this job"}
        </_Builtin.Block>
      ) : null}
      {isDeleteJobVisible ? (
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Delete this job"}
        </_Builtin.Block>
      ) : null}
      {isCloseJobVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "mt-9")}
          tag="div"
        >
          {
            "By closing the job, candidate can no longer apply to this position and also this job will be removed from company page."
          }
        </_Builtin.Block>
      ) : null}
      {isDeleteJobVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey-600", "mt-9")}
          tag="div"
        >
          {"By deleting this entire job data will be erased from the system."}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block className={_utils.cx(_styles, "div-block-667")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "close-job-btn")}
          tag="div"
          {...onClickClose}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8%201.5C6.8125%201.5%205.72917%201.79167%204.75%202.375C3.77083%202.9375%202.97917%203.72917%202.375%204.75C1.79167%205.77083%201.5%206.85417%201.5%208C1.5%209.14583%201.79167%2010.2292%202.375%2011.25C2.97917%2012.2708%203.77083%2013.0625%204.75%2013.625C5.72917%2014.2083%206.8125%2014.5%208%2014.5C9.1875%2014.5%2010.2708%2014.2083%2011.25%2013.625C12.2292%2013.0625%2013.0208%2012.2708%2013.625%2011.25C14.2083%2010.2292%2014.5%209.14583%2014.5%208C14.5%206.85417%2014.2083%205.77083%2013.625%204.75C13.0208%203.72917%2012.2292%202.9375%2011.25%202.375C10.2708%201.79167%209.1875%201.5%208%201.5ZM8%2016C6.54167%2015.9792%205.20833%2015.625%204%2014.9375C2.79167%2014.2292%201.8125%2013.25%201.0625%2012C0.354167%2010.7292%200%209.39583%200%208C0%206.60417%200.354167%205.27083%201.0625%204C1.8125%202.75%202.79167%201.77083%204%201.0625C5.20833%200.375%206.54167%200.0208333%208%200C9.45833%200.0208333%2010.7917%200.375%2012%201.0625C13.2083%201.77083%2014.1875%202.75%2014.9375%204C15.6458%205.27083%2016%206.60417%2016%208C16%209.39583%2015.6458%2010.7292%2014.9375%2012C14.1875%2013.25%2013.2083%2014.2292%2012%2014.9375C10.7917%2015.625%209.45833%2015.9792%208%2016ZM5.46875%205.46875C5.82292%205.17708%206.17708%205.17708%206.53125%205.46875L8%206.9375L9.46875%205.46875C9.82292%205.17708%2010.1771%205.17708%2010.5312%205.46875C10.8229%205.82292%2010.8229%206.17708%2010.5312%206.53125L9.0625%208L10.5312%209.46875C10.8229%209.82292%2010.8229%2010.1771%2010.5312%2010.5312C10.1771%2010.8229%209.82292%2010.8229%209.46875%2010.5312L8%209.0625L6.53125%2010.5312C6.17708%2010.8229%205.82292%2010.8229%205.46875%2010.5312C5.17708%2010.1771%205.17708%209.82292%205.46875%209.46875L6.9375%208L5.46875%206.53125C5.17708%206.17708%205.17708%205.82292%205.46875%205.46875Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
          />
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
              {"Delete draft"}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
