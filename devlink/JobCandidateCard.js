import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import * as _utils from "./utils";
import _styles from "./JobCandidateCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-958":{"id":"e-958","name":"","animationType":"custom","eventTypeId":"MOUSE_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-387","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-959"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".checkbox-4.clickable","originalId":"650c129b14ba3ec430890088|357c3017-0ddf-0e97-5411-2b2c7e739b2d","appliesTo":"CLASS"},"targets":[{"selector":".checkbox-4.clickable","originalId":"650c129b14ba3ec430890088|357c3017-0ddf-0e97-5411-2b2c7e739b2d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694975855745},"e-959":{"id":"e-959","name":"","animationType":"custom","eventTypeId":"MOUSE_SECOND_CLICK","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-388","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-958"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".checkbox-4.clickable","originalId":"650c129b14ba3ec430890088|357c3017-0ddf-0e97-5411-2b2c7e739b2d","appliesTo":"CLASS"},"targets":[{"selector":".checkbox-4.clickable","originalId":"650c129b14ba3ec430890088|357c3017-0ddf-0e97-5411-2b2c7e739b2d","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1694975855754}},"actionLists":{"a-387":{"id":"a-387","title":"applicants-[on-select]","actionItemGroups":[{"actionItems":[{"id":"a-387-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":100,"target":{"useEventTarget":"PARENT","selector":".candidate-list-item","selectorGuids":["44f30e05-337c-7b2f-f34d-5872c4ccb34b"]},"globalSwatchId":"d2a1a159","rValue":237,"bValue":255,"gValue":247,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694975862563},"a-388":{"id":"a-388","title":"applicants-[on-deselect]","actionItemGroups":[{"actionItems":[{"id":"a-388-n","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":100,"target":{"useEventTarget":"PARENT","selector":".candidate-list-item","selectorGuids":["44f30e05-337c-7b2f-f34d-5872c4ccb34b"]},"globalSwatchId":"80449ce7","rValue":255,"bValue":255,"gValue":255,"aValue":1}}]}],"useFirstGroupAsInitialState":false,"createdOn":1694975862563}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function JobCandidateCard({
  as: _Component = _Builtin.Block,
  isChecked = false,
  textOrder = "1.",
  slotProfilePic,
  textName = "Mariana Diaz",
  textRole = "Design Engineer",
  textMail = "nathan.roberts@example.com",
  textPhone = "(303) 555-0105",
  slotScore,
  textScore = "0",
  textStatus = "In Progress",
  statusTextColor = {},
  scoreTextColor = {},
  statusBgColor = {},
  textAppliedOn = "Applied on 17 Aug 2023 11:30PM",
  onClickCard = {},
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "candidate-list-item")}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block className={_utils.cx(_styles, "frame-1022")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate-resume-info")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "checkbox-wrappers-job")}
            tag="div"
          >
            {isChecked ? (
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "add-icon")}
                value="%3Csvg%20width%3D%2215%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20y%3D%220.5%22%20width%3D%2216%22%20height%3D%2216%22%20rx%3D%224%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7%209.08579L10.2929%205.79289C10.6834%205.40237%2011.3166%205.40237%2011.7071%205.79289C12.0976%206.18342%2012.0976%206.81658%2011.7071%207.20711L7.70711%2011.2071C7.31658%2011.5976%206.68342%2011.5976%206.29289%2011.2071L4.29289%209.20711C3.90237%208.81658%203.90237%208.18342%204.29289%207.79289C4.68342%207.40237%205.31658%207.40237%205.70711%207.79289L7%209.08579Z%22%20fill%3D%22white%22%2F%3E%0A%3Crect%20x%3D%221.5%22%20y%3D%222%22%20width%3D%2213%22%20height%3D%2213%22%20rx%3D%223.5%22%20stroke%3D%22%232F3941%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cdd-list-number")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm")}
              dyn={{
                bind: {},
              }}
              tag="div"
            >
              {textOrder}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "frame-1023")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "candidate-profile-info")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "slot-profile")}
                tag="div"
              >
                {slotProfilePic}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "frame-1020")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "fw-semibold")}
                  dyn={{
                    bind: {},
                  }}
                  tag="div"
                >
                  {textName}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "text-sm", "color-grey-600")}
                  dyn={{
                    bind: {},
                  }}
                  tag="div"
                >
                  {textRole}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "frame-1018")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "vectors-wrapper-46")}
                    width={11.999947547912598}
                    height={11.999947547912598}
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb624dfe721c77c1cf3f_Vectors-Wrapper.svg"
                  />
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "",
                      "text-sm",
                      "color-grey-600"
                    )}
                    dyn={{
                      bind: {},
                    }}
                    tag="div"
                  >
                    {textMail}
                  </_Builtin.Block>
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(_styles, "frame-1018")}
                  tag="div"
                >
                  <_Builtin.Image
                    className={_utils.cx(_styles, "vectors-wrapper-43")}
                    width={12}
                    height={12}
                    loading="lazy"
                    src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb634328f76be652b614_Vectors-Wrapper.svg"
                  />
                  <_Builtin.Block
                    className={_utils.cx(
                      _styles,
                      "",
                      "text-sm",
                      "color-grey-600"
                    )}
                    dyn={{
                      bind: {},
                    }}
                    tag="div"
                  >
                    {textPhone}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cdd-resume-match-score")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "vectors-wrapper-44")}
                tag="div"
              >
                {slotScore}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(
                  _styles,
                  "text-lg",
                  "fw-semibold",
                  "text-green-800",
                  "hide"
                )}
                dyn={{
                  bind: {},
                }}
                tag="div"
              >
                {"This is some text inside of a div block."}
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "resume-match-score", "hide")}
                tag="div"
              >
                {"Resume Match"}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "frame-1019")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "speedometer")}
                tag="div"
              >
                <_Builtin.Image
                  className={_utils.cx(_styles, "vectors-wrapper-47")}
                  width={10}
                  height={8.676880836486816}
                  loading="lazy"
                  src="https://uploads-ssl.webflow.com/64688200899246757fda7a37/6504bb65d61e8c06f83171d1_Vectors-Wrapper.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "div-block-288")}
                tag="div"
              >
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-yellow-600"
                  )}
                  dyn={{
                    bind: {},
                  }}
                  tag="div"
                  {...scoreTextColor}
                >
                  {textScore}
                </_Builtin.Block>
                <_Builtin.Block
                  className={_utils.cx(
                    _styles,
                    "text-sm",
                    "fw-semibold",
                    "text-yellow-600"
                  )}
                  tag="div"
                  {...scoreTextColor}
                >
                  {"/100"}
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-10")}
                tag="div"
              >
                {"Interview Score"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "frame-1024")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "frame-1096")}
            tag="div"
            {...statusBgColor}
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "text-sm",
                "fw-semibold",
                "text-blue-500"
              )}
              dyn={{
                bind: {},
              }}
              tag="div"
              {...statusTextColor}
            >
              {textStatus}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-sm", "color-grey-600")}
            tag="div"
          >
            {textAppliedOn}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      {isChecked ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "checked-bg")}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
