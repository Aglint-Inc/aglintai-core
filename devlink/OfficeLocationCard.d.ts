import * as React from "react";
import * as Types from "./types";

declare function OfficeLocationCard(props: {
  as?: React.ElementType;
  textCountry?: React.ReactNode;
  textAddress?: React.ReactNode;
  textHeadquater?: React.ReactNode;
  isHeadQuaterVisible?: Types.Visibility.VisibilityConditions;
  textJobPostCount?: React.ReactNode;
}): React.JSX.Element;
