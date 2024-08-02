/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Collapse } from '@mui/material';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { GlobalIcon } from '@/devlink2/GlobalIcon';
import { RequestCard } from '@/devlink2/RequestCard';
import { RequestProvider } from '@/src/context/RequestContext';
import type { Request as RequestType } from '@/src/queries/requests/types';
import { capitalizeFirstLetter } from '@/src/utils/text/textUtils';

import RequestDetails from './RequestDetails';

export const Request = (
  props: PropsWithChildren<RequestType> & { index: number },
) => {
  const [collapse, setCollapse] = useState(false);
  const [mount, setMount] = useState(collapse);
  const initialRef = useRef(true);

  useEffect(() => {
    if (initialRef.current) {
      initialRef.current = false;
      return;
    }
    if (!collapse) {
      const timeout = setTimeout(() => setMount(false), 400);
      return () => clearTimeout(timeout);
    }
  }, [collapse]);

  return (
    <>
      <Collapse in={collapse} collapsedSize={60}>
        <RequestCard
          isNewBadgeVisible={props.status === 'to_do'}
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
              <div
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <GlobalIcon iconName={'more_vert'} size={4} />
              </div>
            </>
          }
          onClickCard={{
            onClick: () => {
              setCollapse((prev) => {
                if (prev === false) setMount(true);
                return !prev;
              });
            },
          }}
          isRequestDetailVisible={mount}
          slotRequestCardDetail={
            <div
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              {mount && (
                <RequestProvider request_id={props.id}>
                  <RequestDetails index={props.index} request={props} />
                </RequestProvider>
              )}
            </div>
          }
        />
      </Collapse>
    </>
  );
};
