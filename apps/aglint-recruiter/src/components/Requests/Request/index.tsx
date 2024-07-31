import { Collapse, Stack } from '@mui/material';
import { PropsWithChildren, useEffect, useRef, useState } from 'react';

import { ButtonSoft } from '@/devlink/ButtonSoft';
import type { Request as RequestType } from '@/src/queries/requests/types';

import Progression from './progression';

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
    <Stack>
      <Stack>{JSON.stringify(props)}</Stack>
      <Collapse in={collapse}>
        {mount && (
          <Stack>
            <Stack>---</Stack>
            <Progression id={props?.id} />
          </Stack>
        )}
      </Collapse>
      <ButtonSoft
        textButton={collapse ? 'Collapse' : 'Expand'}
        onClickButton={{
          onClick: () => {
            setCollapse((prev) => {
              if (prev === false) setMount(true);
              return !prev;
            });
          },
        }}
      />
    </Stack>
  );
};
