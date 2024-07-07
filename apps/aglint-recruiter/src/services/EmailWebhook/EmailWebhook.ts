type MailHeaders = {
  'In-Reply-To': string;
  'Message-ID': string;
  References: string;
};

export class EmailWebHook {
  static parseEmailBody(raw_email_body: string) {
    return raw_email_body
      .split('\r\n')
      .filter((s) => !(s.includes('>') || s.endsWith('wrote:')))
      .filter((s) => s.length > 0)
      .join('\r\n');
  }

  static parseMailHeaders(raw_headers: string) {
    let record = {};
    raw_headers.split('\n').forEach((field) => {
      const [key, val] = field.split(':');
      if (val) {
        record[String(key)] = val.trim();
      }
    });
    return record as MailHeaders;
  }

  static getNewMailHeader(
    mail_headers: MailHeaders,
    thread_id: string,
    agent_email: string,
  ) {
    const message_id = `<${thread_id}.${Date.now()}@${
      agent_email.split('@')[1]
    }>`;
    const newHeader = {
      'In-Reply-To': mail_headers['Message-ID'],
      'Message-ID': message_id,
    };

    return newHeader;
  }
  static parseThreadId(mail_headers: MailHeaders, agent_email: string) {
    try {
      // .split('.')[0]
      const refrences = mail_headers['References']
        .split(' ')
        .map((r) => r.toLowerCase().slice(1, -1));
      const agent_mail_domain = agent_email.split('@')[1];
      const ref = refrences.find((ref) => ref.includes(agent_mail_domain));

      if (!ref || !ref.includes(agent_mail_domain)) {
        throw new Error('Not found any referenc.');
      }
      const thread_id = ref.split('.')[0];
      return thread_id;
    } catch (err) {
      return null;
    }
  }
  static getMessageId(thread_id: string, agent_email: string) {
    return `<${thread_id}.${Date.now()}@${agent_email.split('@')[1]}>`;
  }
}
