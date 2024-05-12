import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./JobDetailsFilterBlock.module.css";

export function JobDetailsFilterBlock({
  as: _Component = _Builtin.Block,
  slotFilter,
  onclickTopApplicants = {},
  onclickAllApplicants = {},
  isTopApplicants = true,
  isAllApplicants = false,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "cv-tab-filter-wrapper")}
      tag="div"
    >
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-tab-filter-left")}
        tag="div"
      >
        <_Builtin.Block className={_utils.cx(_styles, "cv-rec-tabs")} tag="div">
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-rec-tab-link")}
            tag="div"
            {...onclickTopApplicants}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-rec-tab-link-inner")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-block", "_20x26")}
                tag="div"
              >
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%2216%22%20height%3D%2213%22%20viewBox%3D%220%200%2016%2013%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.49422%202.47984H2.43922V1.53484H1.49422V2.47984ZM0.549219%201.29859C0.588594%200.865469%200.824844%200.629219%201.25797%200.589844H2.67547C3.10859%200.629219%203.34484%200.865469%203.38422%201.29859V2.71609C3.34484%203.14922%203.10859%203.38547%202.67547%203.42484H1.25797C0.824844%203.38547%200.588594%203.14922%200.549219%202.71609V1.29859ZM5.27422%201.53484H14.7242C15.0195%201.55453%2015.177%201.71203%2015.1967%202.00734C15.177%202.30266%2015.0195%202.46016%2014.7242%202.47984H5.27422C4.97891%202.46016%204.82141%202.30266%204.80172%202.00734C4.82141%201.71203%204.97891%201.55453%205.27422%201.53484ZM5.27422%206.25984H14.7242C15.0195%206.27953%2015.177%206.43703%2015.1967%206.73234C15.177%207.02766%2015.0195%207.18516%2014.7242%207.20484H5.27422C4.97891%207.18516%204.82141%207.02766%204.80172%206.73234C4.82141%206.43703%204.97891%206.27953%205.27422%206.25984ZM5.27422%2010.9848H14.7242C15.0195%2011.0045%2015.177%2011.162%2015.1967%2011.4573C15.177%2011.7527%2015.0195%2011.9102%2014.7242%2011.9298H5.27422C4.97891%2011.9102%204.82141%2011.7527%204.80172%2011.4573C4.82141%2011.162%204.97891%2011.0045%205.27422%2010.9848ZM1.49422%206.25984V7.20484H2.43922V6.25984H1.49422ZM1.25797%205.31484H2.67547C3.10859%205.35422%203.34484%205.59047%203.38422%206.02359V7.44109C3.34484%207.87422%203.10859%208.11047%202.67547%208.14984H1.25797C0.824844%208.11047%200.588594%207.87422%200.549219%207.44109V6.02359C0.588594%205.59047%200.824844%205.35422%201.25797%205.31484ZM1.49422%2011.9298H2.43922V10.9848H1.49422V11.9298ZM0.549219%2010.7486C0.588594%2010.3155%200.824844%2010.0792%201.25797%2010.0398H2.67547C3.10859%2010.0792%203.34484%2010.3155%203.38422%2010.7486V12.1661C3.34484%2012.5992%203.10859%2012.8355%202.67547%2012.8748H1.25797C0.824844%2012.8355%200.588594%2012.5992%200.549219%2012.1661V10.7486Z%22%20fill%3D%22%232F3941%22%20style%3D%22fill%3A%232F3941%3Bfill%3Acolor(display-p3%200.1843%200.2235%200.2549)%3Bfill-opacity%3A1%3B%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
            </_Builtin.Block>
            {isTopApplicants ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-rec-tab-link-bg")}
                tag="div"
              />
            ) : null}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "cv-rec-tab-link")}
            tag="div"
            {...onclickAllApplicants}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "cv-rec-tab-link-inner")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "icon-block", "_24x24")}
                tag="div"
              >
                <_Builtin.Image
                  loading="lazy"
                  width="auto"
                  height="auto"
                  alt=""
                  src="https://uploads-ssl.webflow.com/651419e73ebbb12148f96ccc/6567204527a53d15e5e6a940_expanded-icon.svg"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">{"Expanded"}</_Builtin.Block>
            </_Builtin.Block>
            {isAllApplicants ? (
              <_Builtin.Block
                className={_utils.cx(_styles, "cv-rec-tab-link-bg")}
                tag="div"
              />
            ) : null}
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "cv-tab-filter-right")}
        tag="div"
      >
        {slotFilter}
      </_Builtin.Block>
    </_Component>
  );
}
