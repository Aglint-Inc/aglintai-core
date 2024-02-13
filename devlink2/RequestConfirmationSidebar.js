import React from "react";
import * as _Builtin from "./_Builtin";
import { GroupedSlots } from "./GroupedSlots";
import * as _utils from "./utils";
import _styles from "./RequestConfirmationSidebar.module.css";

export function RequestConfirmationSidebar({
  as: _Component = _Builtin.Block,
  onClickClose = {},
  slotSelectedSlots,
  onClickRequest = {},
  textSelectedInfo = "You have selected 5 slots across 4 panel members. ",
}) {
  return (
    <_Component className={_utils.cx(_styles, "panel_slidebar-copy")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "sidebar_contents", "height_100")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "sidebar_top")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Request Confirmation"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sidebar_close")}
            tag="div"
            {...onClickClose}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14.7812%206.28125L11.0625%2010L14.7812%2013.7188C15.0729%2014.0729%2015.0729%2014.4271%2014.7812%2014.7812C14.4271%2015.0729%2014.0729%2015.0729%2013.7188%2014.7812L10%2011.0625L6.28125%2014.7812C5.92708%2015.0729%205.57292%2015.0729%205.21875%2014.7812C4.92708%2014.4271%204.92708%2014.0729%205.21875%2013.7188L8.9375%2010L5.21875%206.28125C4.92708%205.92708%204.92708%205.57292%205.21875%205.21875C5.57292%204.92708%205.92708%204.92708%206.28125%205.21875L10%208.9375L13.7188%205.21875C14.0729%204.92708%2014.4271%204.92708%2014.7812%205.21875C15.0729%205.57292%2015.0729%205.92708%2014.7812%206.28125Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sidebar_body")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-gray-600",
                "margin_bottom_10"
              )}
              tag="div"
            >
              {textSelectedInfo}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot_list")}
              tag="div"
            >
              {slotSelectedSlots ?? (
                <>
                  <GroupedSlots />
                  <GroupedSlots />
                </>
              )}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "sidebar_button_wrap-copy")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "button_primary",
              "confirm_availability"
            )}
            tag="div"
            {...onClickRequest}
          >
            <_Builtin.Block tag="div">{"Request Confirmation"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
