import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssessmentMessages.module.css";

export function AssessmentMessages({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "assessment_info")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "title_desccription")}
        tag="div"
      >
        <_Builtin.Block tag="div">{"Welcome and End Messages"}</_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {
            "This messages will be shown at the beggining and ending of the message rescpectively"
          }
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "slot_inputs")} tag="div" />
    </_Component>
  );
}
