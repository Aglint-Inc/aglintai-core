"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./Stepper.module.css";

export function Stepper({
  as: _Component = _Builtin.Block,
  textStepName = "Pick slot for day 1",
  isLeftLine = true,
  isRightLine = true,
  isUpcoming = true,
  isCurrent = false,
  isCompleted = false,
  onClickCompleted = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "stepper")} tag="div">
      {isUpcoming ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "stepper_upcoming")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "stepper_state")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "connector")}
              tag="div"
            >
              {isLeftLine ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "connector_line",
                    "upcoming_step"
                  )}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2233%22%20height%3D%2232%22%20viewBox%3D%220%200%2033%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2216.333%22%20cy%3D%2216%22%20r%3D%2215%22%20stroke%3D%22%23D1D5DB%22%20stroke-width%3D%222%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "connector")}
              tag="div"
            >
              {isRightLine ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "connector_line",
                    "upcoming_step"
                  )}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "stepper_text")}
            tag="div"
          >
            <Text content={textStepName} color="neutral" weight="1" size="1" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isCurrent ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "stepper_active")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "stepper_state")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "connector")}
              tag="div"
            >
              {isLeftLine ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "connector_line")}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed_flex")}
              value="%3Csvg%20width%3D%2233%22%20height%3D%2232%22%20viewBox%3D%220%200%2033%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2216.667%22%20cy%3D%2216%22%20r%3D%2215%22%20stroke%3D%22%23F76B15%22%20stroke-width%3D%222%22%2F%3E%0A%3Ccircle%20cx%3D%2216.667%22%20cy%3D%2216%22%20r%3D%225%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "connector")}
              tag="div"
            >
              {isRightLine ? (
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "connector_line",
                    "upcoming_step"
                  )}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "stepper_text")}
            tag="div"
          >
            <Text
              content={textStepName}
              color="accent"
              weight="medium"
              size="1"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isCompleted ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "stepper_completed")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "stepper_state")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "connector")}
              tag="div"
            >
              {isLeftLine ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "connector_line")}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "completed_onclick")}
              tag="div"
              {...onClickCompleted}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "embed_flex")}
                value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%2216%22%20cy%3D%2216%22%20r%3D%2216%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3Cpath%20d%3D%22M10.167%2016.833L13.5003%2020.1663L21.8337%2011.833%22%20stroke%3D%22white%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "connector")}
              tag="div"
            >
              {isRightLine ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "connector_line")}
                  tag="div"
                />
              ) : null}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "stepper_text")}
            tag="div"
          >
            <Text content={textStepName} size="1" />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
