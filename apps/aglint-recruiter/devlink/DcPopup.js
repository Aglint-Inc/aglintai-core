"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { IconButtonGhost } from "./IconButtonGhost";
import { ConnectedJobsList } from "./ConnectedJobsList";
import { ButtonSoft } from "./ButtonSoft";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./DcPopup.module.css";

export function DcPopup({
  as: _Component = _Builtin.Block,
  slotButtons,
  slotBody,
  popupName = "Delete",
  onClickClosePopup = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "dc_popup")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "dc_modal_header")}
        tag="div"
      >
        <Text content={popupName} weight="medium" />
        <IconButtonGhost
          onClickButton={onClickClosePopup}
          iconName="close"
          iconWeight="thin"
          iconColor="neutral"
          color="neutral"
          size="1"
        />
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "dc_modal_body")} tag="div">
        {slotBody ?? (
          <>
            <_Builtin.Block
              className={_utils.cx(_styles, "global_banner", "info_short")}
              id={_utils.cx(
                _styles,
                "w-node-_53f3e647-6016-f73e-1fd3-d3ac4c50a7e3-4c50a7dc"
              )}
              tag="div"
              data-banner-color="warning"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "info_main_block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "text_with_icon")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_53f3e647-6016-f73e-1fd3-d3ac4c50a7e5-4c50a7dc"
                  )}
                  tag="div"
                  data-color="inherit"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "slot_icon")}
                    tag="div"
                  >
                    <_Builtin.Block
                      className={_utils.cx(_styles, "icon_general-2")}
                      tag="div"
                      icon-font="true"
                      icon-size="3"
                      icon-weight="medium"
                      icon-color="inherit"
                    >
                      <_Builtin.Block tag="div">{"info"}</_Builtin.Block>
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    tag="div"
                    text-align="left"
                    fontSize="2"
                    fontWeight="regular"
                    font-color="inherit"
                    high-contrast="false"
                  >
                    {"some text content which wwill come in one line"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <ConnectedJobsList />
            <Text
              content="Confirm by typing the workflow name"
              color="neutral"
            />
          </>
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "dc_modal_bottom")}
        tag="div"
      >
        {slotButtons ?? (
          <>
            <ButtonSoft size="2" color="neutral" />
            <ButtonSolid size="2" color="error" />
          </>
        )}
      </_Builtin.Block>
    </_Component>
  );
}
