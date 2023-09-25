export interface FieldError {
  error: boolean;
  msg: string;
}

export interface SignUpError {
  name: FieldError;
  email: FieldError;
  password: FieldError;
}

export interface Details {
  name: string;
  email: string;
  password: string;
}
