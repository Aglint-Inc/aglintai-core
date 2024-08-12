'use client';
import ForgotPasswordComponent from '@components/ForgotPassword';
import React from 'react';

import { SeoPro } from '@/src/components/Common/SeoPro';

export default function ForgotPasswordPage() {
  return (
    <div>
      <SeoPro
        title='Forgot Password | Aglint AI'
        description='AI for People Products'
      />
      <ForgotPasswordComponent />
    </div>
  );
}
