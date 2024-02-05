import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TeamListItem.module.css";

export function TeamListItem({
  as: _Component = _Builtin.Block,
  slotUserRole,
  userStatusProps = {},
  userStatusText = "Active",
  dateText = "29 Aug 2023",
  onClickRemove = {},
  userName = "Roberto Carlos",
  userEmail = "roberto@sample.com",
  slotProfileImage,
  isDeleteVisible = true,
  isDeleteDisable = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "tu-list-block")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item", "user")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc8c-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-user-image")}
          tag="div"
        >
          {slotProfileImage}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-user-info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {userName}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {userEmail}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc93-087efc8b"
        )}
        tag="div"
      >
        {slotUserRole}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "tu-list-item")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-status")}
          tag="div"
          {...userStatusProps}
        >
          {userStatusText}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc98-087efc8b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text-color-black")}
          tag="div"
        >
          {dateText}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "tu-list-item", "actions")}
        id={_utils.cx(
          _styles,
          "w-node-a60860aa-9493-87fc-f445-b3f1087efc9b-087efc8b"
        )}
        tag="div"
      >
        {isDeleteVisible ? (
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed", "cursor-pointer")}
            value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewBox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.03125%203.5C8.94792%203.5%208.88542%203.54167%208.84375%203.625L8.25%204.5H12.7812L12.1875%203.625C12.125%203.54167%2012.0521%203.5%2011.9688%203.5H9.03125ZM14.5625%204.5H15H16.5H16.75C17.2083%204.54167%2017.4583%204.79167%2017.5%205.25C17.4583%205.70833%2017.2083%205.95833%2016.75%206H16.375L15.625%2016.1562C15.5833%2016.6771%2015.375%2017.1146%2015%2017.4688C14.625%2017.8021%2014.1771%2017.9792%2013.6562%2018H7.34375C6.82292%2017.9792%206.375%2017.8021%206%2017.4688C5.625%2017.1146%205.41667%2016.6771%205.375%2016.1562L4.625%206H4.25C3.79167%205.95833%203.54167%205.70833%203.5%205.25C3.54167%204.79167%203.79167%204.54167%204.25%204.5H4.5H6H6.4375L7.59375%202.78125C7.94792%202.28125%208.42708%202.02083%209.03125%202H11.9688C12.5729%202.02083%2013.0625%202.28125%2013.4375%202.78125L14.5625%204.5ZM14.875%206H6.125L6.84375%2016.0312C6.90625%2016.3229%207.07292%2016.4792%207.34375%2016.5H13.6562C13.9271%2016.4792%2014.0938%2016.3229%2014.1562%2016.0312L14.875%206Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            {...onClickRemove}
          />
        ) : null}
        {isDeleteDisable ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "delete-disable-wrap")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icon-embed")}
              value="%3Csvg%20width%3D%2221%22%20height%3D%2220%22%20viewBox%3D%220%200%2021%2020%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M9.03125%203.5C8.94792%203.5%208.88542%203.54167%208.84375%203.625L8.25%204.5H12.7812L12.1875%203.625C12.125%203.54167%2012.0521%203.5%2011.9688%203.5H9.03125ZM14.5625%204.5H15H16.5H16.75C17.2083%204.54167%2017.4583%204.79167%2017.5%205.25C17.4583%205.70833%2017.2083%205.95833%2016.75%206H16.375L15.625%2016.1562C15.5833%2016.6771%2015.375%2017.1146%2015%2017.4688C14.625%2017.8021%2014.1771%2017.9792%2013.6562%2018H7.34375C6.82292%2017.9792%206.375%2017.8021%206%2017.4688C5.625%2017.1146%205.41667%2016.6771%205.375%2016.1562L4.625%206H4.25C3.79167%205.95833%203.54167%205.70833%203.5%205.25C3.54167%204.79167%203.79167%204.54167%204.25%204.5H4.5H6H6.4375L7.59375%202.78125C7.94792%202.28125%208.42708%202.02083%209.03125%202H11.9688C12.5729%202.02083%2013.0625%202.28125%2013.4375%202.78125L14.5625%204.5ZM14.875%206H6.125L6.84375%2016.0312C6.90625%2016.3229%207.07292%2016.4792%207.34375%2016.5H13.6562C13.9271%2016.4792%2014.0938%2016.3229%2014.1562%2016.0312L14.875%206Z%22%20fill%3D%22%23D8DCDE%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
