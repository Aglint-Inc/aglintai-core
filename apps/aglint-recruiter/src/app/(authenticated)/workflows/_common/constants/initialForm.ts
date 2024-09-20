export const INITIAL_FORM = Object.freeze({
  auto_connect: {
    error: false,
    helperText: "Auto connect can't be empty",
    required: false,
    validation: () => true,
    value: false,
  },
  description: {
    error: false,
    helperText: "Description can't be empty",
    required: false,
    validation: (value) =>
      value && typeof value === 'string' && value.trim().length !== 0,
    value: '',
  },
  title: {
    error: false,
    helperText: "Title can't be empty",
    required: true,
    validation: (value) =>
      value && typeof value === 'string' && value.trim().length !== 0,
    value: '',
  },
});
