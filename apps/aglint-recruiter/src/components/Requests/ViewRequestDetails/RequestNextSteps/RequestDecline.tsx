import { Dialog, DialogContent } from '@radix-ui/react-dialog';
import React from 'react';

import { UIButton } from '@/components/Common/UIButton';

const RequestDecline = () => {
  //
  return (
    <>
      <UIButton
        size='sm'
        onClick={() => {
          //
        }}
      >
        Change Interviewer
      </UIButton>
      <Dialog
        open={false}
        onOpenChange={() => {
          //
        }}
      >
        <DialogContent className='p-0'>{/*  */}</DialogContent>
      </Dialog>
    </>
  );
};

export default RequestDecline;
