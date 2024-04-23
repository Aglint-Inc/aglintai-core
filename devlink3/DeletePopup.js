import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DeletePopup.module.css";

export function DeletePopup({
  as: _Component = _Builtin.Block,
  textDescription = "By Deleting this chat all the task will be discarded and the activities will no longer be accessible.",
  textTitle = "Delete Chat",
  onClickCancel = {},
  onClickDelete = {},
  slotIcon,
  isIcon = true,
  isWidget = false,
  buttonText = "Delete ",
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "assessment_duplicate_popup")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "popup_header")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "popup_title")} tag="div">
          {isIcon ? (
            <_Builtin.Block tag="div">
              {slotIcon ?? (
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "embed_flex-2")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2020%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M8.5625%203C8.375%203%208.22917%203.08333%208.125%203.25L7.65625%204H12.3438L11.875%203.25C11.7708%203.08333%2011.625%203%2011.4375%203H8.5625ZM13.5312%204H15H16H16.5C16.8125%204.02083%2016.9792%204.1875%2017%204.5C16.9792%204.8125%2016.8125%204.97917%2016.5%205H15.9375L15.125%2016.1562C15.0833%2016.6771%2014.875%2017.1146%2014.5%2017.4688C14.125%2017.8021%2013.6667%2017.9792%2013.125%2018H6.875C6.33333%2017.9792%205.875%2017.8021%205.5%2017.4688C5.125%2017.1146%204.91667%2016.6771%204.875%2016.1562L4.0625%205H3.5C3.1875%204.97917%203.02083%204.8125%203%204.5C3.02083%204.1875%203.1875%204.02083%203.5%204H4H5H6.46875L7.28125%202.71875C7.59375%202.26042%208.02083%202.02083%208.5625%202H11.4375C11.9792%202.02083%2012.4062%202.26042%2012.7188%202.71875L13.5312%204ZM14.9375%205H5.0625L5.875%2016.0625C5.89583%2016.3333%206%2016.5521%206.1875%2016.7188C6.375%2016.9062%206.60417%2017%206.875%2017H13.125C13.3958%2017%2013.625%2016.9062%2013.8125%2016.7188C14%2016.5521%2014.1042%2016.3333%2014.125%2016.0625L14.9375%205Z%22%20fill%3D%22%23D93F4C%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              )}
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-red-600")}
            tag="div"
          >
            {textTitle}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "po-up_close")}
          tag="div"
          {...onClickCancel}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "embed_flex-2", "cursor")}
            value="%3Csvg%20width%3D%2212%22%20height%3D%2216%22%20viewBox%3D%220%200%2012%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M10.7188%204.71875L7.40625%208L10.7188%2011.2812C10.9062%2011.4896%2011%2011.7292%2011%2012C11%2012.2708%2010.9062%2012.5104%2010.7188%2012.7188C10.5104%2012.9062%2010.2708%2013%2010%2013C9.72917%2013%209.48958%2012.9062%209.28125%2012.7188L6%209.40625L2.71875%2012.7188C2.51042%2012.9062%202.27083%2013%202%2013C1.72917%2013%201.48958%2012.9062%201.28125%2012.7188C1.09375%2012.5104%201%2012.2708%201%2012C1%2011.7292%201.09375%2011.4896%201.28125%2011.2812L4.59375%208L1.28125%204.71875C1.09375%204.51042%201%204.27083%201%204C1%203.72917%201.09375%203.48958%201.28125%203.28125C1.48958%203.09375%201.72917%203%202%203C2.27083%203%202.51042%203.09375%202.71875%203.28125L6%206.59375L9.28125%203.28125C9.48958%203.09375%209.72917%203%2010%203C10.2708%203%2010.5104%203.09375%2010.7188%203.28125C10.9062%203.48958%2011%203.72917%2011%204C11%204.27083%2010.9062%204.51042%2010.7188%204.71875Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "popup_body")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "text-gray-600")}
          tag="div"
        >
          {textDescription}
        </_Builtin.Block>
        {isWidget ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_widget")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "buttn_flex")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary", "greay_btn")}
            tag="div"
            {...onClickCancel}
          >
            <_Builtin.Block tag="div">{"Cancel"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "wide_button")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "button_primary", "danger")}
            tag="div"
            {...onClickDelete}
          >
            <_Builtin.Block tag="div">{buttonText}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
