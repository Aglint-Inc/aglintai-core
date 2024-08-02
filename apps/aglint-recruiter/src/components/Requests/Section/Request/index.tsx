import { Collapse } from '@mui/material';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { GlobalBadge } from '@/devlink2/GlobalBadge';
import { RequestCard } from '@/devlink2/RequestCard';
import { RequestProvider } from '@/src/context/RequestContext';
import type { Request as RequestType } from '@/src/queries/requests/types';

import RequestDetails from './RequestDetails';

export const Request = (props: PropsWithChildren<RequestType>) => {
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
      <Collapse in={collapse} collapsedSize={55}>
        <RequestCard
          textTitle={props.title}
          slotBadgeNew={<GlobalBadge size={1} textBadge={'New'} />}
          isNewBadgeVisible={false}
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
            mount && (
              <RequestProvider request_id={props.id}>
                <RequestDetails />
              </RequestProvider>
            )
          }
        />
      </Collapse>
    </>
  );
};
