import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { AlertTriangle, Ban, CircleDashed, Loader2 } from 'lucide-react';

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
    return props.state ? (
      <div className='flex items-center space-x-2'>
        <Loader2 className='infinite text-warning h-8 w-8 animate-spin' />
        Generating criteria
      </div>
    ) : (
      <></>
    );
  if (props.type === 'processing')
    return props.processed !== props.total ? (
      <div className='flex items-center space-x-2'>
        <Tooltip>
          <TooltipTrigger asChild>
            <CircleDashed className='infinite text-warning h-4 w-4 animate-spin text-yellow-600' />
          </TooltipTrigger>
          <TooltipContent>
            {props.processed}/{props.total} Applications processing
          </TooltipContent>
        </Tooltip>
      </div>
    ) : (
      <></>
    );
  if (props.count === 0) return <></>;
  switch (props.type) {
    case 'error':
      return (
        <Tooltip>
          <TooltipTrigger asChild className='text-destructive'>
            <Ban className='h-4 w-4' />
          </TooltipTrigger>
          <TooltipContent className='text-destructive'>
            {props.count} Errors
          </TooltipContent>
        </Tooltip>
      );
    case 'warning':
      return (
        <Tooltip>
          <TooltipTrigger asChild className='text-warning'>
            <AlertTriangle className='h-4 w-4' />
          </TooltipTrigger>
          <TooltipContent className='text-warning'>
            {props.count} Warnings
          </TooltipContent>
        </Tooltip>
      );
  }
};
