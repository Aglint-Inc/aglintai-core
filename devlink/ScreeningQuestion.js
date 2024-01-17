import React from "react";
import * as _Builtin from "./_Builtin";
import { UploadVideo } from "./UploadVideo";
import * as _utils from "./utils";
import _styles from "./ScreeningQuestion.module.css";

export function ScreeningQuestion({
  as: _Component = _Builtin.Block,
  slotUpload,
  slotInstructionsBrief,
  onClickGenerateAi = {},
  onClickUpload = {},
  isGenerateWithAiChecked = false,
  isUploadChecked = false,
  slotToggleInstructionVideo,
  isUploadVisible = true,
}) {
  return (
    <_Component className={_utils.cx(_styles, "div-block-562")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "new-screening-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "relative")}
          tag="div"
          id="instruction"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "instruction-wrap")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-lg", "fw-semibold")}
              tag="div"
            >
              {"Instructions"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600")}
              tag="div"
            >
              {
                "This will serve as the initial screen for candidates before they begin the assessment. You have the option to personalize the instructions."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "accessment-toggle-wrap", "mt-28")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-toggle-screening")}
              tag="div"
            >
              {slotToggleInstructionVideo}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Show Instruction video"}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "color-grey-600", "mt-12")}
              tag="div"
            >
              {
                "This video will appear to the candidate along with the instructions"
              }
            </_Builtin.Block>
          </_Builtin.Block>
          {isUploadVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "upload-wrap-edit")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-560")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "upload-radio-btn-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "upload-radio-btn-circle")}
                    tag="div"
                    {...onClickGenerateAi}
                  >
                    {isGenerateWithAiChecked ? (
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">
                    {"Generate with AI"}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "upload-radio-btn-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "upload-radio-btn-circle")}
                    tag="div"
                    {...onClickUpload}
                  >
                    {isUploadChecked ? (
                      <_Builtin.HtmlEmbed
                        className={_utils.cx(_styles, "icons")}
                        value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%228%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Ccircle%20cx%3D%228%22%20cy%3D%228%22%20r%3D%222%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
                      />
                    ) : null}
                  </_Builtin.Block>
                  <_Builtin.Block tag="div">{"Upload"}</_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-drag-drop-video")}
                tag="div"
              >
                {slotUpload ?? <UploadVideo />}
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-569")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Instructions Brief"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-brief-intro")}
              tag="div"
            >
              {slotInstructionsBrief}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fake-div-trigger")}
            tag="div"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
