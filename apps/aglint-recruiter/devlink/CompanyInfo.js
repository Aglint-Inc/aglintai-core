"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CompanyLocation } from "./CompanyLocation";
import * as _utils from "./utils";
import _styles from "./CompanyInfo.module.css";

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
}) {
  return (
    <_Component
      className={_utils.cx(
        _styles,
        "rd-company-primary-info-2",
        "width-585",
        "pl-20"
      )}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "profile-block", "width-auto")}
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
            {"Recruitment Settings"}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "text-grey-600")}
            tag="div"
          >
            {
              "Refine your recruitment process by providing key details, enabling a tailored approach to job postings and candidate scheduling."
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
          className={_utils.cx(_styles, "cs-info-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-info-header")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Office Locations"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Include office locations to organize data, schedule effectively, and identify correct time zones."
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
                {"Add Location"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-wrapper")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cs-info-header")}
            tag="div"
          >
            <_Builtin.Block tag="div">{"Departments"}</_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "text-grey-600")}
              tag="div"
            >
              {
                "Catalog your departments to sort and filter data efficiently, aiding in job posting and scheduling."
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
                {"Add Departments"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
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
              <_Builtin.Block tag="div">{"Specialties"}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "Define your specialties to streamline the search and match process for job candidates."
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
                  {"Add Specialities"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
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
              <_Builtin.Block tag="div">{"Available Roles"}</_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "text-grey-600")}
                tag="div"
              >
                {
                  "List available roles to assist in filtering applications and matching candidates to job positions."
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
                  {"Add Roles"}
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block tag="div">{slotEmploymentType}</_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
