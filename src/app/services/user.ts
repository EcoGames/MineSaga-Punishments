export interface Roles {
  helper?: boolean;
  moderator?: boolean;
  admin?: boolean;
  srAdmin?: boolean;
  developer?: boolean;
  owner?: boolean;
}

export interface User {
  uid: string;
  email: string;
  roles: Roles;
  username?: string;
}
