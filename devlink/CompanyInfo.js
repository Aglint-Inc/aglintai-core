import React from "react";
import * as _Builtin from "./_Builtin";
import { CompanyLocation } from "./CompanyLocation";
import * as _utils from "./utils";
import _styles from "./CompanyInfo.module.css";

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
  return (
    <_Component
      className={_utils.cx(_styles, "rd-company-primary-info-2")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "rd-email-edit-block-2")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey-500")}
          tag="div"
        >
          {"Basic Info"}
        </_Builtin.Block>
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {"Company logo"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "div-block-348")}
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
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Logo should be having png/svg format and should be less than 5 MB"
              }
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-form-company-info")}
        tag="div"
      >
        {slotBasicForm}
      </_Builtin.Block>
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "fw-semibold", "text-grey-500")}
          tag="div"
        >
          {"Advanced Info"}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-additional-info")}
          tag="div"
        >
          {slotAdditionalInfoForm}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "office-loaction-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Office Locations"}
          </_Builtin.Block>
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
        <_Builtin.Block
          className={_utils.cx(_styles, "office-loaction-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Departments"}
          </_Builtin.Block>
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
        <_Builtin.Block
          className={_utils.cx(_styles, "office-loaction-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Specialities"}
          </_Builtin.Block>
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
        <_Builtin.Block
          className={_utils.cx(_styles, "office-loaction-wrappers")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Available Roles"}
          </_Builtin.Block>
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
              {"Add available roles"}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
