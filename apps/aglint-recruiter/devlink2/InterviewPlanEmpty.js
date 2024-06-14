"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSoft } from "./ButtonSoft";
import * as _utils from "./utils";
import _styles from "./InterviewPlanEmpty.module.css";

export function InterviewPlanEmpty({
  as: _Component = _Builtin.Block,
  onClickCreateInterviewPlan = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-1224")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1227")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2236%22%20height%3D%2236%22%20viewbox%3D%220%200%2036%2036%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M18%207.5C18.7188%207.53125%2019.2656%207.84375%2019.6406%208.4375L29.7656%2025.6875C30.0781%2026.3125%2030.0781%2026.9375%2029.7656%2027.5625C29.3906%2028.1562%2028.8438%2028.4688%2028.125%2028.5H7.875C7.15625%2028.4688%206.60938%2028.1562%206.23438%2027.5625C5.92188%2026.9375%205.92188%2026.3125%206.23438%2025.6875L16.4062%208.4375C16.7812%207.84375%2017.3125%207.53125%2018%207.5ZM18%2013.5C17.3125%2013.5625%2016.9375%2013.9375%2016.875%2014.625V19.875C16.9375%2020.5625%2017.3125%2020.9375%2018%2021C18.6875%2020.9375%2019.0625%2020.5625%2019.125%2019.875V14.625C19.0625%2013.9375%2018.6875%2013.5625%2018%2013.5ZM19.5%2024C19.5%2023.5625%2019.3594%2023.2031%2019.0781%2022.9219C18.7969%2022.6406%2018.4375%2022.5%2018%2022.5C17.5625%2022.5%2017.2031%2022.6406%2016.9219%2022.9219C16.6406%2023.2031%2016.5%2023.5625%2016.5%2024C16.5%2024.4375%2016.6406%2024.7969%2016.9219%2025.0781C17.2031%2025.3594%2017.5625%2025.5%2018%2025.5C18.4375%2025.5%2018.7969%2025.3594%2019.0781%2025.0781C19.3594%2024.7969%2019.5%2024.4375%2019.5%2024Z%22%20fill%3D%22%23ED8F1C%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1226")}
          tag="div"
        >
          <Text weight="bold" content="" />
          <Text
            weight=""
            content="Setup an interview plan in the corresponding job settings to schedule interview."
            color="neutral"
          />
          <ButtonSoft
            onClickButton={onClickCreateInterviewPlan}
            textButton=""
            size="2"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
