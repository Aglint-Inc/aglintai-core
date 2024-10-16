import { SafeObject } from '@/utils/safeObject';

import type { Job } from '../types';

export const Banners = ({ job }: { job: Job }) => {
  return (
    <>
      <Banner {...errorCount(job)} />
      <Banner {...warningCount(job)} />
      <Banner
        type='generating'
        state={job.banner.scoring_criteria_generating}
      />
      <Banner {...processingCount(job)} />
    </>
  );
};

const errorCount = ({ banner }: Job): CountBanner => {
  let count = 0;
  if (banner.scoring_criteria_missing) count++;
  count += SafeObject.values(banner.missing_info).filter(Boolean).length;
  return {
    count,
    type: 'error',
  };
};

const warningCount = ({ banner }: Job): CountBanner => {
  let count = 0;
  if (banner.interview_plan_missing) count++;
  if (banner.scoring_criteria_changed) count++;
  return {
    count,
    type: 'warning',
  };
};

const processingCount = ({ processing_count }: Job): ProcessingBanner => {
  const total = SafeObject.values(processing_count).reduce((acc, curr) => {
    acc += curr;
    return acc;
  }, 0);
  const processed =
    processing_count.processed +
    processing_count.unavailable +
    processing_count.unparsable +
    processing_count.unscorable;
  return {
    type: 'processing',
    processed,
    total,
  };
};

type BannerProps = CountBanner | GenerationBanner | ProcessingBanner;

type CountBanner = {
  type: 'warning' | 'error';
  count: number;
};

type GenerationBanner = {
  type: 'generating';
  state: boolean;
};

type ProcessingBanner = {
  type: 'processing';
  processed: number;
  total: number;
};

const Banner = (props: BannerProps) => {
  if (props.type === 'generating')
    return props.state ? <div>⚙️ Generating criteria</div> : <></>;
  if (props.type === 'processing')
    return props.processed !== props.total ? (
      <div>
        ⏳ {props.processed}/{props.total} Applications processed{' '}
      </div>
    ) : (
      <></>
    );
  if (props.count === 0) return <></>;
  switch (props.type) {
    case 'error':
      return <div>🚫 {props.count} Errors</div>;
    case 'warning':
      return <div>⚠️ {props.count} Warnings</div>;
  }
};
