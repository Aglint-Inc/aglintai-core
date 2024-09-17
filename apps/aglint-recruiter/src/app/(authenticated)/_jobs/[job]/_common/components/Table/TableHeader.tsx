interface TableHeaderProps {
  isAllChecked: boolean;
  onSelectAll: () => void;
  isResumeMatchVisible: boolean;
  isInterviewVisible: boolean;
}

export function TableHeader({
  isResumeMatchVisible,
  isInterviewVisible,
}: TableHeaderProps) {
  return (
    <div className='flex w-full items-center bg-gray-100 px-4 py-3 text-sm font-medium text-gray-700'>
      <div className='mr-4 w-10 flex-shrink-0'></div>
      <div className='mr-4 w-[200px] flex-1'>Candidate</div>
      {isResumeMatchVisible && (
        <div className='mr-4 w-[200px]'>Resume Match</div>
      )}
      {isInterviewVisible && <div className='mr-4 w-[250px]'>Interview</div>}
      <div className='mr-4 w-[250px]'>Current Job Title</div>
      <div className='mr-4 w-[150px]'>Location</div>
      <div className='w-[120px]'>Applied Date</div>
    </div>
  );
}
