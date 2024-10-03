const RecruiterUserSchema = customRecruiterUserUpdateSchema
  .pick({
    first_name: true,
    last_name: true,
    linked_in: true,
    office_location_id: true,
    employment: true,
    position: true,
    department_id: true,
    phone: true,
    user_id: true,
    profile_image: true,
    scheduling_settings: true,
  })
  .shape({
    first_name: customRecruiterUserUpdateSchema.fields.first_name.required(
      'First name is required',
    ),
    last_name: customRecruiterUserUpdateSchema.fields.last_name.required(
      'Last name is required',
    ),
    linked_in: customRecruiterUserUpdateSchema.fields.linked_in.required(
      'LinkedIn is required',
    ),
    office_location_id:
      customRecruiterUserUpdateSchema.fields.office_location_id.required(
        'Office location ID is required',
      ),
    employment: customRecruiterUserUpdateSchema.fields.employment.required(
      'Employment is required',
    ),
    position: customRecruiterUserUpdateSchema.fields.position.required(
      'Position is required',
    ),
    department_id:
      customRecruiterUserUpdateSchema.fields.department_id.required(
        'Department ID is required',
      ),
    phone:
      customRecruiterUserUpdateSchema.fields.phone.required(
        'Phone is required',
      ),
    user_id: customRecruiterUserUpdateSchema.fields.user_id.required(
      'User ID is required',
    ),
    profile_image:
      customRecruiterUserUpdateSchema.fields.profile_image.required(
        'Profile image is required',
      ),
    scheduling_settings:
      customRecruiterUserUpdateSchema.fields.scheduling_settings.required(
        'Scheduling settings are required',
      ),
  });
