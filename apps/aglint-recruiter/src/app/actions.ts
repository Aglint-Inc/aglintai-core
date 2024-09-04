'use server'

import { Resend } from 'resend'

// import { createAdminClient } from '@/src/utils/supabase/server'

// const supabase = createAdminClient()
// import { cookies } from 'next/headers'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function submitErrorReport(errorDescription: string, screenshotUrl: string | null) {
  const data = 'TBD';
  // Insert error report into Supabase table
  // const { data, error } = await supabase
  //   .from('error_reports')
  //   .insert({
  //     description: errorDescription,
  //     screenshot_url: screenshotUrl,
  //     created_at: new Date().toISOString()
  //   })
  //   .select()

  // if (error) throw error

  // Send email report
  await resend.emails.send({
    from: 'errors@yourdomain.com',
    to: 'support@yourdomain.com',
    subject: 'New Error Report Submitted',
    html: `
      <h1>New Error Report</h1>
      <p><strong>Description:</strong> ${errorDescription}</p>
      ${screenshotUrl ? `<p><strong>Screenshot:</strong> <a href="${screenshotUrl}">View Screenshot</a></p>` : ''}
      <p><strong>Submitted at:</strong> ${new Date().toLocaleString()}</p>
    `
  })

  return data
}