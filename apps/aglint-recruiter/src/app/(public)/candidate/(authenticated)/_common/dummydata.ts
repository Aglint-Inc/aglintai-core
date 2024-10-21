import { type getHomePage } from '@/routers/candidatePortal/get_home_page';
import { type GetInterviews } from '@/routers/candidatePortal/get_interviews';
import { type GetMessages } from '@/routers/candidatePortal/get_messages';
import { type GetNav } from '@/routers/candidatePortal/get_navbar';
import { type GetProfile } from '@/routers/candidatePortal/get_profile';

export const dummyDataNavbar: GetNav['output'] = {
  candidate: {
    first_name: 'John',
    last_name: 'Doe',
    avatar: '',
  },
  company: {
    name: 'TechCorp',
    logo: '',
  },
};

export const dummyDataHomePage: getHomePage['output'] = {
  candidate: {
    first_name: 'Bamparout jd',
    last_name: 'D',
    email: 'bamparoutsis.georgios@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mosh-hamedani',
    phone: '+12068673901',
    timezone: 'America/Nome',
    avatar:
      'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/candidate-files/profile/af308b18-b730-4532-a7c5-9263a2f665a7-1729147619796?t=2024-10-17T06:47:00.754Z',
  },
  job: {
    name: 'Senior FP&A Managers',
    description:
      "<p>*NO AGENCY SUBMISSIONS ACCEPTED*</p><p><br></p><p><strong>Job Title</strong><span>: Senior FP&amp;A Manager (Must be local to the SF Bay Area)</span><br></p><p><span>Join Zededa, a&nbsp; fast-growing Series C SaaS startup that's disrupting the distributed edge computing industry . We’re on a mission to become the world’s largest computing company with no infrastructure and to power the next era of computing. We are looking for a dynamic and strategic Senior FP&amp;A Manager to help us scale to the next level. Our culture is built on innovation, collaboration, and a relentless focus on delivering value to our customers.</span></p><p><br></p><p><strong>Position Overview:</strong></p><p><br></p><p><span>As the Senior FP&amp;A Manager, you will play a critical role in driving the financial strategy of Zededa. Reporting directly to the VP of Finance, you will lead all financial planning and analysis efforts, providing key insights and recommendations that will shape the future of the company. You will be a strategic partner to the executive team, offering data-driven insights to guide decision-making and ensure we achieve our growth and profitability targets.</span></p><p><br></p>",
  },
  interviewPlan: [
    {
      name: 'Initial Screening',
      description: 'Introduction',
      order: 1,
      update_at: '2024-10-16T10:50:11.424',
      is_completed: true,
    },
    {
      name: 'Basic Coding',
      description: 'C++ and Basic Dsa',
      order: 2,
      update_at: '2024-10-16T10:12:21.94731',
      is_completed: null,
    },
    {
      name: 'Advance Coding',
      description: 'C++ and DSA',
      order: 3,
      update_at: null,
      is_completed: null,
    },
  ],
  availability: [],
  schedule: [],
  company: {
    name: 'Aglint Inc',
    logo: 'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/company-logo/public/1a12a488-c3f3-462b-8b3b-ea429e4f7fdc?t=2024-10-14T09:19:40.831Z',
    socials: {
      custom: {},
      twitter: 'https://www.twitter.com/aglinthq/',
      youtube: 'https://www.youtube.com/aglinthq/',
      facebook: 'https://www.facebook.com/aglinthq/',
      linkedin: 'https://www.linkedin.com/company/aglint-ai/',
      instagram: 'https://www.instagram.com/aglinthq/',
    },
    phone: '+1-800-555-1212',
    about:
      '<p>We deliver a great experience</p><p>We prioritize a great candidate experience, providing clear communication, feedback, and support for a positive process.</p><p>From start to finish, we provide clear communication, timely feedback, and support, creating a positive and inclusive process that aligns with our commitment to finding the right fit for both our organization and candidates.</p><p>Our dedicated team ensures that each step of the process is handled with the utmost professionalism and care, making sure that every interaction is smooth and respectful.</p><p>We continuously strive to improve our processes based on feedback and industry best practices, aiming to exceed expectations and foster long-term relationships.</p><p>Our commitment extends beyond just recruitment; we believe in creating a welcoming and supportive environment that contributes to the overall success and satisfaction of our candidates.</p><p>We take pride in our personalized approach, tailoring our services to meet the unique needs of each candidate and organization, ensuring a customized experience that aligns with your goals.</p><p>Our experienced team is always available to provide guidance and answer any questions you may have, making sure you feel supported and informed throughout the entire process.</p><p>We actively seek to build lasting partnerships by maintaining open lines of communication and providing ongoing support, both during and after the recruitment process.</p><p>Our goal is to create a seamless experience that not only meets but exceeds your expectations, ensuring that every candidate and client feels valued and respected.</p><p>For more information about our services, visit our <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.example.com/services">Services Page</a>.</p><p>If you have any questions or need assistance, feel free to reach out to us via our <a target="_blank" rel="noopener noreferrer nofollow" href="https://www.example.com/contact">Contact Page</a>.</p><p></p><p><em>Visit us at:</em></p><p><em><br>Example Company<br>1234 Elm Street<br>Springfield, IL 62704<br>USA</em></p><p></p><p></p>',
    banner_image:
      'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/company-images/AglintInc-cover-1729139294632?t=2024-10-17T04:28:17.505Z',
    company_images: [
      'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/company-images/AglintInc-image-1729152554505?t=2024-10-17T08:09:16.247Z',
      'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/company-images/AglintInc-image-1729152556247?t=2024-10-17T08:09:18.200Z',
    ],
    greetings:
      'Thank you for your interest in joining the aglint team! We are thrilled to have you as a candidate for the [Job Title] position. At aglint, we pride ourselves on fostering a collaborative and innovative environment where every team member can thrive.',
  },
  upcoming: [
    {
      start_time: '2024-10-23T10:30:00+00:00',
      end_time: '2024-10-23T11:00:00+00:00',
      session_name: 'Ses2sdfs',
      session_duration: 30,
      schedule_type: 'google_meet',
      meeting_link: 'https://meet.google.com/weq-kwfs-ecm',
      status: 'confirmed',
      session_id: 'ed1f2b1e-8624-4d46-8394-3d965dfcc1f3',
      meeting_flow: 'candidate_request',
      schedule_request_id: 'bbf911a5-969c-4ce0-adf6-5cd0622c7ba0',
      meeting_detail_link:
        'http://localhost:3000/request-availability/4a8ced16-6bb1-4598-874c-64e93946079e',
      interviewers: [
        {
          first_name: 'David',
          last_name: 'Barrett',
          profile_image: null,
          position: 'Engineer',
        },
      ],
    },
  ],
};

export const dummyDataInterviews: GetInterviews['output'] = [
  {
    start_time: '2024-10-14 09:30:00+00',
    end_time: '2024-10-17 10:00:00+00',
    session_name: 'Final coding',
    session_duration: 30,
    schedule_type: 'google_meet',
    meeting_link: null,
    status: 'confirmed',
    session_id: 'e7fccd7c-6b18-4621-9ddf-cd803772adc8',
    interviewers: [
      {
        first_name: 'Brian',
        last_name: 'Donohue',
        profile_image:
          'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/recruiter-user/public/5fb53f5f-5b21-42b7-89e8-93718b104cdc?t=2024-10-10T08:52:10.582Z',
        position: 'Location Admin Updated',
      },
    ],
  },
  {
    start_time: '2024-10-14 09:30:00+00',
    end_time: '2024-10-17 10:00:00+00',
    session_name: 'Basic coding',
    session_duration: 30,
    schedule_type: 'google_meet',
    meeting_link: null,
    status: 'confirmed',
    session_id: '30bf4f37-bf9a-4625-b0f1-454491c2e092',
    interviewers: [
      {
        first_name: 'Paul',
        last_name: 'Adams',
        profile_image:
          'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/recruiter-user/public/10ee2995-f932-4a85-960b-f666ddea3d97?t=2024-10-09T05:05:07.956Z',
        position: 'Product Designer',
      },
    ],
  },
  {
    start_time: '2024-10-14 09:30:00+00',
    end_time: '2024-10-17 10:00:00+00',
    session_name: ',kml',
    session_duration: 30,
    schedule_type: 'zoom',
    meeting_link: null,
    status: 'confirmed',
    session_id: '8e814c3b-cd2d-40d5-84de-066ed78ff08c',
    interviewers: [
      {
        first_name: 'John',
        last_name: 'Collins',
        profile_image: null,
        position: 'CTO',
      },
    ],
  },

  {
    start_time: '2024-10-14 09:30:00+00',
    end_time: '2024-10-17 10:00:00+00',
    session_name: 'Session 2',
    session_duration: 30,
    schedule_type: 'google_meet',
    meeting_link: null,
    status: 'completed',
    session_id: '9ff007dd-7484-4255-8e3c-cd1c272909f2',
    interviewers: [
      {
        first_name: 'sara',
        last_name: 'Coughlan',
        profile_image:
          'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/recruiter-user/public/0f7d2be5-db9d-4f3f-9cef-ea59f418faa1?t=2024-08-08T06:31:12.415Z',
        position: 'Architech',
      },
    ],
  },
  {
    start_time: '2024-10-14 09:30:00+00',
    end_time: '2024-10-17 10:00:00+00',
    session_name: 'Session 3',
    session_duration: 30,
    schedule_type: 'google_meet',
    meeting_link: null,
    status: 'completed',
    session_id: '36aa6bad-ecfd-4a4a-accb-89ef3429132b',
    interviewers: [
      {
        first_name: 'sara',
        last_name: 'Coughlan',
        profile_image:
          'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/recruiter-user/public/0f7d2be5-db9d-4f3f-9cef-ea59f418faa1?t=2024-08-08T06:31:12.415Z',
        position: 'Architech',
      },
    ],
  },
  {
    start_time: '2024-10-14 09:30:00+00',
    end_time: '2024-10-17 10:00:00+00',
    session_name: 'HR Interview',
    session_duration: 30,
    schedule_type: 'google_meet',
    meeting_link: null,
    status: 'completed',
    session_id: 'b27c1578-98e6-4079-96ed-7cc62089afeb',
    interviewers: [
      {
        first_name: 'Chandra',
        last_name: 'Kumar',
        profile_image: null,
        position: 'tech',
      },
      {
        first_name: 'sara',
        last_name: 'Coughlan',
        profile_image:
          'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/recruiter-user/public/0f7d2be5-db9d-4f3f-9cef-ea59f418faa1?t=2024-08-08T06:31:12.415Z',
        position: 'Architech',
      },
    ],
  },
];

export const dummyDataMessage: GetMessages['output'] = [
  {
    id: '32add780-3d97-4ad3-88cd-7ff6a93d2952',
    message:
      '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">David</span>,</p><p></p><p>We are pleased to confirm your interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">[TEST] Senior Software Engineer - Full Stack </span> position. Please find the details of your interview below.</p><p></p><p>Regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">David David</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">Aglint Inc</span> Recruitment Team</p>',
    created_at: '2024-10-14T13:16:35.496845+00:00',
    title:
      'Your Interview for the [TEST] Senior Software Engineer - Full Stack Position at\nAglint Inc is Confirmed',
    availability_id: '4c79512e-512f-48d2-8601-1ca3bb8b9562',
    filter_id: null,
    type: 'confirmInterview_email_applicant',
    company_name: 'Aglint Inc test',
    company_logo:
      'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/company-logo/public/1a12a488-c3f3-462b-8b3b-ea429e4f7fdc?t=2024-10-14T09:19:40.831Z',
    isNew: false,
    isSubmitted: true,
    link: '/request-availability/4c79512e-512f-48d2-8601-1ca3bb8b9562',
  },
  {
    id: 'a35c6698-f99e-4b2a-b43c-6c472d752918',
    message:
      '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">David</span>,</p><p></p><p>Thank you for applying for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">[TEST] Senior Software Engineer - Full Stack </span> position at <span class="temp-variable" data-type="temp-variable" data-id="companyName">Aglint Inc</span>. We have reviewed your application and are impressed with your qualifications and experiences. We would like to invite you to participate in an interview to further discuss how your skills and experiences align with our needs.</p><p>To streamline the scheduling process, please click on the link below to select your availability for an interview:</p><p>Looking forward to your response.</p><p></p><p>Best regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">David Barrett</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">Aglint Inc</span> Recruitment Team</p>',
    created_at: '2024-10-14T13:13:10.011165+00:00',
    title:
      'Provide Availability for the [TEST] Senior Software Engineer - Full Stack\nPosition at Aglint Inc',
    availability_id: '4c79512e-512f-48d2-8601-1ca3bb8b9562',
    filter_id: null,
    type: 'sendAvailabilityRequest_email_applicant',
    company_name: 'Aglint Inc',
    company_logo:
      'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/company-logo/public/1a12a488-c3f3-462b-8b3b-ea429e4f7fdc?t=2024-10-14T09:19:40.831Z',
    isNew: false,
    isSubmitted: true,
    link: '/request-availability/4c79512e-512f-48d2-8601-1ca3bb8b9562',
  },
  {
    id: '9e4aac5a-c3a1-41a9-b86f-1587e9f4cbc0',
    message:
      '<p>Hi <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">David</span>,</p><p></p><p>We are pleased to confirm your interview for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">[TEST] Senior Software Engineer - Full Stack </span> position. Please find the details of your interview below.</p><p></p><p>Regards,</p><p><span class="temp-variable" data-type="temp-variable" data-id="organizerName">David David</span> </p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">Aglint Inc</span> Recruitment Team</p>',
    created_at: '2024-10-14T13:10:26.704587+00:00',
    title:
      'Your Interview for the [TEST] Senior Software Engineer - Full Stack Position at\nAglint Inc is Confirmed',
    availability_id: null,
    filter_id: '099031df-10c8-4266-bccf-9a7e25ba765c',
    type: 'confirmInterview_email_applicant',
    company_name: 'Aglint Inc',
    company_logo:
      'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/company-logo/public/1a12a488-c3f3-462b-8b3b-ea429e4f7fdc?t=2024-10-14T09:19:40.831Z',
    isNew: true,
    isSubmitted: true,
    link: '/self-scheduling/099031df-10c8-4266-bccf-9a7e25ba765c',
  },
  {
    id: 'b1552aaa-9661-4c8a-a139-4dd843c490a2',
    message:
      '<p>Dear <span class="temp-variable" data-type="temp-variable" data-id="candidateFirstName">David</span>,</p><p></p><p style="text-align: start">Thank you for submitting your application for the <span class="temp-variable" data-type="temp-variable" data-id="jobRole">[TEST] Senior Software Engineer - Full Stack </span> at <span class="temp-variable" data-type="temp-variable" data-id="companyName">Aglint Inc</span>. We are pleased to announce that you have been selected for an assessment.</p><p style="text-align: start"></p><p style="text-align: start">You are welcome to choose an assessment time that suits your schedule.</p><p style="text-align: start"></p><p style="text-align: start">We wish you the best of luck and are eager to hear your insights!</p><p style="text-align: start"></p><p style="text-align: start">Best regards,</p><p style="text-align: start"><span class="temp-variable" data-type="temp-variable" data-id="organizerName">David Barrett</span></p><p><span class="temp-variable" data-type="temp-variable" data-id="companyName">Aglint Inc</span> Recruitment Team.</p>',
    created_at: '2024-10-14T13:09:58.770512+00:00',
    title:
      'Scheduling Interview for [TEST] Senior Software Engineer - Full Stack Position\nat Aglint Inc',
    availability_id: null,
    filter_id: '099031df-10c8-4266-bccf-9a7e25ba765c',
    type: 'sendSelfScheduleRequest_email_applicant',
    company_name: 'Aglint Inc',
    company_logo:
      'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/company-logo/public/1a12a488-c3f3-462b-8b3b-ea429e4f7fdc?t=2024-10-14T09:19:40.831Z',
    isNew: true,
    isSubmitted: true,
    link: '/self-scheduling/099031df-10c8-4266-bccf-9a7e25ba765c',
  },
];

export const dummyDataProfile: GetProfile['output'] = {
  resume_url:
    'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/resume-job-post/public/2228c8dc-b00d-4b0c-86e3-7ba7cea4c2e0.pdf',
  id: 'af308b18-b730-4532-a7c5-9263a2f665a7',
  first_name: 'Bamparout jd',
  last_name: 'D',
  linkedin: 'https://www.linkedin.com/in/mosh-hamedani',
  phone: '+12068673901',
  avatar:
    'https://ecfwsyxpcuzxlxrkhxjz.supabase.co/storage/v1/object/public/candidate-files/profile/af308b18-b730-4532-a7c5-9263a2f665a7-1729147619796?t=2024-10-17T06:47:00.754Z',
  timezone: 'America/Nome',
  email: 'bamparoutsis.georgios@gmail.com',
};
