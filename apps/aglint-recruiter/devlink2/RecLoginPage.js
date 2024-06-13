"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { SlotComp } from "./SlotComp";
import { ButtonSolid } from "./ButtonSolid";
import { ButtonGhost } from "./ButtonGhost";
import * as _utils from "./utils";
import _styles from "./RecLoginPage.module.css";

export function RecLoginPage({
  as: _Component = _Builtin.Block,
  slotForm,
  onclickLogin = {},

  contactLink = {
    href: "#",
  },

  onclickGoogle = {},
  onclickLinkedIn = {},
  onclickSignup = {},
  onclickForgotPassword = {},
  slotLottie,
  textLogin = "Login",
  isLoginButtonDisable = false,
  isLottieVisible = false,
}) {
  return (
    <_Component className={_utils.cx(_styles, "block")} tag="div">
      <_Builtin.Block className={_utils.cx(_styles, "login-layout")} tag="div">
        <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2232%22%20height%3D%2232%22%20rx%3D%224%22%20fill%3D%22%23FF9C00%22%20fill-opacity%3D%220.160784%22%2F%3E%0A%3Cpath%20d%3D%22M22.325%2015.6049C20.17%2015.0649%2019.09%2014.7999%2018.345%2014.0549C17.6%2013.3049%2017.335%2012.2299%2016.795%2010.0749L16%206.8999L15.205%2010.0749C14.665%2012.2299%2014.4%2013.3099%2013.655%2014.0549C12.905%2014.7999%2011.83%2015.0649%209.675%2015.6049L6.5%2016.3999L9.675%2017.1949C11.83%2017.7349%2012.91%2017.9999%2013.655%2018.7449C14.4%2019.4949%2014.665%2020.5699%2015.205%2022.7249L16%2025.8999L16.795%2022.7249C17.335%2020.5699%2017.6%2019.4899%2018.345%2018.7449C19.095%2017.9999%2020.17%2017.7349%2022.325%2017.1949L25.5%2016.3999L22.325%2015.6049Z%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3Cpath%20d%3D%22M23.7083%207.33527C22.9899%207.15527%2022.6299%207.06693%2022.3815%206.81859C22.1332%206.56859%2022.0449%206.21027%2021.8649%205.49193L21.5999%204.43359L21.3349%205.49193C21.1549%206.21027%2021.0666%206.57027%2020.8183%206.81859C20.5683%207.06693%2020.2099%207.15527%2019.4915%207.33527L18.4332%207.60027L19.4915%207.86527C20.2099%208.04527%2020.5699%208.13359%2020.8183%208.38193C21.0666%208.63193%2021.1549%208.99027%2021.3349%209.70859L21.5999%2010.7669L21.8649%209.70859C22.0449%208.99027%2022.1332%208.63027%2022.3815%208.38193C22.6315%208.13359%2022.9899%208.04527%2023.7083%207.86527L24.7666%207.60027L23.7083%207.33527Z%22%20fill%3D%22%23F76B15%22%2F%3E%0A%3C%2Fsvg%3E" />
        <Text align="center" size="4" content="" />
        <_Builtin.Block
          className={_utils.cx(_styles, "sl-login-form")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "sl-auth-links-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(
                _styles,
                "sl-auth-link-block",
                "just-logo",
                "single",
                "modified"
              )}
              tag="div"
              {...onclickGoogle}
            >
              <_Builtin.Block tag="div">
                <_Builtin.HtmlEmbed
                  className={_utils.cx(_styles, "svg-icon")}
                  value="%3Csvg%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M21.8055%2010.0415H21V10H12V14H17.6515C16.827%2016.3285%2014.6115%2018%2012%2018C8.6865%2018%206%2015.3135%206%2012C6%208.6865%208.6865%206%2012%206C13.5295%206%2014.921%206.577%2015.9805%207.5195L18.809%204.691C17.023%203.0265%2014.634%202%2012%202C6.4775%202%202%206.4775%202%2012C2%2017.5225%206.4775%2022%2012%2022C17.5225%2022%2022%2017.5225%2022%2012C22%2011.3295%2021.931%2010.675%2021.8055%2010.0415Z%22%20fill%3D%22%23FFC107%22%2F%3E%0A%3Cpath%20d%3D%22M3.15283%207.3455L6.43833%209.755C7.32733%207.554%209.48033%206%2011.9998%206C13.5293%206%2014.9208%206.577%2015.9803%207.5195L18.8088%204.691C17.0228%203.0265%2014.6338%202%2011.9998%202C8.15883%202%204.82783%204.1685%203.15283%207.3455Z%22%20fill%3D%22%23FF3D00%22%2F%3E%0A%3Cpath%20d%3D%22M12.0002%2022C14.5832%2022%2016.9302%2021.0115%2018.7047%2019.404L15.6097%2016.785C14.5719%2017.5742%2013.3039%2018.001%2012.0002%2018C9.39916%2018%207.19066%2016.3415%206.35866%2014.027L3.09766%2016.5395C4.75266%2019.778%208.11366%2022%2012.0002%2022Z%22%20fill%3D%22%234CAF50%22%2F%3E%0A%3Cpath%20d%3D%22M21.8055%2010.0415H21V10H12V14H17.6515C17.2571%2015.1082%2016.5467%2016.0766%2015.608%2016.7855L15.6095%2016.7845L18.7045%2019.4035C18.4855%2019.6025%2022%2017%2022%2012C22%2011.3295%2021.931%2010.675%2021.8055%2010.0415Z%22%20fill%3D%22%231976D2%22%2F%3E%0A%3C%2Fsvg%3E"
                />
              </_Builtin.Block>
              <_Builtin.Block tag="div">
                {"Continue with Google"}
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "sl-auth-divider-wrapper")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "ic-hr-line", "grey-200")}
              tag="div"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "text-gray-500")}
              tag="div"
            >
              {"OR"}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "ic-hr-line", "grey-200")}
              tag="div"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">
            <_Builtin.Block
              className={_utils.cx(_styles, "form-space")}
              tag="div"
            >
              {slotForm ?? <SlotComp componentName="Login Form" />}
            </_Builtin.Block>
            <ButtonSolid
              onClickButton={onclickLogin}
              isDisabled={isLoginButtonDisable}
              textButton="Login"
              isRightIcon={false}
              isLeftIcon={false}
              size="2"
            />
          </_Builtin.Block>
          <ButtonGhost
            onClickButton={onclickForgotPassword}
            size="1"
            isRightIcon={false}
            isLeftIcon={false}
            textButton="Forgot Password ?"
            color="neutral"
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
