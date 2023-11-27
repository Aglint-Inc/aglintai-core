function ResumePreviewer({ url }: { url: string }) {
  const isDocOrDocx = /\.(doc|docx)$/i.test(url);
  return (
    <embed
      src={
        isDocOrDocx
          ? `https://view.officeapps.live.com/op/embed.aspx?src=${url}`
          : url
      }
      title='resume'
      width='100%'
      height='100'
    />
  );
}

export default ResumePreviewer;
