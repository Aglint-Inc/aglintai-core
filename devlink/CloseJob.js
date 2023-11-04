import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CloseJob.module.css";

export function CloseJob({
  as: _Component = _Builtin.Block,
  onClickCloseJob = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "edit-close-job")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-556")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Close this job"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "color-grey-600")}
          tag="div"
        >
          {
            "By closing the job, candidate can no longer apply to this position and also this job will be removed from company page."
          }
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "close-job-btn")}
          tag="div"
          {...onClickCloseJob}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cg%20clip-path%3D%22url(%23clip0_4329_50138)%22%3E%0A%20%20%20%20%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%226.8%22%20fill%3D%22white%22%20stroke%3D%22%23E35B66%22%20stroke-width%3D%222.4%22%2F%3E%0A%20%20%20%20%3Crect%20x%3D%221.54224%22%20y%3D%224.375%22%20width%3D%222.66667%22%20height%3D%2213.7114%22%20transform%3D%22rotate(-46.5967%201.54224%204.375)%22%20fill%3D%22%23E35B66%22%2F%3E%0A%20%20%3C%2Fg%3E%0A%20%20%3Cdefs%3E%0A%20%20%20%20%3CclipPath%20id%3D%22clip0_4329_50138%22%3E%0A%20%20%20%20%20%20%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%0A%20%20%20%20%3C%2FclipPath%3E%0A%20%20%3C%2Fdefs%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-red-500")}
            tag="div"
          >
            {"Close job"}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
