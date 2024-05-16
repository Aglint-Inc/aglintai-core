export type APISendgridPayload = {
  fromEmail: string;
  fromName: string;
  subject: string;
  text: string;
  email: string;
  headers?: Record<string, any>;
  attachments?: MailAttachment[];
};

export type MailAttachment = {
  content: string;
  filename: string;
  type: string;
  disposition: string;
};
