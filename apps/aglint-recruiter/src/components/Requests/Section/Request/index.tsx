/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Collapse } from '@mui/material';
import type { PropsWithChildren } from 'react';

import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { RequestCard } from '@/devlink2/RequestCard';
import OptimisticWrapper from '@/src/components/NewAssessment/Common/wrapper/loadingWapper';
import { useRequest } from '@/src/context/RequestContext';
import type { Request as RequestType } from '@/src/queries/requests/types';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import MoreOptions from './MoreOptions';
import RequestDetails from './RequestDetails';

export const Request = (
  props: PropsWithChildren<RequestType> & { index: number },
) => {
  const { collapse, setCollapse, isMutating } = useRequest();

  return (
    <OptimisticWrapper loading={isMutating}>
      <Collapse in={collapse} collapsedSize={46}>
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
          textTitle={props.title}
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
            onClick: () => setCollapse((prev) => !prev),
          }}
          isRequestDetailVisible={true}
          slotRequestCardDetail={
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <RequestDetails index={props.index} request={props} />
            </div>
          }
        />
      </Collapse>
    </OptimisticWrapper>
  );
};
