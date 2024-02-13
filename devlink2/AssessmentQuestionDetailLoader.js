import React from "react";
import * as _Builtin from "./_Builtin";
import { Skeleton } from "./Skeleton";
import * as _utils from "./utils";
import _styles from "./AssessmentQuestionDetailLoader.module.css";

export function AssessmentQuestionDetailLoader({
  as: _Component = _Builtin.Block,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "question_detail_wrapper", "is_skeleton")}
      id={_utils.cx(
        _styles,
        "w-node-_012da127-a707-fcb8-859d-a3d54a0bb864-4a0bb864"
      )}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "question_type")} tag="div">
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "slot_question_type_dropdown",
            "isflex"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "dropdown_40_loader")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "question_number_wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text_md_bold_line", "_60")}
            tag="div"
          >
            <Skeleton />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot_question_detail")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "mcq")} tag="div">
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_bold_line", "_30")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_input_slot", "isloard")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_bold_line", "_30")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_input_slot", "is_flex")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "ps_input_slot", "options")}
                tag="div"
              >
                <Skeleton />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ps_input_slot", "options")}
                tag="div"
              >
                <Skeleton />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ps_input_slot", "options")}
                tag="div"
              >
                <Skeleton />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_bold_line", "_40")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_bold_line", "_30")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "ps_input_slot",
                "isloard",
                "textarea"
              )}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_bold_line", "_30")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ps_input_slot", "isloard")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block className={_utils.cx(_styles, "ps_row")} tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "sl-checkbox-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "sl-checkbox")}
                tag="div"
              >
                <Skeleton />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text_md_bold_line", "_60")}
                tag="div"
              >
                <Skeleton />
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text_md_line", "_80")}
              tag="div"
            >
              <Skeleton />
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "delete_question")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "text_md_bold_line", "_60")}
          tag="div"
        >
          <Skeleton />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
