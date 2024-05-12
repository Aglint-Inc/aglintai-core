import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./AssistantCandidateEducation.module.css";

export function AssistantCandidateEducation({
  as: _Component = _Builtin.Block,
  slotProfile,
  textName = "Marvin McKinney",
  isHeaderEducation = true,
  isHeaderExperience = true,
  slotCards,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "res-profile-detail-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "rp-candidate-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "chat-profile-list-image")}
          tag="div"
        >
          {slotProfile}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textName}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rp-detail-body")}
        tag="div"
      >
        {isHeaderEducation ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-sm-3",
              "fw-semibold",
              "text-grey-400"
            )}
            tag="div"
          >
            {"Education"}
          </_Builtin.Block>
        ) : null}
        {isHeaderExperience ? (
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-sm-3",
              "fw-semibold",
              "text-grey-400"
            )}
            tag="div"
          >
            {"Experience"}
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "rp-detail-list")}
          tag="div"
        >
          {slotCards ?? (
            <>
              <_Builtin.Block
                className={_utils.cx(_styles, "rp-edu-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "icon-block-5", "_40x40")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "flex-v", "gap-4")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"University Of Waterloo"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-gray-600")}
                    tag="div"
                  >
                    {"Masters in Computer science"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-sm-3",
                      "fw-semibold",
                      "text-gray-400"
                    )}
                    tag="div"
                  >
                    {"May 2015"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "rp-edu-block")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "icon-block-5", "_40x40")}
                  tag="div"
                />
                <_Builtin.Block
                  className={_utils.cx(_styles, "flex-v", "gap-4")}
                  tag="div"
                >
                  <_Builtin.Block tag="div">
                    {"University Of Waterloo"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-gray-600")}
                    tag="div"
                  >
                    {"Masters in Computer science"}
                  </_Builtin.Block>
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "text-sm-3",
                      "fw-semibold",
                      "text-gray-400"
                    )}
                    tag="div"
                  >
                    {"May 2015"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </>
          )}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
