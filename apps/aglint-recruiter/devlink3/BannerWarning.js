"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./BannerWarning.module.css";

export function BannerWarning({
  as: _Component = _Builtin.Block,
  textBanner = "Job descripion is changed. Click to regenerate.",
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "discard-btn-score")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-699")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2230%22%20height%3D%2230%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12%205C12.4792%205.02083%2012.8438%205.22917%2013.0938%205.625L19.8438%2017.125C20.0521%2017.5417%2020.0521%2017.9583%2019.8438%2018.375C19.5938%2018.7708%2019.2292%2018.9792%2018.75%2019H5.25C4.77083%2018.9792%204.40625%2018.7708%204.15625%2018.375C3.94792%2017.9583%203.94792%2017.5417%204.15625%2017.125L10.9375%205.625C11.1875%205.22917%2011.5417%205.02083%2012%205ZM12%209C11.5417%209.04167%2011.2917%209.29167%2011.25%209.75V13.25C11.2917%2013.7083%2011.5417%2013.9583%2012%2014C12.4583%2013.9583%2012.7083%2013.7083%2012.75%2013.25V9.75C12.7083%209.29167%2012.4583%209.04167%2012%209ZM13%2016C13%2015.7083%2012.9062%2015.4688%2012.7188%2015.2812C12.5312%2015.0938%2012.2917%2015%2012%2015C11.7083%2015%2011.4688%2015.0938%2011.2812%2015.2812C11.0938%2015.4688%2011%2015.7083%2011%2016C11%2016.2917%2011.0938%2016.5312%2011.2812%2016.7188C11.4688%2016.9062%2011.7083%2017%2012%2017C12.2917%2017%2012.5312%2016.9062%2012.7188%2016.7188C12.9062%2016.5312%2013%2016.2917%2013%2016Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text content={textBanner} weight="medium" />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "right_buttons")} tag="div">
        {slotButton ?? (
          <>
            <SlotComp componentNeme="ButtonSoft" />
            <SlotComp componentNeme="ButtonSolid" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
