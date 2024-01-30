import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonPrimaryRegular } from "./ButtonPrimaryRegular";
import * as _utils from "./utils";
import _styles from "./PasswordUpdated.module.css";

export function PasswordUpdated({
  as: _Component = _Builtin.Block,
  onClickClose = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-806")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-807")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2272%22%20height%3D%2272%22%20viewBox%3D%220%200%2072%2072%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M36%2060C31.625%2059.9375%2027.625%2058.875%2024%2056.8125C20.375%2054.6875%2017.4375%2051.75%2015.1875%2048C13.0625%2044.1875%2012%2040.1875%2012%2036C12%2031.8125%2013.0625%2027.8125%2015.1875%2024C17.4375%2020.25%2020.375%2017.3125%2024%2015.1875C27.625%2013.125%2031.625%2012.0625%2036%2012C40.375%2012.0625%2044.375%2013.125%2048%2015.1875C51.625%2017.3125%2054.5625%2020.25%2056.8125%2024C58.9375%2027.8125%2060%2031.8125%2060%2036C60%2040.1875%2058.9375%2044.1875%2056.8125%2048C54.5625%2051.75%2051.625%2054.6875%2048%2056.8125C44.375%2058.875%2040.375%2059.9375%2036%2060ZM46.5938%2031.5938C47.4688%2030.5312%2047.4688%2029.4688%2046.5938%2028.4062C45.5312%2027.5312%2044.4688%2027.5312%2043.4062%2028.4062L33%2038.8125L28.5938%2034.4062C27.5312%2033.5312%2026.4688%2033.5312%2025.4062%2034.4062C24.5312%2035.4688%2024.5312%2036.5312%2025.4062%2037.5938L31.4062%2043.5938C32.4688%2044.4688%2033.5312%2044.4688%2034.5938%2043.5938L46.5938%2031.5938Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "text-lg", "fw-semibold")}
          tag="div"
        >
          {"Password Updated Successfully"}
        </_Builtin.Block>
        <_Builtin.Block tag="div" {...onClickClose}>
          <ButtonPrimaryRegular textLabel="Close" />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
