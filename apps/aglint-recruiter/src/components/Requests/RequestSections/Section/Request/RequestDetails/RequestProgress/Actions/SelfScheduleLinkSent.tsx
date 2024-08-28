/* eslint-disable jsx-a11y/no-static-element-interactions */
import { DatabaseTable } from '@aglint/shared-types';
import { Stack } from '@mui/material';
import React, { useState } from 'react';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { GlobalIcon } from '@/devlink2/GlobalIcon';
import { Text } from '@/devlink2/Text';

const SelfScheduleLinkSent = (args: DatabaseTable['request_progress']) => {
  const [isCopied, setIsCopied] = useState(false);
  return (
    <>
      <Stack direction={'row'} alignItems={'center'} gap={0}>
        <GlobalIcon iconName='check' />
        <Text
          size={1}
          color={'neutral'}
          content={'Candidate self schedule link'}
        />
        <ButtonGhost
          onClickButton={{
            onClick: () => {
              setIsCopied(true);
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_HOST_NAME}/scheduling/invite/${'application_id'}?filter_id=${args.meta.filter_json_id}`,
              );
              setTimeout(() => {
                setIsCopied(false);
              }, 3000);
            },
          }}
          size={1}
          color={'neutral'}
          textButton={isCopied ? 'Copied' : 'Copy'}
        />
      </Stack>
    </>
  );
};

export default SelfScheduleLinkSent;
