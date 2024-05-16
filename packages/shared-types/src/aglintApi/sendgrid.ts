export type APISendgridPayload = {
  fromEmail: string;
  fromName: string;
  subject: string;
  text: string;
  email: string;
  headers: Record<string, any>;
};
