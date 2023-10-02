import React from "react";
import * as _Builtin from "./_Builtin";
import { Checkbox } from "./Checkbox";
import * as _utils from "./utils";
import _styles from "./ContactDetails.module.css";

export function ContactDetails({
  as: _Component = _Builtin.Block,
  textLabelFields = "Name",
  slotToggle,
  isAlwaysRequiredVisible = true,
  slotCheckbox,
}) {
  return (
    <_Component className={_utils.cx(_styles, "contact-details")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "contact-fileds-wrappers")}
        id={_utils.cx(
          _styles,
          "w-node-a32b88d4-9ecd-e111-010e-71bb0eac3ec5-0eac3ec4"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotToggle}</_Builtin.Block>
        <_Builtin.Block tag="div">{textLabelFields}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "contact-fileds-wrappers")}
        id={_utils.cx(
          _styles,
          "w-node-a32b88d4-9ecd-e111-010e-71bb0eac3ec8-0eac3ec4"
        )}
        tag="div"
      >
        <_Builtin.Block tag="div">
          {slotCheckbox ?? <Checkbox />}
        </_Builtin.Block>
        {isAlwaysRequiredVisible ? (
          <_Builtin.Block tag="div">{"Always Required"}</_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
