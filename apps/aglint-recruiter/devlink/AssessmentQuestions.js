"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./AssessmentQuestions.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1430":{"id":"e-1430","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-508","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1431"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2f606d58-cdfe-9161-1e2b-8705d8b01d45","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2f606d58-cdfe-9161-1e2b-8705d8b01d45","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699082657000},"e-1431":{"id":"e-1431","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-509","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1430"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2f606d58-cdfe-9161-1e2b-8705d8b01d45","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2f606d58-cdfe-9161-1e2b-8705d8b01d45","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699082657004},"e-1432":{"id":"e-1432","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-510","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1433"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2f606d58-cdfe-9161-1e2b-8705d8b01d49","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2f606d58-cdfe-9161-1e2b-8705d8b01d49","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699082927594},"e-1433":{"id":"e-1433","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-511","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1432"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"2f606d58-cdfe-9161-1e2b-8705d8b01d49","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"2f606d58-cdfe-9161-1e2b-8705d8b01d49","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1699082927597},"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-508":{"id":"a-508","title":"Tooltip Skill Based Question hover in","actionItemGroups":[{"actionItems":[{"id":"a-508-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".add-tool-tip-wrap","selectorGuids":["6ef9aaa4-6810-ae43-6a1a-f1cb5792d8e9"]},"value":0,"unit":""}},{"id":"a-508-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".add-tool-tip-wrap","selectorGuids":["6ef9aaa4-6810-ae43-6a1a-f1cb5792d8e9"]},"value":"none"}}]},{"actionItems":[{"id":"a-508-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".add-tool-tip-wrap","selectorGuids":["6ef9aaa4-6810-ae43-6a1a-f1cb5792d8e9"]},"value":1,"unit":""}},{"id":"a-508-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".add-tool-tip-wrap","selectorGuids":["6ef9aaa4-6810-ae43-6a1a-f1cb5792d8e9"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699082661277},"a-509":{"id":"a-509","title":"Tooltip Skill Based Question hover in 2","actionItemGroups":[{"actionItems":[{"id":"a-509-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".add-tool-tip-wrap","selectorGuids":["6ef9aaa4-6810-ae43-6a1a-f1cb5792d8e9"]},"value":0,"unit":""}},{"id":"a-509-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".add-tool-tip-wrap","selectorGuids":["6ef9aaa4-6810-ae43-6a1a-f1cb5792d8e9"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699082661277},"a-510":{"id":"a-510","title":"tooltip ai skill based question hover in","actionItemGroups":[{"actionItems":[{"id":"a-510-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".ai-tool-tip-wrap","selectorGuids":["daa06bed-fa35-bbec-df5a-71020d34563c"]},"value":0,"unit":""}},{"id":"a-510-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".ai-tool-tip-wrap","selectorGuids":["daa06bed-fa35-bbec-df5a-71020d34563c"]},"value":"none"}}]},{"actionItems":[{"id":"a-510-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ai-tool-tip-wrap","selectorGuids":["daa06bed-fa35-bbec-df5a-71020d34563c"]},"value":1,"unit":""}},{"id":"a-510-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".ai-tool-tip-wrap","selectorGuids":["daa06bed-fa35-bbec-df5a-71020d34563c"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1699082941041},"a-511":{"id":"a-511","title":"tooltip ai skill based question hover out","actionItemGroups":[{"actionItems":[{"id":"a-511-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".ai-tool-tip-wrap","selectorGuids":["daa06bed-fa35-bbec-df5a-71020d34563c"]},"value":0,"unit":""}},{"id":"a-511-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".ai-tool-tip-wrap","selectorGuids":["daa06bed-fa35-bbec-df5a-71020d34563c"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1699082941041},"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AssessmentQuestions({
  as: _Component = _Builtin.Block,
  textQuestionHeader = "Skill Based Questions",
  textQuestionCount = "This is some text inside of a div block.",
  slotQuestionVideo,
  onClickAddManually = {},
  onClickAddAi = {},
  isAddVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "wrap-skill")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "div-block-543")} tag="div">
        <_Builtin.Block className={_utils.cx(_styles, "mt-16")} tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "hide")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2210%22%20height%3D%2218%22%20viewbox%3D%220%200%2010%2018%22%20fill%3D%22none%22%3E%0A%20%20%3Ccircle%20cx%3D%221.92308%22%20cy%3D%221.9221%22%20r%3D%221.92308%22%20fill%3D%22%2387929D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%228.07737%22%20cy%3D%221.9221%22%20r%3D%221.92308%22%20fill%3D%22%2387929D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%221.92308%22%20cy%3D%228.84495%22%20r%3D%221.92308%22%20fill%3D%22%2387929D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%221.92308%22%20cy%3D%2215.7688%22%20r%3D%221.92308%22%20fill%3D%22%2387929D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%228.07737%22%20cy%3D%228.84495%22%20r%3D%221.92308%22%20fill%3D%22%2387929D%22%2F%3E%0A%20%20%3Ccircle%20cx%3D%228.07737%22%20cy%3D%2215.7688%22%20r%3D%221.92308%22%20fill%3D%22%2387929D%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "skill-question-new-screen")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "skill-header-wrapp")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "fw-semibold",
                  "first-text-capital"
                )}
                tag="div"
              >
                {textQuestionHeader}
              </_Builtin.Block>
              <_Builtin.Block tag="div">{textQuestionCount}</_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-544")}
            tag="div"
          >
            {slotQuestionVideo}
          </_Builtin.Block>
          {isAddVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "add-generate-wrappers")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "add-wrap-new")}
                data-w-id="2f606d58-cdfe-9161-1e2b-8705d8b01d45"
                tag="div"
                {...onClickAddManually}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "add-outer-wrappers")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "div-block-547")}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.10185%200.388819V5.37952H11.0926C11.2249%205.39843%2011.3005%205.47405%2011.3194%205.60637C11.3005%205.7387%2011.2249%205.81432%2011.0926%205.83323H6.10185V10.8239C6.08295%2010.9563%206.00733%2011.0319%205.875%2011.0508C5.74267%2011.0319%205.66705%2010.9563%205.64815%2010.8239V5.83323H0.657444C0.525114%205.81432%200.449498%205.7387%200.430593%205.60637C0.449498%205.47405%200.525114%205.39843%200.657444%205.37952H5.64815V0.388819C5.66705%200.256489%205.74267%200.180872%205.875%200.161968C6.00733%200.180872%206.08295%200.256489%206.10185%200.388819Z%22%20fill%3D%22black%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "add-tool-tip-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-sm")}
                    tag="div"
                  >
                    {"Add manually"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "ai-generate-new")}
                data-w-id="2f606d58-cdfe-9161-1e2b-8705d8b01d49"
                tag="div"
                {...onClickAddAi}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "generate-outer-wrappers")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "div-block-547",
                      "border-kale"
                    )}
                    tag="div"
                  >
                    <_Builtin.HtmlEmbed
                      className={_utils.cx(_styles, "icons")}
                      value="%3Csvg%20width%3D%2215%22%20height%3D%2213%22%20viewbox%3D%220%200%2015%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.3125%200.492219C12.4401%200.510448%2012.513%200.583364%2012.5312%200.710968V2.24221H14.0625C14.1901%202.26044%2014.263%202.33336%2014.2812%202.46096C14.263%202.58857%2014.1901%202.66148%2014.0625%202.67971H12.5312V4.21096C12.513%204.33856%2012.4401%204.41148%2012.3125%204.42971C12.1849%204.41148%2012.112%204.33856%2012.0937%204.21096V2.67971H10.5625C10.4349%202.66148%2010.362%202.58857%2010.3437%202.46096C10.362%202.33336%2010.4349%202.26044%2010.5625%202.24221H12.0937V0.710968C12.112%200.583364%2012.1849%200.510448%2012.3125%200.492219ZM12.3125%208.3672C12.4401%208.38543%2012.513%208.45834%2012.5312%208.58595V10.1172H14.0625C14.1901%2010.1354%2014.263%2010.2083%2014.2812%2010.3359C14.263%2010.4635%2014.1901%2010.5365%2014.0625%2010.5547H12.5312V12.0859C12.513%2012.2135%2012.4401%2012.2865%2012.3125%2012.3047C12.1849%2012.2865%2012.112%2012.2135%2012.0937%2012.0859V10.5547H10.5625C10.4349%2010.5365%2010.362%2010.4635%2010.3437%2010.3359C10.362%2010.2083%2010.4349%2010.1354%2010.5625%2010.1172H12.0937V8.58595C12.112%208.45834%2012.1849%208.38543%2012.3125%208.3672ZM4.0547%204.92189L0.937518%206.37111L4.0547%207.79298C4.14584%207.84767%204.21876%207.92058%204.27345%208.01173L5.72266%2011.1289L7.14453%208.01173C7.19922%207.92058%207.27214%207.84767%207.36328%207.79298L10.4805%206.37111L7.36328%204.92189C7.27214%204.86721%207.19922%204.79429%207.14453%204.70314L5.72266%201.58597L4.27345%204.70314C4.21876%204.79429%204.14584%204.86721%204.0547%204.92189ZM6.10547%201.39456L7.55469%204.51174L10.6719%205.96095C10.8359%206.0521%2010.918%206.1797%2010.918%206.34376C10.918%206.52606%2010.8359%206.66277%2010.6719%206.75392L7.55469%208.20313L6.10547%2011.3203C6.01433%2011.4844%205.88672%2011.5664%205.72266%2011.5664C5.54037%2011.5664%205.40365%2011.4844%205.31251%2011.3203L3.86329%208.20313L0.746113%206.75392C0.582051%206.681%200.50002%206.5534%200.50002%206.37111C0.50002%206.18882%200.582051%206.0521%200.746113%205.96095L3.86329%204.51174L5.31251%201.39456C5.40365%201.2305%205.54037%201.14847%205.72266%201.14847C5.90495%201.14847%206.03256%201.2305%206.10547%201.39456Z%22%20fill%3D%22%23012B30%22%2F%3E%0A%3C%2Fsvg%3E"
                    />
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "ai-tool-tip-wrap")}
                  tag="div"
                >
                  <_Builtin.Block
                    className={_utils.cx(_styles, "text-sm")}
                    tag="div"
                  >
                    {"Generate using Ai"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
