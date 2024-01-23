import React from 'react';
import * as _Builtin from './_Builtin';
import { ChatboxCandidateListItem } from './ChatboxCandidateListItem';
import { ChatboxBodyHeader } from './ChatboxBodyHeader';
import * as _utils from './utils';
import _styles from './ChatboxPage.module.css';

export function ChatboxPage({
  as: _Component = _Builtin.Block,
  slotSearch,
  slotCandidateList,
  slotChatHeader,
  slotChatBody,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, 'chatbot-page-wrapper')}
      tag='div'
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'cb-header-block')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'text-lg', 'fw-semibold')}
          tag='div'
        >
          {'Assistant'}
        </_Builtin.Block>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, 'cb-body-wrapper')}
        tag='div'
      >
        <_Builtin.Block
          className={_utils.cx(_styles, 'cb-candidates-wrapper')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'cb-candidate-search-block')}
            tag='div'
          >
            {slotSearch}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'cb-candidates-list-wrapper')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'cb-candidates-list')}
              tag='div'
            >
              {slotCandidateList ?? <ChatboxCandidateListItem />}
            </_Builtin.Block>
          </_Builtin.Block>
        </_Builtin.Block>
        <_Builtin.Block
          className={_utils.cx(_styles, 'cb-chat-wrapper')}
          tag='div'
        >
          <_Builtin.Block
            className={_utils.cx(_styles, 'cb-chat-body-header-wrapper')}
            tag='div'
          >
            {slotChatHeader ?? <ChatboxBodyHeader />}
          </_Builtin.Block>
          <_Builtin.Block
            className={_utils.cx(_styles, 'chat-body-main')}
            tag='div'
          >
            <_Builtin.Block
              className={_utils.cx(_styles, 'cb-chat-body-main-block')}
              tag='div'
            >
              {slotChatBody}
            </_Builtin.Block>
          </_Builtin.Block>
          <_Builtin.HtmlEmbed
            className={_utils.cx(_styles, 'hide')}
            value='%3Cstyle%3E%0A%5Bclass*%3D%22ChatboxPage_cb-chat-body-main-wrapper__%22%5D%7B%0A%20height%3Acalc(100vh%20-%20132px)%3B%0A%7D%0A%3C%2Fstyle%3E'
          />
        </_Builtin.Block>
      </_Builtin.Block>
    </_Component>
  );
}
