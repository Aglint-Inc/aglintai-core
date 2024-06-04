"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DeleteCjCheckbox.module.css";

export function DeleteCjCheckbox({
  as: _Component = _Builtin.FormWrapper,
  checkboxText = "Shortlist all candidates having interview score above :",
}) {
  return (
    <_Component className={_utils.cx(_styles, "form-block-5", "remove-abs")}>
      <_Builtin.FormForm
        name="email-form-3"
        data-name="Email Form 3"
        method="get"
        id="email-form-3"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-276")}
          tag="div"
        >
          <_Builtin.FormCheckboxWrapper
            className={_utils.cx(_styles, "checkbox-field-2")}
          >
            <_Builtin.FormCheckboxInput
              type="checkbox"
              name="checkbox-2"
              data-name="Checkbox 2"
              checked={false}
              required={false}
              id="checkbox-2"
              form={{
                type: "checkbox-input",
                name: "Checkbox 2",
              }}
              inputType="default"
            />
            <_Builtin.FormInlineLabel
              className={_utils.cx(_styles, "text-grey-600")}
            >
              {checkboxText}
            </_Builtin.FormInlineLabel>
          </_Builtin.FormCheckboxWrapper>
          <_Builtin.FormTextInput
            className={_utils.cx(_styles, "text-field-4")}
            autoFocus={false}
            maxLength={256}
            name="name-2"
            data-name="Name 2"
            placeholder="--"
            type="number"
            disabled={false}
            required={false}
            id="name-2"
          />
        </_Builtin.Block>
        <_Builtin.FormButton
          className={_utils.cx(_styles, "hide")}
          type="submit"
          value="Submit"
          data-wait="Please wait..."
        />
      </_Builtin.FormForm>
      <_Builtin.FormSuccessMessage className={_utils.cx(_styles, "hide")}>
        <_Builtin.Block tag="div">
          {"Thank you! Your submission has been received!"}
        </_Builtin.Block>
      </_Builtin.FormSuccessMessage>
      <_Builtin.FormErrorMessage className={_utils.cx(_styles, "hide")}>
        <_Builtin.Block tag="div">
          {"Oops! Something went wrong while submitting the form."}
        </_Builtin.Block>
      </_Builtin.FormErrorMessage>
    </_Component>
  );
}
