/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Collapse, Stack } from '@mui/material';
import { type PropsWithChildren, useState } from 'react';

import { ButtonSoft } from '@/devlink2/ButtonSoft';
import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { RequestCard } from '@/devlink2/RequestCard';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { useRequest } from '@/src/context/RequestContext';
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
            gap={'16px'}
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
                    <Stack height={'24px'}>
                      {isHover && (
                        <Stack>
                          <ButtonSoft
                            textButton='View Details'
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
