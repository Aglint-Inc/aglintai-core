import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { CompanyLocation } from "./CompanyLocation";
import * as _utils from "./utils";
import _styles from "./CompanyInfo.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1352":{"id":"e-1352","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-471","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1353"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"c08cb0d6-e773-39d6-99d2-4bcaadb6be92","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"c08cb0d6-e773-39d6-99d2-4bcaadb6be92","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365602},"e-1353":{"id":"e-1353","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-472","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1352"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".email-temp-wrap","originalId":"c08cb0d6-e773-39d6-99d2-4bcaadb6be92","appliesTo":"CLASS"},"targets":[{"selector":".email-temp-wrap","originalId":"c08cb0d6-e773-39d6-99d2-4bcaadb6be92","appliesTo":"CLASS"}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1697459365605}},"actionLists":{"a-471":{"id":"a-471","title":"Email Interaction Hover In","actionItemGroups":[{"actionItems":[{"id":"a-471-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-471-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-471-n-2","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]},{"actionItems":[{"id":"a-471-n-3","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":1,"unit":""}},{"id":"a-471-n-6","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":248,"bValue":249,"gValue":249,"aValue":1}},{"id":"a-471-n-4","actionTypeId":"GENERAL_DISPLAY","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"flex"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1697459378737},"a-472":{"id":"a-472","title":"Email Interaction Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-472-n-4","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":0,"unit":""}},{"id":"a-472-n-5","actionTypeId":"STYLE_BACKGROUND_COLOR","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".email-temp-wrap","selectorGuids":["9f457289-11ac-9035-e0da-78b37faff5f5"]},"globalSwatchId":"","rValue":255,"bValue":255,"gValue":255,"aValue":1}},{"id":"a-472-n-6","actionTypeId":"GENERAL_DISPLAY","config":{"delay":200,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".text-sm.color-blue-600","selectorGuids":["dc76774b-0be0-98ff-0afc-63b29c34e7b8","b60a7de9-41b3-cc43-d25a-3f8dab06d524"]},"value":"none"}}]}],"useFirstGroupAsInitialState":false,"createdOn":1697459378737}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CompanyInfo({
  as: _Component = _Builtin.Block,
  slotBasicForm,
  slotAdditionalInfoForm,
  slotCompanyLogo,
  onClickChangeLogo = {},
  textLogoUpdate = "Change Logo",
  onClickAddLocation = {},
  onClickAddAvailableRoles = {},
  onClickAddDepartments = {},
  onClickAddTechStacks = {},
  slotLocation,
  slotDepartmentPills,
  slotTechStackPills,
  slotRolesPills,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "rd-company-primary-info-2")}
      tag="div"
    >
      <_Builtin.Block className={_utils.cx(_styles, "profile-block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-lg",
              "fw-semibold",
              "text-grey-500"
            )}
            tag="div"
          >
            {"Basic Info"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "Provide the company details for display on your public job listings page. You can preview your listings here."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-348", "top-align")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "company-details-profile")}
            tag="div"
          >
            {slotCompanyLogo}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "change-profile-content")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "content-12", "clickable")}
              tag="div"
              {...onClickChangeLogo}
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "text-blue-500")}
                tag="div"
              >
                {textLogoUpdate}
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-sm", "color-grey-600")}
              tag="div"
            >
              {
                "Please upload your logo in PNG/jpeg format with dimensions of 512px x 512px and ensure it's under 5 MB."
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-inputs-wrapper")}
        tag="div"
      >
        {slotBasicForm}
      </_Builtin.Block>
      <_Builtin.Block className={_utils.cx(_styles, "profile-block")} tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-header")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(
              _styles,
              "text-lg",
              "fw-semibold",
              "text-grey-500"
            )}
            tag="div"
          >
            {"Additional Info"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "Providing extra details helps us better understand your requirements, offering a more personalized recruitment experience."
            }
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "profile-inputs-wrapper")}
          tag="div"
        >
          {slotAdditionalInfoForm}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-wrapper", "margin-0")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-info-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Office Locations"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Consider adding your office locations; they'll be helpful when drafting job posts."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "flex-vertical-left", "gap-4")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-location-saved-wrappers")}
              tag="div"
            >
              {slotLocation ?? <CompanyLocation />}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-add-skill-btn-new")}
              tag="div"
              {...onClickAddLocation}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "add-icon-2")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201C5.69318%201%205.44444%201.24873%205.44444%201.55556V5.44444H1.55556C1.24873%205.44444%201%205.69318%201%206C1%206.30683%201.24873%206.55556%201.55556%206.55556H5.44444V10.4444C5.44444%2010.7513%205.69318%2011%206%2011C6.30683%2011%206.55556%2010.7513%206.55556%2010.4444V6.55556H10.4444C10.7513%206.55556%2011%206.30683%2011%206C11%205.69318%2010.7513%205.44444%2010.4444%205.44444H6.55556V1.55556C6.55556%201.24873%206.30683%201%206%201Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "label-13")}
                tag="div"
              >
                {"Add location"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-wrapper", "margin-0")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-info-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Departments"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Consider listing all departments; they'll be helpful when creating job posts."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "flex-vertical-left", "gap-4")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-department-saved-wrappers")}
              tag="div"
            >
              {slotDepartmentPills}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-add-skill-btn-new")}
              tag="div"
              {...onClickAddDepartments}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "add-icon-2")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201C5.69318%201%205.44444%201.24873%205.44444%201.55556V5.44444H1.55556C1.24873%205.44444%201%205.69318%201%206C1%206.30683%201.24873%206.55556%201.55556%206.55556H5.44444V10.4444C5.44444%2010.7513%205.69318%2011%206%2011C6.30683%2011%206.55556%2010.7513%206.55556%2010.4444V6.55556H10.4444C10.7513%206.55556%2011%206.30683%2011%206C11%205.69318%2010.7513%205.44444%2010.4444%205.44444H6.55556V1.55556C6.55556%201.24873%206.30683%201%206%201Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "label-13")}
                tag="div"
              >
                {"Add departments"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-wrapper", "margin-0")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-info-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Specialities"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Consider specifying your specialties; they'll aid in finding the right candidate for you."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "flex-vertical-left", "gap-4")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-department-saved-wrappers")}
              tag="div"
            >
              {slotTechStackPills}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-add-skill-btn-new")}
              tag="div"
              {...onClickAddTechStacks}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "add-icon-2")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201C5.69318%201%205.44444%201.24873%205.44444%201.55556V5.44444H1.55556C1.24873%205.44444%201%205.69318%201%206C1%206.30683%201.24873%206.55556%201.55556%206.55556H5.44444V10.4444C5.44444%2010.7513%205.69318%2011%206%2011C6.30683%2011%206.55556%2010.7513%206.55556%2010.4444V6.55556H10.4444C10.7513%206.55556%2011%206.30683%2011%206C11%205.69318%2010.7513%205.44444%2010.4444%205.44444H6.55556V1.55556C6.55556%201.24873%206.30683%201%206%201Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "label-13")}
                tag="div"
              >
                {"Add specialities"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-wrapper", "margin-0")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-info-header")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Available Roles"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Consider detailing the available roles; they'll be beneficial when matching candidates to job positions."
              }
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "flex-vertical-left", "gap-4")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "slot-department-saved-wrappers")}
              tag="div"
            >
              {slotRolesPills}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "cj-add-skill-btn-new")}
              tag="div"
              {...onClickAddAvailableRoles}
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "add-icon-2")}
                value="%3Csvg%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22M6%201C5.69318%201%205.44444%201.24873%205.44444%201.55556V5.44444H1.55556C1.24873%205.44444%201%205.69318%201%206C1%206.30683%201.24873%206.55556%201.55556%206.55556H5.44444V10.4444C5.44444%2010.7513%205.69318%2011%206%2011C6.30683%2011%206.55556%2010.7513%206.55556%2010.4444V6.55556H10.4444C10.7513%206.55556%2011%206.30683%2011%206C11%205.69318%2010.7513%205.44444%2010.4444%205.44444H6.55556V1.55556C6.55556%201.24873%206.30683%201%206%201Z%22%20fill%3D%22%231F73B7%22%2F%3E%0A%3C%2Fsvg%3E"
              />
              <_Builtin.Block
                className={_utils.cx(_styles, "label-13")}
                tag="div"
              >
                {"Add roles"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
