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
    <div className='flex items-center px-4 py-3 bg-gray-100 text-sm font-medium text-gray-700 w-full'>
      <div className='w-10 flex-shrink-0 mr-4'></div>
      <div className='flex-1 w-[200px] mr-4'>Candidate</div>
      {isResumeMatchVisible && (
        <div className='w-[200px] mr-4'>Resume Match</div>
      )}
      {isInterviewVisible && <div className='w-[250px] mr-4'>Interview</div>}
      <div className='w-[250px] mr-4'>Current Job Title</div>
      <div className='w-[150px] mr-4'>Location</div>
      <div className='w-[120px]'>Applied Date</div>
    </div>
  );
}
