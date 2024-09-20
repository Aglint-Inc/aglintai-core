import SlotsPicker from './SlotsPicker';

function SingleDaySessions() {
  return (
    <>
      <div className='max-w-2xl'>
        <SlotsPicker singleDay={true} />
      </div>
    </>
  );
}

export default SingleDaySessions;
