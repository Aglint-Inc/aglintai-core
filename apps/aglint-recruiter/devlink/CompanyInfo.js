"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./CompanyInfo.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CompanyInfo({
  as: _Component = _Builtin.Block,
  slotAdditionalInfoForm,
  onClickAddLocation = {},
  onClickAddAvailableRoles = {},
  onClickAddDepartments = {},
  onClickAddTechStacks = {},
  slotLocation,
  slotDepartmentPills,
  slotTechStackPills,
  slotRolesPills,
  isSpecialistVisible = true,
  isAvailableRolesVisible = true,
  slotEmploymentType,
  isEditable = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "company-info-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-info-wrapper", "first")}
        tag="div"
      >
        <_Builtin.Block tag="div">
          <Text weight="medium" content="Office Location" />
          <Text
            weight=""
            content="Include office locations to organize data, schedule effectively, and identify correct time zones."
            color="neutral"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-location-saved-wrappers")}
          tag="div"
        >
          {slotLocation ?? <SlotComp componentName="CompanyLocation" />}
        </_Builtin.Block>
        {isEditable ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-add-skill-btn-new")}
            tag="div"
            {...onClickAddLocation}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201C5.69318%201%205.44444%201.24873%205.44444%201.55556V5.44444H1.55556C1.24873%205.44444%201%205.69318%201%206C1%206.30683%201.24873%206.55556%201.55556%206.55556H5.44444V10.4444C5.44444%2010.7513%205.69318%2011%206%2011C6.30683%2011%206.55556%2010.7513%206.55556%2010.4444V6.55556H10.4444C10.7513%206.55556%2011%206.30683%2011%206C11%205.69318%2010.7513%205.44444%2010.4444%205.44444H6.55556V1.55556C6.55556%201.24873%206.30683%201%206%201Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Add Location"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cs-info-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-header")}
          tag="div"
        >
          <Text weight="medium" content="Departments" />
          <Text
            weight=""
            content="Catalog your departments to sort and filter data efficiently, aiding in job posting and scheduling."
            color="neutral"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-department-pill")}
          tag="div"
        >
          {slotDepartmentPills}
        </_Builtin.Block>
        {isEditable ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "cj-add-skill-btn-new")}
            tag="div"
            font-color="accent"
            {...onClickAddDepartments}
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201C5.69318%201%205.44444%201.24873%205.44444%201.55556V5.44444H1.55556C1.24873%205.44444%201%205.69318%201%206C1%206.30683%201.24873%206.55556%201.55556%206.55556H5.44444V10.4444C5.44444%2010.7513%205.69318%2011%206%2011C6.30683%2011%206.55556%2010.7513%206.55556%2010.4444V6.55556H10.4444C10.7513%206.55556%2011%206.30683%2011%206C11%205.69318%2010.7513%205.44444%2010.4444%205.44444H6.55556V1.55556C6.55556%201.24873%206.30683%201%206%201Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block tag="div">{"Add Departments"}</_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isSpecialistVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-info-header")}
            tag="div"
          >
            <Text weight="medium" content="Specialties" />
            <Text
              weight=""
              content="Define your specialties to streamline the search and match process for job candidates."
              color="neutral"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-department-pill")}
            tag="div"
          >
            {slotTechStackPills}
          </_Builtin.Block>
          {isEditable ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-add-skill-btn-new")}
              tag="div"
              font-color="accent"
              {...onClickAddTechStacks}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201C5.69318%201%205.44444%201.24873%205.44444%201.55556V5.44444H1.55556C1.24873%205.44444%201%205.69318%201%206C1%206.30683%201.24873%206.55556%201.55556%206.55556H5.44444V10.4444C5.44444%2010.7513%205.69318%2011%206%2011C6.30683%2011%206.55556%2010.7513%206.55556%2010.4444V6.55556H10.4444C10.7513%206.55556%2011%206.30683%2011%206C11%205.69318%2010.7513%205.44444%2010.4444%205.44444H6.55556V1.55556C6.55556%201.24873%206.30683%201%206%201Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Add Specialities"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isAvailableRolesVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-info-header")}
            tag="div"
          >
            <Text weight="medium" content="Available Roles" />
            <Text
              weight=""
              content="List available roles to assist in filtering applications and matching candidates to job positions."
              color="neutral"
            />
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "slot-department-pill")}
            tag="div"
          >
            {slotRolesPills}
          </_Builtin.Block>
          {isEditable ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-add-skill-btn-new")}
              tag="div"
              font-color="accent"
              {...onClickAddAvailableRoles}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewbox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201C5.69318%201%205.44444%201.24873%205.44444%201.55556V5.44444H1.55556C1.24873%205.44444%201%205.69318%201%206C1%206.30683%201.24873%206.55556%201.55556%206.55556H5.44444V10.4444C5.44444%2010.7513%205.69318%2011%206%2011C6.30683%2011%206.55556%2010.7513%206.55556%2010.4444V6.55556H10.4444C10.7513%206.55556%2011%206.30683%2011%206C11%205.69318%2010.7513%205.44444%2010.4444%205.44444H6.55556V1.55556C6.55556%201.24873%206.30683%201%206%201Z%22%20fill%3D%22currentColor%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block tag="div">{"Add Roles"}</_Builtin.Block>
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
