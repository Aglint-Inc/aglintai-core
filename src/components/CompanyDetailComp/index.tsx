import { useState } from 'react';

import { CompanySetting } from '@/devlink';

import CompanyInfoComp from './CompanyInfoComp';
import CompanyJdComp from './CompanyJdComp';
import LoaderGrey from '../Common/LoaderGrey';

const CompanyDetailComp = () => {
  const [isSaving, setIsSaving] = useState(false);

  return (
    <>
      <CompanySetting
        slotSavingLottie={<LoaderGrey />}
        isSaving={isSaving}
        isSaved={!isSaving}
        slotCompanyInfo={<CompanyInfoComp setIsSaving={setIsSaving} />}
        slotCompanyJdSetting={<CompanyJdComp setIsSaving={setIsSaving} />}
      />
    </>
  );
};

export default CompanyDetailComp;
