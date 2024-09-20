import { Img, Text } from '@react-email/components';
import React from 'react';
import { aglintLogo } from '../../utils/assets/common';

const currentYear = new Date().getFullYear();

export const Footer = () => {
  return (
    <Text className="flex items-center text-[10px]  mx-auto w-fit text-neutral-11">
      Powered By
      <Img
        alt="Aglint Logo"
        className="line-block mx-2 w-[24px] h-[24px]"
        src={aglintLogo}
      />
      @ {currentYear} Aglint Inc. All Right Reserved
    </Text>
  );
};
