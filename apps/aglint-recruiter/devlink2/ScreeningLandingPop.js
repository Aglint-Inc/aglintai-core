"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./ScreeningLandingPop.module.css";

export function ScreeningLandingPop({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotScreeningNameInput,
  slotButtonPrimaryRegular,
  textHeading = "New Screening",
  textLabel = "Screening Name",
  slotDropdown,
  isDropdownVisible = true,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "screening-landing-pop")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "slp-top-wrap")} tag="div">
        <Text content={textHeading} />
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons", "cursor-pointer")}
          value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.71094%200.914062L6%205.20312L10.2891%200.914062C10.5547%200.695313%2010.8203%200.695313%2011.0859%200.914062C11.3047%201.17969%2011.3047%201.44531%2011.0859%201.71094L6.79688%206L11.0859%2010.2891C11.3047%2010.5547%2011.3047%2010.8203%2011.0859%2011.0859C10.8203%2011.3047%2010.5547%2011.3047%2010.2891%2011.0859L6%206.79688L1.71094%2011.0859C1.44531%2011.3047%201.17969%2011.3047%200.914062%2011.0859C0.695312%2010.8203%200.695312%2010.5547%200.914062%2010.2891L5.20312%206L0.914062%201.71094C0.695312%201.44531%200.695312%201.17969%200.914062%200.914062C1.17969%200.695313%201.44531%200.695313%201.71094%200.914062Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          {...onClickClose}
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slp-slot-screening")}
        tag="div"
      >
        <_Builtin.Block tag="div">{slotScreeningNameInput}</_Builtin.Block>
      </_Builtin.Block>
      {isDropdownVisible ? (
        <_Builtin.Block tag="div">{slotDropdown}</_Builtin.Block>
      ) : null}
      <_Builtin.Block tag="div">{slotButtonPrimaryRegular}</_Builtin.Block>
    </_Component>
  );
}
