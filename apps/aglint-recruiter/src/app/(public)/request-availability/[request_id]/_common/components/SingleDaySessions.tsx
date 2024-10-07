import SlotsPicker from './SlotsPicker';

function SingleDaySessions() {
  return (
    <>
      <div className='w-full'>
        <SlotsPicker singleDay={true} />
      </div>
    </>
  );
}

export default SingleDaySessions;
