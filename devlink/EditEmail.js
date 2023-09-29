import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonOutlinedSmall } from "./ButtonOutlinedSmall";
import { ButtonOutlinedDangerSmall } from "./ButtonOutlinedDangerSmall";
import * as _utils from "./utils";
import _styles from "./EditEmail.module.css";

export function EditEmail({
  as: _Component = _Builtin.Block,
  textEmailName = "This is some text inside of a div block.",
  onClickSaveChanges = {},
  onClickClose = {},
  slotForm,
}) {
  return (
    <_Component className={_utils.cx(_styles, "company-email-edit")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "company-email-header")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey-500")}
          tag="div"
        >
          {textEmailName}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "header-right-button--company")}
            tag="div"
          >
            <_Builtin.Block tag="div" {...onClickSaveChanges}>
              <ButtonOutlinedSmall textLabel="Save Changes" />
            </_Builtin.Block>
            <_Builtin.Block tag="div" {...onClickClose}>
              <ButtonOutlinedDangerSmall buttonText="Close" />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-company-email-form")}
        tag="div"
      >
        {slotForm}
      </_Builtin.Block>
    </_Component>
  );
}
