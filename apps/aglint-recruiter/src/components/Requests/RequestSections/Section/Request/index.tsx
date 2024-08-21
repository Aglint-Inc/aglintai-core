/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Collapse, Stack } from '@mui/material';
import { type PropsWithChildren, useState } from 'react';

import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { RequestCard } from '@/devlink2/RequestCard';
import { IconButtonSoft } from '@/devlink3/IconButtonSoft';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { useRequest } from '@/src/context/RequestContext';
import { useRequests } from '@/src/context/RequestsContext';
import { useRouterPro } from '@/src/hooks/useRouterPro';
import type { Request as RequestType } from '@/src/queries/requests/types';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import { getRequestTitle } from '../../../AgentChats/AgentInputBox';
import MoreOptions from './MoreOptions';
import RequestDetails from './RequestDetails';

export const Request = (
  props: PropsWithChildren<RequestType> & { index: number },
) => {
  const { collapse, setCollapse, isMutating } = useRequest();
  const { handleAsyncUpdateRequest } = useRequests();
  const { push } = useRouterPro();

  const [isHover, setIsHover] = useState(false);
  return (
    <OptimisticWrapper loading={isMutating}>
      <div
        style={{
          padding: '12px',
          backgroundColor: 'white',
          borderRadius: '8px',
          border: '1px solid var(--neutral-5)',
        }}
      >
        <Collapse in={collapse} collapsedSize={24}>
          <Stack
            gap={'10px'}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
          >
            <RequestCard
              isNewBadgeVisible={false}
              slotBadgeNew={
                <GlobalBadge
                  size={1}
                  textBadge={'New'}
                  color={'purple'}
                  variant={'solid'}
                />
              }
              textTitle={getRequestTitle({
                title: props.title,
                first_name: props.applications.candidates.first_name,
                last_name: props.applications.candidates.last_name,
              })}
              slotRightIcons={
                <>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <Stack width={'24px'} height={'24px'}>
                      {isHover && (
                        <Stack>
                          <IconButtonSoft
                            iconName='arrow_outward'
                            color={'neutral'}
                            size={1}
                            onClickButton={{
                              onClick: () => {
                                push('/requests/' + props.id);
                              },
                            }}
                          />
                        </Stack>
                      )}
                    </Stack>
                  </div>
                  <GlobalBadge
                    size={1}
                    textBadge={capitalizeFirstLetter(props.status)}
                    color={
                      props.status === 'to_do'
                        ? 'purple'
                        : props.status === 'in_progress'
                          ? 'info'
                          : props.status === 'blocked'
                            ? 'error'
                            : props.status === 'completed'
                              ? 'success'
                              : 'neutral'
                    }
                  />
                  <MoreOptions request_id={props.id} />
                </>
              }
              onClickCard={{
                onClick: () => {
                  setCollapse((prev) => !prev);
                  if (props.is_new) {
                    handleAsyncUpdateRequest({
                      payload: {
                        requestId: props.id,
                        requestPayload: { is_new: false },
                      },
                      loading: false,
                      toast: false,
                    });
                  }
                },
              }}
            />
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <RequestDetails index={props.index} request={props} />
            </div>
          </Stack>
        </Collapse>
      </div>
    </OptimisticWrapper>
  );
};
