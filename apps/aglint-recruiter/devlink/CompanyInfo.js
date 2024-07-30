"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { CompanyInfoDetails } from "./CompanyInfoDetails";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonGhost } from "./ButtonGhost";
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
  isSpecialistVisible = false,
  isAvailableRolesVisible = false,
  slotEmploymentType,
  isEditable = true,
  slotCompanyInfoDetails,
}) {
  return (
    <_Component className={_utils.cx(_styles, "company-info-wrap")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "slot-company-info-details")}
        tag="div"
      >
        {slotCompanyInfoDetails ?? <CompanyInfoDetails />}
      </_Builtin.Block>
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
          <_Builtin.Block tag="div">
            <ButtonGhost
              onClickButton={onClickAddLocation}
              size="2"
              iconName="add"
              isLeftIcon={true}
              textButton="Add Location"
            />
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
          <_Builtin.Block tag="div">
            <ButtonGhost
              onClickButton={onClickAddDepartments}
              size="2"
              iconName="add"
              isLeftIcon={true}
              textButton="Add Departments"
            />
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
      {isSpecialistVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-wrapper", "hide")}
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
            <_Builtin.Block tag="div">
              <ButtonGhost
                onClickButton={onClickAddTechStacks}
                size="2"
                iconName="add"
                isLeftIcon={true}
                textButton="Add Specialities"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
      {isAvailableRolesVisible ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "cs-info-wrapper", "hide")}
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
            <_Builtin.Block tag="div">
              <ButtonGhost
                onClickButton={onClickAddAvailableRoles}
                size="2"
                iconName="add"
                isLeftIcon={true}
                textButton="Add Roles"
              />
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
      ) : null}
    </_Component>
  );
}
