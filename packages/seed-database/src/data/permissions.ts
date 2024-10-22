import { DatabaseTable } from '@aglint/shared-types';

export const db_permissions: Pick<
  DatabaseTable['permissions'],
  'name' | 'is_enable' | 'description' | 'title' | 'meta'
>[] = [
  {
    name: 'view_company',
    is_enable: true,
    description: 'Allow the role to view company details.',
    title: 'View Company Details',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'manage_company',
    is_enable: true,
    description: 'Allow the role to edit company details.',
    title: 'Manage Company Details',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_users',
    is_enable: true,
    description: 'Allow the role to view user information.',
    title: 'View Users',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'manage_users',
    is_enable: true,
    description: 'Allow the role to add, edit, or remove users.',
    title: 'Manage Users',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_roles',
    is_enable: true,
    description: 'Allow the role to view soles.',
    title: 'View Roles',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'manage_roles',
    is_enable: true,
    description: 'Allow the role to add, edit, or remove roles.',
    title: 'Manage Roles',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'company_settings_module',
    is_enable: true,
    description:
      'By enabling this, the role will have access to the Company Settings app.',
    title: 'Enable Company Settings App',
    meta: {
      module: true,
      description: '',
      dependency_tree: {
        child: [
          'view_company',
          'manage_company',
          'view_users',
          'manage_users',
          'view_roles',
          'manage_roles',
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'manage_job',
    is_enable: true,
    description: 'Allow the role to create new job postings.',
    title: 'Create new job postings',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'job_module',
    is_enable: true,
    description: 'By enabling this, the role will have access to the Jobs app.',
    title: 'Enable Jobs App',
    meta: {
      module: true,
      description: '',
      dependency_tree: {
        child: ['manage_job'],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_all_task',
    is_enable: true,
    description:
      'By enabling this, the role will have access to the Scheduling app.',
    title: 'view_all_task',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'task_module',
    is_enable: true,
    description:
      'By enabling this, the role will have access to the Tasks app.',
    title: 'Enable Tasks App',
    meta: {
      module: true,
      description: '',
      dependency_tree: {
        child: ['view_all_task'],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'manage_workflow',
    is_enable: true,
    description: 'Allow the role to manage workflows.',
    title: 'Manage workflows',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'workflow_module',
    is_enable: true,
    description:
      'By enabling this, the role will have access to the Workflow app.',
    title: 'Enable Workflow App',
    meta: {
      module: true,
      description: '',
      dependency_tree: {
        child: ['manage_workflow'],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'integrations_module',
    is_enable: true,
    description:
      'By enabling this, the role will have access to the Integrations app.',
    title: 'Enable Integrations App',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'create_interview_types',
    is_enable: true,
    description: 'Allow the role to create different types of interviews.',
    title: 'Create interview types',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_interview_types',
    is_enable: true,
    description: 'Allow the role to view existing interview types.',
    title: 'View interview types',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'update_interview_types',
    is_enable: true,
    description: 'Allow the role to update existing interview types.',
    title: 'Update interview types',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'archive_interview_types',
    is_enable: true,
    description: 'Allow the role to archive interview types.',
    title: 'Archive interview types',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'unarchive_interview_types',
    is_enable: true,
    description: 'Allow the role to restore archived interview types.',
    title: 'Unarchive interview types',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'delete_interview_types',
    is_enable: true,
    description: 'Allow the role to delete interview types.',
    title: 'Delete interview types',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'interview_types',
    is_enable: true,
    description:
      'Enable to allow the role to create, view, update, archive, unarchive, and delete interview types.',
    title: 'Interview Types',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [
          'integrations_module',
          'create_interview_types',
          'view_interview_types',
          'update_interview_types',
          'archive_interview_types',
          'unarchive_interview_types',
          'delete_interview_types',
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'request_candidate_availability',
    is_enable: true,
    description: 'Allow the role to request availability from candidates.',
    title: 'Request candidate availability',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'send_self_scheduling_request',
    is_enable: true,
    description:
      'Allow the role to send self-scheduling requests to candidates.',
    title: 'Send self-scheduling request to candidates',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'book_meeting_via_email_agent',
    is_enable: true,
    description: 'Allow the role to book meetings using the email agent.',
    title: 'Book meeting via Email Agent',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'book_meeting_via_phone_agent',
    is_enable: true,
    description: 'Allow the role to book meetings using the phone agent.',
    title: 'Book meeting via Phone Agent',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'cancel_schedule',
    is_enable: true,
    description: 'Allow the role to cancel schedules.',
    title: 'Cancel schedule',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'reschedule',
    is_enable: true,
    description: 'Allow the role to reschedule interviews.',
    title: 'Reschedule',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'scheduling_actions',
    is_enable: true,
    description:
      'Enable to allow the role to request candidate availability, send self-scheduling requests, book meetings via Email or Phone Agent, cancel schedules, and reschedule interviews.',
    title: 'Scheduling Actions',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [
          'request_candidate_availability',
          'send_self_scheduling_request',
          'book_meeting_via_email_agent',
          'book_meeting_via_phone_agent',
          'cancel_schedule',
          'reschedule',
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_interviewers',
    is_enable: true,
    description: 'Allow the role to view interviewers.',
    title: 'View interviewers',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_interviewer_availability',
    is_enable: true,
    description: 'Allow the role to view availability of interviewers.',
    title: 'View interviewer availability',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'update_interviewer_availability',
    is_enable: true,
    description: 'Allow the role to update availability of interviewers.',
    title: 'Update interviewer availability',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_interviewer_keyword_setting',
    is_enable: true,
    description: 'Allow the role to view keyword settings for interviewers.',
    title: 'View interviewer keyword setting',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'update_interviewer_keyword_setting',
    is_enable: true,
    description: 'Allow the role to update keyword settings for interviewers.',
    title: 'Update interviewer keyword setting',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'pause_interviewer_from_interview_type',
    is_enable: true,
    description:
      'Allow the role to pause an interviewer from a specific interview type.',
    title: 'Pause interviewer from interview type',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'resume_interviewer_from_interview_type',
    is_enable: true,
    description:
      'Allow the role to resume an interviewer for a specific interview type.',
    title: 'Resume interviewer from interview type',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'add_interviewer_to_training',
    is_enable: true,
    description: 'Allow the role to add an interviewer to training.',
    title: 'Add interviewer to training',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'remove_interviewer_from_training',
    is_enable: true,
    description: 'Allow the role to remove an interviewer from training.',
    title: 'Remove interviewer from training',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'pause_interviewer_from_training',
    is_enable: true,
    description: 'Allow the role to pause an interviewer from training.',
    title: 'Pause interviewer from training',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'resume_interviewer_from_training',
    is_enable: true,
    description: 'Allow the role to resume an interviewer for training.',
    title: 'Resume interviewer from training',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'move_interviewer_to_qualified',
    is_enable: true,
    description: 'Allow the role to move an interviewer to a qualified status.',
    title: 'Move interviewer to qualified',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'manage_interviewers',
    is_enable: true,
    description:
      'Enable to allow the role to manage interviewers, including viewing, editing, updating availability, keyword settings, pausing/resuming from interview types or training, and moving interviewers to qualified status.',
    title: 'Interviewers Management',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [
          'view_interviewers',
          'view_interviewer_availability',
          'update_interviewer_availability',
          'view_interviewer_keyword_setting',
          'update_interviewer_keyword_setting',
          'pause_interviewer_from_interview_type',
          'resume_interviewer_from_interview_type',
          'add_interviewer_to_training',
          'remove_interviewer_from_training',
          'pause_interviewer_from_training',
          'resume_interviewer_from_training',
          'move_interviewer_to_qualified',
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_scheduling_settings',
    is_enable: true,
    description: 'Allow the role to view scheduling settings.',
    title: 'View scheduling settings',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_working_hours',
    is_enable: true,
    description: 'Allow the role to view working hours.',
    title: 'View working hours',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'update_working_hours',
    is_enable: true,
    description: 'Allow the role to update working hours.',
    title: 'Update working hours',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_interview_load',
    is_enable: true,
    description: 'Allow the role to view the interview load.',
    title: 'View interview load',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'update_interview_load',
    is_enable: true,
    description: 'Allow the role to update the interview load.',
    title: 'Update interview load',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_company_day_off',
    is_enable: true,
    description: 'Allow the role to view company days off.',
    title: 'View company day off',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'update_company_day_off',
    is_enable: true,
    description: 'Allow the role to update company days off.',
    title: 'Update company day off',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_keywords',
    is_enable: true,
    description: 'Allow the role to view keywords used in scheduling.',
    title: 'View keywords',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'update_keywords',
    is_enable: true,
    description: 'Allow the role to update keywords used in scheduling.',
    title: 'Update keywords',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_templates',
    is_enable: true,
    description:
      'Allow the role to view templates for email, Slack, agent, and calendar.',
    title: 'View templates [Email, Slack, Agent, Calendar]',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'update_templates',
    is_enable: true,
    description:
      'Allow the role to update templates for email, Slack, agent, and calendar.',
    title: 'Update templates [Email, Slack, Agent, Calendar]',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_debrief_defaults',
    is_enable: true,
    description: 'Allow the role to view default settings for debriefs.',
    title: 'View debrief defaults',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'update_debrief_defaults',
    is_enable: true,
    description: 'Allow the role to update default settings for debriefs.',
    title: 'Update debrief defaults',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'view_scheduling_reports',
    is_enable: true,
    description: 'Allow the role to view reports related to scheduling.',
    title: 'View scheduling reports',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'scheduling_settings_and_reports',
    is_enable: true,
    description:
      'Enable to allow the role to view and update scheduling settings, working hours, interview load, company days off, keywords, templates [Email, Slack, Agent, Calendar], debrief defaults, and view scheduling reports.',
    title: 'Settings and Reports',
    meta: {
      module: false,
      description: '',
      dependency_tree: {
        child: [
          'view_scheduling_settings',
          'view_working_hours',
          'update_working_hours',
          'view_interview_load',
          'update_interview_load',
          'view_company_day_off',
          'update_company_day_off',
          'view_keywords',
          'update_keywords',
          'view_templates',
          'update_templates',
          'view_debrief_defaults',
          'update_debrief_defaults',
          'view_scheduling_reports',
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: 'scheduling_module',
    is_enable: true,
    description:
      'By enabling this, the role will have access to the Scheduling app.',
    title: 'Enable Scheduling App',
    meta: {
      module: true,
      description: '',
      dependency_tree: {
        child: [
          'interview_types',
          'scheduling_actions',
          'manage_interviewers',
          'scheduling_settings_and_reports',
        ],
        parent: null,
        sibling: null,
      },
    },
  },
];
