import * as React from "react";
import * as Types from "./types";

declare function ImportCandidateListing(props: {
  as?: React.ElementType;
  numberListingCandidates?: React.ReactNode;
  slotTable?: Types.Devlink.Slot;
  onClickReupload?: Types.Devlink.RuntimeProps;
  onClickImport?: Types.Devlink.RuntimeProps;
}): React.JSX.Element;
