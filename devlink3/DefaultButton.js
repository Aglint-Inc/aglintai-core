import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./DefaultButton.module.css";

export function DefaultButton({
  as: _Component = _Builtin.Block,
  isPrimaryRegularVisible = false,
  isPrimaryLargeVisible = false,
  isAiRegularVisible = false,
  isAiLargeVisible = false,
  isDisableRegularVisible = false,
  isDisableLargeVisible = false,
  isFocusedVisible = false,
  slotStartIcon,
  slotEndIcon,
  textButton = "Button",
  onClickProps = {},
  isDangerRegularVisible = false,
  isDangerLargeVisible = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "default-button-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "default-button-sub-wrappers")}
        tag="div"
      >
        {isPrimaryRegularVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "blue-button")}
            tag="div"
            {...onClickProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotStartIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-text")}
              tag="div"
            >
              {textButton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotEndIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isPrimaryLargeVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "blue-button", "large")}
            tag="div"
            {...onClickProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotStartIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-text")}
              tag="div"
            >
              {textButton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotEndIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isAiRegularVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "ai-button")}
            tag="div"
            {...onClickProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotStartIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-text")}
              tag="div"
            >
              {textButton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotEndIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isAiLargeVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "ai-button", "large")}
            tag="div"
            {...onClickProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotStartIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-text")}
              tag="div"
            >
              {textButton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotEndIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isDangerRegularVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "red-button")}
            tag="div"
            {...onClickProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotStartIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-text")}
              tag="div"
            >
              {textButton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotEndIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isDangerLargeVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "red-button", "large")}
            tag="div"
            {...onClickProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotStartIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-text")}
              tag="div"
            >
              {textButton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotEndIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isDangerRegularVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dark-button")}
            tag="div"
            {...onClickProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotStartIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-text")}
              tag="div"
            >
              {textButton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotEndIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        {isDangerRegularVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dark-button", "large")}
            tag="div"
            {...onClickProps}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotStartIcon}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-text")}
              tag="div"
            >
              {textButton}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "button-icon")}
              tag="div"
            >
              {slotEndIcon}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isDisableRegularVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "disabeld-button")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "button-icon")}
            tag="div"
          >
            {slotStartIcon}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button-text")}
            tag="div"
          >
            {textButton}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button-icon")}
            tag="div"
          >
            {slotEndIcon}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isDisableLargeVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "disabeld-button", "large")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "button-icon")}
            tag="div"
          >
            {slotStartIcon}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button-text")}
            tag="div"
          >
            {textButton}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "button-icon")}
            tag="div"
          >
            {slotEndIcon}
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isFocusedVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "button-focused", "primary")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
