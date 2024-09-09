"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { SlotComp } from "./SlotComp";
import { AddFilter } from "./AddFilter";
import { AllInterviewCard } from "./AllInterviewCard";
import * as _utils from "./utils";
import _styles from "./AllInterview.module.css";

export function AllInterview({
  as: _Component = _Builtin.Block,
  slotAddFilter,
  onClickSort = {},
  slotDate,
  slotAllInterviewCard,
  slotSidebar,
  styleSidebarWidth = {},
  slotPagination,
  slotFilterButton,
  isSchedulerTable = true,
  slotCheckbox,
  isCheckboxVisible = false,
  propsGrid = {},
  isResumeScoreVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "all-interview-wrap")} tag="div">
      {isSchedulerTable ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "all-interview-sub-head")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-828")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-922")}
              tag="div"
            >
              {slotFilterButton ?? (
                <SlotComp componentName="slotForFilterButton" />
              )}
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {slotAddFilter ?? <AddFilter />}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-830", "hide")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cursor-pointer")}
              tag="div"
              {...onClickSort}
            >
              {"Sort By"}
            </_Builtin.Block>
            <_Builtin.Block tag="div">{slotDate}</_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "interview_table_layout")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "interview_table_wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "all-interview-table")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "allinterview_row")}
              tag="div"
              {...propsGrid}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-1705")}
                id={_utils.cx(
                  _styles,
                  "w-node-ca9e7092-a626-5182-aaa3-2cdcebc60fe2-c14c1a99"
                )}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "div-block-1312")}
                  tag="div"
                />
                {isCheckboxVisible ? (
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-958")}
                    tag="div"
                  >
                    {slotCheckbox}
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "allinterview_header_cell")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Candidates"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "allinterview_header_cell",
                  "hide"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Status"}</_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "allinterview_header_cell",
                  "hide"
                )}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Duration"}</_Builtin.Block>
              </_Builtin.Block>
              {isResumeScoreVisible ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "allinterview_header_cell")}
                  id={_utils.cx(
                    _styles,
                    "w-node-_1206b53c-3245-8e51-7784-7c98c4fc8df1-c14c1a99"
                  )}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Resume Score"}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block
                className={_utils.cx(_styles, "allinterview_header_cell")}
                tag="div"
              >
                <_Builtin.Block tag="div">
                  {"Interview Progress"}
                </_Builtin.Block>
              </_Builtin.Block>
              {isSchedulerTable ? (
                <_Builtin.Block
                  className={_utils.cx(_styles, "allinterview_header_cell")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">{"Job"}</_Builtin.Block>
                </_Builtin.Block>
              ) : null}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1281")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "slot_candidaterow")}
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
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block tag="div" {...styleSidebarWidth}>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_sidebar")}
            tag="div"
          >
            {slotSidebar}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "job-page-nav-bar", "bg-color-add")}
          id={_utils.cx(
            _styles,
            "w-node-a2101a74-75c9-d4a3-527f-b366428e8058-c14c1a99"
          )}
          tag="div"
        >
          {slotPagination}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}