import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./ImportCandidates.module.css";

export function ImportCandidates({
  as: _Component = _Builtin.Block,
  slotImportCsv,
  slotImportResume,
  slotAddManually,
  onClickImportCsv = {},
  onClickImportResume = {},
  onClickAddManually = {},
  onClickClose = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "import-candidates-popup-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "ic-popup-close-btn", "clickable")}
        tag="div"
        {...onClickClose}
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icon-embed")}
          value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%20%20%3Cmask%20id%3D%22mask0_3567_21804%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%20%20%20%20%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%20%20%3C%2Fmask%3E%0A%20%20%3Cg%20mask%3D%22url(%23mask0_3567_21804)%22%3E%0A%20%20%3C%2Fg%3E%0A%3C%2Fsvg%3E"
        />
      </_Builtin.Block>
      <_Builtin.TabsWrapper
        className={_utils.cx(_styles, "tabs-3")}
        current="Tab 1"
        easing="ease"
        fadeIn={300}
        fadeOut={100}
      >
        <_Builtin.TabsMenu
          className={_utils.cx(_styles, "ic-tabs-links-wrapper")}
          tag="div"
        >
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "ic-tab-link-block")}
            data-w-tab="Tab 1"
            {...onClickImportCsv}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Import CSV"}
            </_Builtin.Block>
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "ic-tab-link-block")}
            data-w-tab="Tab 2"
            {...onClickImportResume}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Import Resume(s)"}
            </_Builtin.Block>
          </_Builtin.TabsLink>
          <_Builtin.TabsLink
            className={_utils.cx(_styles, "ic-tab-link-block")}
            data-w-tab="Tab 3"
            {...onClickAddManually}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Add manually"}
            </_Builtin.Block>
          </_Builtin.TabsLink>
        </_Builtin.TabsMenu>
        <_Builtin.TabsContent
          className={_utils.cx(_styles, "tabs-content-4")}
          tag="div"
        >
          <_Builtin.TabsPane tag="div" data-w-tab="Tab 1">
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-import")}
              tag="div"
            >
              {slotImportCsv}
            </_Builtin.Block>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane tag="div" data-w-tab="Tab 2">
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-import")}
              tag="div"
            >
              {slotImportResume}
            </_Builtin.Block>
          </_Builtin.TabsPane>
          <_Builtin.TabsPane tag="div" data-w-tab="Tab 3">
            <_Builtin.Block tag="div">{slotAddManually}</_Builtin.Block>
          </_Builtin.TabsPane>
        </_Builtin.TabsContent>
      </_Builtin.TabsWrapper>
    </_Component>
  );
}
