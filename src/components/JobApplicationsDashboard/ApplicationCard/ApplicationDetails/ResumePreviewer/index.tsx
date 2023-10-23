function ResumePreviewer({ url }) {
  return (
    <iframe
      style={{
        height: '95vh',
        border:'0'
      }}
      width='100%'
      src={url}
      title='Resume Preview'
      loading='eager'
    ></iframe>
  );
}

export default ResumePreviewer;
