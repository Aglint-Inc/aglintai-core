function ResumePreviewer({ url }) {
  return (
    <iframe
      width='700px'
      height='810px'
      src={url}
      title='Resume Preview'
      loading='eager'
    ></iframe>
  );
}

export default ResumePreviewer;
