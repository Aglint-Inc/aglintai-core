import React from "react";
import * as _Builtin from "./_Builtin";
import { ResImportListItem } from "./ResImportListItem";
import * as _utils from "./utils";
import _styles from "./ResumeImportBody.module.css";

export function ResumeImportBody({
  as: _Component = _Builtin.Block,
  documentsCount = "0 Documents",
  slotButton,
  slotList,
}) {
  return (
    <_Component className={_utils.cx(_styles, "res-import-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "res-import-list-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "res-import-list")}
          tag="div"
        >
          {slotList ?? (
            <ResImportListItem
              isPdf={true}
              fileName="resume_name_of_candidate.Pdf"
              fileSize="360 kb"
            />
          )}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "res-import-cta-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "res-import-cta-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "text-gray-600")}
            tag="div"
          >
            {documentsCount}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
