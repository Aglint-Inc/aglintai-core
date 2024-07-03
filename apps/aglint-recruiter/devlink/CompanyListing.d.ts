import * as React from "react";
import * as Types from "./types";

declare function CompanyListing(props: {
  as?: React.ElementType;
  slotCompanyImage?: Types.Devlink.Slot;
  textCompanyName?: React.ReactNode;
  textEmployeeCount?: React.ReactNode;
  textCompanyType?: React.ReactNode;
  textHeaderDiscription?: React.ReactNode;
  slotCompanyLinks?: Types.Devlink.Slot;
  isOpenJobCountVisible?: Types.Visibility.VisibilityConditions;
  textOpenJobCount?: React.ReactNode;
  slotSearchOpenJob?: Types.Devlink.Slot;
  slotOpenJobListing?: Types.Devlink.Slot;
  textCompanyAbout?: React.ReactNode;
  slotGallery?: Types.Devlink.Slot;
  slotOfficeLocaionCard?: Types.Devlink.Slot;
  isOpenJobsVisible?: Types.Visibility.VisibilityConditions;
  isAboutJobVisible?: Types.Visibility.VisibilityConditions;
  isOfficeLocationVisible?: Types.Visibility.VisibilityConditions;
  isHeaderDescriptionVisible?: Types.Visibility.VisibilityConditions;
}): React.JSX.Element;
