import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./CandidateFilter.module.css";

<<<<<<< HEAD
=======
const _interactionsData = JSON.parse(
  '{"events":{"e-53":{"id":"e-53","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-26","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-54"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4af6e70a-8d6c-eb1e-4219-013029a9731b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4af6e70a-8d6c-eb1e-4219-013029a9731b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698824324095},"e-54":{"id":"e-54","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-27","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-53"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"4af6e70a-8d6c-eb1e-4219-013029a9731b","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"4af6e70a-8d6c-eb1e-4219-013029a9731b","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1698824324096}},"actionLists":{"a-26":{"id":"a-26","title":"filter-[hover-in]","actionItemGroups":[{"actionItems":[{"id":"a-26-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".jdet-filter-content","selectorGuids":["1d6ffd8b-25bc-41be-5f7b-1a0196c67e6e"]}}}]},{"actionItems":[{"id":"a-26-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"block","target":{"useEventTarget":"CHILDREN","selector":".jdet-filter-content","selectorGuids":["1d6ffd8b-25bc-41be-5f7b-1a0196c67e6e"]}}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698824193169},"a-27":{"id":"a-27","title":"filter-[hover-out]","actionItemGroups":[{"actionItems":[{"id":"a-27-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"value":"none","target":{"useEventTarget":"CHILDREN","selector":".jdet-filter-content","selectorGuids":["1d6ffd8b-25bc-41be-5f7b-1a0196c67e6e"]}}}]}],"useFirstGroupAsInitialState":false,"createdOn":1698824250229}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

>>>>>>> 93343c40fd4ec8c2c7ed3ae665ecc62da0695241
export function CandidateFilter({
  as: _Component = _Builtin.Block,
  filterCount = "1",
  onclickResumeClear = {},
  isResumeClear = false,
  slotResumeSlider,
  onclickInterviewClear = {},
  isInterviewClear = false,
  slotInterviewSlider,
  filterHeaderProps = {},
  isFilterBodyVisible = true,
  onclickClose = {},
  isCountVisible = false,
  onclickOverlay = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "jdet-filter-wrapper")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "jdet-filter-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "jdet-filter-top")}
          tag="div"
          {...filterHeaderProps}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "jdet-filter-trigger", "clickable")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "icon-block")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M4.4999%205.78034L0.74723%202.02768C0.532642%201.80879%200.471494%201.48632%200.589579%201.20751C0.707664%200.9287%200.981816%200.748241%201.28239%200.750013L10.7302%200.75005C11.0302%200.754265%2011.2989%200.936931%2011.4131%201.21441C11.5274%201.4919%2011.4653%201.81077%2011.2526%202.02768L7.4999%205.78034V9.93001C7.4999%2010.1841%207.37623%2010.4232%207.16755%2010.5573L5.66791%2011.5545C5.17055%2011.8861%204.4999%2011.5262%204.4999%2010.9275V5.78034ZM1.28038%201.5001L5.25008%205.46977V10.9276C5.25008%2010.9278%206.75729%209.92966%206.75729%209.92966C6.75064%209.93393%206.75008%205.46977%206.75008%205.46977L6.85991%205.35994L10.7198%201.50006L1.28038%201.5001Z%22%20fill%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block tag="div">{"Filter"}</_Builtin.Block>
          </_Builtin.Block>
          {isCountVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-filter-count")}
              tag="div"
            >
              {filterCount}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        {isFilterBodyVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "jdet-filter-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-filter-close", "clickable")}
              tag="div"
              {...onclickClose}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icon-embed")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cmask%20id%3D%22mask0_4606_3475%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%222%22%20y%3D%222%22%20width%3D%2212%22%20height%3D%2212%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M2.64645%2013.3536C2.84171%2013.5488%203.15829%2013.5488%203.35355%2013.3536L8%208.70711L12.6464%2013.3536C12.8417%2013.5488%2013.1583%2013.5488%2013.3536%2013.3536C13.5488%2013.1583%2013.5488%2012.8417%2013.3536%2012.6464L8.70711%208L13.3536%203.35355C13.5488%203.15829%2013.5488%202.84171%2013.3536%202.64645C13.1583%202.45118%2012.8417%202.45118%2012.6464%202.64645L8%207.29289L3.35355%202.64645C3.15829%202.45118%202.84171%202.45118%202.64645%202.64645C2.45118%202.84171%202.45118%203.15829%202.64645%203.35355L7.29289%208L2.64645%2012.6464C2.45118%2012.8417%202.45118%2013.1583%202.64645%2013.3536Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fmask%3E%0A%3Cg%20mask%3D%22url(%23mask0_4606_3475)%22%3E%0A%3C%2Fg%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-filter-content-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "jdet-filter-header-block")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Resume Score"}</_Builtin.Block>
                {isResumeClear ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "jdet-filter-clear-block",
                      "clickable"
                    )}
                    tag="div"
                    {...onclickResumeClear}
                  >
                    <_Builtin.Block tag="div">{"Clear"}</_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "jdet-filter-slider-block")}
                tag="div"
              >
                {slotResumeSlider}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "jdet-filter-content-block")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "jdet-filter-header-block")}
                tag="div"
              >
                <_Builtin.Block tag="div">{"Interview Score"}</_Builtin.Block>
                {isInterviewClear ? (
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "jdet-filter-clear-block",
                      "clickable"
                    )}
                    tag="div"
                    {...onclickInterviewClear}
                  >
                    <_Builtin.Block tag="div">{"Clear"}</_Builtin.Block>
                  </_Builtin.Block>
                ) : null}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "jdet-filter-slider-block")}
                tag="div"
              >
                {slotInterviewSlider}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isFilterBodyVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "jdet-filter-overlay")}
          tag="div"
          {...onclickOverlay}
        />
      ) : null}
    </_Component>
  );
}
