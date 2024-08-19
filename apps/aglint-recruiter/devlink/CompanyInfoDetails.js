"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./CompanyInfoDetails.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1594":{"id":"e-1594","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-627","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1595"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"76290069-1a9b-5638-96ac-84be7007e552"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724077220602},"e-1595":{"id":"e-1595","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-628","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1594"}},"mediaQueries":["main","medium","small","tiny"],"target":{"appliesTo":"ELEMENT","styleBlockIds":[],"id":"76290069-1a9b-5638-96ac-84be7007e552"},"targets":[],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1724077220605}},"actionLists":{"a-627":{"id":"a-627","title":"company InfoDetails Hover in","actionItemGroups":[{"actionItems":[{"id":"a-627-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".slot-edit-cid","selectorGuids":["8aba3501-d443-6c22-5de9-62c0c1503bfa"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-627-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-edit-cid","selectorGuids":["8aba3501-d443-6c22-5de9-62c0c1503bfa"]},"value":1,"unit":""}}]}],"createdOn":1724077187508,"useFirstGroupAsInitialState":true},"a-628":{"id":"a-628","title":"company InfoDetails Hover Out","actionItemGroups":[{"actionItems":[{"id":"a-628-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".slot-edit-cid","selectorGuids":["8aba3501-d443-6c22-5de9-62c0c1503bfa"]},"value":0,"unit":""}}]}],"createdOn":1724077187508,"useFirstGroupAsInitialState":false}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function CompanyInfoDetails({
  as: _Component = _Builtin.Block,
  slotImage,
  textCompanyName = "Microsoft",
  textCompanySites = "microsoft.com",
  slotEditButton,
  slotDetails,
  slotSocialLink,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "company-info-details-wrap")}
      data-w-id="76290069-1a9b-5638-96ac-84be7007e552"
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cid-header-wrapper")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "cid-header-wrapper-left")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "cid-header-image")}
            tag="div"
          >
            {slotImage}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cid-header-text-wrap")}
            tag="div"
          >
            <Text content={textCompanyName} weight="medium" size="3" />
            <Text content={textCompanySites} color="neutral" />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-edit-cid")}
          tag="div"
        >
          {slotEditButton}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cid-company-details")}
        tag="div"
      >
        {slotDetails}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cid-social-link-wraps")}
        tag="div"
      >
        <Text size="1" color="neutral" content="Social Links" />
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-cid-social-link")}
          tag="div"
        >
          {slotSocialLink}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
