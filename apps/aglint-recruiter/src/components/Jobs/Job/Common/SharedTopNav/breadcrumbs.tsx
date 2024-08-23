import { useRouter } from 'next/router';

import { ButtonGhost } from '@/devlink/ButtonGhost';
import { Breadcrum } from '@/devlink2/Breadcrum';
import { useJob } from '@/src/context/JobContext';
import ROUTES from '@/src/utils/routing/routes';
import { capitalizeSentence } from '@/src/utils/text/textUtils';

export const SharedBreadCrumbs = () => {
  const router = useRouter();
  const { job } = useJob();
  return (
    <>
      <Breadcrum
        isLink
        textName={`Jobs`}
        onClickLink={{
          onClick: () => router.push(ROUTES['/jobs']()),
          style: { cursor: 'pointer' },
        }}
      />
      <Breadcrum
        textName={`${capitalizeSentence(job?.job_title ?? 'Job')}`}
        showArrow
      />
      <Preview />
    </>
  );
};

const Preview = () => {
  const { job } = useJob();
  const handlePreview = () => {
    window.open(
      `${process.env.NEXT_PUBLIC_WEBSITE}/job-post/${job?.id}`,
      '_blank',
    );
  };
  if (job?.status === 'closed' || job?.posted_by !== 'Aglint') return <></>;
  return (
    <ButtonGhost
      size={'2'}
      iconColor={'var(--info-11)'}
      iconSize={'4'}
      isRightIcon={true}
      isLeftIcon={false}
      textButton={'Preview'}
      iconName={'open_in_new'}
      onClickButton={{
        onClick: handlePreview,
      }}
    />
  );
};
