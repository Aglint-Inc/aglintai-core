function ResumePreviewer({ url }: { url: string }) {
  return (
    <embed
      style={{
        height: '95vh',
        border: '0',
      }}
      width='100%'
      src={url}
      title='Resume Preview'
    ></embed>
  );
}

export default ResumePreviewer;
