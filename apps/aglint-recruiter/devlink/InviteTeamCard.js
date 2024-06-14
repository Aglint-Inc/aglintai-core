"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _interactions from "./interactions";
import { Text } from "./Text";
import * as _utils from "./utils";
import _styles from "./InviteTeamCard.module.css";

const _interactionsData = JSON.parse(
  '{"events":{"e-1576":{"id":"e-1576","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1577"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972142},"e-1577":{"id":"e-1577","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1576"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"627f9dba-f186-82c1-a71f-5a95f8ccc427","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718275972144},"e-1578":{"id":"e-1578","name":"","animationType":"custom","eventTypeId":"MOUSE_OVER","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-613","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1579"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624481},"e-1579":{"id":"e-1579","name":"","animationType":"custom","eventTypeId":"MOUSE_OUT","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-614","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-1578"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]},"targets":[{"id":"5bae7064-a4ab-5c07-f32d-92c0deb12e6f","appliesTo":"ELEMENT","styleBlockIds":[]}],"config":{"loop":false,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1718276624482}},"actionLists":{"a-613":{"id":"a-613","title":"score pill hover in","actionItemGroups":[{"actionItems":[{"id":"a-613-n","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]},{"actionItems":[{"id":"a-613-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":1,"unit":""}}]}],"useFirstGroupAsInitialState":true,"createdOn":1718275975402},"a-614":{"id":"a-614","title":"score pill hover out","actionItemGroups":[{"actionItems":[{"id":"a-614-n-2","actionTypeId":"STYLE_OPACITY","config":{"delay":0,"easing":"ease","duration":300,"target":{"useEventTarget":"CHILDREN","selector":".icons","selectorGuids":["c637f5c7-9613-2c22-7371-c11bf4042351"]},"value":0,"unit":""}}]}],"useFirstGroupAsInitialState":false,"createdOn":1718275975402}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}'
);

export function InviteTeamCard({
  as: _Component = _Builtin.Block,
  slotAvatar,
  textName = "name",
  textEmail = "Email",
}) {
  _interactions.useInteractions(_interactionsData, _styles);

  return (
    <_Component className={_utils.cx(_styles, "itc-wrap")} tag="div">
      <_Builtin.Block tag="div">
        <_Builtin.Block
          className={_utils.cx(_styles, "team-user-image-wrap")}
          tag="div"
        >
          {slotAvatar}
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, "tu-list-item-user-info")}
          tag="div"
        >
          <Text content={textName} weight="medium" />
          <Text content={textEmail} color="neutral" />
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "invited-badge-wrap")}
        tag="div"
      >
        <_Builtin.HtmlEmbed
          className={_utils.cx(_styles, "icons")}
          value="%3Csvg%20width%3D%2225%22%20height%3D%2217%22%20viewbox%3D%220%200%2025%2017%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%0A%3Cpath%20d%3D%22M1.71969%200.5H16.6237C17.1014%200.523885%2017.5074%200.691077%2017.8418%201.00158C18.1523%201.33596%2018.3195%201.742%2018.3434%202.21969C18.3195%202.79292%2018.0926%203.24673%2017.6627%203.58111L17.1611%203.97521C15.943%204.09463%2014.8801%204.51261%2013.9725%205.22915C13.041%205.9218%2012.3603%206.81747%2011.9304%207.91617L9.85239%209.45672C9.39859%209.74334%208.94478%209.74334%208.49097%209.45672L0.680711%203.58111C0.250788%203.24673%200.0238846%202.79292%200%202.21969C0.0238846%201.742%200.191077%201.33596%200.501576%201.00158C0.835961%200.691077%201.242%200.523885%201.71969%200.5ZM10.5331%2010.3524L11.5004%209.63586C11.4765%209.85082%2011.4646%2010.0538%2011.4646%2010.2449C11.4885%2011.7974%2011.9662%2013.1349%2012.8977%2014.2575H2.29292C1.64804%2014.2336%201.11063%2014.0067%200.680711%2013.5768C0.250788%2013.1469%200.0238846%2012.6095%200%2011.9646V4.51261L7.81026%2010.3524C8.2163%2010.6629%208.67011%2010.8181%209.17168%2010.8181C9.67326%2010.8181%2010.1271%2010.6629%2010.5331%2010.3524ZM22.9292%2010.2449C22.9292%2011.1764%2022.7023%2012.0363%2022.2485%2012.8244C21.7947%2013.6126%2021.1617%2014.2456%2020.3497%2014.7233C19.5376%2015.1771%2018.6777%2015.404%2017.7701%2015.404C16.8625%2015.404%2016.0027%2015.1771%2015.1906%2014.7233C14.3785%2014.2456%2013.7456%2013.6126%2013.2918%2012.8244C12.838%2012.0363%2012.6111%2011.1764%2012.6111%2010.2449C12.6111%209.31341%2012.838%208.45357%2013.2918%207.66538C13.7456%206.87719%2014.3785%206.24424%2015.1906%205.76655C16.0027%205.31275%2016.8625%205.08584%2017.7701%205.08584C18.6777%205.08584%2019.5376%205.31275%2020.3497%205.76655C21.1617%206.24424%2021.7947%206.87719%2022.2485%207.66538C22.7023%208.45357%2022.9292%209.31341%2022.9292%2010.2449ZM21.3313%208.29593C21.0686%208.05708%2020.4333%207.28772%2020.1705%207.52657C20.1705%207.52657%2018.7733%204.3693%2018.3075%206.51892C17.8418%208.66853%2015.5919%206.92018%2015.5919%206.92018C15.0545%2010.2592%2014.7153%208.97425%2014.4526%209.2131C14.2137%209.47583%2014.2137%2010.7847%2014.4526%2011.0474L15.8283%2012.8818C16.091%2013.1206%2018.0448%2013.8157%2018.3075%2013.5768L21.7899%2011.0474C22.0288%2010.7847%2021.5702%208.55866%2021.3313%208.29593Z%22%20fill%3D%22%2368737D%22%2F%3E%0A%3Cpath%20d%3D%22M18.1212%2015.4632C17.118%2015.4488%2016.2009%2015.2052%2015.3697%2014.7323C14.5385%2014.245%2013.8649%2013.5715%2013.349%2012.7116C12.8618%2011.8375%2012.6182%2010.9203%2012.6182%209.96014C12.6182%208.99998%2012.8618%208.08282%2013.349%207.20864C13.8649%206.34879%2014.5385%205.67525%2015.3697%205.188C16.2009%204.71509%2017.118%204.47147%2018.1212%204.45714C19.1243%204.47147%2020.0415%204.71509%2020.8727%205.188C21.7039%205.67525%2022.3774%206.34879%2022.8933%207.20864C23.3806%208.08282%2023.6242%208.99998%2023.6242%209.96014C23.6242%2010.9203%2023.3806%2011.8375%2022.8933%2012.7116C22.3774%2013.5715%2021.7039%2014.245%2020.8727%2014.7323C20.0415%2015.2052%2019.1243%2015.4488%2018.1212%2015.4632ZM20.5502%208.94983C20.7509%208.7062%2020.7509%208.46258%2020.5502%208.21896C20.3066%208.01833%2020.063%208.01833%2019.8194%208.21896L17.4333%2010.605L16.423%209.59471C16.1794%209.39408%2015.9357%209.39408%2015.6921%209.59471C15.4915%209.83833%2015.4915%2010.082%2015.6921%2010.3256L17.0679%2011.7013C17.3115%2011.902%2017.5551%2011.902%2017.7987%2011.7013L20.5502%208.94983Z%22%20fill%3D%22%23228F67%22%2F%3E%0A%3C%2Fsvg%3E"
        />
        <Text size="1" weight="medium" content="Invited" />
      </_Builtin.Block>
    </_Component>
  );
}
