export interface FieldError {
  error: boolean;
  msg: string;
}

export interface SignUpError {
  first_name: FieldError;
  email: FieldError;
  password: FieldError;
}

export interface Details {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
