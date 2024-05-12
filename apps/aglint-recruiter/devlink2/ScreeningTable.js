"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { AddFilter } from "./AddFilter";
import { RefreshButton } from "./RefreshButton";
import { ScreeningCards } from "./ScreeningCards";
import * as _utils from "./utils";
import _styles from "./ScreeningTable.module.css";

export function ScreeningTable({
  as: _Component = _Builtin.Block,
  slotFilterButton,
  slotAddFilter,
  slotDate,
  slotScreeningCards,
  styleSidebarWidth = {},
  slotSidebar,
  isAddFilterVisible = true,
  slotRefreshButton,
  isSortVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "all-interview-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1476")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1477")}
          tag="div"
        >
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
                {slotFilterButton}
              </_Builtin.Block>
              {isAddFilterVisible ? (
                <_Builtin.Block tag="div">
                  {slotAddFilter ?? <AddFilter />}
                </_Builtin.Block>
              ) : null}
              <_Builtin.Block tag="div">
                {slotRefreshButton ?? <RefreshButton />}
              </_Builtin.Block>
            </_Builtin.Block>
            {isSortVisible ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-830")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "cursor-pointer")}
                  tag="div"
                >
                  {"Sort By"}
                </_Builtin.Block>
                <_Builtin.Block tag="div">{slotDate}</_Builtin.Block>
              </_Builtin.Block>
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "screening-candidates")}
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
                  className={_utils.cx(_styles, "screening-cand-header")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "allinterview_header_cell")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"Candidate"}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "allinterview_header_cell")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"Status"}</_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "allinterview_header_cell")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">
                      {"Screening Name"}
                    </_Builtin.Block>
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "allinterview_header_cell")}
                    tag="div"
                  >
                    <_Builtin.Block tag="div">{"Related job"}</_Builtin.Block>
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "slot_candidaterow")}
                  tag="div"
                >
                  {slotScreeningCards ?? <ScreeningCards />}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "job-page-nav-bar", "bg-color-add")}
              id={_utils.cx(
                _styles,
                "w-node-_9d0ac486-06df-480d-f5ca-d3b22bf6f41a-2bf6f3fb"
              )}
              tag="div"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1293")}
          tag="div"
          {...styleSidebarWidth}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "slot_sidebar")}
            tag="div"
          >
            {slotSidebar}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "embed_css")}
        value="%3Cstyle%3E%0A%5Bclass*%3D%22AllInterview_all-interview-table__%22%5D%7B%0A%20%20%20%20height%3A%20max-content%3B%0A%09%09min-width%3A%20calc(100vw%20-%2078px)%20!important%3B%0A%7D%0A%0A%5Bclass*%3D%22AllInterview_interview_table_wrap__%22%5D%7B%0Aheight%3A%20calc(100vh%20-%20166px)%20!important%3B%0A%7D%0A.hide_scrollbar%3A%3A-webkit-scrollbar%7B%0Adisplay%3A%20none%3B%2F*%20Hide%20scrollbar%20for%20Chrome%2C%20Safari%20and%20Opera%20*%2F%0A%7D%0A.hide_scrollbar%7B%0A%09-ms-overflow-style%3A%20none%3B%20%20%2F*%20IE%20and%20Edge%20*%2F%0A%20%20scrollbar-width%3A%20none%3B%20%20%2F*%20Firefox%20*%2F%0A%7D%0A%0A%5Bclass*%3D%22ScreeningTable_slot_candidaterow__%22%5D%7B%0Aheight%3A%20calc(100vh%20-%20120px)%20!important%3B%0Aoverflow%3Aauto%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
    </_Component>
  );
}
