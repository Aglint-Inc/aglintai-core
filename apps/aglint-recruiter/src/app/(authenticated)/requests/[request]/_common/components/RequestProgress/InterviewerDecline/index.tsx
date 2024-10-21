import { useRequest } from '@request/hooks';

import ProgressNode from '../ProgressNode';

const InterviewerDecline = () => {
  const { declineProgressMeta } = useRequest();
  if (!declineProgressMeta) {
    return <></>;
  }
  return (
    <>
      {declineProgressMeta.progressNodes.map((node) => {
        return (
          <div key={node.type}>
            <ProgressNode
              {...{
                ...node,
                isLastNode: true,
              }}
            />
          </div>
        );
      })}
    </>
  );
};
export default InterviewerDecline;
