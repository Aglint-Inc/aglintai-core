export function SessionAndTime({
  textTime,
  textSessionName,
}: {
  textTime: string;
  textSessionName: string;
}) {
  return (
    <div className='flex flex-col gap-1'>
      <p className='text-muted-foreground'>{textTime}</p>
      <p className='font-medium'>{textSessionName}</p>
    </div>
  );
}
