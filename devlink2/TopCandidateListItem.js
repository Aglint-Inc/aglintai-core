import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./TopCandidateListItem.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-49":{"id":"e-49","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-50"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".cv-list-column","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"},"targets":[{"selector":".cv-list-column","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1698671045933}},"actionLists":{"a-25":{"id":"a-25","title":"skeletal-loader","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"yValue":-50,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":2000,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".cv-skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698671059774}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function TopCandidateListItem({
  as: _Component = _Builtin.Block,
  onclickSelect = {},
  isChecked = false,
  slotScores,
  slotProfileImage,
  name = "Dianne Russell",
  strength = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  weakness = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  summary = "Eike led software as a Senior System Software Engineer at NVIDIA Corporation, specializing in autonomous vehicles.",
  onclickCandidate = {},
  isHighlighted = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "cv-list-row", "item", "stretch")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "top-can-row-block",
          "border-r",
          "border-b"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "cv-list-column",
            "checkbox",
            "top-can",
            "ml-0"
          )}
          tag="div"
          {...onclickSelect}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-list-checkbox")}
            tag="div"
          >
            {isChecked ? (
              <_Builtin.Image
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6530fd234c567296fc1dc71f_Frame%201%20(2).png"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "name", "top-can")}
          tag="div"
          {...onclickCandidate}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "top-can-info")}
            tag="div"
          >
            {slotScores}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "top-can-info")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-list-profile-image")}
              tag="div"
            >
              {slotProfileImage}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {name}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "top-can-highlight")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "top-can-row-block",
          "border-r",
          "border-b"
        )}
        tag="div"
        {...onclickCandidate}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "overview")}
          tag="div"
        >
          <_Builtin.Block tag="div">{strength}</_Builtin.Block>
        </_Builtin.Block>
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "top-can-highlight")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(
          _styles,
          "top-can-row-block",
          "border-r",
          "border-b"
        )}
        tag="div"
        {...onclickCandidate}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "overview")}
          tag="div"
        >
          <_Builtin.Block tag="div">{weakness}</_Builtin.Block>
        </_Builtin.Block>
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "top-can-highlight")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "top-can-row-block", "border-b")}
        tag="div"
        {...onclickCandidate}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cv-list-column", "overview")}
          tag="div"
        >
          <_Builtin.Block tag="div">{summary}</_Builtin.Block>
        </_Builtin.Block>
        {isHighlighted ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "top-can-highlight")}
            tag="div"
          />
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
