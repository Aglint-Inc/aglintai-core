import { RequestProgressTracker } from '../../RequestProgressTracker';
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
    <RequestProgressTracker
      key={index}
      isDividerVisible={progress.isDividerVisible}
      circleIndicator={progress.circleIndicator}
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
