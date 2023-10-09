function ResumePreviewer({ url }) {
  return (
    <iframe
      width='100%'
      height='800px'
      src={url}
      title='Resume Preview'
      loading='eager'
    ></iframe>
  );
}

export default ResumePreviewer;
