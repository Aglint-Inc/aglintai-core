"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import { GlobalIcon } from "./GlobalIcon";
import * as _utils from "./utils";
import _styles from "./OnboardingFinalState.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function OnboardingFinalState({
  as: _Component = _Builtin.Block,
  onClickImportJob = {},
  onClickSourceCandidates = {},
  onClickScheduleInterview = {},
  isSourcingVisible = true,
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component
      className={_utils.cx(_styles, "onboarding-final-wrap")}
      tag="div"
    >
      <_Builtin.HtmlEmbed value="%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20viewBox%3D%220%200%2032%2032%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Crect%20width%3D%2232%22%20height%3D%2232%22%20rx%3D%224%22%20fill%3D%22%23FF9C00%22%20fill-opacity%3D%220.160784%22%3E%3C%2Frect%3E%0A%3Cpath%20d%3D%22M22.325%2015.6049C20.17%2015.0649%2019.09%2014.7999%2018.345%2014.0549C17.6%2013.3049%2017.335%2012.2299%2016.795%2010.0749L16%206.8999L15.205%2010.0749C14.665%2012.2299%2014.4%2013.3099%2013.655%2014.0549C12.905%2014.7999%2011.83%2015.0649%209.675%2015.6049L6.5%2016.3999L9.675%2017.1949C11.83%2017.7349%2012.91%2017.9999%2013.655%2018.7449C14.4%2019.4949%2014.665%2020.5699%2015.205%2022.7249L16%2025.8999L16.795%2022.7249C17.335%2020.5699%2017.6%2019.4899%2018.345%2018.7449C19.095%2017.9999%2020.17%2017.7349%2022.325%2017.1949L25.5%2016.3999L22.325%2015.6049Z%22%20fill%3D%22%23F76B15%22%3E%3C%2Fpath%3E%0A%3Cpath%20d%3D%22M23.7083%207.33527C22.9899%207.15527%2022.6299%207.06693%2022.3815%206.81859C22.1332%206.56859%2022.0449%206.21027%2021.8649%205.49193L21.5999%204.43359L21.3349%205.49193C21.1549%206.21027%2021.0666%206.57027%2020.8183%206.81859C20.5683%207.06693%2020.2099%207.15527%2019.4915%207.33527L18.4332%207.60027L19.4915%207.86527C20.2099%208.04527%2020.5699%208.13359%2020.8183%208.38193C21.0666%208.63193%2021.1549%208.99027%2021.3349%209.70859L21.5999%2010.7669L21.8649%209.70859C22.0449%208.99027%2022.1332%208.63027%2022.3815%208.38193C22.6315%208.13359%2022.9899%208.04527%2023.7083%207.86527L24.7666%207.60027L23.7083%207.33527Z%22%20fill%3D%22%23F76B15%22%3E%3C%2Fpath%3E%0A%3C%2Fsvg%3E" />
      <_Builtin.Block
        className={_utils.cx(_styles, "flex-vertical", "center", "gap-2")}
        tag="div"
      >
        <Text
          content="Welcome to the Future of Recruiting"
          size="4"
          weight="bold"
          align=""
          highContrast=""
        />
        <Text
          content="Kickstart your hiring journey by choosing your best starting point"
          size="2"
          weight=""
          align=""
          highContrast=""
          color="neutral"
        />
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "onboarding-card-wrap")}
        tag="div"
      >
        <_Builtin.Block
          className={_utils.cx(_styles, "onboarding-card")}
          tag="div"
          {...onClickImportJob}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "onboarding-icon-wrap")}
            tag="div"
          >
            <GlobalIcon
              iconName="business_center"
              size="8"
              weight="thin"
              color="neutral-11"
            />
          </_Builtin.Block>
          <Text
            content="Create or Import Your Job"
            size="2"
            weight="bold"
            align=""
            highContrast=""
          />
          <Text
            content="Effortlessly create new job from scratch or seamlessly import existing ones from popular ATS platforms like Greenhouse, Lever, and Ashby."
            size="2"
            weight=""
            align=""
            highContrast=""
            color="neutral"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "onboarding-arrow-wrap")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewbox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.3984%208.60156C12.6172%208.86719%2012.6172%209.13281%2012.3984%209.39844L7.89844%2013.8984C7.63281%2014.1172%207.36719%2014.1172%207.10156%2013.8984C6.88281%2013.6328%206.88281%2013.3672%207.10156%2013.1016L11.2031%209L7.10156%204.89844C6.88281%204.63281%206.88281%204.36719%207.10156%204.10156C7.36719%203.88281%207.63281%203.88281%207.89844%204.10156L12.3984%208.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
        {isSourcingVisible ? (
          <_Builtin.Block
            className={_utils.cx(_styles, "onboarding-card")}
            tag="div"
            {...onClickSourceCandidates}
          >
            <_Builtin.Block
              className={_utils.cx(_styles, "onboarding-icon-wrap")}
              tag="div"
            >
              <GlobalIcon
                iconName="person_search"
                size="8"
                weight="thin"
                color="neutral-11"
              />
            </_Builtin.Block>
            <Text
              content="Source Candidates"
              size="2"
              weight="bold"
              align=""
              highContrast=""
            />
            <Text
              content="Effortlessly explore diverse candidates, build custom lists, seamlessly reach out via email, and efficiently streamline your hiring process."
              size="2"
              weight=""
              align=""
              highContrast=""
              color="neutral"
            />
            <_Builtin.Block
              className={_utils.cx(_styles, "onboarding-arrow-wrap")}
              tag="div"
            >
              <_Builtin.HtmlEmbed
                className={_utils.cx(_styles, "icons")}
                value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewbox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.3984%208.60156C12.6172%208.86719%2012.6172%209.13281%2012.3984%209.39844L7.89844%2013.8984C7.63281%2014.1172%207.36719%2014.1172%207.10156%2013.8984C6.88281%2013.6328%206.88281%2013.3672%207.10156%2013.1016L11.2031%209L7.10156%204.89844C6.88281%204.63281%206.88281%204.36719%207.10156%204.10156C7.36719%203.88281%207.63281%203.88281%207.89844%204.10156L12.3984%208.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
              />
            </_Builtin.Block>
          </_Builtin.Block>
        ) : null}
        <_Builtin.Block
          className={_utils.cx(_styles, "onboarding-card")}
          tag="div"
          {...onClickScheduleInterview}
        >
          <_Builtin.Block
            className={_utils.cx(_styles, "onboarding-icon-wrap")}
            tag="div"
          >
            <GlobalIcon
              iconName="calendar_month"
              size="8"
              weight="thin"
              color="neutral-11"
            />
          </_Builtin.Block>
          <Text
            content="Schedule Interview"
            size="2"
            weight="bold"
            align=""
            highContrast=""
          />
          <Text
            content="Efficiently schedule candidate interviews by optimizing availability for all parties involved. Easily coordinate schedules in one centralized place."
            size="2"
            weight=""
            align=""
            highContrast=""
            color="neutral"
          />
          <_Builtin.Block
            className={_utils.cx(_styles, "onboarding-arrow-wrap")}
            tag="div"
          >
            <_Builtin.HtmlEmbed
              className={_utils.cx(_styles, "icons")}
              value="%3Csvg%20width%3D%2218%22%20height%3D%2218%22%20viewbox%3D%220%200%2018%2018%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M12.3984%208.60156C12.6172%208.86719%2012.6172%209.13281%2012.3984%209.39844L7.89844%2013.8984C7.63281%2014.1172%207.36719%2014.1172%207.10156%2013.8984C6.88281%2013.6328%206.88281%2013.3672%207.10156%2013.1016L11.2031%209L7.10156%204.89844C6.88281%204.63281%206.88281%204.36719%207.10156%204.10156C7.36719%203.88281%207.63281%203.88281%207.89844%204.10156L12.3984%208.60156Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3C%2Fsvg%3E"
            />
          </_Builtin.Block>
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
