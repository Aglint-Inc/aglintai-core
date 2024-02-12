import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TemplateStatus.module.css";

export function TemplateStatus({
  as: _Component = _Builtin.Block,
  isActive = false,
  textActiveCandidatesNumber = "01",
}) {
  return (
    <_Component className={_utils.cx(_styles, "templatestatus")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "template_status", "draft")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Draft"}</_Builtin.Block>
      </_Builtin.Block>
      {isActive ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "template_status", "active")}
          tag="div"
        >
          <_Builtin.Block tag="div">{"Active"}</_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
