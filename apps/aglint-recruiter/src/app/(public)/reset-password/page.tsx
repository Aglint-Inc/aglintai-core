'use client';
import ResetPasswordComponent from '@components/ResetPassword';
import React from 'react';

import { SeoPro } from '@/src/components/Common/SeoPro';

function ResetPasswordPage() {
  return (
    <div>
      <SeoPro
        title='Reset Password | Aglint AI'
        description='AI for People Products'
      />
      <ResetPasswordComponent />
    </div>
  );
}

export default ResetPasswordPage;
