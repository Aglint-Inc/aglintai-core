// select name, description  from roles where recruiter_id = 'f640a816-6a65-4d5d-9efa-75f2d4ed1338'
export const defaultRoles = [
  {
    name: "admin",
    description:
      "Manage job postings, candidate information, interviews, reports, settings, workflows, and teams with the highest level of access.",
  },
  {
    name: "hiring manager",
    description:
      "Assigned to jobs, view job postings, candidate information, interview schedules, and tasks.",
  },
  {
    name: "recruiting coordinator",
    description:
      "Manage interview scheduling and coordination, as well as task updates related to interviews.",
  },
  {
    name: "sourcer",
    description:
      "Add and manage candidate information and utilize sourcing tools to build talent pipelines.",
  },
  {
    name: "recruiter",
    description:
      "Manage job postings, candidate information, interview scheduling, and task management.",
  },
  {
    name: "interviewer",
    description: "View interview schedules and related tasks.",
  },
] as const;

// select name, title, description, meta from permissions where is_enable = true;
export const defaultPermissions = [
  {
    name: "view_company",
    title: "View Company Details",
    description: "Allow the role to view company details.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "manage_company",
    title: "Manage Company Details",
    description: "Allow the role to edit company details.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_users",
    title: "View Users",
    description: "Allow the role to view user information.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "manage_users",
    title: "Manage Users",
    description: "Allow the role to add, edit, or remove users.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_roles",
    title: "View Roles",
    description: "Allow the role to view soles.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "manage_roles",
    title: "Manage Roles",
    description: "Allow the role to add, edit, or remove roles.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "company_settings_module",
    title: "Enable Company Settings App",
    description:
      "By enabling this, the role will have access to the Company Settings app.",
    meta: {
      module: true,
      description: "",
      dependency_tree: {
        child: [
          "view_company",
          "manage_company",
          "view_users",
          "manage_users",
          "view_roles",
          "manage_roles",
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "manage_job",
    title: "Create new job postings",
    description: "Allow the role to create new job postings.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "job_module",
    title: "Enable Jobs App",
    description: "By enabling this, the role will have access to the Jobs app.",
    meta: {
      module: true,
      description: "",
      dependency_tree: {
        child: ["manage_job"],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_all_task",
    title: "view_all_task",
    description:
      "By enabling this, the role will have access to the Scheduling app.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "task_module",
    title: "Enable Tasks App",
    description:
      "By enabling this, the role will have access to the Tasks app.",
    meta: {
      module: true,
      description: "",
      dependency_tree: {
        child: ["view_all_task"],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "manage_workflow",
    title: "Manage workflows",
    description: "Allow the role to manage workflows.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "workflow_module",
    title: "Enable Workflow App",
    description:
      "By enabling this, the role will have access to the Workflow app.",
    meta: {
      module: true,
      description: "",
      dependency_tree: {
        child: ["manage_workflow"],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "integrations_module",
    title: "Enable Integrations App",
    description:
      "By enabling this, the role will have access to the Integrations app.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "create_interview_types",
    title: "Create interview types",
    description: "Allow the role to create different types of interviews.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_interview_types",
    title: "View interview types",
    description: "Allow the role to view existing interview types.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "update_interview_types",
    title: "Update interview types",
    description: "Allow the role to update existing interview types.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "archive_interview_types",
    title: "Archive interview types",
    description: "Allow the role to archive interview types.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "unarchive_interview_types",
    title: "Unarchive interview types",
    description: "Allow the role to restore archived interview types.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "delete_interview_types",
    title: "Delete interview types",
    description: "Allow the role to delete interview types.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "interview_types",
    title: "Interview Types",
    description:
      "Enable to allow the role to create, view, update, archive, unarchive, and delete interview types.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [
          "integrations_module",
          "create_interview_types",
          "view_interview_types",
          "update_interview_types",
          "archive_interview_types",
          "unarchive_interview_types",
          "delete_interview_types",
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "request_candidate_availability",
    title: "Request candidate availability",
    description: "Allow the role to request availability from candidates.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "send_self_scheduling_request",
    title: "Send self-scheduling request to candidates",
    description:
      "Allow the role to send self-scheduling requests to candidates.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "book_meeting_via_email_agent",
    title: "Book meeting via Email Agent",
    description: "Allow the role to book meetings using the email agent.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "book_meeting_via_phone_agent",
    title: "Book meeting via Phone Agent",
    description: "Allow the role to book meetings using the phone agent.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "cancel_schedule",
    title: "Cancel schedule",
    description: "Allow the role to cancel schedules.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "reschedule",
    title: "Reschedule",
    description: "Allow the role to reschedule interviews.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "scheduling_actions",
    title: "Scheduling Actions",
    description:
      "Enable to allow the role to request candidate availability, send self-scheduling requests, book meetings via Email or Phone Agent, cancel schedules, and reschedule interviews.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [
          "request_candidate_availability",
          "send_self_scheduling_request",
          "book_meeting_via_email_agent",
          "book_meeting_via_phone_agent",
          "cancel_schedule",
          "reschedule",
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_interviewers",
    title: "View interviewers",
    description: "Allow the role to view interviewers.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_interviewer_availability",
    title: "View interviewer availability",
    description: "Allow the role to view availability of interviewers.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "update_interviewer_availability",
    title: "Update interviewer availability",
    description: "Allow the role to update availability of interviewers.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_interviewer_keyword_setting",
    title: "View interviewer keyword setting",
    description: "Allow the role to view keyword settings for interviewers.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "update_interviewer_keyword_setting",
    title: "Update interviewer keyword setting",
    description: "Allow the role to update keyword settings for interviewers.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "pause_interviewer_from_interview_type",
    title: "Pause interviewer from interview type",
    description:
      "Allow the role to pause an interviewer from a specific interview type.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "resume_interviewer_from_interview_type",
    title: "Resume interviewer from interview type",
    description:
      "Allow the role to resume an interviewer for a specific interview type.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "add_interviewer_to_training",
    title: "Add interviewer to training",
    description: "Allow the role to add an interviewer to training.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "remove_interviewer_from_training",
    title: "Remove interviewer from training",
    description: "Allow the role to remove an interviewer from training.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "pause_interviewer_from_training",
    title: "Pause interviewer from training",
    description: "Allow the role to pause an interviewer from training.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "resume_interviewer_from_training",
    title: "Resume interviewer from training",
    description: "Allow the role to resume an interviewer for training.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "move_interviewer_to_qualified",
    title: "Move interviewer to qualified",
    description: "Allow the role to move an interviewer to a qualified status.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "manage_interviewers",
    title: "Interviewers Management",
    description:
      "Enable to allow the role to manage interviewers, including viewing, editing, updating availability, keyword settings, pausing/resuming from interview types or training, and moving interviewers to qualified status.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [
          "view_interviewers",
          "view_interviewer_availability",
          "update_interviewer_availability",
          "view_interviewer_keyword_setting",
          "update_interviewer_keyword_setting",
          "pause_interviewer_from_interview_type",
          "resume_interviewer_from_interview_type",
          "add_interviewer_to_training",
          "remove_interviewer_from_training",
          "pause_interviewer_from_training",
          "resume_interviewer_from_training",
          "move_interviewer_to_qualified",
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_scheduling_settings",
    title: "View scheduling settings",
    description: "Allow the role to view scheduling settings.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_working_hours",
    title: "View working hours",
    description: "Allow the role to view working hours.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "update_working_hours",
    title: "Update working hours",
    description: "Allow the role to update working hours.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_interview_load",
    title: "View interview load",
    description: "Allow the role to view the interview load.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "update_interview_load",
    title: "Update interview load",
    description: "Allow the role to update the interview load.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_company_day_off",
    title: "View company day off",
    description: "Allow the role to view company days off.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "update_company_day_off",
    title: "Update company day off",
    description: "Allow the role to update company days off.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_keywords",
    title: "View keywords",
    description: "Allow the role to view keywords used in scheduling.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "update_keywords",
    title: "Update keywords",
    description: "Allow the role to update keywords used in scheduling.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_templates",
    title: "View templates [Email, Slack, Agent, Calendar]",
    description:
      "Allow the role to view templates for email, Slack, agent, and calendar.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "update_templates",
    title: "Update templates [Email, Slack, Agent, Calendar]",
    description:
      "Allow the role to update templates for email, Slack, agent, and calendar.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_debrief_defaults",
    title: "View debrief defaults",
    description: "Allow the role to view default settings for debriefs.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "update_debrief_defaults",
    title: "Update debrief defaults",
    description: "Allow the role to update default settings for debriefs.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "view_scheduling_reports",
    title: "View scheduling reports",
    description: "Allow the role to view reports related to scheduling.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "scheduling_settings_and_reports",
    title: "Settings and Reports",
    description:
      "Enable to allow the role to view and update scheduling settings, working hours, interview load, company days off, keywords, templates [Email, Slack, Agent, Calendar], debrief defaults, and view scheduling reports.",
    meta: {
      module: false,
      description: "",
      dependency_tree: {
        child: [
          "view_scheduling_settings",
          "view_working_hours",
          "update_working_hours",
          "view_interview_load",
          "update_interview_load",
          "view_company_day_off",
          "update_company_day_off",
          "view_keywords",
          "update_keywords",
          "view_templates",
          "update_templates",
          "view_debrief_defaults",
          "update_debrief_defaults",
          "view_scheduling_reports",
        ],
        parent: null,
        sibling: null,
      },
    },
  },
  {
    name: "scheduling_module",
    title: "Enable Scheduling App",
    description:
      "By enabling this, the role will have access to the Scheduling app.",
    meta: {
      module: true,
      description: "",
      dependency_tree: {
        child: [
          "interview_types",
          "scheduling_actions",
          "manage_interviewers",
          "scheduling_settings_and_reports",
        ],
        parent: null,
        sibling: null,
      },
    },
  },
] as const;

// with role as (SELECT
//     '"' || r.name || '" : ["'|| STRING_AGG( p.name, '", "' ) || '" ]'  as roll_per
// FROM roles r
// JOIN role_permissions r_p ON r.id = r_p.role_id
// JOIN permissions p ON p.id = r_p.permission_id
// WHERE r_p.recruiter_id = '1a12a488-c3f3-462b-8b3b-ea429e4f7fdc'
// GROUP BY r.name)
// select '{' || STRING_AGG(role.roll_per, ', ') || '}' from role;

export const defaultRolePermissionRelation = {
  recruiter: [
    "view_company",
    "manage_company",
    "view_users",
    "manage_users",
    "view_roles",
    "manage_roles",
    "company_settings_module",
    "manage_job",
    "job_module",
    "view_all_task",
    "task_module",
    "manage_workflow",
    "workflow_module",
    "integrations_module",
    "request_candidate_availability",
    "send_self_scheduling_request",
    "book_meeting_via_email_agent",
    "book_meeting_via_phone_agent",
    "cancel_schedule",
    "reschedule",
    "scheduling_actions",
    "view_interviewers",
    "view_interviewer_availability",
    "update_interviewer_availability",
    "view_interviewer_keyword_setting",
    "update_interviewer_keyword_setting",
    "pause_interviewer_from_interview_type",
    "resume_interviewer_from_interview_type",
    "add_interviewer_to_training",
    "remove_interviewer_from_training",
    "pause_interviewer_from_training",
    "resume_interviewer_from_training",
    "move_interviewer_to_qualified",
    "manage_interviewers",
    "view_scheduling_settings",
    "view_working_hours",
    "update_working_hours",
    "view_interview_load",
    "update_interview_load",
    "view_company_day_off",
    "update_company_day_off",
    "view_keywords",
    "update_keywords",
    "view_templates",
    "update_templates",
    "view_debrief_defaults",
    "update_debrief_defaults",
    "view_scheduling_reports",
    "scheduling_settings_and_reports",
    "scheduling_module",
  ],
  "hiring manager": [
    "job_module",
    "view_all_task",
    "task_module",
    "interview_types",
    "scheduling_actions",
    "manage_interviewers",
    "scheduling_settings_and_reports",
    "scheduling_module",
  ],
  "recruiting coordinator": [
    "manage_job",
    "job_module",
    "view_all_task",
    "task_module",
    "interview_types",
    "scheduling_actions",
    "view_scheduling_settings",
    "view_working_hours",
    "update_working_hours",
    "view_interview_load",
    "update_interview_load",
    "view_company_day_off",
    "update_company_day_off",
    "view_keywords",
    "update_keywords",
    "view_templates",
    "update_templates",
    "view_debrief_defaults",
    "update_debrief_defaults",
    "view_scheduling_reports",
    "scheduling_settings_and_reports",
    "scheduling_module",
  ],
  admin: [
    "view_company",
    "manage_company",
    "view_users",
    "manage_users",
    "view_roles",
    "manage_roles",
    "company_settings_module",
    "manage_job",
    "job_module",
    "view_all_task",
    "task_module",
    "manage_workflow",
    "workflow_module",
    "integrations_module",
    "create_interview_types",
    "view_interview_types",
    "update_interview_types",
    "archive_interview_types",
    "unarchive_interview_types",
    "delete_interview_types",
    "interview_types",
    "request_candidate_availability",
    "send_self_scheduling_request",
    "book_meeting_via_email_agent",
    "book_meeting_via_phone_agent",
    "cancel_schedule",
    "reschedule",
    "scheduling_actions",
    "view_interviewers",
    "view_interviewer_availability",
    "update_interviewer_availability",
    "view_interviewer_keyword_setting",
    "update_interviewer_keyword_setting",
    "pause_interviewer_from_interview_type",
    "resume_interviewer_from_interview_type",
    "add_interviewer_to_training",
    "remove_interviewer_from_training",
    "pause_interviewer_from_training",
    "resume_interviewer_from_training",
    "move_interviewer_to_qualified",
    "manage_interviewers",
    "view_scheduling_settings",
    "view_working_hours",
    "update_working_hours",
    "view_interview_load",
    "update_interview_load",
    "view_company_day_off",
    "update_company_day_off",
    "view_keywords",
    "update_keywords",
    "view_templates",
    "update_templates",
    "view_debrief_defaults",
    "update_debrief_defaults",
    "view_scheduling_reports",
    "scheduling_settings_and_reports",
    "scheduling_module",
  ],
  sourcer: ["job_module"],
  interviewer: [
    "task_module",
    "manage_workflow",
    "workflow_module",
    "scheduling_module",
  ],
};