import React from 'react';
import * as _Builtin from './_Builtin';
import * as _interactions from './interactions';
import * as _utils from './utils';
import _styles from './SkeletalUnit.module.css';

const _interactionsData = JSON.parse(
  '{"events":{"e-89":{"id":"e-89","name":"","animationType":"custom","eventTypeId":"SCROLL_INTO_VIEW","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-90"}},"mediaQueries":["main","medium","small","tiny"],"target":{"selector":".skeletal","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"},"targets":[{"selector":".skeletal","originalId":"4b74a769-3059-edcf-484b-79f39ef0625b","appliesTo":"CLASS"}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":0,"scrollOffsetUnit":"%","delay":null,"direction":null,"effectIn":null},"createdOn":1701328353763},"e-113":{"id":"e-113","name":"","animationType":"custom","eventTypeId":"PAGE_START","action":{"id":"","actionTypeId":"GENERAL_START_ACTION","config":{"delay":0,"easing":"","duration":0,"actionListId":"a-25","affectedElements":{},"playInReverse":false,"autoStopEventId":"e-114"}},"mediaQueries":["main","medium","small","tiny"],"target":{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]},"targets":[{"id":"wf-page-id","appliesTo":"PAGE","styleBlockIds":[]}],"config":{"loop":true,"playInReverse":false,"scrollOffsetValue":null,"scrollOffsetUnit":null,"delay":null,"direction":null,"effectIn":null},"createdOn":1704896223350}},"actionLists":{"a-25":{"id":"a-25","title":"skeletal-loader","actionItemGroups":[{"actionItems":[{"id":"a-25-n","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":500,"target":{"useEventTarget":"CHILDREN","selector":".skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"yValue":-50,"xUnit":"%","yUnit":"%","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-2","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":2000,"target":{"useEventTarget":"CHILDREN","selector":".skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]},{"actionItems":[{"id":"a-25-n-3","actionTypeId":"TRANSFORM_MOVE","config":{"delay":0,"easing":"","duration":0,"target":{"useEventTarget":"CHILDREN","selector":".skeletal-block.overlay","selectorGuids":["2ec0bc5c-523b-1d16-4320-7857f59c4392","0b04d1ab-054e-0f32-73a8-61df6c81b023"]},"xValue":-100,"xUnit":"%","yUnit":"PX","zUnit":"PX"}}]}],"useFirstGroupAsInitialState":true,"createdOn":1698671059774}},"site":{"mediaQueries":[{"key":"main","min":992,"max":10000},{"key":"medium","min":768,"max":991},{"key":"small","min":480,"max":767},{"key":"tiny","min":0,"max":479}]}}',
);

export function SkeletalUnit({ as: _Component = _Builtin.Block }) {
  _interactions.useInteractions(_interactionsData, _styles);
  return (
    <_Component
      className={_utils.cx(_styles, 'skeletal-wrapper', 'h-40')}
      tag='div'
    >
      <_Builtin.Block
        className={_utils.cx(_styles, 'skeletal-block')}
        tag='div'
      />
      <_Builtin.Block
        className={_utils.cx(_styles, 'skeletal-block', 'overlay')}
        tag='div'
      />
    </_Component>
  );
}
