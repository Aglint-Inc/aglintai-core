"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./ImportCsv.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function ImportCsv({
  as: _Component = _Builtin.Block,
  isListingCountVisible = true,
  textListingCount = "Listing 320 candidates",
  onClickReupload = {},
  isImportDescVisible = true,
  textCountExistinJob = "130 candidates already exists in this job",
  onClickImportRemaining = {},
  slotImportCandidatesCsv,
  slotReuploadButton,
  isExistWarningVisible = true,
  onClickImport = {},
  isImportButtonVisible = false,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component tag="div">
      {isListingCountVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-lisitening-count")}
          tag="div"
        >
          <Text content={textListingCount} color="neutral" />
        </_Builtin.Block>
      ) : null}
      {isImportDescVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-desc-wrap")}
          tag="div"
        >
          <Text
            content="Import applicants by uploading a CSV or XLSX file containing First Name, Last Name, Email, and a link to their resume (PDF, DOC, or TXT format). Simply drag and drop your file or click to upload."
            color="neutral"
          />
        </_Builtin.Block>
      ) : null}
      <_Builtin.Block tag="div">
        {slotImportCandidatesCsv ?? (
          <SlotComp componentName="ImportCandidatesCsv" />
        )}
      </_Builtin.Block>
      {isListingCountVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-bottom-wrap")}
          tag="div"
        >
          {isExistWarningVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "ic-bottom-left")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M7.5%2016C3.36%2016%200%2012.64%200%208.5C0%204.36%203.36%201%207.5%201C11.64%201%2015%204.36%2015%208.5C15%2012.64%2011.64%2016%207.5%2016ZM7%2012.5C7%2012.78%207.22%2013%207.5%2013C7.78%2013%208%2012.78%208%2012.5V8C8%207.72%207.78%207.5%207.5%207.5C7.22%207.5%207%207.72%207%208V12.5ZM7.5%204C6.95%204%206.5%204.45%206.5%205C6.5%205.55%206.95%206%207.5%206C8.05%206%208.5%205.55%208.5%205C8.5%204.45%208.05%204%207.5%204Z%22%20fill%3D%22var(--accent-9)%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <Text content={textCountExistinJob} color="accent" />
            </_Builtin.Block>
          ) : null}
          <_Builtin.Block
            className={_utils.cx(_styles, "flex-horizontal", "gap-space-2")}
            tag="div"
            {...onClickImportRemaining}
          >
            <_Builtin.Block tag="div">
              {slotReuploadButton ?? <SlotComp componentName="Button" />}
            </_Builtin.Block>
            <ButtonSolid
              isRightIcon={false}
              isLeftIcon={false}
              size="2"
              textButton="Import"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
      {isImportButtonVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "ic-bottom-wrap")}
          tag="div"
        >
          <_Builtin.Block tag="div" />
          <_Builtin.Block tag="div" {...onClickImport}>
            <ButtonSolid
              isRightIcon={false}
              isLeftIcon={false}
              size="2"
              textButton="Import"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
