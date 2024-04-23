import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./WidgetUserCardWithCompany.module.css";

export function WidgetUserCardWithCompany({
  as: _Component = _Builtin.Block,
  isSelected = false,
  textJobTitle = "Senior Software Engineer",
  textCompanyName = "Microsoft",
  textDate = "2017 - Present",
  textName = "Westly Snedger",
  textLocation = "San Fransisco, California",
  slotUserAvatar,
  slotCompanyLogo,
  onClickCard = {},
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "usercard_with_company")}
      id={_utils.cx(
        _styles,
        "w-node-a005edcd-8b45-516f-a157-2a07853d5768-853d5768"
      )}
      tag="div"
      {...onClickCard}
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "user_avatar")}
        id={_utils.cx(
          _styles,
          "w-node-a005edcd-8b45-516f-a157-2a07853d5769-853d5768"
        )}
        tag="div"
      >
        {slotUserAvatar ?? (
          <_Builtin.Image
            loading="lazy"
            width="auto"
            height="auto"
            alt=""
            src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65d5bc3e527ac5d0712d91bd_e0614a36e2465c41804df0714a305a06.png"
          />
        )}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "user_details")}
        id={_utils.cx(
          _styles,
          "w-node-a005edcd-8b45-516f-a157-2a07853d576b-853d5768"
        )}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "fw-semibold")} tag="div">
          {textName}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600")}
          tag="div"
        >
          {textLocation}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "user_lastjob")}
        id={_utils.cx(
          _styles,
          "w-node-a005edcd-8b45-516f-a157-2a07853d5770-853d5768"
        )}
        tag="div"
      >
        <_Builtin.Block
          id={_utils.cx(
            _styles,
            "w-node-a005edcd-8b45-516f-a157-2a07853d5771-853d5768"
          )}
          tag="div"
        >
          {textJobTitle}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "company_info")}
          id={_utils.cx(
            _styles,
            "w-node-a005edcd-8b45-516f-a157-2a07853d5773-853d5768"
          )}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "company_avatar")}
            id={_utils.cx(
              _styles,
              "w-node-a005edcd-8b45-516f-a157-2a07853d5774-853d5768"
            )}
            tag="div"
          >
            {slotCompanyLogo ?? (
              <_Builtin.Image
                className={_utils.cx(_styles, "image_cover")}
                loading="lazy"
                width="auto"
                height="auto"
                alt=""
                src="https://uploads-ssl.webflow.com/651125c25c47e8494b8e9eb8/65dde8919e47e6d5f73894b7_Rectangle%20349.png"
              />
            )}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{textCompanyName}</_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "text-grey_600")}
          tag="div"
        >
          {textDate}
        </_Builtin.Block>
      </_Builtin.Block>
      {isSelected ? (
        <_Builtin.Block
          className={_utils.cx(_styles, "is_active_blue_100")}
          id={_utils.cx(
            _styles,
            "w-node-a005edcd-8b45-516f-a157-2a07853d577a-853d5768"
          )}
          tag="div"
        />
      ) : null}
    </_Component>
  );
}
