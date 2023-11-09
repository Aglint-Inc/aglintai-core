function ResumePreviewer({ url }: { url: string }) {
  const isDocOrDocx = /\.(doc|docx)$/i.test(url);
  const iframeSrc = isDocOrDocx ? `https://docs.google.com/gview?url=${url}&embedded=true` : '';

  // Style for both iframe and embed tags
  const commonStyle = {
    width: '100%',
    height: '95vh',
    border: '0',
  };

  // Decide which component to render based on the file extension
  const fileViewer = isDocOrDocx ? (
    <iframe
      src={iframeSrc}
      style={commonStyle}
      frameBorder="0"
      title='Document Preview'
    ></iframe>
  ) : (
    <embed
      src={url}
      style={commonStyle}
      title='PDF Preview'
    ></embed>
  );

  return <>{fileViewer}</>;
}

export default ResumePreviewer;
