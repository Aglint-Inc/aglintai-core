import { Avatar } from '@mui/material';
// import dayjs from 'dayjs';
// import { saveAs } from 'file-saver';
// import HTMLtoDOCX from 'html-to-docx';
// import jsPDF from 'jspdf';
import Image from 'next/image';

// import { CompanyIconsmall } from '@/devlink';

export const CompanyLogo = ({
  companyLogo,
  companyName,
}: {
  companyLogo?: string;
  companyName: string;
}) => {
  return (
    <Avatar
      variant='square'
      sx={{
        bgcolor: 'white.700',
        // width: '100%',
        // height: 'auto',
        width: '50px',
        height: '50px',
      }}
      src={
        companyLogo ||
        `https://logo.clearbit.com/${companyName
          .toLowerCase()
          .replaceAll(' ', '')}.com `
      }
      alt={companyName}
    >
      Company
      {/* <CompanyIconsmall /> */}
    </Avatar>
  );
};

export const ResumeImage = ({ url }: { url: string }) => {
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

// export const downloadDocx = async (title: string, body: string) => {
//   let letter = body.replace(/\n/g, '<br>');
//   const data = await HTMLtoDOCX(
//     `<div><span>${letter}</span></div>`,
//     '',
//     { font: 'Calibri', fontSize: 22 },
//     '',
//   );
//   saveAs(
//     data,
//     `${title + ' ' + dayjs(new Date()).format('DD MMM dddd hh:mm A')}.docx`,
//   );
// };

// export const downloadPdf = async (title: string, body: string) => {
//   var doc = new jsPDF();

//   var bodyContent = doc.splitTextToSize(body, 250);
//   var pageHeight = doc.internal.pageSize.getHeight();
//   doc.setFont('Helvetica');
//   doc.setFontSize(12);

//   var x = 10,
//     y = 15;
//   for (var i = 0; i < bodyContent.length; i++) {
//     if (y + 10 > pageHeight) {
//       y = 15;
//       doc.addPage();
//     }
//     // eslint-disable-next-line security/detect-object-injection
//     doc.text(bodyContent[i], x, y, {
//       maxWidth: 210 - 2 * x,
//     });
//     y = y + 7;
//   }
//   doc.save(`${title + ' ' + dayjs(new Date()).format('DD MMM dddd hh:mm A')}`);
// };
