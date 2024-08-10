/* eslint-disable jsx-a11y/no-static-element-interactions */
import { getFullName } from '@aglint/shared-utils';
import { Collapse, Stack } from '@mui/material';
import type { PropsWithChildren } from 'react';

import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { RequestCard } from '@/devlink2/RequestCard';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { useRequest } from '@/src/context/RequestContext';
import { useRequests } from '@/src/context/RequestsContext';
import type { Request as RequestType } from '@/src/queries/requests/types';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import MoreOptions from './MoreOptions';
import RequestDetails from './RequestDetails';

export const Request = (
  props: PropsWithChildren<RequestType> & { index: number },
) => {
  const { collapse, setCollapse, isMutating } = useRequest();
  const { handleAsyncUpdateRequest } = useRequests();
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
        <Collapse in={collapse} collapsedSize={22}>
          <Stack gap={'10px'}>
            <RequestCard
              isNewBadgeVisible={props.is_new}
              slotBadgeNew={
                <GlobalBadge
                  size={1}
                  textBadge={'New'}
                  color={'purple'}
                  variant={'solid'}
                />
              }
              textTitle={props.title.replace(
                '{{candidateName}}',
                getFullName(
                  props.applications.candidates.first_name,
                  props.applications.candidates.last_name,
                ),
              )}
              slotRightIcons={
                <>
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
