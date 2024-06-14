"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import { Text } from "./Text";
import { ButtonSolid } from "./ButtonSolid";
import * as _utils from "./utils";
import _styles from "./WelcomeSlider3.module.css";

export function WelcomeSlider3({
  as: _Component = _Builtin.Block,
  onClickRegisterWithGoogle = {},
  onClickRegisterLinkedIn = {},
  slotSignUpForm,
  onClickBack = {},
  onClickSignIn = {},
  isTermsChecked = true,
  onClickSignUp = {},
  onClickCheck = {},
  isSignUpButtonVisible = true,
  onClickTermsandCondition = {},

  basicLinkStyleLink = {
    href: "https://www.aglinthq.com/terms",
    target: "_blank",
  },
}) {
  return (
    <_Component className={_utils.cx(_styles, "signup-block")} tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "back-btn-wrapper", "hide")}
          tag="div"
          {...onClickBack}
        >
          <_Builtin.Block className={_utils.cx(_styles, "back-icon")} tag="div">
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "embed-icon")}
              value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2214%22%20height%3D%2214%22%20viewbox%3D%220%200%2020%2020%22%20fill%3D%22currentColor%22%3E%0A%20%20%3Cpath%20d%3D%22M14.8625%203.225L13.3792%201.75L5.13751%2010L13.3875%2018.25L14.8625%2016.775L8.08751%2010L14.8625%203.225Z%22%20fill%3D%22currentColor%2F%22%3E%0A%3C%2Fpath%3E%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
          <_Builtin.Block tag="div">{"Back"}</_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "auth-cta-block")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-header-block")}
          tag="div"
        >
          <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2232%22%20height%3D%2232%22%20rx%3D%224%22%20fill%3D%22%23FF9C00%22%20fill-opacity%3D%220.160784%22%3E%3C%2Frect%3E%0A%3Cpath%20d%3D%22M22.325%2015.6049C20.17%2015.0649%2019.09%2014.7999%2018.345%2014.0549C17.6%2013.3049%2017.335%2012.2299%2016.795%2010.0749L16%206.8999L15.205%2010.0749C14.665%2012.2299%2014.4%2013.3099%2013.655%2014.0549C12.905%2014.7999%2011.83%2015.0649%209.675%2015.6049L6.5%2016.3999L9.675%2017.1949C11.83%2017.7349%2012.91%2017.9999%2013.655%2018.7449C14.4%2019.4949%2014.665%2020.5699%2015.205%2022.7249L16%2025.8999L16.795%2022.7249C17.335%2020.5699%2017.6%2019.4899%2018.345%2018.7449C19.095%2017.9999%2020.17%2017.7349%2022.325%2017.1949L25.5%2016.3999L22.325%2015.6049Z%22%20fill%3D%22%23F76B15%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M23.7083%207.33527C22.9899%207.15527%2022.6299%207.06693%2022.3815%206.81859C22.1332%206.56859%2022.0449%206.21027%2021.8649%205.49193L21.5999%204.43359L21.3349%205.49193C21.1549%206.21027%2021.0666%206.57027%2020.8183%206.81859C20.5683%207.06693%2020.2099%207.15527%2019.4915%207.33527L18.4332%207.60027L19.4915%207.86527C20.2099%208.04527%2020.5699%208.13359%2020.8183%208.38193C21.0666%208.63193%2021.1549%208.99027%2021.3349%209.70859L21.5999%2010.7669L21.8649%209.70859C22.0449%208.99027%2022.1332%208.63027%2022.3815%208.38193C22.6315%208.13359%2022.9899%208.04527%2023.7083%207.86527L24.7666%207.60027L23.7083%207.33527Z%22%20fill%3D%22%23F76B15%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E" />
          <Text
            weight="bold"
            size="4"
            content="Sign up to Aglint for Recruiters"
          />
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "auth-cta-form-block")}
          tag="div"
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "auth-form-block")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "auth-form-block-connect")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "su-cta-btn", "single")}
                tag="div"
                {...onClickRegisterWithGoogle}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "su-cta-btn-block", "single")}
                  tag="div"
                >
                  <_Builtin.HtmlEmbed
                    className={_utils.cx(_styles, "embed-icon")}
                    value="%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewbox%3D%220%200%2024%2024%22%20fill%3D%22none%22%3E%0A%20%20%3Cpath%20d%3D%22M21.8055%2010.0415H21V10H12V14H17.6515C16.827%2016.3285%2014.6115%2018%2012%2018C8.6865%2018%206%2015.3135%206%2012C6%208.6865%208.6865%206%2012%206C13.5295%206%2014.921%206.577%2015.9805%207.5195L18.809%204.691C17.023%203.0265%2014.634%202%2012%202C6.4775%202%202%206.4775%202%2012C2%2017.5225%206.4775%2022%2012%2022C17.5225%2022%2022%2017.5225%2022%2012C22%2011.3295%2021.931%2010.675%2021.8055%2010.0415Z%22%20fill%3D%22%23FFC107%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M3.15298%207.3455L6.43848%209.755C7.32748%207.554%209.48048%206%2012%206C13.5295%206%2014.921%206.577%2015.9805%207.5195L18.809%204.691C17.023%203.0265%2014.634%202%2012%202C8.15898%202%204.82798%204.1685%203.15298%207.3455Z%22%20fill%3D%22%23FF3D00%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M12%2022.0003C14.583%2022.0003%2016.93%2021.0118%2018.7045%2019.4043L15.6095%2016.7853C14.5718%2017.5745%2013.3037%2018.0014%2012%2018.0003C9.399%2018.0003%207.1905%2016.3418%206.3585%2014.0273L3.0975%2016.5398C4.7525%2019.7783%208.1135%2022.0003%2012%2022.0003Z%22%20fill%3D%22%234CAF50%22%2F%3E%0A%20%20%3Cpath%20d%3D%22M21.8055%2010.0415H21V10H12V14H17.6515C17.2571%2015.1082%2016.5467%2016.0766%2015.608%2016.7855L15.6095%2016.7845L18.7045%2019.4035C18.4855%2019.6025%2022%2017%2022%2012C22%2011.3295%2021.931%2010.675%2021.8055%2010.0415Z%22%20fill%3D%22%231976D2%22%2F%3E%0A%3C%2Fsvg%3E"
                  />
                  <_Builtin.Block tag="div">
                    {"Continue with Google"}
                  </_Builtin.Block>
                </_Builtin.Block>
              </_Builtin.Block>
              <_Builtin.Block
                className={_utils.cx(_styles, "su-cta-btn", "hide")}
                tag="div"
                {...onClickRegisterLinkedIn}
              >
                <_Builtin.Block
                  className={_utils.cx(_styles, "su-cta-btn-block")}
                  tag="div"
                >
                  <_Builtin.Image
                    loading="lazy"
                    width="auto"
                    height="auto"
                    alt=""
                    src="https://uploads-ssl.webflow.com/650c129b14ba3ec43088ffdd/65952d77be3f23e8022feb1c_LinkedIn%20-%20png%20-%2012px.svg"
                  />
                </_Builtin.Block>
              </_Builtin.Block>
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "signup-divider")}
              tag="div"
            >
              <_Builtin.Block className={_utils.cx(_styles, "hr")} tag="div" />
              <_Builtin.Block className={_utils.cx(_styles, "su-or")} tag="div">
                {"Or"}
              </_Builtin.Block>
              <_Builtin.Block className={_utils.cx(_styles, "hr")} tag="div" />
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "div-block-260")}
              tag="div"
            >
              {slotSignUpForm}
            </_Builtin.Block>
            <_Builtin.Block
              className={_utils.cx(_styles, "terms-sign-wrapper")}
              tag="div"
            >
              <_Builtin.Block
                className={_utils.cx(_styles, "full-width")}
                tag="div"
              >
                <ButtonSolid
                  isDisabled={isSignUpButtonVisible}
                  onClickButton={onClickSignUp}
                  size="2"
                  textButton="Sign Up"
                />
              </_Builtin.Block>
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, "div-block-660")}
            tag="div"
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "signup-terms-text")}
              tag="div"
            >
              {"By clicking signup you are agreeing to "}
              <_Builtin.Link
                className={_utils.cx(_styles, "basic-link-style")}
                button={false}
                block=""
                options={basicLinkStyleLink}
              >
                <_Builtin.Span className={_utils.cx(_styles, "text-underline")}>
                  {"terms and conditions"}
                </_Builtin.Span>
              </_Builtin.Link>
            </_Builtin.Block>
            <_Builtin.Block tag="div">
              {"Already have an account? "}
              <_Builtin.Span
                className={_utils.cx(_styles, "text-underline")}
                {...onClickSignIn}
              >
                {"Login "}
              </_Builtin.Span>
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
