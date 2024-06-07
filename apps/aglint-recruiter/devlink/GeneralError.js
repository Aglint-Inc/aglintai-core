"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./GeneralError.module.css";

export function GeneralError({
  as: _Component = _Builtin.Block,
  onClickRetry = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "general_error")}
      id={_utils.cx(
        _styles,
        "w-node-_56303234-7c2f-585c-ea35-639e61bcb498-61bcb498"
      )}
      tag="div"
    >
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_flex")}
        value="%3Csvg%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M20%206C20.9583%206.04167%2021.6875%206.45833%2022.1875%207.25L35.6875%2030.25C36.1042%2031.0833%2036.1042%2031.9167%2035.6875%2032.75C35.1875%2033.5417%2034.4583%2033.9583%2033.5%2034H6.5C5.54167%2033.9583%204.8125%2033.5417%204.3125%2032.75C3.89583%2031.9167%203.89583%2031.0833%204.3125%2030.25L17.875%207.25C18.375%206.45833%2019.0833%206.04167%2020%206ZM20%2014C19.0833%2014.0833%2018.5833%2014.5833%2018.5%2015.5V22.5C18.5833%2023.4167%2019.0833%2023.9167%2020%2024C20.9167%2023.9167%2021.4167%2023.4167%2021.5%2022.5V15.5C21.4167%2014.5833%2020.9167%2014.0833%2020%2014ZM22%2028C22%2027.4167%2021.8125%2026.9375%2021.4375%2026.5625C21.0625%2026.1875%2020.5833%2026%2020%2026C19.4167%2026%2018.9375%2026.1875%2018.5625%2026.5625C18.1875%2026.9375%2018%2027.4167%2018%2028C18%2028.5833%2018.1875%2029.0625%2018.5625%2029.4375C18.9375%2029.8125%2019.4167%2030%2020%2030C20.5833%2030%2021.0625%2029.8125%2021.4375%2029.4375C21.8125%2029.0625%2022%2028.5833%2022%2028Z%22%20fill%3D%22%23E54D2E%22%2F%3E%0A%3C%2Fsvg%3E"
      />
      <Text weight="medium" content="Oops.. something went wrong!" />
      <ButtonSoft
        onClickButton={onClickRetry}
        size="2"
        textButton="Retry"
        isRightIcon={false}
        isLeftIcon={false}
        color="neutral"
      />
    </_Component>
  );
}
