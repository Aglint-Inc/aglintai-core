import { RequestProgress } from '@/devlink2/RequestProgress';

import { type EventProgressItem, type ProgressDataItem } from '../types';
import RequestEvent from './RequestEvent';

type EventProgress = EventProgressItem[];

// Type for the entire progressData array
type ProgressData = ProgressDataItem[];

function RequestProgressWrapper({
  progressData,
  EventProgress,
}: {
  progressData: ProgressData;
  EventProgress: EventProgress;
}) {
  return progressData.map((progress, index) => (
    <RequestProgress
      key={index}
      isDividerVisible={progress.isDividerVisible}
      indicator={progress.indicator}
      circleIndicator={progress.circleIndicator}
      slotIndicator={progress.slotIndicator}
      textRequestProgress={progress.textRequestProgress}
      slotProgress={
        <>
          {EventProgress.map((event, i) => (
            <RequestEvent key={i} {...event} />
          ))}
          {progress.addActionButton}
        </>
      }
    />
  ));
}

export default RequestProgressWrapper;
