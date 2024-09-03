import React from 'react';

function CompanyImage({
  imageSrc,
  altText = 'Company Name',
  coverSrc,
}: {
  imageSrc: string;
  altText?: string;
  coverSrc: string;
}) {
  return (
    <div
      className='h-48 relative'
      style={{
        backgroundImage: `url(${coverSrc})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className='absolute -bottom-16 left-8'>
        <div className='w-32 h-32 bg-white rounded-md flex items-center justify-center overflow-hidden'>
          {imageSrc ? (
            // <Image
            //   src={imageSrc}
            //   alt={altText}
            //   width={128}
            //   height={128}
            //   className="rounded-md object-contain border border-border"
            // />
            // eslint-disable-next-line jsx-a11y/alt-text, @next/next/no-img-element
            <img src={imageSrc} width={'128px'} height={'128px'} />
          ) : (
            <span className='text-white text-4xl font-bold'>{altText}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompanyImage;
