import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./RecSideNavProfileBlock.module.css";

export function RecSideNavProfileBlock({
  as: _Component = _Builtin.Block,
  onclickCompany = {},
  slotCompanyLogo,
  companyName = "Charlie Health fhhodfhoefdfo",
  isNotCountVisible = false,
  slotProfileImage,
  onclickNotification = {},
  onclickProfileImage = {},
  notificationCount = "9",
  companyNameProps = {},
}) {
  return (
    <_Component className={_utils.cx(_styles, "rs-header-block")} tag="div">
      <_Builtin.HtmlEmbed
        className={_utils.cx(_styles, "hide")}
        value="%3Cstyle%3E%0A.line-clamp-1%20%7B%0Adisplay%3A%20-webkit-box%3B%0A%20%20-webkit-line-clamp%3A%201%3B%0A%20%20-webkit-box-orient%3A%20vertical%3B%20%20%0A%20%20overflow%3A%20hidden%3B%0A%7D%0A%3C%2Fstyle%3E"
      />
      <_Builtin.Block
        className={_utils.cx(_styles, "rs-header-block-left", "clickable")}
        tag="div"
        {...onclickCompany}
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "rs-header-company-image")}
          tag="div"
        >
          {slotCompanyLogo}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "text-color-white",
            "fw-semibold",
            "line-clamp-1"
          )}
          tag="div"
          {...companyNameProps}
        >
          {companyName}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "rs-header-block-right")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(
            _styles,
            "icon-block",
            "clickable",
            "padding-4",
            "relative",
            "hide"
          )}
          tag="div"
          {...onclickNotification}
        >
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, "icon-embed")}
            value="%3Csvg%20width%3D%2213%22%20height%3D%2215%22%20viewBox%3D%220%200%2013%2015%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M6.06262%201.1875C6.08085%200.914061%206.22668%200.768228%206.50012%200.749998C6.77356%200.768228%206.91939%200.914061%206.93762%201.1875V1.65234C8.06783%201.77995%208.99752%202.24479%209.72668%203.04687C10.4741%203.84896%2010.8569%204.83333%2010.8751%206V6.79297C10.8934%208.03255%2011.3309%209.09896%2012.1876%209.99219L12.2697%2010.0742C12.5066%2010.3112%2012.6251%2010.5937%2012.6251%2010.9219C12.6251%2011.2682%2012.5066%2011.5508%2012.2697%2011.7695C12.0509%2012.0065%2011.7684%2012.125%2011.422%2012.125H1.57825C1.23189%2012.125%200.94934%2012.0065%200.73059%2011.7695C0.493611%2011.5508%200.375121%2011.2682%200.375121%2010.9219C0.375121%2010.5937%200.493611%2010.3021%200.73059%2010.0469L0.812621%209.99219C1.66939%209.09896%202.10689%208.03255%202.12512%206.79297V6C2.14335%204.83333%202.52616%203.84896%203.27356%203.04687C4.00273%202.24479%204.93241%201.77995%206.06262%201.65234V1.1875ZM6.50012%202.5C5.51575%202.51823%204.68632%202.85547%204.01184%203.51172C3.35559%204.1862%203.01835%205.01562%203.00012%206V6.79297C2.98189%208.26953%202.45325%209.53646%201.41418%2010.5937L1.3595%2010.6758C1.28658%2010.7487%201.25012%2010.8307%201.25012%2010.9219C1.26835%2011.1224%201.37773%2011.2318%201.57825%2011.25H11.422C11.6225%2011.2318%2011.7319%2011.1224%2011.7501%2010.9219C11.7501%2010.8307%2011.7137%2010.7487%2011.6407%2010.6758L11.5861%2010.5937C10.547%209.53646%2010.0184%208.26953%2010.0001%206.79297V6C9.98189%205.01562%209.63554%204.1862%208.96106%203.51172C8.30481%202.85547%207.4845%202.51823%206.50012%202.5ZM5.67981%2013.3008C5.82564%2013.6654%206.09908%2013.8568%206.50012%2013.875C6.90116%2013.8568%207.1746%2013.6654%207.32043%2013.3008C7.42981%2013.0456%207.62122%2012.9544%207.89465%2013.0273C8.13163%2013.1367%208.21366%2013.319%208.14075%2013.5742C8.01314%2013.9206%207.80351%2014.2031%207.51184%2014.4219C7.22017%2014.6406%206.88293%2014.75%206.50012%2014.75C6.11731%2014.75%205.78007%2014.6406%205.4884%2014.4219C5.19674%2014.2031%204.9871%2013.9206%204.8595%2013.5742C4.78658%2013.319%204.86861%2013.1367%205.10559%2013.0273C5.37903%2012.9544%205.57043%2013.0456%205.67981%2013.3008Z%22%20fill%3D%22white%22%2F%3E%0A%3C%2Fsvg%3E"
          />
          {isNotCountVisible ? (
            <_Builtin.Block
              className={_utils.cx(_styles, "notification-flag")}
              tag="div"
            >
              {notificationCount}
            </_Builtin.Block>
          ) : null}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "rs-header-profile-image", "clickable")}
          tag="div"
          {...onclickProfileImage}
        >
          {slotProfileImage}
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
