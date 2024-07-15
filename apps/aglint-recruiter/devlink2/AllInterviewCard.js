"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { EmptyInterviewProgress } from "./EmptyInterviewProgress";
import { ScheduleWithAgent } from "./ScheduleWithAgent";
import * as _utils from "./utils";
import _styles from "./AllInterviewCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-145":{"id":"e-145","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-92","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-146"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711378224015},"e-146":{"id":"e-146","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-93","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-145"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"74900e4c-b1fd-7af5-7374-5caedc41babe","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1711378224015},"e-149":{"id":"e-149","name":"","animationType":"preset","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-92","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-150"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c47c251b5e557c2143b9b5|843ec712-1c31-5953-08d9-cab4d8fdc4f3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c47c251b5e557c2143b9b5|843ec712-1c31-5953-08d9-cab4d8fdc4f3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713353967753},"e-150":{"id":"e-150","name":"","animationType":"preset","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-93","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-149"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"65c47c251b5e557c2143b9b5|843ec712-1c31-5953-08d9-cab4d8fdc4f3","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"65c47c251b5e557c2143b9b5|843ec712-1c31-5953-08d9-cab4d8fdc4f3","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1713353967753}},"actionLists":{"a-92":{"id":"a-92","title":"candidate job hover in","actionItemGroups":[{"actionItems":[{"id":"a-92-n","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":"none"}},{"id":"a-92-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-92-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":"flex"}},{"id":"a-92-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1711378228552},"a-93":{"id":"a-93","title":"candidate job hover out","actionItemGroups":[{"actionItems":[{"id":"a-93-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":400,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":0,"unit":""}},{"id":"a-93-n-3","actionTypeId":"GENERAL_DISPLAY","config":{"delay":300,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".div-block-1284","selectorGuids":["3492cde0-0de7-15c5-c7eb-e0c12e16d577"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1711378228552}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function AllInterviewCard({
  as: _Component = _Builtin.Block,
  textName = "Westly Snedger",
  slotCandidateImage,
  textDuration = "1 hour",
  slotPanelImage,
  textInterviewPanel = "This is some text inside of a div block.",
  textRelatedJob = "Product Designer",
  slotScheduleInfo,
  isSchedulerTable = true,
  slotCheckbox,
  isCheckBoxVisible = true,
  propsGrid = {},
  isSelected = false,
  textCurrentRole = "Prodct Designer",
  slotStatusBadge,
  slotScheduleWithAgent,
  onClickAgent = {},
  isDragVisible = false,
  onClickDrag = {},
  slotInterviewProgress,
  isResumeScoreVisible = false,
  slotResumeScore,
  onClickCard = {},
  slotBookmark,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "allinterview_row_-candidate", "new")}
      tag="div"
      {...propsGrid}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "div-block-1704")}
        id={_utils.cx(
          _styles,
          "w-node-_591be287-0ca8-0080-bb3f-55efaf5bf746-e75dcb06"
        )}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1312")}
          tag="div"
        >
          {isDragVisible ? (
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2216%22%20viewbox%3D%220%200%2014%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M14%206C13.9792%206.3125%2013.8125%206.47917%2013.5%206.5H0.5C0.1875%206.47917%200.0208333%206.3125%200%206C0.0208333%205.6875%200.1875%205.52083%200.5%205.5H13.5C13.8125%205.52083%2013.9792%205.6875%2014%206ZM14%2010C13.9792%2010.3125%2013.8125%2010.4792%2013.5%2010.5H0.5C0.1875%2010.4792%200.0208333%2010.3125%200%2010C0.0208333%209.6875%200.1875%209.52083%200.5%209.5H13.5C13.8125%209.52083%2013.9792%209.6875%2014%2010Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              {...onClickDrag}
            />
          ) : null}
        </_Builtin.Block>
        {isCheckBoxVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-958")}
            tag="div"
          >
            {slotCheckbox}
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell")}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-834", "hide")}
          tag="div"
        >
          {slotCandidateImage}
        </_Builtin.Block>
        <_Builtin.Block tag="div">
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0%204C0%201.79086%201.79086%200%204%200H28C30.2091%200%2032%201.79086%2032%204V28C32%2030.2091%2030.2091%2032%2028%2032H4C1.79086%2032%200%2030.2091%200%2028V4Z%22%20fill%3D%22%238D8D86%22%2F%3E%0A%3Crect%20width%3D%2216%22%20height%3D%2216%22%20transform%3D%22translate(8%208)%22%20fill%3D%22white%22%20fill-opacity%3D%220.01%22%2F%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M16.0001%208.93359C13.8646%208.93359%2012.1335%2010.6648%2012.1335%2012.8003C12.1335%2014.5633%2013.3135%2016.0508%2014.9268%2016.516C13.6531%2016.6712%2012.5607%2017.1217%2011.7378%2017.9327C10.6904%2018.965%2010.1602%2020.5016%2010.1602%2022.5068C10.1602%2022.7867%2010.387%2023.0135%2010.6668%2023.0135C10.9467%2023.0135%2011.1735%2022.7867%2011.1735%2022.5068C11.1735%2020.6722%2011.6565%2019.4356%2012.4491%2018.6544C13.2432%2017.8719%2014.4287%2017.4669%2016.0001%2017.4669C17.5715%2017.4669%2018.757%2017.8719%2019.5512%2018.6545C20.3437%2019.4356%2020.8268%2020.6722%2020.8268%2022.5068C20.8268%2022.7867%2021.0536%2023.0135%2021.3335%2023.0135C21.6133%2023.0136%2021.8401%2022.7867%2021.8401%2022.5069C21.8401%2020.5016%2021.3098%2018.965%2020.2624%2017.9327C19.4395%2017.1217%2018.3471%2016.6712%2017.0735%2016.516C18.6867%2016.0508%2019.8668%2014.5633%2019.8668%2012.8003C19.8668%2010.6648%2018.1356%208.93359%2016.0001%208.93359ZM13.1468%2012.8003C13.1468%2011.2244%2014.4243%209.94693%2016.0001%209.94693C17.576%209.94693%2018.8535%2011.2244%2018.8535%2012.8003C18.8535%2014.3761%2017.576%2015.6536%2016.0001%2015.6536C14.4243%2015.6536%2013.1468%2014.3761%2013.1468%2012.8003Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1267")}
          tag="div"
        >
          <Text content={textName} />
          <_Builtin.Block
            className={_utils.cx(_styles, "one-line-clamp")}
            tag="div"
          >
            <Text
              content={textCurrentRole}
              color="neutral"
              weight=""
              size="1"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1710")}
          tag="div"
        >
          {slotBookmark}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell", "hide")}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-1292")}
          tag="div"
        >
          {slotStatusBadge}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell", "hide")}
        tag="div"
        {...onClickCard}
      >
        <_Builtin.Block tag="div">{textDuration}</_Builtin.Block>
      </_Builtin.Block>
      {isResumeScoreVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_cell", "space-between")}
          tag="div"
          {...onClickCard}
        >
          {slotResumeScore}
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block
        className={_utils.cx(_styles, "candidate_cell", "z-index-none")}
        tag="div"
        {...onClickCard}
      >
        {slotInterviewProgress ?? (
          <>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-840", "hide")}
              tag="div"
            >
              <_Builtin.Block tag="div">{slotPanelImage}</_Builtin.Block>
              <_Builtin.Block tag="div">{textInterviewPanel}</_Builtin.Block>
            </_Builtin.Block>
            <EmptyInterviewProgress />
          </>
        )}
      </_Builtin.Block>
      {isSchedulerTable ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "candidate_cell", "space-between")}
          tag="div"
          {...onClickCard}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-840")}
            tag="div"
          >
            <Text content={textRelatedJob} weight="\\" />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-1282", "hide")}
            data-w-id="74900e4c-b1fd-7af5-7374-5caedc41babe"
            tag="div"
            {...onClickAgent}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2214%22%20height%3D%2217%22%20viewbox%3D%220%200%2014%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M0.25%208.5C0.270833%207.83333%200.5625%207.33333%201.125%207C1.70833%206.66667%202.29167%206.66667%202.875%207C3.4375%207.33333%203.72917%207.83333%203.75%208.5C3.72917%209.16667%203.4375%209.66667%202.875%2010C2.29167%2010.3333%201.70833%2010.3333%201.125%2010C0.5625%209.66667%200.270833%209.16667%200.25%208.5ZM5.25%208.5C5.27083%207.83333%205.5625%207.33333%206.125%207C6.70833%206.66667%207.29167%206.66667%207.875%207C8.4375%207.33333%208.72917%207.83333%208.75%208.5C8.72917%209.16667%208.4375%209.66667%207.875%2010C7.29167%2010.3333%206.70833%2010.3333%206.125%2010C5.5625%209.66667%205.27083%209.16667%205.25%208.5ZM12%206.75C12.6667%206.77083%2013.1667%207.0625%2013.5%207.625C13.8333%208.20833%2013.8333%208.79167%2013.5%209.375C13.1667%209.9375%2012.6667%2010.2292%2012%2010.25C11.3333%2010.2292%2010.8333%209.9375%2010.5%209.375C10.1667%208.79167%2010.1667%208.20833%2010.5%207.625C10.8333%207.0625%2011.3333%206.77083%2012%206.75Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-1284")}
              tag="div"
            >
              {slotScheduleWithAgent ?? <ScheduleWithAgent />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_selected_bg-copy")}
          id={_utils.cx(
            _styles,
            "w-node-eb43a66d-c6c0-56a1-cd6b-c24535cb6173-e75dcb06"
          )}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
