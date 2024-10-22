import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@components/ui/tooltip';
import { AlertTriangle, CircleDashed } from 'lucide-react';

import { type Application } from '@/types/applications.types';

import { ScoreTag } from './ScoreTag';

export const ResumeScore = ({
  resume_processing_state,
  resume_score,
}: Pick<Application, 'resume_processing_state' | 'resume_score'>) => {
  const renderContent = () => {
    switch (resume_processing_state) {
      case 'unavailable':
        return <ErrorIcon />;
      case 'fetching':
      case 'processing':
        return <Calculating />;
      case 'unparsable':
        return <WarningIcon />;
      case 'processed':
        return <ScoreTag score={resume_score!} />;
      case 'unscorable':
        return <span className='text-muted-foreground'>---</span>;
      default:
        return null;
    }
  };

  const tooltipContent = {
    unavailable: 'No resume available.',
    fetching: 'Fetching resume',
    processing: 'Ongoing scoring',
    unparsable:
      "Oops! It looks like we're having trouble reading the resume. This could be because the PDF file contains an image instead of text. Please make sure the file is in a supported format and try again.",
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className='inline-flex items-center'>{renderContent()}</div>
        </TooltipTrigger>
        {tooltipContent[
          resume_processing_state as keyof typeof tooltipContent
        ] && (
          <TooltipContent side='right' className='max-w-xs'>
            <p>
              {
                tooltipContent[
                  resume_processing_state as keyof typeof tooltipContent
                ]
              }
            </p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};

const ErrorIcon = () => (
  <div className='flex items-center space-x-1 text-destructive'>
    <AlertTriangle size={16} />
    <span>Resume not found</span>
  </div>
);

const WarningIcon = () => (
  <div className='flex items-center space-x-1 text-destructive'>
    <AlertTriangle size={16} />
    <span>Resume not parsable</span>
  </div>
);

const Calculating = () => (
  <div className='flex items-center space-x-1 text-blue-500'>
    <CircleDashed className='infinite text-warning h-4 w-4 animate-spin' />
    <span>Calculating</span>
  </div>
);
