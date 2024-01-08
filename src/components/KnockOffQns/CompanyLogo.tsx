import Image from 'next/image';

import { useScreeningCtx } from './ScreeningCtx';

const CompanyLogo = () => {
  const { state } = useScreeningCtx();

  return <Image src={state.companyLogo} height={100} width={200} alt='' />;
};

export default CompanyLogo;
