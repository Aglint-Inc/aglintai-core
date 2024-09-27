export default function GlobalEmpty({ iconSlot, text, height = 'auto' }) {
  return (
    <div
      className='flex flex-col items-center justify-center rounded bg-white p-8'
      style={{ height }}
    >
      <div className='mb-2'>{iconSlot}</div>
      <div className='text-sm text-gray-500'>{text}</div>
    </div>
  );
}
