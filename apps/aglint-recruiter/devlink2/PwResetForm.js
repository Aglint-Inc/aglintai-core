"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import * as _utils from "./utils";
import _styles from "./PwResetForm.module.css";

export function PwResetForm({
  as: _Component = _Builtin.Block,
  slotForm,
  slotButton,
}) {
  return (
    <_Component className={_utils.cx(_styles, "block")} tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "login-layout")}
          tag="div"
        >
          <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2232%22%20height%3D%2232%22%20rx%3D%224%22%20fill%3D%22%23FF9C00%22%20fill-opacity%3D%220.160784%22%2F%3E%0A%3Cpath%20d%3D%22M22.325%2015.6049C20.17%2015.0649%2019.09%2014.7999%2018.345%2014.0549C17.6%2013.3049%2017.335%2012.2299%2016.795%2010.0749L16%206.8999L15.205%2010.0749C14.665%2012.2299%2014.4%2013.3099%2013.655%2014.0549C12.905%2014.7999%2011.83%2015.0649%209.675%2015.6049L6.5%2016.3999L9.675%2017.1949C11.83%2017.7349%2012.91%2017.9999%2013.655%2018.7449C14.4%2019.4949%2014.665%2020.5699%2015.205%2022.7249L16%2025.8999L16.795%2022.7249C17.335%2020.5699%2017.6%2019.4899%2018.345%2018.7449C19.095%2017.9999%2020.17%2017.7349%2022.325%2017.1949L25.5%2016.3999L22.325%2015.6049Z%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3Cpath%20d%3D%22M23.7083%207.33527C22.9899%207.15527%2022.6299%207.06693%2022.3815%206.81859C22.1332%206.56859%2022.0449%206.21027%2021.8649%205.49193L21.5999%204.43359L21.3349%205.49193C21.1549%206.21027%2021.0666%206.57027%2020.8183%206.81859C20.5683%207.06693%2020.2099%207.15527%2019.4915%207.33527L18.4332%207.60027L19.4915%207.86527C20.2099%208.04527%2020.5699%208.13359%2020.8183%208.38193C21.0666%208.63193%2021.1549%208.99027%2021.3349%209.70859L21.5999%2010.7669L21.8649%209.70859C22.0449%208.99027%2022.1332%208.63027%2022.3815%208.38193C22.6315%208.13359%2022.9899%208.04527%2023.7083%207.86527L24.7666%207.60027L23.7083%207.33527Z%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3C%2Fsvg%3E" />
          <_Builtin.Block
            className={_utils.cx(_styles, "text-space")}
            tag="div"
          >
            <Text
              size="4"
              weight="medium"
              color=""
              content="Forgot Password"
              align="center"
            />
            <Text
              align="center"
              weight=""
              color="neutral-11"
              highContrast="false"
              content="Enter your email address associated with your account and we’ll send you a link to reset password"
              size="1"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "sl-login-form")}
          tag="div"
        >
          <_Builtin.Block tag="div">
            {slotForm ?? <SlotComp componentName="Slot for MUI Form" />}
          </_Builtin.Block>
          <_Builtin.Block tag="div">{slotButton}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
