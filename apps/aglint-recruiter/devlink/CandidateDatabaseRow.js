"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./CandidateDatabaseRow.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1450":{"id":"e-1450","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-526","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1451"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-column-2","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-column-2","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1698671045933}},"actionLists":{"a-526":{"id":"a-526","title":"skeletal-loader","actionItemGroups":[{"actionItems":[{"id":"a-526-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{},"xValue":-100,"yValue":-50,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-526-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":2000,"target":{},"xValue":100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-526-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{},"xValue":-100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698671059774}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CandidateDatabaseRow({
  as: _Component = _Builtin.Block,
  onClickCheck = {},
  isChecked = false,
  slotNameAvatar,
  textName = "Dianne Russell",
  textAppliedJob = "Assosiate software engineer",
  textEmail = "sara.cruz@example.com",
  textLocation = "Berlin, Germany",
  textPhone = "(704) 555-0127",
  onClickList = {},
  isSelected = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cv-list-row-2", "item")}
      tag="div"
      {...onClickList}
    >
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-item-highlight")}
          tag="div"
        />
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-column-2", "checkbox")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-checkbox-2")}
          tag="div"
          {...onClickCheck}
        >
          {isChecked ? (
            <_Builtin.Image
              className={_utils.cx(_styles, "cli-check-image")}
              loading="lazy"
              width="auto"
              height="auto"
              alt=""
              src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/6544e03f56a77e2226e848a3_Frame%201%20(2).png"
            />
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-list-row-main")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-2", "name-cd-wrap")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cdr-profile-image-wrap")}
            tag="div"
          >
            {slotNameAvatar}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "line-clamp-1")}
            tag="div"
          >
            {textName}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-2", "title")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {"Assosiate software engineer"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-2", "score")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "line-clamp-1")}
            tag="div"
          >
            {textAppliedJob}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-2", "email")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "line-clamp-1")}
            tag="div"
          >
            {textEmail}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-2", "locations")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "line-clamp-1")}
            tag="div"
          >
            {textLocation}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column-2", "phone-num")}
          tag="div"
        >
          <_Builtin.Block tag="div">{textPhone}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.HtmlEmbed value="%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%0A%0A%3C%2Fstyle%3E" />
    </_Component>
  );
}
