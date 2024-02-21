import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./OutlinedButton.module.css";

export function OutlinedButton({
  as: _Component = _Builtin.Block,
  isPrimaryRegularVisible = false,
  isPrimaryLargeVisible = false,
  isRedRegularVisible = false,
  isRedLargeVisible = false,
  isDarkRegularVisible = false,
  isDarkLargeVisible = false,
  isAiRegularVisible = false,
  isAiLargeVisible = false,
  onClickProps = {},
  isDisableRegularVisible = false,
  isDisableLargeVisible = false,
  isFocusedVisible = false,
  slotStartIcon,
  slotEndIcon,
  textButton = "Button",
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
            className={_utils.cx(_styles, "blue-outlined")}
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
            className={_utils.cx(_styles, "blue-outlined", "large")}
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
        {isRedRegularVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "red-outlined")}
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
        {isRedLargeVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "red-outlined", "large")}
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
        {isDarkRegularVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dark-outlined")}
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
        {isDarkLargeVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "dark-outlined", "large")}
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
            className={_utils.cx(_styles, "ai-outlined")}
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
            className={_utils.cx(_styles, "ai-outlined", "large")}
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
