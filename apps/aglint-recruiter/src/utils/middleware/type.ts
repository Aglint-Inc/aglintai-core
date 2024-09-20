interface AmrElement {
  method: string;
  timestamp: number;
}

interface RolePermissions {
  permissions: string[];
  recruiter_id: string;
  role: string;
}

interface AppMetadata {
  provider: string;
  providers: string[];
  role_permissions: RolePermissions;
}

interface CustomClaims {
  hd: string;
}

interface UserMetadata {
  avatar_url: string;
  custom_claims: CustomClaims;
  email: string;
  email_verified: boolean;
  full_name: string;
  iss: string;
  name: string;
  phone_verified: boolean;
  picture: string;
  provider_id: string;
  sub: string;
}

export interface EventSessionType {
  aal: string;
  amr: AmrElement[];
  app_metadata: AppMetadata;
  aud: string;
  email: string;
  exp: number;
  iat: number;
  is_anonymous: boolean;
  iss: string;
  phone: string;
  role: string;
  session_id: string;
  sub: string;
  user_metadata: UserMetadata;
}
