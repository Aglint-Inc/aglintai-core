import React from "react";
import * as _Builtin from "./_Builtin";
import { ButtonSchedule } from "./ButtonSchedule";
import { ButtonStatus } from "./ButtonStatus";
import { AddFilter } from "./AddFilter";
import { ButtonDate } from "./ButtonDate";
import { AllInterviewCard } from "./AllInterviewCard";
import * as _utils from "./utils";
import _styles from "./AllInterview.module.css";

export function AllInterview({
  as: _Component = _Builtin.Block,
  slotSearch,
  slotSchedule,
  slotStatus,
  slotAddFilter,
  onClickSort = {},
  slotDate,
  slotAllInterviewCard,
}) {
  return (
    <_Component className={_utils.cx(_styles, "all-interview-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interview-sub-head")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-828")}
          tag="div"
        >
          <_Builtin.Block tag="div">{slotSearch}</_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotSchedule ?? <ButtonSchedule />}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotStatus ?? <ButtonStatus />}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotAddFilter ?? <AddFilter />}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-830")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cursor-pointer")}
            tag="div"
            {...onClickSort}
          >
            {"Sort By"}
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            {slotDate ?? <ButtonDate />}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "all-interview-table")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-832")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-217")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Candidate"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-217")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Status"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-217")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Schedule Type"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-138")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Duration"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-300")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Interview Panel"}</_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-831", "width-300")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Related Job"}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-836")}
          tag="div"
        >
          {slotAllInterviewCard ?? (
            <>
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
              <AllInterviewCard />
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.all-interview-table%7B%0Aheight%3Acalc(100vh%20-%2060px)%3B%0A%7D%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
