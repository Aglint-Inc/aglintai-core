import Image from 'next/image';

export function PageHeader() {
  return (
    <>
      {/* Header */}
      <header className='relative w-full'>
        {/* <div className='absolute top-4 left-4 z-10'>
          <Image
            src='https://aglintai-seed-data.vercel.app/logo/intercom.jpg'
            alt='Intercom logo'
            width={200}
            height={64}
            className='min-h-[64px] w-auto'
          />
        </div> */}
        <div className='relative w-full h-[300px]'>
          <Image
            src='https://pbs.twimg.com/profile_banners/274788446/1713887007/1500x500'
            alt='Intercom image'
            width={1200}
            height={300}
            className='object-cover w-full h-full'
          />
        </div>
        <div className='absolute bottom-0 left-8 transform translate-y-1/2'>
          <Image
            src='https://aglintai-seed-data.vercel.app/profile/ramya.jpg'
            alt='Ramya'
            width={128}
            height={128}
            className='rounded-full border-4 border-white'
          />
        </div>
      </header>
    </>
  );
}
