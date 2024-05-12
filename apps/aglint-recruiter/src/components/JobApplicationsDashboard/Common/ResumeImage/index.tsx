import Image from 'next/image';
const ResumeImage = ({ url }: { url: string }) => {
  return (
    <Image
      src={
        url ||
        'https://uploads-ssl.webflow.com/647ff5fb374a40bef3d73aed/64b2b2322a8a72a3d719a8f5_a70f7296-2d1f-41aa-9142-05345e09900d.webp'
      }
      alt=''
      height={200}
      width={150}
      placeholder={'blur'}
      blurDataURL={url}
      priority={true}
    />
  );
};

export default ResumeImage;
