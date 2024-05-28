"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AddLocationPop.module.css";

export function AddLocationPop({
  as: _Component = _Builtin.Block,
  slotForm,
  onClickCancel = {},
  onClickAdd = {},
  isChecked = false,
  onClickCheck = {},
  headerText = "Add New Location",
  isAddDisable = false,
  textLocationDesc = "This is some text inside of a div block.",
  isLocationDescVisible = true,
  textButtonLabel = "Add",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "new-location-pop-wrappers")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "div-block-454")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {headerText}
        </_Builtin.Block>
      </_Builtin.Block>
      {isLocationDescVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-988")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2222%22%20height%3D%2213px%22%20viewBox%3D%220%200%2017%2016%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M8%204C7.72386%204%207.5%204.22386%207.5%204.5V9C7.5%209.27614%207.72386%209.5%208%209.5C8.27614%209.5%208.5%209.27614%208.5%209V4.5C8.5%204.22386%208.27614%204%208%204ZM8%2013C8.55228%2013%209%2012.5523%209%2012C9%2011.4477%208.55228%2011%208%2011C7.44772%2011%207%2011.4477%207%2012C7%2012.5523%207.44772%2013%208%2013ZM8%2016C3.85786%2016%200.5%2012.6421%200.5%208.5C0.5%204.35786%203.85786%201%208%201C12.1421%201%2015.5%204.35786%2015.5%208.5C15.5%2012.6421%2012.1421%2016%208%2016ZM8%2015C11.5899%2015%2014.5%2012.0899%2014.5%208.5C14.5%204.91015%2011.5899%202%208%202C4.41015%202%201.5%204.91015%201.5%208.5C1.5%2012.0899%204.41015%2015%208%2015Z%22%20fill%3D%22%23E35B66%22%20fill-rule%3D%22evenodd%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-red-600")}
            tag="div"
          >
            {textLocationDesc}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-location-forms")}
        tag="div"
      >
        {slotForm}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "div-block-453")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "final-check-box")}
          tag="div"
          {...onClickCheck}
        >
          {isChecked ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%208.58579L10.2929%205.29289C10.6834%204.90237%2011.3166%204.90237%2011.7071%205.29289C12.0976%205.68342%2012.0976%206.31658%2011.7071%206.70711L7.70711%2010.7071C7.31658%2011.0976%206.68342%2011.0976%206.29289%2010.7071L4.29289%208.70711C3.90237%208.31658%203.90237%207.68342%204.29289%207.29289C4.68342%206.90237%205.31658%206.90237%205.70711%207.29289L7%208.58579Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block tag="div">{"Is this the headquarter"}</_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "roles-btn-wrappers-pop")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "pop-button-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-987")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-986", "primary")}
              id={_utils.cx(
                _styles,
                "w-node-_044aa0d8-d364-cf9a-f7f2-1183971856d8-8facdcb2"
              )}
              tag="div"
              {...onClickAdd}
            >
              <_Builtin.Block tag="div">{textButtonLabel}</_Builtin.Block>
            </_Builtin.Block>
            {isAddDisable ? (
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "div-block-986",
                  "primary",
                  "disable"
                )}
                id={_utils.cx(
                  _styles,
                  "w-node-_29bff11b-2f0f-0fb8-8f76-a5d2759ca272-8facdcb2"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-grey-400")}
                  tag="div"
                >
                  {textButtonLabel}
                </_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "close-pop")}
        tag="div"
        {...onClickCancel}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M2.28125%201.21875L8%206.9375L13.7188%201.21875C14.0729%200.927083%2014.4271%200.927083%2014.7812%201.21875C15.0729%201.57292%2015.0729%201.92708%2014.7812%202.28125L9.0625%208L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L8%209.0625L2.28125%2014.7812C1.92708%2015.0729%201.57292%2015.0729%201.21875%2014.7812C0.927083%2014.4271%200.927083%2014.0729%201.21875%2013.7188L6.9375%208L1.21875%202.28125C0.927083%201.92708%200.927083%201.57292%201.21875%201.21875C1.57292%200.927083%201.92708%200.927083%202.28125%201.21875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
    </_Component>
  );
}
