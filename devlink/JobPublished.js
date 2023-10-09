import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobPublished.module.css";

export function JobPublished({
  as: _Component = _Builtin.Block,
  slotLogo,
  textRole = "This is some text inside of a div block.",
  textCompany = "This is some text inside of a div block.",
  onClickPublishJob = {},
  isJobPublished = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "publish-job-upper-wrappers")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "publish-job-card")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "slot-publish-company-logo")}
          tag="div"
        >
          {slotLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "publish-job-right")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {textRole}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold", "text-grey-600")}
            tag="div"
          >
            {textCompany}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "primary-btn-with-logo-wrappers")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "primary-btn-with-logo", "active")}
          tag="div"
          {...onClickPublishJob}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M5.33053%2015.9287C5.115%2014.9913%205.00054%2014.0101%205.00054%2012.9998C5.00054%207.91186%207.90319%203.56348%2012.0005%201.81787C16.0979%203.56348%2019.0005%207.91186%2019.0005%2012.9998C19.0005%2014.0101%2018.8861%2014.9913%2018.6706%2015.9287L20.6907%2017.7244C20.8704%2017.8841%2020.9109%2018.1492%2020.7872%2018.3553L18.33%2022.4507C18.1879%2022.6875%2017.8808%2022.7643%2017.644%2022.6222C17.609%2022.6012%2017.5766%2022.5759%2017.5477%2022.547L15.2934%2020.2927C15.1059%2020.1052%2014.8515%2019.9998%2014.5863%2019.9998H9.41476C9.14954%2019.9998%208.89519%2020.1052%208.70765%2020.2927L6.45337%2022.547C6.2581%2022.7423%205.94152%2022.7423%205.74626%2022.547C5.71735%2022.5181%205.6921%2022.4857%205.67107%2022.4507L3.21385%2018.3553C3.09014%2018.1492%203.13071%2017.8841%203.31042%2017.7244L5.33053%2015.9287ZM12.0005%2012.9998C13.1051%2012.9998%2014.0005%2012.1044%2014.0005%2010.9998C14.0005%209.89525%2013.1051%208.99982%2012.0005%208.99982C10.896%208.99982%2010.0005%209.89525%2010.0005%2010.9998C10.0005%2012.1044%2010.896%2012.9998%2012.0005%2012.9998Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Publish Job"}
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "primary-btn-with-logo", "hide")}
          tag="div"
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icons")}
            value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M5.33053%2015.9287C5.115%2014.9913%205.00054%2014.0101%205.00054%2012.9998C5.00054%207.91186%207.90319%203.56348%2012.0005%201.81787C16.0979%203.56348%2019.0005%207.91186%2019.0005%2012.9998C19.0005%2014.0101%2018.8861%2014.9913%2018.6706%2015.9287L20.6907%2017.7244C20.8704%2017.8841%2020.9109%2018.1492%2020.7872%2018.3553L18.33%2022.4507C18.1879%2022.6875%2017.8808%2022.7643%2017.644%2022.6222C17.609%2022.6012%2017.5766%2022.5759%2017.5477%2022.547L15.2934%2020.2927C15.1059%2020.1052%2014.8515%2019.9998%2014.5863%2019.9998H9.41476C9.14954%2019.9998%208.89519%2020.1052%208.70765%2020.2927L6.45337%2022.547C6.2581%2022.7423%205.94152%2022.7423%205.74626%2022.547C5.71735%2022.5181%205.6921%2022.4857%205.67107%2022.4507L3.21385%2018.3553C3.09014%2018.1492%203.13071%2017.8841%203.31042%2017.7244L5.33053%2015.9287ZM12.0005%2012.9998C13.1051%2012.9998%2014.0005%2012.1044%2014.0005%2010.9998C14.0005%209.89525%2013.1051%208.99982%2012.0005%208.99982C10.896%208.99982%2010.0005%209.89525%2010.0005%2010.9998C10.0005%2012.1044%2010.896%2012.9998%2012.0005%2012.9998Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "fw-semibold")}
            tag="div"
          >
            {"Publish Job"}
          </_Builtin.Block>
        </_Builtin.Block>
        {isJobPublished ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "primary-btn-with-logo", "published")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2220%22%20height%3D%2220%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M5.33053%2015.9287C5.115%2014.9913%205.00054%2014.0101%205.00054%2012.9998C5.00054%207.91186%207.90319%203.56348%2012.0005%201.81787C16.0979%203.56348%2019.0005%207.91186%2019.0005%2012.9998C19.0005%2014.0101%2018.8861%2014.9913%2018.6706%2015.9287L20.6907%2017.7244C20.8704%2017.8841%2020.9109%2018.1492%2020.7872%2018.3553L18.33%2022.4507C18.1879%2022.6875%2017.8808%2022.7643%2017.644%2022.6222C17.609%2022.6012%2017.5766%2022.5759%2017.5477%2022.547L15.2934%2020.2927C15.1059%2020.1052%2014.8515%2019.9998%2014.5863%2019.9998H9.41476C9.14954%2019.9998%208.89519%2020.1052%208.70765%2020.2927L6.45337%2022.547C6.2581%2022.7423%205.94152%2022.7423%205.74626%2022.547C5.71735%2022.5181%205.6921%2022.4857%205.67107%2022.4507L3.21385%2018.3553C3.09014%2018.1492%203.13071%2017.8841%203.31042%2017.7244L5.33053%2015.9287ZM12.0005%2012.9998C13.1051%2012.9998%2014.0005%2012.1044%2014.0005%2010.9998C14.0005%209.89525%2013.1051%208.99982%2012.0005%208.99982C10.896%208.99982%2010.0005%209.89525%2010.0005%2010.9998C10.0005%2012.1044%2010.896%2012.9998%2012.0005%2012.9998Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "fw-semibold")}
              tag="div"
            >
              {"Publish Job"}
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
      </_Builtin.Block>
    </_Component>
  );
}
