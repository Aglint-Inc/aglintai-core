"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./BookmarkEmpty.module.css";

export function BookmarkEmpty({ as: _Component = _Builtin.Block }) {
  return (
    <_Component className={_utils.cx(_styles, "bookmark-empty-wrap")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-608")} tag="div">
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%220%200%2040%2040%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M20.0191%2033.5398L11.1568%2039.5857C8.62012%2040.9092%205.80241%2038.7709%206.5007%2035.858L9.19804%2025.5381L0.966379%2018.529C-1.04252%2016.4328%200.290975%2012.8151%203.03348%2012.8181L13.2513%2012.191L17.0891%202.37511C17.8383%20-0.752051%2022.2019%20-0.752051%2022.8788%202.14386L26.7777%2012.158L36.9095%2012.4696C39.7492%2012.4696%2041.0827%2016.0873%2038.9489%2018.3012L30.8355%2025.1993L33.5484%2035.8936C34.2416%2038.7871%2030.9769%2041.0581%2028.7164%2039.4856L20.0191%2033.5398ZM20.0239%2029.4099L20.9313%2030.0302L30.2563%2036.4052L27.0913%2023.9291L27.9194%2023.225L36.5308%2015.9146L24.5259%2015.5462L24.1196%2014.5026L20.0321%203.96159L15.5347%2015.5131L14.4913%2015.5771L3.51562%2016.2479L12.9633%2024.2804L12.6799%2025.3646L9.79434%2036.4031L20.0239%2029.4099Z%22%20fill%3D%22%23C2C8CC%22%20style%3D%22fill%3A%23C2C8CC%3Bfill%3Acolor(display-p3%200.7600%200.7827%200.8000)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block tag="div">
          {"No bookmarked candidates"}
          <br />
          {"Tap on the star icon next to the candidate to bookmark them"}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
