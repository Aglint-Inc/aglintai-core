import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ButtonDarkYellow.module.css";

export function ButtonDarkYellow({
  as: _Component = _Builtin.Block,
  buttonText = "Button",
  isLoading = false,
  onClickButton = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "yellow-btn-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "button-yellow-800")}
        tag="div"
        {...onClickButton}
      >
        <_Builtin.Block tag="div">{buttonText}</_Builtin.Block>
      </_Builtin.Block>
      {isLoading ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "button-yellow-loading")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "")}
            value="%3Cstyle%3E%0A.loadersvg%2C%0A.loaderpath%7B%0A%20%20fill%3A%20%23ffff%3B%0A%7D%0A%3C%2Fstyle%3E%20%0A%20%20%3Csvg%20class%3D%22loadersvg%22%20version%3D%221.1%22%20id%3D%22loader-1%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20xmlns%3Axlink%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink%22%20x%3D%220px%22%20y%3D%220px%22%20width%3D%2224px%22%20height%3D%2224px%22%20viewbox%3D%220%200%2050%2050%22%20style%3D%22enable-background%3Anew%200%200%2050%2050%3B%22%20xml%3Aspace%3D%22preserve%22%3E%0A%20%20%3Cpath%20class%3D%22loaderpath%22%20fill%3D%22%23000%22%20d%3D%22M43.935%2C25.145c0-10.318-8.364-18.683-18.683-18.683c-10.318%2C0-18.683%2C8.365-18.683%2C18.683h4.068c0-8.071%2C6.543-14.615%2C14.615-14.615c8.072%2C0%2C14.615%2C6.543%2C14.615%2C14.615H43.935z%22%3E%0A%20%20%20%20%3Canimatetransform%20attributetype%3D%22xml%22%20attributename%3D%22transform%22%20type%3D%22rotate%22%20from%3D%220%2025%2025%22%20to%3D%22360%2025%2025%22%20dur%3D%220.6s%22%20repeatcount%3D%22indefinite%22%2F%3E%0A%20%20%20%20%3C%2Fpath%3E%0A%20%20%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
